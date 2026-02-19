import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { API_BASE } from "../constants";

export default function Navbar() {
  const [online, setOnline] = useState(null); // null = checking

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`${API_BASE}/health`, {
          signal: AbortSignal.timeout(3000),
        });
        setOnline(res.ok);
      } catch {
        setOnline(false);
      }
    };
    check();
    const id = setInterval(check, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-brand">
          <span style={{ fontSize: "1.5rem" }}>🌾</span>
          <div>
            <div>Paddy Predict</div>
            <span className="si">වී නිෂ්පාදන අනාවැකිය</span>
          </div>
        </div>

        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/predict"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            Predict
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            About
          </NavLink>
        </div>

        {/* API status badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.3rem 0.7rem",
            borderRadius: "20px",
            border: `1px solid ${online === true ? "rgba(64,192,110,0.4)" : online === false ? "rgba(230,57,70,0.4)" : "rgba(255,255,255,0.15)"}`,
            background:
              online === true
                ? "rgba(64,192,110,0.12)"
                : online === false
                  ? "rgba(230,57,70,0.12)"
                  : "rgba(255,255,255,0.06)",
            transition: "all 0.4s ease",
            whiteSpace: "nowrap",
          }}
          title={
            online === null
              ? "Checking API…"
              : online
                ? "Backend API is online"
                : "Backend API is offline"
          }
        >
          {/* Pulsing dot */}
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              flexShrink: 0,
              background:
                online === true
                  ? "#40c06e"
                  : online === false
                    ? "#e63946"
                    : "#aaa",
              boxShadow:
                online === true ? "0 0 0 0 rgba(64,192,110,0.6)" : "none",
              animation:
                online === true ? "pulse 1.8s ease-out infinite" : "none",
              display: "inline-block",
            }}
          />
          {/* Label */}
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              color:
                online === true
                  ? "#7ee8a2"
                  : online === false
                    ? "#f87272"
                    : "#aaa",
              letterSpacing: "0.02em",
            }}
          >
            {online === null
              ? "Checking…"
              : online
                ? "Model Running"
                : "Model Offline"}
          </span>
        </div>
      </div>
    </nav>
  );
}
