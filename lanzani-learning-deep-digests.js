window.LANZANI_LEARNING_DEEP_DIGESTS = Object.fromEntries(
  (window.LANZANI_LEARNING_PAPERS || []).map((paper) => [
    paper.id,
    {
      setup: `
        <p><strong>Source.</strong> <a href="${paper.url}" target="_blank" rel="noreferrer">${paper.url}</a></p>
        <p><strong>Paper.</strong> ${paper.title}. <strong>Authors.</strong> ${paper.authors}. <strong>Venue.</strong> ${paper.journal}, ${paper.year}.</p>
        <h3>0. Detailed Model Setup</h3>
        ${paper.digest.deep}
        <p>The common structure is dynamic belief evolution. A state, model, or opinion is updated over time; the paper characterizes convergence, stability, concentration, or robust continuation values.</p>
      `,
      results: `
        <h3>1 &amp; 2. Main Results And Theorems</h3>
        <div class="theorem-box">
          <h3>Formal Dynamic-Learning Statement</h3>
          <p>${paper.takeaway}</p>
        </div>
        <p><strong>Intuition.</strong> The formal object is a dynamic belief or opinion process. The theorem identifies whether it converges, remains dispersed, concentrates quickly, or is distorted by misspecification concern.</p>
      `,
      example: `
        <h3>3. Concrete / Simple Example</h3>
        ${paper.digest.example}
      `,
      literature: `
        <h3>4. Deep Literature Review And Positioning</h3>
        <p>This entry connects to Bayesian learning, social learning, misspecified learning, martingale convergence, and robust decision theory. It should be read alongside Fudenberg-Lanzani-Strack on endogenous misspecified learning, Frick-Iijima-Ishii on belief convergence, Ba on robust misspecified models, and the broader Berk-Nash literature.</p>
      `,
      proof: `
        <h3>5. Detailed Proof Techniques And Mathematical Tools</h3>
        ${paper.digest.technical}
        <p>The reusable proof tools are martingale convergence, likelihood-ratio algebra, fixed-point/stability analysis, concentration inequalities, and robust Bellman operators.</p>
      `,
      critique: `
        <h3>6. Critical Discussion, Open Questions, And Limitations</h3>
        <p><strong>Problem solved.</strong> ${paper.takeaway}</p>
        <p><strong>Open questions.</strong> The main next step is to add endogenous information acquisition, social networks, or model switching. A strong new paper could ask how agents choose what evidence to see when they also worry about misspecification or when group disagreement is stable.</p>
      `,
    },
  ])
);

(function addLanzaniLearningDeepDigests() {
  window.DEEP_DIGESTS = window.DEEP_DIGESTS || {};
  Object.assign(window.DEEP_DIGESTS, window.LANZANI_LEARNING_DEEP_DIGESTS);
})();
