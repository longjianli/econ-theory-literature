window.WEEKLY_UPDATE_2026_06_23_DEEP_DIGESTS = {
  "bergemann-heumann-morris-2026-info-mech-integrated": {
    setup: String.raw`
      <p><strong>Source.</strong> <a href="https://arxiv.org/abs/2601.17267" target="_blank" rel="noreferrer">https://arxiv.org/abs/2601.17267</a></p>
      <p><strong>Paper.</strong> Information Design and Mechanism Design: An Integrated Framework. <strong>Authors.</strong> Dirk Bergemann; Tibor Heumann; Stephen Morris. <strong>Venue.</strong> arXiv econ.TH, 2026. <strong>Research family.</strong> information design, mechanism design, screening.</p>
      <h3>Detailed Mathematical Setup</h3>
      <p>The environment is a quasilinear screening problem. A buyer or agent has value \(v\), the designer chooses an information object that determines posterior value information, and a mechanism maps reported or recommended value-relevant information into allocation \(x\) and transfer \(t\).</p>
      <div class="math">
        \[
          v\sim F,\qquad u(v)=v x(v)-t(v),\qquad
          U(v)=\max_{\hat v}\{v x(\hat v)-t(\hat v)\}.
        \]
      </div>
      <p>The paper's key modeling move is to express both design problems in quantile space. Let \(q\in[0,1]\) index values from high to low, and write allocation and value objects as ordered functions. Feasibility becomes a majorization relation: an allocation profile cannot exceed the exogenous inventory in cumulative quantile terms, while an information structure cannot create a posterior-value distribution that violates Bayes plausibility.</p>
      <div class="math">
        \[
          \int_0^z x(q)\,dq \le \int_0^z \bar x(q)\,dq
          \quad\text{for all }z,
          \qquad
          \int_0^1 x(q)\,dq=\int_0^1 \bar x(q)\,dq.
        \]
      </div>
      <p>For information design, the analogous object is a distribution of posterior values or posterior quantiles that is majorized by the prior distribution. This is the quantile form of Bayes plausibility and Blackwell feasibility.</p>
    `,
    results: String.raw`
      <h3>30-Second Thesis</h3>
      <p>The paper gives a common quantile-majorization language for mechanism design and information design. Mechanism design chooses allocations below an inventory majorization frontier; information design chooses posterior distributions below a prior majorization frontier. Joint design couples the two constraints and makes pooling of values and allocations optimal.</p>
      <h3>Main Results</h3>
      <div class="theorem-box">
        <h3>Majorization Reduction</h3>
        <p>In the screening environment, mechanism design and information design both reduce to maximizing a linear functional subject to majorization constraints. The mechanism-design constraint is imposed on allocations; the information-design constraint is imposed on posterior/value distributions.</p>
      </div>
      <div class="theorem-box">
        <h3>Joint Design Pooling</h3>
        <p>When the designer jointly chooses information and the mechanism, the problem has two majorization constraints and a bilinear objective. Optimal joint design pools values and associated allocations.</p>
      </div>
      <p><strong>Informal interpretation.</strong> Information and allocation are substitutes in screening. Revealing finer value information can increase allocative efficiency but also changes rents; pooling can be optimal because it controls both the information content and the allocation distortion at once.</p>
    `,
    example: String.raw`
      <h3>Simple Example</h3>
      <p>Consider a seller with one divisible unit and two value regions, low \(L\) and high \(H\). If the seller only designs a mechanism, monotonicity and inventory constrain \(x_H\ge x_L\) and \(x_H+x_L\le 1\). If the seller only designs information, Bayes plausibility constrains posterior means:</p>
      <div class="math">
        \[
          \lambda m_H+(1-\lambda)m_L=\mathbb{E}[v].
        \]
      </div>
      <p>Joint design lets the seller choose both the posterior split \((m_L,m_H)\) and allocations \((x_L,x_H)\). Full separation is not automatically optimal because it may force high information rents or inefficient allocation gradients. Pooling nearby posterior values can improve the joint objective.</p>
      <h3>Calculation Lens</h3>
      <p>The quantile-majorization test asks whether every upper tail receives no more cumulative allocation or posterior mass than the feasible frontier permits. The proof then becomes a comparison of areas under ordered curves rather than a signal-by-signal construction.</p>
    `,
    literature: String.raw`
      <h3>Relation To Literature</h3>
      <p>The mechanism-design side connects to Myerson-style screening, quantile methods, and ironing. The information-design side connects to Kamenica-Gentzkow persuasion, Bayes correlated equilibrium, and the Bergemann-Morris comparison of information structures. The paper's contribution is not another isolated persuasion application; it shows that the feasibility mathematics of screening and information design share the same majorization backbone.</p>
      <p>Relative to standard concavification, the paper emphasizes ordered distributions and majorization. Relative to standard screening, it makes the information structure endogenous rather than treating types as exogenously observed or reported.</p>
    `,
    proof: String.raw`
      <h3>Proof Techniques</h3>
      <p><strong>Quantile transformation.</strong> Rewrite values, allocations, and posterior distributions as monotone quantile functions. This removes irrelevant labels and exposes cumulative feasibility inequalities.</p>
      <p><strong>Majorization.</strong> Use weak majorization to encode inventory feasibility and Bayes-plausible information. The proof repeatedly compares integrals over upper quantile sets.</p>
      <p><strong>Linear functional reduction.</strong> Once objects are ordered, the designer's objective becomes a linear functional over the feasible distributional object. This gives a reusable recipe: transform to quantiles, state the majorization frontier, then solve the induced linear program.</p>
      <p><strong>Secondary trick.</strong> Pooling follows from looking for intervals where the majorization constraint binds in aggregate rather than pointwise. This is analogous to ironing in screening and can be reused in information design problems with monotonicity or rank constraints.</p>
    `,
    critique: String.raw`
      <h3>Open Questions And New Paper Ideas</h3>
      <p><strong>Open questions.</strong> How robust is the pooling result with multidimensional types? What if the designer is uncertain about the prior? Can the majorization approach handle endogenous costly information acquisition by agents before screening?</p>
      <p><strong>Possible new paper idea.</strong> Study robust integrated information/mechanism design when the prior distribution is only known up to a Wasserstein or likelihood-ratio neighborhood. The conjecture is that prior ambiguity creates coarser pooling regions, with majorization constraints replaced by robust majorization bands.</p>
      <p><strong>Limitation to track.</strong> The quantile approach is powerful in ordered one-dimensional environments. The main technical frontier is preserving this clarity when type spaces or allocations are multidimensional.</p>
    `,
  },
  "sezer-2026-info-design-uncertain-utilities": {
    setup: String.raw`
      <p><strong>Source.</strong> <a href="https://arxiv.org/abs/2606.22157" target="_blank" rel="noreferrer">https://arxiv.org/abs/2606.22157</a></p>
      <p><strong>Paper.</strong> Information Design under Uncertain Utilities: Probabilistic and CVaR Approaches. <strong>Author.</strong> Furkan Sezer. <strong>Venue.</strong> arXiv, 2026. <strong>Research family.</strong> robust information design.</p>
      <h3>Detailed Mathematical Setup</h3>
      <p>A designer chooses an information policy or recommendation rule in a game where agents' payoff coefficients are structurally uncertain. The state is \(\theta\), recommendations/actions are \(a\), and utility coefficients are \(\beta\).</p>
      <div class="math">
        \[
          u_i(a_i,a_{-i},\theta;\beta_i),
          \qquad
          \beta_i\in B_i\ \text{or}\ \beta_i\sim P_i.
        \]
      </div>
      <p>Standard BCE obedience requires each recommended action to beat every deviation. Here obedience must be protected against uncertainty in \(\beta_i\), so the design embeds a calibration or corrector policy.</p>
      <div class="math">
        \[
          \mathbb{E}\left[u_i(a_i,a_{-i},\theta;\beta_i)
          -u_i(a_i',a_{-i},\theta;\beta_i)\mid a_i\right]\ge 0.
        \]
      </div>
      <p>The designer then asks for this inequality to hold with high probability or under a tail-risk criterion such as CVaR.</p>
    `,
    results: String.raw`
      <h3>30-Second Thesis</h3>
      <p>The paper robustifies information design when the designer is unsure about utility coefficients. It introduces calibrated BCE and shows that, in linear-quadratic-Gaussian environments, probabilistic and CVaR versions of the design problem become tractable conic programs.</p>
      <h3>Main Results</h3>
      <div class="theorem-box">
        <h3>Calibrated BCE</h3>
        <p>A calibrated BCE augments the standard Bayes-correlated-equilibrium obedience system with a corrector policy that preserves incentive compatibility under structural utility uncertainty.</p>
      </div>
      <div class="theorem-box">
        <h3>Convex Reformulation</h3>
        <p>For linear-quadratic-Gaussian primitives, probabilistic robust design admits a second-order cone formulation, while CVaR robust design admits a semidefinite formulation under the paper's feasibility conditions.</p>
      </div>
      <p><strong>Economic interpretation.</strong> Probabilistic design protects the recommendation rule against likely utility-coefficient realizations. CVaR design pays more attention to adverse tail realizations and therefore tends to cap risky cross-agent action covariance more tightly.</p>
    `,
    example: String.raw`
      <h3>Simple Example</h3>
      <p>A platform recommends portfolio exposure \(a_i\) after observing a signal about asset payoff \(\theta\). Investor \(i\)'s unknown risk-aversion coefficient is \(\beta_i\):</p>
      <div class="math">
        \[
          u_i(a_i,\theta;\beta_i)
          =
          a_i\mathbb{E}[\theta\mid s]
          -
          \frac{\beta_i}{2}a_i^2.
        \]
      </div>
      <p>If the platform designs recommendations for a point estimate \(\hat\beta_i\), high-\(\beta_i\) investors may prefer to deviate to lower exposure. A chance-constrained design requires this incentive failure to be rare; a CVaR design penalizes the average loss in the bad tail.</p>
      <div class="math">
        \[
          \Pr\{\Delta_i(a_i,a_i';\beta_i)\ge 0\}\ge 1-\alpha,
          \qquad
          \operatorname{CVaR}_{\alpha}[-\Delta_i]\le 0.
        \]
      </div>
    `,
    literature: String.raw`
      <h3>Relation To Literature</h3>
      <p>The paper sits between Bayes correlated equilibrium, robust persuasion, and robust optimization. It differs from classical information design by relaxing designer certainty about preferences, and it differs from generic robust optimization by keeping the obedience/recommendation structure of BCE.</p>
      <p>The finance example connects the theory to information aggregation and portfolio recommendation: the designer is not merely forecasting the state but shaping an action distribution whose incentive compatibility depends on private or uncertain utility parameters.</p>
    `,
    proof: String.raw`
      <h3>Proof Techniques</h3>
      <p><strong>Obedience as random inequality.</strong> Treat incentive compatibility as an inequality indexed by uncertain coefficients. This turns the BCE feasibility problem into a robust feasibility problem.</p>
      <p><strong>Conic reformulation.</strong> In LQG environments, obedience gaps become affine or quadratic functions of Gaussian objects. Chance constraints can be represented with second-order cones, and CVaR/tail constraints can be represented with semidefinite restrictions.</p>
      <p><strong>Secondary trick.</strong> Separate calibration from welfare maximization. The corrector policy absorbs utility uncertainty, letting the main information policy remain close to a revelation-principle object.</p>
    `,
    critique: String.raw`
      <h3>Open Questions And New Paper Ideas</h3>
      <p><strong>Open questions.</strong> What if agents learn or manipulate their apparent utility coefficients? Can the approach handle non-Gaussian utility uncertainty or ambiguity about the state distribution at the same time? How should welfare be evaluated when the designer's uncertainty is about preferences rather than only beliefs?</p>
      <p><strong>Possible new paper idea.</strong> Build a dynamic calibrated-BCE model where the designer learns utility coefficients from deviations and gradually relaxes robust constraints. The main theorem would characterize when experimentation about preferences is worth the short-run loss from conservative recommendations.</p>
      <p><strong>Limitation to track.</strong> The convex reformulations rely on strong LQG structure. The conceptual contribution is broader than that computational tractability result, but applications outside LQG may need approximation or scenario methods.</p>
    `,
  },
  "2025-making-decisions-under-model-misspecification": {
    setup: String.raw`
      <p><strong>Source.</strong> <a href="https://doi.org/10.1093/restud/rdaf046" target="_blank" rel="noreferrer">https://doi.org/10.1093/restud/rdaf046</a></p>
      <p><strong>Paper.</strong> Making Decisions Under Model Misspecification. <strong>Authors.</strong> Simone Cerreia-Vioglio; Lars Peter Hansen; Fabio Maccheroni; Massimo Marinacci. <strong>Venue.</strong> Review of Economic Studies, published online 2025, volume 93 issue 2 in 2026.</p>
      <h3>Source-Specific Setup</h3>
      <p>The decision maker chooses acts \(f:S\to X\) in an Anscombe-Aumann environment. She has a set \(Q\) of structured probabilistic models, each with substantive interpretation, but she is concerned that none is exactly correct. To represent possible misspecification, she also contemplates unstructured models \(p\in\Delta\).</p>
      <div class="math">
        \[
          Q\subseteq \Delta(S),\qquad
          p\in\Delta(S),\qquad
          f:S\to X.
        \]
      </div>
      <p>The central object is a statistical set distance from an unstructured model \(p\) to the structured set \(Q\). This distance is zero on \(Q\) and positive away from it, so nearby unstructured models are treated as plausible misspecifications.</p>
      <div class="math">
        \[
          C(p,Q)=\inf_{q\in Q} c(p,q),
        \]
      </div>
      <p>When \(c\) is relative entropy, the criterion becomes an entropic protective-belt version of max-min decision theory.</p>
    `,
    results: String.raw`
      <h3>30-Second Thesis</h3>
      <p>The paper gives axiomatic foundations for decisions when models are useful approximations rather than candidates guaranteed to contain the truth. The decision maker distinguishes structured models from unstructured misspecification alternatives and ranks acts using a conservative criterion that penalizes unstructured models by distance from the structured set.</p>
      <h3>Main Criterion</h3>
      <div class="theorem-box">
        <h3>Misspecification-Sensitive Variational Criterion</h3>
        <p>A behavioral preference can be represented by a cautious minimization over unstructured models, where the payoff under \(p\) is penalized by the statistical set distance from \(p\) to \(Q\):</p>
        <div class="math">
          \[
            V_Q(f)
            =
            \min_{p\in\Delta}
            \left\{
              \mathbb{E}_p[u(f)]
              +
              C(p,Q)
            \right\}.
          \]
        </div>
      </div>
      <p>In the entropic case, this can be read as an outer minimization over structured models and an inner multiplier-robustness problem around each structured model. The index governing the entropy penalty measures fear of misspecification: lower tolerance means more weight on nearby adverse unstructured models.</p>
    `,
    example: String.raw`
      <h3>Climate-Policy Example</h3>
      <p>A policymaker has a set \(Q\) of structured climate-economy models. Each model is interpretable and scientifically motivated, but the policymaker does not believe any model is literally true. A carbon policy \(f\) produces consequences across states \(s\).</p>
      <div class="math">
        \[
          V_Q(f)=
          \min_p
          \left[
            \mathbb{E}_p u(f(s))+\lambda D(p\|Q)
          \right],
          \qquad
          D(p\|Q)=\inf_{q\in Q}D_{\mathrm{KL}}(p\|q).
        \]
      </div>
      <p>If \(p\) is close to a structured climate model, it receives substantial attention in the minimization. If it is statistically remote from every structured model, the distance penalty reduces its influence. Thus the decision maker is robust to misspecification without treating every arbitrary distribution as equally credible.</p>
    `,
    literature: String.raw`
      <h3>Relation To Literature</h3>
      <p>The paper extends Waldian max-min decision theory by removing the assumption that the correct model lies in the posited model set. It also extends Hansen-Sargent multiplier preferences by allowing a set of structured models and a surrounding belt of unstructured misspecification alternatives. The two-preference framework connects to Gilboa, Maccheroni, Marinacci, and Schmeidler on objective and subjective rationality.</p>
      <p>For this dashboard, the paper is important because it gives decision-theoretic foundations for misspecification concerns that are not generated by learning dynamics. It complements Berk-Nash and misspecified learning papers: those ask what false model agents converge to; this paper asks how a decision maker should act when she already knows her structured models may be approximations.</p>
    `,
    proof: String.raw`
      <h3>Proof Techniques</h3>
      <p><strong>Two-preference representation.</strong> The paper distinguishes a possibly incomplete mental preference from the complete behavioral preference used for choice. This lets the axioms express cautious completion under model misspecification.</p>
      <p><strong>Set-distance construction.</strong> A Hausdorff-style statistical distance converts pairwise divergence \(c(p,q)\) into distance from an unstructured model \(p\) to a structured model set \(Q\). This is the technical bridge from model ambiguity to model misspecification.</p>
      <p><strong>Variational duality.</strong> In the entropic case, exchanging minimization order links the new criterion to multiplier preferences around each structured model. This recovers tractability while preserving the interpretation that unstructured models are a protective belt.</p>
      <p><strong>Secondary trick.</strong> Track the limiting cases: if the penalty is infinite outside \(Q\), the criterion collapses to max-min over structured models; if nearby unstructured models get finite penalty, the decision maker becomes misspecification sensitive.</p>
    `,
    critique: String.raw`
      <h3>Open Questions And New Paper Ideas</h3>
      <p><strong>Open questions.</strong> How should the structured set \(Q\) be chosen or learned? Can observed choices identify misspecification fear separately from ambiguity aversion? How does the criterion behave in dynamic environments where today's act changes tomorrow's model set?</p>
      <p><strong>Possible new paper idea.</strong> Combine this decision criterion with endogenous information acquisition: before choosing \(f\), the decision maker can pay to refine either the structured model set \(Q\) or the distance penalty \(C(p,Q)\). The resulting theory would separate learning about model parameters from learning about model misspecification.</p>
      <p><strong>Limitation to track.</strong> The framework is normative and takes \(Q\) as given. For behavioral learning applications, one still needs a theory of how agents arrive at their structured models and when they revise them.</p>
    `,
  },
};

(function addWeeklyUpdateDeepDigests() {
  window.DEEP_DIGESTS = Object.assign(
    window.DEEP_DIGESTS || {},
    window.WEEKLY_UPDATE_2026_06_23_DEEP_DIGESTS
  );
})();
