const state = {
  filter: "all",
  search: "",
  sort: "year-desc",
  comparison: "reading-order",
};

const tagLabels = {
  "information-acquisition": "Information acquisition",
  aggregation: "Information aggregation",
  "optimal-stopping": "Optimal stopping",
  "misspecified-learning": "Misspecified learning",
  "behavioral-learning": "Behavioral learning",
  "social-learning": "Social learning",
  "rational-inattention": "Rational inattention",
  persuasion: "Persuasion",
  "information-design": "Information design",
  "robust-contract": "Robust contracts",
  "robust-mechanism": "Robust mechanisms",
  "robust-pricing": "Robust pricing",
  "robust-theory": "Robust theory",
  "contract-theory": "Contract theory",
  "information-aggregation": "Information aggregation",
  "top5-te": "Top 5 / TE",
  "journal-of-finance": "Journal of Finance",
  pricing: "Pricing",
  finance: "Finance",
  networks: "Networks",
  voting: "Voting",
  auctions: "Auctions",
  learning: "Learning",
  markets: "Markets",
  "working-paper": "Working paper",
  "alpha-divergence": "Alpha divergence",
  "optimal-transport": "Optimal transport",
  "bounded-rationality": "Bounded rationality",
};

function doiUrl(doi) {
  return `https://doi.org/${doi}`;
}

function paperUrl(paper) {
  if (paper.url) return paper.url;
  if (paper.doi) return doiUrl(paper.doi);
  return "";
}

function typesetMath() {
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise();
  }
}

function placeholderDigest(paper) {
  const tags = paper.tags.map((tag) => tagLabels[tag] || tag).join(", ");
  return {
    short: `${paper.takeaway} This page has a structured mathematical digest frame and proof-technique lens; source-specific theorem notes will be deepened as the weekly update process revisits the paper.`,
    medium: `
      <p><strong>Reading objective.</strong> Extract the model primitives, equilibrium or optimization object, main theorem, proof method, and best follow-up idea.</p>
      <p><strong>Why it belongs here.</strong> Tags: ${tags}. The paper is from ${paper.journal}, ${paper.year}, within the 2013-2026 target window.</p>
    `,
    deep: `
      <p><strong>Structured setup lens.</strong></p>
      <div class="math">
        State space: \\(\\Theta\\), action set: \\(A\\), signal/experiment set: \\(\\Pi\\).<br>
        Belief: \\(\\mu_t \\in \\Delta(\\Theta)\\).<br>
        Objective template: \\(\\max_{\\pi,\\tau,a} E[ u(a,\\theta) - C(\\pi,\\tau) ]\\).<br>
        Equilibrium or solution concept: to be specified from the paper.
      </div>
      <p><strong>Main result lens.</strong> Identify the theorem's assumptions, conclusion, and economic interpretation, then connect it to the paper's proof technique.</p>
    `,
    technical: `
      <p><strong>Proof techniques to extract.</strong> Look for martingale convergence, dynamic programming, Blackwell comparison, concavification, fixed points, likelihood-ratio arguments, or sufficient-statistic reductions.</p>
      <p><strong>Open questions lens.</strong> Record what problem it solves, what remains fragile, and one possible new project inspired by the model.</p>
    `,
  };
}

function digestFor(paper) {
  return paper.digest || placeholderDigest(paper);
}

function displayStatus(paper) {
  return paper.status === "Queued" ? "Structured Digest" : paper.status;
}

function filteredPapers() {
  const q = state.search.trim().toLowerCase();
  return PAPERS
    .filter((paper) => state.filter === "all" || paper.tags.includes(state.filter))
    .filter((paper) => {
      if (!q) return true;
      return [
        paper.title,
        paper.authors,
        paper.journal,
        paper.sourceType,
        paper.year,
        paper.takeaway,
        paper.tags.join(" "),
      ].join(" ").toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (state.sort === "year-asc") return a.year - b.year || a.title.localeCompare(b.title);
      if (state.sort === "journal") return a.journal.localeCompare(b.journal) || b.year - a.year;
      if (state.sort === "title") return a.title.localeCompare(b.title);
      return b.year - a.year || a.title.localeCompare(b.title);
    });
}

function renderPapers() {
  const list = document.querySelector("#paper-list");
  const template = document.querySelector("#paper-card-template");
  const papers = filteredPapers();
  list.textContent = "";

  document.querySelector("#list-title").textContent = state.filter === "all" ? "All papers" : tagLabels[state.filter] || state.filter;
  document.querySelector("#paper-count").textContent = `${papers.length} papers shown`;

  for (const paper of papers) {
    const node = template.content.cloneNode(true);
    const digest = digestFor(paper);
    node.querySelector(".status").textContent = displayStatus(paper);
    node.querySelector(".journal-year").textContent = `${paper.sourceType ? `${paper.sourceType}: ` : ""}${paper.journal}, ${paper.year}`;
    const titleLink = node.querySelector(".paper-title-link");
    titleLink.href = `paper.html?id=${encodeURIComponent(paper.id)}&v=jf-audit-20260623`;
    titleLink.textContent = paper.title;
    node.querySelector(".authors").textContent = paper.authors;
    node.querySelector(".takeaway").textContent = paper.takeaway;
    node.querySelector(".summary-short").textContent = digest.short;
    node.querySelector(".summary-medium").innerHTML = digest.medium;
    node.querySelector(".deep-dive").innerHTML = digest.deep;
    node.querySelector(".technical").innerHTML = digest.technical;

    const tagRow = node.querySelector(".tag-row");
    for (const tag of paper.tags) {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tagLabels[tag] || tag;
      tagRow.appendChild(span);
    }

    const actions = node.querySelector(".actions");
    const source = paperUrl(paper);
    if (source) {
      const sourceLink = document.createElement("a");
      sourceLink.href = source;
      sourceLink.target = "_blank";
      sourceLink.rel = "noreferrer";
      sourceLink.textContent = paper.doi ? "DOI" : "Source";
      actions.appendChild(sourceLink);
    }

    const blog = document.createElement("a");
    blog.href = `paper.html?id=${encodeURIComponent(paper.id)}&v=jf-audit-20260623`;
    blog.textContent = "Read digest";
    actions.appendChild(blog);

    list.appendChild(node);
  }

  typesetMath();
}

function renderComparison() {
  const panel = document.querySelector("#comparison-view");
  const top = (tag) => PAPERS.filter((p) => p.tags.includes(tag)).slice(0, 4);

  const views = {
    "reading-order": `
      <h2>Which Paper Should I Read First?</h2>
      <div class="comparison-grid">
        <div class="mini-panel"><h3>Start with foundations</h3><p>Caplin-Dean 2015, Matejka-McKay 2015, Esponda-Pouzo 2016, and Mossel-Sly-Tamuz 2015 give the baseline language for information costs, misspecification, and social learning.</p></div>
        <div class="mini-panel"><h3>Then dynamic acquisition</h3><p>Che-Mierendorff 2019, Zhong 2022, and Auster-Che-Mierendorff 2024 form a clean path into dynamic attention and Wald-style stopping.</p></div>
        <div class="mini-panel"><h3>Then biased learning</h3><p>Heidhues-Koszegi-Strack 2018, Frick-Iijima-Ishii 2020/2024, and Kevin He 2022 are natural next steps.</p></div>
      </div>
    `,
    timeline: `
      <h2>Timeline</h2>
      <div class="comparison-grid">
        ${[2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026].map((year) => {
          const count = PAPERS.filter((p) => p.year === year).length;
          return `<div class="mini-panel"><h3>${year}</h3><p>${count} paper${count === 1 ? "" : "s"}</p></div>`;
        }).join("")}
      </div>
    `,
    methods: `
      <h2>Methods Compared</h2>
      <div class="comparison-grid">
        <div class="mini-panel"><h3>Dynamic programming</h3><p>Useful for attention allocation, experimentation, and stopping problems.</p></div>
        <div class="mini-panel"><h3>Martingales</h3><p>Central for belief convergence and asymptotic learning under correct or misspecified models.</p></div>
        <div class="mini-panel"><h3>Concavification</h3><p>Common in persuasion and information design, especially when the designer chooses signal structures.</p></div>
        <div class="mini-panel"><h3>Network limits</h3><p>Used to study whether decentralized social learning aggregates dispersed private information.</p></div>
        <div class="mini-panel"><h3>KL minimization</h3><p>Key for misspecified learning, Berk-Nash equilibrium, and long-run beliefs under wrong subjective models.</p></div>
        <div class="mini-panel"><h3>Likelihood ratios</h3><p>Useful in social learning, aggregation, signal tails, monotone likelihood-ratio arguments, and distinguishability.</p></div>
        <div class="mini-panel"><h3>Duality</h3><p>Appears in rational inattention, information design, entropy costs, and revealed-preference characterizations.</p></div>
        <div class="mini-panel"><h3>Free boundaries</h3><p>Useful for Wald problems, experimentation, stopping regions, and dynamic attention thresholds.</p></div>
      </div>
    `,
    clusters: `
      <h2>Papers About X</h2>
      <div class="comparison-grid">
        ${["information-acquisition", "aggregation", "misspecified-learning", "social-learning", "rational-inattention", "persuasion", "robust-contract", "robust-mechanism", "robust-pricing", "journal-of-finance"].map((tag) => `
          <div class="mini-panel">
            <h3>${tagLabels[tag]}</h3>
            <ul>${top(tag).map((p) => `<li>${p.title} (${p.year})</li>`).join("")}</ul>
          </div>
        `).join("")}
      </div>
    `,
  };

  panel.innerHTML = views[state.comparison];
  typesetMath();
}

function bindEvents() {
  document.querySelector("#search").addEventListener("input", (event) => {
    state.search = event.target.value;
    renderPapers();
  });

  document.querySelector("#sort").addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderPapers();
  });

  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      state.filter = button.dataset.filter;
      renderPapers();
    });
  });

  document.querySelectorAll(".comparison").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".comparison").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      state.comparison = button.dataset.view;
      renderComparison();
    });
  });
}

bindEvents();
renderComparison();
renderPapers();
