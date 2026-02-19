// API base URL — production backend on Render

// export const API_BASE = "http://localhost:8000";
export const API_BASE = "https://paddy-prediction.onrender.com";

// Districts — API value + English + Sinhala display
export const DISTRICTS = [
  { value: "AMPARA", en: "Ampara", si: "අම්පාර" },
  { value: "ANURADHAPURA", en: "Anuradhapura", si: "අනුරාධපුරය" },
  { value: "BADULLA", en: "Badulla", si: "බදුල්ල" },
  { value: "BATTICALOA", en: "Batticaloa", si: "මඩකළපුව" },
  { value: "COLOMBO", en: "Colombo", si: "කොළඹ" },
  { value: "GALLE", en: "Galle", si: "ගාල්ල" },
  { value: "GAMPAHA", en: "Gampaha", si: "ගම්පහ" },
  { value: "HAMBANTOTA", en: "Hambantota", si: "හම්බන්තොට" },
  { value: "JAFFNA", en: "Jaffna", si: "යාපනය" },
  { value: "KALUTARA", en: "Kalutara", si: "කළුතර" },
  { value: "KANDY", en: "Kandy", si: "මහනුවර" },
  { value: "KEGALLE", en: "Kegalle", si: "කෑගල්ල" },
  { value: "KILLINOCHCHI", en: "Kilinochchi", si: "කිලිනොච්චිය" },
  { value: "KURUNEGALA", en: "Kurunegala", si: "කුරුණෑගල" },
  { value: "MAHAWELI_H", en: "Mahaweli H Zone", si: "මහවැලි H කලාපය" },
  { value: "MANNAR", en: "Mannar", si: "මන්නාරම" },
  { value: "MATALE", en: "Matale", si: "මාතලේ" },
  { value: "MATARA", en: "Matara", si: "මාතර" },
  { value: "MONARAGALA", en: "Monaragala", si: "මොනරාගල" },
  { value: "MULATIVU", en: "Mulativu", si: "මුලතිව්" },
  { value: "NUWARAELIYA", en: "Nuwara Eliya", si: "නුවරඑළිය" },
  { value: "POLONNARUWA", en: "Polonnaruwa", si: "පොළොන්නරුව" },
  { value: "PUTTALAM", en: "Puttalam", si: "පුත්තලම" },
  { value: "RATNAPURA", en: "Ratnapura", si: "රත්නපුර" },
  { value: "TRINCOMALEE", en: "Trincomalee", si: "ත්‍රිකෝණමලේ" },
  { value: "UDA_WALAWE", en: "Uda Walawe", si: "උඩවලව" },
  { value: "VAVUNIYA", en: "Vavuniya", si: "වව්නියාව" },
];

// Numeric input field definitions grouped by section
export const FIELD_GROUPS = [
  {
    id: "sown",
    title: "Sown Extent",
    si: "බිම් කොටස",
    unit: "Hectares (හෙ.)",
    fields: [
      {
        key: "Sown_Major",
        en: "Major Scheme — Sown",
        si: "ප්‍රධාන යෝජනාක්‍රමය",
      },
      { key: "Sown_Minor", en: "Minor Scheme — Sown", si: "කුඩා යෝජනාක්‍රමය" },
      { key: "Sown_Rainfed", en: "Rain-fed — Sown", si: "වර්ෂාපෝෂිත" },
      { key: "Sown_Total", en: "Total Sown Extent", si: "මුළු වගා කළ බිම" },
    ],
  },
  {
    id: "harvest",
    title: "Harvested Extent",
    si: "අස්වනු කළ බිම",
    unit: "Hectares (හෙ.)",
    fields: [
      {
        key: "Harvest_Major",
        en: "Major Scheme — Harvested",
        si: "ප්‍රධාන — අස්වනු",
      },
      {
        key: "Harvest_Minor",
        en: "Minor Scheme — Harvested",
        si: "කුඩා — අස්වනු",
      },
      {
        key: "Harvest_Rainfed",
        en: "Rain-fed — Harvested",
        si: "වර්ෂාපෝෂිත — අස්වනු",
      },
      {
        key: "Harvest_Total",
        en: "Total Harvested Extent",
        si: "මුළු අස්වනු කළ බිම",
      },
      {
        key: "Nett_Extent",
        en: "Net Harvested Extent",
        si: "නිශ්චිත අස්වනු (හෙ.)",
      },
    ],
  },
  {
    id: "yield",
    title: "Average Yield",
    si: "සාමාන්‍ය අස්වනු",
    unit: "kg/ha",
    fields: [
      {
        key: "Yield_Major",
        en: "Major Scheme — Yield",
        si: "ප්‍රධාන — අස්වනු",
      },
      { key: "Yield_Minor", en: "Minor Scheme — Yield", si: "කුඩා — අස්වනු" },
      {
        key: "Yield_Rainfed",
        en: "Rain-fed — Yield",
        si: "වර්ෂාපෝෂිත — අස්වනු",
      },
      {
        key: "Yield_Avg",
        en: "Overall Average Yield",
        si: "සාමාන්‍ය අස්වනු (kg/ha)",
      },
    ],
  },
];

export const ERRORS = {
  offline: {
    en: "Server is offline. Please try again later.",
    si: "සේවාදායකය ක්‍රියා නොකරයි.",
  },
  required: {
    en: "Please select District, Season, and Year.",
    si: "දිස්ත්‍රික්කය, කන්නය සහ වර්ෂය තෝරන්න.",
  },
  generic: {
    en: "Something went wrong. Please try again.",
    si: "දෝෂයක් ඇත. නැවත උත්සාහ කරන්න.",
  },
  zeroPred: {
    en: "Insufficient data for this combination.",
    si: "ප්‍රමාණවත් දත්ත නොමැත.",
  },
};
