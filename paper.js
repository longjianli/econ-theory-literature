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
  finance: "Finance",
  networks: "Networks",
  voting: "Voting",
  auctions: "Auctions",
  learning: "Learning",
  markets: "Markets",
  policy: "Policy",
  "macro-finance": "Macro-finance",
  "political-economy": "Political economy",
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

function inferTemplate(paper) {
  const tagText = paper.tags.map((tag) => tagLabels[tag] || tag).join(", ");
  const primary = paper.tags.find((tag) => [
    "social-learning",
    "rational-inattention",
    "information-acquisition",
    "optimal-stopping",
    "misspecified-learning",
    "behavioral-learning",
    "aggregation",
    "persuasion",
    "information-design",
  ].includes(tag)) || paper.tags[0] || "information-acquisition";

  const blueprints = {
    "social-learning": {
      motivation: `
        <p><strong>Motivation.</strong> People often learn from other people's choices rather than from raw data: restaurant reviews, product ratings, investment decisions, political opinions, technology adoption, and workplace practices. The model asks when society learns the truth from these observed actions and when it instead herds.</p>
        <p><strong>Reality example.</strong> If many earlier users bought a product, a later buyer may infer that it is good. But those earlier users may have bought because they saw still earlier buyers, not because they had strong private evidence. A social-learning model separates genuine information aggregation from imitation.</p>
      `,
      setup: String.raw`
        <h3>Sequential Social Learning Setup</h3>
        <p>The canonical model has a payoff-relevant state, a sequence of agents, private signals, and an observation network. Agent \(n\) learns from her signal and from actions taken by predecessors.</p>
        <div class="math">
          \[
            \omega\sim\mu_0\in\Delta(\Omega),\qquad
            s_n\mid\omega\sim F(\cdot\mid\omega),\qquad
            h_n=(a_k)_{k\in B_n}.
          \]
          \[
            \mu_n(\omega)=\Pr(\omega\mid s_n,h_n),\qquad
            a_n\in\arg\max_{a\in A}\sum_{\omega\in\Omega}u(a,\omega)\mu_n(\omega).
          \]
        </div>
        <p>The detailed paper-specific setup should identify exactly what agents observe, whether \(B_n\) is complete, local, random, or endogenous, and what notion of learning is used: belief convergence, correct-action learning, adequate learning, or welfare convergence.</p>
      `,
      result: String.raw`
        <div class="theorem-box">
          <h3>Main Result Form</h3>
          <p>The theorem should characterize when decentralized actions aggregate information:</p>
          <div class="math">
            \[
              \Pr_{\omega}\!\left(a_n\in c(\omega)\right)\to 1
              \quad\text{or}\quad
              \mathbb{E}[u(a_n,\omega)]\to u^*(\mu_0).
            \]
          </div>
          <p>Failure results should identify a nontrivial event on which society herds on an action that is not optimal in the true state.</p>
        </div>
      `,
      example: String.raw`
        <h3>Simple Example</h3>
        <p>Let \(\Omega=\{H,L\}\), \(A=\{0,1\}\), and \(u(1,H)=u(0,L)=1\), \(u(1,L)=u(0,H)=0\). A cascade at history \(h_n\) occurs when the private signal no longer changes the chosen action:</p>
        <div class="math">
          \[
            \arg\max_a\mathbb{E}[u(a,\omega)\mid h_n,s_n=h]
            =
            \arg\max_a\mathbb{E}[u(a,\omega)\mid h_n,s_n=\ell].
          \]
        </div>
        <p>The paper-specific example should explain exactly what prevents or generates this equality.</p>
      `,
    },
    "rational-inattention": {
      motivation: `
        <p><strong>Motivation.</strong> Real decision makers do not process every piece of information. Consumers compare only a few products, managers monitor only some indicators, investors watch only some assets, and voters attend to only some news. Rational inattention models this limited attention as an optimal response to information-processing costs.</p>
        <p><strong>Reality example.</strong> A shopper may not calculate the exact value of every phone plan. Instead, she pays attention to the most salient price and data-limit dimensions. Her final choice can look random, but the randomness may come from optimally coarse information.</p>
      `,
      setup: String.raw`
        <h3>Rational Inattention Setup</h3>
        <p>The decision maker starts with a prior, chooses an information structure, observes a posterior or signal, and then acts. The clean posterior formulation is:</p>
        <div class="math">
          \[
            \theta\in\Theta,\quad a\in A,\quad
            \pi\in\Delta(\Delta(\Theta)),\quad
            \int_{\Delta(\Theta)}p\,d\pi(p)=\mu.
          \]
          \[
            V(\mu)=
            \max_{\pi}
            \left\{
              \int_{\Delta(\Theta)}
              \max_{a\in A}\sum_{\theta}u(a,\theta)p(\theta)\,d\pi(p)
              -
              C(\pi,\mu)
            \right\}.
          \]
        </div>
        <p>The paper-specific digest should identify the information cost \(C\), the feasible experiments, and the induced stochastic choice rule.</p>
      `,
      result: String.raw`
        <div class="theorem-box">
          <h3>Main Result Form</h3>
          <p>The theorem usually characterizes the optimal experiment, the implied choice probabilities, or revealed-preference restrictions:</p>
          <div class="math">
            \[
              P(a\mid\theta)
              =
              \int \mathbf{1}\{a\in c(p)\}\,d\pi^*(p\mid\theta).
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Simple Example</h3>
        <p>With binary state and action, \(u(a,\theta)=\mathbf{1}\{a=\theta\}\). Under Shannon cost, the agent solves</p>
        <div class="math">
          \[
            \max_{\Pr(s\mid\theta)}
            \Pr(a(s)=\theta)
            -
            \lambda
            \sum_{\theta,s}\mu(\theta)\Pr(s\mid\theta)
            \log\frac{\Pr(s\mid\theta)}{\Pr(s)}.
          \]
        </div>
        <p>The full digest should show how this paper changes the cost, dynamic timing, or testable implications.</p>
      `,
    },
    "information-acquisition": {
      motivation: `
        <p><strong>Motivation.</strong> Information is valuable but costly. Firms run market research, traders buy signals, buyers inspect quality, platforms design ratings, and workers ask peers before choosing actions. The theory asks who acquires information, how much, and whether private incentives match social value.</p>
        <p><strong>Reality example.</strong> A financial trader may buy a costly data feed. The data helps the trader profit, but it may also make prices more informative for everyone. The private and social value of information can differ.</p>
      `,
      setup: String.raw`
        <h3>Information Acquisition Setup</h3>
        <p>The common structure is an agent, trader, buyer, firm, or mechanism choosing information before choosing an action.</p>
        <div class="math">
          \[
            \theta\sim\mu,\qquad
            \pi:S\times\Theta\to[0,1],\qquad
            s\sim\pi(\cdot\mid\theta),\qquad
            a:S\to A.
          \]
          \[
            \max_{\pi,a(\cdot)}
            \mathbb{E}_{\mu,\pi}[u(a(s),\theta)]-C(\pi).
          \]
        </div>
        <p>The paper-specific setup should say who chooses information, who benefits from it, and whether information has private, social, or strategic value.</p>
      `,
      result: String.raw`
        <div class="theorem-box">
          <h3>Main Result Form</h3>
          <p>The result should identify the efficient or equilibrium information structure, compare private and social incentives, or characterize distortions in information choice.</p>
        </div>
      `,
      example: String.raw`
        <h3>Simple Example</h3>
        <p>A buyer can inspect quality \(\theta\in\{H,L\}\) at cost \(c\). Information is acquired iff its value exceeds its cost:</p>
        <div class="math">
          \[
            \mathbb{E}_s\left[\max_a\mathbb{E}[u(a,\theta)\mid s]\right]
            -
            \max_a\mathbb{E}[u(a,\theta)]
            \ge c.
          \]
        </div>
      `,
    },
    "optimal-stopping": {
      motivation: `
        <p><strong>Motivation.</strong> Many economic decisions are about when to stop learning and act: hiring, firing, investment, experimentation, product launch, medical diagnosis, legal settlement, and search. Waiting gives more information but delays payoff and costs resources.</p>
        <p><strong>Reality example.</strong> A firm testing a new product must decide whether to keep experimenting, launch, or abandon. A Wald-style model turns this into posterior thresholds: continue while uncertainty is valuable, stop when evidence is strong enough.</p>
      `,
      setup: String.raw`
        <h3>Optimal Stopping Setup</h3>
        <p>The agent observes information over time, updates a posterior, and chooses when to stop.</p>
        <div class="math">
          \[
            \theta\sim\mu_0,\qquad
            \mathcal{F}_t=\sigma(s_\tau:0\le\tau\le t),\qquad
            \mu_t=\Pr(\theta\mid\mathcal{F}_t).
          \]
          \[
            V(\mu_0)=
            \sup_{\tau,a_{\tau}}
            \mathbb{E}\left[
              u(a_{\tau},\theta)-\int_0^{\tau}c(\mu_t)\,dt
            \right].
          \]
        </div>
      `,
      result: String.raw`
        <div class="theorem-box">
          <h3>Main Result Form</h3>
          <p>The theorem should characterize the stopping and continuation regions:</p>
          <div class="math">
            \[
              \tau^*=\inf\{t:\mu_t\in\mathcal{S}\},\qquad
              \mathcal{C}=\Delta(\Theta)\setminus\mathcal{S}.
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Simple Example</h3>
        <p>In a binary Wald problem, stop when the log likelihood ratio exits an interval:</p>
        <div class="math">
          \[
            \Lambda_t=\log\frac{\Pr(H\mid\mathcal{F}_t)}{\Pr(L\mid\mathcal{F}_t)},\qquad
            \tau^*=\inf\{t:\Lambda_t\notin(\underline b,\bar b)\}.
          \]
        </div>
      `,
    },
    "misspecified-learning": {
      motivation: `
        <p><strong>Motivation.</strong> People can learn carefully inside the wrong model. A manager may believe sales depend only on price while ignoring advertising spillovers; a voter may use the wrong causal model of inflation; a seller may misread consumer behavior. Bayesian updating does not fix the problem if the true model is absent from the hypothesis class.</p>
        <p><strong>Reality example.</strong> If a firm never tries a high price, it may never learn that high prices would work. Its data are generated by its own cautious behavior, so a wrong pessimistic model can become self-confirming.</p>
      `,
      setup: String.raw`
        <h3>Misspecified Learning Setup</h3>
        <p>The agent updates within a subjective model that may exclude the true data-generating process.</p>
        <div class="math">
          \[
            y_t\sim p(\cdot\mid a_t,h_t),\qquad
            \text{agent believes }y_t\sim q_{\theta}(\cdot\mid a_t,h_t),\quad\theta\in\Theta.
          \]
          \[
            \Theta^*(a)
            =
            \arg\min_{\theta\in\Theta}
            D_{\mathrm{KL}}\!\left(p(\cdot\mid a)\,\|\,q_{\theta}(\cdot\mid a)\right).
          \]
        </div>
        <p>The full digest should specify the true process, subjective model, feedback channel, and limiting belief concept.</p>
      `,
      result: String.raw`
        <div class="theorem-box">
          <h3>Main Result Form</h3>
          <p>The result usually characterizes limiting beliefs and actions:</p>
          <div class="math">
            \[
              \operatorname{supp}(\beta)\subseteq\Theta^*(a),
              \qquad
              a\in\arg\max_{a'}\mathbb{E}_{\beta}[u(a',\theta)].
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Simple Example</h3>
        <p>An agent observes outcomes \(y\), wrongly assumes the wrong causal model, and converges to the parameter that minimizes KL divergence rather than to the truth.</p>
      `,
    },
    "behavioral-learning": {
      motivation: `
        <p><strong>Motivation.</strong> Beliefs often move in systematic non-Bayesian ways: people neglect correlation, overweight salient evidence, underweight base rates, forget old information, or misinterpret others' incentives. Behavioral-learning papers formalize these mistakes and study their equilibrium consequences.</p>
        <p><strong>Reality example.</strong> If several friends share the same news source, treating their opinions as independent evidence double-counts the original source. This can create overconfidence and polarization.</p>
      `,
      setup: String.raw`
        <h3>Behavioral Learning Setup</h3>
        <p>The agent's belief rule departs from Bayesian updating because of correlation neglect, base-rate neglect, limited memory, cursed reasoning, or another disciplined bias.</p>
        <div class="math">
          \[
            \mu_{t+1}=T(\mu_t,s_t,h_t),
            \qquad
            T\ne B \text{ where } B \text{ is the Bayesian operator}.
          \]
          \[
            a_t\in\arg\max_a\sum_{\theta}u(a,\theta)\mu_t(\theta).
          \]
        </div>
      `,
      result: String.raw`
        <div class="theorem-box">
          <h3>Main Result Form</h3>
          <p>The theorem should say whether the bias vanishes, persists, creates polarization, generates welfare loss, or can be ranked by a welfare criterion.</p>
        </div>
      `,
      example: String.raw`
        <h3>Simple Example</h3>
        <p>If two signals are correlated but the agent treats them as independent, the perceived likelihood ratio is exaggerated:</p>
        <div class="math">
          \[
            \log LR^{\mathrm{naive}}(s_1,s_2)
            =
            \log LR(s_1)+\log LR(s_2)
            >
            \log LR^{\mathrm{true}}(s_1,s_2)
          \]
        </div>
      `,
    },
    aggregation: {
      motivation: `
        <p><strong>Motivation.</strong> Markets, elections, auctions, and organizations are supposed to aggregate dispersed information. But incentives, strategic behavior, correlation, manipulation, and limited communication can prevent the collective outcome from revealing what individuals know.</p>
        <p><strong>Reality example.</strong> A stock price may look informative because many traders participate, but if traders have correlated signals or strategic reasons to hide information, prices may aggregate less information than expected.</p>
      `,
      setup: String.raw`
        <h3>Information Aggregation Setup</h3>
        <p>Many agents hold dispersed private information. The institution can be a market, election, auction, contract, or network.</p>
        <div class="math">
          \[
            s_i\sim F(\cdot\mid\theta),\qquad
            x_i=x_i(s_i,\text{institution}),\qquad
            z_N=\mathcal{A}(x_1,\ldots,x_N).
          \]
          \[
            \text{Aggregation succeeds if}\quad
            \Pr(z_N\text{ induces the correct action}\mid\theta)\to1.
          \]
        </div>
      `,
      result: String.raw`
        <div class="theorem-box">
          <h3>Main Result Form</h3>
          <p>The theorem should identify when aggregation succeeds or fails because of incentives, strategic substitutability, correlation neglect, manipulation, or coarse communication.</p>
        </div>
      `,
      example: String.raw`
        <h3>Simple Example</h3>
        <p>Efficient binary aggregation compares the sum of private log-likelihood ratios to the prior odds:</p>
        <div class="math">
          \[
            \sum_{i=1}^N \log\frac{f(s_i\mid H)}{f(s_i\mid L)}
            \gtrless
            \log\frac{\mu(L)}{\mu(H)}.
          \]
        </div>
      `,
    },
    persuasion: {
      motivation: `
        <p><strong>Motivation.</strong> Institutions often choose what information people see: platforms rank reviews, regulators disclose stress tests, schools report scores, firms design ads, and media outlets frame evidence. Information design studies how chosen signals shape beliefs and actions.</p>
        <p><strong>Reality example.</strong> A platform deciding whether to show average ratings, full review histories, or selected recommendations is choosing an information structure. The design can improve decisions or manipulate users.</p>
      `,
      setup: String.raw`
        <h3>Information Design Setup</h3>
        <p>A sender or designer chooses a signal structure to influence receiver beliefs and actions subject to Bayes plausibility.</p>
        <div class="math">
          \[
            \theta\sim\mu,\qquad
            \pi(m\mid\theta),\qquad
            p_m(\theta)=\Pr(\theta\mid m).
          \]
          \[
            \sum_m\lambda_m p_m=\mu,\qquad
            a(m)\in\arg\max_{a\in A_R}\sum_{\theta}u_R(a,\theta)p_m(\theta).
          \]
        </div>
      `,
      result: String.raw`
        <div class="theorem-box">
          <h3>Main Result Form</h3>
          <p>The sender's problem can often be written as a concavification over posteriors:</p>
          <div class="math">
            \[
              \max_{\{(\lambda_m,p_m)\}}
              \sum_m\lambda_m v(p_m)
              \quad
              \text{s.t.}
              \quad
              \sum_m\lambda_m p_m=\mu.
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Simple Example</h3>
        <p>A sender wants receiver action \(1\). The receiver chooses \(1\) iff posterior \(p\ge q\). The designer chooses a distribution over posteriors with mean \(\mu\) to maximize \(\Pr(p\ge q)\).</p>
      `,
    },
  };

  const blueprint = blueprints[primary] || blueprints["information-acquisition"];
  const techniqueLens = {
    "social-learning": String.raw`
      <p><strong>Proof technique lens for this topic.</strong> Check whether the paper uses martingale convergence of social beliefs, an improvement principle, compactness of belief distributions, likelihood-ratio order, or a no-cascade/stationary-belief argument.</p>
      <div class="math">
        \[
          \text{belief process }(\mu_n)
          \quad\Rightarrow\quad
          \text{stationary/cascade set}
          \quad\Rightarrow\quad
          \text{learning or welfare bound}.
        \]
      </div>
    `,
    "rational-inattention": String.raw`
      <p><strong>Proof technique lens for this topic.</strong> Check whether the paper uses convex duality, entropy first-order conditions, Bayes-plausibility geometry, posterior-separable cost representation, or revealed-preference cycle inequalities.</p>
      <div class="math">
        \[
          \max_{\pi:E_{\pi}[p]=\mu}
          \int v(p)\,d\pi(p)-C(\pi,\mu)
          \quad\leadsto\quad
          \text{FOC, concavification, or dual problem}.
        \]
      </div>
    `,
    "information-acquisition": String.raw`
      <p><strong>Proof technique lens for this topic.</strong> Check for value-of-information comparisons, Blackwell order arguments, envelope methods, equilibrium fixed points, and private-vs-social value decompositions.</p>
    `,
    "optimal-stopping": String.raw`
      <p><strong>Proof technique lens for this topic.</strong> Check for dynamic programming, Snell envelopes, free-boundary/stopping-region arguments, martingale optional sampling, and threshold comparative statics.</p>
      <div class="math">
        \[
          V(\mu)=\max\{G(\mu),\; -c\,dt+\mathbb{E}[V(\mu_{t+dt})\mid\mu_t=\mu]\}.
        \]
      </div>
    `,
    "misspecified-learning": String.raw`
      <p><strong>Proof technique lens for this topic.</strong> Check for KL-minimization, stochastic approximation, Berk-Nash fixed points, martingale convergence of likelihood ratios, and robustness/upper-hemicontinuity arguments.</p>
      <div class="math">
        \[
          \frac1T\sum_{t=1}^T
          \log\frac{q_{\theta}(y_t\mid a_t)}
          {q_{\theta'}(y_t\mid a_t)}
          \to
          -D_{\mathrm{KL}}(p\|q_{\theta})
          +D_{\mathrm{KL}}(p\|q_{\theta'}).
        \]
      </div>
    `,
    "behavioral-learning": String.raw`
      <p><strong>Proof technique lens for this topic.</strong> Check how the paper represents the bias as an operator \(T\), then look for invariant sets, contraction/failure of contraction, monotone likelihood-ratio distortions, or welfare comparisons across biased belief processes.</p>
    `,
    aggregation: String.raw`
      <p><strong>Proof technique lens for this topic.</strong> Check for law of large numbers, likelihood-ratio aggregation, pivotality calculations, no-trade/no-revelation arguments, strategic complementarity, or price-revelation fixed points.</p>
    `,
    persuasion: String.raw`
      <p><strong>Proof technique lens for this topic.</strong> Check for concavification, splitting lemmas, Bayes-plausibility constraints, linear programming duality, dynamic programming, and obedience constraints.</p>
      <div class="math">
        \[
          \operatorname{cav} v(\mu)
          =
          \sup_{\{(\lambda_i,p_i)\}:\sum_i\lambda_i p_i=\mu}
          \sum_i\lambda_i v(p_i).
        \]
      </div>
    `,
  }[primary] || String.raw`
      <p><strong>Proof technique lens for this topic.</strong> Check for the hidden reusable argument: fixed point, envelope, monotonicity, likelihood ratio, martingale, dynamic programming, compactness, or duality.</p>
    `;

  return {
    short: `
      <p>${paper.takeaway}</p>
      <p><strong>Current depth.</strong> This page now uses a topic-specific mathematical reading frame for the paper. Papers marked <strong>Digested</strong> have already been replaced by a paper-specific theorem write-up; queued papers are in the full-reading pipeline.</p>
    `,
    motivation: blueprint.motivation,
    deep: `
      <p><strong>Tags.</strong> ${tagText}.</p>
      ${blueprint.setup}
      ${blueprint.result}
    `,
    example: blueprint.example,
    literature: `
      <p><strong>Literature map.</strong> This paper belongs to ${tagText}. The full digest should locate it along three axes: the benchmark model it changes, the new primitive or theorem it introduces, and later work that can reuse its method.</p>
      <div class="math">
        \[
          \text{benchmark}
          \;\longrightarrow\;
          \text{new modeling object}
          \;\longrightarrow\;
          \text{new learning/information result}.
        \]
      </div>
    `,
    proof: `
      <p><strong>Technique checklist.</strong> The full digest should identify which proof engine does the work: dynamic programming, martingale convergence, likelihood-ratio ordering, fixed points, contraction arguments, Blackwell comparisons, concavification, envelope arguments, compactness, or network limit arguments.</p>
      <p>The reusable proof note should be written as a recipe: define the right object, prove the right inequality or convergence result, and isolate where the paper's economic assumption enters.</p>
      ${techniqueLens}
    `,
    questions: `
      <p><strong>Research comments.</strong> For each paper I will record: the precise problem solved, the fragile assumptions, the natural extension, and at least one possible new paper.</p>
      <div class="math">
        \[
          \text{What breaks if the key object is endogenous, misspecified, dynamic, or networked?}
        \]
      </div>
    `,
  };
}

function splitTechnical(html) {
  const text = html || "";
  const indexOfAny = (labels) => {
    const indexes = labels
      .map((label) => text.indexOf(`<p><strong>${label}</strong>`))
      .filter((index) => index >= 0);
    return indexes.length ? Math.min(...indexes) : -1;
  };

  const literatureStart = indexOfAny(["Contribution to literature.", "What is new."]);
  const proofStart = indexOfAny(["Proof technique."]);
  const questionsStart = indexOfAny(["Problem solved.", "Open questions.", "My comment."]);

  if (literatureStart >= 0 || proofStart >= 0 || questionsStart >= 0) {
    const end = text.length;
    const literatureEndCandidates = [proofStart, questionsStart].filter((index) => index > literatureStart);
    const proofEndCandidates = [questionsStart].filter((index) => index > proofStart);
    return {
      literature: literatureStart >= 0
        ? text.slice(literatureStart, literatureEndCandidates.length ? Math.min(...literatureEndCandidates) : end)
        : "",
      proof: proofStart >= 0
        ? text.slice(proofStart, proofEndCandidates.length ? Math.min(...proofEndCandidates) : end)
        : "",
      questions: questionsStart >= 0 ? text.slice(questionsStart) : "",
    };
  }

  const contribution = text.match(/<p><strong>Contribution to literature\.<\/strong>[\s\S]*?<\/p>/);
  const proof = text.match(/<p><strong>Proof technique\.<\/strong>[\s\S]*?<\/p>/);
  const problem = text.match(/<p><strong>Problem solved\.<\/strong>[\s\S]*?<\/p>/);
  const open = text.match(/<p><strong>Open questions\.<\/strong>[\s\S]*?<\/p>/);
  const comment = text.match(/<p><strong>My comment\.<\/strong>[\s\S]*?<\/p>/);
  return {
    literature: contribution ? contribution[0] : "",
    proof: proof ? proof[0] : "",
    questions: [problem?.[0], open?.[0], comment?.[0]].filter(Boolean).join(""),
  };
}

function extractExample(deep) {
  const marker = "<p><strong>Simple example.</strong>";
  const index = deep.indexOf(marker);
  if (index < 0) return "";
  return deep.slice(index);
}

function removeExample(deep) {
  const marker = "<p><strong>Simple example.</strong>";
  const index = deep.indexOf(marker);
  return index < 0 ? deep : deep.slice(0, index);
}

function digestForPaper(paper) {
  if (!paper.digest) return inferTemplate(paper);
  const technical = splitTechnical(paper.digest.technical);
  return {
    short: `<p>${paper.digest.short}</p>${paper.digest.medium || ""}`,
    motivation: paper.digest.motivation || inferTemplate(paper).motivation,
    deep: removeExample(paper.digest.deep || ""),
    example: paper.digest.example || extractExample(paper.digest.deep || "") || inferTemplate(paper).example,
    literature: technical.literature || inferTemplate(paper).literature,
    proof: technical.proof || inferTemplate(paper).proof,
    questions: technical.questions || paper.digest.technical || inferTemplate(paper).questions,
  };
}

function displayStatus(paper) {
  return paper.status === "Queued" ? "Structured Digest" : paper.status;
}

function deepDigestForPaper(paper) {
  if (!window.DEEP_DIGESTS) return null;
  return window.DEEP_DIGESTS[paper.id] || null;
}

function setDigestMode(mode) {
  const standard = document.querySelector("#standard-digest");
  const deep = document.querySelector("#deep-digest");
  const standardButton = document.querySelector("#show-standard");
  const deepButton = document.querySelector("#show-deep");
  const showDeep = mode === "deep";

  standard.hidden = showDeep;
  deep.hidden = !showDeep;
  standardButton.classList.toggle("active", !showDeep);
  deepButton.classList.toggle("active", showDeep);
  typesetMath();
}

function renderNotFound() {
  document.title = "Paper not found";
  document.querySelector("#paper-title").textContent = "Paper not found";
  document.querySelector("#paper-subtitle").textContent = "Return to the library and choose a paper.";
  document.querySelector("#paper-doi").style.display = "none";
}

function renderPaper() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const paper = PAPERS.find((item) => item.id === id);
  if (!paper) {
    renderNotFound();
    return;
  }

  const digest = digestForPaper(paper);
  document.title = `${paper.title} | Paper Digest`;
  document.querySelector("#paper-title").textContent = paper.title;
  document.querySelector("#paper-subtitle").textContent = `${paper.authors} | ${paper.sourceType ? `${paper.sourceType}: ` : ""}${paper.journal}, ${paper.year}`;
  document.querySelector("#paper-status").textContent = displayStatus(paper);
  document.querySelector("#paper-journal-year").textContent = `${paper.sourceType ? `${paper.sourceType}: ` : ""}${paper.journal}, ${paper.year}`;
  document.querySelector("#paper-takeaway").textContent = paper.takeaway;
  const source = paperUrl(paper);
  const doiLink = document.querySelector("#paper-doi");
  if (source) {
    doiLink.href = source;
    doiLink.textContent = paper.doi ? "DOI" : "Source";
  } else {
    doiLink.style.display = "none";
  }

  const tagRow = document.querySelector("#paper-tags");
  for (const tag of paper.tags) {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tagLabels[tag] || tag;
    tagRow.appendChild(span);
  }

  document.querySelector("#paper-short").innerHTML = digest.short;
  document.querySelector("#paper-motivation").innerHTML = digest.motivation;
  document.querySelector("#paper-deep").innerHTML = digest.deep;
  document.querySelector("#paper-example").innerHTML = digest.example;
  document.querySelector("#paper-literature").innerHTML = digest.literature;
  document.querySelector("#paper-proof").innerHTML = digest.proof;
  document.querySelector("#paper-questions").innerHTML = digest.questions;

  const deepDigest = deepDigestForPaper(paper);
  const deepButton = document.querySelector("#show-deep");
  const deepStatus = document.querySelector("#deep-status");
  if (deepDigest) {
    document.querySelector("#deep-setup").innerHTML = deepDigest.setup;
    document.querySelector("#deep-results").innerHTML = deepDigest.results;
    document.querySelector("#deep-example").innerHTML = deepDigest.example;
    document.querySelector("#deep-literature").innerHTML = deepDigest.literature;
    document.querySelector("#deep-proof").innerHTML = deepDigest.proof;
    document.querySelector("#deep-critique").innerHTML = deepDigest.critique;
    deepButton.disabled = false;
    deepStatus.textContent = "Deep academic digest available.";
  } else {
    document.querySelector("#deep-setup").innerHTML = "";
    document.querySelector("#deep-results").innerHTML = "";
    document.querySelector("#deep-example").innerHTML = "";
    document.querySelector("#deep-literature").innerHTML = "";
    document.querySelector("#deep-proof").innerHTML = "";
    document.querySelector("#deep-critique").innerHTML = "";
    deepButton.disabled = true;
    deepStatus.textContent = "Deep academic digest queued for this paper.";
  }

  document.querySelector("#show-standard").addEventListener("click", () => setDigestMode("standard"));
  deepButton.addEventListener("click", () => {
    if (!deepButton.disabled) setDigestMode("deep");
  });
  setDigestMode(deepDigest ? "standard" : "standard");
  typesetMath();
}

renderPaper();
