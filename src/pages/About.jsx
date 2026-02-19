export default function About() {
  return (
    <div>
      {/* Hero */}
      <div
        className="page-hero"
        style={{ paddingTop: "3rem", paddingBottom: "2.5rem" }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1>
            About this Tool
            <span className="si">මෙම යෙදුම ගැන</span>
          </h1>
          <p>
            Understand the AI model, how it was trained, and how to interpret
            its predictions.
          </p>
        </div>
      </div>

      <div className="container section">
        {/* What is this tool */}
        <div className="card p-4 fade-in" style={{ marginBottom: "1.5rem" }}>
          <h2 className="section-title">
            🌾 What is this tool?
            <span className="si">මෙම යෙදුම කුමක්ද?</span>
          </h2>
          <p
            style={{
              marginTop: "1rem",
              lineHeight: 1.7,
              color: "var(--text-mid)",
            }}
          >
            This web application uses a trained{" "}
            <strong>CatBoost machine learning model</strong> to predict the
            total paddy (rice) production in metric tonnes for any Sri Lankan
            district and cultivation season. The model was trained on{" "}
            <strong>19 years of official government data</strong> (2005–2023)
            from the Department of Census and Statistics (DCS), Sri Lanka.
          </p>
          <p
            style={{
              marginTop: "0.75rem",
              lineHeight: 1.7,
              color: "var(--text-mid)",
            }}
          >
            It is designed for use by{" "}
            <strong>farmers, agricultural officers, and policy planners</strong>{" "}
            to get quick, evidence-based estimates of expected production — with
            full AI transparency via SHAP explanations.
          </p>
          <p
            className="font-si"
            style={{
              marginTop: "0.75rem",
              fontSize: "0.9rem",
              color: "var(--text-light)",
              lineHeight: 1.7,
            }}
          >
            මෙම යෙදුම ශ්‍රී ලාංකිය ගොවීන්, කෘෂිකාර්මික නිලධාරීන් සහ ප්‍රතිපත්ති
            සැලසුම්කරුවන් සඳහා ජනලේඛන හා සංඛ්‍යාලේඛන දෙදෙනාගෙනි.
          </p>
        </div>

        {/* Model performance */}
        <div
          className="card fade-in fade-in-delay-1"
          style={{ marginBottom: "1.5rem", overflow: "hidden" }}
        >
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid var(--border)",
              background: "var(--surface-2)",
            }}
          >
            <h2 className="section-title">
              📊 Model Performance
              <span className="si">Model කාර්යක්ෂමතාව</span>
            </h2>
          </div>
          <div style={{ padding: "0.5rem 0" }}>
            <table className="about-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                  <th>Interpretation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Model</td>
                  <td>
                    <strong>CatBoostRegressor</strong>
                  </td>
                  <td>
                    Gradient-boosted decision tree with native categorical
                    support
                  </td>
                </tr>
                <tr>
                  <td>Test R²</td>
                  <td
                    style={{ color: "var(--primary-green)", fontWeight: 700 }}
                  >
                    0.9913 (99.1%)
                  </td>
                  <td>99.1% of production variance explained by the model</td>
                </tr>
                <tr>
                  <td>Test RMSE</td>
                  <td>8,785 MT</td>
                  <td>
                    Average absolute error (root mean squared) on 2021–2023 data
                  </td>
                </tr>
                <tr>
                  <td>Test MAE</td>
                  <td>3,862 MT</td>
                  <td>
                    Median absolute error — typical prediction is within ±3,862
                    MT
                  </td>
                </tr>
                <tr>
                  <td>Training data</td>
                  <td>2005–2020</td>
                  <td>826 district-season records across 27 districts</td>
                </tr>
                <tr>
                  <td>Test data</td>
                  <td>2021–2023</td>
                  <td>147 unseen records used for evaluation</td>
                </tr>
                <tr>
                  <td>CV Strategy</td>
                  <td>TimeSeriesSplit (5-fold)</td>
                  <td>
                    Each fold uses strictly later years — no temporal data
                    leakage
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Top features */}
        <div
          className="card p-4 fade-in fade-in-delay-1"
          style={{ marginBottom: "1.5rem" }}
        >
          <h2 className="section-title" style={{ marginBottom: "1.25rem" }}>
            🔍 Most Important Features (SHAP)
            <span className="si">වැදගත්ම ලක්ෂණ</span>
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table className="about-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Feature</th>
                  <th>Mean |SHAP| (MT)</th>
                  <th>Why it matters</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "1",
                    "Net Harvested Extent",
                    "25,652 MT",
                    "Directly determines production area",
                  ],
                  [
                    "2",
                    "Total Harvested Extent",
                    "13,576 MT",
                    "Gross area captured by harvest",
                  ],
                  [
                    "3",
                    "Total Sown Extent",
                    "10,792 MT",
                    "Proxy for intended cultivation scale",
                  ],
                  [
                    "4",
                    "Major Scheme Harvest",
                    "8,641 MT",
                    "AMPARA, POLONNARUWA dominate national output",
                  ],
                  [
                    "5",
                    "Average Yield",
                    "7,415 MT",
                    "Yield efficiency multiplies directly onto area",
                  ],
                  [
                    "6",
                    "Season",
                    "1,333 MT",
                    "Maha season yields ~40% more than Yala nationally",
                  ],
                  [
                    "7",
                    "Year",
                    "579 MT",
                    "Captures long-run productivity growth trends",
                  ],
                ].map(([rank, feature, shap, why]) => (
                  <tr key={rank}>
                    <td
                      style={{
                        textAlign: "center",
                        fontWeight: 700,
                        color: "var(--light-green)",
                      }}
                    >
                      {rank}
                    </td>
                    <td>
                      <code
                        style={{
                          background: "var(--surface-2)",
                          padding: "0.15rem 0.4rem",
                          borderRadius: 4,
                          fontSize: "0.82rem",
                        }}
                      >
                        {feature}
                      </code>
                    </td>
                    <td
                      style={{ color: "var(--primary-green)", fontWeight: 600 }}
                    >
                      {shap}
                    </td>
                    <td
                      style={{ color: "var(--text-mid)", fontSize: "0.85rem" }}
                    >
                      {why}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How inputs work */}
        <div
          className="card p-4 fade-in fade-in-delay-2"
          style={{ marginBottom: "1.5rem" }}
        >
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>
            📝 How Inputs Work
            <span className="si">ආදාන ක්‍රියා කරන ආකාරය</span>
          </h2>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {[
              {
                icon: "✅",
                title: "Required: Year, Season, District",
                body: "These three fields are always needed to identify the district-season combination.",
              },
              {
                icon: "🔄",
                title: "Optional: All cultivation metrics",
                body: "Sown extent, harvested extent, and yield fields are all optional. If left blank, the model uses historical median values for that district — so you still get a useful prediction.",
              },
              {
                icon: "📐",
                title: "Units",
                body: "Extent fields are in Hectares (ha). Yield fields are in kg/ha. Production output is in Metric Tonnes (MT).",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="alert alert-info">
                <span style={{ fontSize: "1.2rem" }}>{icon}</span>
                <div>
                  <strong>{title}</strong>
                  <p style={{ marginTop: "0.2rem", fontSize: "0.88rem" }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="card p-4 fade-in fade-in-delay-2"
          style={{ background: "#fff8e7", border: "2px solid var(--gold)" }}
        >
          <h2
            className="section-title"
            style={{ marginBottom: "0.75rem", color: "#7a5e1a" }}
          >
            ⚠️ Important Disclaimer
            <span className="si">වැදගත් නිදහස් ප්‍රකාශය</span>
          </h2>
          <ul
            style={{
              paddingLeft: "1.25rem",
              lineHeight: 1.8,
              color: "#7a5e1a",
              fontSize: "0.9rem",
            }}
          >
            <li>
              Predictions are AI-based estimates —{" "}
              <strong>not guaranteed</strong> production figures.
            </li>
            <li>
              Always verify with your local Agricultural Research and Production
              Assistant (ARPA).
            </li>
            <li>
              Extreme weather events, pest outbreaks, or policy changes may not
              be captured by the model.
            </li>
            <li>
              The 2022 organic fertiliser crisis is reflected in training data
              but future shocks cannot be predicted.
            </li>
          </ul>
          <p
            className="font-si"
            style={{
              marginTop: "0.75rem",
              fontSize: "0.82rem",
              color: "#7a5e1a",
              lineHeight: 1.7,
            }}
          >
            අනාවැකි AI ආදාරිත ගණනය කිරීම් පමණි. ප්‍රධාන තීරණ ගැනීමට පෙර ඔබේ
            කෘෂිකාර්මික නිලධාරියා සමඟ සාකච්ඡා කරන්න.
          </p>
        </div>

        {/* Data source */}
        <div className="card p-4 mt-3 fade-in fade-in-delay-2">
          <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>
            📂 Data Source
          </h2>
          <p
            style={{
              color: "var(--text-mid)",
              fontSize: "0.9rem",
              lineHeight: 1.7,
            }}
          >
            Training data sourced from the{" "}
            <strong>
              Department of Census and Statistics (DCS), Sri Lanka
            </strong>{" "}
            — official paddy cultivation statistics for Yala and Maha seasons,
            2005–2023, covering 27 districts. Model trained using strict
            time-based splitting (train ≤ 2020, test 2021–2023) to prevent data
            leakage.
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
