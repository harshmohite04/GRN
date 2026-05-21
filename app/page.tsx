import Link from "next/link";

// Premium Custom SVG Icons for Enterprise Aesthetic
const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" fill="rgba(255,255,255,0.2)" />
    <path d="M9 12h6M9 16h6" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6, color: '#7c3aed' }}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
  </svg>
);

const DocumentIcon = ({ size = 20, color = "#4f46e5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const CpuIcon = ({ size = 20, color = "#7c3aed" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
  </svg>
);

const CheckCircleIcon = ({ size = 20, color = "#0891b2" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const SearchIcon = ({ size = 16, color = "var(--accent-primary)" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChartIcon = ({ size = 16, color = "var(--accent-primary)" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const GlobeIcon = ({ size = 16, color = "var(--accent-primary)" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const EditIcon = ({ size = 16, color = "var(--accent-primary)" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const FileIcon = ({ size = 16, color = "var(--accent-primary)" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const LightningIcon = ({ size = 16, color = "var(--accent-primary)" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const DatabaseIcon = ({ size = 16, color = "var(--accent-primary)" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const MessageIcon = ({ size = 16, color = "var(--accent-primary)" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <polyline points="8 10 12 10 16 10" />
    <polyline points="8 14 12 14 14 14" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e2e8f0",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#4f46e5,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 10px rgba(79,70,229,0.2)" }}>
              <LogoIcon />
            </div>
            <span style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a" }}>GRN Automation</span>
          </div>
          <div className="desktop-nav-links">
            <a href="#how-it-works" className="nav-link">How it works</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <Link href="/scan" className="btn-primary" style={{ padding: "8px 18px", fontSize: "0.85rem" }}>
              Start Scanning <ArrowRightIcon />
            </Link>
          </div>
          <Link href="/scan" className="btn-primary mobile-cta" style={{ padding: "8px 16px", fontSize: "0.82rem" }}>
            Scan <ArrowRightIcon />
          </Link>
        </div>
      </nav>

      <main style={{ flex: 1 }}>
        {/* HERO */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 20px 64px", textAlign: "center" }}>
          <div className="animate-in badge badge-info" style={{ display: "inline-flex", marginBottom: 20 }}>
            <SparklesIcon /> Intelligent Document Processing
          </div>

          <h1 className="animate-in-delay-1" style={{
            fontSize: "clamp(1.9rem, 5.5vw, 3.6rem)",
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: "-0.03em", color: "#0f172a", marginBottom: 20,
          }}>
            Scan GRN Documents &amp;<br />
            <span className="gradient-text">Extract Data Instantly</span>
          </h1>

          <p className="animate-in-delay-2" style={{
            fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
            color: "var(--text-secondary)",
            maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.8,
          }}>
            Upload any Goods Receipt Note — handwritten, printed, or scanned — and our system automatically extracts vendor details, PO numbers, line items, and amounts.
          </p>

          <div className="hero-buttons animate-in-delay-3">
            <Link href="/scan" className="btn-primary" style={{ padding: "13px 32px", fontSize: "0.95rem" }}>
              <DocumentIcon size={18} color="#fff" /> Scan Your First GRN
            </Link>
            <a href="#how-it-works" className="btn-secondary" style={{ padding: "13px 32px", fontSize: "0.95rem" }}>
              See how it works
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "clamp(20px,4vw,48px)", justifyContent: "center", marginTop: 56, flexWrap: "wrap" }}>
            {[
              { number: "< 30s", label: "Avg extraction time" },
              { number: "22+", label: "Languages supported" },
              { number: "12+", label: "GRN fields extracted" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div className="gradient-text" style={{ fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 800 }}>{s.number}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" style={{ background: "#fff", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 20px" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <p className="section-label">Process</p>
              <h2 style={{ fontSize: "clamp(1.4rem,3.5vw,1.8rem)", fontWeight: 700, color: "#0f172a" }}>How It Works</h2>
            </div>
            <div className="grid-3col">
              {[
                { step: "01", icon: <DocumentIcon size={22} color="#4f46e5" />, title: "Upload Document", desc: "Drag & drop or browse to select your GRN. Supports photos, scans, and PDF files up to 10 MB.", color: "#4f46e5" },
                { step: "02", icon: <CpuIcon size={22} color="#7c3aed" />, title: "Automatic Extraction", desc: "Our intelligent engine reads the document and extracts all relevant fields with high accuracy.", color: "#7c3aed" },
                { step: "03", icon: <CheckCircleIcon size={22} color="#0891b2" />, title: "Review & Save", desc: "Extracted fields auto-populate a clean editable form. Verify, correct, and confirm in seconds.", color: "#0891b2" },
              ].map((item) => (
                <div key={item.step} className="card" style={{ padding: "24px 22px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: `${item.color}12`, border: `1px solid ${item.color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{item.icon}</div>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", color: item.color, marginBottom: 5, textTransform: "uppercase" }}>Step {item.step}</div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", marginBottom: 7 }}>{item.title}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features">
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 20px" }}>
            <div className="grid-2col">
              <div>
                <p className="section-label">Why GRN Automation</p>
                <h2 style={{ fontSize: "clamp(1.4rem,3.5vw,1.8rem)", fontWeight: 700, color: "#0f172a", lineHeight: 1.3, marginBottom: 14 }}>
                  Built for Indian Supply Chain Operations
                </h2>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24, fontSize: "0.9rem" }}>
                  Handles complex document layouts, mixed scripts, and regional language text common in Indian procurement documents — from MSME invoices to enterprise GRNs.
                </p>
                <Link href="/scan" className="btn-primary">Start scanning <ArrowRightIcon /></Link>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {[
                  { icon: <SearchIcon />, text: "Extracts 12+ GRN fields automatically" },
                  { icon: <ChartIcon />, text: "Full line item table with quantities & rates" },
                  { icon: <DatabaseIcon />, text: "Seamless direct integration with Highrise ERP" },
                  { icon: <MessageIcon />, text: "Instant WhatsApp approval & notification workflows" },
                  { icon: <GlobeIcon />, text: "Supports 22 Indian languages" },
                  { icon: <EditIcon />, text: "All fields editable before final save" },
                  { icon: <FileIcon />, text: "JPG, PNG, and PDF supported" },
                  { icon: <LightningIcon />, text: "Results typically in under 30 seconds" },
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 13px", background: "#fff", borderRadius: 9, border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                    <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{f.icon}</span>
                    <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" style={{ background: "var(--bg-primary)", borderTop: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 20px" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <p className="section-label">Pricing</p>
              <h2 style={{ fontSize: "clamp(1.4rem,3.5vw,1.8rem)", fontWeight: 700, color: "#0f172a" }}>Simple, Transparent Pricing</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: 8 }}>Pay only for what you process with our enterprise subscription plan</p>
            </div>
            
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "32px",
              marginTop: "16px"
            }}>
              {/* Pro Card */}
              <div className="card" style={{
                maxWidth: "400px",
                width: "100%",
                padding: "36px 32px",
                border: "2px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                background: "#fff",
                borderRadius: "14px"
              }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>Pro Document Pass</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginBottom: 24 }}>Ideal for growing logistics, supply chains, and finance teams</p>
                
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
                  <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>₹12</span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: 500 }}>/ document</span>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32, flex: 1 }}>
                  {[
                    "High-speed Neural Document Intelligence engine",
                    "Resilient multi-engine automatic failover protection",
                    "Bilingual table scanning (Hindi + Regional scripts)",
                    "Indian Vehicle Number parsing (e.g. MH 12 TG 1234)",
                    "Interactive side-by-side click-to-verify panel",
                    "Instantly editable inputs with auto-invalidation",
                    "Secure enterprise processing with zero data retention"
                  ].map((feat, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "start", gap: 10 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>{feat}</span>
                    </div>
                  ))}
                </div>
                
                <Link href="/scan" className="btn-primary" style={{ display: "flex", justifyContent: "center", width: "100%", padding: "12px 0", fontSize: "0.9rem", marginTop: "auto" }}>
                  Get Started Today <ArrowRightIcon />
                </Link>
              </div>

              {/* Enterprise Card */}
              <div className="card" style={{
                maxWidth: "400px",
                width: "100%",
                padding: "36px 32px",
                border: "2px solid #4f46e5",
                boxShadow: "0 10px 25px -5px rgba(79,70,229,0.1)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                background: "#fff",
                borderRadius: "14px"
              }}>
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                  color: "#fff",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  padding: "4px 24px",
                  transform: "rotate(45deg) translate(28px, -8px)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase"
                }}>
                  Premium
                </div>
                
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>Custom Enterprise</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginBottom: 24 }}>For large scale operations with high-frequency procurement data flows</p>
                
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
                  <span style={{ fontSize: "2rem", fontWeight: 800, color: "#4f46e5", lineHeight: 1 }}>Let's Talk</span>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32, flex: 1 }}>
                  {[
                    "Unlimited high-priority document queue processing",
                    "Custom model fine-tuning tailored to your templates",
                    "Direct API endpoints with custom JSON payload schemas",
                    "Secure on-premise deployment options on your cloud",
                    "Dedicated bandwidth with guaranteed uptime SLAs",
                    "Custom data exports (CSV, PDF, XML, SQL, ERP triggers)",
                    "Dedicated support, direct WhatsApp integration, and training sessions"
                  ].map((feat, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "start", gap: 10 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>{feat}</span>
                    </div>
                  ))}
                </div>
                
                <a href="tel:+919356836581" className="btn-primary" style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: "12px 0",
                  fontSize: "0.9rem",
                  background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                  marginTop: "auto"
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call Harsh for Enterprise
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#fff", borderTop: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", padding: "64px 20px", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(1.3rem,3.5vw,1.7rem)", fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>
              Ready to automate your GRN processing?
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: 24, fontSize: "0.9rem" }}>
              Start scanning documents in seconds — no complex setup required.
            </p>
            <Link href="/scan" className="btn-primary" style={{ padding: "13px 36px", fontSize: "0.95rem" }}>
              <LightningIcon size={18} color="#fff" /> Start Scanning Now
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid #e2e8f0",
        padding: "36px 20px 24px",
        background: "#fff",
        color: "var(--text-secondary)",
        fontSize: "0.85rem"
      }}>
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "center"
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px", color: "var(--text-muted)", fontSize: "0.8rem", alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#4f46e5" }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <strong>Developer:</strong> Harsh
            </span>
            <span style={{ color: "#cbd5e1" }}>|</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#10b981" }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <strong>Contact &amp; Support:</strong>{" "}
              <a href="tel:+919356836581" style={{ color: "#4f46e5", textDecoration: "none", fontWeight: 600, transition: "color 0.15s ease" }} className="hover-link">
                +91 9356836581
              </a>
            </span>
          </div>
          
          <div style={{
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            borderTop: "1px solid #f1f5f9",
            paddingTop: 16,
            width: "100%",
            textAlign: "center"
          }}>
            © {new Date().getFullYear()} GRN Automation. All rights reserved. Crafted with precision for enterprise operations.
          </div>
        </div>
      </footer>
    </div>
  );
}
