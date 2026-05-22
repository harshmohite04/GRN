"use client";

import { useState, useRef, useCallback, useEffect } from "react";

// Premium Inline SVG Icons for Corporate Aesthetic
const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" fill="rgba(255,255,255,0.2)" />
    <path d="M9 12h6M9 16h6" />
  </svg>
);

const DocumentIcon = ({ size = 20, color = "var(--accent-primary)" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const CameraIcon = ({ size = 20, color = "#64748b" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const TrashIcon = ({ size = 14, color = "#e11d48" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const SaveIcon = ({ size = 15, color = "#fff" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const ResetIcon = ({ size = 15, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <polyline points="3 3 3 8 8 8" />
  </svg>
);

const AlertIcon = ({ size = 18, color = "#991b1b" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const GlobeIcon = ({ size = 14, color = "#64748b" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const PlusIcon = ({ size = 12 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const LanguagesIcon = ({ size = 18, color = "#4f46e5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <path d="m5 8 6 6" />
    <path d="m4 14 6-6 2-3" />
    <path d="M2 5h12" />
    <path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" />
    <path d="M14 18h6" />
  </svg>
);

// All 23 supported document processing languages
const LANGUAGES = [
  { code: "en-IN", label: "English" },
  { code: "hi-IN", label: "Hindi (हिंदी)" },
  { code: "mr-IN", label: "Marathi (मराठी)" },
  { code: "gu-IN", label: "Gujarati (ગુજરાતી)" },
  { code: "ta-IN", label: "Tamil (தமிழ்)" },
  { code: "te-IN", label: "Telugu (తెలుగు)" },
  { code: "kn-IN", label: "Kannada (ಕನ್ನಡ)" },
  { code: "ml-IN", label: "Malayalam (മലയാളം)" },
  { code: "bn-IN", label: "Bengali (বাংলা)" },
  { code: "pa-IN", label: "Punjabi (ਪੰਜਾਬੀ)" },
  { code: "ur-IN", label: "Urdu (اردو)" },
  { code: "as-IN", label: "Assamese (অসমীয়া)" },
  { code: "or-IN", label: "Odia (ଓଡ଼ିଆ)" },
  { code: "sa-IN", label: "Sanskrit (संस्कृत)" },
  { code: "kok-IN", label: "Konkani (कोंकणी)" },
  { code: "ne-IN", label: "Nepali (नेपाली)" },
  { code: "sd-IN", label: "Sindhi (سنڌي)" },
  { code: "ks-IN", label: "Kashmiri (कश्मीरी)" },
  { code: "mni-IN", label: "Manipuri (মণিপুরী)" },
  { code: "bodo-IN", label: "Bodo (बੜੋ)" },
  { code: "doi-IN", label: "Dogri (डोगरी)" },
  { code: "mai-IN", label: "Maithili (मैथिली)" },
  { code: "sat-IN", label: "Santali (संताली)" }
];

interface GRNLineItem {
  srNo: string; itemCode: string; description: string; unit: string;
  poQty: string; receivedQty: string; rate: string; amount: string;
}
interface GRNData {
  grnNumber: string; grnDate: string; poNumber: string;
  invoiceNumber: string; invoiceDate: string; vendorName: string;
  vendorCode: string; warehouseStore: string; department: string;
  vehicleNumber: string;
  lineItems: GRNLineItem[]; subTotal: string; taxAmount: string;
  totalAmount: string; remarks: string; rawText: string;
}
type Step = "upload" | "processing" | "review";

export default function ScanPage() {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [processingMsg, setProcessingMsg] = useState("Uploading document…");
  const [error, setError] = useState<string | null>(null);
  const [grnData, setGrnData] = useState<GRNData | null>(null);
  const [rawText, setRawText] = useState("");
  const [showRaw, setShowRaw] = useState(false);
  const [inputMode, setInputMode] = useState<"upload" | "camera">("camera");
  const [docLanguage, setDocLanguage] = useState("en-IN");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setError(null); setFile(f);
    if (f.type.startsWith("image/")) setPreview(URL.createObjectURL(f));
    else setPreview(null);
  };
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragOver(false);
    const f = e.dataTransfer.files[0]; if (f) handleFile(f);
  }, []);
  const updateField = (field: keyof GRNData, value: string) =>
    setGrnData((p) => p ? { ...p, [field]: value } : p);
  const updateLineItem = (idx: number, field: keyof GRNLineItem, value: string) =>
    setGrnData((p) => { if (!p) return p; const items = [...p.lineItems]; items[idx] = { ...items[idx], [field]: value }; return { ...p, lineItems: items }; });
  const addLineItem = () =>
    setGrnData((p) => p ? { ...p, lineItems: [...p.lineItems, { srNo: String(p.lineItems.length + 1), itemCode: "", description: "", unit: "", poQty: "", receivedQty: "", rate: "", amount: "" }] } : p);
  const removeLineItem = (idx: number) =>
    setGrnData((p) => p ? { ...p, lineItems: p.lineItems.filter((_, i) => i !== idx) } : p);

  const handleExtract = async () => {
    if (!file) return;
    setError(null); setStep("processing");
    try {
      setProcessingMsg("Digitizing and analyzing document…");
      const form = new FormData();
      form.append("file", file);
      form.append("language", docLanguage);
      
      const ocrRes = await fetch("/api/ocr", { method: "POST", body: form });
      const ocrJson = await ocrRes.json();
      if (!ocrRes.ok || !ocrJson.success) throw new Error(ocrJson.error || "Document processing failed");
      
      setRawText(ocrJson.rawText || "");
      
      // If structured GRN data was returned directly, use it!
      if (ocrJson.grnData) {
        setGrnData(ocrJson.grnData);
        setStep("review");
        return;
      }
      
      // Fallback: If for some reason grnData is missing, perform the secondary extraction step
      setProcessingMsg("Extracting GRN fields…");
      const extractRes = await fetch("/api/extract-grn", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: ocrJson.rawText }),
      });
      const extractJson = await extractRes.json();
      if (!extractRes.ok || !extractJson.success) throw new Error(extractJson.error || "Extraction failed");
      
      setGrnData(extractJson.grnData);
      setStep("review");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setStep("upload");
    }
  };

  const handleReset = () => {
    setStep("upload"); setFile(null); setPreview(null);
    setGrnData(null); setRawText(""); setError(null); setShowRaw(false);
  };

  const STEPS = [
    { id: "upload", label: "Upload" },
    { id: "processing", label: "Extract" },
    { id: "review", label: "Review" },
  ] as const;
  const currentIdx = STEPS.findIndex((s) => s.id === step);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", flexDirection: "column" }}>
      {/* NAV */}
      <nav style={{
        background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 8px rgba(79,70,229,0.18)" }}>
              <LogoIcon />
            </div>
            <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a" }}>GRN Automation</span>
          </a>

          {/* Step indicators */}
          <div className="steps-list">
            {STEPS.map((s, i) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div
                  className="step-pill"
                  style={{
                    background: step === s.id ? "#ede9fe" : "transparent",
                    color: step === s.id ? "#4f46e5" : i < currentIdx ? "#059669" : "#94a3b8",
                  }}
                >
                  <span
                    className="step-dot"
                    style={{
                      background: step === s.id ? "#4f46e5" : i < currentIdx ? "#059669" : "#e2e8f0",
                      color: step === s.id || i < currentIdx ? "#fff" : "#94a3b8",
                    }}
                  >
                    {i < currentIdx ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : i + 1}
                  </span>
                  <span className="step-label">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && <div className="step-connector" />}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ flex: 1, maxWidth: 900, width: "100%", margin: "0 auto", padding: "32px 20px 100px" }}>
        {/* Error banner */}
        {error && (
          <div className="animate-fade-in" style={{
            display: "flex", gap: 10, alignItems: "flex-start",
            padding: "13px 16px", borderRadius: 12,
            background: "#fff1f2", border: "1px solid #fecdd3",
            color: "#991b1b", marginBottom: 20,
          }}>
            <span style={{ flexShrink: 0, display: "flex", marginTop: 2 }}><AlertIcon /></span>
            <div>
              <strong style={{ display: "block", fontSize: "0.875rem" }}>Error</strong>
              <span style={{ fontSize: "0.83rem", opacity: 0.85 }}>{error}</span>
            </div>
          </div>
        )}

        {step === "upload" && (
          <UploadStep
            file={file} preview={preview} isDragOver={isDragOver}
            fileInputRef={fileInputRef} onDrop={onDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onFileChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            onExtract={handleExtract}
            onClear={() => { setFile(null); setPreview(null); }}
            inputMode={inputMode}
            setInputMode={setInputMode}
            onCameraCapture={handleFile}
            docLanguage={docLanguage}
            setDocLanguage={setDocLanguage}
          />
        )}
        {step === "processing" && <ProcessingStep message={processingMsg} />}
        {step === "review" && grnData && (
          <ReviewStep
            grnData={grnData} rawText={rawText} showRaw={showRaw}
            setShowRaw={setShowRaw} updateField={updateField}
            updateLineItem={updateLineItem} addLineItem={addLineItem}
            removeLineItem={removeLineItem} onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}

/* ─── UPLOAD STEP ─── */
function UploadStep({
  file, preview, isDragOver, fileInputRef, onDrop, onDragOver, onDragLeave, onFileChange, onExtract, onClear, inputMode, setInputMode, onCameraCapture, docLanguage, setDocLanguage
}: {
  file: File | null; preview: string | null; isDragOver: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExtract: () => void; onClear: () => void;
  inputMode: "upload" | "camera";
  setInputMode: (m: "upload" | "camera") => void;
  onCameraCapture: (f: File) => void;
  docLanguage: string;
  setDocLanguage: (l: string) => void;
}) {
  const infoItems = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto" }}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
      label: "Photos & Scans",
      desc: "JPG, PNG up to 10 MB"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto" }}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
      label: "PDF Documents",
      desc: "Single or multi-page"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto" }}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
      label: "Handwritten GRNs",
      desc: "Advanced script analysis"
    }
  ];

  return (
    <div className="animate-fade-in-up">
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: "clamp(1.3rem,4vw,1.6rem)", fontWeight: 800, color: "#0f172a", marginBottom: 5 }}>
          Scan GRN Document
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          Upload a file or use your camera to scan a GRN document
        </p>
      </div>

      {/* Language selector */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "12px 16px",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        marginBottom: 18,
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LanguagesIcon />
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#0f172a" }}>Document Language</div>
            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Select the language written in the GRN</div>
          </div>
        </div>
        <select
          value={docLanguage}
          onChange={(e) => setDocLanguage(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            background: "#fff",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#4f46e5",
            outline: "none",
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
          }}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mode tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 18, padding: 4, background: "#f1f4f9", borderRadius: 12, width: "fit-content" }}>
        {(["upload", "camera"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setInputMode(mode)}
            style={{
              padding: "8px 20px", borderRadius: 9, border: "none", cursor: "pointer",
              fontWeight: 600, fontSize: "0.85rem", transition: "all 0.2s",
              background: inputMode === mode ? "#fff" : "transparent",
              color: inputMode === mode ? "#4f46e5" : "#64748b",
              boxShadow: inputMode === mode ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {mode === "upload" ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle" }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload File
              </span>
            ) : (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <CameraIcon size={16} color="currentColor" />
                Scan with Camera
              </span>
            )}
          </button>
        ))}
      </div>

      {inputMode === "upload" ? (
        <>
          {/* Drop zone */}
          <div
            className={`drop-zone ${isDragOver ? "drag-over" : ""} ${file ? "has-file" : ""}`}
            onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
            onClick={() => !file && fileInputRef.current?.click()}
            style={{ padding: file ? "32px 20px" : "52px 24px", textAlign: "center" }}
            id="drop-zone"
          >
            <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg,image/png,application/pdf" onChange={onFileChange} style={{ display: "none" }} id="file-input" />
            {!file ? (
              <>
                <div className="animate-float" style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
                  <DocumentIcon size={44} color="#4f46e5" />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: 5 }}>Drop your GRN document here</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: 16 }}>or <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>tap to browse files</span></p>
                <div style={{ display: "flex", gap: 7, justifyContent: "center", flexWrap: "wrap" }}>
                  {["JPG", "PNG", "PDF"].map((t) => <span key={t} className="badge badge-neutral">{t}</span>)}
                  <span className="badge badge-neutral">Max 10 MB</span>
                </div>
              </>
            ) : (
              <>
                {preview ? (
                  <img src={preview} alt="Preview" style={{ maxHeight: 220, maxWidth: "100%", borderRadius: 10, objectFit: "contain", marginBottom: 12, boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }} />
                ) : (
                  <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                )}
                <div className="badge badge-success" style={{ marginBottom: 8, display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {file.name}
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginBottom: 14 }}>{(file.size / 1024).toFixed(1)} KB · {file.type.split("/")[1].toUpperCase()}</p>
                <button className="btn-danger" onClick={(e) => { e.stopPropagation(); onClear(); }} id="clear-file-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6, margin: "0 auto" }}>
                  <TrashIcon size={14} color="#fff" /> Remove
                </button>
              </>
            )}
          </div>
          {file && (
            <div className="animate-fade-in" style={{ marginTop: 14 }}>
              <button className="btn-primary" onClick={onExtract} id="extract-btn" style={{ width: "100%", justifyContent: "center", padding: "13px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                  Extract Fields
                </span>
              </button>
            </div>
          )}
        </>
      ) : (
        <CameraCapture onCapture={onCameraCapture} onExtract={onExtract} capturedFile={file} capturedPreview={preview} onClear={onClear} onSwitchToUpload={() => setInputMode("upload")} />
      )}

      {/* Info cards */}
      <div className="info-cards" style={{ marginTop: 24 }}>
        {infoItems.map((item) => (
          <div key={item.label} className="card" style={{ padding: "16px 14px", textAlign: "center" }}>
            <div style={{ marginBottom: 7, display: "flex", justifyContent: "center" }}>{item.icon}</div>
            <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#0f172a", marginBottom: 2 }}>{item.label}</div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.76rem" }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── CAMERA CAPTURE ─── */
function CameraCapture({ onCapture, onExtract, capturedFile, capturedPreview, onClear, onSwitchToUpload }: {
  onCapture: (f: File) => void;
  onExtract: () => void;
  capturedFile: File | null;
  capturedPreview: string | null;
  onClear: () => void;
  onSwitchToUpload: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [camError, setCamError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [facing, setFacing] = useState<"environment" | "user">("environment");

  const startCamera = async (facingMode: "environment" | "user") => {
    setCamError(null);
    setIsLoading(true);

    // Check 1: HTTPS required (blocks on mobile over LAN)
    if (typeof window !== "undefined" && !window.isSecureContext) {
      setCamError("INSECURE_CONTEXT");
      setIsLoading(false);
      return;
    }

    // Check 2: API not available
    if (!navigator.mediaDevices?.getUserMedia) {
      setCamError("Camera is not supported in this browser.");
      setIsLoading(false);
      return;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    // 5-second timeout so it never hangs
    const timeoutId = setTimeout(() => {
      setCamError("Camera took too long to start. Try refreshing or use Upload instead.");
      setIsLoading(false);
    }, 5000);

    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      clearTimeout(timeoutId);
      streamRef.current = s;
      const video = videoRef.current;
      if (video) {
        video.srcObject = s;
        video.onloadedmetadata = async () => {
          try { await video.play(); } catch { /* silent on some browsers */ }
          setIsLoading(false);
        };
      }
    } catch (err) {
      clearTimeout(timeoutId);
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("NotAllowed") || msg.includes("Permission") || msg.includes("denied")) {
        setCamError("Permission denied. Allow camera access in your browser and tap Try Again.");
      } else if (msg.includes("NotFound") || msg.includes("DevicesNotFound")) {
        setCamError("No camera found on this device.");
      } else {
        setCamError("Could not start camera. Use Upload File instead.");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!capturedFile) startCamera("environment");
    return () => { streamRef.current?.getTracks().forEach((t) => t.stop()); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchCamera = async () => {
    const next = facing === "environment" ? "user" : "environment";
    setFacing(next);
    await startCamera(next);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const f = new File([blob], `grn-capture-${Date.now()}.jpg`, { type: "image/jpeg" });
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      onCapture(f);
    }, "image/jpeg", 0.92);
  };

  if (camError) {
    const isHttpIssue = camError === "INSECURE_CONTEXT";
    return (
      <div style={{
        padding: "32px 20px", textAlign: "center", borderRadius: 16,
        background: isHttpIssue ? "#fffbeb" : "#fff1f2",
        border: `1px solid ${isHttpIssue ? "#fde68a" : "#fecdd3"}`,
      }}>
        <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
          {isHttpIssue ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          ) : (
            <CameraIcon size={36} color="#e11d48" />
          )}
        </div>
        <p style={{ color: isHttpIssue ? "#92400e" : "#991b1b", fontWeight: 700, marginBottom: 8, fontSize: "0.95rem" }}>
          {isHttpIssue ? "Camera requires a secure connection" : "Camera Unavailable"}
        </p>
        <p style={{ color: isHttpIssue ? "#b45309" : "#b91c1c", fontSize: "0.82rem", marginBottom: 20, lineHeight: 1.7 }}>
          {isHttpIssue
            ? "Your mobile browser blocks camera access over a local network (HTTP). Tap below to upload a photo from your gallery instead."
            : camError}
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={onSwitchToUpload} id="switch-upload-btn">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              Use Upload Instead
            </span>
          </button>
          {!isHttpIssue && (
            <button className="btn-secondary" onClick={() => startCamera(facing)}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <ResetIcon size={14} color="currentColor" />
                Try Again
              </span>
            </button>
          )}
        </div>
      </div>
    );
  }


  if (capturedFile && capturedPreview) {
    return (
      <div style={{ textAlign: "center" }}>
        <img src={capturedPreview} alt="Captured" style={{ width: "100%", maxHeight: 340, objectFit: "contain", borderRadius: 14, marginBottom: 14, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
        <div className="badge badge-success" style={{ marginBottom: 10, display: "inline-flex", alignItems: "center", gap: 6 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          Photo captured
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button className="btn-secondary" style={{ flex: 1, justifyContent: "center" }} onClick={() => { onClear(); startCamera(facing); }} id="retake-btn">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <ResetIcon size={14} color="currentColor" />
              Retake
            </span>
          </button>
          <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={onExtract} id="extract-camera-btn">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Extract Fields
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "#1e1e1e", aspectRatio: "4/3" }}>
        {/* Video — always rendered so ref is available; hidden while loading */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: isLoading ? 0 : 1, transition: "opacity 0.3s" }}
        />

        {/* Loading overlay */}
        {isLoading && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.2)", borderTopColor: "#fff", animation: "spin 0.9s linear infinite" }} />
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>Starting camera…</p>
          </div>
        )}

        {/* Viewfinder corners — only when live */}
        {!isLoading && ["tl","tr","bl","br"].map((pos) => (
          <div key={pos} style={{
            position: "absolute", width: 26, height: 26,
            top: pos.startsWith("t") ? 14 : undefined,
            bottom: pos.startsWith("b") ? 14 : undefined,
            left: pos.endsWith("l") ? 14 : undefined,
            right: pos.endsWith("r") ? 14 : undefined,
            borderTop: pos.startsWith("t") ? "3px solid rgba(255,255,255,0.75)" : undefined,
            borderBottom: pos.startsWith("b") ? "3px solid rgba(255,255,255,0.75)" : undefined,
            borderLeft: pos.endsWith("l") ? "3px solid rgba(255,255,255,0.75)" : undefined,
            borderRight: pos.endsWith("r") ? "3px solid rgba(255,255,255,0.75)" : undefined,
            borderRadius: pos === "tl" ? "5px 0 0 0" : pos === "tr" ? "0 5px 0 0" : pos === "bl" ? "0 0 0 5px" : "0 0 5px 0",
          }} />
        ))}

        {/* Flip camera button */}
        {!isLoading && (
          <button
            onClick={switchCamera} title="Flip camera" id="flip-camera-btn"
            style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Capture button */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 18, gap: 8 }}>
        <button
          onClick={capturePhoto} id="capture-btn"
          disabled={isLoading}
          style={{
            width: 70, height: 70, borderRadius: "50%", border: "4px solid #4f46e5",
            background: "#fff", cursor: isLoading ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 18px rgba(79,70,229,0.28)", transition: "transform 0.1s",
            opacity: isLoading ? 0.5 : 1,
          }}
          onMouseDown={(e) => { if (!isLoading) e.currentTarget.style.transform = "scale(0.9)"; }}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onTouchStart={(e) => { if (!isLoading) e.currentTarget.style.transform = "scale(0.9)"; }}
          onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: isLoading ? "#cbd5e1" : "linear-gradient(135deg,#4f46e5,#7c3aed)" }} />
        </button>
        <p style={{ color: "var(--text-muted)", fontSize: "0.76rem" }}>
          {isLoading ? "Waiting for camera…" : "Tap to capture"}
        </p>
      </div>
    </div>
  );
}


/* ─── PROCESSING STEP ─── */
function ProcessingStep({ message }: { message: string }) {
  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 380, gap: 24, padding: "0 16px" }}>
      <div style={{ position: "relative", width: 90, height: 90, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Outer rotating ring */}
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "3px solid transparent", borderTopColor: "#4f46e5", borderBottomColor: "#4f46e5", animation: "spin 1.5s linear infinite" }} />
        {/* Inner reverse rotating ring */}
        <div style={{ position: "absolute", inset: 8, borderRadius: "50%", border: "2.5px solid transparent", borderLeftColor: "#7c3aed", borderRightColor: "#7c3aed", animation: "spin 1.2s linear infinite reverse" }} />
        {/* Glow / Pulse effect */}
        <div style={{
          position: "absolute",
          inset: 18,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(124,58,237,0.02) 70%)",
          boxShadow: "0 0 15px rgba(79,70,229,0.25)",
          animation: "pulse 1.8s ease-in-out infinite",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 2px rgba(79,70,229,0.5))" }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            {/* Animated scanline */}
            <line x1="6" y1="12" x2="18" y2="12" stroke="#7c3aed" strokeWidth="2.5" style={{ animation: "scanline 1.5s ease-in-out infinite" }} />
          </svg>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: 5 }}>Processing Document</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{message}</p>
      </div>
      <div style={{ width: "100%", maxWidth: 320 }}>
        <div style={{ height: 4, background: "#e2e8f0", borderRadius: 100, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg,#4f46e5,#7c3aed)", borderRadius: 100, animation: "progress-bar 30s linear forwards" }} />
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: 7, textAlign: "center" }}>This may take up to 30 seconds…</p>
      </div>
    </div>
  );
}

/* ─── REVIEW STEP ─── */
function ReviewStep({ grnData, rawText, showRaw, setShowRaw, updateField, updateLineItem, addLineItem, removeLineItem, onReset }: {
  grnData: GRNData; rawText: string; showRaw: boolean; setShowRaw: (v: boolean) => void;
  updateField: (f: keyof GRNData, v: string) => void;
  updateLineItem: (i: number, f: keyof GRNLineItem, v: string) => void;
  addLineItem: () => void; removeLineItem: (i: number) => void; onReset: () => void;
}) {
  const [saved, setSaved] = useState(false);
  const [confirmedFields, setConfirmedFields] = useState<Set<string>>(new Set());

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    console.log("Saved GRN Data:", grnData);
    console.log("Confirmed Fields:", Array.from(confirmedFields));
  };

  const headerFields = [
    { key: "grnNumber" as const, label: "GRN Number" },
    { key: "grnDate" as const, label: "GRN Date" },
    { key: "poNumber" as const, label: "PO Number" },
    { key: "invoiceNumber" as const, label: "Invoice Number" },
    { key: "invoiceDate" as const, label: "Invoice Date" },
    { key: "vendorName" as const, label: "Vendor Name" },
    { key: "vendorCode" as const, label: "Vendor Code" },
    { key: "warehouseStore" as const, label: "Warehouse / Store" },
    { key: "department" as const, label: "Department" },
    { key: "vehicleNumber" as const, label: "Vehicle Number" },
  ];

  const toggleConfirmed = (fieldKey: string) => {
    setConfirmedFields((prev) => {
      const next = new Set(prev);
      if (next.has(fieldKey)) {
        next.delete(fieldKey);
      } else {
        next.add(fieldKey);
      }
      return next;
    });
  };

  const handleVerifyAll = () => {
    const all = [
      ...headerFields.map(f => f.key),
      "subTotal", "taxAmount", "totalAmount", "remarks",
      ...grnData.lineItems.map((_, idx) => `line-${idx}`)
    ];
    setConfirmedFields(new Set(all));
  };

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="review-header">
        <div>
          <div className="badge badge-success" style={{ marginBottom: 7, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Extraction Complete
          </div>
          <h1 style={{ fontSize: "clamp(1.2rem,4vw,1.5rem)", fontWeight: 800, color: "#0f172a" }}>Review Extracted GRN</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: 3 }}>Verify and edit fields before saving</p>
        </div>
        <div className="review-header-actions" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn-secondary" onClick={onReset} id="scan-another-btn">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <ResetIcon size={14} color="currentColor" />
              Scan Another
            </span>
          </button>

          <button
            onClick={handleVerifyAll}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "9px 16px", borderRadius: 10,
              background: "#dcfce7", border: "1px solid #bbf7d0",
              color: "#15803d", fontWeight: 600, fontSize: "0.84rem",
              cursor: "pointer", transition: "all 0.2s"
            }}
            type="button"
            id="verify-all-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Verify All Fields
          </button>

          <button className="btn-primary" onClick={handleSave} id="save-grn-btn">
            {saved ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Saved!
              </span>
            ) : (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <SaveIcon size={14} />
                Save GRN
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Header fields */}
      <div className="card" style={{ padding: "22px 20px 18px", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <div style={{ width: 5, height: 16, borderRadius: 3, background: "#4f46e5" }} />
          <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0f172a" }}>GRN Header Information</span>
        </div>
        <div className="input-grid">
          {headerFields.map(({ key, label }) => (
            <div key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <label className="input-label" htmlFor={`field-${key}`} style={{ margin: 0 }}>{label}</label>
                <button
                  onClick={() => toggleConfirmed(key)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 4,
                    fontSize: "0.72rem", fontWeight: 600,
                    color: confirmedFields.has(key) ? "#10b981" : "#94a3b8",
                    transition: "all 0.2s ease", padding: "2px 4px", borderRadius: 4
                  }}
                  type="button"
                  title={confirmedFields.has(key) ? "Field Verified" : "Click to Verify Field"}
                >
                  {confirmedFields.has(key) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "scale-up 0.2s ease" }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <div style={{ width: 10, height: 10, borderRadius: "50%", border: "1.5px solid #cbd5e1" }} />
                  )}
                  {confirmedFields.has(key) ? "Verified" : "Verify"}
                </button>
              </div>
              <input
                id={`field-${key}`} className="input-field"
                value={(grnData[key] as string) || ""}
                onChange={(e) => {
                  updateField(key, e.target.value);
                  if (confirmedFields.has(key)) {
                    setConfirmedFields((prev) => {
                      const next = new Set(prev);
                      next.delete(key);
                      return next;
                    });
                  }
                }}
                style={{
                  border: confirmedFields.has(key) ? "1.5px solid #10b981" : "1px solid #cbd5e1",
                  background: confirmedFields.has(key) ? "#f0fdf4" : "#fff",
                  transition: "all 0.2s ease",
                }}
                placeholder={`Enter ${label}…`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Line Items */}
      <div className="card" style={{ padding: "22px 20px 18px", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 5, height: 16, borderRadius: 3, background: "#7c3aed" }} />
            <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0f172a" }}>Line Items</span>
          </div>
          <button className="btn-secondary" onClick={addLineItem} id="add-line-btn" style={{ padding: "6px 12px", fontSize: "0.78rem", display: "inline-flex", alignItems: "center", gap: 5 }}>
            <PlusIcon size={12} /> Add Row
          </button>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {["Confirm", "#", "Item Code", "Description", "Unit", "PO Qty", "Rcvd Qty", "Rate", "Amount", ""].map((h) => (
                  <th key={h} style={{ whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grnData.lineItems.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ textAlign: "center", padding: "24px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    No line items extracted. Click &quot;+ Add Row&quot; to add manually.
                  </td>
                </tr>
              ) : (
                grnData.lineItems.map((item, i) => {
                  const itemKey = `line-${i}`;
                  const isVerified = confirmedFields.has(itemKey);
                  return (
                    <tr key={i} style={{
                      background: isVerified ? "#f0fdf4" : "transparent",
                      transition: "all 0.2s ease"
                    }}>
                      {/* Verification Toggle */}
                      <td style={{ textAlign: "center", verticalAlign: "middle", padding: "6px 8px", width: 44 }}>
                        <button
                          onClick={() => toggleConfirmed(itemKey)}
                          style={{
                            cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: isVerified ? "#10b981" : "#94a3b8",
                            width: 20, height: 20, borderRadius: "50%",
                            border: isVerified ? "1.5px solid #10b981" : "1.5px solid #cbd5e1",
                            background: isVerified ? "#fff" : "transparent",
                            transition: "all 0.2s ease", margin: "0 auto"
                          }}
                          type="button"
                          title={isVerified ? "Row Verified" : "Click to Verify Row"}
                        >
                          {isVerified && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "scale-up 0.15s ease" }}>
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </button>
                      </td>
                      {(["srNo", "itemCode", "description", "unit", "poQty", "receivedQty", "rate", "amount"] as const).map((f) => (
                        <td key={f}>
                          <input
                            value={item[f] || ""} placeholder="—"
                            onChange={(e) => {
                              updateLineItem(i, f, e.target.value);
                              if (confirmedFields.has(itemKey)) {
                                setConfirmedFields((prev) => {
                                  const next = new Set(prev);
                                  next.delete(itemKey);
                                  return next;
                                });
                              }
                            }}
                            id={`line-${i}-${f}`}
                            style={{
                              minWidth: f === "description" ? 120 : 60,
                              color: isVerified ? "#065f46" : "inherit",
                              fontWeight: isVerified ? 500 : "normal",
                            }}
                          />
                        </td>
                      ))}
                      <td>
                        <button
                          onClick={() => removeLineItem(i)}
                          style={{ background: "none", border: "none", cursor: "pointer", padding: "3px 6px", borderRadius: 4, minWidth: 28, minHeight: 28, display: "flex", alignItems: "center", justifyContent: "center" }}
                          title="Remove"
                        >
                          <TrashIcon size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals & Remarks */}
      <div className="card" style={{ padding: "22px 20px 18px", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <div style={{ width: 5, height: 16, borderRadius: 3, background: "#0891b2" }} />
          <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0f172a" }}>Totals &amp; Remarks</span>
        </div>
        <div className="totals-grid">
          {([
            { key: "subTotal" as const, label: "Sub Total" },
            { key: "taxAmount" as const, label: "Tax / GST" },
            { key: "totalAmount" as const, label: "Total Amount" },
          ]).map(({ key, label }) => (
            <div key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <label className="input-label" htmlFor={`field-${key}`} style={{ margin: 0 }}>{label}</label>
                <button
                  onClick={() => toggleConfirmed(key)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 4,
                    fontSize: "0.72rem", fontWeight: 600,
                    color: confirmedFields.has(key) ? "#10b981" : "#94a3b8",
                    transition: "all 0.2s ease", padding: "2px 4px", borderRadius: 4
                  }}
                  type="button"
                  title={confirmedFields.has(key) ? "Field Verified" : "Click to Verify Field"}
                >
                  {confirmedFields.has(key) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "scale-up 0.2s ease" }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <div style={{ width: 10, height: 10, borderRadius: "50%", border: "1.5px solid #cbd5e1" }} />
                  )}
                  {confirmedFields.has(key) ? "Verified" : "Verify"}
                </button>
              </div>
              <input
                id={`field-${key}`} className="input-field"
                value={grnData[key] || ""}
                onChange={(e) => {
                  updateField(key, e.target.value);
                  if (confirmedFields.has(key)) {
                    setConfirmedFields((prev) => {
                      const next = new Set(prev);
                      next.delete(key);
                      return next;
                    });
                  }
                }}
                style={{
                  border: confirmedFields.has(key) ? "1.5px solid #10b981" : "1px solid #cbd5e1",
                  background: confirmedFields.has(key) ? "#f0fdf4" : "#fff",
                  transition: "all 0.2s ease",
                }}
                placeholder="₹ 0.00"
              />
            </div>
          ))}
          <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label className="input-label" htmlFor="field-remarks" style={{ margin: 0 }}>Remarks</label>
              <button
                onClick={() => toggleConfirmed("remarks")}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 4,
                  fontSize: "0.72rem", fontWeight: 600,
                  color: confirmedFields.has("remarks") ? "#10b981" : "#94a3b8",
                  transition: "all 0.2s ease", padding: "2px 4px", borderRadius: 4
                }}
                type="button"
              >
                {confirmedFields.has("remarks") ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "scale-up 0.2s ease" }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <div style={{ width: 10, height: 10, borderRadius: "50%", border: "1.5px solid #cbd5e1" }} />
                )}
                {confirmedFields.has("remarks") ? "Verified" : "Verify"}
              </button>
            </div>
            <input
              id="field-remarks" className="input-field"
              value={grnData.remarks || ""}
              onChange={(e) => {
                updateField("remarks", e.target.value);
                if (confirmedFields.has("remarks")) {
                  setConfirmedFields((prev) => {
                    const next = new Set(prev);
                    next.delete("remarks");
                    return next;
                  });
                }
              }}
              style={{
                border: confirmedFields.has("remarks") ? "1.5px solid #10b981" : "1px solid #cbd5e1",
                background: confirmedFields.has("remarks") ? "#f0fdf4" : "#fff",
                transition: "all 0.2s ease",
              }}
              placeholder="Add remarks…"
            />
          </div>
        </div>
      </div>

      {/* Raw text toggle */}
      <div className="card" style={{ padding: "14px 18px", marginBottom: 24 }}>
        <button
          onClick={() => setShowRaw(!showRaw)} id="toggle-raw-btn"
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 500, width: "100%", textAlign: "left", minHeight: 36 }}
        >
          <span style={{ display: "inline-block", transition: "transform 0.2s", transform: showRaw ? "rotate(90deg)" : "none" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "middle" }}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
          View Raw Document Text
        </button>
        {showRaw && (
          <pre style={{ marginTop: 12, padding: 12, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: "0.76rem", color: "var(--text-secondary)", overflowX: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: 220, overflowY: "auto", lineHeight: 1.6 }}>
            {rawText || "No raw text available"}
          </pre>
        )}
      </div>

      {/* MINIMAL FOOTER FOR WORKSPACE */}
      <footer style={{
        marginTop: 48,
        paddingTop: 24,
        borderTop: "1px solid #e2e8f0",
        textAlign: "center",
        color: "var(--text-muted)",
        fontSize: "0.8rem",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "center",
        marginBottom: 20
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#4f46e5" }}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <strong>Developer:</strong> Harsh
          </span>
          <span style={{ color: "#cbd5e1" }}>|</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#10b981" }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <strong>Contact &amp; Support:</strong>{" "}
            <a href="tel:+919356836581" style={{ color: "var(--text-secondary)", textDecoration: "none", fontWeight: 600 }}>
              +91 9356836581
            </a>
          </span>
        </div>
        <p style={{ fontSize: "0.74rem", margin: 0 }}>© {new Date().getFullYear()} GRN Automation. All rights reserved.</p>
      </footer>

      {/* Sticky bottom bar — fixed on mobile */}
      <div className="sticky-bar">
        <button className="btn-secondary" onClick={onReset}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <ResetIcon size={14} color="currentColor" />
            Scan Another
          </span>
        </button>
        <button className="btn-primary" onClick={handleSave} id="save-grn-bottom-btn" style={{ padding: "11px 24px" }}>
          {saved ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Saved!
            </span>
          ) : (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <SaveIcon size={14} />
              Save GRN
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
