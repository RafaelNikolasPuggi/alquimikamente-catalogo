/* Catálogo Alquimikamente: vitrine, busca e ficha do perfume */
(() => {
  const { perfumes, precos } = window.ALQ;
  const WHATS = "5531996031507";

  const FAMILIAS = {
    "Floral": ["Delicado ou intenso, com flores como rosa, jasmim e tuberosa. Clássico e versátil.", "clima ameno, dia e noite"],
    "Frutado": ["Leve e suculento, com maçã, pêssego e frutas vermelhas. Jovial e alegre.", "clima quente, dia"],
    "Cítrico": ["Vibrante e energizante, com limão, bergamota e laranja. Frescor imediato.", "clima quente, dia"],
    "Aromático": ["Fresco e herbal, com lavanda, alecrim e ervas. Limpo, elegante e versátil.", "clima quente ou ameno, dia"],
    "Fougère": ["Clássico da perfumaria: lavanda, gerânio e fava tonka sobre fundo de musgo. Limpo e elegante.", "qualquer clima, dia e noite"],
    "Aquático": ["Leve e refrescante, remete à água, à brisa e à sensação de limpeza.", "clima quente, dia"],
    "Almiscarado": ["Suave e envolvente, lembra pele limpa e roupa recém-lavada.", "qualquer clima, dia"],
    "Amadeirado": ["Madeiras como sândalo, cedro e vetiver. Elegante, seco e sofisticado; transmite maturidade e presença.", "clima ameno ou frio, dia e noite"],
    "Oriental": ["Também chamado de Ambarado ou Âmbar. Quente, envolvente e levemente adocicado, com resinas, âmbar e especiarias.", "clima frio, noite"],
    "Especiado": ["Quente e intrigante, com canela, pimenta e noz-moscada. Traz personalidade e um toque exótico.", "clima frio, noite"],
    "Baunilha": ["Doce, cremoso e aconchegante. Confortável e sedutor.", "clima ameno ou frio, noite"],
    "Gourmand": ["Inspirado em aromas de comida, como chocolate, caramelo e praliné. Doce e viciante.", "clima frio, noite"],
    "Chipre": ["Sofisticado e atemporal: abertura cítrica, coração floral e fundo de musgo e patchouli.", "clima ameno, dia e noite"],
    "Couro": ["Intenso e marcante, com couro, camurça e notas que remetem à pele. Não passa despercebido.", "clima frio, noite"],
  };
  const ALIAS = { "Ambarado": "Oriental", "Ambar": "Oriental" };
  const CONC = { "EDP": "20%", "Perfume": "30%", "Elixir": "40%", "Body Splash": "5%" };

  const sem = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const classe = l => "t-" + sem(l).replace(/\s+/g, "-");
  const real = v => "R$ " + Number(v).toFixed(2).replace(".", ",");
  const basesDe = fam => [...new Set(fam.split(/\s+/).map(w => ALIAS[w] || w).filter(w => FAMILIAS[w]))];

  /* ---------- header: menu mobile ---------- */
  const hamb = document.querySelector(".hamb"), menu = document.querySelector(".menu");
  if (hamb) {
    hamb.addEventListener("click", () => {
      const aberto = menu.classList.toggle("aberto");
      hamb.setAttribute("aria-expanded", aberto);
    });
    menu.addEventListener("click", e => { if (e.target.closest("a")) { menu.classList.remove("aberto"); hamb.setAttribute("aria-expanded", false); } });
  }

  /* ---------- card ---------- */
  const card = p => `<button class="perf" data-id="${p.id}" type="button" aria-label="Ver detalhes de ${esc(p.nome)}">
      <span class="hx"><i>${p.img ? `<img src="${p.img}" alt="" loading="lazy" width="62" height="68">` : ""}</i></span>
      <b>${esc(p.nome)}</b><span class="tag ${classe(p.linha)}">${p.linha}</span>
      <span class="m">${esc(p.marca)}</span><span class="f">${esc(p.familia)}</span></button>`;

  /* ---------- ficha (modal) ---------- */
  const dlg = document.createElement("dialog");
  dlg.setAttribute("aria-label", "Detalhes do perfume");
  document.body.appendChild(dlg);

  function tabelaPrecos(linha) {
    const t = precos[linha];
    if (!t) return "";
    const tam = [...new Set(Object.values(t).flatMap(o => Object.keys(o)))].sort((a, b) => a - b);
    const perf = ["EDP", "Perfume", "Elixir"].filter(x => t[x]);
    const linhaHtml = (tipo, cols) => `<tr><td>${tipo} <small>(${CONC[tipo]})</small></td>${cols.map(c => `<td>${t[tipo][c] ? real(t[tipo][c]) : "—"}</td>`).join("")}</tr>`;
    const tamP = tam.filter(x => perf.some(tp => t[tp][x]));
    let h = `<table><tr><th>${linha}</th>${tamP.map(x => `<th>${x} ml</th>`).join("")}</tr>${perf.map(tp => linhaHtml(tp, tamP)).join("")}</table>`;
    if (t["Body Splash"]) {
      const tb = Object.keys(t["Body Splash"]).sort((a, b) => a - b);
      h += `<table><tr><th>Body Splash</th>${tb.map(x => `<th>${x} ml</th>`).join("")}</tr>${linhaHtml("Body Splash", tb)}</table>`;
    }
    return h;
  }

  function abrir(id, atualizarUrl = true) {
    const p = perfumes.find(x => x.id === id);
    if (!p) return;
    const bases = basesDe(p.familia);
    const msg = encodeURIComponent(`Olá! Vi o catálogo da Alquimikamente e tenho interesse no ${p.nome} (${p.linha}). Pode me passar mais informações?`);
    dlg.innerHTML = `<button class="fechar" type="button" aria-label="Fechar">×</button>
      <div class="modal">
        <div class="img">${p.img ? `<img src="${p.img}" alt="${esc(p.nome)}">` : ""}</div>
        <div class="info">
          <span class="tag ${classe(p.linha)}">${p.linha}</span>
          <h3>${esc(p.nome)}</h3>
          <p class="insp">Inspirado em ${esc(p.nome)} · ${esc(p.marca)}</p>
          <dl><dt>Gênero</dt><dd>${p.genero}</dd><dt>Família</dt><dd>${esc(p.familia)}</dd><dt>Linha</dt><dd>${p.linha}</dd></dl>
          ${bases.length ? `<div class="desc-fam">${bases.map(b => `<p><b>${b}:</b> ${FAMILIAS[b][0]} <i>Ideal: ${FAMILIAS[b][1]}.</i></p>`).join("")}</div>` : ""}
          <h4 class="kicker" style="margin-top:18px">Valores da linha ${p.linha}</h4>
          ${tabelaPrecos(p.linha)}
          <a class="btn whats" href="https://wa.me/${WHATS}?text=${msg}" target="_blank" rel="noopener">Pedir pelo WhatsApp</a>
          <p class="aviso">Fragrância inspirada no perfume citado. Não possuímos vínculo com as marcas mencionadas. Imagem meramente ilustrativa.</p>
        </div>
      </div>`;
    dlg.querySelector(".fechar").addEventListener("click", () => dlg.close());
    dlg.showModal();
    if (atualizarUrl) history.replaceState(null, "", "#perfume=" + id);
  }
  dlg.addEventListener("close", () => { if (location.hash.startsWith("#perfume=")) history.replaceState(null, "", location.pathname + location.search); });
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  document.addEventListener("click", e => { const b = e.target.closest(".perf"); if (b) abrir(b.dataset.id); });
  const doHash = () => { const m = location.hash.match(/^#perfume=(.+)$/); if (m) abrir(decodeURIComponent(m[1]), false); };

  /* ---------- página inicial ---------- */
  const PASSO = 24;
  document.querySelectorAll("[data-vitrine]").forEach(sec => {
    const lista = perfumes.filter(p => p.genero === sec.dataset.vitrine);
    const grade = sec.querySelector(".grade"), botao = sec.querySelector(".mais button");
    let n = 0;
    const mostrar = () => {
      grade.insertAdjacentHTML("beforeend", lista.slice(n, n + PASSO).map(card).join(""));
      n += PASSO;
      botao.parentElement.hidden = n >= lista.length;
      botao.textContent = `Mostrar mais (${lista.length - n} restantes)`;
    };
    sec.querySelector(".total").textContent = lista.length;
    botao.addEventListener("click", mostrar);
    mostrar();
  });
  const fams = document.getElementById("lista-familias");
  if (fams) fams.innerHTML = Object.entries(FAMILIAS).map(([n, [t, i]]) => `<div class="fam"><b>${n}</b><p>${t}</p><span>Ideal: ${i}</span></div>`).join("");
  const vals = document.getElementById("lista-valores");
  if (vals) vals.innerHTML = Object.keys(precos).map(l => `<div class="valor"><span class="tag ${classe(l)}">${l}</span>${tabelaPrecos(l).replace(/<th>(Premium|Super Premium|Luxo)<\/th>/, "<th></th>")}</div>`).join("");
  const tot = document.getElementById("total-geral");
  if (tot) tot.textContent = perfumes.length;

  /* ---------- busca ---------- */
  const campo = document.getElementById("q");
  if (campo) {
    const res = document.getElementById("resultados"), cont = document.getElementById("contagem");
    const selFam = document.getElementById("familia");
    Object.keys(FAMILIAS).forEach(f => selFam.insertAdjacentHTML("beforeend", `<option>${f}</option>`));
    const filtro = { genero: "", linha: "" };
    const indice = perfumes.map(p => [p, sem(`${p.nome} ${p.marca} ${p.familia} ${p.genero} ${p.linha}`)]);
    const params = new URLSearchParams(location.search);
    campo.value = params.get("q") || "";

    function buscar() {
      const termos = sem(campo.value).split(/\s+/).filter(Boolean);
      const fam = selFam.value;
      const achados = indice.filter(([p, txt]) =>
        termos.every(t => txt.includes(t)) &&
        (!filtro.genero || p.genero === filtro.genero) &&
        (!filtro.linha || p.linha === filtro.linha) &&
        (!fam || basesDe(p.familia).includes(fam))).map(x => x[0]);
      res.innerHTML = achados.map(card).join("");
      cont.textContent = achados.length === perfumes.length ? `Todas as ${achados.length} fragrâncias` :
        achados.length ? `${achados.length} fragrância${achados.length > 1 ? "s" : ""} encontrada${achados.length > 1 ? "s" : ""}` : "";
      document.getElementById("vazio").hidden = achados.length > 0;
      const u = new URL(location); campo.value ? u.searchParams.set("q", campo.value) : u.searchParams.delete("q");
      history.replaceState(null, "", u.pathname + u.search + (location.hash.startsWith("#perfume=") ? location.hash : ""));
    }
    document.querySelectorAll(".chip").forEach(ch => ch.addEventListener("click", () => {
      const grupo = ch.dataset.grupo, ativo = ch.getAttribute("aria-pressed") === "true";
      document.querySelectorAll(`.chip[data-grupo="${grupo}"]`).forEach(c => c.setAttribute("aria-pressed", "false"));
      if (!ativo) ch.setAttribute("aria-pressed", "true");
      filtro[grupo] = ativo ? "" : ch.dataset.valor;
      buscar();
    }));
    campo.addEventListener("input", buscar);
    selFam.addEventListener("change", buscar);
    document.getElementById("limpar").addEventListener("click", () => {
      campo.value = ""; selFam.value = ""; filtro.genero = filtro.linha = "";
      document.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", "false"));
      buscar(); campo.focus();
    });
    buscar();
  }

  /* ---------- QR code do contato ---------- */
  const qr = document.getElementById("qr");
  if (qr && window.QRCode) new QRCode(qr, { text: `https://wa.me/${WHATS}?text=${encodeURIComponent("Olá! Vi o catálogo da Alquimikamente e quero fazer um pedido.")}`, width: 132, height: 132, colorDark: "#4A3B30", colorLight: "#ffffff" });

  doHash();
  window.addEventListener("hashchange", doHash);
})();
