import type { NextRequest } from 'next/server';
import { SarvamAIClient } from 'sarvamai';
import AdmZip from 'adm-zip';

// POST /api/ocr
// Accepts multipart/form-data with a "file" field (image or PDF) and an optional "language" field
// Uses Sarvam Document Intelligence SDK: createJob → uploadFile → start → poll → download
export async function POST(request: NextRequest) {
  const apiKey = process.env.SARVAM_API_KEY;
  if (!apiKey || apiKey === 'your_sarvam_api_key_here') {
    return Response.json(
      { success: false, error: 'API key not configured. Add SARVAM_API_KEY to .env.local' },
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

  const language = ((formData.get('language') as string) || 'en-IN') as any;

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
    const client = new SarvamAIClient({ apiSubscriptionKey: apiKey });

    // Step 1: Create a new job with dynamic language parameter
    const job = await client.documentIntelligence.createJob({
      language: language,
      outputFormat: 'md',
    });
    console.log('Sarvam job created with language:', language, 'jobId:', job.jobId);

    // Step 2: Upload the file (SDK fetches presigned URL and uploads directly)
    await job.uploadFile(file);
    console.log('Sarvam file uploaded');

    // Step 3: Start processing
    await job.start();
    console.log('Sarvam job started');

    // Step 4: Poll until complete (SDK polls every 2s, up to 150 attempts = ~5 min)
    await job.waitUntilComplete();
    console.log('Sarvam job complete');

    // Step 5: Get presigned download URL and fetch content
    const downloadResponse = await client.documentIntelligence.getDownloadLinks(job.jobId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const downloadUrls = (downloadResponse as any).download_urls ?? {};
    const firstEntry = Object.values(downloadUrls)[0] as { file_url?: string } | undefined;
    const fileUrl = firstEntry?.file_url;

    if (!fileUrl) {
      return Response.json(
        { success: false, error: 'No download URL returned from Sarvam. Job may still be processing.' },
        { status: 500 }
      );
    }

    const dlRes = await fetch(fileUrl);
    if (!dlRes.ok) {
      return Response.json(
        { success: false, error: `Failed to download result: ${dlRes.status}` },
        { status: 500 }
      );
    }

    // Since Sarvam returns a ZIP archive containing the document, we must unzip it to get the raw Markdown text
    const arrayBuffer = await dlRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let rawText = '';
    try {
      const zip = new AdmZip(buffer);
      const zipEntries = zip.getEntries();
      
      // Look for document.md in the ZIP archive
      const docEntry = zipEntries.find((entry: any) => entry.entryName === 'document.md');
      if (docEntry) {
        rawText = docEntry.getData().toString('utf8');
      } else {
        // Fallback: If document.md is not found, list available files or read first entry
        console.warn('document.md not found in Sarvam ZIP. Available files:', zipEntries.map((e: any) => e.entryName));
        const txtEntry = zipEntries.find((entry: any) => entry.entryName.endsWith('.md') || entry.entryName.endsWith('.txt'));
        if (txtEntry) {
          rawText = txtEntry.getData().toString('utf8');
        } else if (zipEntries.length > 0) {
          rawText = zipEntries[0].getData().toString('utf8');
        }
      }
    } catch (zipError) {
      console.error('Error unzipping Sarvam output:', zipError);
      return Response.json(
        { success: false, error: 'Failed to extract raw text from Sarvam ZIP archive' },
        { status: 500 }
      );
    }

    console.log('Sarvam extracted text length:', rawText.length);
    return Response.json({ success: true, rawText, jobId: job.jobId });

  } catch (error) {
    console.error('OCR API error:', error);
    const msg = error instanceof Error ? error.message : String(error);
    return Response.json(
      { success: false, error: `Processing error: ${msg}` },
      { status: 500 }
    );
  }
}
