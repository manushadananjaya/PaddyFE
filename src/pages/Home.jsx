import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* ── Hero ── */}
      <div className="page-hero">
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "0.75rem" }}>🌾</div>
          <h1 className="fade-in">
            Sri Lanka Paddy Production Predictor
            <span className="si">ශ්‍රී ලංකා වී නිෂ්පාදන අනාවැකි යෙදුම</span>
          </h1>
          <p className="fade-in fade-in-delay-1">
            AI-powered predictions for paddy farmers and agricultural officers —
            enter your district and cultivation details to get an instant
            production estimate.
          </p>
          <p
            className="fade-in fade-in-delay-1 font-si"
            style={{ fontSize: "0.9rem", opacity: 0.75, marginTop: "0.5rem" }}
          >
            ගොවීන් සහ කෘෂිකාර්මික නිලධාරීන් සඳහා AI ආදාරිත වී නිෂ්පාදන අනාවැකිය
          </p>
          <div
            className="fade-in fade-in-delay-2"
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn btn-gold btn-lg"
              onClick={() => navigate("/predict")}
            >
              🌾 Start Prediction
              <span
                className="font-si"
                style={{ fontSize: "0.82em", opacity: 0.8 }}
              >
                {" "}
                / පුරෝකථනය ආරම්භ කරන්න
              </span>
            </button>
            <button
              className="btn btn-outline btn-lg"
              style={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}
              onClick={() => navigate("/about")}
            >
              📊 About the Model
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="stats-bar fade-in fade-in-delay-2">
        <div className="stat-item">
          <div className="stat-value">99.1%</div>
          <div className="stat-label">Model Accuracy (R²)</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">19</div>
          <div className="stat-label">Years of Data (2005–2023)</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">27</div>
          <div className="stat-label">Districts Covered</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">2</div>
          <div className="stat-label">Seasons (Yala & Maha)</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">8,785 MT</div>
          <div className="stat-label">Avg. Prediction Error</div>
        </div>
      </div>

      {/* ── How it works ── */}
      <div className="section">
        <div className="container">
          <h2
            className="section-title text-center"
            style={{ justifyContent: "center" }}
          >
            How It Works
            <span className="si"> / කෙසේ ක්‍රියා කරයිද?</span>
          </h2>
          <div className="steps-grid">
            <div className="step-card fade-in">
              <div className="step-num">1</div>
              <h3>Select District & Season</h3>
              <p
                className="font-si"
                style={{ fontSize: "0.82rem", color: "var(--text-light)" }}
              >
                දිස්ත්‍රික්කය සහ කන්නය තෝරන්න
              </p>
              <p>
                Choose your district, season (Yala or Maha), and year.
                Cultivation details are optional.
              </p>
            </div>
            <div className="step-card fade-in fade-in-delay-1">
              <div className="step-num">2</div>
              <h3>Get Instant Prediction</h3>
              <p
                className="font-si"
                style={{ fontSize: "0.82rem", color: "var(--text-light)" }}
              >
                ක්ෂණික නිෂ්පාදන අනාවැකිය ලබා ගන්න
              </p>
              <p>
                The CatBoost AI model predicts Total Production in Metric Tonnes
                within seconds.
              </p>
            </div>
            <div className="step-card fade-in fade-in-delay-2">
              <div className="step-num">3</div>
              <h3>Understand the Results</h3>
              <p
                className="font-si"
                style={{ fontSize: "0.82rem", color: "var(--text-light)" }}
              >
                ප්‍රතිඵල තේරුම් ගන්න
              </p>
              <p>
                Click Explain to see exactly which factors drove the prediction
                — powered by SHAP explainability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Feature highlights ── */}
      <div style={{ background: "var(--surface-2)", padding: "3rem 0" }}>
        <div className="container">
          <h2
            className="section-title text-center"
            style={{ justifyContent: "center", marginBottom: "2rem" }}
          >
            Built for Sri Lankan Farmers
            <span className="si"> / ශ්‍රී ලාංකිය ගොවීන් සඳහා</span>
          </h2>
          <div className="grid-2" style={{ gap: "1.5rem" }}>
            <div className="card p-4">
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🌐</div>
              <h3 style={{ color: "var(--primary-green)", fontWeight: 700 }}>
                Bilingual Interface
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  marginTop: "0.5rem",
                  color: "var(--text-mid)",
                }}
              >
                All labels and instructions are available in both English and
                Sinhala (සිංහල) for ease of use by farmers and officers.
              </p>
            </div>
            <div className="card p-4">
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📱</div>
              <h3 style={{ color: "var(--primary-green)", fontWeight: 700 }}>
                Mobile-First Design
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  marginTop: "0.5rem",
                  color: "var(--text-mid)",
                }}
              >
                Designed for smartphones — farmers can use this tool from the
                field on any device.
              </p>
            </div>
            <div className="card p-4">
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🤖</div>
              <h3 style={{ color: "var(--primary-green)", fontWeight: 700 }}>
                AI-Powered Accuracy
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  marginTop: "0.5rem",
                  color: "var(--text-mid)",
                }}
              >
                CatBoost model trained on 19 years of official DCS data. R² =
                0.9913 on 2021–2023 test data.
              </p>
            </div>
            <div className="card p-4">
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔍</div>
              <h3 style={{ color: "var(--primary-green)", fontWeight: 700 }}>
                Explainable Predictions
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  marginTop: "0.5rem",
                  color: "var(--text-mid)",
                }}
              >
                Every prediction comes with a SHAP explanation showing which
                factors increased or decreased the estimate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div
        style={{
          textAlign: "center",
          padding: "3.5rem 1.25rem",
          background: "var(--white)",
        }}
      >
        <h2
          style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--dark)" }}
        >
          Ready to predict your harvest?
        </h2>
        <p
          className="font-si"
          style={{ color: "var(--text-light)", marginTop: "0.4rem" }}
        >
          ඔබේ අස්වනු අනාවැකිය ලබා ගැනීමට සූදානමිද?
        </p>
        <button
          className="btn btn-primary btn-lg mt-3"
          onClick={() => navigate("/predict")}
        >
          🌾 Go to Prediction Form
        </button>
      </div>

      {/* ── Disclaimer ── */}
      <div
        style={{
          background: "#fff8e7",
          borderTop: "2px solid #e9c46a",
          padding: "1.25rem",
        }}
      >
        <div className="container text-center">
          <p style={{ fontSize: "0.82rem", color: "#7a5e1a" }}>
            ⚠️ <strong>Disclaimer:</strong> This tool provides AI-based
            estimates only. Always verify predictions with your local
            agricultural officer before making major decisions.
            <span
              className="font-si"
              style={{
                display: "block",
                fontSize: "0.78rem",
                opacity: 0.8,
                marginTop: "0.25rem",
              }}
            >
              මෙය AI ආදාරිත ගණනය කිරීම් පමණි. ප්‍රධාන තීරණ ගැනීමට පෙර ඔබේ
              කෘෂිකාර්මික නිලධාරියා සමඟ සාකච්ඡා කරන්න.
            </span>
          </p>
        </div>
      </div>

      <footer className="footer">
        🌾 Sri Lanka Paddy Production Prediction System &nbsp;·&nbsp;
        <span>Trained on DCS Data 2005–2023 · CatBoost R² = 0.9913</span>
      </footer>
    </div>
  );
}
