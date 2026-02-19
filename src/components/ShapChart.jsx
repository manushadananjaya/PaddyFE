/**
 * ShapChart — Horizontal bar chart for SHAP feature contributions
 * Shows English name + Sinhala sub-label on each bar.
 */
export default function ShapChart({ features, baseValue }) {
  if (!features || features.length === 0) return null;

  const maxAbs = Math.max(...features.map((f) => Math.abs(f.shap_value)));

  // Bilingual feature name mapping  { en, si }
  const NAMES = {
    Nett_Extent: { en: "Net Harvested Extent", si: "නිශ්චිත අස්වනු කළ බිම්" },
    Harvest_Total: { en: "Total Harvested Extent", si: "මුළු අස්වනු කළ බිම්" },
    Sown_Total: { en: "Total Sown Extent", si: "මුළු වගා කළ බිම් කොටස" },
    Harvest_Major: {
      en: "Major Scheme Harvest",
      si: "ප්‍රධාන — අස්වනු කළ බිම්",
    },
    Yield_Avg: { en: "Average Yield", si: "සාමාන්‍ය අස්වනු (kg/ha)" },
    Yield_Major: { en: "Major Scheme Yield", si: "ප්‍රධාන — සාමාන්‍ය අස්වනු" },
    Sown_Major: { en: "Major Scheme Sown", si: "ප්‍රධාන — වගා කළ බිම්" },
    Yield_Minor: { en: "Minor Scheme Yield", si: "කුඩා — සාමාන්‍ය අස්වනු" },
    Yield_Rainfed: { en: "Rainfed Yield", si: "වර්ෂාපෝෂිත — සාමාන්‍ය අස්වනු" },
    Harvest_Rainfed: { en: "Rainfed Harvest", si: "වර්ෂාපෝෂිත — අස්වනු කළ" },
    Sown_Minor: { en: "Minor Scheme Sown", si: "කුඩා — වගා කළ බිම්" },
    Sown_Rainfed: { en: "Rainfed Sown", si: "වර්ෂාපෝෂිත — බිම් කොටස" },
    Harvest_Minor: { en: "Minor Scheme Harvest", si: "කුඩා — අස්වනු කළ බිම්" },
    Season: { en: "Season", si: "කන්නය" },
    Year: { en: "Year", si: "වර්ෂය" },
    District: { en: "District", si: "දිස්ත්‍රික්කය" },
  };

  const FMT = (n) =>
    Number(n).toLocaleString("en-LK", { maximumFractionDigits: 0 });

  return (
    <div>
      {/* Base value */}
      {baseValue !== undefined && (
        <div className="alert alert-info" style={{ marginBottom: "1.25rem" }}>
          <span>📊</span>
          <div>
            <strong>Base prediction:</strong> {FMT(baseValue)} MT
            <span
              className="si font-si"
              style={{
                display: "block",
                fontSize: "0.8rem",
                marginTop: "0.2rem",
              }}
            >
              model-ය නිශ්චිත ආදාන නොමැතිව {FMT(baseValue)} MT ගණනය කළේය
            </span>
          </div>
        </div>
      )}

      {/* Bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        {features.map((f, i) => {
          const pct = maxAbs > 0 ? (Math.abs(f.shap_value) / maxAbs) * 100 : 0;
          const isPos = f.direction === "increases";
          const sign = isPos ? "+" : "";
          const names = NAMES[f.feature] || { en: f.feature, si: f.feature };

          return (
            <div
              key={i}
              className="shap-bar-row fade-in"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {/* Label row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                {/* Feature name — EN + SI */}
                <div>
                  <div
                    className="shap-bar-feature"
                    style={{ fontSize: "0.88rem" }}
                  >
                    {names.en}
                  </div>
                  <div
                    className="font-si"
                    style={{
                      fontSize: "0.76rem",
                      color: "var(--text-light)",
                      lineHeight: 1.3,
                    }}
                  >
                    {names.si}
                  </div>
                </div>
                {/* Value badge */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <span
                    className={`shap-bar-value ${isPos ? "pos" : "neg"}`}
                    style={{ fontSize: "0.88rem", display: "block" }}
                  >
                    {isPos ? "✅" : "❌"} {sign}
                    {FMT(f.shap_value)} MT
                  </span>
                  <span
                    style={{ fontSize: "0.72rem", color: "var(--text-light)" }}
                  >
                    {isPos ? "නිෂ්පාදනය වැඩි කරයි" : "නිෂ්පාදනය අඩු කරයි"}
                  </span>
                </div>
              </div>

              {/* Bar */}
              <div className="shap-bar-track">
                <div
                  className={`shap-bar-fill ${isPos ? "pos" : "neg"}`}
                  style={{ width: `${Math.max(pct, 4)}%` }}
                >
                  {pct > 20 && `${sign}${FMT(f.shap_value)}`}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          marginTop: "1.25rem",
          flexWrap: "wrap",
          fontSize: "0.8rem",
          color: "var(--text-mid)",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span
            style={{
              width: 14,
              height: 14,
              background: "var(--primary-green)",
              borderRadius: 3,
              display: "inline-block",
            }}
          />
          ✅ Increases production / නිෂ්පාදනය වැඩි කරයි
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span
            style={{
              width: 14,
              height: 14,
              background: "var(--danger)",
              borderRadius: 3,
              display: "inline-block",
            }}
          />
          ❌ Decreases production / නිෂ්පාදනය අඩු කරයි
        </span>
      </div>
    </div>
  );
}
