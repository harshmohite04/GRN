// GRN field extractor — parses raw OCR text into structured GRN fields
// POST /api/extract-grn

interface GRNLineItem {
  srNo: string;
  itemCode: string;
  description: string;
  unit: string;
  poQty: string;
  receivedQty: string;
  rate: string;
  amount: string;
}

export interface GRNData {
  grnNumber: string;
  grnDate: string;
  poNumber: string;
  invoiceNumber: string;
  invoiceDate: string;
  vendorName: string;
  vendorCode: string;
  warehouseStore: string;
  department: string;
  vehicleNumber: string;
  lineItems: GRNLineItem[];
  subTotal: string;
  taxAmount: string;
  totalAmount: string;
  remarks: string;
  rawText: string;
}

function extractField(text: string, patterns: RegExp[]): string {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return '';
}

function extractLineItems(text: string): GRNLineItem[] {
  const items: GRNLineItem[] = [];
  const lines = text.split('\n');

  let headerMapping: {
    srNoIdx: number;
    itemCodeIdx: number;
    descriptionIdx: number;
    unitIdx: number;
    poQtyIdx: number;
    receivedQtyIdx: number;
    rateIdx: number;
    amountIdx: number;
  } | null = null;

  let inTable = false;

  for (let line of lines) {
    line = line.trim();
    if (!line) {
      inTable = false;
      continue;
    }

    // Skip separator lines
    const isSeparator = /^[\s|:-]+$/.test(line) && (line.includes('|') || line.includes('-'));
    if (isSeparator) {
      inTable = true;
      continue;
    }

    let parts: string[] = [];
    if (line.includes('|')) {
      parts = line.split('|')
        .map(p => p.trim())
        .filter((p, idx, arr) => {
          if (idx === 0 && p === '' && line.startsWith('|')) return false;
          if (idx === arr.length - 1 && p === '' && line.endsWith('|')) return false;
          return true;
        });
    } else {
      parts = line.split(/\s{2,}|\t/).map(p => p.trim()).filter(p => p !== '');
    }

    if (parts.length < 3) continue;

    // Check if this row matches table header keywords
    const hasHeaderKeywords = parts.some(p => 
      /^(?:sr\.?\s*no|serial|sl\.?\s*no|sno|item\s*code|material\s*code|part\s*no|description|item\s*desc|विवरण|unit|uom|po\s*qty|ord\s*qty|rcvd\s*qty|rec\s*qty|received\s*qty|rate|price|amount|total\s*amount)$/i.test(p.trim())
    );

    if (hasHeaderKeywords && !inTable) {
      let srNoIdx = -1;
      let itemCodeIdx = -1;
      let descriptionIdx = -1;
      let unitIdx = -1;
      let poQtyIdx = -1;
      let receivedQtyIdx = -1;
      let rateIdx = -1;
      let amountIdx = -1;

      parts.forEach((part, idx) => {
        const cleaned = part.toLowerCase().replace(/[^a-z0-9\s\u0900-\u097F]/g, '').trim();
        if (cleaned.match(/^(?:sr\s*no|serial\s*no|sl\s*no|s\s*no|srno|slno|क्र\s*सं|क्रसं)$/)) {
          srNoIdx = idx;
        } else if (cleaned.match(/^(?:item\s*code|material\s*code|code|part\s*no|itemcode|mat\s*code|कोड)$/)) {
          itemCodeIdx = idx;
        } else if (cleaned.match(/^(?:description|item\s*description|item\s*name|desc|material\s*description|विवरण|माल\s*का\s*विवरण)$/)) {
          descriptionIdx = idx;
        } else if (cleaned.match(/^(?:unit|uom|unit\s*of\s*measure|इकाई|नग|पैकिंग)$/)) {
          unitIdx = idx;
        } else if (cleaned.match(/^(?:po\s*qty|po\s*quantity|ordered\s*qty|ord\s*qty|poqty)$/)) {
          poQtyIdx = idx;
        } else if (cleaned.match(/^(?:received\s*qty|rec\s*qty|rcvd\s*qty|received\s*quantity|qty\s*received|accepted\s*qty|प्राप्त\s*मात्रा)$/)) {
          receivedQtyIdx = idx;
        } else if (cleaned.match(/^(?:rate|unit\s*rate|price|unit\s*price|दर|मूल्य)$/)) {
          rateIdx = idx;
        } else if (cleaned.match(/^(?:amount|total|value|total\s*amount|net\s*amt|राशि|कुल)$/)) {
          amountIdx = idx;
        }
      });

      const matchedCount = [itemCodeIdx, descriptionIdx, poQtyIdx, receivedQtyIdx, rateIdx, amountIdx].filter(idx => idx !== -1).length;
      if (matchedCount >= 2) {
        headerMapping = { srNoIdx, itemCodeIdx, descriptionIdx, unitIdx, poQtyIdx, receivedQtyIdx, rateIdx, amountIdx };
        inTable = true;
        continue;
      }
    }

    if (inTable || headerMapping) {
      let srNo = '';
      let itemCode = '';
      let description = '';
      let unit = '';
      let poQty = '';
      let receivedQty = '';
      let rate = '';
      let amount = '';

      if (headerMapping) {
        srNo = headerMapping.srNoIdx !== -1 ? parts[headerMapping.srNoIdx] || '' : '';
        itemCode = headerMapping.itemCodeIdx !== -1 ? parts[headerMapping.itemCodeIdx] || '' : '';
        description = headerMapping.descriptionIdx !== -1 ? parts[headerMapping.descriptionIdx] || '' : '';
        unit = headerMapping.unitIdx !== -1 ? parts[headerMapping.unitIdx] || '' : '';
        poQty = headerMapping.poQtyIdx !== -1 ? parts[headerMapping.poQtyIdx] || '' : '';
        receivedQty = headerMapping.receivedQtyIdx !== -1 ? parts[headerMapping.receivedQtyIdx] || '' : '';
        rate = headerMapping.rateIdx !== -1 ? parts[headerMapping.rateIdx] || '' : '';
        amount = headerMapping.amountIdx !== -1 ? parts[headerMapping.amountIdx] || '' : '';

        // Generate serial number if missing
        if (!srNo || !/^\d+$/.test(srNo.trim())) {
          srNo = String(items.length + 1);
        }
      } else {
        // Fallback robust positional parser
        const firstCell = parts[0].trim();
        const isNum = /^\d+$/.test(firstCell) || /^\d+\.$/.test(firstCell);
        
        if (isNum) {
          srNo = firstCell.replace('.', '');
          if (parts.length >= 8) {
            itemCode = parts[1];
            description = parts[2];
            unit = parts[3];
            poQty = parts[4];
            receivedQty = parts[5];
            rate = parts[6];
            amount = parts[7];
          } else if (parts.length === 7) {
            itemCode = parts[1];
            description = parts[2];
            unit = '';
            poQty = parts[3];
            receivedQty = parts[4];
            rate = parts[5];
            amount = parts[6];
          } else if (parts.length === 6) {
            description = parts[1];
            poQty = parts[2];
            receivedQty = parts[3];
            rate = parts[4];
            amount = parts[5];
          } else if (parts.length === 5) {
            description = parts[1];
            receivedQty = parts[2];
            rate = parts[3];
            amount = parts[4];
          }
        } else {
          // If first cell isn't numeric, maybe there is no serial number column
          if (parts.length >= 7) {
            itemCode = parts[0];
            description = parts[1];
            unit = parts[2];
            poQty = parts[3];
            receivedQty = parts[4];
            rate = parts[5];
            amount = parts[6];
          } else if (parts.length === 6) {
            description = parts[0];
            unit = parts[1];
            poQty = parts[2];
            receivedQty = parts[3];
            rate = parts[4];
            amount = parts[5];
          } else if (parts.length === 5) {
            description = parts[0];
            poQty = parts[1];
            receivedQty = parts[2];
            rate = parts[3];
            amount = parts[4];
          } else if (parts.length === 4) {
            description = parts[0];
            receivedQty = parts[1];
            rate = parts[2];
            amount = parts[3];
          }
          srNo = String(items.length + 1);
        }
      }

      // Final validation to filter out rows like headers, separators, or totals
      const cleanDesc = description.trim();
      const hasQty = receivedQty || poQty || amount;
      const isTotalsRow = /^(?:total|grand|sub|gst|tax|cgst|sgst|igst|net)$/i.test(cleanDesc);

      if (cleanDesc && hasQty && !isTotalsRow) {
        items.push({
          srNo: srNo.trim(),
          itemCode: itemCode.trim(),
          description: cleanDesc,
          unit: unit.trim(),
          poQty: poQty.trim(),
          receivedQty: receivedQty.trim(),
          rate: rate.trim(),
          amount: amount.trim()
        });
      }
    }
  }

  // Deduplicate and re-index serial numbers to ensure pristine order
  return items.map((item, idx) => ({
    ...item,
    srNo: item.srNo && /^\d+$/.test(item.srNo) ? item.srNo : String(idx + 1)
  }));
}

export async function POST(request: Request) {
  let body: { rawText: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { rawText } = body;
  if (!rawText) {
    return Response.json({ error: 'rawText is required' }, { status: 400 });
  }

  const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (geminiApiKey) {
    try {
      console.log('Gemini API Key detected. Initializing LLM-based field extraction...');
      const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;

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
          remarks: { type: 'STRING', description: 'Any comments, notes, or remarks found' }
        },
        required: [
          'grnNumber', 'grnDate', 'poNumber', 'invoiceNumber', 'invoiceDate',
          'vendorName', 'vendorCode', 'warehouseStore', 'department', 'vehicleNumber',
          'lineItems', 'subTotal', 'taxAmount', 'totalAmount', 'remarks'
        ]
      };

      const systemPrompt = `You are an expert GRN (Goods Receipt Note) data extraction assistant.
Extract fields from the raw OCR markdown text and return a valid JSON object matching the requested schema.

Strict Rules:
1. If any field or table item column is not found, leave it as an empty string "".
2. Clean currency symbols (₹, Rs., INR) and commas from numeric rate/amount values.
3. Carefully analyze the text for the Indian Vehicle registration number. It could be prefixed by Vehicle, Truck, Vechile, Lorry, Gate Pass, etc. Indian plates can have various space/hyphen patterns, e.g. "MH 12 TG 1234", "MH12TG1234", "DL 3C AB 1234", "HR26-XY-9999", or "22 BH 1234 AB".
4. In the lineItems list, extract all items from any table. Map the columns correctly even if they are in different orders.`;

      const payload = {
        contents: [
          {
            parts: [
              { text: `${systemPrompt}\n\nHere is the raw OCR text:\n\n${rawText}` }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: responseSchema,
          temperature: 0.1
        }
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Gemini API responded with status ${response.status}: ${await response.text()}`);
      }

      const responseData = await response.json();
      const completionText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!completionText) {
        throw new Error('Empty completion content from Gemini API');
      }

      const parsed = JSON.parse(completionText);
      const grnData: GRNData = {
        grnNumber: String(parsed.grnNumber || ''),
        grnDate: String(parsed.grnDate || ''),
        poNumber: String(parsed.poNumber || ''),
        invoiceNumber: String(parsed.invoiceNumber || ''),
        invoiceDate: String(parsed.invoiceDate || ''),
        vendorName: String(parsed.vendorName || ''),
        vendorCode: String(parsed.vendorCode || ''),
        warehouseStore: String(parsed.warehouseStore || ''),
        department: String(parsed.department || ''),
        vehicleNumber: String(parsed.vehicleNumber || ''),
        lineItems: Array.isArray(parsed.lineItems) ? parsed.lineItems.map((item: any, idx: number) => ({
          srNo: String(item.srNo || idx + 1),
          itemCode: String(item.itemCode || ''),
          description: String(item.description || ''),
          unit: String(item.unit || ''),
          poQty: String(item.poQty || ''),
          receivedQty: String(item.receivedQty || ''),
          rate: String(item.rate || ''),
          amount: String(item.amount || '')
        })) : [],
        subTotal: String(parsed.subTotal || ''),
        taxAmount: String(parsed.taxAmount || ''),
        totalAmount: String(parsed.totalAmount || ''),
        remarks: String(parsed.remarks || ''),
        rawText
      };

      console.log('Successfully extracted fields via Gemini LLM engine!');
      return Response.json({ success: true, grnData });
    } catch (err: any) {
      console.warn('Gemini LLM extraction failed. Falling back to DeepSeek or Local parser.', err);
    }
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (apiKey) {
    try {
      console.log('DeepSeek API Key detected. Initializing LLM-based field extraction...');
      
      const systemPrompt = `You are an expert GRN (Goods Receipt Note) data extraction assistant.
Extract fields from the raw OCR markdown text and return a valid JSON object matching this structure:

{
  "grnNumber": "...",
  "grnDate": "...", // Standardize date format (DD/MM/YYYY or YYYY-MM-DD)
  "poNumber": "...",
  "invoiceNumber": "...",
  "invoiceDate": "...",
  "vendorName": "...",
  "vendorCode": "...",
  "warehouseStore": "...",
  "department": "...",
  "vehicleNumber": "...", // Indian vehicle registration number (e.g. MH 12 TG 1234, MH12AB1234, DL-3C-AB-1234, 22 BH 1234 AB, temporary number)
  "lineItems": [
    {
      "srNo": "1",
      "itemCode": "...",
      "description": "...",
      "unit": "...",
      "poQty": "...",
      "receivedQty": "...",
      "rate": "...",
      "amount": "..."
    }
  ],
  "subTotal": "...",
  "taxAmount": "...",
  "totalAmount": "...",
  "remarks": "..."
}

Strict Rules:
1. Return ONLY the JSON object. No explanations, no markdown block wrappers.
2. If any field or table item column is not found, leave it as an empty string "".
3. Clean currency symbols (₹, Rs., INR) and commas from numeric rate/amount values.
4. Carefully analyze the text for the Indian Vehicle registration number. It could be prefixed by Vehicle, Truck, Vechile, Lorry, Gate Pass, etc. Indian plates can have various space/hyphen patterns, e.g. "MH 12 TG 1234", "MH12TG1234", "DL 3C AB 1234", "HR26-XY-9999", or "22 BH 1234 AB".
5. In the lineItems list, extract all items from any table. Map the columns correctly even if they are in different orders.`;

      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Here is the raw OCR text:\n\n${rawText}` }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API responded with status ${response.status}: ${await response.text()}`);
      }

      const responseData = await response.json();
      const completionText = responseData.choices?.[0]?.message?.content;
      if (!completionText) {
        throw new Error('Empty completion content from DeepSeek API');
      }

      const parsed = JSON.parse(completionText);
      const grnData: GRNData = {
        grnNumber: String(parsed.grnNumber || ''),
        grnDate: String(parsed.grnDate || ''),
        poNumber: String(parsed.poNumber || ''),
        invoiceNumber: String(parsed.invoiceNumber || ''),
        invoiceDate: String(parsed.invoiceDate || ''),
        vendorName: String(parsed.vendorName || ''),
        vendorCode: String(parsed.vendorCode || ''),
        warehouseStore: String(parsed.warehouseStore || ''),
        department: String(parsed.department || ''),
        vehicleNumber: String(parsed.vehicleNumber || ''),
        lineItems: Array.isArray(parsed.lineItems) ? parsed.lineItems.map((item: any, idx: number) => ({
          srNo: String(item.srNo || idx + 1),
          itemCode: String(item.itemCode || ''),
          description: String(item.description || ''),
          unit: String(item.unit || ''),
          poQty: String(item.poQty || ''),
          receivedQty: String(item.receivedQty || ''),
          rate: String(item.rate || ''),
          amount: String(item.amount || '')
        })) : [],
        subTotal: String(parsed.subTotal || ''),
        taxAmount: String(parsed.taxAmount || ''),
        totalAmount: String(parsed.totalAmount || ''),
        remarks: String(parsed.remarks || ''),
        rawText
      };

      console.log('Successfully extracted fields via DeepSeek LLM engine!');
      return Response.json({ success: true, grnData });

    } catch (err: any) {
      console.warn('DeepSeek LLM extraction failed. Falling back to local Regex parser.', err);
    }
  } else {
    console.log('No DEEPSEEK_API_KEY configured. Using local Regex parser.');
  }

  // Normalize text for easier header field parsing
  const text = rawText.replace(/\r\n/g, '\n').replace(/\s+/g, ' ');

  const grnData: GRNData = {
    grnNumber: extractField(text, [
      /GRN\s*(?:No|Number|#)[:\s.]*([A-Z0-9/-]+)/i,
      /Goods\s*Receipt\s*Note\s*(?:No|Number)[:\s.]*([A-Z0-9/-]+)/i,
      /GRN[:\s.]*([A-Z0-9/-]+)/i,
    ]),
    grnDate: extractField(text, [
      /GRN\s*Date[:\s.]*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})/i,
      /Receipt\s*Date[:\s.]*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})/i,
      /Date[:\s.]*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})/i,
    ]),
    poNumber: extractField(text, [
      /PO\s*(?:No|Number|#)[:\s.]*([A-Z0-9/-]+)/i,
      /Purchase\s*Order\s*(?:No|Number)[:\s.]*([A-Z0-9/-]+)/i,
      /Order\s*(?:No|Number)[:\s.]*([A-Z0-9/-]+)/i,
    ]),
    invoiceNumber: extractField(text, [
      /Invoice\s*(?:No|Number|#)[:\s.]*([A-Z0-9/-]+)/i,
      /Bill\s*(?:No|Number)[:\s.]*([A-Z0-9/-]+)/i,
      /Inv\s*(?:No|#)[:\s.]*([A-Z0-9/-]+)/i,
    ]),
    invoiceDate: extractField(text, [
      /Invoice\s*Date[:\s.]*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})/i,
      /Bill\s*Date[:\s.]*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})/i,
    ]),
    vendorName: extractField(text, [
      /Vendor\s*(?:Name)?[:\s.]*([^\n|]+?)(?:\s+Vendor\s*Code|\s+PO|\s+GRN|\s+Invoice|\s*\||$)/i,
      /Supplier\s*(?:Name)?[:\s.]*([^\n|]+?)(?:\s+Code|\s+PO|\s*\||$)/i,
      /From[:\s.]*([^\n|]+?)(?:\s+To:|\s+GRN|\s*\||$)/i,
    ]),
    vendorCode: extractField(text, [
      /Vendor\s*Code[:\s.]*([A-Z0-9-]+)/i,
      /Supplier\s*Code[:\s.]*([A-Z0-9-]+)/i,
      /Vendor\s*ID[:\s.]*([A-Z0-9-]+)/i,
    ]),
    warehouseStore: extractField(text, [
      /(?:Warehouse|Store|Location|Receiving\s*Location)[:\s.]*([^\n|]+?)(?:\s+Dept|\s+Department|\s+GRN|\s*\||$)/i,
      /Received\s*at[:\s.]*([^\n|]+?)(?:\s+GRN|\s*\||$)/i,
    ]),
    department: extractField(text, [
      /Department[:\s.]*([^\n|]+?)(?:\s+GRN|\s+PO|\s+Date|\s*\||$)/i,
      /Dept[:\s.]*([^\n|]+?)(?:\s+GRN|\s+PO|\s*\||$)/i,
      /Cost\s*Center[:\s.]*([^\n|]+?)(?:\s*\||$)/i,
    ]),
    vehicleNumber: extractField(text, [
      // Standard Indian Vehicle Number: e.g. MH 12 AB 1234, DL-3C-AB-1234, KA.03.MM.1234, HR26-XY-9999
      /(?:Vehicle|Truck|Lorry|Car|Transport|Gate\s*Pass|Vechile)\s*(?:No|Number|#)?[:\s.]*([A-Z]{2}[-\s.]?\d{1,2}[-\s.]?[A-Z]{1,3}[-\s.]?\d{4})/i,
      // Bharat Series (BH): e.g. 22 BH 1234 AB, 22-BH-1234-A
      /(?:Vehicle|Truck|Lorry|Car|Transport|Gate\s*Pass|Vechile)\s*(?:No|Number|#)?[:\s.]*(\d{2}[-\s.]?BH[-\s.]?\d{4}[-\s.]?[A-Z]{1,2})/i,
      // Alphanumeric fallback for any other general vehicle plate format (6-15 chars)
      /(?:Vehicle|Truck|Lorry|Car|Transport|Gate\s*Pass|Vechile)\s*(?:No|Number|#)?[:\s.]*([A-Z0-9-]{6,15})/i,
      /(?:Vehicle|Truck|Lorry|Gate\s*Pass|Vechile)[:\s.]*([^\n|]+?)(?:\s+Date|\s+PO|\s+GRN|\s*\||$)/i,
    ]),
    lineItems: extractLineItems(rawText),
    subTotal: extractField(text, [
      /Sub[\s-]?Total[:\s.]*(?:Rs\.?|INR|₹)?\s*([\d,.]+)/i,
      /Net\s*Amount[:\s.]*(?:Rs\.?|INR|₹)?\s*([\d,.]+)/i,
    ]),
    taxAmount: extractField(text, [
      /(?:GST|Tax|CGST|SGST|IGST)[:\s.]*(?:Rs\.?|INR|₹)?\s*([\d,.]+)/i,
      /Tax\s*Amount[:\s.]*(?:Rs\.?|INR|₹)?\s*([\d,.]+)/i,
    ]),
    totalAmount: extractField(text, [
      /(?:Grand\s*)?Total[:\s.]*(?:Rs\.?|INR|₹)?\s*([\d,.]+)/i,
      /Total\s*Amount[:\s.]*(?:Rs\.?|INR|₹)?\s*([\d,.]+)/i,
      /Amount\s*Payable[:\s.]*(?:Rs\.?|INR|₹)?\s*([\d,.]+)/i,
    ]),
    remarks: extractField(text, [
      /Remarks[:\s.]*([^\n|]+)/i,
      /Notes[:\s.]*([^\n|]+)/i,
      /Comments[:\s.]*([^\n|]+)/i,
    ]),
    rawText,
  };

  return Response.json({ success: true, grnData });
}
