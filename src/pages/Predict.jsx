import { useState } from "react";
import { API_BASE, DISTRICTS, FIELD_GROUPS, ERRORS } from "../constants";
import ShapChart from "../components/ShapChart";

function Accordion({ group, values, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion">
      <button className="accordion-header" onClick={() => setOpen((o) => !o)}>
        <span>
          {group.title}{" "}
          <span
            style={{
              color: "var(--text-light)",
              fontWeight: 400,
              marginLeft: 4,
            }}
          >
            ({group.unit})
          </span>
          <span className="si"> / {group.si}</span>
        </span>
        <span className={`accordion-chevron ${open ? "open" : ""}`}>▾</span>
      </button>
      {open && (
        <div className="accordion-body">
          {group.fields.map((f) => (
            <div className="form-group" key={f.key}>
              <label className="form-label">
                {f.en}
                <span className="si"> {f.si}</span>
              </label>
              <input
                type="number"
                className="form-input"
                placeholder="Leave blank to auto-estimate"
                min="0"
                value={values[f.key] ?? ""}
                onChange={(e) =>
                  onChange(
                    f.key,
                    e.target.value === ""
                      ? undefined
                      : parseFloat(e.target.value),
                  )
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Predict() {
  const currentYear = new Date().getFullYear();

  // Form state
  const [year, setYear] = useState(currentYear);
  const [season, setSeason] = useState("Maha");
  const [district, setDistrict] = useState("");
  const [numericVals, setNumericVals] = useState({});

  // UI state
  const [loading, setLoading] = useState(false);
  const [explaining, setExplaining] = useState(false);
  const [error, setError] = useState(null);
  const [prediction, setPrediction] = useState(null); // { mt, model }
  const [explanation, setExplanation] = useState(null); // { features, base }

  const setNum = (key, val) => setNumericVals((v) => ({ ...v, [key]: val }));

  const buildPayload = () => {
    const payload = { Year: year, Season: season, District: district };
    Object.entries(numericVals).forEach(([k, v]) => {
      if (v !== undefined && v !== "") payload[k] = v;
    });
    return payload;
  };

  const handlePredict = async () => {
    if (!district || !season || !year) {
      setError(ERRORS.required);
      return;
    }
    setError(null);
    setPrediction(null);
    setExplanation(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) throw new Error("api_error");
      const data = await res.json();
      const mt = data.predicted_total_production_mt;
      if (mt === 0) {
        setError(ERRORS.zeroPred);
        setLoading(false);
        return;
      }
      setPrediction({ mt, model: data.model_used });
    } catch (e) {
      setError(e.message === "api_error" ? ERRORS.generic : ERRORS.offline);
    } finally {
      setLoading(false);
    }
  };

  const handleExplain = async () => {
    setExplaining(true);
    setExplanation(null);
    try {
      const res = await fetch(`${API_BASE}/explain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error("api_error");
      const data = await res.json();
      setExplanation({ features: data.top_features, base: data.base_value_mt });
    } catch {
      setError(ERRORS.generic);
    } finally {
      setExplaining(false);
    }
  };

  const districtObj = DISTRICTS.find((d) => d.value === district);

  return (
    <div>
      {/* Header */}
      <div
        className="page-hero"
        style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)" }}>
            Paddy Production Prediction
            <span className="si">වී නිෂ්පාදන අනාවැකිය</span>
          </h1>
          <p style={{ fontSize: "0.95rem", marginTop: "0.5rem" }}>
            Enter your district and cultivation details to get an instant AI
            prediction.
            <span
              className="font-si"
              style={{ display: "block", opacity: 0.75, fontSize: "0.85rem" }}
            >
              දිස්ත්‍රික්කය සහ වගා විස්තර ඇතුළත් කර AI නිෂ්පාදන අනාවැකිය ලබා
              ගන්න.
            </span>
          </p>
        </div>
      </div>

      <div
        className="container"
        style={{ padding: "2rem 1.25rem", maxWidth: "900px" }}
      >
        <div className="predict-layout">
          {/* ── Left: Form ── */}
          <div className="predict-form-col">
            {/* Section A: Required */}
            <div className="card p-4 fade-in">
              <h2
                className="section-title"
                style={{ marginBottom: "1.25rem", fontSize: "1.1rem" }}
              >
                📍 Basic Information
                <span className="si">මූලික තොරතුරු</span>
              </h2>

              {/* Year */}
              <div className="form-group" style={{ marginBottom: "1.25rem" }}>
                <label className="form-label">
                  Year <span className="si">/ වර්ෂය</span>
                  <span
                    style={{
                      float: "right",
                      color: "var(--primary-green)",
                      fontWeight: 700,
                    }}
                  >
                    {year}
                  </span>
                </label>
                <input
                  type="range"
                  min="2005"
                  max="2030"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.75rem",
                    color: "var(--text-light)",
                    marginTop: "0.2rem",
                  }}
                >
                  <span>2005</span>
                  <span>2030</span>
                </div>
              </div>

              {/* Season Toggle */}
              <div className="form-group" style={{ marginBottom: "1.25rem" }}>
                <label className="form-label">
                  Season <span className="si">/ කන්නය</span>
                </label>
                <div className="season-toggle">
                  {[
                    { val: "Yala", icon: "🌞", si: "යල කන්නය", cls: "yala" },
                    { val: "Maha", icon: "🌧️", si: "මහ කන්නය", cls: "maha" },
                  ].map((s) => (
                    <button
                      key={s.val}
                      className={`season-option ${s.cls} ${season === s.val ? "active" : ""}`}
                      onClick={() => setSeason(s.val)}
                    >
                      <span className="season-icon">{s.icon}</span>
                      {s.val}
                      <span className="si">{s.si}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* District */}
              <div className="form-group" style={{ marginBottom: "0.5rem" }}>
                <label className="form-label">
                  District <span className="si">/ දිස්ත්‍රික්කය</span>
                </label>
                <div className="select-wrapper">
                  <select
                    className={`form-select ${!district && error ? "error" : ""}`}
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  >
                    <option value="">
                      -- Select District / දිස්ත්‍රික්කය --
                    </option>
                    {DISTRICTS.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.en} — {d.si}
                      </option>
                    ))}
                  </select>
                </div>
                {districtObj && (
                  <div
                    style={{
                      marginTop: "0.35rem",
                      fontSize: "0.82rem",
                      color: "var(--text-light)",
                    }}
                  >
                    📍 {districtObj.en}
                    <span className="font-si" style={{ marginLeft: "6px" }}>
                      {districtObj.si}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Section B: Optional */}
            <div
              className="fade-in fade-in-delay-1"
              style={{ marginTop: "1.25rem" }}
            >
              <div
                className="alert alert-info"
                style={{ marginBottom: "0.85rem" }}
              >
                <span>ℹ️</span>
                <div style={{ fontSize: "0.85rem" }}>
                  <strong>Optional:</strong> Leave fields below blank — the
                  model will auto-estimate using historical district averages.
                  <span className="si font-si">
                    {" "}
                    ඇතුළත් නොකළහොත් model-ය ස්වයංක්‍රීයව ගණනය කරයි.
                  </span>
                </div>
              </div>

              {FIELD_GROUPS.map((g) => (
                <Accordion
                  key={g.id}
                  group={g}
                  values={numericVals}
                  onChange={setNum}
                />
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="alert alert-error mt-2 fade-in">
                <span>⚠️</span>
                <div>
                  {error.en}
                  <span className="si">{error.si}</span>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              className="btn btn-primary w-full mt-2"
              style={{
                justifyContent: "center",
                padding: "0.85rem",
                fontSize: "1rem",
              }}
              onClick={handlePredict}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner" /> Predicting…
                </>
              ) : (
                "🌾 Predict Production / නිෂ්පාදනය ගණනය කරන්න"
              )}
            </button>
          </div>

          {/* ── Right: Results ── */}
          <div className="predict-result-col">
            {!prediction && !loading && (
              <div
                className="card p-4 text-center fade-in"
                style={{
                  border: "2px dashed var(--border)",
                  background: "var(--surface-2)",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>
                  🌾
                </div>
                <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                  Your prediction will appear here after you submit the form.
                </p>
                <p
                  className="font-si"
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-light)",
                    marginTop: "0.3rem",
                  }}
                >
                  ඔබේ අනාවැකිය ඇතුළත් කිරීමෙන් පසු මෙහි දිස් වේ.
                </p>
              </div>
            )}

            {loading && (
              <div className="card p-4 text-center fade-in">
                <div className="flex-center" style={{ height: "120px" }}>
                  <div
                    className="spinner dark"
                    style={{ width: 40, height: 40, borderWidth: 4 }}
                  />
                </div>
                <p
                  style={{
                    color: "var(--text-light)",
                    fontSize: "0.9rem",
                    marginTop: "1rem",
                  }}
                >
                  Analysing data…
                  <span className="font-si"> / දත්ත විශ්ලේෂණය කරමින්…</span>
                </p>
              </div>
            )}

            {prediction && !loading && (
              <div className="fade-in">
                {/* Result card */}
                <div className="result-card">
                  <div className="accuracy-badge">
                    ✅ R² = 0.9913 · 99.1% Accuracy
                  </div>
                  <div className="result-production mt-2">
                    {Number(prediction.mt).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}{" "}
                    MT
                  </div>
                  <div className="result-label mt-1">
                    Predicted Total Paddy Production
                    <span className="si">අනාවැකි මුළු වී නිෂ්පාදනය</span>
                  </div>
                  <div
                    style={{
                      marginTop: "0.6rem",
                      fontSize: "0.8rem",
                      opacity: 0.65,
                    }}
                  >
                    {districtObj?.en} · {season} · {year} · {prediction.model}
                  </div>
                  <button
                    className="btn btn-gold mt-3"
                    style={{ width: "100%", justifyContent: "center" }}
                    onClick={handleExplain}
                    disabled={explaining}
                  >
                    {explaining ? (
                      <>
                        <div
                          className="spinner"
                          style={{
                            borderColor: "rgba(0,0,0,0.2)",
                            borderTopColor: "var(--dark)",
                          }}
                        />{" "}
                        Generating explanation…
                      </>
                    ) : (
                      "📊 Explain this prediction / ඇයි මෙම අගය?"
                    )}
                  </button>
                </div>

                {/* SHAP explanation */}
                {explanation && (
                  <div className="card p-4 mt-2 fade-in">
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--dark)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      📊 Why did the model predict this?
                    </h3>
                    <p
                      className="font-si"
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-light)",
                        marginBottom: "1rem",
                      }}
                    >
                      ඇයි model-ය මෙම අගය ගණනය කළේ?
                    </p>
                    <ShapChart
                      features={explanation.features}
                      baseValue={explanation.base}
                    />
                  </div>
                )}

                {/* Quick interpretation */}
                <div className="card p-3 mt-2 bg-surface fade-in fade-in-delay-1">
                  <p
                    style={{
                      fontSize: "0.83rem",
                      color: "var(--text-mid)",
                      lineHeight: 1.6,
                    }}
                  >
                    <strong>Interpretation:</strong> The model predicts{" "}
                    <strong style={{ color: "var(--primary-green)" }}>
                      {Number(prediction.mt).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}{" "}
                      MT
                    </strong>{" "}
                    of paddy for <strong>{districtObj?.en}</strong> in the{" "}
                    <strong>
                      {season} {year}
                    </strong>{" "}
                    season. &nbsp;Typical error: ±3,862 MT.
                  </p>
                  <p
                    className="font-si"
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-light)",
                      marginTop: "0.4rem",
                      lineHeight: 1.5,
                    }}
                  >
                    model-ය {districtObj?.si} දිස්ත්‍රික්කයේ {year}{" "}
                    {season === "Maha" ? "මහ" : "යල"} කන්නය සඳහා{" "}
                    {Number(prediction.mt).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}{" "}
                    MT ගණනය කළේය.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="footer">
        🌾 Sri Lanka Paddy Production Prediction System &nbsp;·&nbsp;
        <span>Trained on DCS Data 2005–2023 · CatBoost R² = 0.9913</span>
      </footer>
    </div>
  );
}
