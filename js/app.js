/* Moteur de l'app : SQL (sql.js / SQLite), correction auto, navigation, progression. */
const CDN = window.SQLJS_BASE || "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/";
let SQL = null;
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const store = {
  get() { try { return JSON.parse(localStorage.getItem("bd70") || "{}"); } catch { return {}; } },
  set(k, v) { try { const s = store.get(); s[k] = v; localStorage.setItem("bd70", JSON.stringify(s)); } catch {} }
};

/* ---------- SQL ---------- */
function adapt(sql) {
  const notes = [];
  let s = sql.replace(/^\s*#/gm, "--");
  if (/\bDELIMITER\b|CREATE\s+(PROCEDURE|FUNCTION|EVENT)/i.test(s))
    notes.push("Procédures, fonctions, événements et DELIMITER sont du MySQL : ils ne s'exécutent pas ici (SQLite). Compare avec le corrigé.");
  const skip = m => { notes.push("« " + m.trim() + " » ignoré (une seule base ici)."); return ""; };
  s = s.replace(/\b(CREATE|DROP)\s+DATABASE\b[^;]*(;|$)/gim, skip)
       .replace(/(?<=^|;)\s*USE\s+`?\w+`?\s*(;|$)/gim, skip);
  s = s.replace(/\bAUTO_INCREMENT\b/gi, "").replace(/\bUNSIGNED\b/gi, "")
       .replace(/\)\s*ENGINE\s*=\s*\w+[^;]*/gi, ")").replace(/\bENUM\s*\([^)]*\)/gi, "TEXT");
  return { sql: s, notes };
}
function makeDB(key, setup) {
  const db = new SQL.Database();
  const d = v => (v == null ? null : String(v));
  db.create_function("YEAR", v => d(v) ? parseInt(d(v).slice(0, 4)) : null);
  db.create_function("MONTH", v => d(v) ? parseInt(d(v).slice(5, 7)) : null);
  db.create_function("DAY", v => d(v) ? parseInt(d(v).slice(8, 10)) : null);
  db.create_function("NOW", () => new Date().toISOString().slice(0, 19).replace("T", " "));
  db.create_function("CURDATE", () => new Date().toISOString().slice(0, 10));
  db.create_function("DATEDIFF", (a, b) => Math.round((new Date(a) - new Date(b)) / 864e5));
  db.create_function("PASSWORD", v => "*" + [...String(v)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7).toString(16).toUpperCase());
  db.run("PRAGMA foreign_keys = ON;");
  if (DBS[key].sql) db.exec(DBS[key].sql);
  if (setup) { db.run("PRAGMA foreign_keys = OFF;"); db.exec(setup); db.run("PRAGMA foreign_keys = ON;"); }
  return db;
}
function run(db, sql) { const a = adapt(sql); const res = a.sql.trim() ? db.exec(a.sql) : []; return { res, notes: a.notes }; }
const last = res => res.length ? res[res.length - 1] : { columns: [], values: [] };
function norm(v) {
  if (v === null || v === undefined) return "∅";
  if (typeof v === "number" || (/^-?\d+(\.\d+)?$/.test(String(v).trim()))) return String(Math.round(Number(v) * 100) / 100);
  return String(v).trim().toLowerCase();
}
function frErr(m) {
  const R = [
    [/no such table: (\S+)/, (_, t) => `La table « ${t} » n'existe pas. Vérifie son nom avec « Voir les tables ».`],
    [/no such column: (\S+)/, (_, c) => `La colonne « ${c} » n'existe pas (faute de frappe ? mauvaise table ? texte sans apostrophes ?).`],
    [/ambiguous column name: (\S+)/, (_, c) => `La colonne « ${c} » existe dans plusieurs tables : préfixe-la (ex. p.${c.split(".").pop()}).`],
    [/near "(.*?)": syntax error/, (_, w) => `Erreur de syntaxe près de « ${w} » (mot-clé mal écrit, virgule ou parenthèse en trop/manquante ?).`],
    [/incomplete input/, () => "Requête incomplète (parenthèse ou apostrophe non fermée ?)."],
    [/misuse of aggregate/, () => "Agrégat (COUNT, SUM…) utilisé au mauvais endroit : une condition sur un agrégat va dans HAVING, pas dans WHERE."],
    [/FOREIGN KEY constraint failed/, () => "Contrainte de clé étrangère violée : la valeur référencée n'existe pas, ou d'autres lignes y font référence."],
    [/NOT NULL constraint failed: (\S+)/, (_, c) => `Contrainte NOT NULL violée : « ${c} » doit avoir une valeur.`],
    [/UNIQUE constraint failed: (\S+)/, (_, c) => `Doublon interdit sur « ${c} » (clé primaire ou UNIQUE).`],
    [/CHECK constraint failed/, () => "Contrainte CHECK violée : la valeur ne respecte pas la condition."],
    [/table (\S+) already exists/, (_, t) => `La table « ${t} » existe déjà.`],
    [/no such function: (\S+)/, (_, f) => `Fonction « ${f} » inconnue ici (pas disponible dans cet entraînement SQLite).`]
  ];
  for (const [re, f] of R) { const x = m.match(re); if (x) return f(...x) + ` <span class="muted">(${esc(m)})</span>`; }
  return esc(m);
}
function sameRows(a, b, ordered) {
  if (!a.columns.length && b.values.length) return `Ta requête ne renvoie aucune ligne, on en attend ${b.values.length}.`;
  if (a.columns.length !== b.columns.length) return `Tu renvoies ${a.columns.length} colonne(s), on en attend ${b.columns.length}.`;
  if (a.values.length !== b.values.length) return `Tu renvoies ${a.values.length} ligne(s), on en attend ${b.values.length}.`;
  let A = a.values.map(r => r.map(norm).join("|")), B = b.values.map(r => r.map(norm).join("|"));
  if (!ordered) { A.sort(); B.sort(); }
  for (let i = 0; i < A.length; i++) if (A[i] !== B[i]) return ordered && [...A].sort().join() === [...B].sort().join() ? "Bonnes lignes mais pas dans le bon ordre (ORDER BY ?)." : "Le contenu des lignes ne correspond pas.";
  return null;
}
function schemaOf(db, t) {
  const cols = db.exec(`SELECT name, pk FROM pragma_table_info('${t}')`);
  if (!cols.length) return null;
  const c = cols[0].values;
  const pkOf = tb => { const r = db.exec(`SELECT name FROM pragma_table_info('${tb}') WHERE pk>0`); return r.length ? r[0].values[0][0] : "?"; };
  const fk = db.exec(`SELECT "from","table","to" FROM pragma_foreign_key_list('${t}')`);
  return { cols: c.map(r => r[0].toLowerCase()).sort(), pk: c.filter(r => r[1] > 0).map(r => r[0].toLowerCase()).sort(),
    fk: (fk.length ? fk[0].values : []).map(([f, tb, to]) => `${f} → ${tb}(${to || pkOf(tb)})`.toLowerCase()).sort() };
}
function check(ex, code) {
  const udb = makeDB(ex.db, ex.setup), sdb = makeDB(ex.db, ex.setup);
  try {
    const u = run(udb, code); run(sdb, ex.sol);
    if (ex.type === "select") return { err: sameRows(last(u.res), last(sdb.exec(ex.sol)), ex.ordered), notes: u.notes };
    if (ex.type === "dml") return { err: sameRows(last(udb.exec(ex.check)), last(sdb.exec(ex.check)), true), notes: u.notes };
    const errs = [];
    for (const t of ex.tables) {
      const U = schemaOf(udb, t), S = schemaOf(sdb, t);
      if (!U) { errs.push(`Table ${t} introuvable.`); continue; }
      S.cols.filter(c => !U.cols.includes(c)).forEach(c => errs.push(`${t} : colonne manquante « ${c} »`));
      U.cols.filter(c => !S.cols.includes(c)).forEach(c => errs.push(`${t} : colonne en trop « ${c} »`));
      if (U.pk.join() !== S.pk.join()) errs.push(`${t} : clé primaire attendue (${S.pk.join(", ")}), trouvée (${U.pk.join(", ") || "aucune"})`);
      S.fk.filter(f => !U.fk.includes(f)).forEach(f => errs.push(`${t} : clé étrangère manquante ${f}`));
    }
    return { err: errs.length ? errs.join("<br>") : null, notes: u.notes };
  } catch (e) { return { err: "Erreur SQL : " + frErr(e.message) }; }
  finally { udb.close(); sdb.close(); }
}
function table(r) {
  if (!r || !r.columns.length) return "<p class='muted'>Requête exécutée (aucun résultat à afficher).</p>";
  return `<div class="tw"><table class="res"><tr>${r.columns.map(c => `<th>${esc(c)}</th>`).join("")}</tr>${r.values.slice(0, 200).map(row => `<tr>${row.map(v => `<td>${v === null ? "<i>NULL</i>" : esc(v)}</td>`).join("")}</tr>`).join("")}</table></div><p class="muted">${r.values.length} ligne(s)</p>`;
}
function schemaHTML(key) {
  const db = makeDB(key); const ts = db.exec("SELECT name FROM sqlite_master WHERE type='table' ORDER BY rowid");
  const html = (ts.length ? ts[0].values : []).map(([t]) => {
    const s = schemaOf(db, t); const fks = s.fk.map(f => f.split(" → ")[0]);
    return `<div class="tbl"><b>${t}</b>(${db.exec(`SELECT name, pk FROM pragma_table_info('${t}')`)[0].values.map(([c, pk]) => pk ? `<u>${c}</u>` : fks.includes(c.toLowerCase()) ? `#${c}` : c).join(", ")})</div>`;
  }).join("") || "<p class='muted'>Base vide.</p>";
  db.close(); return html;
}

/* ---------- Composant exercice ---------- */
function exoCard(ex, n) {
  const st = store.get(); const done = st["ok_" + ex.id];
  const el = document.createElement("div"); el.className = "card exo" + (done ? " done" : "");
  el.innerHTML = `<div class="qhead"><span class="num">${n}</span><div class="q">${ex.q}</div>${done ? "<span class='badge'>✓ réussi</span>" : ""}</div>
  <textarea spellcheck="false" placeholder="Écris ta requête ici… (Ctrl+Entrée pour exécuter)">${esc(st["code_" + ex.id] || "")}</textarea>
  <div class="btns"><button class="run">▶ Exécuter</button><button class="chk primary">✔ Vérifier</button><button class="hint">💡 Indice</button><button class="sol">Solution</button><button class="sch">Voir les tables</button></div>
  <div class="out"></div>`;
  const ta = $("textarea", el), out = $(".out", el);
  ta.addEventListener("input", () => store.set("code_" + ex.id, ta.value));
  ta.addEventListener("keydown", e => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); $(".run", el).click(); }
    if (e.key === "Tab") { e.preventDefault(); const p = ta.selectionStart; ta.value = ta.value.slice(0, p) + "  " + ta.value.slice(ta.selectionEnd); ta.selectionStart = ta.selectionEnd = p + 2; }
  });
  $(".run", el).onclick = () => {
    const db = makeDB(ex.db, ex.setup);
    try { const r = run(db, ta.value); out.innerHTML = r.notes.map(x => `<p class="note">${esc(x)}</p>`).join("") + (ex.type === "select" ? table(last(r.res)) : ex.type === "dml" ? "<p class='muted'>État de la table après ta requête :</p>" + table(last(db.exec(ex.check))) : "<p class='muted'>Exécuté. Clique sur Vérifier.</p>"); }
    catch (e) { out.innerHTML = `<p class="ko">Erreur SQL : ${frErr(e.message)}</p><p class="muted">Vérifie l'orthographe des tables/colonnes (« Voir les tables »), les virgules et les apostrophes.</p>`; }
    db.close();
  };
  $(".chk", el).onclick = () => {
    if (!ta.value.trim()) { out.innerHTML = "<p class='ko'>Écris d'abord une requête.</p>"; return; }
    const r = check(ex, ta.value);
    const notes = (r.notes || []).map(x => `<p class="note">${esc(x)}</p>`).join("");
    if (!r.err) { store.set("ok_" + ex.id, 1); el.classList.add("done"); out.innerHTML = notes + `<p class="ok">✅ Bravo, c'est juste !</p><div class="expl">${ex.expl}</div><details><summary>Solution de référence</summary><pre>${esc(ex.sol)}</pre></details>`; refreshProgress(); }
    else { out.innerHTML = notes + `<p class="ko">❌ ${r.err}</p>` + (ex.type === "select" ? `<details><summary>Voir le résultat attendu</summary>${(() => { const d = makeDB(ex.db, ex.setup); const h = table(last(d.exec(ex.sol))); d.close(); return h; })()}</details>` : ""); }
  };
  $(".hint", el).onclick = () => out.innerHTML = `<p class="note">💡 ${ex.hint}</p>`;
  $(".sol", el).onclick = () => out.innerHTML = `<pre>${esc(ex.sol)}</pre><div class="expl">${ex.expl}</div>`;
  $(".sch", el).onclick = () => out.innerHTML = `<div class="schema">${schemaHTML(ex.db)}</div><p class="muted"><u>souligné</u> = clé primaire, # = clé étrangère</p>`;
  return el;
}
const exo = id => EXOS.find(e => e.id === id);

/* ---------- Pages ---------- */
function progress() { const st = store.get(); const p = EXOS.filter(e => e.lvl !== "S"); return [p.filter(e => st["ok_" + e.id]).length, p.length]; }
function refreshProgress() { const [a, b] = progress(); const el = $("#prog"); if (el) el.textContent = `${a}/${b} exercices SQL réussis`; }
const PAGES = {
  accueil() {
    const [a, b] = progress();
    return `<h1>Révisions BD70 — examen final</h1>
<div class="card"><h3>Ce qui t'attend (d'après l'annale A23 et le message du prof : « programme similaire, même durée »)</h3>
<table class="mini"><tr><th>Exercice</th><th>Thème</th><th>Points</th><th>Où s'entraîner ici</th></tr>
<tr><td>1</td><td>Modélisation : schéma entité-association (Chen/MCD/UML)</td><td>7</td><td><a href="#conception">Conception</a></td></tr>
<tr><td>2</td><td>Requêtes SQL sur une base donnée (Soccer) + un CREATE TABLE</td><td>7</td><td><a href="#parcours">Parcours SQL</a></td></tr>
<tr><td>3</td><td>Normalisation, optimisation (index, partitions), procédure/trigger/événement</td><td>6</td><td><a href="#theorie">Théorie</a></td></tr></table>
<p>Durée 1h30, seul document : <b>une feuille A4 recto-verso manuscrite</b> → <a href="#a4">modèle à recopier</a>.</p></div>
<div class="card"><h3>Plan conseillé (tu pars de peu de bases)</h3><ol>
<li><a href="#parcours">Parcours SQL</a> niveaux 1 → 11, dans l'ordre (≈ 72 exercices auto-corrigés). Lis la mini-leçon, essaie, utilise l'indice, puis Vérifier.</li>
<li><a href="#conception">Conception</a> : méthode + exercices de cardinalités.</li>
<li><a href="#theorie">Théorie</a> : 33 QCM expliqués pour l'exercice 3.</li>
<li><a href="#sujets">Sujets blancs</a> : l'annale A23 puis 3 sujets inédits du même format, chrono 1h30.</li></ol>
<p id="prog" class="big">${a}/${b} exercices SQL réussis</p>
<div class="btns">${(() => { const st = store.get(); const nx = EXOS.find(e => e.lvl !== "S" && !st["ok_" + e.id]); return nx ? `<a class="btn primary" href="#niveau/${nx.lvl}">▶ Reprendre : ${LEVELS.find(l => l.id === nx.lvl).titre}</a>` : `<a class="btn primary" href="#sujets">Parcours terminé 🎉 → sujets blancs</a>`; })()}
<button onclick="if(confirm('Effacer toute ta progression, tes requêtes et tes réponses enregistrées ?')){try{localStorage.removeItem('bd70')}catch{}route()}">Remettre à zéro</button></div></div>`;
  },
  parcours() {
    const st = store.get();
    return `<h1>Parcours SQL</h1><p>Chaque exercice repart d'une base neuve : aucun risque de tout casser. La correction compare <b>ton résultat</b> au résultat attendu (le nom des colonnes ne compte pas).</p>
<div class="grid">${LEVELS.map(l => { const ex = EXOS.filter(e => e.lvl === l.id); const ok = ex.filter(e => st["ok_" + e.id]).length;
      return `<a class="card lvl" href="#niveau/${l.id}"><b>${l.titre}</b><span>${ok}/${ex.length}</span><div class="bar"><i style="width:${100 * ok / ex.length}%"></i></div></a>`; }).join("")}</div>`;
  },
  niveau(id) {
    const l = LEVELS.find(x => x.id === id); const i = LEVELS.indexOf(l);
    setTimeout(() => { const box = $("#exos"); EXOS.filter(e => e.lvl === id).forEach((e, k) => box.appendChild(exoCard(e, k + 1))); });
    return `<p><a href="#parcours">← Parcours</a></p><h1>${l.titre}</h1><div class="card lecon">${l.lecon}</div><div id="exos"></div>
<p class="nav">${i > 0 ? `<a href="#niveau/${LEVELS[i - 1].id}">← Niveau précédent</a>` : ""} ${i < LEVELS.length - 1 ? `<a href="#niveau/${LEVELS[i + 1].id}">Niveau suivant →</a>` : `<a href="#sujets">Passer aux sujets blancs →</a>`}</p>`;
  },
  conception() {
    return `<h1>Conception (exercice 1, 7 pts)</h1><div class="card lecon">${CONCEPTION_METHODE}</div>
<h2>Entraînement : quelle cardinalité ?</h2>${qcmList(CARDI.map(c => ({ id: c.id, q: c.q, o: c.o, a: c.a, e: c.t })))}
<div class="card"><p>Pour t'entraîner à <b>dessiner</b> un schéma complet : fais l'exercice 1 de chaque <a href="#sujets">sujet blanc</a> sur papier, puis compare au corrigé et coche les points obtenus. Revois aussi les diagrammes du dossier « Exercice de conception » (TD7).</p></div>`;
  },
  theorie() {
    const ths = [...new Set(QCM.map(q => q.th))];
    return `<h1>Théorie (exercice 3, 6 pts)</h1><p>Clique une réponse : l'explication s'affiche. Ces notions tombent dans l'exercice 3 (normalisation, optimisation, automatisation).</p>` + ths.map(t => `<h2>${t}</h2>` + qcmList(QCM.filter(q => q.th === t))).join("");
  },
  sujets() {
    return `<h1>Sujets blancs</h1><p>Même format que l'annale A23. Fais-les en conditions réelles : chrono 1h30, ta feuille A4, puis correction.</p>` +
      SUJETS.map(s => `<a class="card lvl" href="#sujet/${s.id}"><b>${s.titre}</b></a>`).join("");
  },
  sujet(id) {
    const s = SUJETS.find(x => x.id === id);
    setTimeout(() => { const box = $("#ex2"); s.ex2.exos.forEach((e, k) => box.appendChild(exoCard(exo(e), k + 1))); startTimer(); });
    const pts = (key, list) => `<div class="pts">${list.map((p, k) => `<label><input type="checkbox" data-k="${key}_${k}" ${store.get()["pt_" + key + "_" + k] ? "checked" : ""}> ${p}</label>`).join("")}</div>`;
    return `<p><a href="#sujets">← Sujets</a></p><h1>${s.titre}</h1>
<div class="timer card"><span id="clock">1:30:00</span> <button id="tgo">Démarrer</button> <button id="treset">Remettre à 1h30</button></div>${s.intro}
<h2>Exercice 1 — Modélisation (${s.ex1.bareme} pts)</h2><div class="card">${s.ex1.enonce}<p class="muted">Fais-le sur papier, puis :</p>
<details><summary>Voir le corrigé</summary>${s.ex1.corrige}<h4>Auto-évaluation</h4>${pts(s.id + "e1", s.ex1.points)}</details></div>
<h2>Exercice 2 — SQL (${s.ex2.bareme} pts)</h2><div class="card">${s.ex2.enonce}</div><div id="ex2"></div>
<h2>Exercice 3 — Optimisation, administration (${s.ex3.bareme} pts)</h2><div class="card">${s.ex3.enonce}</div>
${s.ex3.questions.map((q, k) => `<div class="card"><p><b>${q.q}</b></p><textarea class="free" data-k="${s.id}_q${k}" placeholder="Rédige ta réponse ici (enregistrée automatiquement)">${esc(store.get()["free_" + s.id + "_q" + k] || "")}</textarea><details><summary>Voir le corrigé</summary>${q.r}<h4>Auto-évaluation</h4>${pts(s.id + "q" + k, q.points)}</details></div>`).join("")}`;
  },
  bac() {
    setTimeout(() => {
      const sel = $("#bdb"), ta = $("#bsql"), out = $("#bout"), sc = $("#bsch"); let db;
      const reset = () => { if (db) db.close(); db = makeDB(sel.value); sc.innerHTML = schemaHTML(sel.value); out.innerHTML = `<p class="muted">${DBS[sel.value].desc}</p>`; };
      sel.onchange = reset; $("#breset").onclick = reset; reset();
      const go = () => { try { const r = run(db, ta.value); out.innerHTML = r.notes.map(x => `<p class="note">${esc(x)}</p>`).join("") + table(last(r.res)); } catch (e) { out.innerHTML = `<p class="ko">Erreur SQL : ${frErr(e.message)}</p>`; } };
      $("#brun").onclick = go; ta.onkeydown = e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); go(); } };
    });
    return `<h1>Bac à sable</h1><div class="card"><select id="bdb">${Object.keys(DBS).map(k => `<option value="${k}">${DBS[k].label}</option>`).join("")}</select>
<div class="schema" id="bsch"></div><textarea id="bsql" spellcheck="false" placeholder="SELECT * FROM …">SELECT * FROM player_mast LIMIT 5;</textarea>
<div class="btns"><button id="brun" class="primary">▶ Exécuter</button><button id="breset">Réinitialiser la base</button></div><div id="bout"></div></div>`;
  },
  a4() { return `<h1>Feuille A4 (modèle à recopier à la main)</h1><p><button onclick="print()">Imprimer</button></p>${A4}`; },
  couverture() { return `<h1>Couverture du programme</h1><p>Chaque thème de tes documents → où il est travaillé dans l'app.</p><div class="tw"><table class="mini"><tr><th>Thème</th><th>Sources (dossier BD70)</th><th>Dans l'app</th></tr>${COUVERTURE.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>
<p class="muted">Bases d'exercice : SQLite dans le navigateur, avec une couche de compatibilité MySQL (AUTO_INCREMENT, YEAR(), NOW()…). Les procédures/triggers/événements MySQL ne s'exécutent pas : ils sont travaillés via QCM et corrigés rédigés.</p>`; },
  sites() { return `<h1>Sites pour s'entraîner</h1>${SITES.map(s => `<div class="card"><a href="${s.u}" target="_blank" rel="noopener"><b>${s.n}</b></a><p>${s.d}</p></div>`).join("")}`; }
};
function qcmList(list) {
  setTimeout(() => document.querySelectorAll(".qcm:not([data-b])").forEach(el => {
    el.dataset.b = 1; const q = [...QCM, ...CARDI.map(c => ({ id: c.id, a: c.a, e: c.t }))].find(x => x.id === el.dataset.id);
    el.querySelectorAll("button").forEach((b, k) => b.onclick = () => {
      el.querySelectorAll("button").forEach((x, j) => { x.disabled = true; if (j === q.a) x.classList.add("good"); });
      if (k !== q.a) b.classList.add("bad"); else store.set("ok_" + q.id, 1);
      el.querySelector(".expl").innerHTML = (k === q.a ? "✅ " : "❌ ") + q.e; el.querySelector(".expl").hidden = false;
    });
  }));
  return list.map(q => `<div class="card qcm" data-id="${q.id}"><p>${q.q}</p><div class="opts">${q.o.map(o => `<button>${o}</button>`).join("")}</div><div class="expl" hidden></div></div>`).join("");
}
let timer = null, remain = 5400;
function startTimer() {
  const c = $("#clock"); const show = () => c.textContent = `${Math.floor(remain / 3600)}:${String(Math.floor(remain % 3600 / 60)).padStart(2, "0")}:${String(remain % 60).padStart(2, "0")}`; show();
  $("#tgo").onclick = e => { if (timer) { clearInterval(timer); timer = null; e.target.textContent = "Reprendre"; } else { timer = setInterval(() => { remain = Math.max(0, remain - 1); show(); if (!remain) { clearInterval(timer); timer = null; c.textContent = "Temps écoulé !"; } }, 1000); e.target.textContent = "Pause"; } };
  $("#treset").onclick = () => { clearInterval(timer); timer = null; remain = 5400; show(); $("#tgo").textContent = "Démarrer"; };
}
document.addEventListener("change", e => { if (e.target.dataset.k && e.target.type === "checkbox") store.set("pt_" + e.target.dataset.k, e.target.checked); });
document.addEventListener("input", e => { if (e.target.classList.contains("free")) store.set("free_" + e.target.dataset.k, e.target.value); });

function route() {
  const [p, arg] = (location.hash.slice(1) || "accueil").split("/");
  document.querySelectorAll("nav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + (p === "niveau" ? "parcours" : p === "sujet" ? "sujets" : p)));
  if (timer) { clearInterval(timer); timer = null; }
  $("#main").innerHTML = (PAGES[p] || PAGES.accueil)(arg); window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
/* file:// (double-clic) : on donne le wasm embarqué en base64, car fetch() de fichiers locaux est bloqué. */
const wasmOpt = window.SQL_WASM_B64 ? { wasmBinary: Uint8Array.from(atob(window.SQL_WASM_B64), c => c.charCodeAt(0)) } : {};
initSqlJs({ locateFile: f => CDN + f, ...wasmOpt }).then(s => { SQL = s; route(); })
  .catch(() => { $("#main").innerHTML = "<div class='card'><p class='ko'>Impossible de charger le moteur SQL (sql.js). Une connexion internet est nécessaire au premier chargement.</p></div>"; });
