(() => {
  "use strict";

  const config = window.SOJO_LOOKUP_CONFIG || {};
  const app = document.getElementById("app");
  const SOJO_LOGO_SRC = "data:image/webp;base64,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";

  const FIELD_MAP = {
    name: ["product name", "chemical / product name", "chemical product name", "chemical name", "product", "name"],
    company: ["company name", "company", "manufacturer", "supplier"],
    productCode: ["product code", "code", "item #", "item number"],
    use: ["use", "intended use", "category", "classification"],
    sdsNumber: ["sds #", "sds number", "sds no", "sds", "sds reference number"],
    version: ["version #", "version", "sds version"],
    issueDate: ["issue date", "date issued"],
    revisionDate: ["revision date", "revised date", "date revised", "sds revision date/issue date", "sds revision date"],
    supersedesDate: ["supersedes date", "supersedes"],
    storageLocation: ["storage location", "storage", "stored location", "chemical storage location"],
    sdsAvailable: ["sds available (yes/no)", "sds available", "sds on file"],
    approvedBy: ["approved by", "reviewed by"],
    lastReviewDate: ["last review date", "review date", "last reviewed"],
    composition: ["hazmat chemical composition", "composition", "active ingredient", "chemical composition"],
    hfrp: ["hfrp info", "hfrp", "nfpa", "nfpa info"],
    sdsLink: ["external link to sds", "sds link", "sds url", "external link", "link"]
  };

  let state = {
    records: [],
    query: "",
    sourceStatus: "Choose a location to load its SDS data feed.",
    sourceLabel: "CSV data feed",
    loadedAt: null,
    sourceUpdatedAt: null,
    selectedLocation: null
  };
  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    const locationFromUrl = getLocationFromUrl();
    if (locationFromUrl) {
      await selectLocation(locationFromUrl, false);
    } else {
      renderLocationSelect();
    }
  }

  async function loadLatestData() {
    const location = currentLocation();
    const path = location.csvSourcePath;
    try {
      if (!path) throw new Error(`Missing CSV path for ${location.name}`);
      const response = await fetch(withCacheBuster(path), { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      const rows = parseCsv(extractCsvText(text));
      const records = normalizeRows(rows);
      const lastModified = response.headers.get("last-modified");
      state.records = records;
      state.sourceLabel = path;
      state.sourceStatus = `Loaded ${records.length} records from ${location.name}.`;
      state.loadedAt = new Date();
      state.sourceUpdatedAt = lastModified ? new Date(lastModified) : null;
    } catch (error) {
      state.records = [];
      state.sourceLabel = path;
      state.sourceStatus = `The SDS data feed could not be loaded for ${location.name}. Check that Power Automate has created or updated ${path}.`;
      state.loadedAt = new Date();
      state.sourceUpdatedAt = null;
    }
  }

  function withCacheBuster(url) { return `${url}${url.includes("?") ? "&" : "?"}_=${Date.now()}`; }

  function locations() {
    const configured = Array.isArray(config.LOCATIONS) ? config.LOCATIONS : [];
    return configured.filter((location) => location && location.slug && location.name && location.csvSourcePath);
  }

  function currentLocation() {
    return state.selectedLocation || locations()[0] || { name: "No Location", slug: "none", csvSourcePath: "" };
  }

  function getLocationFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("location") || params.get("site");
    if (!slug) return null;
    return locations().find((location) => location.slug === slug) || null;
  }

  async function selectLocation(location, updateUrl = true) {
    state.selectedLocation = location;
    state.query = "";
    state.records = [];
    state.loadedAt = null;
    state.sourceUpdatedAt = null;
    state.sourceStatus = `Loading latest SDS list for ${location.name}...`;
    if (updateUrl) {
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set("location", location.slug);
      window.history.replaceState({}, "", nextUrl);
    }
    renderLoading();
    await loadLatestData();
    renderLookupApp();
  }

  function clearLocation() {
    state.selectedLocation = null;
    state.records = [];
    state.query = "";
    state.loadedAt = null;
    state.sourceUpdatedAt = null;
    state.sourceStatus = "Choose a location to load its SDS data feed.";
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.delete("location");
    nextUrl.searchParams.delete("site");
    window.history.replaceState({}, "", nextUrl);
    renderLocationSelect();
  }

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

  function extractCsvText(text) {
    const trimmed = String(text || "").trim();
    if (!trimmed.startsWith("{")) return text;
    try {
      const wrapped = JSON.parse(trimmed);
      return typeof wrapped.body === "string" ? wrapped.body : text;
    } catch (error) {
      return text;
    }
  }

  function normalizeRows(rows) {
    if (!Array.isArray(rows) || rows.length < 2) return [];
    const headerIndex = rows.findIndex((row) => row.some((cell) => normalizeHeader(cell) === "product name"));
    const rawHeaders = headerIndex >= 0 ? rows[headerIndex] : rows[0];
    const headers = rawHeaders.map(normalizeHeader);
    const dataRows = rows.slice((headerIndex >= 0 ? headerIndex : 0) + 1);
    return dataRows.map((row, index) => normalizeRecord(row, headers, rawHeaders, index)).filter((record) => record.name);
  }

  function normalizeRecord(row, headers, rawHeaders, index) {
    const getIndex = (field) => {
      const aliases = FIELD_MAP[field] || [];
      return headers.findIndex((header) => aliases.includes(header));
    };
    const get = (field) => {
      const headerIndex = getIndex(field);
      return clean(headerIndex >= 0 ? row[headerIndex] : "");
    };
    const sdsLinkIndex = getIndex("sdsLink");
    const extraFields = headers.map((header, headerIndex) => {
      const value = clean(row[headerIndex]);
      if (!value || headerIndex === sdsLinkIndex) return null;
      return [clean(rawHeaders[headerIndex]) || titleCase(header), value];
    }).filter(Boolean);
    const displayFields = extraFields;
    const name = get("name"); const company = get("company"); const productCode = get("productCode"); const hfrp = get("hfrp"); const sdsLink = normalizeLink(get("sdsLink")); const location = currentLocation().name; const use = get("use"); const composition = get("composition"); const sdsNumber = get("sdsNumber"); const storageLocation = get("storageLocation"); const sdsAvailable = get("sdsAvailable"); const approvedBy = get("approvedBy"); const lastReviewDate = formatExcelDate(get("lastReviewDate"));
    return { id: slug([name, company, productCode, location, index].filter(Boolean).join("-")), name, company, productCode, use, sdsNumber, version: get("version"), issueDate: formatExcelDate(get("issueDate")), revisionDate: formatExcelDate(get("revisionDate")), supersedesDate: formatExcelDate(get("supersedesDate")), storageLocation, sdsAvailable, approvedBy, lastReviewDate, composition, hfrp, sdsLink, location, extraFields, displayFields, searchable: [name, company, productCode, use, sdsNumber, storageLocation, sdsAvailable, approvedBy, lastReviewDate, composition, hfrp, sdsLink, location, ...displayFields.flat()].join(" ").toLowerCase() };
  }

  function clean(value) { const text = String(value ?? "").replace(/\s+/g, " ").trim(); return text && text.toLowerCase() !== "undefined" ? text : ""; }
  function normalizeHeader(value) { return clean(value).toLowerCase().replace(/\s+/g, " "); }
  function titleCase(value) { return clean(value).replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1)); }
  function normalizeLink(value) { const text = clean(value); if (!text || text.toLowerCase() === "n/a") return ""; return text; }
  function slug(value) { return String(value || "record").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120) || `record-${Date.now()}`; }
  function formatExcelDate(value) { const text = clean(value); if (!text || text.toLowerCase() === "n/a") return ""; const num = Number(text); if (Number.isFinite(num) && num > 20000 && num < 70000) { const date = new Date(Date.UTC(1899, 11, 30) + num * 86400000); return date.toISOString().slice(0, 10); } return text; }
  function filteredRecords() { const q = state.query.trim().toLowerCase(); const source = state.records.slice().sort((a, b) => a.name.localeCompare(b.name)); if (!q) return source; return source.filter((record) => record.searchable.includes(q)); }

  function renderLocationSelect() {
    app.innerHTML = `
      <main class="location-screen">
        <section class="location-modal" role="dialog" aria-modal="true" aria-labelledby="locationTitle">
          <img class="location-logo" src="${SOJO_LOGO_SRC}" alt="Sojo logo" draggable="false" />
          <p class="eyebrow">${escapeHtml(config.COMPANY_NAME || "Sojo Industries")}</p>
          <h1 id="locationTitle">SDS Lookup</h1>
          <p>Choose a location.</p>
          <div class="location-grid">
            ${locations().map(locationCardTemplate).join("")}
          </div>
          <button id="requestChemicalStart" class="button button-primary location-request-button" type="button">Request New Chemical</button>
        </section>
      </main>`;
    bindLocationEvents();
  }

  function locationCardTemplate(location) {
    return `<button class="location-card" type="button" data-location-slug="${escapeHtml(location.slug)}"><span>${escapeHtml(location.name)}</span></button>`;
  }

  function bindLocationEvents() {
    document.getElementById("requestChemicalStart")?.addEventListener("click", showChemicalRequestForm);
    document.querySelectorAll("[data-location-slug]").forEach((button) => {
      button.addEventListener("click", () => {
        const location = locations().find((item) => item.slug === button.dataset.locationSlug);
        if (location) selectLocation(location);
      });
    });
  }

  function renderLoading() {
    app.innerHTML = `<section class="loading-card"><p class="eyebrow">${escapeHtml(config.COMPANY_NAME || "Sojo Industries")}</p><h1>Loading latest SDS list...</h1><p>${escapeHtml(state.sourceStatus)}</p></section>`;
  }

  function renderLookupApp() {
    const records = filteredRecords();
    const location = currentLocation();
    app.innerHTML = `
      <header class="topbar"><div class="topbar-inner"><div class="brand"><img class="brand-logo" src="${SOJO_LOGO_SRC}" alt="Sojo logo" draggable="false" /><div><p class="brand-title">${escapeHtml(config.APP_TITLE || "SDS Lookup")}</p><p class="brand-subtitle">${escapeHtml(location.name)}</p></div></div><div class="topbar-actions"><span class="status-pill">${escapeHtml(state.sourceStatus)}</span><button id="requestChemical" class="button button-secondary" type="button">Request New Chemical</button><button id="changeLocation" class="button button-secondary" type="button">Switch Location</button></div></div></header>
      <section class="hero"><div class="hero-inner"><div class="hero-copy"><p class="eyebrow">SDS Safety Reference</p><h1>Search SDS Records.</h1><p>Fast lookup for SDS links, product details, spreadsheet fields, and current chemical records for ${escapeHtml(location.name)}.</p><div class="hero-badges"><span class="hero-badge">${state.records.length} records</span></div></div><div class="hero-logo-card"><img class="hero-logo" src="${SOJO_LOGO_SRC}" alt="Sojo logo" draggable="false" /></div></div></section>
      <main class="main"><section class="search-shell"><div class="search-panel"><div class="controls"><input id="searchInput" class="search-input" value="${escapeHtml(state.query)}" placeholder="Search cleaner, bleach, company, product code, composition..." autofocus /><button id="searchButton" class="button button-primary" type="button">Search</button></div></div><div class="library-head"><p class="section-kicker">Safety Library</p><h2>Chemical Records</h2></div><div class="meta-row"><span>${records.length} result${records.length === 1 ? "" : "s"} shown</span><span>Showing ${escapeHtml(location.name)} - Updated ${escapeHtml(lastLoadedText())}</span></div><div id="cards" class="cards">${records.length ? records.map(recordCardTemplate).join("") : `<div class="empty">No matching records found.</div>`}</div></section></main>
      <footer class="footer">Internal quick-reference only. Always confirm handling, storage, disposal, and emergency procedures against the official current SDS and product label.</footer>`;
    bindEvents();
  }

  function hasWebSds(record) { return /^https?:\/\//i.test(record.sdsLink || ""); }
  function recordCardTemplate(record) { return `<button class="card" type="button" data-record-id="${escapeHtml(record.id)}"><h3>${escapeHtml(record.name)}</h3><p>${escapeHtml([record.company, record.productCode ? `Code ${record.productCode}` : "", record.use].filter(Boolean).join(" - "))}</p><p><strong>Storage:</strong> ${escapeHtml(record.storageLocation || "Not listed")}</p><p><strong>Review:</strong> ${escapeHtml(record.lastReviewDate || record.revisionDate || "Not listed")}</p><div class="badges">${hasWebSds(record) ? `<span class="badge badge-linked">SDS linked</span>` : `<span class="badge badge-warning">SDS link missing</span>`}</div></button>`; }

  function bindEvents() {
    document.getElementById("changeLocation")?.addEventListener("click", clearLocation);
    document.getElementById("requestChemical")?.addEventListener("click", showChemicalRequestForm);
    document.getElementById("searchInput")?.addEventListener("input", (event) => { state.query = event.target.value; applyFilters(); });
    document.getElementById("searchButton")?.addEventListener("click", applyFilters);
    document.getElementById("cards")?.addEventListener("click", (event) => { const card = event.target.closest("[data-record-id]"); if (!card) return; const record = state.records.find((item) => item.id === card.dataset.recordId); if (record) showDetail(record); });
  }

  function applyFilters() {
    const q = document.getElementById("searchInput")?.value || "";
    state.query = q; let records = state.records.slice();
    if (q.trim()) records = records.filter((record) => record.searchable.includes(q.trim().toLowerCase()));
    records.sort((a, b) => a.name.localeCompare(b.name));
    const meta = document.querySelector(".meta-row span"); const cards = document.getElementById("cards");
    if (meta) meta.textContent = `${records.length} result${records.length === 1 ? "" : "s"} shown`;
    if (cards) cards.innerHTML = records.length ? records.map(recordCardTemplate).join("") : `<div class="empty">No matching records found.</div>`;
  }

  function showDetail(record) {
    const panel = document.createElement("div"); panel.className = "detail-backdrop";
    panel.innerHTML = `<article class="detail" role="dialog" aria-modal="true"><header class="detail-header"><div><p class="eyebrow">SDS record</p><h2>${escapeHtml(record.name)}</h2><p>${escapeHtml([record.company, record.productCode ? `Code ${record.productCode}` : "", record.use].filter(Boolean).join(" - "))}</p></div><div class="detail-actions"><button class="print-record" type="button">Print</button><button class="close" type="button" aria-label="Close">Close</button></div></header><div class="detail-body"><section class="info-block"><h3>Spreadsheet Fields</h3>${definitionList(record.displayFields)}</section><section class="info-block"><h3>SDS Link</h3>${record.sdsLink && /^https?:\/\//i.test(record.sdsLink) ? `<a class="link-button" href="${escapeHtml(record.sdsLink)}" target="_blank" rel="noreferrer">Open SDS</a>` : `<p>No web SDS link is available in the data feed.</p>`}</section></div></article>`;
    document.body.appendChild(panel); const closeButton = panel.querySelector(".close"); const printButton = panel.querySelector(".print-record"); closeButton?.focus(); printButton?.addEventListener("click", () => window.print()); closeButton?.addEventListener("click", () => panel.remove()); panel.addEventListener("click", (event) => { if (event.target === panel) panel.remove(); }); document.addEventListener("keydown", function escapeHandler(event) { if (event.key === "Escape") { panel.remove(); document.removeEventListener("keydown", escapeHandler); } });
  }

  function showChemicalRequestForm() {
    const panel = document.createElement("div"); panel.className = "detail-backdrop";
    const selectedSlug = state.selectedLocation?.slug || "";
    const placeholderOption = selectedSlug ? "" : `<option value="" selected>Select a location</option>`;
    const locationOptions = placeholderOption + locations().map((location) => `<option value="${escapeHtml(location.name)}"${location.slug === selectedSlug ? " selected" : ""}>${escapeHtml(location.name)}</option>`).join("");
    panel.innerHTML = `
      <article class="detail request-modal" role="dialog" aria-modal="true" aria-labelledby="requestTitle">
        <header class="detail-header">
          <div><p class="eyebrow">New chemical request</p><h2 id="requestTitle">Request SDS Addition</h2></div>
          <div class="detail-actions"><button class="close" type="button" aria-label="Close">Close</button></div>
        </header>
        <form class="request-form">
          <label><span>Location</span><select name="location" required>${locationOptions}</select></label>
          <label><span>Product</span><input name="product" type="text" required placeholder="Product or chemical name" /></label>
          <label><span>Reason</span><textarea name="reason" required placeholder="Why is this product needed?"></textarea></label>
          <label><span>Requester</span><input name="requester" type="text" required placeholder="Your name" /></label>
          <label><span>Notes</span><textarea name="notes" placeholder="Optional details"></textarea></label>
          <p class="request-status" role="status"></p>
          <div class="request-actions"><button class="button button-primary" type="submit">Submit Request</button></div>
        </form>
      </article>`;
    document.body.appendChild(panel);
    const form = panel.querySelector(".request-form");
    const closeButton = panel.querySelector(".close");
    const status = panel.querySelector(".request-status");
    form?.querySelector("input")?.focus();
    form?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submitButton = form.querySelector("button[type='submit']");
      const data = Object.fromEntries(new FormData(form).entries());
      status.textContent = "Sending request...";
      submitButton.disabled = true;
      try {
        const response = await fetch(config.NEW_CHEMICAL_REQUEST_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        status.textContent = "Request sent. The SDS owner will receive it in Teams.";
        form.reset();
      } catch (error) {
        status.textContent = "Request could not be sent. Check the Power Automate trigger permissions and try again.";
      } finally {
        submitButton.disabled = false;
      }
    });
    closeButton?.addEventListener("click", () => panel.remove());
    panel.addEventListener("click", (event) => { if (event.target === panel) panel.remove(); });
    document.addEventListener("keydown", function escapeHandler(event) { if (event.key === "Escape") { panel.remove(); document.removeEventListener("keydown", escapeHandler); } });
  }

  function definitionList(items) { const rows = items.filter(([, value]) => clean(value)); return rows.length ? `<dl>${rows.map(([label, value]) => `<div class="kv"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}</dl>` : `<p>No additional spreadsheet fields are listed for this record.</p>`; }
  function lastLoadedText() { const date = state.sourceUpdatedAt || state.loadedAt; if (!date) return "not loaded"; return date.toLocaleString([], { dateStyle: "short", timeStyle: "short" }); }
  function escapeHtml(value) { return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;"); }
})();
