import type { NextRequest } from 'next/server';

// POST /api/ocr
// Accepts multipart/form-data with a "file" field (image or PDF) and an optional "language" field
// Uses a direct high-speed multimodal Google Gemini 3.1 Flash call to extract fields & raw text in one go!
export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return Response.json(
      { success: false, error: 'Gemini API key not configured. Add GEMINI_API_KEY to .env.local' },
      { status: 500 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ success: false, error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;
  if (!file) {
    return Response.json({ success: false, error: 'No file provided' }, { status: 400 });
  }

  const language = (formData.get('language') as string) || 'en-IN';

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    return Response.json(
      { success: false, error: 'Invalid file type. Supported: JPG, PNG, PDF' },
      { status: 400 }
    );
  }

  if (file.size > 10 * 1024 * 1024) {
    return Response.json({ success: false, error: 'File too large. Max 10 MB allowed' }, { status: 400 });
  }

  try {
    console.log('Preparing Gemini 3.1 Flash multimodal processing...');
    
    // Step 1: Read file and convert to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString('base64');
    
    // Step 2: Set up Gemini model and endpoint
    const model = process.env.GEMINI_MODEL || 'gemini-3.1-flash-image-preview';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    console.log('Sending request to Gemini model:', model);

    // Step 3: Define structured response schema matching GRNData interface
    const responseSchema = {
      type: 'OBJECT',
      properties: {
        grnNumber: { type: 'STRING', description: 'The GRN (Goods Receipt Note) Number' },
        grnDate: { type: 'STRING', description: 'Date of the GRN, standardized to DD/MM/YYYY or YYYY-MM-DD' },
        poNumber: { type: 'STRING', description: 'Purchase Order Number' },
        invoiceNumber: { type: 'STRING', description: 'Invoice or Bill Number' },
        invoiceDate: { type: 'STRING', description: 'Invoice Date' },
        vendorName: { type: 'STRING', description: 'Vendor or Supplier Name' },
        vendorCode: { type: 'STRING', description: 'Vendor/Supplier Code if available' },
        warehouseStore: { type: 'STRING', description: 'Warehouse or Store name where items are received' },
        department: { type: 'STRING', description: 'Department name' },
        vehicleNumber: { type: 'STRING', description: 'Indian Vehicle Registration Number, e.g. MH 12 AB 1234 or MH12AB1234. Look for prefix Truck, Vehicle, Lorry, Gate Pass, etc.' },
        lineItems: {
          type: 'ARRAY',
          description: 'List of all material/line items from the receipt table',
          items: {
            type: 'OBJECT',
            properties: {
              srNo: { type: 'STRING', description: 'Serial or row number (standardize to 1, 2, 3...)' },
              itemCode: { type: 'STRING', description: 'Item/Material Code or Part Number' },
              description: { type: 'STRING', description: 'Item Description' },
              unit: { type: 'STRING', description: 'Unit of Measure (UOM), e.g., Nos, Kgs, Bags, Boxes' },
              poQty: { type: 'STRING', description: 'PO / Ordered Quantity' },
              receivedQty: { type: 'STRING', description: 'Received or Accepted Quantity' },
              rate: { type: 'STRING', description: 'Unit Rate/Price, cleaned of currency symbols and commas' },
              amount: { type: 'STRING', description: 'Total Amount, cleaned of currency symbols and commas' }
            },
            required: ['srNo', 'itemCode', 'description', 'unit', 'poQty', 'receivedQty', 'rate', 'amount']
          }
        },
        subTotal: { type: 'STRING', description: 'Subtotal, cleaned of currency symbols and commas' },
        taxAmount: { type: 'STRING', description: 'Tax Amount (GST, CGST, SGST, IGST), cleaned' },
        totalAmount: { type: 'STRING', description: 'Total/Grand Total Amount, cleaned' },
        remarks: { type: 'STRING', description: 'Any comments, notes, or remarks found' },
        rawText: { type: 'STRING', description: 'A complete, high-quality, comprehensive transcription of the entire document in clean markdown format' }
      },
      required: [
        'grnNumber', 'grnDate', 'poNumber', 'invoiceNumber', 'invoiceDate',
        'vendorName', 'vendorCode', 'warehouseStore', 'department', 'vehicleNumber',
        'lineItems', 'subTotal', 'taxAmount', 'totalAmount', 'remarks', 'rawText'
      ]
    };

    const promptText = `You are a highly precise multi-lingual Goods Receipt Note (GRN) data extraction assistant.
Analyze the provided document (which may be a scan, photo, or PDF) carefully.
Extract all relevant fields, transcribe the document, and return the structured JSON data as requested.

Document Language: ${language} (if the document has text in this language, pay special attention to transcribing it accurately).

Strict Rules:
1. If a field or table column is missing, return an empty string "".
2. For vehicleNumber, search for Indian vehicle registration plates (e.g. "MH 12 AB 1234", "MH-12-AB-1234", "DL 3C AB 1234", "HR26-XY-9999", "22 BH 1234 AB", etc.).
3. Clean currency symbols (₹, Rs., INR) and commas from numeric rate, amount, subTotal, taxAmount, and totalAmount values.
4. Populate "rawText" with a complete, clean, comprehensive Markdown transcription of the entire document (retaining tables, headers, footers).`;

    // Step 4: Construct Request Payload for Gemini API
    const payload = {
      contents: [
        {
          parts: [
            { text: promptText },
            {
              inlineData: {
                mimeType: file.type,
                data: base64Data
              }
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.1
      }
    };

    // Step 5: Send Request
    const startTime = Date.now();
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API responded with status ${response.status}: ${errText}`);
    }

    const responseData = await response.json();
    const completionText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!completionText) {
      throw new Error('Empty completion content from Gemini API');
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`Gemini processing completed in ${duration}s!`);

    const grnData = JSON.parse(completionText);
    
    // Add rawText at the root of response alongside grnData for perfect compatibility
    return Response.json({
      success: true,
      rawText: grnData.rawText || '',
      grnData: grnData,
      jobId: `gemini-${Date.now()}`
    });

  } catch (error) {
    console.error('OCR / Gemini API error:', error);
    const msg = error instanceof Error ? error.message : String(error);
    return Response.json(
      { success: false, error: `Processing error: ${msg}` },
      { status: 500 }
    );
  }
}
