(() => {
  "use strict";

  const config = window.SOJO_LOOKUP_CONFIG || {};
  const app = document.getElementById("app");

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

  async function init() {
    renderLoading();
    await loadLatestData();
    renderApp();
  }

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

  function withCacheBuster(url) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}_=${Date.now()}`;
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;
    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      const next = text[i + 1];
      if (char === '"' && inQuotes && next === '"') { field += '"'; i += 1; }
      else if (char === '"') inQuotes = !inQuotes;
      else if (char === "," && !inQuotes) { row.push(field); field = ""; }
      else if ((char === "\n" || char === "\r") && !inQuotes) {
        if (char === "\r" && next === "\n") i += 1;
        row.push(field);
        if (row.some((value) => String(value).trim())) rows.push(row);
        row = [];
        field = "";
      } else field += char;
    }
    row.push(field);
    if (row.some((value) => String(value).trim())) rows.push(row);
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
    const name = get("name");
    const company = get("company");
    const productCode = get("productCode");
    const hfrp = get("hfrp");
    const sdsLink = normalizeLink(get("sdsLink"));
    const location = config.LOCATION_NAME || "Current Location";
    const use = get("use");
    const composition = get("composition");
    const sdsNumber = get("sdsNumber");
    return {
      id: slug([name, company, productCode, location, index].filter(Boolean).join("-")),
      name, company, productCode, use, sdsNumber,
      version: get("version"),
      issueDate: formatExcelDate(get("issueDate")),
      revisionDate: formatExcelDate(get("revisionDate")),
      supersedesDate: formatExcelDate(get("supersedesDate")),
      composition, hfrp, sdsLink, location,
      risk: riskFromHfrp(hfrp),
      searchable: [name, company, productCode, use, sdsNumber, composition, hfrp, sdsLink, location].join(" ").toLowerCase()
    };
  }

  function clean(value) {
    const text = String(value ?? "").replace(/\s+/g, " ").trim();
    return text && text.toLowerCase() !== "undefined" ? text : "";
  }
  function normalizeHeader(value) { return clean(value).toLowerCase().replace(/\s+/g, " "); }
  function normalizeLink(value) {
    const text = clean(value);
    if (!text || text.toLowerCase() === "n/a") return "";
    return text;
  }
  function slug(value) {
    return String(value || "record").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120) || `record-${Date.now()}`;
  }
  function formatExcelDate(value) {
    const text = clean(value);
    if (!text || text.toLowerCase() === "n/a") return "";
    const num = Number(text);
    if (Number.isFinite(num) && num > 20000 && num < 70000) {
      const date = new Date(Date.UTC(1899, 11, 30) + num * 86400000);
      return date.toISOString().slice(0, 10);
    }
    return text;
  }
  function riskFromHfrp(hfrp) {
    const parts = clean(hfrp).split("/").map((part) => Number.parseInt(part, 10));
    const max = Math.max(...parts.filter(Number.isFinite), 0);
    if (max >= 4) return "Extreme";
    if (max === 3) return "High";
    if (max === 2) return "Moderate";
    return "Low";
  }
  function filteredRecords() {
    const q = state.query.trim().toLowerCase();
    const source = state.records.slice().sort((a, b) => a.name.localeCompare(b.name));
    if (!q) return source;
    return source.filter((record) => record.searchable.includes(q));
  }
  function renderLoading() {
    app.innerHTML = `<section class="loading-card"><p class="eyebrow">${escapeHtml(config.COMPANY_NAME || "Sojo Industries")}</p><h1>Loading latest SDS list...</h1><p>The page checks the current CSV data feed every time it opens.</p></section>`;
  }
  function renderApp() {
    const records = filteredRecords();
    app.innerHTML = `
      <header class="topbar"><div class="topbar-inner"><div class="brand"><span class="brand-mark">SO</span><div><p class="brand-title">${escapeHtml(config.APP_TITLE || "Chemical Product Lookup")}</p><p class="brand-subtitle">${escapeHtml(config.LOCATION_NAME || "Current location")}</p></div></div><span class="status-pill">${escapeHtml(state.sourceStatus)}</span></div></header>
      <section class="hero"><div class="hero-inner"><div><p class="eyebrow">QR chemical lookup</p><h1>Search the current SDS list.</h1><p>This page loads the latest CSV data feed each time someone scans the QR code or refreshes the page.</p></div><div class="hero-stat"><strong>${state.records.length}</strong><span>records loaded</span></div></div></section>
      <main class="main"><section class="alert-row"><div class="alert alert-danger"><strong>Emergency</strong><span>Call ${escapeHtml(config.EMERGENCY_PHONE || "911")} for serious exposure.</span></div><div class="alert alert-warning"><strong>Poison Control</strong><span>${escapeHtml(config.POISON_CONTROL_PHONE || "1-800-222-1222")}</span></div><div class="alert"><strong>Source</strong><span>${escapeHtml(state.sourceLabel || "data feed")} · Updated ${escapeHtml(lastLoadedText())}</span></div></section>
      <section class="panel"><div class="controls"><input id="searchInput" class="search-input" value="${escapeHtml(state.query)}" placeholder="Search product, company, code, use, composition, SDS..." autofocus /><select id="riskFilter" class="select"><option value="">All risk levels</option><option>High</option><option>Moderate</option><option>Low</option></select><select id="useFilter" class="select"><option value="">All uses</option>${useOptions()}</select><button id="reloadButton" class="button button-primary" type="button">Reload data</button></div><div class="meta-row"><span>${records.length} result${records.length === 1 ? "" : "s"} shown</span><span>Showing ${escapeHtml(config.LOCATION_NAME || "current location")}</span></div><div id="cards" class="cards">${records.length ? records.map(cardTemplate).join("") : `<div class="empty">No matching records found.</div>`}</div></section></main>
      <footer class="footer">Internal quick-reference only. Always confirm exposure, PPE, handling, storage, disposal, and emergency procedures against the official current SDS and product label.</footer>`;
    bindEvents();
  }
  function useOptions() {
    const uses = [...new Set(state.records.map((record) => record.use).filter(Boolean))].sort();
    return uses.map((use) => `<option>${escapeHtml(use)}</option>`).join("");
  }
  function cardTemplate(record) {
    return `<button class="card" type="button" data-record-id="${escapeHtml(record.id)}"><h3>${escapeHtml(record.name)}</h3><p>${escapeHtml([record.company, record.productCode ? `Code ${record.productCode}` : "", record.use].filter(Boolean).join(" · "))}</p><p><strong>Composition:</strong> ${escapeHtml(record.composition || "Not listed")}</p><p><strong>HFRP/NFPA:</strong> ${escapeHtml(record.hfrp || "Not listed")}</p><div class="badges"><span class="badge ${riskClass(record.risk)}">${escapeHtml(record.risk)}</span>${record.sdsLink ? `<span class="badge">SDS linked</span>` : `<span class="badge">SDS missing</span>`}</div></button>`;
  }
  function riskClass(risk) { if (risk === "Extreme" || risk === "High") return "badge-high"; if (risk === "Moderate") return "badge-medium"; return "badge-low"; }
  function bindEvents() {
    document.getElementById("searchInput")?.addEventListener("input", (event) => { state.query = event.target.value; applyFilters(); });
    document.getElementById("riskFilter")?.addEventListener("change", applyFilters);
    document.getElementById("useFilter")?.addEventListener("change", applyFilters);
    document.getElementById("reloadButton")?.addEventListener("click", async () => { state.sourceStatus = "Reloading current data feed..."; renderApp(); await loadLatestData(); renderApp(); });
    document.getElementById("cards")?.addEventListener("click", (event) => { const card = event.target.closest("[data-record-id]"); if (!card) return; const record = state.records.find((item) => item.id === card.dataset.recordId); if (record) showDetail(record); });
  }
  function applyFilters() {
    const q = document.getElementById("searchInput")?.value || "";
    const risk = document.getElementById("riskFilter")?.value || "";
    const use = document.getElementById("useFilter")?.value || "";
    state.query = q;
    let records = state.records.slice();
    if (q.trim()) records = records.filter((record) => record.searchable.includes(q.trim().toLowerCase()));
    if (risk) records = records.filter((record) => record.risk === risk);
    if (use) records = records.filter((record) => record.use === use);
    records.sort((a, b) => a.name.localeCompare(b.name));
    const meta = document.querySelector(".meta-row span");
    const cards = document.getElementById("cards");
    if (meta) meta.textContent = `${records.length} result${records.length === 1 ? "" : "s"} shown`;
    if (cards) cards.innerHTML = records.length ? records.map(cardTemplate).join("") : `<div class="empty">No matching records found.</div>`;
  }
  function showDetail(record) {
    const panel = document.createElement("div");
    panel.className = "detail-backdrop";
    panel.innerHTML = `<article class="detail" role="dialog" aria-modal="true"><header class="detail-header"><div><p class="eyebrow">SDS record</p><h2>${escapeHtml(record.name)}</h2><p>${escapeHtml([record.company, record.productCode ? `Code ${record.productCode}` : "", record.use].filter(Boolean).join(" · "))}</p></div><button class="close" type="button" aria-label="Close">Close</button></header><div class="detail-body"><section class="info-block"><h3>Product Information</h3>${definitionList([["Company", record.company], ["Product code", record.productCode], ["Use", record.use], ["SDS #", record.sdsNumber], ["Version #", record.version], ["Issue date", record.issueDate], ["Revision date", record.revisionDate], ["Supersedes date", record.supersedesDate]])}</section><section class="info-block"><h3>Safety Reference</h3>${definitionList([["Composition", record.composition], ["HFRP / NFPA", record.hfrp], ["Risk level", record.risk], ["Location", record.location]])}${record.sdsLink && /^https?:\/\//i.test(record.sdsLink) ? `<a class="link-button" href="${escapeHtml(record.sdsLink)}" target="_blank" rel="noreferrer">Open SDS</a>` : `<p>No web SDS link is available in the data feed.</p>`}</section></div></article>`;
    document.body.appendChild(panel);
    panel.querySelector(".close")?.focus();
    panel.querySelector(".close")?.addEventListener("click", () => panel.remove());
    panel.addEventListener("click", (event) => { if (event.target === panel) panel.remove(); });
    document.addEventListener("keydown", function escapeHandler(event) { if (event.key === "Escape") { panel.remove(); document.removeEventListener("keydown", escapeHandler); } });
  }
  function definitionList(items) { return `<dl>${items.map(([label, value]) => `<div class="kv"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value || "Not listed")}</dd></div>`).join("")}</dl>`; }
  function lastLoadedText() { if (!state.loadedAt) return "not loaded"; return state.loadedAt.toLocaleString([], { dateStyle: "short", timeStyle: "short" }); }
  function escapeHtml(value) { return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"); }
})();
