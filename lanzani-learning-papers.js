window.LANZANI_LEARNING_PAPERS = [
  {
    id: "cerreia-vioglio-corrao-lanzani-2023-opinion-aggregation",
    title: "Dynamic Opinion Aggregation: Long-Run Stability and Disagreement",
    authors: "Simone Cerreia-Vioglio; Roberto Corrao; Giacomo Lanzani",
    journal: "Review of Economic Studies",
    year: 2023,
    sourceType: "Published article",
    doi: "10.1093/restud/rdad072",
    url: "https://doi.org/10.1093/restud/rdad072",
    status: "Digested",
    tags: ["learning", "social-learning", "aggregation", "behavioral-learning", "top5-te"],
    takeaway: "Studies dynamic aggregation of heterogeneous opinions and characterizes when disagreement is long-run stable rather than washed out by repeated communication.",
    digest: {
      short: "The paper studies how a group repeatedly aggregates opinions. The key issue is not whether agents receive one more signal, but whether the aggregation rule and belief dynamics make disagreement vanish or persist. It belongs in the social-learning/information-aggregation part of the library.",
      motivation: "<p><strong>Motivation.</strong> Committees, expert panels, political groups, and markets repeatedly combine opinions. Even when everyone sees the same sequence of public discussions, disagreement can remain stable.</p><p><strong>Reality example.</strong> A central-bank committee may repeatedly pool forecasts but keep stable hawk/dove disagreement because members aggregate evidence through different models or weights.</p>",
      medium: "<p><strong>Big idea.</strong> Dynamic opinion aggregation asks when repeated aggregation converges to consensus and when disagreement is structurally stable.</p><p><strong>Main result in words.</strong> The paper gives conditions for long-run stability and disagreement in dynamic aggregation systems.</p>",
      deep: "<h3>1. Environment</h3><p>Agents have beliefs or opinions that evolve over time through an aggregation rule. The state is the vector of opinions \(x_t=(x_{1t},...,x_{nt})\). A dynamic aggregator maps \(x_t\) into \(x_{t+1}\).</p><div class=\"math\">\\[x_{t+1}=T(x_t).\\]</div><h3>2. Main Object</h3><p>The main object is the long-run set of opinions: fixed points, cycles, or stable disagreement regions.</p><div class=\"math\">\\[x^*=T(x^*),\\qquad x_i^*\\ne x_j^*\\text{ for some }i,j.\\]</div>",
      example: "<h3>Two-Expert Example</h3><p>Expert 1 puts weight \(a\) on her own previous opinion and \(1-a\) on expert 2. Expert 2 uses weight \(b\) on herself. Then</p><div class=\"math\">\\[x_{1,t+1}=a x_{1t}+(1-a)x_{2t},\\quad x_{2,t+1}=(1-b)x_{1t}+b x_{2t}.\\]</div><p>Consensus obtains if the difference contracts; disagreement persists if the dynamics preserve or regenerate differences.</p>",
      technical: "<p><strong>Contribution.</strong> Connects social learning, opinion aggregation, and dynamic stability.</p><p><strong>Proof technique.</strong> Study fixed points and stability of the aggregation operator.</p><p><strong>Open questions.</strong> Add strategic communication, endogenous networks, or misspecified interpretation of others' opinions.</p>",
    },
  },
  {
    id: "fudenberg-lanzani-strack-2023-pathwise-beliefs",
    title: "Pathwise Concentration Bounds for Bayesian Beliefs",
    authors: "Drew Fudenberg; Giacomo Lanzani; Philipp Strack",
    journal: "Theoretical Economics",
    year: 2023,
    sourceType: "Published article",
    doi: "10.3982/te5206",
    url: "https://doi.org/10.3982/te5206",
    status: "Digested",
    tags: ["learning", "misspecified-learning", "behavioral-learning", "top5-te"],
    takeaway: "Develops pathwise concentration bounds for Bayesian beliefs, giving nonasymptotic control of belief movements along realized histories.",
    digest: {
      short: "This is a technical learning paper that gives pathwise concentration bounds for Bayesian beliefs. It matters for misspecified and behavioral learning because many convergence arguments need control over realized belief paths, not only expectations.",
      motivation: "<p><strong>Motivation.</strong> Learning theory often says beliefs converge eventually, but economists often need finite-time and path-by-path bounds.</p><p><strong>Reality example.</strong> A platform or regulator observing belief updating wants to know how quickly wrong beliefs can become unlikely along the realized data path.</p>",
      medium: "<p><strong>Big idea.</strong> Bayesian beliefs are martingales or likelihood-ratio processes. Pathwise concentration gives deterministic-looking bounds that hold along histories with high probability.</p>",
      deep: "<h3>1. Environment</h3><p>A Bayesian learner observes signals and updates posterior beliefs \(\mu_t\). For a hypothesis \(h\), posterior odds follow likelihood-ratio multiplication.</p><div class=\"math\">\\[\\log\\frac{\\mu_t(h)}{\\mu_t(h')}=\\log\\frac{\\mu_0(h)}{\\mu_0(h')}+\\sum_{s\\le t}\\log\\frac{q_h(y_s)}{q_{h'}(y_s)}.\\]</div><h3>2. Main Object</h3><p>The paper bounds deviations of posterior beliefs along realized histories rather than only in expectation.</p>",
      example: "<h3>Likelihood Ratio Example</h3><p>If log-likelihood increments have bounded range, concentration inequalities imply that the cumulative log likelihood stays close to its mean with high probability:</p><div class=\"math\">\\[\\Pr\\left(\\left|\\sum_{s\\le t}(\\ell_s-E\\ell_s)\\right|\\ge z\\right)\\le 2e^{-c z^2/t}.\\]</div><p>This translates directly into upper and lower bounds on posterior odds.</p>",
      technical: "<p><strong>Contribution.</strong> Supplies reusable concentration tools for Bayesian-learning paths.</p><p><strong>Proof technique.</strong> Martingale concentration and likelihood-ratio decompositions.</p><p><strong>Open questions.</strong> Extend to endogenous data, misspecified model classes, and social-learning networks.</p>",
    },
  },
  {
    id: "lanzani-2025-dynamic-concern-misspecification",
    title: "Dynamic Concern for Misspecification",
    authors: "Giacomo Lanzani",
    journal: "Econometrica",
    year: 2025,
    sourceType: "Published article",
    doi: "10.3982/ecta22139",
    url: "https://doi.org/10.3982/ecta22139",
    status: "Digested",
    tags: ["misspecified-learning", "robust-theory", "behavioral-learning", "top5-te"],
    takeaway: "Studies dynamic decision making when the agent is concerned that the model may be misspecified, linking robust preferences and learning over time.",
    digest: {
      short: "Lanzani studies dynamic concern for misspecification. The paper belongs at the intersection of robust control, ambiguity, and misspecified learning: the agent acts while worrying that the statistical model used for continuation values may be wrong.",
      motivation: "<p><strong>Motivation.</strong> In many dynamic decisions, the agent does not simply learn an unknown state; she also worries that her model of the state process is wrong.</p><p><strong>Reality example.</strong> A policymaker may use a macro model but choose policy cautiously because the model may be misspecified in recessions or crises.</p>",
      medium: "<p><strong>Big idea.</strong> Dynamic misspecification concern changes continuation values and can be represented through robust/penalized beliefs over future model distortions.</p>",
      deep: "<h3>1. Environment</h3><p>An agent chooses actions over time under a reference model \(P\), but considers alternative models \(Q\) that are statistically close to \(P\). A robust continuation value has the form</p><div class=\"math\">\\[V_t=\\sup_a\\inf_Q E_Q[u(a,\theta)+\\beta V_{t+1}]-\\text{penalty}(Q,P).\\]</div><h3>2. Main Object</h3><p>The paper studies how concern for misspecification evolves dynamically and how it affects optimal behavior.</p>",
      example: "<h3>Robust Bellman Example</h3><p>With payoff \(u(a,\theta)\) and KL penalty \(\eta D_{KL}(Q\\Vert P)\), the inner minimization tilts probabilities toward bad states:</p><div class=\"math\">\\[Q^*(\\theta)\\propto P(\\theta)\\exp(-u(a,\theta)/\\eta).\\]</div><p>Small \(\eta\) means high concern for misspecification and more pessimistic continuation values.</p>",
      technical: "<p><strong>Contribution.</strong> Connects dynamic robust preferences with misspecification concerns in learning environments.</p><p><strong>Proof technique.</strong> Robust Bellman equations, variational representations, and dynamic consistency arguments.</p><p><strong>Open questions.</strong> Combine with social learning, endogenous model switching, or empirical estimation of misspecification concern.</p>",
    },
  },
];

(function addLanzaniLearningPapers() {
  if (!Array.isArray(window.PAPERS) && typeof PAPERS === "undefined") return;
  const list = Array.isArray(window.PAPERS) ? window.PAPERS : PAPERS;
  const ids = new Set(list.map((paper) => paper.id));
  for (const paper of window.LANZANI_LEARNING_PAPERS) {
    if (!ids.has(paper.id)) list.push(paper);
  }
})();
