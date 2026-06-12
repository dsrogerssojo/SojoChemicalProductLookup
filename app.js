(() => {
  "use strict";

  const config = window.SOJO_LOOKUP_CONFIG || {};
  const app = document.getElementById("app");
  const SOJO_LOGO_SRC = "data:image/webp;base64,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";

  const FIELD_MAP = {
    name: ["product name", "chemical name", "product", "name"],
    company: ["company name", "company", "manufacturer", "supplier"],
    productCode: ["product code", "code", "item #", "item number"],
    use: ["use", "category", "classification"],
    sdsNumber: ["sds #", "sds number", "sds no", "sds"],
    version: ["version #", "version", "sds version"],
    issueDate: ["issue date", "date issued"],
    revisionDate: ["revision date", "revised date", "date revised"],
    supersedesDate: ["supersedes date", "supersedes"],
    composition: ["hazmat chemical composition", "composition", "active ingredient", "chemical composition"],
    hfrp: ["hfrp info", "hfrp", "nfpa", "nfpa info"],
    sdsLink: ["external link to sds", "sds link", "sds url", "external link", "link"]
  };

  let state = { records: [], query: "", sourceStatus: "Loading latest CSV data feed...", sourceLabel: "CSV data feed", loadedAt: null };
  document.addEventListener("DOMContentLoaded", init);

  async function init() { renderLoading(); await loadLatestData(); renderApp(); }

  async function loadLatestData() {
    const path = config.CSV_SOURCE_PATH || "data/sds.csv";
    try {
      const response = await fetch(withCacheBuster(path), { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      const rows = parseCsv(text);
      const records = normalizeRows(rows);
      state.records = records;
      state.sourceLabel = path;
      state.sourceStatus = `Loaded ${records.length} records from the current CSV data feed.`;
      state.loadedAt = new Date();
    } catch (error) {
      state.records = [];
      state.sourceLabel = path;
      state.sourceStatus = `The SDS data feed could not be loaded from ${path}. Check that Power Automate has created or updated the CSV file.`;
      state.loadedAt = new Date();
      console.error(error);
    }
  }

  function withCacheBuster(url) { return `${url}${url.includes("?") ? "&" : "?"}_=${Date.now()}`; }

  function parseCsv(text) {
    const rows = []; let row = []; let field = ""; let inQuotes = false;
    for (let i = 0; i < text.length; i += 1) {
      const char = text[i]; const next = text[i + 1];
      if (char === '"' && inQuotes && next === '"') { field += '"'; i += 1; }
      else if (char === '"') inQuotes = !inQuotes;
      else if (char === "," && !inQuotes) { row.push(field); field = ""; }
      else if ((char === "\n" || char === "\r") && !inQuotes) {
        if (char === "\r" && next === "\n") i += 1;
        row.push(field); if (row.some((value) => String(value).trim())) rows.push(row);
        row = []; field = "";
      } else field += char;
    }
    row.push(field); if (row.some((value) => String(value).trim())) rows.push(row);
    return rows;
  }

  function normalizeRows(rows) {
    if (!Array.isArray(rows) || rows.length < 2) return [];
    const headerIndex = rows.findIndex((row) => row.some((cell) => normalizeHeader(cell) === "product name"));
    const headers = (headerIndex >= 0 ? rows[headerIndex] : rows[0]).map(normalizeHeader);
    const dataRows = rows.slice((headerIndex >= 0 ? headerIndex : 0) + 1);
    return dataRows.map((row, index) => normalizeRecord(row, headers, index)).filter((record) => record.name);
  }

  function normalizeRecord(row, headers, index) {
    const get = (field) => {
      const aliases = FIELD_MAP[field] || [];
      const headerIndex = headers.findIndex((header) => aliases.includes(header));
      return clean(headerIndex >= 0 ? row[headerIndex] : "");
    };
    const name = get("name"); const company = get("company"); const productCode = get("productCode"); const hfrp = get("hfrp"); const sdsLink = normalizeLink(get("sdsLink")); const location = config.LOCATION_NAME || "Current Location"; const use = get("use"); const composition = get("composition"); const sdsNumber = get("sdsNumber");
    return { id: slug([name, company, productCode, location, index].filter(Boolean).join("-")), name, company, productCode, use, sdsNumber, version: get("version"), issueDate: formatExcelDate(get("issueDate")), revisionDate: formatExcelDate(get("revisionDate")), supersedesDate: formatExcelDate(get("supersedesDate")), composition, hfrp, sdsLink, location, risk: riskFromHfrp(hfrp), searchable: [name, company, productCode, use, sdsNumber, composition, hfrp, sdsLink, location].join(" ").toLowerCase() };
  }

  function clean(value) { const text = String(value ?? "").replace(/\s+/g, " ").trim(); return text && text.toLowerCase() !== "undefined" ? text : ""; }
  function normalizeHeader(value) { return clean(value).toLowerCase().replace(/\s+/g, " "); }
  function normalizeLink(value) { const text = clean(value); if (!text || text.toLowerCase() === "n/a") return ""; return text; }
  function slug(value) { return String(value || "record").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120) || `record-${Date.now()}`; }
  function formatExcelDate(value) { const text = clean(value); if (!text || text.toLowerCase() === "n/a") return ""; const num = Number(text); if (Number.isFinite(num) && num > 20000 && num < 70000) { const date = new Date(Date.UTC(1899, 11, 30) + num * 86400000); return date.toISOString().slice(0, 10); } return text; }
  function riskFromHfrp(hfrp) { const parts = clean(hfrp).split("/").map((part) => Number.parseInt(part, 10)); const max = Math.max(...parts.filter(Number.isFinite), 0); if (max >= 4) return "Extreme"; if (max === 3) return "High"; if (max === 2) return "Moderate"; return "Low"; }
  function filteredRecords() { const q = state.query.trim().toLowerCase(); const source = state.records.slice().sort((a, b) => a.name.localeCompare(b.name)); if (!q) return source; return source.filter((record) => record.searchable.includes(q)); }

  function renderLoading() {
    app.innerHTML = `<section class="loading-card"><p class="eyebrow">${escapeHtml(config.COMPANY_NAME || "Sojo Industries")}</p><h1>Loading latest SDS list...</h1><p>The page checks the current CSV data feed every time it opens.</p></section>`;
  }

  function renderApp() {
    const records = filteredRecords();
    app.innerHTML = `
      <header class="topbar"><div class="topbar-inner"><div class="brand"><img class="brand-logo" src="${SOJO_LOGO_SRC}" alt="Sojo logo" /><div><p class="brand-title">${escapeHtml(config.APP_TITLE || "Chemical Product Lookup")}</p><p class="brand-subtitle">${escapeHtml(config.LOCATION_NAME || "Current location")}</p></div></div><span class="status-pill">${escapeHtml(state.sourceStatus)}</span></div></header>
      <section class="hero"><div class="hero-inner"><div class="hero-copy"><p class="eyebrow">SDS-Inspired Chemical Safety Reference</p><h1>Search Chemical Products and Safety Records.</h1><p>Fast lookup for SDS links, product details, hazard indicators, HFRP ratings, and current chemical records for ${escapeHtml(config.LOCATION_NAME || "this location")}.</p><div class="hero-badges"><span class="hero-badge">${state.records.length} records</span><span class="hero-badge">HFRP ratings</span><span class="hero-badge">SDS links</span><span class="hero-badge">Live CSV sync</span></div></div><div class="hero-logo-card"><img class="hero-logo" src="${SOJO_LOGO_SRC}" alt="Sojo logo" /></div></div></section>
      <main class="main"><section class="search-shell"><div class="search-panel"><div class="controls"><input id="searchInput" class="search-input" value="${escapeHtml(state.query)}" placeholder="Search cleaner, bleach, company, product code, composition..." autofocus /><select id="useFilter" class="select"><option value="">${escapeHtml(shortLocation())}</option>${useOptions()}</select><button id="searchButton" class="button button-primary" type="button">Search</button></div></div><div class="library-head"><p class="section-kicker">Safety Library</p><h2>Chemical Records</h2></div><div class="meta-row"><span>${records.length} result${records.length === 1 ? "" : "s"} shown</span><span>Showing ${escapeHtml(config.LOCATION_NAME || "current location")} · Updated ${escapeHtml(lastLoadedText())}</span></div><div id="cards" class="cards">${records.length ? records.map(cardTemplate).join("") : `<div class="empty">No matching records found.</div>`}</div></section></main>
      <footer class="footer">Internal quick-reference only. Always confirm handling, storage, disposal, and emergency procedures against the official current SDS and product label.</footer>`;
    bindEvents();
  }

  function shortLocation() { const location = config.LOCATION_NAME || "Current location"; return location.split(" - ")[0] || location; }
  function useOptions() { const uses = [...new Set(state.records.map((record) => record.use).filter(Boolean))].sort(); return uses.map((use) => `<option>${escapeHtml(use)}</option>`).join(""); }
  function cardTemplate(record) { return `<button class="card" type="button" data-record-id="${escapeHtml(record.id)}"><h3>${escapeHtml(record.name)}</h3><p>${escapeHtml([record.company, record.productCode ? `Code ${record.productCode}` : "", record.use].filter(Boolean).join(" · "))}</p><p><strong>Composition:</strong> ${escapeHtml(record.composition || "Not listed")}</p><p><strong>HFRP/NFPA:</strong> ${escapeHtml(record.hfrp || "Not listed")}</p><div class="badges"><span class="badge ${riskClass(record.risk)}">${escapeHtml(record.risk)}</span>${record.sdsLink ? `<span class="badge">SDS linked</span>` : `<span class="badge">SDS missing</span>`}</div></button>`; }
  function riskClass(risk) { if (risk === "Extreme" || risk === "High") return "badge-high"; if (risk === "Moderate") return "badge-medium"; return "badge-low"; }

  function bindEvents() {
    document.getElementById("searchInput")?.addEventListener("input", (event) => { state.query = event.target.value; applyFilters(); });
    document.getElementById("useFilter")?.addEventListener("change", applyFilters);
    document.getElementById("searchButton")?.addEventListener("click", applyFilters);
    document.getElementById("cards")?.addEventListener("click", (event) => { const card = event.target.closest("[data-record-id]"); if (!card) return; const record = state.records.find((item) => item.id === card.dataset.recordId); if (record) showDetail(record); });
  }

  function applyFilters() {
    const q = document.getElementById("searchInput")?.value || ""; const use = document.getElementById("useFilter")?.value || "";
    state.query = q; let records = state.records.slice();
    if (q.trim()) records = records.filter((record) => record.searchable.includes(q.trim().toLowerCase()));
    if (use) records = records.filter((record) => record.use === use);
    records.sort((a, b) => a.name.localeCompare(b.name));
    const meta = document.querySelector(".meta-row span"); const cards = document.getElementById("cards");
    if (meta) meta.textContent = `${records.length} result${records.length === 1 ? "" : "s"} shown`;
    if (cards) cards.innerHTML = records.length ? records.map(cardTemplate).join("") : `<div class="empty">No matching records found.</div>`;
  }

  function showDetail(record) {
    const panel = document.createElement("div"); panel.className = "detail-backdrop";
    panel.innerHTML = `<article class="detail" role="dialog" aria-modal="true"><header class="detail-header"><div><p class="eyebrow">SDS record</p><h2>${escapeHtml(record.name)}</h2><p>${escapeHtml([record.company, record.productCode ? `Code ${record.productCode}` : "", record.use].filter(Boolean).join(" · "))}</p></div><button class="close" type="button" aria-label="Close">Close</button></header><div class="detail-body"><section class="info-block"><h3>Product Information</h3>${definitionList([["Company", record.company], ["Product code", record.productCode], ["Use", record.use], ["SDS #", record.sdsNumber], ["Version #", record.version], ["Issue date", record.issueDate], ["Revision date", record.revisionDate], ["Supersedes date", record.supersedesDate]])}</section><section class="info-block"><h3>Safety Reference</h3>${definitionList([["Composition", record.composition], ["HFRP / NFPA", record.hfrp], ["Risk level", record.risk], ["Location", record.location]])}${record.sdsLink && /^https?:\/\//i.test(record.sdsLink) ? `<a class="link-button" href="${escapeHtml(record.sdsLink)}" target="_blank" rel="noreferrer">Open SDS</a>` : `<p>No web SDS link is available in the data feed.</p>`}</section></div></article>`;
    document.body.appendChild(panel); panel.querySelector(".close")?.focus(); panel.querySelector(".close")?.addEventListener("click", () => panel.remove()); panel.addEventListener("click", (event) => { if (event.target === panel) panel.remove(); }); document.addEventListener("keydown", function escapeHandler(event) { if (event.key === "Escape") { panel.remove(); document.removeEventListener("keydown", escapeHandler); } });
  }

  function definitionList(items) { return `<dl>${items.map(([label, value]) => `<div class="kv"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value || "Not listed")}</dd></div>`).join("")}</dl>`; }
  function lastLoadedText() { if (!state.loadedAt) return "not loaded"; return state.loadedAt.toLocaleString([], { dateStyle: "short", timeStyle: "short" }); }
  function escapeHtml(value) { return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;"); }
})();
