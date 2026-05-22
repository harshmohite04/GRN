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

  // Authentication & Trial States
  const [sessionChecked, setSessionChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [trialCount, setTrialCount] = useState(0);
  const [trialsLeft, setTrialsLeft] = useState(10);
  const [allowedScans, setAllowedScans] = useState(10);

  // Billing Modal & Checkout States
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [customDocCount, setCustomDocCount] = useState<string>("10");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState<string | null>(null);

  // Mock Payment Flow States
  const [showMockPaymentDialog, setShowMockPaymentDialog] = useState(false);
  const [mockPaymentOrderData, setMockPaymentOrderData] = useState<any>(null);

  // Auth Modal Form States
  const [authEmail, setAuthEmail] = useState("");
  const [authOtp, setAuthOtp] = useState("");
  const [authStep, setAuthStep] = useState<"email" | "otp">("email");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [mockOtpInfo, setMockOtpInfo] = useState<string | null>(null);

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      if (data.authenticated) {
        setAuthenticated(true);
        setUserEmail(data.email);
        setTrialCount(data.trialCount);
        setTrialsLeft(data.trialsLeft);
        setAllowedScans(data.allowedScans ?? 10);
      } else {
        setAuthenticated(false);
        setUserEmail("");
      }
    } catch (err) {
      console.error("Session check failed:", err);
    } finally {
      setSessionChecked(true);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authEmail.includes("@")) {
      setAuthError("Please enter a valid email address");
      return;
    }
    setAuthLoading(true);
    setAuthError(null);
    setMockOtpInfo(null);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authEmail }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send verification code");
      }
      setAuthStep("otp");
      if (data.isMock && data.mockOtp) {
        setMockOtpInfo(data.mockOtp);
      }
    } catch (err: any) {
      setAuthError(err.message || "Failed to request code");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authOtp || authOtp.length !== 6) {
      setAuthError("Please enter the 6-digit verification code");
      return;
    }
    setAuthLoading(true);
    setAuthError(null);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authEmail, otp: authOtp }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Verification failed");
      }
      setAuthenticated(true);
      setUserEmail(data.email);
      setTrialCount(data.trialCount);
      setTrialsLeft(data.trialsLeft);
      setAllowedScans(data.allowedScans ?? 10);
      setAuthEmail("");
      setAuthOtp("");
      setAuthStep("email");
      setMockOtpInfo(null);
    } catch (err: any) {
      setAuthError(err.message || "Failed to verify code");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/session", { method: "POST" });
      setAuthenticated(false);
      setUserEmail("");
      setTrialCount(0);
      setTrialsLeft(10);
      setAllowedScans(10);
      handleReset();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (docCount: number) => {
    if (docCount <= 0) {
      alert("Please enter a valid document count.");
      return;
    }
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docCount }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to initiate payment");
      }

      if (data.mock) {
        // High fidelity sandbox checkout simulation
        setMockPaymentOrderData({ ...data, docCount });
        setShowMockPaymentDialog(true);
        setCheckoutLoading(false);
        return;
      }

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Failed to load payment gateway script. Please check your internet connection.");
        setCheckoutLoading(false);
        return;
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Acme Document Suite",
        description: `Upgrade scanner capacity by ${docCount} documents`,
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            setCheckoutLoading(true);
            const verifyRes = await fetch("/api/payments/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                docCount: docCount,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setAllowedScans(verifyData.allowedScans);
              setTrialsLeft(verifyData.trialsLeft);
              setPaymentSuccessMessage(`Successfully upgraded your scanner capacity by ${docCount} documents!`);
              setShowBillingModal(false);
              setTimeout(() => {
                setPaymentSuccessMessage(null);
              }, 6000);
            } else {
              alert(verifyData.error || "Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("An error occurred during payment verification.");
          } finally {
            setCheckoutLoading(false);
          }
        },
        prefill: {
          email: data.email,
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      alert(err.message || "An error occurred initiating checkout.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleMockVerify = async () => {
    if (!mockPaymentOrderData) return;
    setCheckoutLoading(true);
    try {
      const verifyRes = await fetch("/api/payments/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_payment_id: `pay_mock_${Math.random().toString(36).substring(2, 12)}`,
          razorpay_order_id: mockPaymentOrderData.orderId,
          razorpay_signature: "mock_signature",
          docCount: mockPaymentOrderData.docCount,
        }),
      });
      const verifyData = await verifyRes.json();
      if (verifyData.success) {
        setAllowedScans(verifyData.allowedScans);
        setTrialsLeft(verifyData.trialsLeft);
        setPaymentSuccessMessage(`[SANDBOX] Successfully simulated upgrade for ${mockPaymentOrderData.docCount} documents!`);
        setShowMockPaymentDialog(false);
        setShowBillingModal(false);
        setTimeout(() => {
          setPaymentSuccessMessage(null);
        }, 6000);
      } else {
        alert(verifyData.error || "Payment simulation verification failed.");
      }
    } catch (err) {
      console.error("Mock verification error:", err);
      alert("An error occurred during simulation verification.");
    } finally {
      setCheckoutLoading(false);
      setMockPaymentOrderData(null);
    }
  };


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
      
      if (typeof ocrJson.trialCount === "number") {
        setTrialCount(ocrJson.trialCount);
        setTrialsLeft(ocrJson.trialsLeft);
        if (typeof ocrJson.allowedScans === "number") {
          setAllowedScans(ocrJson.allowedScans);
        }
      }
      
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
            <span className="nav-title" style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a" }}>GRN Automation</span>
          </a>

          {/* Step indicators */}
          <div className="steps-list desktop-nav-links">
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

          {/* Trial Status Navbar Badge */}
          {authenticated && (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                className={`badge ${
                  trialCount >= allowedScans
                    ? "badge-error"
                    : trialCount >= allowedScans - 1
                    ? "badge-warning"
                    : "badge-info"
                }`}
                style={{
                  fontWeight: 600,
                  fontSize: "0.76rem",
                  padding: "4px 10px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  animation: trialCount >= allowedScans - 1 && trialCount < allowedScans ? "pulse 1.2s infinite" : "none"
                }}
              >
                {trialCount >= allowedScans ? (
                  <>
                    <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--accent-rose)" }} />
                    Limit Reached
                  </>
                ) : (
                  <>
                    <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: trialCount >= allowedScans - 1 ? "var(--accent-amber)" : "var(--accent-primary)" }} />
                    <span className="badge-text-long">Usage: {trialCount}/{allowedScans} scans</span>
                    <span className="badge-text-short">{trialCount}/{allowedScans}</span>
                  </>
                )}
              </span>

              <button
                onClick={() => setShowBillingModal(true)}
                className="btn-primary"
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  boxShadow: "0 2px 6px rgba(79, 70, 229, 0.15)"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Upgrade
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="desktop-nav-links" style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 500 }} title={userEmail}>
                  {userEmail.length > 15 ? userEmail.slice(0, 13) + "..." : userEmail}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-ghost"
                  style={{
                    padding: "4px 8px",
                    fontSize: "0.74rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    color: "var(--text-secondary)",
                    cursor: "pointer"
                  }}
                  title="Log Out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                  </svg>
                  <span className="logout-text">Logout</span>
                </button>
              </div>
            </div>
          )}
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
            trialCount={trialCount}
            userEmail={userEmail}
            handleLogout={handleLogout}
            allowedScans={allowedScans}
            handlePayment={handlePayment}
            checkoutLoading={checkoutLoading}
            customDocCount={customDocCount}
            setCustomDocCount={setCustomDocCount}
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

      {/* Solid Enterprise Login Modal Overlay */}
      {(!sessionChecked || !authenticated) && (
        <div className="modal-overlay">
          <div className="modal-card animate-fade-in-up" style={{ maxWidth: 440, padding: "36px 32px" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "0 8px 20px rgba(79, 70, 229, 0.3)"
              }}>
                <LogoIcon />
              </div>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.025em" }}>
                GRN Document Portal
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", marginTop: 6, lineHeight: 1.4 }}>
                {authStep === "email" ? "Enter your email to verify your trial account" : "Enter the 6-digit verification code sent to your email"}
              </p>
            </div>

            {authError && (
              <div style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                padding: "10px 14px",
                borderRadius: 10,
                background: "#fee2e2",
                border: "1px solid #fca5a5",
                color: "#991b1b",
                fontSize: "0.78rem",
                marginBottom: 16,
                fontWeight: 500
              }}>
                <AlertIcon size={16} />
                <span>{authError}</span>
              </div>
            )}

            {mockOtpInfo && (
              <div style={{
                padding: "12px 14px",
                borderRadius: 10,
                background: "#ede9fe",
                border: "1px solid #c4b5fd",
                color: "#4c1d95",
                fontSize: "0.78rem",
                marginBottom: 16,
                boxShadow: "0 2px 8px rgba(79, 70, 229, 0.05)"
              }}>
                <div style={{ fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#4f46e5" }} />
                  Demo Mode OTP generated:
                </div>
                <p style={{ fontSize: "0.76rem", color: "#6d28d9", lineHeight: 1.4, margin: 0 }}>
                  No email service configured. Use code: <strong style={{ fontSize: "0.95rem", fontFamily: "monospace", background: "#fff", padding: "1px 5px", borderRadius: 4, border: "1px solid #c4b5fd", margin: "0 2px" }}>{mockOtpInfo}</strong> to log in.
                </p>
              </div>
            )}

            {authStep === "email" ? (
              <form onSubmit={handleSendOtp} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label className="input-label" htmlFor="auth-email">Email Address</label>
                  <input
                    id="auth-email"
                    type="email"
                    placeholder="e.g. name@company.com"
                    className="input-field"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    disabled={authLoading}
                    required
                    autoFocus
                    style={{ padding: "11px 14px", borderRadius: 10 }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={authLoading}
                  style={{ width: "100%", justifyContent: "center", padding: "12px", borderRadius: 10, fontSize: "0.85rem" }}
                >
                  {authLoading ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)", borderTopColor: "#fff", animation: "spin 0.6s linear infinite" }} />
                      Sending code...
                    </div>
                  ) : "Request Verification Code"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label className="input-label" htmlFor="auth-otp">6-Digit Verification Code</label>
                  <input
                    id="auth-otp"
                    type="text"
                    placeholder="e.g. 123456"
                    className="input-field"
                    value={authOtp}
                    onChange={(e) => setAuthOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    disabled={authLoading}
                    maxLength={6}
                    required
                    autoFocus
                    style={{
                      padding: "12px 14px",
                      borderRadius: 10,
                      textAlign: "center",
                      fontSize: "1.1rem",
                      letterSpacing: "0.2em",
                      fontWeight: "bold",
                      fontFamily: "monospace"
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={authLoading}
                  style={{ width: "100%", justifyContent: "center", padding: "12px", borderRadius: 10, fontSize: "0.85rem" }}
                >
                  {authLoading ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)", borderTopColor: "#fff", animation: "spin 0.6s linear infinite" }} />
                      Verifying...
                    </div>
                  ) : "Verify & Log In"}
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => {
                    setAuthStep("email");
                    setAuthOtp("");
                    setAuthError(null);
                    setMockOtpInfo(null);
                  }}
                  disabled={authLoading}
                  style={{ fontSize: "0.8rem", textDecoration: "underline", color: "#64748b", margin: "0 auto" }}
                >
                  Change Email
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Solid Billing & Upgrades Modal */}
      {showBillingModal && (
        <div className="modal-overlay">
          <div className="modal-card animate-fade-in-up" style={{ maxWidth: 680, padding: "36px 32px", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.025em" }}>
                  Upgrade Scanner Capacity
                </h2>
                <p style={{ color: "#64748b", fontSize: "0.78rem", marginTop: 4 }}>
                  Add permanent scanning capacity. Current usage: <strong>{trialCount}/{allowedScans}</strong> scans
                </p>
              </div>
              <button
                onClick={() => setShowBillingModal(false)}
                className="btn-ghost"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #cbd5e1",
                  cursor: "pointer"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
              marginBottom: 24
            }}>
              {[
                { name: "Bronze Pass", count: 10, price: 120, label: "Starter" },
                { name: "Silver Pass", count: 50, price: 600, label: "Popular", popular: true },
                { name: "Gold Pass", count: 100, price: 1200, label: "Value" }
              ].map((pkg) => (
                <div key={pkg.name} style={{
                  background: pkg.popular ? "rgba(79, 70, 229, 0.04)" : "#ffffff",
                  border: pkg.popular ? "2px solid #4f46e5" : "1.5px solid #e2e8f0",
                  borderRadius: 16,
                  padding: "20px 14px",
                  textAlign: "center",
                  position: "relative",
                  boxShadow: pkg.popular ? "0 8px 24px rgba(79, 70, 229, 0.08)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}>
                  {pkg.popular && (
                    <span style={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                      color: "#ffffff",
                      fontSize: "0.6rem",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: 8,
                      textTransform: "uppercase"
                    }}>
                      Popular
                    </span>
                  )}
                  <div>
                    <h3 style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>{pkg.name}</h3>
                    <div style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: 8 }}>{pkg.label} Pack</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", margin: "8px 0" }}>
                      ₹{pkg.price}
                    </div>
                    <div style={{ fontSize: "0.74rem", fontWeight: 600, color: "#4f46e5", marginBottom: 12 }}>
                      +{pkg.count} Document Scans
                    </div>
                  </div>
                  <button
                    onClick={() => handlePayment(pkg.count)}
                    disabled={checkoutLoading}
                    className="btn-primary"
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: 8,
                      fontSize: "0.78rem",
                      justifyContent: "center"
                    }}
                  >
                    Buy Pack
                  </button>
                </div>
              ))}
            </div>

            {/* Custom Input Block */}
            <div style={{
              background: "#f8fafc",
              border: "1px dashed #cbd5e1",
              borderRadius: 16,
              padding: "16px 20px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              textAlign: "left"
            }}>
              <div>
                <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>Custom Upgrade</h4>
                <p style={{ fontSize: "0.72rem", color: "#64748b", margin: 0 }}>Buy any exact scan quantity at ₹12/scan</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ position: "relative" }}>
                  <input
                    type="number"
                    min="1"
                    value={customDocCount}
                    onChange={(e) => setCustomDocCount(e.target.value)}
                    style={{
                      width: 80,
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: "1.5px solid #cbd5e1",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      outline: "none"
                    }}
                  />
                  <span style={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "#94a3b8"
                  }}>
                    docs
                  </span>
                </div>
                <button
                  onClick={() => handlePayment(parseInt(customDocCount) || 0)}
                  disabled={checkoutLoading}
                  className="btn-primary"
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontSize: "0.8rem",
                    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)"
                  }}
                >
                  Pay ₹{(parseInt(customDocCount) || 0) * 12}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* High Fidelity Developer/Demo Mock Payment Dialog */}
      {showMockPaymentDialog && mockPaymentOrderData && (
        <div className="modal-overlay">
          <div className="modal-card animate-fade-in-up" style={{ maxWidth: 480, padding: "36px 32px", textAlign: "center", border: "2px solid var(--accent-primary)" }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(79, 70, 229, 0.1)",
              border: "2px solid #4f46e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            
            <span style={{
              background: "#e0e7ff",
              color: "#4f46e5",
              fontSize: "0.68rem",
              fontWeight: 800,
              padding: "4px 10px",
              borderRadius: 12,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              display: "inline-block",
              marginBottom: 12
            }}>
              Payment Sandbox Simulation
            </span>

            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>
              Authorize Simulated Checkout
            </h3>
            
            <p style={{ color: "#64748b", fontSize: "0.82rem", lineHeight: 1.5, margin: "0 auto 24px", maxWidth: 360 }}>
              Acme Suite has initialized a local verification workflow. No actual bank charge will occur.
            </p>

            <div style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              padding: "16px 20px",
              textAlign: "left",
              marginBottom: 28,
              fontSize: "0.82rem"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "#64748b" }}>Order Reference</span>
                <span style={{ fontWeight: 600, color: "#0f172a", fontFamily: "monospace" }}>
                  {mockPaymentOrderData.orderId.slice(0, 16)}...
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: "#64748b" }}>Upgrade Count</span>
                <span style={{ fontWeight: 700, color: "#4f46e5" }}>+{mockPaymentOrderData.docCount} scans</span>
              </div>
              <div style={{ borderTop: "1px solid #e2e8f0", margin: "10px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "0.88rem" }}>
                <span style={{ color: "#0f172a" }}>Simulated Price</span>
                <span style={{ color: "#10b981" }}>₹{mockPaymentOrderData.docCount * 12}.00</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                onClick={handleMockVerify}
                disabled={checkoutLoading}
                className="btn-primary"
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  borderRadius: 12,
                  fontSize: "0.88rem",
                  background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                  boxShadow: "0 4px 14px rgba(79, 70, 229, 0.3)",
                  justifyContent: "center"
                }}
              >
                {checkoutLoading ? "Verifying Transaction..." : "Complete Simulated Checkout"}
              </button>
              <button
                onClick={() => {
                  setShowMockPaymentDialog(false);
                  setMockPaymentOrderData(null);
                }}
                disabled={checkoutLoading}
                className="btn-ghost"
                style={{
                  width: "100%",
                  padding: "10px 20px",
                  borderRadius: 12,
                  fontSize: "0.85rem",
                  border: "1px solid #cbd5e1"
                }}
              >
                Cancel Sandbox Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Success Toast Notification */}
      {paymentSuccessMessage && (
        <div style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "#10b981",
          color: "#ffffff",
          padding: "14px 20px",
          borderRadius: 12,
          boxShadow: "0 10px 25px rgba(16, 185, 129, 0.25)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          zIndex: 10001,
          fontWeight: 600,
          fontSize: "0.85rem",
          animation: "fadeInUp 0.3s ease-out"
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{paymentSuccessMessage}</span>
        </div>
      )}
    </div>
  );
}

/* ─── UPLOAD STEP ─── */
function UploadStep({
  file, preview, isDragOver, fileInputRef, onDrop, onDragOver, onDragLeave, onFileChange, onExtract, onClear, inputMode, setInputMode, onCameraCapture, docLanguage, setDocLanguage,
  trialCount, userEmail, handleLogout, allowedScans, handlePayment, checkoutLoading, customDocCount, setCustomDocCount
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
  trialCount: number;
  userEmail: string;
  handleLogout: () => void;
  allowedScans: number;
  handlePayment: (count: number) => Promise<void>;
  checkoutLoading: boolean;
  customDocCount: string;
  setCustomDocCount: (c: string) => void;
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
      {trialCount >= allowedScans ? (
        <div className="card-elevated animate-fade-in-up" style={{
          padding: "44px 32px",
          textAlign: "center",
          background: "linear-gradient(135deg, #ffffff 0%, #fbfcfe 100%)",
          border: "1.5px solid rgba(79, 70, 229, 0.15)",
          borderRadius: 20,
          boxShadow: "0 10px 30px rgba(79, 70, 229, 0.08)",
          margin: "10px 0"
        }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#fee2e2",
            border: "2px solid #fca5a5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            boxShadow: "0 4px 12px rgba(225, 29, 72, 0.15)"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", marginBottom: 8, letterSpacing: "-0.025em" }}>
            Usage Limit Reached
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", maxWidth: 460, margin: "0 auto 28px", lineHeight: 1.6 }}>
            You have processed all <strong>{allowedScans} scans</strong> allocated for <span style={{ color: "#4f46e5", fontWeight: 600 }}>{userEmail}</span>. Upgrade instantly to continue processing documents.
          </p>

          <div style={{
            margin: "0 auto 32px",
            maxWidth: 680
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              marginBottom: 24
            }}>
              {[
                { name: "Bronze Pass", count: 10, price: 120, label: "Starter" },
                { name: "Silver Pass", count: 50, price: 600, popular: true, label: "Popular" },
                { name: "Gold Pass", count: 100, price: 1200, label: "Value" }
              ].map((pkg) => (
                <div key={pkg.name} style={{
                  background: pkg.popular ? "rgba(79, 70, 229, 0.03)" : "#ffffff",
                  border: pkg.popular ? "2px solid #4f46e5" : "1.5px solid #e2e8f0",
                  borderRadius: 16,
                  padding: "24px 16px",
                  textAlign: "center",
                  position: "relative",
                  boxShadow: pkg.popular ? "0 8px 24px rgba(79, 70, 229, 0.06)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}>
                  {pkg.popular && (
                    <span style={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                      color: "#ffffff",
                      fontSize: "0.62rem",
                      fontWeight: 800,
                      padding: "3px 10px",
                      borderRadius: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}>
                      Popular
                    </span>
                  )}
                  <div>
                    <h3 style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>{pkg.name}</h3>
                    <div style={{ fontSize: "0.7rem", color: "#64748b", marginBottom: 12 }}>{pkg.label} Pack</div>
                    <div style={{ fontSize: "1.65rem", fontWeight: 800, color: "#0f172a", margin: "8px 0" }}>
                      ₹{pkg.price}
                    </div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4f46e5", marginBottom: 16 }}>
                      +{pkg.count} Document Scans
                    </div>
                  </div>
                  <button
                    onClick={() => handlePayment(pkg.count)}
                    disabled={checkoutLoading}
                    className="btn-primary"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 8,
                      fontSize: "0.8rem",
                      justifyContent: "center",
                      background: pkg.popular ? "linear-gradient(135deg,#4f46e5,#7c3aed)" : "var(--bg-slate-900)"
                    }}
                  >
                    Buy Pack
                  </button>
                </div>
              ))}
            </div>

            {/* Custom Input Block */}
            <div style={{
              background: "#f8fafc",
              border: "1px dashed #cbd5e1",
              borderRadius: 16,
              padding: "20px 24px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              textAlign: "left"
            }}>
              <div>
                <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Custom Upgrade</h4>
                <p style={{ fontSize: "0.75rem", color: "#64748b", margin: 0 }}>Buy any exact scan quantity at ₹12/scan</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ position: "relative" }}>
                  <input
                    type="number"
                    min="1"
                    value={customDocCount}
                    onChange={(e) => setCustomDocCount(e.target.value)}
                    style={{
                      width: 90,
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1.5px solid #cbd5e1",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      outline: "none"
                    }}
                  />
                  <span style={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "#94a3b8"
                  }}>
                    docs
                  </span>
                </div>
                <button
                  onClick={() => handlePayment(parseInt(customDocCount) || 0)}
                  disabled={checkoutLoading}
                  className="btn-primary"
                  style={{
                    padding: "10px 20px",
                    borderRadius: 10,
                    fontSize: "0.85rem",
                    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)"
                  }}
                >
                  Pay ₹{(parseInt(customDocCount) || 0) * 12}
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <button
              onClick={handleLogout}
              className="btn-secondary"
              style={{ padding: "12px 24px", borderRadius: 10, fontSize: "0.85rem" }}
            >
              Log in with another account
            </button>
          </div>
        </div>
      ) : (
        <>
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
      </>
      )}
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

        {/* Viewfinder corners & scanline — only when live */}
        {!isLoading && (
          <>
            <div className="viewfinder-scanline" />
            <div className="viewfinder-corner tl" />
            <div className="viewfinder-corner tr" />
            <div className="viewfinder-corner bl" />
            <div className="viewfinder-corner br" />
          </>
        )}

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
          className="capture-btn-outer"
          onMouseDown={(e) => { if (!isLoading) e.currentTarget.style.transform = "scale(0.9)"; }}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onTouchStart={(e) => { if (!isLoading) e.currentTarget.style.transform = "scale(0.9)"; }}
          onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div className="capture-btn-inner" style={{ background: isLoading ? "#cbd5e1" : undefined }} />
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
                id={`field-${key}`}
                className={`input-field ${confirmedFields.has(key) ? "verified" : ""}`}
                value={(grnData[key] as string) || ""}
                readOnly={confirmedFields.has(key)}
                onChange={(e) => {
                  updateField(key, e.target.value);
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
        <div className="mobile-scroll-helper">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Swipe horizontally to edit all columns</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4 }}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
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
                            readOnly={isVerified}
                            onChange={(e) => {
                              updateLineItem(i, f, e.target.value);
                            }}
                            id={`line-${i}-${f}`}
                            className={isVerified ? "table-input-verified" : ""}
                            style={{
                              minWidth: f === "description" ? 120 : 60,
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
                id={`field-${key}`}
                className={`input-field ${confirmedFields.has(key) ? "verified" : ""}`}
                value={grnData[key] || ""}
                readOnly={confirmedFields.has(key)}
                onChange={(e) => {
                  updateField(key, e.target.value);
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
              id="field-remarks"
              className={`input-field ${confirmedFields.has("remarks") ? "verified" : ""}`}
              value={grnData.remarks || ""}
              readOnly={confirmedFields.has("remarks")}
              onChange={(e) => {
                updateField("remarks", e.target.value);
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
