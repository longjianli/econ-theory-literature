const PAPERS = [
  {
    id: "engh-2026-ri-arbitrary-choice",
    title: "On Rational Inattention with Arbitrary Choice Sets",
    authors: "Chris Engh",
    journal: "arXiv",
    year: 2026,
    sourceType: "Working paper",
    url: "https://arxiv.org/abs/2603.15548",
    status: "Digested",
    tags: ["working-paper", "rational-inattention", "information-acquisition", "optimal-transport"],
    takeaway: "Recasts rational inattention as a nested regularized optimal transport problem and extends logit-style RI results to arbitrary choice sets.",
    digest: {
      short: "Engh shows that finite rational inattention can be read as a nested regularized optimal transport problem. The paper takes the familiar Shannon rational-inattention logic behind Matejka-McKay logit choice and Caplin-Dean-Leahy consideration, then extends it to arbitrary choice sets by using the geometry of entropic optimal transport. The useful takeaway is that RI is not only a discrete-choice model; it is also an allocation problem that transports prior probability mass into posterior/action mass under an entropy penalty.",
      motivation: `
        <p><strong>Motivation.</strong> Real people often face choice sets that are not neat finite menus with symmetric alternatives: apartments, job offers, routes, research projects, investment portfolios, medical treatments. Classical logit-style rational inattention is very tractable for finite discrete choices, but many economically important choices live in irregular or very large spaces.</p>
        <p><strong>Reality example.</strong> A household choosing where to live does not simply choose among three labeled options. It searches over a city, learns about neighborhoods, commute times, rents, school quality, and amenities. The attention problem resembles moving probability mass from uncertain states to possible choices, with an information friction that discourages overly sharp matching.</p>
        <p><strong>Implication.</strong> The optimal-transport view says that rational attention is a disciplined way to couple states with actions. This makes RI portable to richer choice spaces and gives theorists a mathematical toolkit already developed for transport, entropy regularization, and Sinkhorn-type fixed points.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Standard rational inattention chooses an information structure and then an action. In the finite Shannon case, the induced conditional choice probabilities often satisfy a logit form. Engh's insight is that the same object can be represented as an entropy-regularized transport problem: choose a joint distribution over states and choices that respects the prior over states and pays both decision loss and information cost.</p>
        <p><strong>Main result in words.</strong> The paper rewrites rational inattention as a nested regularized optimal transport problem, recovers the main Matejka-McKay and Caplin-Dean-Leahy results, and extends them to arbitrary choice sets. Instead of solving separately for signals, posteriors, and choices, one can solve for an optimal coupling between states and actions.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>Let \(\Omega\) be a state space with prior \(\mu\), and let \(X\) be an arbitrary choice set. The decision maker's payoff from choosing \(x\in X\) in state \(\omega\in\Omega\) is \(u(x,\omega)\). Equivalently, define loss \(c(\omega,x)=-u(x,\omega)\).</p>
        <div class="math">
          \[
            \omega\sim\mu,\qquad x\in X,\qquad
            u:X\times\Omega\to\mathbb{R}.
          \]
        </div>
        <p>An information policy can be represented by a conditional distribution \(q(dx\mid \omega)\) over actions after the information process has been chosen. The induced unconditional choice distribution is</p>
        <div class="math">
          \[
            \nu(dx)=\int_{\Omega}q(dx\mid \omega)\,\mu(d\omega).
          \]
        </div>
        <p>The Shannon-style information cost is the mutual information between states and choices:</p>
        <div class="math">
          \[
            I(\omega;x)
            =
            \int_{\Omega}\int_X
            \log\frac{q(dx\mid\omega)}{\nu(dx)}
            q(dx\mid\omega)\mu(d\omega).
          \]
        </div>
        <p>Thus the rational-inattention problem can be written as</p>
        <div class="math">
          \[
            \max_{q}
            \left\{
              \int_{\Omega}\int_X u(x,\omega)q(dx\mid\omega)\mu(d\omega)
              -
              \lambda I(\omega;x)
            \right\}.
          \]
        </div>
        <h3>2. Transport Form</h3>
        <p>Let \(\gamma(d\omega,dx)=q(dx\mid\omega)\mu(d\omega)\) be a joint distribution over states and choices. The first marginal of \(\gamma\) must be \(\mu\), while the second marginal is the endogenous choice distribution \(\nu\). The objective becomes a regularized transport problem:</p>
        <div class="math">
          \[
            \min_{\gamma:\gamma_{\Omega}=\mu}
            \left\{
              \int_{\Omega\times X} c(\omega,x)\,d\gamma(\omega,x)
              +
              \lambda
              D_{\mathrm{KL}}\!\left(\gamma\,\middle\|\,\mu\otimes\gamma_X\right)
            \right\}.
          \]
        </div>
        <p>The nesting comes from the fact that the choice marginal \(\gamma_X\) is itself chosen. Conditional on a candidate unconditional choice distribution \(\nu\), the inner problem is entropic optimal transport between \(\mu\) and \(\nu\). The outer problem chooses the best \(\nu\).</p>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>RI As Nested Entropic Transport</h3>
          <p>The finite Shannon rational-inattention problem is equivalent to a nested entropy-regularized optimal transport problem. This equivalence recovers the logit-style conditional choice form and extends the RI representation to arbitrary choice sets \(X\).</p>
          <div class="math">
            \[
              q^*(dx\mid\omega)
              \propto
              \exp\!\left(\frac{u(x,\omega)}{\lambda}\right)\nu^*(dx),
            \]
          </div>
          <p>where \(\nu^*\) is the endogenous unconditional action distribution that solves the outer fixed-point problem.</p>
        </div>
        <p>The formula is the continuous-choice analogue of Matejka-McKay's modified logit: actions with higher state-contingent payoff are exponentially more likely, but this likelihood is tilted by the baseline frequency \(\nu^*\). Rarely useful actions receive little unconditional attention.</p>
      `,
      example: String.raw`
        <h3>Location Choice Example</h3>
        <p>A worker chooses a location \(x\) on a line. The state \(\omega\) is the true ideal location, and utility is quadratic:</p>
        <div class="math">
          \[
            u(x,\omega)=-(x-\omega)^2.
          \]
        </div>
        <p>If information were free, the worker would choose \(x=\omega\). With costly information, she chooses a noisy mapping from \(\omega\) to \(x\). The optimal conditional choice density has the form</p>
        <div class="math">
          \[
            q^*(x\mid\omega)
            \propto
            \exp\!\left(-\frac{(x-\omega)^2}{\lambda}\right)\nu^*(x).
          \]
        </div>
        <p>When \(\lambda\) is small, the worker pays attention and choices concentrate near the true ideal point. When \(\lambda\) is large, the worker uses a coarser rule and the choice distribution depends more on the unconditional popularity of locations.</p>
        <p>The transport interpretation is concrete: the prior distribution of possible ideal locations must be transported into a distribution of actual chosen locations. The entropy penalty prevents a perfectly sharp transport map unless the value of precision is high enough.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper connects Matejka-McKay rational inattention, Caplin-Dean-Leahy consideration, and entropic optimal transport. Its contribution is partly unification and partly extension: it shows that the logit/RI structure is a special case of a broader transport geometry.</p>
        <p><strong>Proof technique.</strong> The central technique is to change variables from information structures to couplings. Instead of optimizing over signals and posterior beliefs directly, the proof studies joint distributions \(\gamma\) over states and actions, with the prior as a marginal constraint. This converts rational inattention into a transport problem with a KL regularizer.</p>
        <p><strong>Useful secondary technique.</strong> A very useful trick is the inner-outer decomposition: fix the unconditional action distribution \(\nu\), solve an entropic transport problem, then optimize over \(\nu\). This decomposition is likely useful for RI models with continuous actions, large menus, or numerical computation.</p>
        <p><strong>Problem solved.</strong> The paper solves a tractability problem. Classical finite RI gives beautiful logit formulas, but it is less obvious how to handle arbitrary choice sets. The transport representation gives a clean mathematical foundation for doing so.</p>
        <p><strong>Open questions.</strong> Natural extensions include dynamic transport RI, social learning with transport-based attention, equilibrium models where many agents' attention policies determine \(\nu\), and empirical estimation using Sinkhorn algorithms.</p>
        <p><strong>My comment.</strong> I think the paper is especially useful as a methods bridge. A promising new paper could use this representation to study endogenous consideration in continuous product spaces, where firms choose product attributes and consumers choose transport-regularized attention.</p>
      `,
    },
  },
  {
    id: "ui-2026-alpha-divergence-info",
    title: "Information Acquisition with Alpha-Divergence Costs",
    authors: "Takashi Ui",
    journal: "arXiv",
    year: 2026,
    sourceType: "Working paper",
    url: "https://arxiv.org/abs/2605.28026",
    status: "Digested",
    tags: ["working-paper", "information-acquisition", "rational-inattention", "alpha-divergence"],
    takeaway: "Introduces alpha-divergence information costs that nest KL, reverse KL, and Hellinger-style costs while preserving tractability.",
    digest: {
      short: "Ui introduces a one-parameter family of information-acquisition costs based on alpha-divergence. This nests familiar cases such as KL, reverse KL, and squared Hellinger distance while preserving a tractable choice-probability formula. The main economic point is that different information-cost geometries produce different forms of stochastic choice; the Shannon/Matejka-McKay logit is one member of a broader family.",
      motivation: `
        <p><strong>Motivation.</strong> Shannon mutual information is tractable, but it is only one way to measure cognitive or statistical difficulty. In reality, people may find it easier to rule out bad options than to identify the best one, or easier to confirm a familiar hypothesis than to discover a surprising one. Different asymmetries call for different information costs.</p>
        <p><strong>Reality example.</strong> A doctor choosing a diagnosis may find it cheap to detect common disease patterns but costly to distinguish rare conditions. An investor may find it easy to screen out obviously bad assets but hard to rank the top few. These are not symmetric Shannon-like attention problems.</p>
        <p><strong>Implication.</strong> Alpha-divergence lets the theorist tune the curvature and asymmetry of information costs while keeping the model solvable. This gives richer behavioral predictions without abandoning the discipline of optimal information acquisition.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> In a standard rational-inattention model, the agent chooses a signal and pays a cost tied to mutual information. Ui replaces this cost with a family derived from \(\alpha\)-divergence. The resulting optimal choice probabilities belong to a \(q\)-exponential family, reducing to the familiar modified logit in the KL case.</p>
        <p><strong>Main result in words.</strong> The paper characterizes optimal information acquisition under alpha-divergence costs and obtains closed-form expressions using Amari's alpha-integration. The model nests KL divergence, reverse KL divergence, and Hellinger-style costs as special cases.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>Let \(\Omega\) be a finite state space and \(A\) a finite action set. The decision maker chooses an information structure that induces conditional choice probabilities \(p(a\mid\omega)\). The prior is \(\mu\), and the unconditional probability of action \(a\) is</p>
        <div class="math">
          \[
            p(a)=\sum_{\omega\in\Omega}\mu(\omega)p(a\mid\omega).
          \]
        </div>
        <p>Payoff is \(u(a,\omega)\). The decision maker solves</p>
        <div class="math">
          \[
            \max_{p(a\mid\omega)}
            \sum_{\omega}\mu(\omega)\sum_a p(a\mid\omega)u(a,\omega)
            -
            \lambda C_{\alpha}(p).
          \]
        </div>
        <h3>2. Alpha-Divergence Cost</h3>
        <p>The information cost is built from an \(\alpha\)-divergence between the joint distribution of states and actions and the product of its marginals. A canonical expression is</p>
        <div class="math">
          \[
            C_{\alpha}
            =
            D_{\alpha}\!\left(
              \mu(\omega)p(a\mid\omega)
              \,\middle\|\,
              \mu(\omega)p(a)
            \right).
          \]
        </div>
        <p>Different values of \(\alpha\) change how the cost penalizes departures from independence between states and actions. Important special cases include</p>
        <div class="math">
          \[
            \alpha=-1:\ \text{KL divergence},\qquad
            \alpha=1:\ \text{reverse KL},\qquad
            \alpha=0:\ \text{squared Hellinger form}.
          \]
        </div>
        <h3>3. Optimal Choice Probabilities</h3>
        <p>The first-order conditions imply a generalized logit form. Let \(\exp_q(\cdot)\) denote the \(q\)-exponential transformation associated with the alpha-divergence geometry. Then optimal conditional choice probabilities take the form</p>
        <div class="math">
          \[
            p^*(a\mid\omega)
            =
            \frac{
              p^*(a)\,
              \exp_q\!\left(u(a,\omega)/\lambda\right)
            }{
              \sum_{b\in A}
              p^*(b)\,
              \exp_q\!\left(u(b,\omega)/\lambda\right)
            }.
          \]
        </div>
        <p>The unconditional probabilities \(p^*(a)\) are determined by consistency:</p>
        <div class="math">
          \[
            p^*(a)=\sum_{\omega}\mu(\omega)p^*(a\mid\omega).
          \]
        </div>
        <div class="theorem-box">
          <h3>Alpha-Divergence RI Characterization</h3>
          <p>Under alpha-divergence information costs, optimal information acquisition is characterized by a closed-form generalized-logit system. In the KL special case, the \(q\)-exponential becomes the ordinary exponential and the system reduces to the modified logit of Matejka and McKay.</p>
        </div>
      `,
      example: String.raw`
        <h3>Medical Diagnosis Example</h3>
        <p>There are two diagnoses, \(a\in\{L,H\}\), and two states, \(\omega\in\{l,h\}\). The doctor receives payoff \(1\) for matching the state and \(0\) otherwise:</p>
        <div class="math">
          \[
            u(a,\omega)=\mathbf{1}\{a=\omega\}.
          \]
        </div>
        <p>Under Shannon/KL costs, the doctor's probability of choosing the high diagnosis in state \(h\) follows a logit-like formula. Under alpha-divergence costs, it follows a generalized \(q\)-logit formula:</p>
        <div class="math">
          \[
            p^*(H\mid h)
            =
            \frac{p^*(H)\exp_q(1/\lambda)}
            {p^*(H)\exp_q(1/\lambda)+p^*(L)\exp_q(0)}.
          \]
        </div>
        <p>If the cost geometry makes rare-event discrimination expensive, the model predicts under-diagnosis of rare conditions even when the doctor is optimally attentive. If the geometry instead makes false alarms expensive, it predicts cautious confirmation behavior.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper extends rational inattention beyond Shannon mutual information while keeping closed-form tractability. It connects Matejka-McKay RI, Bloedel-style \(f\)-information costs, Amari's information geometry, Tsallis \(q\)-exponentials, and generalized discrete-choice models.</p>
        <p><strong>Proof technique.</strong> The key technique is to use alpha-divergence geometry to derive first-order conditions that can be solved through alpha-integration. This replaces the ordinary exponential/log-sum-exp duality of Shannon RI with a \(q\)-exponential counterpart.</p>
        <p><strong>Useful secondary technique.</strong> A reusable method is to characterize attention through the divergence between the joint distribution and the product of marginals. This keeps the object economically interpretable as dependence between states and actions even when the divergence is not KL.</p>
        <p><strong>Problem solved.</strong> The paper solves the tension between flexibility and tractability. Many non-Shannon costs become hard to solve; alpha-divergence gives a rich one-parameter family that still yields useful formulas.</p>
        <p><strong>Open questions.</strong> Good extensions include empirical identification of \(\alpha\), dynamic alpha-divergence attention, social learning where agents have heterogeneous \(\alpha\), and welfare comparisons across cost geometries.</p>
        <p><strong>My comment.</strong> This is a natural next step for RI. A promising paper could ask whether different behavioral biases map to different \(\alpha\) values: confirmation bias, salience, and neglect of rare states may be representable as different information geometries rather than ad hoc mistakes.</p>
      `,
    },
  },
  {
    id: "esponda-pouzo-2026-misspecification",
    title: "Learning and Equilibrium under Model Misspecification",
    authors: "Ignacio Esponda; Demian Pouzo",
    journal: "arXiv",
    year: 2026,
    sourceType: "Working paper / chapter",
    url: "https://arxiv.org/abs/2601.09891",
    status: "Digested",
    tags: ["working-paper", "misspecified-learning", "learning"],
    takeaway: "A unified treatment of misspecified learning with endogenous action-dependent data in single-agent and strategic environments.",
    digest: {
      short: "This chapter is a map of the misspecified-learning program. The core idea is that agents optimize and update inside a subjective model that may not contain the true data-generating process. Long-run beliefs concentrate on the models that best fit the data generated by the agent's own behavior, usually via Kullback-Leibler minimization. The endogenous-data problem is the key: what the agent learns depends on what she does.",
      motivation: `
        <p><strong>Motivation.</strong> Many real mistakes persist not because people ignore data, but because they interpret data through the wrong model. A CEO, trader, voter, or policymaker may update rationally while still missing the true causal mechanism.</p>
        <p><strong>Reality example.</strong> A firm that believes low sales are caused only by price may keep lowering price, never testing whether advertising, product design, or market segment is the real issue. Its data are endogenous to its own mistaken policy.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Correct Bayesian learning asks whether beliefs converge to the truth. Misspecified learning asks a different question: if the truth is not in the agent's model class, which false model survives learning, and what behavior does that false model justify?</p>
        <p><strong>Central feedback loop.</strong> Actions generate data, data select the best-fitting subjective model, and the selected subjective model justifies future actions. This loop is the basis of Berk-Nash equilibrium and related long-run solution concepts.</p>
      `,
      deep: String.raw`
        <h3>1. Basic Statistical Setup</h3>
        <p>There is an objective data-generating process and a subjective model class. Let \(a\in A\) be an action and \(y\in Y\) an observed consequence.</p>
        <div class="math">
          \[
            \text{True distribution:}\quad y\sim p(\cdot\mid a).
          \]
          \[
            \text{Subjective model:}\quad y\sim q_{\theta}(\cdot\mid a),\qquad \theta\in\Theta.
          \]
        </div>
        <p>If the model is correctly specified, some \(\theta_0\) satisfies \(q_{\theta_0}(\cdot\mid a)=p(\cdot\mid a)\). Under misspecification, no such parameter exists for the relevant actions.</p>
        <h3>2. Best-Fitting Beliefs</h3>
        <p>The statistical foundation is Berk's theorem: Bayesian posteriors under misspecification concentrate on parameters minimizing KL divergence from the truth. With fixed action \(a\), the pseudo-true parameter set is</p>
        <div class="math">
          \[
            \Theta^*(a)
            =
            \arg\min_{\theta\in\Theta}
            D_{\mathrm{KL}}\!\left(p(\cdot\mid a)\,\|\,q_{\theta}(\cdot\mid a)\right),
          \]
          \[
            D_{\mathrm{KL}}(p\|q_{\theta})
            =
            \int_Y
            \log\frac{p(y\mid a)}{q_{\theta}(y\mid a)}
            p(y\mid a)\,dy.
          \]
        </div>
        <p>The hard economics enters when \(a\) is not fixed. If the agent changes actions over time, then the data are action-dependent and the KL objective is weighted by the empirical frequency of actions.</p>
        <div class="math">
          \[
            K(\theta;\sigma)
            =
            \sum_{a\in A}\sigma(a)
            D_{\mathrm{KL}}\!\left(p(\cdot\mid a)\,\|\,q_{\theta}(\cdot\mid a)\right),
          \]
          \[
            \Theta^*(\sigma)=\arg\min_{\theta\in\Theta}K(\theta;\sigma).
          \]
        </div>
        <h3>3. Equilibrium Logic</h3>
        <p>A long-run outcome must satisfy two requirements. First, beliefs put probability only on best-fitting subjective parameters given the data generated by behavior. Second, behavior is optimal under those beliefs.</p>
        <div class="theorem-box">
          <h3>Misspecified Learning Fixed Point</h3>
          <div class="math">
            \[
              \operatorname{supp}(\beta)\subseteq\Theta^*(\sigma),
            \]
            \[
              \sigma\in\Delta\!\left(
                \arg\max_{a\in A}
                \int_{\Theta}U(a,\theta)\,d\beta(\theta)
              \right).
            \]
          </div>
        </div>
        <p>This is the basic equilibrium skeleton behind Berk-Nash: the agent's strategy determines what she observes; what she observes determines the best-fitting misspecified belief; that belief rationalizes the strategy.</p>
      `,
      example: String.raw`
        <h3>Simple Example: Action-Dependent Feedback</h3>
        <p>A firm chooses \(a\in\{Safe,Risky\}\). Demand is high or low. The true probability of high demand depends on both the action and an omitted market state \(z\), but the firm incorrectly believes demand depends only on a one-dimensional parameter \(\theta\).</p>
        <div class="math">
          \[
            p(y=1\mid a,z)\neq q_{\theta}(y=1\mid a)
            \quad\text{for every }\theta.
          \]
        </div>
        <p>If the firm mostly chooses Safe, then it mostly learns which \(\theta\) best explains Safe outcomes:</p>
        <div class="math">
          \[
            \Theta^*(Safe)
            =
            \arg\min_{\theta}
            D_{\mathrm{KL}}\!\left(p(\cdot\mid Safe)\,\|\,q_{\theta}(\cdot\mid Safe)\right).
          \]
        </div>
        <p>But this belief may make Risky look unattractive, so the firm never collects the data that would reveal its mistake about Risky. Misspecified learning can therefore create self-confirming false pessimism or false optimism.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> This chapter organizes a large literature connecting Berk's Bayesian consistency under misspecification to economic environments with endogenous data. It sits behind Berk-Nash equilibrium, self-confirming equilibrium, and recent work on long-run learning with wrong models.</p>
        <p><strong>Proof technique.</strong> The reusable proof move is likelihood-ratio/KL asymptotics. For two subjective parameters \(\theta,\theta'\), log posterior odds evolve as accumulated log likelihood ratios:</p>
        <div class="math">
          \[
            \log\frac{\beta_t(\theta)}{\beta_t(\theta')}
            =
            \log\frac{\beta_0(\theta)}{\beta_0(\theta')}
            +
            \sum_{\tau &lt; t}
            \log
            \frac{q_{\theta}(y_{\tau}\mid a_{\tau})}
                 {q_{\theta'}(y_{\tau}\mid a_{\tau})}.
          \]
        </div>
        <p>After dividing by \(t\), laws of large numbers turn this into a comparison of KL divergences weighted by action frequencies. This is the essential technique: posterior survival equals KL fitness under the data induced by behavior.</p>
        <p><strong>Useful secondary technique.</strong> Separate the statistical step from the optimization step. First characterize \(\Theta^*(\sigma)\); then impose optimality of \(\sigma\). This decomposition is extremely useful for writing new misspecified-learning papers.</p>
        <p><strong>Problem solved.</strong> The chapter clarifies how to reason about learning when agents are Bayesian but wrong, especially when actions determine the data they get.</p>
        <p><strong>Open questions.</strong> Natural extensions include costly experimentation under misspecification, social learning when agents have heterogeneous subjective models, and welfare comparisons across different wrong models. A promising project is to combine rational inattention with misspecification: the agent may optimally avoid exactly the data that would expose her model error.</p>
        <p><strong>My comment.</strong> The chapter is valuable because it gives a common grammar for many misspecified-learning papers. The most useful research move is to choose the data-generating feedback loop carefully: once actions select data, a wrong model can become self-confirming in very disciplined ways.</p>
      `,
    },
  },
  {
    id: "agarwal-moehring-wolitzky-2026-human-ai",
    title: "Designing Human-AI Collaboration: A Sufficient-Statistic Approach",
    authors: "Nikhil Agarwal; Alex Moehring; Alexander Wolitzky",
    journal: "MIT working paper",
    year: 2026,
    sourceType: "Working paper",
    url: "https://economics.mit.edu/sites/default/files/inline-files/AI_Design__Sufficient_Statistics%20Jan%2020%202026.pdf",
    status: "Digested",
    tags: ["working-paper", "information-design", "behavioral-learning", "information-acquisition"],
    takeaway: "Uses an information-design sufficient statistic to design human-AI collaboration under biased belief updating and effort crowd-out.",
    digest: {
      short: "Agarwal, Moehring, and Wolitzky develop a sufficient-statistic approach to designing human-AI collaboration in classification tasks. The designer can automate some cases and delegate others to humans with or without disclosing AI predictions. Rather than estimate a full structural model of human beliefs and effort, the paper estimates a function \(V(x)\): human accuracy when shown an AI assessment \(x\). This function is enough to solve the information-design problem. In their fact-checking experiment, humans under-respond to confident AI predictions, mostly because they overestimate their own signal precision; the optimal policy automates high-confidence AI cases and delegates uncertain cases to humans.",
      motivation: `
        <p><strong>Motivation.</strong> AI systems increasingly generate predictions that are useful but not always decisive. A designer must decide when to automate, when to ask a human, and how much of the AI prediction to disclose. The hard part is that humans may update incorrectly and may exert less effort when AI seems confident.</p>
        <p><strong>Reality example.</strong> Consider fact-checking political claims. An AI model gives a probability that a statement is true. If the probability is very close to \(0\) or \(1\), automation may be better than asking a human who underreacts to the AI. If the AI is uncertain, humans may add useful private judgment. The platform must decide how to route and disclose information.</p>
        <p><strong>Implication.</strong> The paper shows how information design can be made empirically operational: estimate one sufficient statistic, then optimize disclosure and automation without committing to a full behavioral model.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Let \(x\in[0,1]\) be a calibrated AI assessment that the true binary label is \(1\). If a human sees \(x\), let \(V(x)\) be the probability the human classifies correctly. The designer can choose a policy that maps AI assessments into automation or into signals disclosed to humans. The paper shows that, under a sufficient-statistic assumption, \(V\) is enough to solve the design problem.</p>
        <p><strong>Main empirical result.</strong> In their online fact-checking experiment, humans under-respond to confident AI predictions and reduce effort when AI predictions are confident. The estimated \(V\) is convex, which implies full disclosure is optimal for delegated cases, while automation is optimal when the AI is sufficiently confident.</p>
      `,
      deep: String.raw`
        <h3>1. Classification Environment</h3>
        <p>There are many cases \(i\). Each case has a binary ground truth</p>
        <div class="math">
          \[
            \omega_i\in\{0,1\}.
          \]
        </div>
        <p>An AI system produces a calibrated assessment</p>
        <div class="math">
          \[
            x_i\in[0,1],
            \qquad
            \Pr(\omega_i=1\mid x_i)=x_i.
          \]
        </div>
        <p>The designer chooses a policy. For each \(x\), the policy may automate the decision using the AI or delegate to a human after disclosing some signal about \(x\). The final action is a classification \(a_i\in\{0,1\}\), and accuracy is</p>
        <div class="math">
          \[
            \mathbf{1}\{a_i=\omega_i\}.
          \]
        </div>
        <h3>2. Sufficient Statistic</h3>
        <p>The central object is</p>
        <div class="math">
          \[
            V(x)
            =
            \Pr(\text{human classifies correctly}\mid \text{human observes AI assessment }x).
          \]
        </div>
        <p>This object already incorporates the human's private information, biased updating, and effort response to the disclosed AI assessment. Thus the designer does not need to separately model overconfidence, effort, or signal precision, as long as \(V\) is stable across disclosure policies.</p>
        <h3>3. Information-Design Problem</h3>
        <p>If the designer delegates a set of AI assessments to humans, she chooses an information policy over \(x\). Let a signal induce posterior mean \(m\). The information-design part of the problem is to choose a Bayes-plausible distribution over disclosed posterior means:</p>
        <div class="math">
          \[
            \mathbb{E}[m\mid x\in B]
            =
            \mathbb{E}[x\mid x\in B].
          \]
        </div>
        <p>The payoff from inducing posterior mean \(m\) is \(V(m)\), while automation at assessment \(x\) has accuracy</p>
        <div class="math">
          \[
            A(x)=\max\{x,1-x\}.
          \]
        </div>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Sufficient-Statistic Design</h3>
          <p>If \(V\) is invariant to the information policy, then \(V\) is a sufficient statistic for optimal human-AI collaboration design. The designer can optimize automation and disclosure using \(V\) and the distribution of AI assessments, without estimating a full structural model of human behavior.</p>
          <div class="math">
            \[
              \max_{\text{automation/disclosure policy}}
              \mathbb{E}[\text{classification accuracy}]
              =
              \max
              \mathbb{E}\left[
                \max\{A(x),\ \text{value from delegated disclosure using }V\}
              \right].
            \]
          </div>
        </div>
        <p>Empirically, \(V\) is convex in the experiment. Convexity implies that full disclosure dominates garbling for delegated cases, because more dispersion in posterior means raises expected \(V\). Since humans under-respond to confident AI predictions, automation is optimal for high-confidence cases.</p>
      `,
      example: String.raw`
        <h3>Fact-Checking Example</h3>
        <p>Suppose an AI assigns \(x=0.95\) to a statement being true. Automation chooses true and is correct with probability</p>
        <div class="math">
          \[
            A(0.95)=0.95.
          \]
        </div>
        <p>If humans under-respond to the AI and achieve only \(V(0.95)=0.86\), then the designer automates this case. If \(x=0.55\), automation gives accuracy \(0.55\), while a human may use context or private reasoning and reach \(V(0.55)=0.65\). Then delegation is better.</p>
        <div class="math">
          \[
            x\ \text{confident}
            \Rightarrow
            \text{automate},
            \qquad
            x\ \text{uncertain}
            \Rightarrow
            \text{delegate to human}.
          \]
        </div>
        <p>The disclosure question is whether to show the human the exact AI probability, a coarse signal, or nothing. If \(V\) is convex, full disclosure is best among delegated cases.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper connects information design with behavioral belief updating and human-AI collaboration. It builds on Bayesian persuasion and mean-measurable design, but uses an empirically estimated sufficient statistic rather than a fully specified model of human cognition.</p>
        <p><strong>Proof technique.</strong> The main technique is sufficient-statistic reduction. The designer's complex problem over human beliefs, effort, AI signals, and disclosure policies is reduced to an optimization over the indirect accuracy function \(V(x)\).</p>
        <p><strong>Useful secondary technique.</strong> The paper uses a two-stage validation design: estimate \(V\) and compute optimal policies in stage one, then implement the predicted policies in a second experiment. This is a useful template for taking information-design theory to data.</p>
        <p><strong>Problem solved.</strong> The paper solves the practical problem of designing AI assistance when humans respond behaviorally and the space of possible disclosure policies is too large for brute-force experimentation.</p>
        <p><strong>Open questions.</strong> Extensions include strategic human reports, repeated learning about AI reliability, heterogeneous \(V_i(x)\) across users, endogenous AI investment, and social learning among humans who observe AI-assisted decisions.</p>
        <p><strong>My comment.</strong> This is a very promising bridge between economic theory and AI design. A natural new paper would combine this with social learning: if users observe which cases were automated or delegated, the platform's routing policy itself becomes a public signal.</p>
      `,
    },
  },
  {
    id: "bergemann-heumann-morris-2025-procurement-priors",
    title: "Procurement without Priors: A Simple Mechanism and its Notable Performance",
    authors: "Dirk Bergemann; Tibor Heumann; Stephen Morris",
    journal: "MIT working paper / arXiv",
    year: 2025,
    sourceType: "Working paper",
    url: "https://economics.mit.edu/sites/default/files/2025-12/2512.09129v1.pdf",
    status: "Digested",
    tags: ["working-paper", "information-design", "mechanism-design"],
    takeaway: "Robust procurement mechanism design without a prior over supplier costs.",
    digest: {
      short: "Bergemann, Heumann, and Morris ask how a buyer should design procurement mechanisms when supplier costs are unknown and the buyer has no prior. A simple constant-share mechanism, where the seller receives a fixed share of buyer gross utility, guarantees a positive fraction of the complete-information efficient surplus across all cost functions. With the right share, this simple mechanism attains the best possible competitive ratio among all mechanisms.",
      motivation: `
        <p><strong>Motivation.</strong> Procurement often happens with poor prior information: new infrastructure, new technologies, emergency contracting, and unfamiliar suppliers. Bayesian mechanism design needs a prior over costs, but public agencies and firms may not have one.</p>
        <p><strong>Reality example.</strong> A city wants to buy a new climate-resilience technology. It knows the value of quality improvements but not the supplier's cost function. A complex optimal mechanism calibrated to a guessed distribution may be fragile. A constant-share rule is simple and robust.</p>
        <p><strong>Implication.</strong> The paper gives a non-Bayesian robustness benchmark: design a mechanism that guarantees a fraction of efficient surplus no matter what the supplier's cost function is.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Instead of maximizing expected payoff under a prior over costs, the buyer maximizes a worst-case performance ratio. The benchmark is complete-information efficient social surplus. The mechanism is evaluated by the fraction of that surplus the buyer can guarantee across all possible supplier costs.</p>
        <p><strong>Main point.</strong> A constant utility-share mechanism is not just simple. For important demand classes, the optimally chosen share attains the best possible competitive ratio, even relative to arbitrarily complex mechanisms.</p>
      `,
      deep: String.raw`
        <h3>1. Procurement Environment</h3>
        <p>A buyer wants quantity or quality \(q\in\mathbb{R}_+\). The buyer's gross utility is increasing and concave:</p>
        <div class="math">
          \[
            u(q),\qquad u'>0,\qquad u''\le 0.
          \]
        </div>
        <p>The seller has a private cost function</p>
        <div class="math">
          \[
            c:\mathbb{R}_+\to\mathbb{R}_+,
          \]
        </div>
        <p>which is increasing and convex. The buyer does not know \(c\) and has no prior distribution over \(c\).</p>
        <h3>2. Mechanisms And Seller Choice</h3>
        <p>By the taxation principle, consider a nonlinear payment rule \(t(q)\). Given \(t\), the seller chooses</p>
        <div class="math">
          \[
            q(c,t)
            \in
            \arg\max_{q\ge 0}\{t(q)-c(q)\}.
          \]
        </div>
        <p>The buyer's payoff is \(u(q(c,t))-t(q(c,t))\). The complete-information efficient surplus is</p>
        <div class="math">
          \[
            S^*(c)
            =
            \max_{q\ge0}\{u(q)-c(q)\}.
          \]
        </div>
        <h3>3. Competitive Ratio</h3>
        <p>The buyer evaluates a mechanism by its guaranteed share of efficient surplus:</p>
        <div class="math">
          \[
            \rho(t)
            =
            \inf_{c}
            \frac{
              u(q(c,t))-t(q(c,t))
            }{
              S^*(c)
            }.
          \]
        </div>
        <p>The design problem is</p>
        <div class="math">
          \[
            \sup_{t}\rho(t).
          \]
        </div>
        <h3>4. Constant-Share Mechanism</h3>
        <p>A constant-share mechanism pays the seller a fixed share \(\alpha\) of buyer gross utility:</p>
        <div class="math">
          \[
            t_{\alpha}(q)=\alpha u(q),
            \qquad
            \alpha\in[0,1].
          \]
        </div>
        <p>The seller then chooses output to maximize \(\alpha u(q)-c(q)\). The buyer keeps share \(1-\alpha\) of the realized gross utility.</p>
        <h3>5. Main Result</h3>
        <div class="theorem-box">
          <h3>Optimal Robust Procurement Guarantee</h3>
          <p>For the core demand classes studied in the paper, a judiciously chosen constant-share mechanism attains the maximal competitive ratio over all mechanisms. With power utility, the competitive ratio is a simple function of demand elasticity and decreases toward \(1/e\) as demand becomes more elastic.</p>
          <div class="math">
            \[
              \max_{\alpha\in[0,1]}\rho(t_{\alpha})
              =
              \sup_t\rho(t).
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Infrastructure Procurement Example</h3>
        <p>A government values project quality \(q\) according to \(u(q)=\sqrt{q}\). It does not know the contractor's convex cost function. A constant-share mechanism offers</p>
        <div class="math">
          \[
            t_{\alpha}(q)=\alpha\sqrt{q}.
          \]
        </div>
        <p>If \(\alpha\) is too low, the contractor supplies too little quality. If \(\alpha\) is too high, the buyer gives away too much surplus. The paper chooses \(\alpha\) to maximize the worst-case ratio</p>
        <div class="math">
          \[
            \inf_c
            \frac{(1-\alpha)\sqrt{q(c,t_{\alpha})}}
            {\max_q\{\sqrt{q}-c(q)\}}.
          \]
        </div>
        <p>The striking point is that this simple share rule can be worst-case optimal among all mechanisms, not merely among simple rules.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to robust mechanism design, procurement, nonlinear pricing, and information-robust decision making. It replaces Bayesian priors over costs with competitive-ratio guarantees.</p>
        <p><strong>Proof technique.</strong> The central technique is adversarial mechanism analysis. The proof compares a simple constant-share mechanism to the complete-information surplus benchmark and constructs worst-case cost functions or distributions that make no other mechanism do better.</p>
        <p><strong>Useful secondary technique.</strong> The saddle-point logic is useful: identify a simple policy and then show both a lower bound for that policy and an upper bound for every possible policy using adversarial environments.</p>
        <p><strong>Problem solved.</strong> The paper answers what a buyer can guarantee when she knows demand but lacks any reliable prior over supplier costs.</p>
        <p><strong>Open questions.</strong> Extensions include multi-supplier procurement, dynamic procurement with learning about costs, partial prior information, and procurement platforms where past supplier behavior becomes social information for future buyers.</p>
        <p><strong>My comment.</strong> This paper is not a learning paper in the narrow sense, but it belongs in the broader information-design shelf because it asks how to design mechanisms under severe informational ignorance. A natural new paper would let the buyer learn a coarse cost class over repeated procurements and ask when robust shares should be updated.</p>
      `,
    },
  },
  {
    id: "auster-che-mierendorff-2024-wald",
    title: "Prolonged Learning and Hasty Stopping: The Wald Problem with Ambiguity",
    authors: "Sarah Auster; Yeon-Koo Che; Konrad Mierendorff",
    journal: "American Economic Review",
    year: 2024,
    doi: "10.1257/aer.20221149",
    status: "Digested",
    tags: ["optimal-stopping", "information-acquisition", "learning"],
    takeaway: "A modern Wald stopping paper with ambiguity, useful as an anchor for sequential learning and stopping.",
    digest: {
      short: "The paper studies a Wald-style sequential learning problem for an ambiguity-averse decision maker. Unlike a Bayesian learner with a single prior, the decision maker evaluates continuation and stopping under a set of priors and updates prior-by-prior. Ambiguity creates two forces: experimentation can be prolonged when uncertainty is moderate, but stopping can be hasty when uncertainty is high. The optimal stopping rule may be nonmonotone in beliefs and may involve randomized stopping.",
      motivation: `
        <p><strong>Motivation.</strong> Many real decisions require learning before an irreversible action, but the decision maker may not trust a single probabilistic model. Think of medical diagnosis, startup launch, litigation, hiring, or policy experimentation under model uncertainty.</p>
        <p><strong>Reality example.</strong> A regulator deciding whether to approve a new technology may face several plausible models of risk. Moderate uncertainty can make her keep collecting data to reduce ambiguity, but extreme ambiguity can make her stop early and reject because the worst-case model dominates.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> In the classical Wald problem, posterior belief is a sufficient statistic and stopping is usually threshold-like. This paper asks what changes when the agent is ambiguity averse and has multiple priors.</p>
        <p><strong>Main insight.</strong> Ambiguity does not simply make the agent more cautious in one direction. It can generate prolonged learning near moderate beliefs and premature stopping near high uncertainty, producing nonmonotone and randomized stopping.</p>
      `,
      deep: String.raw`
        <h3>1. Wald-Style Setup</h3>
        <p>There is an unknown binary state \(\theta\in\{0,1\}\). The agent observes a stream of signals and chooses a stopping time \(\tau\), then takes an irreversible action \(a\in\{0,1\}\).</p>
        <div class="math">
          \[
            \theta\in\{0,1\},\qquad
            \mathcal{F}_t=\sigma(s_u:0\le u\le t),\qquad
            \tau \text{ is an }(\mathcal{F}_t)\text{-stopping time}.
          \]
        </div>
        <p>Learning is costly. If flow cost is \(c>0\), the payoff from stopping at \(\tau\) and choosing \(a\) is</p>
        <div class="math">
          \[
            u(a,\theta)-c\tau.
          \]
        </div>
        <p>In a Bayesian version, the posterior \(p_t=\Pr(\theta=1\mid\mathcal{F}_t)\) summarizes beliefs and the agent solves</p>
        <div class="math">
          \[
            V(p)=\max\left\{
              G(p),\;
              -c\,dt+\mathbb{E}[V(p_{t+dt})\mid p_t=p]
            \right\},
          \]
          \[
            G(p)=\max_{a\in\{0,1\}}\mathbb{E}_p[u(a,\theta)].
          \]
        </div>
        <h3>2. Ambiguity</h3>
        <p>The paper replaces a single prior with a set of priors. Let the belief set at time \(t\) be \(P_t\subseteq\Delta(\{0,1\})\). The agent evaluates payoffs by maxmin preferences:</p>
        <div class="math">
          \[
            V(P)
            =
            \sup_{\tau,a_\tau}
            \inf_{p\in P}
            \mathbb{E}_p[u(a_\tau,\theta)-c\tau].
          \]
        </div>
        <p>Beliefs are updated prior-by-prior. Thus ambiguity is not a scalar posterior but a set-valued state variable.</p>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Ambiguous Wald Dynamics</h3>
          <p>Relative to the Bayesian benchmark, ambiguity generates two opposite distortions. With moderate uncertainty, the agent can experiment longer because information has ambiguity-reduction value. With high uncertainty, the worst-case prior can make continuation unattractive, leading to hasty stopping.</p>
          <div class="math">
            \[
              \text{moderate ambiguity}
              \Rightarrow
              V^{A}(P)-G^{A}(P)
              >
              V^{B}(p)-G^{B}(p),
            \]
            \[
              \text{high ambiguity}
              \Rightarrow
              V^{A}(P)=G^{A}(P)
              \text{ even where a Bayesian would continue.}
            \]
          </div>
        </div>
        <p>The stopping region need not be monotone in beliefs. In particular, moving to a seemingly more favorable belief can increase the worst-case value of waiting or stopping in a nonstandard way. The optimal policy may also randomize at some beliefs to balance worst-case priors.</p>
      `,
      example: String.raw`
        <h3>Simple Example</h3>
        <p>Suppose action \(1\) is correct in state \(1\), action \(0\) is correct in state \(0\), and payoff is \(1\) for a correct action and \(0\) otherwise. Let the belief set be an interval</p>
        <div class="math">
          \[
            P=[\underline p,\bar p]\subseteq[0,1].
          \]
        </div>
        <p>The worst-case payoff from choosing action \(1\) is \(\underline p\), while the worst-case payoff from choosing action \(0\) is \(1-\bar p\). The stopping payoff is</p>
        <div class="math">
          \[
            G(P)=\max\{\underline p,\;1-\bar p\}.
          \]
        </div>
        <p>If \(P\) is wide and centered, both actions have poor worst-case payoff. More information may shrink the interval, so continuation is valuable. But if \(P\) is extremely unfavorable for both continuation paths under the worst-case model, the agent may stop early even though a Bayesian with midpoint belief would keep learning.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper extends Wald's sequential testing logic to ambiguity-averse learning. It contributes to optimal stopping, robust/ambiguous decision theory, and information acquisition by showing that ambiguity changes not only the amount of experimentation but the shape of the stopping rule.</p>
        <p><strong>Proof technique.</strong> The useful technique is set-valued dynamic programming. The state is not a scalar posterior but a belief set \(P\). The Bellman equation uses a max-min continuation operator:</p>
        <div class="math">
          \[
            V(P)=\max\left\{
              G(P),\;
              -c\,dt+\inf_{p\in P}\mathbb{E}_p[V(P_{t+dt})]
            \right\}.
          \]
        </div>
        <p><strong>Useful secondary trick.</strong> To understand nonmonotone stopping, track which prior in the set is worst-case in each region. Switching worst-case priors can break ordinary monotone-threshold logic.</p>
        <p><strong>Problem solved.</strong> The paper explains why ambiguity can produce both excessive experimentation and premature stopping in the same model.</p>
        <p><strong>Open questions.</strong> Natural extensions include endogenous signal choice under ambiguity, social learning with ambiguous priors, and empirical tests for randomized stopping in ambiguous environments. A new paper could ask how ambiguity changes information design when the sender controls the decision maker's learning process.</p>
        <p><strong>My comment.</strong> The paper is useful because it shows that ambiguity is not just more caution. It changes the geometry of stopping. A promising extension is a social Wald problem where agents observe others' ambiguous stopping decisions and must infer both information and ambiguity attitudes.</p>
      `,
    },
  },
  {
    id: "zhong-2022-dynamic-info",
    title: "Optimal Dynamic Information Acquisition",
    authors: "Weijie Zhong",
    journal: "Econometrica",
    year: 2022,
    doi: "10.3982/ecta17787",
    status: "Digested",
    tags: ["information-acquisition", "optimal-stopping"],
    takeaway: "Core theory paper on how information should be acquired over time.",
    digest: {
      short: "This paper studies dynamic information acquisition when a decision maker can control what information to acquire over time before taking actions. The key problem is to characterize optimal dynamic experiments, not just one-shot information structures. The paper is an anchor for thinking about information acquisition as a dynamic control problem over beliefs.",
      motivation: `
        <p><strong>Motivation.</strong> Real learning is often sequential. A firm doing R&D, a doctor ordering tests, a platform learning product quality, or an investor collecting signals does not choose all information at once. Each new signal changes what is worth learning next.</p>
        <p><strong>Reality example.</strong> A startup testing demand may first run a cheap survey, then decide whether to run a costly field experiment. Dynamic information acquisition studies this adaptive sequence.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> A static experiment maps states into signals once. A dynamic experiment lets the decision maker choose future information based on current posterior beliefs. This creates a control problem on the belief simplex.</p>
      `,
      deep: String.raw`
        <h3>1. Belief-State Setup</h3>
        <p>Let \(\theta\in\Theta\) be the unknown state and \(p_t\in\Delta(\Theta)\) the posterior belief at time \(t\). At each date, the decision maker chooses an information policy that determines the law of posterior movement.</p>
        <div class="math">
          \[
            p_t=\Pr(\theta\mid\mathcal{F}_t),\qquad
            \text{choose experiment/control } \alpha_t\in\mathcal{A}(p_t).
          \]
        </div>
        <p>Beliefs must satisfy Bayes plausibility: the expected posterior equals the current prior.</p>
        <div class="math">
          \[
            \mathbb{E}[p_{t+dt}\mid p_t]=p_t.
          \]
        </div>
        <p>The decision maker receives a terminal payoff from action choice and pays information costs over time.</p>
        <div class="math">
          \[
            V(p)=
            \sup_{\alpha,\tau,a}
            \mathbb{E}\left[
              u(a_{\tau},\theta)
              -
              \int_0^{\tau}c(\alpha_t,p_t)\,dt
              \,\middle|\,p_0=p
            \right].
          \]
        </div>
        <h3>2. Dynamic Programming</h3>
        <p>The value function solves a Hamilton-Jacobi-Bellman problem on the belief simplex. Abstractly,</p>
        <div class="math">
          \[
            V(p)=\max\left\{
              G(p),\;
              \sup_{\alpha\in\mathcal{A}(p)}
              \left[
                -c(\alpha,p)\,dt
                +
                \mathbb{E}[V(p_{t+dt})\mid p_t=p,\alpha]
              \right]
            \right\}.
          \]
        </div>
        <p>The terminal payoff is</p>
        <div class="math">
          \[
            G(p)=\max_{a\in A}\sum_{\theta}u(a,\theta)p(\theta).
          \]
        </div>
        <h3>3. Main Result Lens</h3>
        <div class="theorem-box">
          <h3>Dynamic Information Characterization</h3>
          <p>The core characterization is that optimal information acquisition can be represented as an optimal control of posterior beliefs. The local value of information is governed by the curvature of \(V\): information is valuable when it spreads posterior beliefs in directions where \(V\) is convex.</p>
          <div class="math">
            \[
              \text{choose posterior movement direction/variance to maximize}
              \quad
              \mathcal{L}^{\alpha}V(p)-c(\alpha,p).
            \]
          </div>
        </div>
        <p>Economically, the decision maker does not simply maximize signal precision. She acquires the kind of information that moves beliefs toward payoff-relevant decision boundaries.</p>
      `,
      example: String.raw`
        <h3>Simple Example</h3>
        <p>Suppose \(\Theta=\{1,2,3\}\) and the agent must eventually choose one of three actions. If current belief puts mass mainly on states 1 and 2, then information distinguishing state 3 is not very valuable. The valuable experiment distinguishes 1 from 2.</p>
        <div class="math">
          \[
            G(p)=\max\{p_1,p_2,p_3\}.
          \]
        </div>
        <p>If \(p=(0.48,0.47,0.05)\), an experiment that separates states 1 and 2 can change the optimal action. An experiment that only separates state 3 from the others usually does not. Dynamic acquisition means the experiment should change once the posterior moves.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to the literature on costly information acquisition by treating information choice as a dynamic control problem rather than a static choice of signal structure.</p>
        <p><strong>Proof technique.</strong> The reusable technique is belief-space dynamic programming. The posterior is a controlled martingale, so feasible information policies correspond to feasible martingale laws over beliefs. The HJB/operator form links the optimal direction of learning to curvature of the continuation value.</p>
        <p><strong>Useful secondary trick.</strong> Use Bayes plausibility to transform information acquisition into a problem of choosing distributions over future beliefs. This makes concavity/convexity of the value function central.</p>
        <p><strong>Problem solved.</strong> The paper clarifies what it means to acquire information optimally over time: not just how much precision, but which belief direction to explore.</p>
        <p><strong>Open questions.</strong> Important extensions include multi-agent dynamic information acquisition, ambiguity, misspecified belief dynamics, and platform-designed dynamic experiments. A natural project is dynamic rational inattention in social learning networks.</p>
        <p><strong>My comment.</strong> This paper is a methods anchor for dynamic information acquisition. I especially like the belief-direction interpretation: a new paper can often be built by asking which directions of uncertainty are valuable under a different payoff or strategic externality.</p>
      `,
    },
  },
  {
    id: "che-mierendorff-2019-attention",
    title: "Optimal Dynamic Allocation of Attention",
    authors: "Yeon-Koo Che; Konrad Mierendorff",
    journal: "American Economic Review",
    year: 2019,
    doi: "10.1257/aer.20171000",
    status: "Digested",
    tags: ["information-acquisition", "rational-inattention", "optimal-stopping"],
    takeaway: "Dynamic attention allocation connects costly information acquisition with stopping-style experimentation.",
    digest: {
      short: "The paper studies a decision maker who dynamically allocates limited attention across biased news sources before taking an action. Each source is more informative about one alternative. Optimal attention can be confirmatory when beliefs are extreme and anti-confirmatory when beliefs are moderate, generating both echo-chamber and anti-echo-chamber behavior.",
      motivation: `
        <p><strong>Motivation.</strong> People choose what news, tests, experts, or data sources to consult. Those sources are often biased toward different conclusions. The question is not only how much attention to spend, but where to allocate it over time.</p>
        <p><strong>Reality example.</strong> A partisan voter may mostly read friendly news when already convinced, reinforcing an echo chamber. A moderate voter may read opposing sources to resolve uncertainty. The same optimizing model can generate both behaviors.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Attention allocation is dynamic because each signal changes beliefs, and beliefs determine which source is most valuable next. The optimal source can either reinforce or challenge the current belief depending on where the belief lies.</p>
      `,
      deep: String.raw`
        <h3>1. Setup</h3>
        <p>There is an unknown state \(\theta\in\{L,R\}\) and two final actions. The decision maker can allocate attention over news sources before choosing an action. Source \(L\) is relatively good at producing evidence for \(L\), while source \(R\) is relatively good at producing evidence for \(R\).</p>
        <div class="math">
          \[
            p_t=\Pr(\theta=R\mid\mathcal{F}_t).
          \]
        </div>
        <p>At time \(t\), the decision maker chooses an attention allocation</p>
        <div class="math">
          \[
            \alpha_t\in[0,1],
          \]
        </div>
        <p>where \(\alpha_t\) is attention to the \(R\)-biased source and \(1-\alpha_t\) is attention to the \(L\)-biased source. Signals move the posterior belief \(p_t\). Learning is costly because delay or attention has a flow cost.</p>
        <div class="math">
          \[
            V(p)=
            \sup_{\alpha,\tau,a}
            \mathbb{E}\left[
              u(a,\theta)-c\tau
              \mid p_0=p
            \right].
          \]
        </div>
        <h3>2. Main Result</h3>
        <div class="theorem-box">
          <h3>Optimal Attention Pattern</h3>
          <p>The optimal policy is belief-dependent. When beliefs are extreme, attention is biased toward the source that confirms the current likely state. When beliefs are moderate, attention can be biased against the current belief to resolve the decision-relevant uncertainty.</p>
          <div class="math">
            \[
              p\text{ extreme}
              \Rightarrow
              \alpha^*(p)\text{ tilts toward confirmatory information},
            \]
            \[
              p\text{ moderate}
              \Rightarrow
              \alpha^*(p)\text{ may tilt toward disconfirming information}.
            \]
          </div>
        </div>
        <p>The final stopping action is threshold-like, but the path of attention before stopping is rich. The chosen source can reinforce the prior or weaken it, shaping both belief dynamics and final action.</p>
      `,
      example: String.raw`
        <h3>Simple Example</h3>
        <p>Suppose a voter must choose \(L\) or \(R\). If her posterior is \(p=0.95\) that \(R\) is correct, the main risk is accidentally choosing \(L\). Confirmatory \(R\)-news can quickly push her to stop and choose \(R\). If her posterior is \(p=0.55\), she is near indifferent, so \(L\)-leaning evidence is valuable because it can reveal whether she should switch.</p>
        <div class="math">
          \[
            G(p)=\max\{p,1-p\}.
          \]
        </div>
        <p>Information is most useful when it changes the identity of the maximizing action. That is why moderate beliefs can create demand for opposing information.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to dynamic rational inattention and endogenous information acquisition by showing that optimal attention can generate both echo chambers and anti-echo chambers without assuming biased preferences.</p>
        <p><strong>Proof technique.</strong> The proof uses dynamic programming on posterior beliefs, with attention allocation as a control affecting posterior drift/jump intensities. The key is to compare the marginal value of allocating attention to each biased source as a function of the current belief.</p>
        <div class="math">
          \[
            \alpha^*(p)\in
            \arg\max_{\alpha\in[0,1]}
            \left\{
              \mathcal{L}^{\alpha}V(p)-c
            \right\}.
          \]
        </div>
        <p><strong>Useful secondary trick.</strong> Interpret source choice through the marginal value of moving beliefs toward stopping boundaries. This is useful in any dynamic model where information sources have directional bias.</p>
        <p><strong>Problem solved.</strong> The paper explains why rational agents may seek confirming information in some regions and disconfirming information in others.</p>
        <p><strong>Open questions.</strong> Extensions include social attention allocation, algorithmic news feeds, endogenous source bias, and misspecified beliefs about source reliability. A new paper could study platform-designed attention paths that deliberately create or break echo chambers.</p>
        <p><strong>My comment.</strong> This paper is especially good for intuition because it separates confirmation from irrationality. Confirmatory attention can be optimal near stopping boundaries. A promising extension is to let social platforms change those boundaries by changing what actions or commitments users can take.</p>
      `,
    },
  },
  {
    id: "caplin-dean-2015-ri",
    title: "Revealed Preference, Rational Inattention, and Costly Information Acquisition",
    authors: "Andrew Caplin; Mark Dean",
    journal: "American Economic Review",
    year: 2015,
    doi: "10.1257/aer.20140117",
    status: "Digested",
    tags: ["rational-inattention", "information-acquisition"],
    takeaway: "A foundational revealed-preference test for whether observed stochastic choice can be rationalized by costly information acquisition.",
    digest: {
      short: "The paper asks when observed state-dependent stochastic choice can be explained as optimal costly information acquisition. The key answer is behavioral: the data are rationalizable if and only if they satisfy No Improving Action Switches and No Improving Attention Cycles. This turns rational inattention from a hidden-information model into a revealed-preference test.",
      motivation: `
        <p><strong>Motivation.</strong> In real data, people often make stochastic choices: they do not always buy the same product, invest in the same asset, or choose the same action under seemingly similar conditions. This paper asks when such randomness can be interpreted as optimal costly information acquisition rather than mistakes or taste shocks.</p>
        <p><strong>Reality example.</strong> Suppose a consumer sometimes chooses a premium plan and sometimes a basic plan depending on hidden details she noticed. The econometrician observes choices but not what she paid attention to. Caplin-Dean gives tests for whether those choices could have come from rationally chosen attention.</p>
      `,
      medium: `
        <p><strong>Problem.</strong> A decision maker faces a finite state space and chooses an action after possibly acquiring costly information. The econometrician observes, across decision problems, the joint distribution of states and chosen actions, but not the signal structure or the cost of information. The question is: when can these data be generated by an agent who optimally chooses an information strategy?</p>
        <p><strong>Economic idea.</strong> If the agent chooses a signal structure, then observed stochastic choice is not random taste. It is the reduced form of posterior beliefs and optimal actions. Caplin and Dean show that the hidden information cost can be recovered only up to rationalization, but rationalization has sharp testable restrictions.</p>
        <p><strong>Main result in words.</strong> Observed behavior is rationalizable by some monotone information cost if and only if it passes two revealed-preference tests. First, after each realized choice, the chosen action must be optimal for the posterior belief induced by that choice. Second, there must be no cycle of attention strategies that would make the agent strictly better off by switching strategies across problems.</p>
      `,
      deep: `
        <p><strong>Setup.</strong> Let the finite state space be \\(\\Omega\\), action set be \\(A\\), and utility be \\(u:A\\times\\Omega\\to\\mathbb R\\). In decision problem \\(k\\), the prior is \\(\\mu^k\\in\\Delta(\\Omega)\\). The data are an unconditional joint distribution \\(P^k(a,\\omega)\\) over chosen action and state, or equivalently conditional choice probabilities \\(P^k(a\\mid\\omega)\\).</p>
        <div class="math">
          \\[
            P^k(a)=\\sum_{\\omega\\in\\Omega}\\mu^k(\\omega)P^k(a\\mid\\omega),
          \\]
          \\[
            q_a^k(\\omega)=P^k(\\omega\\mid a)=\\frac{\\mu^k(\\omega)P^k(a\\mid\\omega)}{P^k(a)}.
          \\]
        </div>
        <p>The posterior \\(q_a^k\\) is the belief induced by observing that the chosen action is \\(a\\). This is a standard obedience-style reduction: any information strategy plus optimal action rule induces a distribution over posteriors and actions.</p>
        <p><strong>No Improving Action Switches (NIAS).</strong> For every problem \\(k\\), every action \\(a\\) chosen with positive probability, and every alternative action \\(b\\in A\\),</p>
        <div class="math">
          \\sum_{\\omega} q_a^k(\\omega)u(a,\\omega)
          \\ge
          \\sum_{\\omega} q_a^k(\\omega)u(b,\\omega).
        </div>
        <p>This says that, conditional on the posterior associated with choosing \\(a\\), action \\(a\\) must actually be optimal.</p>
        <p><strong>No Improving Attention Cycles (NIAC).</strong> Let \\(G^k\\) denote the gross expected payoff from the observed attention strategy in problem \\(k\\):</p>
        <div class="math">
          G^k = \\sum_{a,\\omega} P^k(a,\\omega)u(a,\\omega).
        </div>
        <p>For any ordered cycle of problems \\(1,2,\ldots,J,1\\), the observed strategies must not allow a profitable cycle of switching attention policies:</p>
        <div class="math">
          \\sum_{j=1}^J G^j
          \\ge
          \\sum_{j=1}^J G^{j+1|j},
        </div>
        <p>where \\(G^{j+1|j}\\) is the expected gross payoff from using the information strategy observed in problem \\(j+1\\) while facing the prior and payoff environment of problem \\(j\\). Intuitively, if the agent chose strategy \\(j\\) in problem \\(j\\), then the chosen strategy net of cost must beat borrowing the strategy from any other problem. Summing around a cycle cancels the unknown costs and leaves a testable inequality.</p>
        <p><strong>Main theorem.</strong> The data set is rationalizable by optimal costly information acquisition if and only if NIAS and NIAC hold. In that case, there exists a cost function \\(C\\) over information strategies such that, for every problem \\(k\\), the observed strategy solves</p>
        <div class="math">
          \\max_{\\pi} \\left\\{ E_{\\mu^k,\\pi}[u(a(s),\\omega)] - C(\\pi,\\mu^k) \\right\\},
        </div>
        <p>with actions chosen optimally after signals. The appendix gives a general characterization using cost functions satisfying monotonicity, mixture feasibility, and normalization.</p>
        <p><strong>Simple example.</strong> Suppose \\(\\Omega=\\{H,L\\}\\), \\(A=\\{Invest,Not\\}\\), and payoffs are \\(u(Invest,H)=1\\), \\(u(Invest,L)=-1\\), and \\(u(Not,H)=u(Not,L)=0\\). If the observed data imply that after choosing Invest the posterior is \\(q(H\\mid Invest)=0.7\\), then Invest is optimal because \\(0.7(1)+0.3(-1)=0.4>0\\). If after choosing Not the posterior is \\(q(H\\mid Not)=0.4\\), Not is optimal because investing gives \\(0.4-0.6=-0.2<0\\). NIAS passes. NIAC then asks whether the agent's more precise strategy in, say, a high-stakes version of the problem could have been profitably used in a low-stakes version, and vice versa, once information costs are accounted for. If the high-stakes strategy is chosen only when its extra gross payoff justifies its extra cost, the cycle inequality passes.</p>
      `,
      example: String.raw`
        <h3>Investment Example</h3>
        <p>Let \(\Omega=\{H,L\}\) and \(A=\{Invest,Not\}\). Investing pays \(1\) in state \(H\), pays \(-1\) in state \(L\), and not investing pays \(0\) in both states.</p>
        <div class="math">
          \[
            u(Invest,H)=1,\qquad
            u(Invest,L)=-1,\qquad
            u(Not,H)=u(Not,L)=0.
          \]
        </div>
        <p>If the posterior after the agent chooses Invest is \(q(H\mid Invest)=0.7\), then Invest is sequentially optimal because</p>
        <div class="math">
          \[
            0.7(1)+0.3(-1)=0.4>0.
          \]
        </div>
        <p>If the posterior after choosing Not is \(q(H\mid Not)=0.4\), then Not is optimal because investing would yield \(0.4-0.6=-0.2\). NIAS checks this action-by-action optimality. NIAC then asks whether the same attention strategies could be profitably swapped across decision problems after accounting for hidden information costs.</p>
      `,
      technical: `
        <p><strong>Contribution to literature.</strong> The paper gives rational inattention a revealed-preference foundation. Sims-style rational inattention and Shannon-cost models specify a particular information cost. Caplin and Dean instead ask what must be true of choice data if some costly information technology rationalizes it. This is analogous in spirit to Afriat/GARP in consumer theory: do not estimate the hidden preference or cost first; derive finite-data inequalities that characterize rationalizability.</p>
        <p><strong>Proof technique.</strong> The useful trick is cycle cancellation. Pairwise optimality would involve unknown information costs, but when inequalities are summed around a cycle, the costs cancel. This produces NIAC. NIAS is an obedience condition: posterior beliefs induced by each action must make that action optimal. The appendix generalizes the argument by defining indirect cost values and separating admissible cost functions through linear inequalities.</p>
        <p><strong>Problem solved.</strong> The paper solves the identification/testing problem: when should observed stochastic choice be interpreted as rational inattention rather than arbitrary noise or biased choice?</p>
        <p><strong>Open questions.</strong> One natural next step is dynamic revealed preference: when the same agent learns over time, what are the NIAS/NIAC analogues with belief persistence? Another is misspecified rational inattention: if the agent's subjective model is wrong, which violations of NIAS are diagnostic of misspecification rather than non-optimization? A third is social information acquisition: can we build cycle tests when information comes from peers and the cost depends on network position?</p>
        <p><strong>My comment.</strong> This is a very useful paper because it separates the economic content of rational inattention from a specific entropy formula. For theory work, the paper's most portable idea is the revealed-preference cycle: whenever a model has hidden costs, try summing optimality inequalities across environments to eliminate the unobserved object. A promising new paper could combine this with Wald stopping: characterize finite-data restrictions when the hidden object is not a static signal cost but a dynamic stopping/search cost.</p>
      `,
    },
  },
  {
    id: "denti-2022-posterior",
    title: "Posterior Separable Cost of Information",
    authors: "Tommaso Denti",
    journal: "American Economic Review",
    year: 2022,
    doi: "10.1257/aer.20211252",
    status: "Digested",
    tags: ["information-acquisition", "rational-inattention"],
    takeaway: "Axiomatizes a broad class of information costs used in rational inattention and information design.",
    digest: {
      short: "Denti asks when information costs can be written as the expected reduction of an uncertainty index. This posterior-separable form is almost everywhere in rational inattention because it is tractable, but before this paper economists did not have a clean revealed-preference test for it. The paper gives observable restrictions, shows how to identify nonparametric information costs from choice behavior, and explains when posterior separability is empirically compelling or too restrictive.",
      motivation: `
        <p><strong>Motivation.</strong> Many rational-inattention papers assume that the cost of information is an entropy drop. That assumption is mathematically convenient, but it is also economically strong: it says the cost of a signal depends only on how much it reduces uncertainty, not on the physical way the signal is produced.</p>
        <p><strong>Reality example.</strong> Think about a manager deciding whether to buy market research. A report that separates young from old consumers and a report that separates urban from rural consumers may create posterior beliefs with similar precision. Posterior separability says the cost can be summarized by the before-and-after uncertainty of beliefs. If one report is intrinsically easier to collect because the firm already has location data, posterior separability may fail.</p>
        <p><strong>Implication.</strong> The paper is useful because it tells us when an entropy-style model is not just a convenient metaphor, but is actually disciplined by behavior.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> A posterior-separable cost has the form</p>
        <div class="math">
          \[
            C(\pi,\mu)=H(\mu)-\int_{\Delta(\Omega)} H(p)\,d\pi(p),
          \]
        </div>
        <p>where \(\mu\) is the prior, \(\pi\) is a Bayes-plausible distribution of posterior beliefs, and \(H\) is an uncertainty function. Shannon mutual information is the benchmark case, with \(H\) equal to Shannon entropy.</p>
        <p><strong>What Denti adds.</strong> The paper gives testable conditions under which a decision maker's observed information choices are consistent with such a representation, and it studies identification and estimation of the cost function from stochastic choice data.</p>
      `,
      deep: String.raw`
        <h3>1. Objects</h3>
        <p>Let \(\Omega\) be a finite state space and let \(\mu\in\Delta(\Omega)\) be the prior. An information structure can be represented by a distribution over posterior beliefs \(\pi\in\Delta(\Delta(\Omega))\) satisfying Bayes plausibility:</p>
        <div class="math">
          \[
            \int_{\Delta(\Omega)} p\,d\pi(p)=\mu.
          \]
        </div>
        <p>Given a decision problem with action set \(A\) and payoff \(u(a,\omega)\), the gross value of information structure \(\pi\) is</p>
        <div class="math">
          \[
            G_u(\pi)
            =
            \int_{\Delta(\Omega)}
            \max_{a\in A}\sum_{\omega\in\Omega}u(a,\omega)p(\omega)\,d\pi(p).
          \]
        </div>
        <p>The agent chooses an information structure by trading off gross value against an information cost:</p>
        <div class="math">
          \[
            \pi^*(u,\mu)
            \in
            \arg\max_{\pi:\int p\,d\pi(p)=\mu}
            \left\{G_u(\pi)-C(\pi,\mu)\right\}.
          \]
        </div>
        <h3>2. Posterior Separability</h3>
        <p>The special class studied in the paper writes the cost as the expected reduction in an uncertainty measure \(H\):</p>
        <div class="math">
          \[
            C(\pi,\mu)
            =
            H(\mu)-\mathbb{E}_{\pi}[H(p)].
          \]
        </div>
        <p>If \(H\) is concave, then Jensen's inequality implies nonnegative information cost:</p>
        <div class="math">
          \[
            H(\mu)
            =
            H(\mathbb{E}_{\pi}[p])
            \ge
            \mathbb{E}_{\pi}[H(p)].
          \]
        </div>
        <p>The Shannon benchmark is</p>
        <div class="math">
          \[
            H(\mu)=-\sum_{\omega\in\Omega}\mu(\omega)\log \mu(\omega),
          \]
          \[
            C(\pi,\mu)
            =
            H(\mu)-\int H(p)\,d\pi(p)
            =
            I(\omega;s),
          \]
        </div>
        <p>where \(I(\omega;s)\) is mutual information between the state and the signal.</p>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Characterization</h3>
          <p>The main result gives behavioral conditions under which observed information choices can be rationalized by a posterior-separable cost. In economic terms, the data must behave as if there exists an uncertainty index \(H\) such that, across decision problems, the chosen posterior distributions solve</p>
          <div class="math">
            \[
              \max_{\pi:\mathbb{E}_{\pi}[p]=\mu}
              \left\{
                \int v(p)\,d\pi(p)
                -
                \left[H(\mu)-\int H(p)\,d\pi(p)\right]
              \right\},
            \]
          </div>
          <p>where \(v(p)=\max_a\sum_{\omega}u(a,\omega)p(\omega)\) is the indirect payoff function generated by the decision problem.</p>
        </div>
        <p>The result is a revealed-preference theorem for posterior separability: the unobserved object \(H\) must be able to support all observed information choices by the same cost representation. The paper also shows how to recover or estimate the relevant cost object nonparametrically from choice data.</p>
        <h3>4. Economic Meaning</h3>
        <p>Posterior separability imposes a kind of path independence. If two experiments induce the same distribution over posterior beliefs, they have the same cost. The history, label, or physical technology of the signal does not matter except through the posterior distribution.</p>
      `,
      example: String.raw`
        <h3>Binary-State Example</h3>
        <p>Let \(\Omega=\{0,1\}\), prior \(\mu(1)=1/2\), and action \(a\in\{0,1\}\) with payoff \(u(a,\omega)=\mathbf{1}\{a=\omega\}\). Without information, the agent gets payoff \(1/2\).</p>
        <p>Consider an experiment that produces posterior \(p_H=\Pr(\omega=1\mid s=H)=q\) with probability \(1/2\) and posterior \(p_L=1-q\) with probability \(1/2\). Bayes plausibility holds because</p>
        <div class="math">
          \[
            \frac12 q+\frac12(1-q)=\frac12.
          \]
        </div>
        <p>The gross value is</p>
        <div class="math">
          \[
            G(q)
            =
            \frac12\max\{q,1-q\}
            +
            \frac12\max\{1-q,q\}
            =
            q
            \quad\text{for }q\ge \frac12.
          \]
        </div>
        <p>With Shannon posterior-separable cost,</p>
        <div class="math">
          \[
            C(q)=H(1/2)-\frac12H(q)-\frac12H(1-q)=\log 2-H(q).
          \]
        </div>
        <p>The agent chooses signal precision \(q\) to maximize</p>
        <div class="math">
          \[
            q-\lambda[\log 2-H(q)].
          \]
        </div>
        <p>Denti's question is deeper than solving this example: from observed choices of \(q\) across decision problems, can we test whether some common \(H\) exists?</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper supplies the missing revealed-preference foundation for posterior-separable information costs. Sims and much of rational inattention use entropy-style costs; Caplin and Dean test costly information more generally. Denti studies the narrower but extremely important class in which cost is the expected reduction of an uncertainty index.</p>
        <p><strong>Proof technique.</strong> The main proof strategy is a separation/revealed-preference argument. Observed choices generate inequalities saying that the chosen posterior distribution must dominate each feasible alternative after adding the same unknown uncertainty index \(H\). The characterization asks when those inequalities admit a common supporting \(H\).</p>
        <p><strong>Useful secondary technique.</strong> A portable trick is to work directly on the space of posterior distributions and use Bayes plausibility as a linear constraint. This turns information acquisition into a convex-analytic problem over distributions of beliefs rather than a problem over arbitrary signal alphabets.</p>
        <p><strong>Problem solved.</strong> The paper solves the problem of when posterior separability is testable from behavior and how the information cost can be identified or estimated without imposing Shannon entropy from the start.</p>
        <p><strong>Open questions.</strong> Important extensions are dynamic posterior separability, posterior separability in games with endogenous priors, and tests that distinguish posterior-separable costs from physical experiment costs. Another natural project is to estimate \(H\) in field data where the same decision maker faces repeated but changing information problems.</p>
        <p><strong>My comment.</strong> This is a very useful paper for anyone who wants to use rational inattention seriously. It tells you exactly what you buy when you assume entropy reduction. A good new paper could combine Denti's test with misspecified learning: if the decision maker's subjective state space is wrong, can an econometrician falsely infer a non-Shannon \(H\)?</p>
      `,
    },
  },
  {
    id: "denti-marinacci-rustichini-2022",
    title: "Experimental Cost of Information",
    authors: "Tommaso Denti; Massimo Marinacci; Aldo Rustichini",
    journal: "American Economic Review",
    year: 2022,
    doi: "10.1257/aer.20210879",
    status: "Digested",
    tags: ["information-acquisition", "rational-inattention"],
    takeaway: "Bridges theoretical information costs and experimentally disciplined behavior.",
    digest: {
      short: "This paper separates two ways of modeling information cost. A posterior-based cost assigns cost to the distribution of posterior beliefs. An experiment-based cost assigns cost to the actual experiment or signal technology. The paper shows that these two representations are not innocently interchangeable: many posterior-based costs used in rational inattention are inconsistent with a primitive model in which experiments themselves are the costly objects.",
      motivation: `
        <p><strong>Motivation.</strong> In applications, economists often describe information by the posterior beliefs it generates. But real information is produced by concrete technologies: a survey, a test, a database, an algorithm, a conversation, or a market signal. Two technologies can lead to the same posterior distribution in one environment and differ sharply in another.</p>
        <p><strong>Reality example.</strong> A medical test and a financial report may both move a decision maker from prior \(1/2\) to posteriors \(0.8\) or \(0.2\). But the medical test has laboratory costs and error structures; the financial report has data and analyst costs. If the environment changes, the same posterior representation may hide very different experimental technologies.</p>
        <p><strong>Implication.</strong> The paper warns that posterior-based rational inattention can be fragile in games and equilibrium settings where beliefs and priors are endogenous.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> The posterior approach treats an information choice as a Bayes-plausible distribution \(\pi\) over posteriors and assigns cost \(K(\pi,\mu)\). The experiment approach treats the primitive object as a signal kernel \(\alpha(s\mid\omega)\) and assigns cost \(C(\alpha)\) or \(C(\alpha,\mu)\).</p>
        <p><strong>Main warning.</strong> A posterior distribution is not the same thing as an experiment. The mapping from experiments to posteriors depends on the prior. Therefore a cost that looks well-defined over posteriors at one prior may fail to correspond to any stable primitive cost of experiments across priors or equilibrium beliefs.</p>
      `,
      deep: String.raw`
        <h3>1. Experiment Representation</h3>
        <p>Let \(\Omega\) be a finite state space and let \(S\) be a signal set. A Blackwell experiment is a stochastic kernel</p>
        <div class="math">
          \[
            \alpha:S\times\Omega\to[0,1],
            \qquad
            \sum_{s\in S}\alpha(s\mid\omega)=1.
          \]
        </div>
        <p>Given prior \(\mu\), the experiment induces signal probabilities</p>
        <div class="math">
          \[
            m_{\alpha,\mu}(s)=\sum_{\omega\in\Omega}\mu(\omega)\alpha(s\mid\omega),
          \]
        </div>
        <p>and posterior beliefs</p>
        <div class="math">
          \[
            p_{\alpha,\mu}(\omega\mid s)
            =
            \frac{\mu(\omega)\alpha(s\mid\omega)}
            {\sum_{\omega'}\mu(\omega')\alpha(s\mid\omega')}.
          \]
        </div>
        <p>Thus an experiment \(\alpha\) plus a prior \(\mu\) generates a posterior distribution \(\pi_{\alpha,\mu}\in\Delta(\Delta(\Omega))\).</p>
        <h3>2. Posterior-Cost Representation</h3>
        <p>The rational-inattention literature often writes the choice problem as</p>
        <div class="math">
          \[
            \max_{\pi:\mathbb{E}_{\pi}[p]=\mu}
            \left\{
              \int v(p)\,d\pi(p)-K(\pi,\mu)
            \right\}.
          \]
        </div>
        <p>Here all experiments that generate the same posterior distribution at prior \(\mu\) are treated as equivalent.</p>
        <h3>3. Experimental-Cost Representation</h3>
        <p>The experiment-based approach instead writes</p>
        <div class="math">
          \[
            \max_{\alpha}
            \left\{
              \sum_{s\in S}m_{\alpha,\mu}(s)
              v(p_{\alpha,\mu}(\cdot\mid s))
              -
              C(\alpha)
            \right\}.
          \]
        </div>
        <p>Now the physical or statistical experiment is the costly object. If the prior changes, the posterior distribution induced by the same \(\alpha\) changes, but the underlying experiment can remain the same.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Representation Tension</h3>
          <p>The paper shows that many posterior-based costs cannot be generated by a stable primitive cost over experiments. The obstruction is that the mapping</p>
          <div class="math">
            \[
              (\alpha,\mu)\mapsto \pi_{\alpha,\mu}
            \]
          </div>
          <p>depends on \(\mu\). A posterior cost \(K(\pi,\mu)\) is experimentally grounded only if it assigns consistent costs to posterior distributions that are generated by the same underlying experiment across different priors.</p>
        </div>
        <p>This matters especially in equilibrium analysis. When beliefs are endogenous, a posterior-cost model may accidentally make the cost of a fixed experiment vary in a way that has no primitive experimental interpretation.</p>
      `,
      example: String.raw`
        <h3>Binary Diagnostic Example</h3>
        <p>Let \(\Omega=\{0,1\}\). A test has accuracy \(r\in(1/2,1)\):</p>
        <div class="math">
          \[
            \alpha(H\mid 1)=r,\qquad
            \alpha(H\mid 0)=1-r.
          \]
        </div>
        <p>If the prior is \(\mu(1)=1/2\), then after signal \(H\),</p>
        <div class="math">
          \[
            \Pr(1\mid H)
            =
            \frac{(1/2)r}{(1/2)r+(1/2)(1-r)}
            =
            r.
          \]
        </div>
        <p>If the prior is \(\mu(1)=0.9\), the same test produces</p>
        <div class="math">
          \[
            \Pr(1\mid H)
            =
            \frac{0.9r}{0.9r+0.1(1-r)}.
          \]
        </div>
        <p>The experiment did not change. But the posterior distribution did. A posterior-based cost must be very disciplined if it is to represent the same physical test at both priors.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper clarifies the relation between statistical decision theory, where experiments are primitive, and rational inattention, where distributions of posteriors are often primitive. It explains why posterior-based costs are convenient but can be problematic in games, equilibrium, and endogenous-belief environments.</p>
        <p><strong>Proof technique.</strong> The key proof idea is invariance across priors. Take the same experiment, compute the posterior distributions it induces at different priors, and ask whether the posterior-cost formula assigns costs consistent with one underlying experimental cost. Failures of this invariance reveal that a posterior cost has no experiment-level foundation.</p>
        <p><strong>Useful secondary technique.</strong> A useful method is to separate the object chosen by the agent from the sufficient statistic used by the analyst. The experiment \(\alpha\) is the primitive object; the posterior distribution \(\pi_{\alpha,\mu}\) is a prior-dependent image of it. This distinction is valuable in many information-design and learning problems.</p>
        <p><strong>Problem solved.</strong> The paper solves a conceptual identification problem: when can the cost of information be interpreted as the cost of an experiment rather than merely the cost of a posterior distribution?</p>
        <p><strong>Open questions.</strong> A natural next question is how to build tractable equilibrium models with experiment-based costs. Another is empirical: when we observe choices across changing priors, can we distinguish physical experiment costs from posterior-separable costs? A third is dynamic: can an agent reuse the same experiment over time, making cost depend on accumulated infrastructure?</p>
        <p><strong>My comment.</strong> This paper is especially important if you want to combine rational inattention with games or learning. It says: be careful, because a posterior is not a technology. A promising new paper could study social learning when agents buy reusable experiments, so later agents inherit an information technology rather than merely a distribution of beliefs.</p>
      `,
    },
  },
  {
    id: "colombo-femminis-pavan-2014",
    title: "Information Acquisition and Welfare",
    authors: "Luca Colombo; Gianluca Femminis; Alessandro Pavan",
    journal: "The Review of Economic Studies",
    year: 2014,
    doi: "10.1093/restud/rdu015",
    status: "Digested",
    tags: ["information-acquisition"],
    takeaway: "Studies welfare effects when agents endogenously acquire information.",
    digest: {
      short: "Colombo, Femminis, and Pavan study whether decentralized information acquisition is socially efficient. The central message is that private agents choose information for private payoff reasons, while a planner cares about how each agent's information affects other agents through equilibrium actions. The welfare wedge can make equilibrium information acquisition too high, too low, or wrongly directed.",
      motivation: `
        <p><strong>Motivation.</strong> Information acquisition has externalities. A firm learning demand may help competitors infer market conditions. A trader learning fundamentals may make prices more informative. A policymaker's public statistic may coordinate many private decisions. Private incentives do not automatically produce the socially right amount of information.</p>
        <p><strong>Reality example.</strong> In a currency-attack environment, each trader wants to know whether others will attack. Private research can help the trader profit, but it can also amplify coordination on a socially costly run. In a production network, one firm's information about demand can improve its own output choice and also change the information content of prices for others.</p>
        <p><strong>Implication.</strong> The paper is a warning against the simple view that more private information is always good. Welfare depends on the strategic environment in which information is used.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> The value of information has two components. The private component is the effect of information on the agent's own payoff. The social component includes how the agent's better-informed action changes payoffs and information for others.</p>
        <p><strong>Canonical form.</strong> Agents choose signal precision before playing a game. Equilibrium precision solves a private first-order condition; efficient precision solves a planner's first-order condition. The difference is the information externality.</p>
      `,
      deep: String.raw`
        <h3>1. General Information-Acquisition Game</h3>
        <p>There are agents \(i=1,\ldots,n\), an uncertain state \(\theta\), and actions \(a_i\in A_i\). Before acting, agent \(i\) chooses an information structure or precision level \(x_i\ge0\). A convenient signal representation is</p>
        <div class="math">
          \[
            s_i=\theta+\varepsilon_i,
            \qquad
            \varepsilon_i\sim N(0,1/x_i),
          \]
        </div>
        <p>where higher \(x_i\) means more precise information and cost \(c_i(x_i)\). After observing signals, agents choose actions in a Bayesian game:</p>
        <div class="math">
          \[
            a_i(s_i)
            \in
            \arg\max_{a_i}
            \mathbb{E}\left[u_i(a_i,a_{-i},\theta)\mid s_i\right].
          \]
        </div>
        <h3>2. Private Information Choice</h3>
        <p>An equilibrium precision profile \(x^*=(x_1^*,\ldots,x_n^*)\) satisfies</p>
        <div class="math">
          \[
            x_i^*
            \in
            \arg\max_{x_i\ge0}
            U_i(x_i,x_{-i}^*)-c_i(x_i),
          \]
        </div>
        <p>where \(U_i\) is the interim expected payoff induced by the continuation equilibrium. If the optimum is interior,</p>
        <div class="math">
          \[
            \frac{\partial U_i}{\partial x_i}(x^*)
            =
            c_i'(x_i^*).
          \]
        </div>
        <h3>3. Planner's Problem</h3>
        <p>A utilitarian planner internalizes all payoff effects of agent \(i\)'s information:</p>
        <div class="math">
          \[
            W(x)
            =
            \sum_{j=1}^n U_j(x)-\sum_{j=1}^n c_j(x_j).
          \]
        </div>
        <p>The efficient precision \(x^{FB}\) satisfies</p>
        <div class="math">
          \[
            \frac{\partial U_i}{\partial x_i}(x^{FB})
            +
            \sum_{j\ne i}\frac{\partial U_j}{\partial x_i}(x^{FB})
            =
            c_i'(x_i^{FB}).
          \]
        </div>
        <p>The wedge is therefore</p>
        <div class="math">
          \[
            \underbrace{
            \sum_{j\ne i}\frac{\partial U_j}{\partial x_i}
            }_{\text{information externality}}.
          \]
        </div>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Welfare Characterization</h3>
          <p>The core result characterizes when equilibrium information acquisition differs from the efficient benchmark. Private and social values coincide only under special payoff and information structures. Otherwise, strategic complementarities, substitutes, and informational spillovers determine whether equilibrium attention is excessive or insufficient.</p>
        </div>
        <p>The paper's contribution is to make the welfare comparison explicit: the sign of the distortion is not universal. It depends on how information changes both the agent's own action and the strategic response of others.</p>
      `,
      example: String.raw`
        <h3>Two-Firm Demand Example</h3>
        <p>Two firms choose quantities \(q_i\). Demand is high or low, represented by \(\theta\). Firm \(i\) can buy precision \(x_i\) about \(\theta\), then chooses output. Suppose profits are</p>
        <div class="math">
          \[
            \pi_i(q_i,q_j,\theta)
            =
            q_i(\theta-q_i-\gamma q_j).
          \]
        </div>
        <p>If \(\gamma>0\), outputs are strategic substitutes. A firm that learns demand better changes output more aggressively, which affects the rival. The private condition is</p>
        <div class="math">
          \[
            MB_i^{private}(x_i,x_j)=c'(x_i),
          \]
        </div>
        <p>while the planner uses</p>
        <div class="math">
          \[
            MB_i^{private}(x_i,x_j)+MB_i^{spillover}(x_i,x_j)=c'(x_i).
          \]
        </div>
        <p>If the spillover is positive, firms under-acquire information. If the spillover is negative, firms over-acquire it. The key lesson is not the sign, but that the sign is endogenous to the strategic environment.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper connects endogenous information acquisition with welfare analysis in games. It relates to global games, beauty-contest models, rational expectations, and information externalities by asking whether decentralized information choices are socially desirable.</p>
        <p><strong>Proof technique.</strong> The useful proof technique is marginal-value decomposition. Write the equilibrium first-order condition for information choice, then write the planner's first-order condition and subtract. This isolates the externality term that private agents fail to internalize.</p>
        <p><strong>Useful secondary technique.</strong> In linear-quadratic Gaussian examples, posterior variances make information values tractable. The proof can often reduce complicated belief effects to derivatives of conditional variances and equilibrium action coefficients.</p>
        <p><strong>Problem solved.</strong> The paper solves the normative question: when should a planner encourage, discourage, subsidize, tax, or publicly provide information?</p>
        <p><strong>Open questions.</strong> Natural extensions include networked information acquisition, endogenous public disclosure, rational inattention costs instead of precision costs, and welfare with misspecified beliefs. A particularly promising question is whether agents over-acquire information in social-learning environments because their actions become public signals.</p>
        <p><strong>My comment.</strong> This is useful because it gives you a recipe for welfare papers: identify the private marginal value of information, identify the social marginal value, and study the wedge. Many new papers can be built by changing the strategic environment that determines the wedge.</p>
      `,
    },
  },
  {
    id: "roesler-szentes-2017",
    title: "Buyer-Optimal Learning and Monopoly Pricing",
    authors: "Anne-Katrin Roesler; Balazs Szentes",
    journal: "American Economic Review",
    year: 2017,
    doi: "10.1257/aer.20160145",
    status: "Digested",
    tags: ["information-acquisition", "information-design"],
    takeaway: "A central paper on optimal buyer information and seller pricing.",
    digest: {
      short: "Roesler and Szentes ask what information structure a buyer would choose before facing a monopoly price. The buyer's valuation is uncertain; after learning, the seller makes a take-it-or-leave-it offer. The buyer-optimal signal induces efficient trade and a unit-elastic demand curve, and all buyer-optimal signals lead to the same outcome and price.",
      motivation: `
        <p><strong>Motivation.</strong> Consumers often learn about their own willingness to pay before seeing a price: test-driving a car, reading reviews, measuring fit, or learning how much they need a product. But better learning can make the buyer easier for a monopolist to price discriminate against through a single posted price.</p>
        <p><strong>Reality example.</strong> A buyer considering software may learn whether it is essential for her work. If she becomes too sure that it is essential, the seller can set a high price. The buyer would like information that helps her avoid bad purchases without making demand too exploitable.</p>
        <p><strong>Implication.</strong> The buyer's favorite information structure is not full information. It is designed to discipline monopoly pricing.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> The buyer chooses a signal about her valuation. The signal induces a distribution of posterior expected values. The seller observes the distribution, not the realization, and chooses a monopoly price. The buyer chooses the distribution that maximizes expected surplus after anticipating the seller's price.</p>
        <p><strong>Main result from the abstract.</strong> The buyer-optimal signal generates efficient trade and unit-elastic demand; every buyer-optimal signal yields the same outcome and the same price.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>A buyer's valuation \(v\) for one object is uncertain. Let the prior distribution be \(F\) on \(\mathbb{R}_+\). Before the seller prices, the buyer chooses an information structure about \(v\). The information structure induces a posterior mean</p>
        <div class="math">
          \[
            x=\mathbb{E}[v\mid s],
          \]
        </div>
        <p>with distribution \(G\). Bayes plausibility requires</p>
        <div class="math">
          \[
            \int x\,dG(x)=\mathbb{E}[v].
          \]
        </div>
        <h3>2. Seller Pricing</h3>
        <p>After observing \(G\), the seller posts price \(p\). The buyer purchases iff her posterior mean exceeds the price:</p>
        <div class="math">
          \[
            x\ge p.
          \]
        </div>
        <p>Seller revenue is</p>
        <div class="math">
          \[
            R_G(p)=p[1-G(p)].
          \]
        </div>
        <p>The monopoly price is</p>
        <div class="math">
          \[
            p(G)\in\arg\max_{p\ge0}p[1-G(p)].
          \]
        </div>
        <h3>3. Buyer's Information Problem</h3>
        <p>The buyer chooses \(G\) to maximize expected net surplus:</p>
        <div class="math">
          \[
            \max_{G:\int x\,dG(x)=\mathbb{E}[v]}
            \int_{x\ge p(G)}(x-p(G))\,dG(x).
          \]
        </div>
        <p>The tension is that a more informative signal improves the buyer's purchase decision but can also move the monopoly price against her.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Buyer-Optimal Signal</h3>
          <p>There exists a buyer-optimal signal structure whose induced demand is unit elastic over the relevant support:</p>
          <div class="math">
            \[
              p[1-G(p)]=\text{constant}
              \quad\text{for relevant }p.
            \]
          </div>
          <p>This makes the seller indifferent across prices in the support and limits his ability to extract surplus. The signal also generates efficient trade, and every buyer-optimal signal yields the same price and allocation outcome.</p>
        </div>
      `,
      example: String.raw`
        <h3>Software Buyer Example</h3>
        <p>A buyer's value is either high or low:</p>
        <div class="math">
          \[
            v\in\{0,10\},
            \qquad
            \Pr(v=10)=1/2.
          \]
        </div>
        <p>Full information tells the buyer whether \(v=10\). Then a monopolist may charge close to \(10\), extracting most surplus from high-value buyers. No information gives posterior mean \(5\), so the seller charges at most \(5\), but inefficient trade may occur because low-value buyers buy or high-value distinctions are lost.</p>
        <p>The buyer wants an intermediate signal. It should make her buy when trade is efficient, but shape the induced demand so the seller cannot profitably raise price too much:</p>
        <div class="math">
          \[
            R(p)=p\Pr(x\ge p)
          \]
        </div>
        <p>is flattened over the prices the seller might choose. This is the unit-elastic demand idea.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper is a benchmark in information design with a privately interested information chooser. It complements Bayesian persuasion, monopoly pricing, and consumer search by letting the buyer choose what she learns before the seller prices.</p>
        <p><strong>Proof technique.</strong> The main technique is to transform information structures into distributions of posterior means and then use revenue-curve geometry. Bayes plausibility becomes a mean constraint, and monopoly pricing becomes the upper envelope of \(p[1-G(p)]\).</p>
        <p><strong>Useful secondary technique.</strong> Unit-elastic demand is a powerful construction. By flattening the seller's revenue curve, the buyer controls the seller's pricing incentive. This trick is reusable in mechanism and information-design problems where one side chooses information before another side chooses a price.</p>
        <p><strong>Problem solved.</strong> The paper solves the buyer's optimal learning problem under monopoly pricing and shows that optimal learning strategically shapes market power.</p>
        <p><strong>Open questions.</strong> Extensions include competition among sellers, dynamic learning before repeated purchases, costly information acquisition, and social learning among buyers. A new paper could study platforms that design review systems to approximate buyer-optimal learning while sellers respond with prices.</p>
        <p><strong>My comment.</strong> This paper is elegant because the optimal signal is not about maximum accuracy. It is about strategic demand shaping. That idea is extremely portable.</p>
      `,
    },
  },
  {
    id: "bobkova-2024-auctions",
    title: "Information Choice in Auctions",
    authors: "Nina Bobkova",
    journal: "American Economic Review",
    year: 2024,
    doi: "10.1257/aer.20221297",
    status: "Digested",
    tags: ["information-acquisition", "auctions"],
    takeaway: "Studies endogenous information choice in auction environments.",
    digest: {
      short: "Bobkova studies how auction format affects what bidders choose to learn. Some object characteristics are common to all bidders and do not affect who should efficiently win; others are bidder-specific and determine the efficient allocation. The paper shows when second-price auctions induce socially relevant learning and why they can outperform first-price auctions in directing bidders' attention.",
      motivation: `
        <p><strong>Motivation.</strong> Auctions do not only allocate objects. They also shape bidders' incentives to inspect, research, and learn. If bidders spend attention on information that helps them win but does not improve allocation, the auction can waste information effort.</p>
        <p><strong>Reality example.</strong> In a spectrum auction, all firms may care about general market growth, but the efficient winner depends on firm-specific fit with the spectrum license. A good auction should induce bidders to learn about fit, not only about common resale value or hype.</p>
        <p><strong>Implication.</strong> Mechanism design must consider the information bidders acquire before bidding, not only how they bid after information is fixed.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> Object characteristics differ in social relevance. Common characteristics affect all bidders similarly and do not determine the efficient winner. Bidder-specific characteristics determine who values the object most. Bobkova shows that second-price auctions can induce bidders to learn more about socially relevant components and less about common components than first-price auctions.</p>
      `,
      deep: String.raw`
        <h3>1. Valuation Components</h3>
        <p>There are bidders \(i=1,\ldots,n\). Bidder \(i\)'s value for the object has a common component and an idiosyncratic component:</p>
        <div class="math">
          \[
            v_i=\theta_c+\theta_i.
          \]
        </div>
        <p>The common component \(\theta_c\) is valued equally by all bidders. It affects the level of values but not the identity of the efficient winner. The bidder-specific component \(\theta_i\) determines which bidder has the highest valuation.</p>
        <h3>2. Information Choice</h3>
        <p>Before bidding, each bidder chooses how to allocate learning effort across components. A simple representation is</p>
        <div class="math">
          \[
            x_i=(x_{ic},x_{ii}),
            \qquad
            c(x_i)=c_c(x_{ic})+c_i(x_{ii}),
          \]
        </div>
        <p>where \(x_{ic}\) is precision about the common component and \(x_{ii}\) is precision about the bidder-specific component. Signals may be written as</p>
        <div class="math">
          \[
            s_{ic}=\theta_c+\varepsilon_{ic},
            \qquad
            s_{ii}=\theta_i+\varepsilon_{ii},
          \]
        </div>
        <p>with noise decreasing in the chosen precision.</p>
        <h3>3. Efficient Learning</h3>
        <p>The socially relevant information is information that improves allocation:</p>
        <div class="math">
          \[
            i^*(\theta)=\arg\max_i v_i.
          \]
        </div>
        <p>Learning \(\theta_c\) helps bidders estimate the level of the object's value, but if all bidders value it equally, it does not help determine \(i^*(\theta)\). Learning \(\theta_i\) helps identify the efficient winner.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Auction Format Directs Attention</h3>
          <p>The paper shows conditions under which the second-price auction is ex ante efficient because it induces bidders to acquire socially relevant information. Under continuous learning tradeoffs, bidders in a second-price auction learn more about bidder-specific components and less about common characteristics than in a first-price auction.</p>
        </div>
        <p>The intuition is that second-price bidding makes the marginal value of learning closer to the marginal social value of improving allocation. First-price bidding adds strategic bid-shading motives that can distort what information is privately useful.</p>
      `,
      example: String.raw`
        <h3>Two-Bidder Example</h3>
        <p>Two firms bid for a procurement contract. Values are</p>
        <div class="math">
          \[
            v_1=\theta_c+\theta_1,\qquad
            v_2=\theta_c+\theta_2.
          \]
        </div>
        <p>If \(\theta_c\) is high, both firms value the contract more. But efficiency depends on whether \(\theta_1 &gt; \theta_2\). Learning \(\theta_c\) may help a bidder decide how high to bid, but learning \(\theta_i\) helps determine whether that bidder should win.</p>
        <p>In a second-price auction with truthful bidding after learning, the bidder benefits from learning whether she is truly the high-value bidder. This aligns private learning with efficient allocation:</p>
        <div class="math">
          \[
            \Pr(\text{winner}=\arg\max_i v_i)
          \]
        </div>
        <p>increases when bidders learn more about the idiosyncratic components.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to auction theory with endogenous information acquisition. It shifts attention from bidding equilibria with fixed signals to the prior choice of what bidders learn, and it gives a new efficiency rationale for second-price auctions.</p>
        <p><strong>Proof technique.</strong> The useful technique is marginal learning comparison across mechanisms. The proof compares the private marginal value of precision about common versus idiosyncratic components under first-price and second-price rules, then relates those marginal values to social allocation value.</p>
        <p><strong>Useful secondary technique.</strong> Decomposing values into common and allocation-relevant components is very useful. It lets the proof separate information that improves surplus allocation from information that only improves private bidding strategy.</p>
        <p><strong>Problem solved.</strong> The paper solves when auction design induces efficient information choice, not just efficient bidding conditional on information.</p>
        <p><strong>Open questions.</strong> Extensions include multi-unit auctions, resale, affiliated signals, budget constraints, and platforms that can disclose some common information publicly before bidders choose what to learn. A new paper could ask whether public disclosure of common components further shifts private learning toward socially relevant idiosyncratic information.</p>
        <p><strong>My comment.</strong> This paper is a clean reminder that mechanism design changes cognition. The action rule shapes what agents find worth learning.</p>
      `,
    },
  },
  {
    id: "hebert-lao-2023",
    title: "Information Acquisition, Efficiency, and Nonfundamental Volatility",
    authors: "Benjamin Hebert; Jennifer La'O",
    journal: "Journal of Political Economy",
    year: 2023,
    doi: "10.1086/724575",
    status: "Digested",
    tags: ["information-acquisition", "aggregation", "macro-finance"],
    takeaway: "Links private information acquisition to efficiency and excess volatility.",
    digest: {
      short: "Hebert and La'O study how endogenous information acquisition affects efficiency and nonfundamental volatility. The core issue is that private agents may acquire information that helps them forecast market outcomes but does not improve fundamentals. When information choices interact through prices or aggregate variables, equilibrium can generate volatility driven by beliefs and coordination rather than fundamentals alone.",
      motivation: `
        <p><strong>Motivation.</strong> Financial markets and macro economies often move too much relative to measured fundamentals. One reason is that agents spend resources learning what others know or what prices will do, not only what fundamentals are.</p>
        <p><strong>Reality example.</strong> Investors may buy data about order flow, sentiment, or central-bank reaction functions. Such data can be privately valuable because it predicts prices, but it may not improve real investment decisions. The result can be more trading and volatility without a proportional improvement in allocative efficiency.</p>
        <p><strong>Implication.</strong> The social value of information depends on whether it improves real decisions or mainly helps agents forecast endogenous market movements.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Endogenous information acquisition can create a gap between privately valuable information and socially valuable information. The paper connects this gap to nonfundamental volatility: fluctuations caused by information and beliefs rather than changes in payoff fundamentals.</p>
        <p><strong>Modeling frame.</strong> Agents choose signals before making actions such as trading, investment, or production. Prices aggregate information but also become objects agents want to forecast. This feedback makes some information privately useful even when it has limited social value.</p>
      `,
      deep: String.raw`
        <h3>1. Generic Market-Learning Environment</h3>
        <p>There is a payoff-relevant fundamental \(\theta\) and possibly a nonfundamental shock \(\eta\). Agents \(i=1,\ldots,n\) choose information structures before taking actions \(a_i\). A reduced-form signal system is</p>
        <div class="math">
          \[
            s_i = L_i(\theta,\eta)+\varepsilon_i,
          \]
        </div>
        <p>where \(L_i\) determines whether the signal is mostly about fundamentals, endogenous market conditions, or nonfundamental disturbances.</p>
        <h3>2. Private Problem</h3>
        <p>Agent \(i\) chooses information \(I_i\) at cost \(C_i(I_i)\) and then chooses an action:</p>
        <div class="math">
          \[
            a_i(s_i)
            \in
            \arg\max_{a_i}
            \mathbb{E}\left[u_i(a_i,A,\theta,\eta)\mid s_i\right],
          \]
        </div>
        <p>where \(A\) is an aggregate outcome such as a price, investment level, or market-clearing object. The private value of information includes its value for forecasting \(A\).</p>
        <h3>3. Social Problem</h3>
        <p>A planner cares about real efficiency, not purely redistributive forecasting gains:</p>
        <div class="math">
          \[
            W
            =
            \mathbb{E}\left[\sum_i w_i(a_i,A,\theta)\right]
            -
            \sum_i C_i(I_i).
          \]
        </div>
        <p>The private and social marginal values of information differ when information helps predict price movements or aggregate actions without improving the matching of real actions to fundamentals.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Efficiency And Nonfundamental Volatility</h3>
          <p>The main result characterizes when equilibrium information acquisition is efficient and when it generates socially excessive nonfundamental volatility. The key object is the wedge</p>
          <div class="math">
            \[
              MV_i^{private}(I_i)
              -
              MV_i^{social}(I_i),
            \]
          </div>
          <p>which is positive when information mainly improves private forecasting of endogenous outcomes and negative when agents fail to internalize the social value of price informativeness.</p>
        </div>
        <p>The paper belongs to the Hayek-Grossman-Stiglitz tradition but focuses on information acquisition itself as the source of either efficiency or excess volatility.</p>
      `,
      example: String.raw`
        <h3>Asset-Market Example</h3>
        <p>An asset payoff is</p>
        <div class="math">
          \[
            v=\theta+\eta,
          \]
        </div>
        <p>where \(\theta\) is a real fundamental and \(\eta\) is a nonfundamental demand or noise component. Traders can learn either \(\theta\) or \(\eta\). Learning \(\theta\) improves allocation because prices better reflect true payoffs. Learning \(\eta\) may be privately profitable because it predicts short-run price pressure.</p>
        <p>If many traders learn \(\eta\), prices may move strongly with nonfundamental demand:</p>
        <div class="math">
          \[
            \operatorname{Var}(P\mid\theta)
          \]
        </div>
        <p>rises even though real payoff information has not improved. That is the sense in which information acquisition can create nonfundamental volatility.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to rational expectations, information acquisition, and macro-finance by studying when private learning improves allocative efficiency and when it amplifies nonfundamental volatility.</p>
        <p><strong>Proof technique.</strong> The reusable technique is a private-versus-social value decomposition for signals. The proof identifies which components of a signal change real surplus and which components only change agents' ability to forecast endogenous market variables.</p>
        <p><strong>Useful secondary technique.</strong> In market models, prices are both aggregators and targets of prediction. A useful proof move is to decompose price variance into fundamental and nonfundamental components, then relate each component to equilibrium information choices.</p>
        <p><strong>Problem solved.</strong> The paper explains how privately optimal information acquisition can be inefficient and can generate volatility unrelated to fundamentals.</p>
        <p><strong>Open questions.</strong> Extensions include heterogeneous information technologies, policy disclosure, information taxes or subsidies, and dynamic learning where today's nonfundamental volatility changes tomorrow's information demand.</p>
        <p><strong>My comment.</strong> The paper is especially valuable for connecting abstract information acquisition to real macro-finance phenomena. A new paper could combine this with behavioral learning: if agents misclassify nonfundamental volatility as fundamental news, private information acquisition may create persistent mislearning.</p>
      `,
    },
  },
  {
    id: "goldstein-yang-2015",
    title: "Information Diversity and Complementarities in Trading and Information Acquisition",
    authors: "Itay Goldstein; Liyan Yang",
    journal: "The Journal of Finance",
    year: 2015,
    doi: "10.1111/jofi.12226",
    status: "Digested",
    tags: ["information-acquisition", "aggregation", "finance"],
    takeaway: "Finance-theory paper on complementarities in traders' information acquisition.",
    digest: {
      short: "Goldstein and Yang study a market in which different traders learn about different fundamentals that affect security value. The key mechanism is complementarity: aggressive trading on one fundamental reduces uncertainty for trading on another fundamental, encouraging more trading and more information acquisition. Greater diversity of information improves price informativeness.",
      motivation: `
        <p><strong>Motivation.</strong> Financial markets aggregate many kinds of information: earnings, technology, regulation, macro risk, liquidity, and sentiment. If everyone studies the same dimension, prices may be less informative than if traders specialize in different dimensions.</p>
        <p><strong>Reality example.</strong> In a stock market, some analysts study demand, others study costs, and others study regulation. Trading by demand analysts can make prices partially reveal demand, which helps cost analysts trade more confidently on their own information. Diversity can therefore create complementarities rather than fragmentation.</p>
        <p><strong>Implication.</strong> More diverse information in the economy can make prices more informative because information types reinforce each other through trading.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> Traders are informed about different fundamentals. Trading on one fundamental reduces uncertainty faced by traders informed about another fundamental, which creates strategic complementarities in trading and information acquisition. As a result, changes in the information environment can be amplified, and information diversity improves price informativeness.</p>
      `,
      deep: String.raw`
        <h3>1. Asset Value</h3>
        <p>The security payoff depends on multiple fundamentals:</p>
        <div class="math">
          \[
            v=\theta_1+\theta_2+\cdots+\theta_K.
          \]
        </div>
        <p>Different trader groups may observe or acquire information about different \(\theta_k\)'s. A trader specializing in component \(k\) observes</p>
        <div class="math">
          \[
            s_{ik}=\theta_k+\varepsilon_{ik}.
          \]
        </div>
        <h3>2. Trading And Price</h3>
        <p>Traders submit orders based on signals. A linear reduced-form representation is</p>
        <div class="math">
          \[
            x_{ik}=\beta_k s_{ik},
            \qquad
            P=\mathbb{E}[v\mid X+u],
          \]
        </div>
        <p>where \(X\) is aggregate informed order flow and \(u\) is noise trading. Price informativeness is how much observing \(P\) reduces uncertainty about \(v\):</p>
        <div class="math">
          \[
            \operatorname{Var}(v\mid P)
            <
            \operatorname{Var}(v).
          \]
        </div>
        <h3>3. Information Acquisition</h3>
        <p>Before trading, traders can choose whether to acquire information about a component. The private value of information about \(\theta_k\) increases when other components are better revealed through price, because residual uncertainty is lower and the trader can trade more aggressively on her own signal.</p>
        <div class="math">
          \[
            MB_k^{info}
            =
            \frac{\partial \mathbb{E}[\pi_k]}{\partial \tau_k}
          \]
        </div>
        <p>where \(\tau_k\) is signal precision for component \(k\).</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Complementarities And Diversity</h3>
          <p>Trading and information acquisition across different fundamentals are strategic complements. More aggressive trading on one component makes information about other components more valuable. Therefore, greater diversity of information improves price informativeness and can amplify shocks to the information environment.</p>
        </div>
      `,
      example: String.raw`
        <h3>Two-Fundamental Example</h3>
        <p>The asset payoff is \(v=\theta_D+\theta_C\), where \(\theta_D\) is demand growth and \(\theta_C\) is cost efficiency. Demand analysts observe \(s_D=\theta_D+\varepsilon_D\), and cost analysts observe \(s_C=\theta_C+\varepsilon_C\).</p>
        <p>If demand analysts trade aggressively, price partly reveals \(\theta_D\). Cost analysts then face less uncertainty about the non-cost part of value, so their signal \(s_C\) becomes more useful. They trade more aggressively too. The complementarity is</p>
        <div class="math">
          \[
            \frac{\partial MB_C^{info}}{\partial \tau_D}>0,
            \qquad
            \frac{\partial MB_D^{info}}{\partial \tau_C}>0.
          \]
        </div>
        <p>This is why information diversity can make the whole price system more informative.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to noisy rational expectations and information acquisition in finance by showing that different kinds of information can be complementary. It qualifies the view that traders' information choices are simply substitutes because prices reveal what others know.</p>
        <p><strong>Proof technique.</strong> The main technique is equilibrium decomposition across fundamentals. By writing value as a sum of components, the proof tracks how trading intensity on one component changes residual uncertainty and hence the marginal value of learning another component.</p>
        <p><strong>Useful secondary technique.</strong> The linear-Gaussian structure is useful because price informativeness can be measured by conditional variances. Complementarity becomes a sign condition on derivatives of trading intensity or information value with respect to signal precision.</p>
        <p><strong>Problem solved.</strong> The paper explains why diversity in information acquisition can improve aggregation and why shocks to one information sector can have amplified market effects.</p>
        <p><strong>Open questions.</strong> Extensions include endogenous specialization networks, costly attention across many fundamentals, algorithmic trading with correlated information sources, and welfare analysis of information diversity.</p>
        <p><strong>My comment.</strong> The paper's most useful idea is that price revelation can make other information more valuable, not less. A new theory paper could study whether social-learning networks exhibit the same cross-topic complementarity.</p>
      `,
    },
  },
  {
    id: "he-manela-2016",
    title: "Information Acquisition in Rumor-Based Bank Runs",
    authors: "Zhiguo He; Asaf Manela",
    journal: "The Journal of Finance",
    year: 2016,
    doi: "10.1111/jofi.12202",
    status: "Digested",
    tags: ["information-acquisition", "finance", "learning"],
    takeaway: "Studies how information acquisition interacts with panic and bank-run dynamics.",
    digest: {
      short: "He and Manela study dynamic withdrawal decisions when a rumor exposes a solvent bank to a run. Depositors who hear the rumor may acquire costly noisy signals about bank liquidity or solvency. Less informative signals can make depositors wait before gradually running, creating an endogenous withdrawal speed and survival time. Public solvency information can mitigate runs by crowding out private liquidity-information acquisition.",
      motivation: `
        <p><strong>Motivation.</strong> Bank runs are information events as well as coordination events. A rumor does not just scare depositors; it changes what they choose to learn and how fast they withdraw.</p>
        <p><strong>Reality example.</strong> During a banking panic, depositors may read news, call friends, inspect stock prices, or watch withdrawal lines. Each private signal may be noisy. If many depositors privately investigate liquidity, their decisions can accelerate a run even when the bank is solvent but illiquid.</p>
        <p><strong>Implication.</strong> Public disclosure can stabilize banks not only by informing depositors directly, but by reducing their incentive to acquire destabilizing private information.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> A spreading rumor creates uncertainty about liquidity and potential failure. Depositors acquire noisy signals and then choose when to withdraw. The model produces endogenous aggregate withdrawal speed and bank survival time. Private information acquisition can expose solvent-but-illiquid banks to runs and shorten the survival time of failing banks.</p>
      `,
      deep: String.raw`
        <h3>1. Bank State And Rumor</h3>
        <p>A bank has uncertain condition \(\theta\), which may include solvency and liquidity. A rumor arrives and reaches depositors over time. Depositor \(i\) decides whether and when to withdraw.</p>
        <div class="math">
          \[
            \theta\in\{\text{solvent},\text{insolvent}\}
            \times
            \{\text{liquid},\text{illiquid}\}.
          \]
        </div>
        <h3>2. Information Acquisition</h3>
        <p>After hearing the rumor, a depositor can acquire a noisy signal \(s_i\) at cost \(c\):</p>
        <div class="math">
          \[
            s_i=\theta+\varepsilon_i,
            \qquad
            \varepsilon_i\sim F.
          \]
        </div>
        <p>The signal may be more informative for liquidity than for solvency. This distinction matters because liquidity information can increase the incentive to run even when the bank is fundamentally solvent.</p>
        <h3>3. Withdrawal Timing</h3>
        <p>Let \(\tau_i\) be depositor \(i\)'s withdrawal time. The payoff from waiting depends on interest or convenience benefits, but waiting is risky because the bank may fail before the depositor withdraws:</p>
        <div class="math">
          \[
            \tau_i^*
            \in
            \arg\max_{\tau}
            \mathbb{E}\left[
              R(\tau)\mathbf{1}\{\tau &lt; T_{\text{failure}}\}
              +
              L\mathbf{1}\{\tau\ge T_{\text{failure}}\}
              -
              c\mathbf{1}\{\text{signal acquired}\}
              \mid s_i
            \right].
          \]
        </div>
        <p>Aggregate withdrawals determine survival time:</p>
        <div class="math">
          \[
            T_{\text{survival}}
            =
            \inf\{t:W(t)\ge \bar W(\theta)\},
          \]
        </div>
        <p>where \(W(t)\) is cumulative withdrawals and \(\bar W(\theta)\) is the withdrawal capacity before failure.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Endogenous Run Speed</h3>
          <p>Private information acquisition generates gradual but potentially accelerating withdrawal. Depositors with strong bad signals run early; depositors with weaker signals wait; aggregate withdrawal speed and bank survival time are equilibrium objects.</p>
          <p>Public solvency information can mitigate runs by reducing the value of private information acquisition, especially information about liquidity that can trigger inefficient withdrawals.</p>
        </div>
      `,
      example: String.raw`
        <h3>Rumor Example</h3>
        <p>A rumor says the bank may be weak. A depositor believes the bank is solvent with prior probability \(q\). She can pay \(c\) to observe signal \(s\in\{G,B\}\):</p>
        <div class="math">
          \[
            \Pr(G\mid\text{solvent})=\alpha,
            \qquad
            \Pr(G\mid\text{insolvent})=1-\alpha.
          \]
        </div>
        <p>After a bad signal, her posterior solvency belief is</p>
        <div class="math">
          \[
            \Pr(\text{solvent}\mid B)
            =
            \frac{q(1-\alpha)}
            {q(1-\alpha)+(1-q)\alpha}.
          \]
        </div>
        <p>If this posterior falls below a threshold, she withdraws immediately. If it is intermediate, she waits but may withdraw later as more withdrawals reveal stress. The run speed is therefore shaped by the distribution of private signals.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper connects bank-run theory with endogenous information acquisition. It enriches Diamond-Dybvig/global-games-style logic by making depositors' private investigation part of the run mechanism.</p>
        <p><strong>Proof technique.</strong> The central technique is dynamic threshold analysis. Depositors' posterior beliefs after signals determine withdrawal thresholds; aggregate withdrawals feed back into survival time. Equilibrium requires consistency between individual thresholds and aggregate run dynamics.</p>
        <p><strong>Useful secondary technique.</strong> The distinction between solvency information and liquidity information is powerful. Public information can help by changing the composition of private learning, not just by changing beliefs directly.</p>
        <p><strong>Problem solved.</strong> The paper explains how rumors trigger costly private information acquisition and how that acquisition determines the speed and severity of bank runs.</p>
        <p><strong>Open questions.</strong> Extensions include social media rumor diffusion, networked depositors, strategic bank disclosure, and learning from observed withdrawals. A natural new paper could model depositors observing both official stress-test disclosures and peer withdrawal behavior.</p>
        <p><strong>My comment.</strong> This is a very concrete example of why information is not always stabilizing. Private signals can make everyone act faster on fear, even when public disclosure could calm the system.</p>
      `,
    },
  },
  {
    id: "atakan-ekmekci-2014",
    title: "Auctions, Actions, and the Failure of Information Aggregation",
    authors: "Alp E. Atakan; Mehmet Ekmekci",
    journal: "American Economic Review",
    year: 2014,
    doi: "10.1257/aer.104.7.2014",
    status: "Digested",
    tags: ["aggregation", "auctions"],
    takeaway: "Shows why auction-like mechanisms can fail to aggregate information.",
    digest: {
      short: "Atakan and Ekmekci study uniform-price auctions with many bidders, common values, imperfect signals, and a post-auction action chosen by winners. In standard large common-value auctions, prices often aggregate information. Here, the action after winning changes incentives: there are symmetric equilibria in which the auction price aggregates no information, even though other market statistics such as rationing or the bid distribution contain information.",
      motivation: `
        <p><strong>Motivation.</strong> Economists often treat auction prices as information aggregators. But in many auctions, winning is not the end of the story: after winning, the buyer chooses how to use the object, invest in it, develop it, or operate it. Those post-auction actions can change bidding incentives and break price aggregation.</p>
        <p><strong>Reality example.</strong> A firm bidding for oil leases cares not only about the oil reserve state but also about how it will drill after winning. If the post-winning action adapts to the state, bids may stop revealing the information that outside observers want prices to reveal.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> The model is a uniform-price auction with k identical common-value objects and more bidders than objects. Bidders have imperfect signals about the state. The common valuation is determined jointly by the state and by an action chosen after winning. In large auctions, symmetric equilibria can have prices that aggregate no information.</p>
      `,
      deep: String.raw`
        <h3>1. Auction Environment</h3>
        <p>There are more bidders than identical objects. The payoff-relevant state is \(\theta\), and bidder \(i\) observes a private signal \(s_i\sim F(\cdot\mid\theta)\). Winners later choose an action \(a\in A\).</p>
        <div class="math">
          \[
            v(\theta,a)
            =
            \text{common value from the object after action }a.
          \]
        </div>
        <p>The efficient post-auction action depends on beliefs about \(\theta\):</p>
        <div class="math">
          \[
            a^*(\mu)
            \in
            \arg\max_{a\in A}\mathbb{E}_{\mu}[v(\theta,a)].
          \]
        </div>
        <h3>2. Bidding And Price</h3>
        <p>In a uniform-price auction, all winners pay the market-clearing price \(P\). A bidder's willingness to bid depends on her signal, on what winning implies about others' signals, and on the action she expects to take after winning.</p>
        <div class="math">
          \[
            b_i=b(s_i),
            \qquad
            P=\text{highest losing bid or market-clearing bid}.
          \]
        </div>
        <h3>3. Information Aggregation Benchmark</h3>
        <p>Aggregation would mean that as the number of bidders becomes large, the price reveals the state well enough for payoff-relevant decisions:</p>
        <div class="math">
          \[
            \Pr(\theta\mid P)\to \mathbf{1}_{\theta}
            \quad\text{or}\quad
            \mathbb{E}[v(\theta,a)\mid P]\to v(\theta,a).
          \]
        </div>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Failure Of Price Aggregation</h3>
          <p>The paper shows that in large auctions with post-winning actions, there are symmetric equilibria in which the price does not aggregate information. Other statistics, such as rationing or the bid distribution, can contain information that the price itself does not reveal.</p>
        </div>
      `,
      example: String.raw`
        <h3>Lease Auction Example</h3>
        <p>Suppose \(\theta\in\{H,L\}\) is the productivity of a lease. Winning firms can choose action \(a\in\{\text{drill aggressively},\text{drill cautiously}\}\). The value is</p>
        <div class="math">
          \[
            v(\theta,a)=\theta\cdot r(a)-k(a).
          \]
        </div>
        <p>If action choice adapts to the winner's posterior, then a high bid need not simply mean a high signal about \(\theta\). It may also reflect the option value of adapting \(a\). In equilibrium, the clearing price can become a poor statistic for \(\theta\), while rationing or the whole bid distribution still reveals information.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper qualifies the classic information-aggregation logic for large auctions. It shows that adding post-auction actions can destroy price revelation even in large markets.</p>
        <p><strong>Proof technique.</strong> The key technique is equilibrium construction in a large auction. The proof separates information in prices from information in other market statistics and shows that the price statistic can be uninformative even when the broader market outcome is informative.</p>
        <p><strong>Useful secondary technique.</strong> A useful move is to ask whether the statistic observed by agents is the same statistic needed for aggregation. Here, price and bid distribution are different sufficient statistics.</p>
        <p><strong>Problem solved.</strong> The paper explains why prices in auction markets with post-allocation actions may fail to summarize dispersed information.</p>
        <p><strong>Open questions.</strong> Natural extensions include dynamic auctions, endogenous information acquisition before bidding, resale, and mechanism design that releases richer statistics than price alone.</p>
        <p><strong>My comment.</strong> This is a strong mechanism paper because the failure is not due to irrationality. The institution compresses information into the wrong public statistic.</p>
      `,
    },
  },
  {
    id: "levy-razin-2015-correlation",
    title: "Correlation Neglect, Voting Behavior, and Information Aggregation",
    authors: "Gilat Levy; Ronny Razin",
    journal: "American Economic Review",
    year: 2015,
    doi: "10.1257/aer.20140134",
    status: "Digested",
    tags: ["aggregation", "behavioral-learning", "voting"],
    takeaway: "A behavioral information aggregation paper built around correlation neglect.",
    digest: {
      short: "Levy and Razin study elections where voters underestimate correlation among information sources. Correlation neglect makes beliefs too extreme. Surprisingly, this cognitive bias can improve information aggregation because stronger beliefs induce some voters to vote based on information rather than partisan preferences.",
      motivation: `
        <p><strong>Motivation.</strong> People often treat repeated messages as independent evidence even when they come from the same underlying source. In politics, many news stories, friends, or commentators may trace back to the same information origin.</p>
        <p><strong>Reality example.</strong> A voter hears the same economic claim from several outlets that all rely on one report. If she treats them as independent, she becomes overconfident. That overconfidence can be harmful, but the paper shows it can also make some voters put more weight on information than on partisan taste.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> Correlation neglect creates extreme beliefs. Extreme beliefs can induce voters to base their vote on information rather than political preferences. Under conditions on the preference distribution, this improves vote shares for the optimal policy and improves information aggregation.</p>
      `,
      deep: String.raw`
        <h3>1. Voting Environment</h3>
        <p>There is a state \(\theta\in\{0,1\}\) and two policies or candidates \(a\in\{0,1\}\). Voters have both common-value information and private ideological preferences.</p>
        <div class="math">
          \[
            u_i(a,\theta,t_i)
            =
            \mathbf{1}\{a=\theta\}
            +
            t_i\mathbf{1}\{a=1\},
          \]
        </div>
        <p>where \(t_i\) captures voter \(i\)'s preference bias toward policy \(1\).</p>
        <h3>2. Correlated Signals And Naive Beliefs</h3>
        <p>Voters observe several pieces of information \(s_{i1},\ldots,s_{im}\). The signals are objectively correlated, but a naive voter treats them as conditionally independent. The correct likelihood ratio is</p>
        <div class="math">
          \[
            LR^{true}(s)
            =
            \frac{\Pr(s\mid\theta=1)}
            {\Pr(s\mid\theta=0)}.
          \]
        </div>
        <p>The correlation-neglect likelihood ratio multiplies marginal likelihood ratios:</p>
        <div class="math">
          \[
            LR^{naive}(s)
            =
            \prod_{j=1}^m
            \frac{\Pr(s_j\mid\theta=1)}
            {\Pr(s_j\mid\theta=0)}.
          \]
        </div>
        <p>When signals are positively correlated, \(LR^{naive}\) is too extreme after repeated same-direction signals.</p>
        <h3>3. Voting Rule</h3>
        <p>Voter \(i\) votes for policy \(1\) when the perceived expected common-value benefit plus bias is positive:</p>
        <div class="math">
          \[
            \Pr^{naive}(\theta=1\mid s_i)
            -
            \Pr^{naive}(\theta=0\mid s_i)
            +
            t_i
            \ge 0.
          \]
        </div>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Bias Can Improve Aggregation</h3>
          <p>Correlation neglect can increase the vote share of the state-optimal policy and improve information aggregation when the induced belief extremeness moves voters from preference-based voting to information-based voting.</p>
        </div>
      `,
      example: String.raw`
        <h3>Repeated News Example</h3>
        <p>A voter hears two favorable stories about policy \(1\). Each story has marginal likelihood ratio \(2\), but the stories are highly correlated. A Bayesian might use</p>
        <div class="math">
          \[
            LR^{true}=2.5,
          \]
        </div>
        <p>while a correlation-neglect voter uses</p>
        <div class="math">
          \[
            LR^{naive}=2\times2=4.
          \]
        </div>
        <p>If the voter mildly prefers policy \(0\) for ideological reasons, the Bayesian posterior may not overcome that preference, but the naive posterior may. The bias can therefore make the vote more responsive to information.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to behavioral political economy by showing that a belief bias need not monotonically worsen aggregation. It interacts with preference heterogeneity and strategic voting incentives.</p>
        <p><strong>Proof technique.</strong> The proof compares voting thresholds under correct and naive likelihood ratios. The key is to track how belief extremeness changes which voters are information-responsive.</p>
        <p><strong>Useful secondary technique.</strong> Correlation neglect is represented as a distorted likelihood-ratio operator. This is portable to social learning, media, and network settings.</p>
        <p><strong>Problem solved.</strong> The paper explains when over-inference from correlated information can improve electoral selection.</p>
        <p><strong>Open questions.</strong> Extensions include endogenous media correlation, social networks with repeated sources, polarization dynamics, and welfare comparisons when correlation neglect affects turnout as well as vote choice.</p>
        <p><strong>My comment.</strong> The key insight is subtle: a biased belief process can sometimes offset another distortion, here preference-based voting. This is a useful idea for behavioral welfare theory.</p>
      `,
    },
  },
  {
    id: "ekmekci-lauermann-2019",
    title: "Manipulated Electorates and Information Aggregation",
    authors: "Mehmet Ekmekci; Stephan Lauermann",
    journal: "The Review of Economic Studies",
    year: 2019,
    doi: "10.1093/restud/rdz019",
    status: "Digested",
    tags: ["aggregation", "voting"],
    takeaway: "Studies information aggregation when electorates can be manipulated.",
    digest: {
      short: "Ekmekci and Lauermann study information aggregation in elections when the electorate is not a fixed neutral sample. If the set of voters can be shaped, selected, mobilized, or manipulated, the classic large-election logic can fail. The key point is that voting outcomes aggregate both private signals and information about who was induced to participate.",
      motivation: `
        <p><strong>Motivation.</strong> Real elections are rarely just a random draw of informed citizens. Parties mobilize supporters, campaigns target voters, institutions set eligibility rules, and strategic actors may influence who shows up. That means the composition of the electorate can itself be endogenous and informative.</p>
        <p><strong>Reality example.</strong> A campaign that can mobilize one group more strongly in favorable states may make turnout composition a signal. Then a voter conditions not only on her own information and the vote margin, but also on what the electorate's composition says about the state.</p>
        <p><strong>Implication.</strong> Large numbers do not guarantee information aggregation if the population being aggregated has been strategically filtered.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Standard Condorcet-style aggregation assumes that many voters' private signals enter the election in a sufficiently neutral way. This paper studies what happens when the electorate itself can be manipulated. The election aggregates information only if the voting population remains informationally representative in the right equilibrium sense.</p>
      `,
      deep: String.raw`
        <h3>1. Voting Environment</h3>
        <p>There is a state \(\theta\in\{0,1\}\), two alternatives \(a\in\{0,1\}\), and a large potential electorate. Voter \(i\) has a private signal</p>
        <div class="math">
          \[
            s_i\sim F(\cdot\mid\theta),
          \]
        </div>
        <p>and common interests mean that, absent preference distortions, voters prefer the alternative matching the state.</p>
        <div class="math">
          \[
            u_i(a,\theta)=\mathbf{1}\{a=\theta\}.
          \]
        </div>
        <h3>2. Manipulated Electorate</h3>
        <p>The novel object is an electorate-selection process. Let \(m_i\in\{0,1\}\) indicate whether potential voter \(i\) becomes an active voter. Manipulation means</p>
        <div class="math">
          \[
            \Pr(m_i=1\mid s_i,\theta,\text{campaign/institution})
          \]
        </div>
        <p>may depend on information, preferences, or strategic actions. The realized electorate is therefore not an exogenous representative sample.</p>
        <h3>3. Voting And Aggregation</h3>
        <p>Active voters choose votes \(v_i\in\{0,1\}\). The election outcome is</p>
        <div class="math">
          \[
            a^E=\mathbf{1}\left\{\sum_i m_i v_i \ge \frac12\sum_i m_i\right\}.
          \]
        </div>
        <p>Information aggregation means</p>
        <div class="math">
          \[
            \Pr(a^E=\theta)\to1
          \]
        </div>
        <p>as the potential electorate grows. The paper studies when manipulation prevents this convergence.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Aggregation Is Fragile To Electorate Manipulation</h3>
          <p>The paper shows that when the composition of the electorate can be manipulated, large elections can fail to aggregate information. The realized vote share combines information about voters' private signals with information about the selection process that produced the active electorate.</p>
        </div>
      `,
      example: String.raw`
        <h3>Mobilization Example</h3>
        <p>Suppose state \(H\) favors policy \(1\) and state \(L\) favors policy \(0\). A strategic campaign can mobilize voters who are likely to vote for policy \(1\). If mobilization is stronger after favorable signals, then observing a high share of policy-1 voters partly reflects mobilization rather than the population's underlying information.</p>
        <p>With fixed electorate, the law of large numbers would make the average signal reveal \(\theta\):</p>
        <div class="math">
          \[
            \frac1N\sum_i \mathbf{1}\{s_i=h\}
            \to
            \Pr(h\mid\theta).
          \]
        </div>
        <p>With manipulated turnout, the relevant average is selected:</p>
        <div class="math">
          \[
            \frac{\sum_i m_i\mathbf{1}\{s_i=h\}}{\sum_i m_i},
          \]
        </div>
        <p>and this object can be biased by the manipulation rule.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper extends information aggregation in elections by endogenizing the electorate. It connects Condorcet jury logic, strategic voting, voter mobilization, and persuasion/manipulation.</p>
        <p><strong>Proof technique.</strong> The main technique is to combine pivotal-voter reasoning with a selection model for electorate composition. Instead of applying a law of large numbers to all potential signals, the proof studies the selected signal distribution among active voters.</p>
        <p><strong>Useful secondary technique.</strong> A portable proof idea is to separate two inference channels: what a vote says about a voter's signal, and what participation says about the selection process. Aggregation fails when these channels cannot be cleanly separated.</p>
        <p><strong>Problem solved.</strong> The paper explains why information aggregation in large elections is fragile when institutions or campaigns can manipulate who votes.</p>
        <p><strong>Open questions.</strong> Natural extensions include social media mobilization, endogenous turnout costs, targeted information campaigns, and manipulation in shareholder voting or committee selection.</p>
        <p><strong>My comment.</strong> The paper is useful because it attacks a hidden assumption in aggregation theorems: not just how voters vote, but who becomes a voter. A new paper could study dynamic manipulation where campaigns learn which voters are persuadable and then reshape the electorate over repeated elections.</p>
      `,
    },
  },
  {
    id: "siga-mihm-2021",
    title: "Information Aggregation in Competitive Markets",
    authors: "Lucas Siga; Maximilian Mihm",
    journal: "Theoretical Economics",
    year: 2021,
    doi: "10.3982/te3559",
    status: "Digested",
    tags: ["aggregation", "markets"],
    takeaway: "A theory paper on when competitive markets aggregate dispersed information.",
    digest: {
      short: "Siga and Mihm characterize when equilibrium prices aggregate information in large auction markets. Their main condition is the betweenness property of information. The property is necessary and sufficient for aggregation and gives predictions for complex multidimensional environments.",
      motivation: `
        <p><strong>Motivation.</strong> Competitive prices are supposed to summarize dispersed information. But when information is multidimensional, it is not obvious that the market-clearing price contains the right statistic.</p>
        <p><strong>Reality example.</strong> Buyers and sellers may know different things about quality, demand, regulation, and resale value. A single market price may aggregate all relevant information only if private signals line up in the right order.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> The paper identifies the betweenness property of information as necessary and sufficient for information aggregation in large competitive auction markets.</p>
      `,
      deep: String.raw`
        <h3>1. Market Environment</h3>
        <p>A large population of traders has private signals \(s_i\) about a payoff-relevant state \(\theta\). Traders submit demands or bids, and an equilibrium price \(P\) clears the market.</p>
        <div class="math">
          \[
            s_i\sim F(\cdot\mid\theta),
            \qquad
            x_i=x(s_i,P),
            \qquad
            \int x(s_i,P)\,dF(s_i\mid\theta)=Q.
          \]
        </div>
        <h3>2. Aggregation</h3>
        <p>Prices aggregate information if the equilibrium price allows agents to infer the payoff-relevant state in the large-market limit:</p>
        <div class="math">
          \[
            \Pr(\theta\mid P)\to \mathbf{1}_{\theta}
            \quad\text{or more generally}\quad
            \mathbb{E}[g(\theta)\mid P]\to g(\theta).
          \]
        </div>
        <h3>3. Betweenness Property</h3>
        <p>The betweenness property is an order condition on information. Informally, if one state is between two others in terms of the distribution of signals, then the market statistic generated under that state is also between the statistics generated under the other states.</p>
        <div class="math">
          \[
            F_{\theta_2}\text{ is between }F_{\theta_1}\text{ and }F_{\theta_3}
            \quad\Rightarrow\quad
            Z(\theta_2)\text{ is between }Z(\theta_1)\text{ and }Z(\theta_3).
          \]
        </div>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Necessary And Sufficient Condition</h3>
          <p>Equilibrium prices aggregate information in the large competitive market if and only if the information structure satisfies the betweenness property.</p>
        </div>
      `,
      example: String.raw`
        <h3>Ordered Quality Example</h3>
        <p>Suppose \(\theta\in\{L,M,H\}\). Signals are higher when quality is higher and satisfy a monotone likelihood-ratio order:</p>
        <div class="math">
          \[
            \frac{f(s\mid H)}{f(s\mid M)}
            \text{ and }
            \frac{f(s\mid M)}{f(s\mid L)}
            \text{ increase in }s.
          \]
        </div>
        <p>Then \(M\) is naturally between \(L\) and \(H\). If the induced aggregate demand under \(M\) is also between the other two, price can reveal the state. If multidimensional signals break this order, prices may fail to aggregate.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper gives a sharp condition for price aggregation in competitive markets, extending classic large-market information aggregation beyond simple one-dimensional signal settings.</p>
        <p><strong>Proof technique.</strong> The central proof technique is order-theoretic. The betweenness property lets the authors connect signal distributions to equilibrium price mappings and prove both necessity and sufficiency.</p>
        <p><strong>Useful secondary technique.</strong> Instead of asking whether signals are merely informative, ask whether their induced market statistics preserve the relevant order. This is useful in multidimensional information problems.</p>
        <p><strong>Problem solved.</strong> The paper solves the characterization problem: exactly when should competitive market prices aggregate dispersed private information?</p>
        <p><strong>Open questions.</strong> Extensions include endogenous information acquisition, strategic manipulation, noncompetitive markets, and behavioral misinterpretation of multidimensional signals.</p>
        <p><strong>My comment.</strong> The betweenness property is a clean diagnostic. It gives you a way to look at a model and ask whether the institution preserves the informational order needed for aggregation.</p>
      `,
    },
  },
  {
    id: "ekmekci-lauermann-2022-poisson",
    title: "Information Aggregation in Poisson Elections",
    authors: "Mehmet Ekmekci; Stephan Lauermann",
    journal: "Theoretical Economics",
    year: 2022,
    doi: "10.3982/te3849",
    status: "Digested",
    tags: ["aggregation", "voting"],
    takeaway: "Information aggregation in large Poisson voting environments.",
    digest: {
      short: "Ekmekci and Lauermann study large elections with population uncertainty. The modern Condorcet jury theorem says that large common-interest elections aggregate information under weak conditions. This paper shows that with Poisson population uncertainty, the theorem holds if and only if the expected number of voters is independent of the state. If turnout intensity depends on the state, nonaggregating equilibria can exist because voters are more pivotal when the population is small.",
      motivation: `
        <p><strong>Motivation.</strong> Large elections are often supposed to aggregate dispersed signals. But the number of voters itself may be informative. If bad states bring low turnout or high turnout, pivotality changes with the state and strategic voting logic changes.</p>
        <p><strong>Reality example.</strong> In a shareholder vote, the number of active voters may depend on firm conditions. If fewer informed voters show up in one state, a voter conditions not only on being pivotal but also on what pivotality says about turnout and the state.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> In Poisson elections, information aggregation holds in every equilibrium exactly when the expected number of voters is state-independent. If expected turnout depends on the state, additional equilibria can fail to aggregate information because pivotality is more likely in smaller populations.</p>
      `,
      deep: String.raw`
        <h3>1. Poisson Election Setup</h3>
        <p>The state is \(\theta\in\{0,1\}\). The number of voters is random. Conditional on state \(\theta\), the population size follows a Poisson distribution:</p>
        <div class="math">
          \[
            N\mid\theta\sim \operatorname{Poisson}(\lambda_{\theta}).
          \]
        </div>
        <p>Each voter observes a private signal \(s_i\sim F(\cdot\mid\theta)\) and votes for one of two alternatives.</p>
        <h3>2. Pivotal Reasoning</h3>
        <p>A voter's action matters only when she is pivotal. Therefore the relevant posterior is not simply \(\Pr(\theta\mid s_i)\), but</p>
        <div class="math">
          \[
            \Pr(\theta\mid s_i,\text{pivotal}).
          \]
        </div>
        <p>With state-dependent population size, the event of being pivotal is itself informative about \(\theta\), because close elections are more likely when the population is small.</p>
        <h3>3. Aggregation Criterion</h3>
        <p>Information aggregation means that as expected population size becomes large, the probability that the election selects the state-correct alternative converges to one:</p>
        <div class="math">
          \[
            \Pr(a^{election}=\theta)\to1.
          \]
        </div>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>State-Independent Expected Population Is Necessary And Sufficient</h3>
          <p>The modern Condorcet jury theorem holds in Poisson elections if and only if</p>
          <div class="math">
            \[
              \lambda_0=\lambda_1.
            \]
          </div>
          <p>If \(\lambda_{\theta}\) depends on the state, there can be equilibria in which information is not aggregated.</p>
        </div>
      `,
      example: String.raw`
        <h3>Low-Turnout Bad-State Example</h3>
        <p>Suppose \(\lambda_H=1000\) and \(\lambda_L=100\). A voter who is pivotal learns that the election is close. Close elections are much more likely when there are fewer voters, so pivotality itself suggests state \(L\):</p>
        <div class="math">
          \[
            \frac{\Pr(H\mid s,\text{pivotal})}{\Pr(L\mid s,\text{pivotal})}
            =
            \frac{\Pr(H\mid s)}{\Pr(L\mid s)}
            \cdot
            \frac{\Pr(\text{pivotal}\mid H)}{\Pr(\text{pivotal}\mid L)}.
          \]
        </div>
        <p>The second factor can dominate the private signal. Then strategic voting may fail to aggregate information even in very large expected elections.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper sharpens the modern Condorcet jury theorem by introducing state-dependent population uncertainty. It shows exactly when large-election aggregation survives Poisson uncertainty.</p>
        <p><strong>Proof technique.</strong> The key technique is asymptotic pivotality calculation in Poisson games. The proof studies likelihood ratios conditional on the pivotal event and shows how state-dependent population intensity distorts them.</p>
        <p><strong>Useful secondary technique.</strong> Conditioning on pivotality is a reusable method in voting models. The pivotal event may carry information that reverses or dilutes private signals.</p>
        <p><strong>Problem solved.</strong> The paper solves whether population uncertainty preserves information aggregation in large elections.</p>
        <p><strong>Open questions.</strong> Extensions include turnout choice, costly voting, correlated signals, manipulation of electorate size, and social learning before voting.</p>
        <p><strong>My comment.</strong> This paper is a clean example of how equilibrium conditioning can defeat a law-of-large-numbers intuition. Large numbers alone are not enough if the event of being decisive is endogenous and informative.</p>
      `,
    },
  },
  {
    id: "li-2023-contracting",
    title: "Information Aggregation via Contracting",
    authors: "Jiasun Li",
    journal: "The Journal of Finance",
    year: 2023,
    doi: "10.1111/jofi.13205",
    status: "Digested",
    tags: ["aggregation", "finance"],
    takeaway: "Shows how contracts can aggregate information in financial settings.",
    digest: {
      short: "Li studies how a group of investors with dispersed private information should divide profits from a risky joint project. A simple contract that divides profits in proportion to investors' risk tolerances can facilitate information aggregation by changing how investors choose risk-taking strategies in response to their private signals.",
      motivation: `
        <p><strong>Motivation.</strong> Information aggregation is usually associated with prices: traders reveal information through market demand, and prices summarize it. But many financial decisions are made inside contracts, partnerships, syndicates, funds, and joint ventures where there may be no public price.</p>
        <p><strong>Reality example.</strong> Several investors jointly fund a risky startup. Each investor has private information about demand, technology, or financing conditions. The contract determining how profits are split can affect whether each investor's private information is reflected in the joint investment decision.</p>
        <p><strong>Implication.</strong> Contracts are not only incentive-sharing devices; they can be information-aggregation devices.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> When investors with dispersed private information jointly invest in a risky project, dividing profits in proportion to risk tolerances can alter risk-taking incentives so that private information is aggregated. This offers a contracting-based alternative to price-based aggregation in rational expectations models.</p>
      `,
      deep: String.raw`
        <h3>1. Joint Investment Environment</h3>
        <p>There are investors \(i=1,\ldots,n\). A risky project has payoff \(R(\theta,I)\), where \(\theta\) is an uncertain state and \(I\) is aggregate investment. Investor \(i\) observes private signal</p>
        <div class="math">
          \[
            s_i\sim F_i(\cdot\mid\theta).
          \]
        </div>
        <p>Investors choose how their investment or risk exposure responds to private information.</p>
        <h3>2. Contract</h3>
        <p>A profit-sharing contract assigns share \(\alpha_i\) of project profit to investor \(i\), with</p>
        <div class="math">
          \[
            \sum_i \alpha_i=1,\qquad \alpha_i\ge0.
          \]
        </div>
        <p>The contract emphasized in the abstract divides profits in proportion to risk tolerances. If investor \(i\)'s risk tolerance is \(T_i\), then</p>
        <div class="math">
          \[
            \alpha_i=\frac{T_i}{\sum_j T_j}.
          \]
        </div>
        <h3>3. Information Aggregation</h3>
        <p>Let \(I(s_1,\ldots,s_n)\) be the induced joint investment. Aggregation means the joint investment responds to dispersed private signals as if the relevant information had been pooled:</p>
        <div class="math">
          \[
            I(s_1,\ldots,s_n)
            =
            I^{FB}\!\left(\Pr(\theta\mid s_1,\ldots,s_n)\right)
          \]
        </div>
        <p>or approximates this benchmark in the model's equilibrium sense.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Contract-Based Aggregation</h3>
          <p>A simple risk-tolerance-weighted profit-sharing contract can facilitate information aggregation by aligning the investors' risk-taking incentives with the information content of their private signals.</p>
        </div>
      `,
      example: String.raw`
        <h3>Two-Investor Example</h3>
        <p>Investor 1 is more risk tolerant than investor 2. Their risk tolerances are \(T_1=3\) and \(T_2=1\). The proposed sharing rule gives</p>
        <div class="math">
          \[
            \alpha_1=\frac34,\qquad \alpha_2=\frac14.
          \]
        </div>
        <p>If investor 1 receives more upside and downside because she can bear risk better, her investment response to a good signal becomes more socially useful. Investor 2 still contributes information, but the contract avoids making the more risk-averse investor distort the joint strategy too strongly.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to financial information aggregation by showing that contracts can substitute for prices as aggregation devices. It connects rational expectations, risk sharing, and team/investment contracting.</p>
        <p><strong>Proof technique.</strong> The key proof technique is incentive alignment through risk-tolerance weights. The proof shows that a particular sharing rule makes privately chosen risk exposures aggregate signals in the right way.</p>
        <p><strong>Useful secondary technique.</strong> A useful modeling trick is to ask whether the contract changes the slope of each investor's action with respect to her signal. Aggregation is about the whole response vector, not just final payoffs.</p>
        <p><strong>Problem solved.</strong> The paper solves how dispersed private information can be aggregated inside a joint project without relying on public prices.</p>
        <p><strong>Open questions.</strong> Extensions include moral hazard, limited liability, dynamic investment, endogenous information acquisition, and contracts when investors have misspecified models of risk.</p>
        <p><strong>My comment.</strong> The paper is exciting because it moves aggregation from markets into organizations. A new paper could study whether venture-capital syndicate contracts are designed to aggregate heterogeneous expertise.</p>
      `,
    },
  },
  {
    id: "bond-goldstein-2015",
    title: "Government Intervention and Information Aggregation by Prices",
    authors: "Philip Bond; Itay Goldstein",
    journal: "The Journal of Finance",
    year: 2015,
    doi: "10.1111/jofi.12303",
    status: "Digested",
    tags: ["aggregation", "finance", "policy"],
    takeaway: "A price informativeness paper about policy intervention and aggregation.",
    digest: {
      short: "Bond and Goldstein study a policy feedback problem: governments want to use market prices because prices aggregate private information, but the informativeness of prices depends on how policy responds to them. If the government relies too heavily on prices, traders' incentives to produce information can weaken. Sometimes the government should commit to limit price-contingent intervention or limit transparency.",
      motivation: `
        <p><strong>Motivation.</strong> Policymakers often look at market prices for information: bank stock prices, credit spreads, exchange rates, bond yields, or prediction markets. But when markets know policy will react to prices, trading incentives and price informativeness change.</p>
        <p><strong>Reality example.</strong> Suppose regulators use a bank's stock price to decide whether to intervene. If investors know a low price triggers a bailout or capital injection, the price reflects both fundamentals and expected policy. The policy rule can therefore damage the very information the regulator hoped to use.</p>
        <p><strong>Implication.</strong> Market discipline and policy feedback are jointly determined. More reliance on prices is not always better.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> Price informativeness is endogenous to government policy. In some cases, it is optimal for a government to commit to limit its reliance on market prices so that information continues to be aggregated into prices. For similar reasons, limiting transparency can be optimal in some dimensions.</p>
      `,
      deep: String.raw`
        <h3>1. Market And Policy Environment</h3>
        <p>A firm or financial institution has fundamental state \(\theta\). Traders observe private signals \(s_i\sim F(\cdot\mid\theta)\) and trade an asset with price \(P\). The government observes \(P\) and chooses intervention \(g\).</p>
        <div class="math">
          \[
            g=g(P),
            \qquad
            P=P(\theta,\text{trades},g(P)).
          \]
        </div>
        <p>The feedback is circular: prices inform policy, but expected policy affects trades and prices.</p>
        <h3>2. Price Informativeness</h3>
        <p>Price informativeness can be measured by posterior uncertainty:</p>
        <div class="math">
          \[
            \operatorname{Var}(\theta\mid P)
          \]
        </div>
        <p>or by how closely \(P\) tracks the fundamental. Policy affects traders' marginal value of information because intervention changes payoffs conditional on the price.</p>
        <h3>3. Government Objective</h3>
        <p>The government wants to choose intervention using information in prices:</p>
        <div class="math">
          \[
            \max_{g(\cdot)}
            \mathbb{E}\left[W(g(P),\theta)\right].
          \]
        </div>
        <p>But the choice of \(g(\cdot)\) changes the equilibrium mapping from \(\theta\) and private signals to \(P\).</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Commitment To Limited Reliance</h3>
          <p>It can be optimal for the government to commit to limit its reliance on market prices because aggressive price-contingent intervention can reduce the information produced and aggregated by prices.</p>
        </div>
      `,
      example: String.raw`
        <h3>Bank Intervention Example</h3>
        <p>A bank is either sound or weak, \(\theta\in\{S,W\}\). Investors receive signals and trade the bank's stock. The regulator chooses bailout \(g=1\) if the price is low:</p>
        <div class="math">
          \[
            g(P)=\mathbf{1}\{P &lt; \bar P\}.
          \]
        </div>
        <p>If a bailout protects investors in weak states, then bad private information becomes less profitable to trade on. The price becomes less informative:</p>
        <div class="math">
          \[
            \operatorname{Var}(\theta\mid P,g(P))
          \]
        </div>
        <p>can rise when policy reacts too strongly to the price. A commitment to not always intervene can preserve information production.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to financial markets and policy feedback by endogenizing price informativeness under government intervention. It connects Hayek/Grossman-Stiglitz information aggregation with regulatory policy design.</p>
        <p><strong>Proof technique.</strong> The proof studies a fixed point between policy rules and price informativeness. A change in policy changes trading incentives; changed trading incentives change the price signal; the government then reoptimizes given the altered signal.</p>
        <p><strong>Useful secondary technique.</strong> A useful decomposition is direct policy value versus information-destruction cost. Even a good intervention can be bad ex ante if it destroys the information needed to target it.</p>
        <p><strong>Problem solved.</strong> The paper explains why policymakers should sometimes commit to weaker price-contingent responses or lower transparency to preserve market information.</p>
        <p><strong>Open questions.</strong> Extensions include dynamic policy learning, multiple markets, stress tests, central-bank reaction functions, and behavioral traders who misread policy feedback.</p>
        <p><strong>My comment.</strong> This is a beautiful feedback paper. It is useful whenever an institution wants to use an endogenous signal while simultaneously affecting the incentives behind that signal.</p>
      `,
    },
  },
  {
    id: "albagli-hellwig-tsyvinski-2024",
    title: "Information Aggregation with Asymmetric Asset Payoffs",
    authors: "Elias Albagli; Christian Hellwig; Aleh Tsyvinski",
    journal: "The Journal of Finance",
    year: 2024,
    doi: "10.1111/jofi.13361",
    status: "Digested",
    tags: ["aggregation", "finance"],
    takeaway: "Analyzes information aggregation when asset payoffs are asymmetric.",
    digest: {
      short: "Albagli, Hellwig, and Tsyvinski study noisy aggregation of dispersed information in financial markets without imposing parametric restrictions on preferences, information, or return distributions. They characterize asset returns through a risk-neutral probability measure with excess weight on tail risks, and link this tail overweighting to observable forecast dispersion and accuracy.",
      motivation: `
        <p><strong>Motivation.</strong> Asset payoffs are often asymmetric: downside crashes, upside lottery-like payoffs, skewness, and tail risk matter. When investors hold dispersed information, prices may aggregate information differently in the tails than around the center of the distribution.</p>
        <p><strong>Reality example.</strong> For a distressed bond or growth stock, investors may disagree especially about rare disaster or breakthrough states. Prices can place excess weight on tail outcomes because dispersed information and payoff asymmetry interact.</p>
        <p><strong>Implication.</strong> Information aggregation can help explain return anomalies related to skewness, disagreement, and forecast accuracy.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> The paper gives a general characterization of asset returns using a risk-neutral probability measure that has excess weight on tail risks. It connects this excess tail weight to observable moments such as forecast dispersion and accuracy, and uses it to explain cross-sectional return anomalies.</p>
      `,
      deep: String.raw`
        <h3>1. Asset Payoff And Information</h3>
        <p>An asset has payoff \(X\), and investors receive dispersed private information \(s_i\). The paper does not rely on a narrow parametric specification of preferences, information, or returns.</p>
        <div class="math">
          \[
            s_i\sim F_i(\cdot\mid X),
            \qquad
            P=\text{equilibrium price aggregating dispersed information noisily}.
          \]
        </div>
        <h3>2. Risk-Neutral Representation</h3>
        <p>Asset pricing can be represented by a risk-neutral probability measure \(Q\):</p>
        <div class="math">
          \[
            P=\frac{1}{R_f}\mathbb{E}^Q[X].
          \]
        </div>
        <p>The paper's key characterization is that noisy aggregation with asymmetric payoffs generates excess risk-neutral weight on tail states.</p>
        <div class="math">
          \[
            \frac{dQ}{d\mathbb{P}}(x)
            \text{ is relatively large for tail outcomes }x.
          \]
        </div>
        <h3>3. Observable Moments</h3>
        <p>The theory links tail overweighting to forecast dispersion and forecast accuracy. Let forecasts be \(m_i=\mathbb{E}[X\mid s_i]\). Dispersion is</p>
        <div class="math">
          \[
            \operatorname{Disp}(m)=\operatorname{Var}_i(m_i),
          \]
        </div>
        <p>and accuracy measures how close forecasts are to realized payoffs or true conditional expectations.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Tail-Weighted Aggregation</h3>
          <p>Noisy aggregation of dispersed information with asymmetric payoffs implies a risk-neutral representation with excess weight on tail risks. This tail overweighting connects forecast disagreement and accuracy to cross-sectional return patterns such as skewness and disagreement premia.</p>
        </div>
      `,
      example: String.raw`
        <h3>Skewed Growth Stock Example</h3>
        <p>A startup stock pays</p>
        <div class="math">
          \[
            X=
            \begin{cases}
            0 & \text{failure},\\
            10 & \text{normal success},\\
            100 & \text{breakthrough}.
            \end{cases}
          \]
        </div>
        <p>Investors receive different signals about the breakthrough state. Forecasts are dispersed because some investors think the breakthrough is likely while others do not. The price can behave as if the risk-neutral measure puts extra mass on the tail state \(X=100\), producing return patterns linked to skewness and disagreement.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to asset pricing under heterogeneous information by offering a nonparametric-style characterization of how noisy information aggregation affects returns when payoffs are asymmetric.</p>
        <p><strong>Proof technique.</strong> The central technique is a change-of-measure representation. The equilibrium pricing implications are summarized by a risk-neutral measure whose Radon-Nikodym derivative places excess weight on tail risks.</p>
        <p><strong>Useful secondary technique.</strong> Linking theoretical objects to observable moments such as forecast dispersion and accuracy is very useful. It gives a bridge from abstract information aggregation to empirical asset-pricing tests.</p>
        <p><strong>Problem solved.</strong> The paper explains how dispersed information and payoff asymmetry can generate skewness, disagreement, and interaction effects in returns.</p>
        <p><strong>Open questions.</strong> Extensions include dynamic tail learning, option markets, endogenous information acquisition about tail events, and behavioral misperception of rare risks.</p>
        <p><strong>My comment.</strong> This paper is useful for turning information aggregation into asset-pricing moments. A new paper could study whether rational inattention makes investors selectively inattentive to tail states and how that changes the tail-weight representation.</p>
      `,
    },
  },
  {
    id: "fudenberg-lanzani-strack-2021",
    title: "Limit Points of Endogenous Misspecified Learning",
    authors: "Drew Fudenberg; Giacomo Lanzani; Philipp Strack",
    journal: "Econometrica",
    year: 2021,
    doi: "10.3982/ecta18508",
    status: "Digested",
    tags: ["misspecified-learning", "learning"],
    takeaway: "Core paper on long-run outcomes when agents learn with misspecified models.",
    digest: {
      short: "Fudenberg, Lanzani, and Strack characterize which long-run outcomes can arise when a Bayesian learner has a misspecified model and data are endogenous. Their main selection concept is uniform Berk-Nash equilibrium. Only uniform Berk-Nash equilibria can be long-run outcomes, and uniformly strict Berk-Nash equilibria can occur with arbitrarily high probability for some initial beliefs.",
      motivation: `
        <p><strong>Motivation.</strong> Berk-Nash equilibrium tells us which beliefs and actions are statistically self-confirming under misspecification. But a static equilibrium concept does not by itself say which outcomes a learning process can actually reach.</p>
        <p><strong>Reality example.</strong> A platform experiments with ranking algorithms while using a wrong model of user behavior. Several self-confirming policies may exist. This paper asks which ones can be limit points of actual Bayesian learning from the platform's own endogenous data.</p>
        <p><strong>Implication.</strong> The paper turns Berk-Nash from a static consistency condition into a dynamic learning prediction.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> Only uniform Berk-Nash equilibria can be long-run outcomes. Uniformly strict Berk-Nash equilibria can have arbitrarily high probability of being selected for some initial beliefs. If the agent believes outcomes are exogenous, every uniformly strict Berk-Nash equilibrium has positive probability for any initial belief.</p>
      `,
      deep: String.raw`
        <h3>1. Endogenous Data Setup</h3>
        <p>An agent repeatedly chooses actions \(a_t\in A\). The true outcome distribution is</p>
        <div class="math">
          \[
            y_t\sim p(\cdot\mid a_t),
          \]
        </div>
        <p>while the subjective model is</p>
        <div class="math">
          \[
            y_t\sim q_{\theta}(\cdot\mid a_t),
            \qquad
            \theta\in\Theta.
          \]
        </div>
        <p>The agent updates Bayesian beliefs over \(\Theta\), then chooses optimal actions under those beliefs.</p>
        <h3>2. Berk-Nash Fit</h3>
        <p>For a long-run action distribution \(\sigma\), the KL fit of parameter \(\theta\) is</p>
        <div class="math">
          \[
            K(\theta;\sigma)
            =
            \sum_{a\in A}\sigma(a)
            D_{\mathrm{KL}}\!\left(
              p(\cdot\mid a)\,\|\,q_{\theta}(\cdot\mid a)
            \right).
          \]
        </div>
        <p>The Berk-Nash best-fitting set is</p>
        <div class="math">
          \[
            \Theta^*(\sigma)=\arg\min_{\theta\in\Theta}K(\theta;\sigma).
          \]
        </div>
        <h3>3. Uniformity And Strictness</h3>
        <p>The paper refines Berk-Nash using uniformity and strictness. Uniformity strengthens the fit/optimality requirements so that they hold robustly near the limiting outcome, not only exactly at a knife-edge point. Strictness means the limiting action is a strict optimum under the limiting belief.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Limit-Point Selection</h3>
          <p>Long-run outcomes of endogenous misspecified Bayesian learning must be uniform Berk-Nash equilibria. Conversely, uniformly strict Berk-Nash equilibria are dynamically attainable: for suitable initial beliefs, they can be selected with arbitrarily high probability.</p>
          <div class="math">
            \[
              \text{limit point}
              \quad\Rightarrow\quad
              \text{uniform Berk-Nash},
            \]
            \[
              \text{uniformly strict Berk-Nash}
              \quad\Rightarrow\quad
              \Pr(\text{selection})\approx 1
              \text{ for some priors}.
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Self-Confirming Pricing Example</h3>
        <p>A seller believes demand is linear:</p>
        <div class="math">
          \[
            q_{\theta}(D\mid p)
            \quad\text{with}\quad
            D=\theta_0-\theta_1 p+\varepsilon.
          \]
        </div>
        <p>True demand is nonlinear. If the seller repeatedly uses price \(p^*\), her posterior fits demand near \(p^*\), and \(p^*\) may be optimal under that local pseudo-true model. This is Berk-Nash. The paper asks whether \(p^*\) is a plausible limit of actual learning. Uniform strictness says the perceived optimality of \(p^*\) survives small belief perturbations, making it dynamically selectable.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper provides a dynamic foundation and selection analysis for Berk-Nash equilibrium. It clarifies which misspecified-learning steady states are reachable under Bayesian updating with endogenous data.</p>
        <p><strong>Proof technique.</strong> The proof uses pathwise concentration of Bayesian beliefs under misspecification and endogenous sampling. It controls likelihood ratios along histories where actions are chosen endogenously, then links concentration to optimal-action stability.</p>
        <p><strong>Useful secondary technique.</strong> Uniformity is the reusable idea. When a fixed-point concept is too weak for dynamics, strengthen it to require robustness in a neighborhood; then strict equilibria become selectable by learning paths.</p>
        <p><strong>Problem solved.</strong> The paper solves the dynamic selection problem for long-run outcomes in endogenous misspecified learning.</p>
        <p><strong>Open questions.</strong> Extensions include multi-agent strategic learning, experimentation subsidies, non-Bayesian updating, and environments where the subjective model changes over time.</p>
        <p><strong>My comment.</strong> This paper is important because it tells you not every Berk-Nash equilibrium deserves equal attention. A new paper could use the uniformity logic to select among biased social-learning equilibria.</p>
      `,
    },
  },
  {
    id: "bohren-hauser-2021",
    title: "Learning With Heterogeneous Misspecified Models: Characterization and Robustness",
    authors: "J. Aislinn Bohren; Daniel N. Hauser",
    journal: "Econometrica",
    year: 2021,
    doi: "10.3982/ecta15318",
    status: "Digested",
    tags: ["misspecified-learning", "learning"],
    takeaway: "Characterizes learning with heterogeneous misspecified models.",
    digest: {
      short: "Bohren and Hauser develop a general framework for learning when agents misinterpret information, possibly in heterogeneous ways. Their main result gives a simple criterion for long-run beliefs based on the form of misspecification. The framework applies to social learning and individual learning and gives conditions for entrenched disagreement.",
      motivation: `
        <p><strong>Motivation.</strong> People often see the same evidence but interpret it differently. Disagreement can persist not because people ignore evidence, but because they use different wrong models to decode it.</p>
        <p><strong>Reality example.</strong> Two political groups observe the same unemployment report. One group interprets it through a partisan model, another through a different causal model. Even with repeated common data, their beliefs may not converge.</p>
        <p><strong>Implication.</strong> Heterogeneous misspecification can make representative-agent learning misleading and can explain entrenched disagreement.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> The paper gives a criterion to characterize long-run beliefs based on the underlying form of misspecification. It applies to social learning, individual learning, heterogeneous models, partisan bias, overreaction, naive learning, and level-k reasoning.</p>
      `,
      deep: String.raw`
        <h3>1. Heterogeneous Subjective Models</h3>
        <p>Agents \(i=1,\ldots,n\) observe data \(y_t\) or social outcomes. The true data process is \(p\), but agent \(i\) interprets evidence using a subjective model</p>
        <div class="math">
          \[
            q_{i,\theta_i}(\cdot),
            \qquad
            \theta_i\in\Theta_i.
          \]
        </div>
        <p>Misspecification is heterogeneous when agents have different model classes or different mappings from evidence to likelihoods.</p>
        <h3>2. Long-Run Fit</h3>
        <p>Agent \(i\)'s pseudo-true parameter set minimizes KL divergence from the true data-generating process as interpreted through agent \(i\)'s model:</p>
        <div class="math">
          \[
            \Theta_i^*
            =
            \arg\min_{\theta_i\in\Theta_i}
            D_{\mathrm{KL}}\!\left(
              p(\cdot)\,\|\,q_{i,\theta_i}(\cdot)
            \right).
          \]
        </div>
        <p>In social learning, \(p\) can itself be generated by other agents' actions and beliefs, so the criterion becomes a fixed point across heterogeneous interpretations.</p>
        <h3>3. Disagreement</h3>
        <p>Entrenched disagreement occurs when limiting beliefs differ across agents:</p>
        <div class="math">
          \[
            \lim_{t\to\infty}\mu_{i,t}
            \ne
            \lim_{t\to\infty}\mu_{j,t}.
          \]
        </div>
        <p>The paper's framework identifies when such disagreement is implied by misspecification rather than by lack of data.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Characterization And Robustness</h3>
          <p>The main theorem gives a simple criterion for long-run beliefs based on the form of misspecification. The characterization is robust across heterogeneous agents and can be used to determine when representative-agent approaches are valid or invalid.</p>
        </div>
      `,
      example: String.raw`
        <h3>Partisan Interpretation Example</h3>
        <p>There is a state \(\theta\in\{G,B\}\). Everyone observes the same public signal \(y_t\), but group \(A\) thinks the media exaggerates bad news, while group \(B\) thinks it exaggerates good news. Their subjective likelihoods are</p>
        <div class="math">
          \[
            q_A(y\mid\theta)
            \ne
            q_B(y\mid\theta).
          \]
        </div>
        <p>Even with the same infinite sequence of observations, their pseudo-true beliefs can differ:</p>
        <div class="math">
          \[
            \theta_A^*
            \in
            \arg\min_{\theta}D_{\mathrm{KL}}(p\,\|\,q_A(\cdot\mid\theta)),
            \qquad
            \theta_B^*
            \in
            \arg\min_{\theta}D_{\mathrm{KL}}(p\,\|\,q_B(\cdot\mid\theta)).
          \]
        </div>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper unifies many forms of misspecified learning and extends the theory to heterogeneous subjective models. It is especially important for social learning, polarization, and representative-agent validity.</p>
        <p><strong>Proof technique.</strong> The key technique is to abstract misspecification into an interpretation mapping and then characterize long-run beliefs through the associated KL projection/fixed-point criterion. Robustness is studied by checking how the criterion behaves across model perturbations and heterogeneous specifications.</p>
        <p><strong>Useful secondary technique.</strong> A portable idea is to ask whether heterogeneous biases collapse to a representative-agent bias. If not, disagreement is a structural implication rather than a transient phenomenon.</p>
        <p><strong>Problem solved.</strong> The paper solves how to characterize long-run learning when agents interpret the same evidence through different misspecified models.</p>
        <p><strong>Open questions.</strong> Extensions include endogenous information networks, strategic communication among heterogeneously misspecified agents, welfare comparisons across biases, and policy interventions that change interpretation rather than information.</p>
        <p><strong>My comment.</strong> This is one of the best papers for thinking about polarization formally. A new paper could combine it with rational inattention: agents may both attend to different information and interpret shared information through different wrong models.</p>
      `,
    },
  },
  {
    id: "esponda-pouzo-2016",
    title: "Berk-Nash Equilibrium: A Framework for Modeling Agents With Misspecified Models",
    authors: "Ignacio Esponda; Demian Pouzo",
    journal: "Econometrica",
    year: 2016,
    doi: "10.3982/ecta12609",
    status: "Digested",
    tags: ["misspecified-learning", "behavioral-learning"],
    takeaway: "Foundational equilibrium framework for agents with misspecified subjective models.",
    digest: {
      short: "Berk-Nash equilibrium is the central equilibrium concept for agents who optimize under misspecified subjective models. A player chooses optimally given her belief, and her belief is restricted to parameters that best fit the objective distribution of consequences generated by equilibrium play. The best-fit criterion is Kullback-Leibler minimization, weighted by the actions that are actually played.",
      motivation: `
        <p><strong>Motivation.</strong> Economic agents often have wrong but disciplined models of the world. They may be sophisticated optimizers and careful updaters, but their subjective model leaves out variables or causal channels.</p>
        <p><strong>Reality example.</strong> A seller who ignores competitor behavior may attribute demand changes entirely to her own price. In equilibrium, she may choose a price that is optimal under the best-fitting wrong model of demand, even though her causal interpretation is false.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Nash equilibrium assumes correct beliefs about consequences. Self-confirming equilibrium allows wrong off-path beliefs but correct beliefs about observed on-path outcomes. Berk-Nash goes further: even on-path beliefs can be wrong, but they must be the best-fitting beliefs within the player's misspecified model.</p>
        <p><strong>Why it matters.</strong> If agents only observe consequences of actions they take, a wrong model can survive forever. Berk-Nash describes the fixed point between optimal behavior and the statistically best wrong explanation of the data generated by that behavior.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>There are players \(i=1,\ldots,I\). Each player chooses actions \(a_i\in A_i\), and action profile \(a=(a_i,a_{-i})\) generates payoff-relevant consequences \(y_i\in Y_i\).</p>
        <div class="math">
          \[
            y_i\sim Q_i(\cdot\mid a)
          \]
        </div>
        <p>The true distribution \(Q_i\) need not belong to player \(i\)'s subjective model. Player \(i\)'s subjective model is a parameterized family</p>
        <div class="math">
          \[
            \mathcal{Q}_i=\{Q_i^{\theta_i}(\cdot\mid a_i):\theta_i\in\Theta_i\}.
          \]
        </div>
        <p>The model may be misspecified because it may ignore other players' actions, omit payoff-relevant states, impose wrong functional forms, or misperceive causal channels.</p>
        <h3>2. Strategy-Induced Data</h3>
        <p>Let \(\sigma\) be a mixed strategy profile. Player \(i\)'s observed data distribution from choosing action \(a_i\) is induced by opponents' equilibrium play:</p>
        <div class="math">
          \[
            \bar Q_i^{\sigma}(\cdot\mid a_i)
            =
            \sum_{a_{-i}}
            Q_i(\cdot\mid a_i,a_{-i})\sigma_{-i}(a_{-i}).
          \]
        </div>
        <p>The player evaluates subjective parameter \(\theta_i\) by how well it fits the data generated at the actions she actually uses.</p>
        <div class="math">
          \[
            K_i(\sigma,\theta_i)
            =
            \sum_{a_i\in A_i}
            \sigma_i(a_i)
            D_{\mathrm{KL}}\!\left(
              \bar Q_i^{\sigma}(\cdot\mid a_i)
              \,\|\,Q_i^{\theta_i}(\cdot\mid a_i)
            \right).
          \]
        </div>
        <p>The set of best-fitting parameters is</p>
        <div class="math">
          \[
            \Theta_i(\sigma)
            =
            \arg\min_{\theta_i\in\Theta_i}K_i(\sigma,\theta_i).
          \]
        </div>
        <h3>3. Berk-Nash Equilibrium</h3>
        <div class="theorem-box">
          <h3>Definition</h3>
          <p>A strategy profile \(\sigma\) is a Berk-Nash equilibrium if for each player \(i\), there exists a belief \(\beta_i\in\Delta(\Theta_i)\) such that</p>
          <div class="math">
            \[
              \operatorname{supp}(\beta_i)\subseteq\Theta_i(\sigma),
            \]
          </div>
          <p>and every action used with positive probability is optimal under \(\beta_i\):</p>
          <div class="math">
            \[
              \operatorname{supp}(\sigma_i)
              \subseteq
              \arg\max_{a_i\in A_i}
              \sum_{\theta_i}
              U_i(a_i,\theta_i)\beta_i(\theta_i).
            \]
          </div>
        </div>
        <p>The equilibrium is therefore a fixed point: strategies determine the data, the data determine best-fitting beliefs, and those beliefs justify the strategies.</p>
        <h3>4. Relation To Nash And Self-Confirming Equilibrium</h3>
        <p>If the subjective model is correctly specified, the KL minimum can put probability on the true consequence distribution. Then Berk-Nash collapses toward Nash-like reasoning. If the model is correct only along the equilibrium path but unrestricted off path, the concept is close to self-confirming equilibrium. The novelty is allowing even on-path interpretations to be wrong, provided they are the best available wrong interpretation.</p>
      `,
      example: String.raw`
        <h3>Simple Example: A Misspecified Monopolist</h3>
        <p>A seller chooses price \(p\). True demand depends on price and an unobserved market condition \(z\):</p>
        <div class="math">
          \[
            D = \alpha-\beta p+z+\varepsilon.
          \]
        </div>
        <p>The seller's subjective model omits \(z\) and believes</p>
        <div class="math">
          \[
            D = \theta_0-\theta_1 p+\varepsilon.
          \]
        </div>
        <p>If the seller repeatedly chooses prices near \(p^*\), she mainly observes demand around \(p^*\). Her posterior concentrates on the \(\theta\) that best fits demand data near the prices she actually tries:</p>
        <div class="math">
          \[
            \theta^*(p^*)
            \in
            \arg\min_{\theta}
            D_{\mathrm{KL}}\!\left(
              Q(\cdot\mid p^*)\,\|\,Q^{\theta}(\cdot\mid p^*)
            \right).
          \]
        </div>
        <p>A Berk-Nash price \(p^*\) maximizes perceived profit under \(\theta^*(p^*)\). The seller can be persistently wrong about demand away from \(p^*\), because she never experiments there.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper provides the equilibrium analogue of Berk's Bayesian learning under misspecification. It nests Nash and self-confirming equilibrium as special cases while allowing systematically wrong but statistically disciplined beliefs.</p>
        <p><strong>Proof technique.</strong> The key proof technique is KL-based likelihood survival. For a fixed strategy profile, Bayesian updating under a misspecified model eliminates parameters with larger weighted KL divergence. The equilibrium proof then combines this statistical object with a fixed-point argument over strategies and beliefs.</p>
        <div class="math">
          \[
            \theta_i\text{ survives}
            \quad\Longleftrightarrow\quad
            \theta_i\in\arg\min_{\hat\theta_i}
            \sum_{a_i}\sigma_i(a_i)
            D_{\mathrm{KL}}\!\left(
              \bar Q_i^{\sigma}(\cdot\mid a_i)
              \,\|\,Q_i^{\hat\theta_i}(\cdot\mid a_i)
            \right).
          \]
        </div>
        <p><strong>Useful secondary technique.</strong> The paper's decomposition is reusable: first compute the weighted KL projection of the true environment onto the subjective model; then solve the agent's optimization problem under that projection; then look for fixed points.</p>
        <p><strong>Problem solved.</strong> It gives economists a disciplined equilibrium concept for wrong-model behavior that is neither arbitrary bias nor fully correct Bayesian learning.</p>
        <p><strong>Open questions.</strong> Important extensions include endogenous experimentation, heterogeneous misspecification across agents, welfare and policy under wrong models, and dynamic environments in which the best-fitting wrong model changes over time.</p>
        <p><strong>My comment.</strong> This is one of the most useful papers in the list for building new theory. The KL projection step is a workhorse: once you see it, many behavioral-learning models can be rewritten as a fixed point between endogenous data and pseudo-true beliefs.</p>
      `,
    },
  },
  {
    id: "fudenberg-romanyuk-strack-2017",
    title: "Active Learning with a Misspecified Prior",
    authors: "Drew Fudenberg; Gleb Romanyuk; Philipp Strack",
    journal: "Theoretical Economics",
    year: 2017,
    doi: "10.3982/te2480",
    status: "Digested",
    tags: ["misspecified-learning", "information-acquisition"],
    takeaway: "Combines active experimentation and misspecified priors.",
    digest: {
      short: "Fudenberg, Romanyuk, and Strack study active learning when the agent's prior/model is misspecified. The agent does not passively receive data; she chooses actions or experiments, and those choices determine what she learns. The central difficulty is the feedback between wrong beliefs and endogenous data: a misspecified prior can lead the agent to experiment in ways that confirm the wrong model.",
      motivation: `
        <p><strong>Motivation.</strong> In many learning problems, people choose what data to see. A firm chooses prices, a doctor orders tests, a manager tries policies, and a worker chooses tasks. If the learner begins with a wrong model, her experiments may steer her toward misleading evidence.</p>
        <p><strong>Reality example.</strong> A firm wrongly believes that only low prices attract customers. It keeps experimenting with low prices and never tries high prices in the right market segment. The data it collects are real, but the experimentation policy is shaped by the wrong prior.</p>
        <p><strong>Implication.</strong> Misspecification is especially dangerous in active learning because wrong beliefs affect the sample path of evidence.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Standard misspecified Bayesian learning often studies which false parameter best fits an exogenous data process. Here, the data are endogenous: actions affect observations. Therefore the pseudo-true parameter is not fixed independently of behavior.</p>
      `,
      deep: String.raw`
        <h3>1. Active Learning Setup</h3>
        <p>An agent chooses actions \(a_t\in A\) over time. Outcomes \(y_t\) are generated by the true process</p>
        <div class="math">
          \[
            y_t\sim p(\cdot\mid a_t).
          \]
        </div>
        <p>The agent's subjective model is a family</p>
        <div class="math">
          \[
            q_{\theta}(\cdot\mid a),
            \qquad
            \theta\in\Theta,
          \]
        </div>
        <p>which may not contain the true process. The agent begins with a prior over \(\Theta\), updates using Bayes' rule inside the subjective model, and chooses actions to optimize perceived continuation value.</p>
        <h3>2. Endogenous KL Projection</h3>
        <p>If action \(a\) is used with long-run frequency \(\sigma(a)\), the parameter's fit is measured by the weighted KL criterion</p>
        <div class="math">
          \[
            K(\theta;\sigma)
            =
            \sum_{a\in A}\sigma(a)
            D_{\mathrm{KL}}\!\left(
              p(\cdot\mid a)\,\|\,q_{\theta}(\cdot\mid a)
            \right).
          \]
        </div>
        <p>The best-fitting subjective parameters are</p>
        <div class="math">
          \[
            \Theta^*(\sigma)
            =
            \arg\min_{\theta\in\Theta}K(\theta;\sigma).
          \]
        </div>
        <p>Because \(\sigma\) is generated by the agent's own policy, learning and experimentation form a fixed point.</p>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Active Misspecified Learning</h3>
          <p>The long-run behavior must be consistent with both optimal experimentation under the agent's limiting beliefs and statistical fit of those beliefs to the data generated by the experimentation policy.</p>
          <div class="math">
            \[
              \operatorname{supp}(\beta)
              \subseteq
              \Theta^*(\sigma),
              \qquad
              \sigma
              \text{ is optimal under }
              \beta.
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Two-Armed Experiment Example</h3>
        <p>A firm can choose action \(a\in\{L,H\}\), low or high price. True demand is</p>
        <div class="math">
          \[
            y=\alpha-\beta a+\gamma z+\varepsilon,
          \]
        </div>
        <p>but the firm's subjective model omits market segment \(z\):</p>
        <div class="math">
          \[
            y=\theta_0-\theta_1 a+\varepsilon.
          \]
        </div>
        <p>If the firm mostly chooses \(L\), its posterior concentrates on the \(\theta\) that best fits low-price data:</p>
        <div class="math">
          \[
            \theta^*
            \in
            \arg\min_{\theta}
            D_{\mathrm{KL}}\!\left(p(\cdot\mid L)\,\|\,q_{\theta}(\cdot\mid L)\right).
          \]
        </div>
        <p>The firm may never discover that \(H\) works well in some segment because its wrong model discourages the experiment that would reveal it.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper connects misspecified learning to active experimentation, bandits, and optimal control. It extends the Berk/Berk-Nash logic from passive data to settings where the learner controls the data-generating process.</p>
        <p><strong>Proof technique.</strong> The useful proof engine is a combination of Bayesian likelihood-ratio convergence under misspecification and dynamic programming for experimentation. The key challenge is that the KL objective is path-dependent because actions are endogenous.</p>
        <p><strong>Useful secondary technique.</strong> A reusable technique is to write the long-run statistical fit as a weighted KL projection, with weights equal to action frequencies. Then solve for action frequencies that are optimal under the projected belief.</p>
        <p><strong>Problem solved.</strong> The paper explains how misspecified priors interact with active information acquisition and why experimentation may not correct wrong models.</p>
        <p><strong>Open questions.</strong> Extensions include strategic experimentation by multiple misspecified agents, costly information design, robust experimentation policies, and external interventions that force off-path experiments.</p>
        <p><strong>My comment.</strong> This is a key bridge between learning and optimal stopping/experimentation. A new paper could ask how to design minimal exploration subsidies that break self-confirming misspecified experimentation traps.</p>
      `,
    },
  },
  {
    id: "heidhues-koszegi-strack-2021",
    title: "Convergence in Models of Misspecified Learning",
    authors: "Paul Heidhues; Botond Koszegi; Philipp Strack",
    journal: "Theoretical Economics",
    year: 2021,
    doi: "10.3982/te3558",
    status: "Digested",
    tags: ["misspecified-learning", "learning"],
    takeaway: "General convergence results for misspecified learning models.",
    digest: {
      short: "Heidhues, Koszegi, and Strack prove convergence of beliefs and actions in one-dimensional misspecified-learning environments with endogenous actions. Their method uses stochastic approximation. The crucial structural assumptions are continuous state/action spaces and a posterior that can be summarized by one statistic.",
      motivation: `
        <p><strong>Motivation.</strong> Misspecified-learning models can easily cycle or become analytically messy because beliefs affect actions and actions affect future evidence. To use these models confidently, theorists need conditions under which beliefs and actions actually converge.</p>
        <p><strong>Reality example.</strong> A manager using the wrong demand model changes price each period. Each price produces new demand data, but the data are interpreted through the wrong model. The question is whether her belief and price settle down or keep moving forever.</p>
        <p><strong>Implication.</strong> The paper gives a tractable convergence toolkit for applied behavioral-learning models.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> The paper establishes convergence of beliefs and actions in one-dimensional learning settings where the model is misspecified, actions are endogenous, and actions affect how information is misinterpreted. The posterior must admit a one-dimensional summary statistic, which allows stochastic-approximation methods.</p>
      `,
      deep: String.raw`
        <h3>1. One-Dimensional Belief State</h3>
        <p>The agent's posterior is summarized by a scalar \(x_t\in X\subseteq\mathbb{R}\). Given \(x_t\), she chooses an action</p>
        <div class="math">
          \[
            a_t=a(x_t).
          \]
        </div>
        <p>The true outcome distribution depends on the action, while the agent interprets outcomes through a misspecified model.</p>
        <div class="math">
          \[
            y_t\sim p(\cdot\mid a_t),
            \qquad
            \text{agent uses }q_{\theta}(\cdot\mid a_t).
          \]
        </div>
        <h3>2. Recursive Belief Updating</h3>
        <p>The posterior statistic follows a stochastic recursion of the form</p>
        <div class="math">
          \[
            x_{t+1}
            =
            x_t+\gamma_t\left[
              h(x_t,y_{t+1})+\varepsilon_{t+1}
            \right],
          \]
        </div>
        <p>where \(\gamma_t\) is a step size and the drift is</p>
        <div class="math">
          \[
            H(x)=\mathbb{E}\left[h(x,Y)\mid a(x)\right].
          \]
        </div>
        <h3>3. Stochastic Approximation Limit</h3>
        <p>The associated deterministic differential equation is</p>
        <div class="math">
          \[
            \dot x=H(x).
          \]
        </div>
        <p>Stable rest points of this ODE are candidate long-run beliefs. Actions converge when \(a(x_t)\) converges.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Belief And Action Convergence</h3>
          <p>Under the paper's one-dimensional summary and continuity conditions, beliefs and actions converge in a class of misspecified-learning models. The limiting belief is characterized by the stable zeros of the stochastic-approximation drift:</p>
          <div class="math">
            \[
              H(x^*)=0,
              \qquad
              a_t\to a(x^*).
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Normal-Normal Example</h3>
        <p>The agent believes outcomes satisfy</p>
        <div class="math">
          \[
            y_t=\theta a_t+\varepsilon_t,
            \qquad
            \varepsilon_t\sim N(0,\sigma^2),
          \]
        </div>
        <p>but the true process is</p>
        <div class="math">
          \[
            y_t=f(a_t)+\varepsilon_t.
          \]
        </div>
        <p>If the posterior mean \(x_t=\mathbb{E}[\theta\mid h_t]\) summarizes beliefs, the agent chooses \(a_t=a(x_t)\). Updating the posterior mean creates a recursion whose expected drift compares the true outcome \(f(a(x))\) to the misspecified prediction \(x a(x)\):</p>
        <div class="math">
          \[
            H(x)\propto a(x)\left[f(a(x))-x a(x)\right].
          \]
        </div>
        <p>Convergence means the agent settles on a pseudo-true \(x^*\) satisfying \(H(x^*)=0\).</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper provides convergence tools for misspecified learning with endogenous actions, complementing Berk-Nash equilibrium and active-learning papers that characterize possible long-run points.</p>
        <p><strong>Proof technique.</strong> The main proof technique is stochastic approximation. The random belief recursion is approximated by an ODE, and convergence follows by studying stable rest points of the ODE.</p>
        <p><strong>Useful secondary technique.</strong> Reducing the posterior to a one-dimensional sufficient statistic is the tractability trick. It turns a Bayesian learning problem into a scalar dynamical system.</p>
        <p><strong>Problem solved.</strong> The paper gives conditions under which misspecified-learning models converge rather than cycling or remaining analytically indeterminate.</p>
        <p><strong>Open questions.</strong> Important extensions include multidimensional posterior summaries, discontinuous actions, strategic interaction, and learning environments where misspecification itself changes with beliefs.</p>
        <p><strong>My comment.</strong> This is a method paper in the best sense. If you want to build a behavioral-learning model, the ODE/stochastic-approximation reduction is one of the first proof techniques to consider.</p>
      `,
    },
  },
  {
    id: "frick-iijima-ishii-2022",
    title: "Belief Convergence under Misspecified Learning: A Martingale Approach",
    authors: "Mira Frick; Ryota Iijima; Yuhta Ishii",
    journal: "The Review of Economic Studies",
    year: 2022,
    doi: "10.1093/restud/rdac040",
    status: "Digested",
    tags: ["misspecified-learning", "learning"],
    takeaway: "Uses martingale methods to study belief convergence under misspecification.",
    digest: {
      short: "Frick, Iijima, and Ishii develop a martingale approach to belief convergence under misspecified learning. The key innovation is a prediction-accuracy order over subjective models, which partially restores the martingale convergence logic available under correct specification.",
      motivation: `
        <p><strong>Motivation.</strong> Correct Bayesian beliefs have a powerful martingale property: today's belief is the expected value of tomorrow's belief. Misspecification breaks this structure, making convergence harder to prove.</p>
        <p><strong>Reality example.</strong> A manager repeatedly observes sales through a wrong demand model. Even if she cannot learn the truth, we still want to know whether her belief settles down and whether a tiny modeling error can cause a large learning failure.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> The paper introduces a prediction-accuracy order over subjective models. This makes it possible to partially restore martingale convergence arguments and derive local/global conditions for belief convergence. In slow-learning settings, vanishingly small misspecification can generate extreme failures.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>The true data process is \(p\), while the agent uses a subjective model \(q_{\theta}\) with \(\theta\in\Theta\). Observations may come from individual learning, social learning, costly information acquisition, or sequential decisions.</p>
        <div class="math">
          \[
            y_t\sim p(\cdot\mid h_t),
            \qquad
            \text{agent evaluates }q_{\theta}(\cdot\mid h_t).
          \]
        </div>
        <h3>2. Correct-Specification Benchmark</h3>
        <p>When the model is correct, posterior beliefs satisfy</p>
        <div class="math">
          \[
            \mathbb{E}[\mu_{t+1}\mid\mathcal{F}_t]=\mu_t.
          \]
        </div>
        <p>This martingale property gives convergence. Under misspecification, the equality generally fails under the true probability measure.</p>
        <h3>3. Prediction-Accuracy Order</h3>
        <p>The paper replaces exact martingales with an order over subjective models based on predictive performance. In a simple KL version, model \(\theta'\) is more accurate than \(\theta\) if</p>
        <div class="math">
          \[
            D_{\mathrm{KL}}(p\,\|\,q_{\theta'})
            \le
            D_{\mathrm{KL}}(p\,\|\,q_{\theta}).
          \]
        </div>
        <p>The paper's actual order is more general and is designed to work in dynamic environments.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Convergence Via Prediction Accuracy</h3>
          <p>If the prediction-accuracy order gives beliefs a directional force toward a candidate long-run belief, then beliefs converge locally or globally. The theorem recovers martingale-style convergence logic without requiring correct specification.</p>
        </div>
      `,
      example: String.raw`
        <h3>Slow Social Learning Example</h3>
        <p>Agents observe predecessors' actions. Correctly specified agents may eventually learn the true state. Now suppose each agent slightly misreads how informative predecessor actions are. Beliefs may still converge,</p>
        <div class="math">
          \[
            \mu_t\to\mu^*,
          \]
        </div>
        <p>but \(\mu^*\) can be far from the truth when learning is slow. The prediction-accuracy order helps determine whether convergence happens and where it points.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper gives a general convergence method for misspecified learning across individual and social settings.</p>
        <p><strong>Proof technique.</strong> The special technique is martingale restoration: construct a prediction-accuracy order that behaves like a Lyapunov or supermartingale object even though posterior beliefs are not true martingales.</p>
        <p><strong>Useful secondary technique.</strong> When Bayesian martingales fail, search for an ordered predictive-performance object that still moves monotonically in expectation.</p>
        <p><strong>Problem solved.</strong> It identifies general conditions under which misspecified beliefs converge and shows why small misspecifications can be disastrous in slow-learning environments.</p>
        <p><strong>Open questions.</strong> Extensions include strategic learning, endogenous networks, welfare comparisons of convergence speed, and policy design in slow-learning systems.</p>
        <p><strong>My comment.</strong> This is a proof-technique paper worth mining. The prediction-accuracy order is the kind of mathematical object that can unlock many biased-learning models.</p>
      `,
    },
  },
  {
    id: "he-2022-mislearning",
    title: "Mislearning from Censored Data: The Gambler's Fallacy and Other Correlational Mistakes in Optimal-Stopping Problems",
    authors: "Kevin He",
    journal: "Theoretical Economics",
    year: 2022,
    doi: "10.3982/te4657",
    status: "Digested",
    tags: ["misspecified-learning", "behavioral-learning", "optimal-stopping"],
    takeaway: "A clean bridge between biased learning, censored data, and optimal stopping.",
    digest: {
      short: "Kevin He studies agents who learn from predecessors in optimal-stopping problems while misperceiving intertemporal correlation. Because predecessors stop when draws are good enough, observed histories contain negative streaks but not positive streaks. Gambler's-fallacy agents misread this censored data, become overpessimistic about the mean, and stop too early.",
      motivation: `
        <p><strong>Motivation.</strong> Many real datasets are stopped datasets. We observe failed searches, abandoned projects, and pre-success histories, but not the counterfactual path after success. Biases about randomness can interact with this censoring.</p>
        <p><strong>Reality example.</strong> Entrepreneurs hear many stories of long early struggles before a startup either succeeds or shuts down. Success truncates the story. A gambler's-fallacy learner expects bad streaks to reverse and therefore interprets observed bad streaks as evidence that the environment is worse than it is.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> Agents face optimal-stopping problems and learn distributional parameters from predecessors. Stopping censors histories. Gambler's-fallacy agents understate the probability of consecutive below-average draws, converge to overpessimistic beliefs, and stop too early.</p>
      `,
      deep: String.raw`
        <h3>1. Optimal-Stopping Setup</h3>
        <p>An agent observes draws \(x_1,x_2,\ldots\) from an unknown distribution and chooses a stopping time \(\tau\):</p>
        <div class="math">
          \[
            \tau^*
            \in
            \arg\max_{\tau}
            \mathbb{E}\left[u(x_{\tau})-c\tau\right].
          \]
        </div>
        <p>Agents learn from predecessors' observed histories \((x_1,\ldots,x_{\tau})\), not from full uncensored sequences.</p>
        <h3>2. Endogenous Censoring</h3>
        <p>If agents stop when draws are good enough, positive histories are truncated. Negative streaks remain visible because agents continue sampling after bad draws.</p>
        <div class="math">
          \[
            \text{observed data}
            =
            \{x_t:t\le \tau\}.
          \]
        </div>
        <h3>3. Correlational Mistake</h3>
        <p>A gambler's-fallacy agent uses a subjective law with excessive reversals:</p>
        <div class="math">
          \[
            q_{\theta}(x_{t+1}\mid x_t)
            \ne
            p_{\theta}(x_{t+1}).
          \]
        </div>
        <p>She thinks long negative streaks are too unlikely under a good distribution, so observed negative streaks push her posterior mean too low.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Pessimistic Mislearning From Censored Data</h3>
          <p>With gambler's-fallacy beliefs, agents converge to overpessimistic beliefs about the distribution's mean and stop too early. If they are uncertain about variance, they overestimate variance in a way shaped by predecessors' stopping thresholds.</p>
        </div>
      `,
      example: String.raw`
        <h3>Job Search Example</h3>
        <p>A worker samples offers. She stops once an offer exceeds threshold \(b\). Public histories end at acceptance. We may observe</p>
        <div class="math">
          \[
            40,\;42,\;39,\;55
          \]
        </div>
        <p>but never the good offers that might have arrived after \(55\), because the worker stopped. A gambler's-fallacy observer thinks the three low offers should have been followed by a high offer sooner, so she infers the offer distribution is poor and chooses a lower stopping threshold.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper bridges biased learning, censored data, and optimal stopping. It shows that behavioral mistakes are especially powerful when the data agents observe have already been selected by previous stopping decisions.</p>
        <p><strong>Proof technique.</strong> The proof characterizes the distribution of stopped histories and then computes the pseudo-true beliefs of a misspecified learner from that selected dataset.</p>
        <p><strong>Useful secondary technique.</strong> Treat the observed sample as an equilibrium object generated by a stopping rule. The learner does not see nature; she sees nature filtered by predecessors' decisions.</p>
        <p><strong>Problem solved.</strong> It explains how endogenous censoring and correlational mistakes jointly produce pessimistic beliefs and premature stopping.</p>
        <p><strong>Open questions.</strong> Extensions include platform disclosure of censored histories, social networks of stopped data, multi-armed stopping, and rational inattention to stopped histories.</p>
        <p><strong>My comment.</strong> This is one of the most practically intuitive papers in the list. Many empirical environments are censored by stopping, so the mechanism travels well.</p>
      `,
    },
  },
  {
    id: "frick-iijima-ishii-2024-welfare",
    title: "Welfare Comparisons for Biased Learning",
    authors: "Mira Frick; Ryota Iijima; Yuhta Ishii",
    journal: "American Economic Review",
    year: 2024,
    doi: "10.1257/aer.20210410",
    status: "Digested",
    tags: ["behavioral-learning", "misspecified-learning"],
    takeaway: "Develops welfare comparisons for agents who learn with biases.",
    digest: {
      short: "Frick, Iijima, and Ishii rank learning biases by robust welfare harm. One bias is more harmful than another if it yields lower objective expected payoffs in every decision problem. Static rankings compare posterior distortions signal by signal, while dynamic rankings use an efficiency index measuring belief-convergence speed.",
      motivation: `
        <p><strong>Motivation.</strong> Behavioral economics has many biases, but saying which bias is worse is hard. A ranking based on one payoff example may be arbitrary. This paper asks for rankings that are robust across decision problems.</p>
        <p><strong>Reality example.</strong> A doctor may overreact to tests while an investor underreacts to signals. Which mistake is worse depends on the decision problem, unless one bias can be shown to reduce objective payoffs in all problems.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> Given a true signal distribution, one bias is more harmful than another if it gives lower objective expected payoffs in all decision problems. Static comparisons work signal by signal; dynamic comparisons use an efficiency index for the speed of convergence.</p>
      `,
      deep: String.raw`
        <h3>1. Biased Belief Maps</h3>
        <p>A learning rule maps a signal \(s\) into a posterior belief:</p>
        <div class="math">
          \[
            B:s\mapsto \mu_B(\cdot\mid s).
          \]
        </div>
        <p>Different biases correspond to different maps \(B\), including misspecified Bayesian rules and some non-Bayesian rules.</p>
        <h3>2. Static Welfare Comparison</h3>
        <p>For payoff function \(u(a,\theta)\), a biased learner chooses</p>
        <div class="math">
          \[
            a_B(s)\in\arg\max_a
            \sum_{\theta}u(a,\theta)\mu_B(\theta\mid s).
          \]
        </div>
        <p>The objective expected payoff is</p>
        <div class="math">
          \[
            V(B;u)
            =
            \mathbb{E}_{p}\left[u(a_B(s),\theta)\right].
          \]
        </div>
        <p>Bias \(B_1\) is more harmful than \(B_2\) if</p>
        <div class="math">
          \[
            V(B_1;u)\le V(B_2;u)
            \quad\text{for all decision problems }u.
          \]
        </div>
        <h3>3. Dynamic Comparison</h3>
        <p>In repeated learning, payoffs depend on the rate at which beliefs approach useful long-run beliefs. The paper's dynamic ranking uses an efficiency index:</p>
        <div class="math">
          \[
            \mathcal{E}(B)
            =
            \text{belief-convergence efficiency of bias }B.
          \]
        </div>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Robust Welfare Rankings</h3>
          <p>The paper characterizes when one biased learning rule is robustly worse than another. Static and dynamic rankings need not agree; some large static biases can dynamically outperform vanishingly small biases.</p>
        </div>
      `,
      example: String.raw`
        <h3>Overreaction And Underreaction Example</h3>
        <p>If a Bayesian log likelihood ratio is \(\ell(s)\), an overreacting learner may use</p>
        <div class="math">
          \[
            \ell_O(s)=2\ell(s),
          \]
        </div>
        <p>while an underreacting learner uses</p>
        <div class="math">
          \[
            \ell_U(s)=\frac12\ell(s).
          \]
        </div>
        <p>In a one-shot problem, overreaction may be worse for some decisions. Dynamically, underreaction may be worse because it slows learning. The paper formalizes such comparisons.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper gives a welfare theory for biased learning rather than only a positive theory of biased beliefs.</p>
        <p><strong>Proof technique.</strong> Static results use decision-theoretic order comparisons over posterior beliefs; dynamic results use an efficiency index connected to convergence speed.</p>
        <p><strong>Useful secondary technique.</strong> Separate static posterior distortion from dynamic learning speed. These are different welfare dimensions.</p>
        <p><strong>Problem solved.</strong> The paper solves how to compare the severity of learning biases robustly across decision problems.</p>
        <p><strong>Open questions.</strong> Extensions include endogenous information acquisition, social-learning externalities, heterogeneous biases, and policy tools that partially correct bias.</p>
        <p><strong>My comment.</strong> This paper is useful for normative theory. A new paper could compare rational-inattention coarsening and misspecified Bayesian learning using this robust-welfare approach.</p>
      `,
    },
  },
  {
    id: "heidhues-koszegi-strack-2018",
    title: "Unrealistic Expectations and Misguided Learning",
    authors: "Paul Heidhues; Botond Koszegi; Philipp Strack",
    journal: "Econometrica",
    year: 2018,
    doi: "10.3982/ecta14084",
    status: "Digested",
    tags: ["behavioral-learning", "misspecified-learning"],
    takeaway: "A major behavioral learning paper on persistent mistaken beliefs.",
    digest: {
      short: "Heidhues, Koszegi, and Strack study how unrealistic expectations can persist and guide future learning in the wrong direction. The central mechanism is that agents interpret evidence through a biased model, so disappointing outcomes are not necessarily attributed to the right cause. Learning can therefore reinforce misguided behavior instead of correcting it.",
      motivation: `
        <p><strong>Motivation.</strong> People often begin with unrealistic expectations about ability, demand, returns, or risks. Experience does not always eliminate these beliefs, because people interpret experience through the same distorted worldview that generated the expectations.</p>
        <p><strong>Reality example.</strong> A worker overestimates her ability in a career path. Poor outcomes may be blamed on bad luck, bad colleagues, or the wrong temporary factor, so she keeps investing in a poor match instead of switching.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> The paper belongs to the misspecified-learning program: agents update from data, but their model maps outcomes to causes incorrectly. As a result, learning can be misguided. The long-run belief is the best-fitting belief inside the wrong model, not the truth.</p>
      `,
      deep: String.raw`
        <h3>1. Basic Setup</h3>
        <p>An agent chooses actions \(a_t\) and observes outcomes \(y_t\). The true outcome process is</p>
        <div class="math">
          \[
            y_t\sim p(\cdot\mid a_t,\theta_0),
          \]
        </div>
        <p>but the agent uses a subjective model</p>
        <div class="math">
          \[
            y_t\sim q_{\theta}(\cdot\mid a_t),
            \qquad
            \theta\in\Theta.
          \]
        </div>
        <p>The misspecification captures unrealistic expectations: the subjective model attributes outcomes to the wrong forces or excludes the true explanation.</p>
        <h3>2. Pseudo-True Beliefs</h3>
        <p>Given a long-run action distribution \(\sigma\), the best-fitting subjective belief solves</p>
        <div class="math">
          \[
            \theta^*(\sigma)
            \in
            \arg\min_{\theta\in\Theta}
            \sum_a\sigma(a)
            D_{\mathrm{KL}}\!\left(
              p(\cdot\mid a,\theta_0)
              \,\|\,q_{\theta}(\cdot\mid a)
            \right).
          \]
        </div>
        <h3>3. Misguided Learning Feedback</h3>
        <p>The agent chooses actions optimal under \(\theta^*(\sigma)\), but those actions determine \(\sigma\) and hence the evidence available for learning. A misguided-learning steady state satisfies</p>
        <div class="math">
          \[
            a\in\arg\max_{a'}\mathbb{E}_{q_{\theta^*}}[u(a',y)],
            \qquad
            \theta^*\in\Theta^*(\sigma).
          \]
        </div>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Persistent Unrealistic Expectations</h3>
          <p>The paper shows how unrealistic expectations can survive Bayesian-style updating when the agent's model is misspecified. Learning converges to beliefs that best explain the experienced data within the wrong model, and those beliefs can continue to justify misguided actions.</p>
        </div>
      `,
      example: String.raw`
        <h3>Overconfident Entrepreneur Example</h3>
        <p>An entrepreneur believes profit depends mostly on effort \(e\) and ability \(\theta\):</p>
        <div class="math">
          \[
            \pi=\theta e+\varepsilon.
          \]
        </div>
        <p>True profit also depends on market fit \(m\), which she omits:</p>
        <div class="math">
          \[
            \pi=\theta_0 e+m+\varepsilon.
          \]
        </div>
        <p>Bad profits can be interpreted as bad luck or insufficient effort rather than poor fit. Her posterior over \(\theta\) may remain too high, sustaining excessive effort or persistence in the wrong project.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper provides a behavioral-learning account of persistent unrealistic expectations and shows why experience need not correct them.</p>
        <p><strong>Proof technique.</strong> The central proof idea is KL projection under endogenous behavior: identify the pseudo-true belief selected by the data generated under the agent's own misguided actions.</p>
        <p><strong>Useful secondary technique.</strong> The useful recipe is to specify the omitted causal channel, compute the best-fitting wrong explanation, and check whether the resulting action reproduces the data that sustain it.</p>
        <p><strong>Problem solved.</strong> The paper explains how optimism, overconfidence, or unrealistic expectations can be stable under learning rather than merely initial mistakes.</p>
        <p><strong>Open questions.</strong> Extensions include social transmission of unrealistic expectations, policy feedback, heterogeneous wrong models, and interventions that reveal omitted causal channels.</p>
        <p><strong>My comment.</strong> This paper is a good template for behavioral models that are disciplined by data. The mistake is not arbitrary; it survives because it is the best available explanation inside the agent's wrong model.</p>
      `,
    },
  },
  {
    id: "wilson-2014-bounded-memory",
    title: "Bounded Memory and Biases in Information Processing",
    authors: "Andrea Wilson",
    journal: "Econometrica",
    year: 2014,
    doi: "10.3982/ecta12188",
    status: "Digested",
    tags: ["behavioral-learning", "information-acquisition"],
    takeaway: "Models biases created by limited memory in information processing.",
    digest: {
      short: "Wilson studies how bounded memory creates systematic biases in information processing. A decision maker cannot retain or process the entire history, so she compresses data into a limited memory state. This finite memory can generate path dependence, overweighting of salient or recent evidence, confirmatory patterns, and long-run mistakes even when each local update is disciplined.",
      motivation: `
        <p><strong>Motivation.</strong> Real people do not remember all evidence. They remember a few cases, recent observations, striking examples, or categories. Bias can arise from the architecture of memory rather than from a desire to be biased.</p>
        <p><strong>Reality example.</strong> An investor remembers recent crashes and a few vivid success stories, not the full return distribution. Her future risk assessment is based on this compressed memory and can remain distorted.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Memory is a state variable. The agent observes information but only carries forward a bounded summary. Long-run beliefs and actions are determined by the stochastic process over memory states, not by the full Bayesian posterior.</p>
      `,
      deep: String.raw`
        <h3>1. Full-Information Benchmark</h3>
        <p>A Bayesian with unlimited memory observes history \(h_t=(s_1,\ldots,s_t)\) and forms</p>
        <div class="math">
          \[
            \mu_t(\theta)=\Pr(\theta\mid h_t).
          \]
        </div>
        <h3>2. Bounded Memory</h3>
        <p>A bounded-memory agent has a finite or restricted memory state \(m_t\in M\). After observing signal \(s_t\), memory evolves according to</p>
        <div class="math">
          \[
            m_{t+1}=T(m_t,s_t).
          \]
        </div>
        <p>The agent's action is based on \(m_t\), not the full history:</p>
        <div class="math">
          \[
            a_t\in\arg\max_a
            \mathbb{E}[u(a,\theta)\mid m_t].
          \]
        </div>
        <h3>3. Long-Run Memory Distribution</h3>
        <p>For each true state, the memory process induces a Markov chain over \(M\):</p>
        <div class="math">
          \[
            \Pr(m_{t+1}=m'\mid m_t=m,\theta).
          \]
        </div>
        <p>Long-run behavior depends on the invariant distribution of this chain, not on accumulation of all past evidence.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Bias From Memory Constraints</h3>
          <p>Bounded memory can produce systematic information-processing biases and persistent mistakes. Bias arises because the memory transition rule filters and compresses evidence before it becomes a belief.</p>
        </div>
      `,
      example: String.raw`
        <h3>Two-Slot Memory Example</h3>
        <p>An agent sees binary signals \(s_t\in\{G,B\}\) about state \(H\) or \(L\), but remembers only the last two signals:</p>
        <div class="math">
          \[
            m_t=(s_{t-1},s_t).
          \]
        </div>
        <p>If the last two signals are \(G,G\), she is optimistic; if they are \(B,B\), she is pessimistic. Early evidence vanishes entirely. This can create overreaction to recent streaks and failure to converge to the truth.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper gives a formal foundation for biases generated by memory limits, connecting Bayesian learning, finite-memory processes, case-based reasoning, and confirmatory bias.</p>
        <p><strong>Proof technique.</strong> The main technique is Markov-chain analysis over memory states. Instead of tracking a growing history, the proof studies invariant distributions and transitions on a bounded state space.</p>
        <p><strong>Useful secondary technique.</strong> The portable trick is to replace histories with a memory automaton. Bias is then the stationary implication of the automaton.</p>
        <p><strong>Problem solved.</strong> The paper explains how limited memory can create persistent processing biases without assuming arbitrary belief distortions.</p>
        <p><strong>Open questions.</strong> Extensions include endogenous memory allocation, rational inattention with memory constraints, social memory, and welfare comparisons across memory architectures.</p>
        <p><strong>My comment.</strong> This paper is useful whenever you want a behavioral bias to come from a cognitive constraint rather than an unexplained wrong likelihood.</p>
      `,
    },
  },
  {
    id: "mailath-samuelson-2020",
    title: "Learning under Diverse World Views: Model-Based Inference",
    authors: "George J. Mailath; Larry Samuelson",
    journal: "American Economic Review",
    year: 2020,
    doi: "10.1257/aer.20190080",
    status: "Digested",
    tags: ["behavioral-learning", "learning"],
    takeaway: "Model-based inference with heterogeneous world views.",
    digest: {
      short: "Mailath and Samuelson study model-based inference: agents reason with deliberately incomplete models of a complex state space. When agents use different incomplete world views, interaction often does not lead to common beliefs or correct-model beliefs. If their models share enough structure, interaction can still push them toward similar beliefs.",
      motivation: `
        <p><strong>Motivation.</strong> People simplify the world using models. Economists, voters, managers, and doctors all ignore some variables. Disagreement can persist because people use different simplifications, not merely because they have different data.</p>
        <p><strong>Reality example.</strong> One analyst explains inflation mostly through monetary policy, another through supply constraints, and a third through expectations. They may observe the same facts but map them into different model categories.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea from the abstract.</strong> Model-based reasoners partition a complex state space into manageable models. Unless model differences are trivial, interaction often fails to produce common or correct-model beliefs. If models overlap enough, interaction can lead to similar beliefs despite idiosyncrasies.</p>
      `,
      deep: String.raw`
        <h3>1. Complex State Space</h3>
        <p>The true state space \(\Omega\) is too rich for agents to reason over fully. Agent \(i\) uses a simplified partition</p>
        <div class="math">
          \[
            \mathcal{P}_i=\{P_{i1},P_{i2},\ldots\}.
          \]
        </div>
        <p>Each cell groups many true states into one subjective category.</p>
        <h3>2. Model-Based Beliefs</h3>
        <p>Agent \(i\)'s beliefs live on her model, not on the full state space:</p>
        <div class="math">
          \[
            \mu_i\in\Delta(\mathcal{P}_i).
          \]
        </div>
        <p>Signals and other agents' reports are interpreted through this coarse model.</p>
        <h3>3. Interaction</h3>
        <p>After observing messages or actions from others, agent \(i\) updates according to a model-dependent operator</p>
        <div class="math">
          \[
            \mu_{i,t+1}
            =
            T_i(\mu_{i,t},m_{-i,t}).
          \]
        </div>
        <p>Agents with different partitions may not be able to translate each other's information into the same belief space.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Agreement Depends On Shared Model Structure</h3>
          <p>If agents' models differ in nontrivial ways, interaction often does not lead to common beliefs or correct-model beliefs. If the models have enough common structure, beliefs can become similar even when agents have idiosyncratic simplifications.</p>
        </div>
      `,
      example: String.raw`
        <h3>Inflation World-View Example</h3>
        <p>The true state is</p>
        <div class="math">
          \[
            \omega=(m,z,e),
          \]
        </div>
        <p>where \(m\) is monetary policy, \(z\) is supply disruption, and \(e\) is expectations. One agent partitions mainly by \(m\); another partitions mainly by \(z\). The same inflation report therefore changes different coarse beliefs. Agreement requires enough overlap in the partitions.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper provides a theory of learning and disagreement with incomplete subjective models, complementing common-prior agreement and misspecified Bayesian learning.</p>
        <p><strong>Proof technique.</strong> The key technique is to represent world views as partitions or coarse models and study compatibility across belief spaces.</p>
        <p><strong>Useful secondary technique.</strong> Instead of modeling bias only as wrong likelihoods, model bias as a coarse state-space representation. This is useful for world-view and narrative models.</p>
        <p><strong>Problem solved.</strong> The paper explains why interaction among informed agents may fail to produce agreement when agents use different incomplete models.</p>
        <p><strong>Open questions.</strong> Extensions include endogenous model choice, attention to model dimensions, social networks with clustered world views, and persuasion with incompatible model partitions.</p>
        <p><strong>My comment.</strong> This is a conceptually rich paper. A new paper could study when agents decide to refine their model after repeated disagreement.</p>
      `,
    },
  },
  {
    id: "banerjee-breza-chandrasekhar-mobius-2021",
    title: "Naive Learning with Uninformed Agents",
    authors: "Abhijit Banerjee; Emily Breza; Arun G. Chandrasekhar; Markus Mobius",
    journal: "American Economic Review",
    year: 2021,
    doi: "10.1257/aer.20181151",
    status: "Digested",
    tags: ["social-learning", "behavioral-learning"],
    takeaway: "Social learning with naive agents and uninformed participants.",
    digest: {
      short: "Banerjee, Breza, Chandrasekhar, and Mobius study social learning when some agents are uninformed and other agents are naive about this fact. The key force is repetition without new information: opinions or actions can pass through a network and look like many independent confirmations even when they originate from little or no private information. The paper is useful for understanding why rumors, weak evidence, and second-hand opinions can have large effects in networks.",
      motivation: `
        <p><strong>Motivation.</strong> In many villages, workplaces, online communities, and financial markets, not everyone who speaks has direct information. Some people have a private signal; many others merely repeat, transform, or endorse what they have heard. If listeners do not correctly discount these uninformed intermediaries, society can overlearn from noise.</p>
        <p><strong>Reality example.</strong> A farmer hears that a new seed is good from three neighbors. But all three neighbors may have heard it from the same shopkeeper, and one of them may not have tried the seed at all. The farmer treats three mentions as three pieces of evidence, when economically they may be only one repeated signal.</p>
        <p><strong>Implication.</strong> The model explains why improving communication alone need not improve learning. More paths in a network can amplify duplicate information unless agents understand who actually observed what.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Standard social-learning models often assume that every observed action is generated by a privately informed Bayesian agent. This paper relaxes that by allowing uninformed agents and naive inference. If an agent interprets another person's behavior as if it reflected private information, even when it may not, then the social signal is distorted.</p>
        <p><strong>Main point.</strong> The paper studies how the composition of informed and uninformed agents changes information aggregation. The central lesson is that network communication can create an illusion of independent evidence. Naive agents fail to fully correct for duplicated information and for actions generated by agents with no signal.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>There is an unknown binary state</p>
        <div class="math">
          \[
            \theta\in\{0,1\},\qquad \Pr(\theta=1)=\mu_0.
          \]
        </div>
        <p>Some agents are informed and receive private signals \(s_i\). Others are uninformed and receive no payoff-relevant private signal. A convenient representation is</p>
        <div class="math">
          \[
            t_i\in\{I,U\},\qquad
            s_i\sim f_{\theta}\ \text{if }t_i=I,
            \qquad
            s_i=\varnothing\ \text{if }t_i=U.
          \]
        </div>
        <p>Agents observe social information from neighbors in a network. Let \(N_i\) denote the agents whose actions or reports are observed by agent \(i\). Agent \(i\) chooses an action \(a_i\in\{0,1\}\) to match the state:</p>
        <div class="math">
          \[
            u(a_i,\theta)=\mathbf{1}\{a_i=\theta\}.
          \]
        </div>
        <p>A fully Bayesian agent would compute</p>
        <div class="math">
          \[
            \Pr(\theta=1\mid s_i,\{a_j:j\in N_i\},\{t_j:j\in N_i\})
          \]
        </div>
        <p>and would discount actions taken by uninformed agents. A naive learner instead behaves as if observed actions contain independent private information, or as if the social data were generated by a simpler model in which more agents are informed than actually are.</p>
        <h3>2. Distortion From Uninformed Agents</h3>
        <p>The key distortion can be written in likelihood-ratio terms. Let \(L_i(s_i)=f_1(s_i)/f_0(s_i)\) be a private likelihood ratio. A naive agent may treat neighbors' actions as independent likelihood-ratio contributions:</p>
        <div class="math">
          \[
            \widehat{\Lambda}_i
            =
            \frac{\mu_0}{1-\mu_0}
            L_i(s_i)
            \prod_{j\in N_i}\widehat{L}(a_j).
          \]
        </div>
        <p>The correct likelihood ratio would remove or downweight factors coming from uninformed agents and repeated sources:</p>
        <div class="math">
          \[
            \Lambda_i
            =
            \frac{\mu_0}{1-\mu_0}
            L_i(s_i)
            \prod_{\ell\in\mathcal{S}_i}L_{\ell}(s_{\ell}),
          \]
        </div>
        <p>where \(\mathcal{S}_i\) is the set of distinct original signal sources actually revealed by the observed social information. The difference between \(\widehat{\Lambda}_i\) and \(\Lambda_i\) is the economic heart of the paper.</p>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Naive Social Learning With Uninformed Agents</h3>
          <p>When agents do not correctly account for uninformed intermediaries and repeated information, social learning can fail even in well-connected networks. Observed agreement need not mean information aggregation; it may reflect amplification of a small number of signals or even amplification of no signal.</p>
          <div class="math">
            \[
              \widehat{\Lambda}_i
              \neq
              \Lambda_i
              \quad\Rightarrow\quad
              \Pr(a_i=\theta)
              \ \text{may remain bounded away from one.}
            \]
          </div>
        </div>
        <p>The mechanism is not irrational refusal to update. Agents update, but they update inside the wrong social model.</p>
      `,
      example: String.raw`
        <h3>Three-Person Rumor Example</h3>
        <p>Agent 1 observes a signal about whether a product is good. Agents 2 and 3 observe no signal. Agent 2 hears agent 1's action and copies it. Agent 3 hears both agent 1 and agent 2.</p>
        <div class="math">
          \[
            a_2=a_1,\qquad
            N_3=\{1,2\}.
          \]
        </div>
        <p>A Bayesian agent 3 recognizes that \(a_2\) adds no new information once \(a_1\) is known:</p>
        <div class="math">
          \[
            \Pr(\theta=1\mid a_1,a_2)
            =
            \Pr(\theta=1\mid a_1).
          \]
        </div>
        <p>A naive agent 3 may treat the two actions as two independent confirmations:</p>
        <div class="math">
          \[
            \widehat{\Pr}(\theta=1\mid a_1=a_2=1)
            >
            \Pr(\theta=1\mid a_1=1).
          \]
        </div>
        <p>This is exactly how a weak rumor becomes convincing: the network multiplies appearances without multiplying information.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to social learning by combining network information aggregation with behavioral misspecification. It complements classic herding models, DeGroot learning, and Bayesian network learning by emphasizing uninformed agents and repeated information.</p>
        <p><strong>Proof technique.</strong> The useful proof idea is to separate original signal sources from observed social messages. Once one tracks the source graph, it becomes possible to compare true likelihood ratios with the naive likelihood ratios implied by the agent's subjective model.</p>
        <p><strong>Useful secondary technique.</strong> A very portable technique is the duplication accounting argument: represent an observation as a path through a network, then ask whether two observed messages share the same ancestor signal. This is useful for rumor models, platform reposting, and financial information cascades.</p>
        <p><strong>Problem solved.</strong> The paper explains why social networks can produce confident but poorly grounded beliefs when some participants are uninformed and others do not fully account for that.</p>
        <p><strong>Open questions.</strong> Natural extensions include endogenous effort to verify sources, platform labels that reveal whether a message is first-hand, strategic misinformation by uninformed agents, and welfare comparisons between dense and sparse networks.</p>
        <p><strong>My comment.</strong> The paper is valuable because it makes ignorance contagious. A new paper could study optimal network design when the planner cannot stop communication but can reveal provenance, showing when source transparency dominates more information sharing.</p>
      `,
    },
  },
  {
    id: "mossel-sly-tamuz-2015",
    title: "Strategic Learning and the Topology of Social Networks",
    authors: "Elchanan Mossel; Allan Sly; Omer Tamuz",
    journal: "Econometrica",
    year: 2015,
    doi: "10.3982/ecta12058",
    status: "Digested",
    tags: ["social-learning", "networks"],
    takeaway: "Connects strategic learning outcomes to network topology.",
    digest: {
      short: "Mossel, Sly, and Tamuz study repeated action choices by Bayesian strategic agents on a social network. Agents learn from private signals and from neighbors' past actions. The headline result is topological: whether society learns efficiently depends on the shape of the network. An egalitarian network, where no small set of agents has disproportionate influence, supports learning; non-egalitarian networks can have equilibria where learning fails.",
      motivation: `
        <p><strong>Motivation.</strong> People learn from local social circles, not from everyone. A voter sees friends' posts, a trader watches a few analysts, and a worker copies colleagues. Whether local observation aggregates dispersed information depends on network architecture.</p>
        <p><strong>Reality example.</strong> Compare a workplace where everyone talks to a roughly balanced group of peers with one where everyone listens to one charismatic manager. In the first workplace, many independent signals can gradually enter decisions. In the second, the manager's early opinion can dominate even if many workers privately disagree.</p>
        <p><strong>Implication.</strong> The paper says that learning is not only about signal quality. It is also about topology: who can influence whom, and whether influence is spread evenly enough for information to aggregate.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Agents repeatedly choose between two actions and want to match the true state. They observe private signals initially and then observe actions of neighbors in a graph. Since agents are strategic and forward-looking, their actions may both reveal information and manipulate future information flows.</p>
        <p><strong>Main point.</strong> The paper identifies an egalitarianism condition on networks. In sufficiently egalitarian infinite networks, or in large finite networks with high probability, all equilibria aggregate information. But in non-egalitarian networks, some equilibria can fail to learn.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>There is a binary state</p>
        <div class="math">
          \[
            \theta\in\{0,1\}.
          \]
        </div>
        <p>Each agent \(i\) receives a private signal \(s_i\), conditionally independent across agents given \(\theta\). Time is discrete. In each period \(t\), agent \(i\) chooses an action</p>
        <div class="math">
          \[
            a_{i,t}\in\{0,1\}.
          \]
        </div>
        <p>Agent \(i\) observes the past actions of neighbors \(N(i)\) in a graph \(G\):</p>
        <div class="math">
          \[
            h_{i,t}
            =
            \left(
              s_i,\,
              \{a_{j,\tau}:j\in N(i),\ \tau &lt; t\}
            \right).
          \]
        </div>
        <p>Payoffs reward matching the state, possibly discounted over time:</p>
        <div class="math">
          \[
            U_i
            =
            \mathbb{E}
            \left[
              \sum_{t=0}^{\infty}\delta^t
              \mathbf{1}\{a_{i,t}=\theta\}
            \right].
          \]
        </div>
        <p>A strategy maps histories into action probabilities. Equilibrium requires each agent's strategy to maximize expected discounted payoff given beliefs induced by the network and other agents' strategies.</p>
        <h3>2. Learning</h3>
        <p>Learning means that actions become correct with high probability. For an infinite society, a typical learning requirement is</p>
        <div class="math">
          \[
            \lim_{t\to\infty}
            \Pr(a_{i,t}=\theta)=1
            \quad\text{for agents in the society.}
          \]
        </div>
        <p>For a large finite network, efficient learning means that the probability of a wrong long-run action becomes small as the network grows.</p>
        <h3>3. Network Egalitarianism</h3>
        <p>The crucial network condition is egalitarianism. Informally, the network is egalitarian if no individual or small group has excessive social influence over the information available to many others. The opposite is a network with highly unequal influence, such as a star-like structure.</p>
        <div class="math">
          \[
            \text{egalitarian topology}
            \quad\Rightarrow\quad
            \text{many independent signals reach each agent indirectly.}
          \]
        </div>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Topology Determines Strategic Learning</h3>
          <p>In egalitarian networks, equilibrium behavior aggregates information and agents learn the true state. In non-egalitarian networks, there exist equilibria in which learning fails because the actions of influential agents can dominate the social information process.</p>
          <div class="math">
            \[
              G\ \text{egalitarian}
              \quad\Longrightarrow\quad
              \lim_{t\to\infty}\Pr(a_{i,t}=\theta)=1.
            \]
          </div>
        </div>
        <p>The result is powerful because it is not merely about myopic imitation. Even strategic Bayesian agents may fail to learn when the topology gives too much influence to too few agents.</p>
      `,
      example: String.raw`
        <h3>Star Versus Balanced Network Example</h3>
        <p>In a star network, many peripheral agents observe a central agent. The central agent has only one private signal. If the center's early action is wrong, many others may put too much weight on it, and their later actions feed back into the social process.</p>
        <div class="math">
          \[
            N(i)=\{c\}\quad\text{for many }i,
          \]
        </div>
        <p>so the effective information set of many agents is heavily mediated by \(c\).</p>
        <p>In a balanced lattice or expanding network, each agent observes several peers and information flows from many independent parts of the society. Then no single early mistake can dominate indefinitely.</p>
        <div class="math">
          \[
            \text{many independent paths}
            \quad\Rightarrow\quad
            \text{many independent signals}.
          \]
        </div>
        <p>The real-world lesson is simple: a discussion network that looks active may still be informationally fragile if everyone ultimately listens to the same few people.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper generalizes social-learning theory from sequential herding and complete-observation models to arbitrary network topologies with strategic agents. Its distinctive contribution is the link between graph geometry and equilibrium information aggregation.</p>
        <p><strong>Proof technique.</strong> The main technique is to combine Bayesian martingale-style belief convergence with graph-theoretic influence bounds. The proof must show that, in egalitarian networks, no agent's signal can remain socially pivotal enough to prevent dispersed information from accumulating.</p>
        <p><strong>Useful secondary technique.</strong> A useful modeling trick is to measure social influence geometrically rather than behaviorally. Instead of trying to solve every equilibrium explicitly, the paper uses topology to bound how much any local information source can matter in the long run.</p>
        <p><strong>Problem solved.</strong> The paper explains when local observation networks can substitute for centralized information aggregation, and when they cannot.</p>
        <p><strong>Open questions.</strong> Extensions include endogenous link formation, costly observation, heterogeneous signal quality, misinformation by central agents, and platform algorithms that change effective topology over time.</p>
        <p><strong>My comment.</strong> This is a foundational paper because it treats the network as an economic primitive. A new paper could combine egalitarianism with rational inattention: agents choose which neighbors to pay attention to, and the resulting endogenous topology determines whether society learns.</p>
      `,
    },
  },
  {
    id: "molavi-tahbaz-salehi-jadbabaie-2018",
    title: "A Theory of Non-Bayesian Social Learning",
    authors: "Pooya Molavi; Alireza Tahbaz-Salehi; Ali Jadbabaie",
    journal: "Econometrica",
    year: 2018,
    doi: "10.3982/ecta14613",
    status: "Digested",
    tags: ["social-learning", "behavioral-learning"],
    takeaway: "Canonical model of non-Bayesian updating in social networks.",
    digest: {
      short: "Molavi, Tahbaz-Salehi, and Jadbabaie build a theory of non-Bayesian social learning in networks. Agents combine private observations with neighbors' beliefs using a tractable updating rule that is not fully Bayesian but has a clear behavioral interpretation. Long-run beliefs concentrate on the models that minimize a network-weighted discrepancy from the truth; hence both information quality and network centrality determine what society learns.",
      motivation: `
        <p><strong>Motivation.</strong> Fully Bayesian learning in networks quickly becomes cognitively impossible because each person must infer what everyone else inferred from everyone else. Real people use simpler rules: they listen to neighbors, average opinions, and update from new evidence without reconstructing the full social history.</p>
        <p><strong>Reality example.</strong> Doctors in a hospital update beliefs about a treatment from their own patients and from colleagues' opinions. A senior doctor with many connections may disproportionately shape the hospital's long-run belief, even if the objective evidence is spread across many doctors.</p>
        <p><strong>Implication.</strong> The model shows how society can converge to a belief that reflects both statistical fit and social influence. Network centrality becomes part of epistemology.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Agents face an unknown state and repeatedly observe private signals. They also observe or communicate beliefs with neighbors. Instead of full Bayesian updating over the whole network history, they update beliefs by combining their Bayesian private likelihood update with a weighted aggregation of neighbors' beliefs.</p>
        <p><strong>Main point.</strong> The long-run belief is characterized by a network-weighted minimization of Kullback-Leibler divergence. The most central agents' signal models receive more weight, so social influence changes which state or model society ultimately selects.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>There is a finite set of possible states or hypotheses</p>
        <div class="math">
          \[
            \Theta=\{\theta_1,\ldots,\theta_K\}.
          \]
        </div>
        <p>The true data-generating process is indexed by \(\theta^*\), or more generally may lie outside agents' subjective model. Agent \(i\) observes a private signal \(s_{i,t}\) over time with likelihood \(\ell_i(s\mid\theta)\) under hypothesis \(\theta\).</p>
        <p>Agents communicate on a directed network with weight matrix \(A=(a_{ij})\), where</p>
        <div class="math">
          \[
            a_{ij}\ge 0,\qquad
            \sum_j a_{ij}=1.
          \]
        </div>
        <p>Let \(\mu_{i,t}(\theta)\) be agent \(i\)'s belief at time \(t\). A canonical non-Bayesian update has log-linear form:</p>
        <div class="math">
          \[
            \mu_{i,t+1}(\theta)
            =
            \frac{
              \ell_i(s_{i,t+1}\mid\theta)
              \prod_j \mu_{j,t}(\theta)^{a_{ij}}
            }{
              \sum_{\theta'\in\Theta}
              \ell_i(s_{i,t+1}\mid\theta')
              \prod_j \mu_{j,t}(\theta')^{a_{ij}}
            }.
          \]
        </div>
        <p>The log-belief ratio between \(\theta\) and \(\theta'\) evolves as a weighted average of neighbors' log-belief ratios plus a private log-likelihood ratio:</p>
        <div class="math">
          \[
            \log\frac{\mu_{i,t+1}(\theta)}{\mu_{i,t+1}(\theta')}
            =
            \sum_j a_{ij}
            \log\frac{\mu_{j,t}(\theta)}{\mu_{j,t}(\theta')}
            +
            \log\frac{\ell_i(s_{i,t+1}\mid\theta)}
            {\ell_i(s_{i,t+1}\mid\theta')}.
          \]
        </div>
        <h3>2. Network Centrality</h3>
        <p>If the network is strongly connected, the left eigenvector \(\pi\) of \(A\) captures social influence:</p>
        <div class="math">
          \[
            \pi^\top A=\pi^\top,\qquad
            \sum_i\pi_i=1.
          \]
        </div>
        <p>In the long run, the society's ranking of hypotheses is driven by the network-weighted expected log likelihood:</p>
        <div class="math">
          \[
            \sum_i \pi_i
            \mathbb{E}_{\theta^*}
            \left[\log \ell_i(s_i\mid\theta)\right].
          \]
        </div>
        <p>Equivalently, society selects hypotheses that minimize weighted KL divergence from the true signal distributions:</p>
        <div class="math">
          \[
            \Theta^{\dagger}
            =
            \arg\min_{\theta\in\Theta}
            \sum_i \pi_i
            D_{\mathrm{KL}}
            \left(
              p_i^*
              \,\middle\|\,
              \ell_i(\cdot\mid\theta)
            \right).
          \]
        </div>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Network-Weighted Learning</h3>
          <p>Under the non-Bayesian log-linear updating rule, beliefs concentrate on the hypotheses that best fit the true signal process according to network-weighted KL divergence. More central agents receive greater asymptotic weight.</p>
          <div class="math">
            \[
              \mu_{i,t}(\Theta^{\dagger})\to 1
              \quad\text{for all }i.
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Two Doctors Example</h3>
        <p>Two doctors learn whether a treatment works. Doctor 1 sees many patients and has precise signals. Doctor 2 sees fewer patients but is very influential in the hospital network. Suppose the influence vector is</p>
        <div class="math">
          \[
            \pi_1=0.3,\qquad \pi_2=0.7.
          \]
        </div>
        <p>The long-run social belief compares hypotheses using</p>
        <div class="math">
          \[
            0.3\,D_{\mathrm{KL}}(p_1^*\|\ell_1(\cdot\mid\theta))
            +
            0.7\,D_{\mathrm{KL}}(p_2^*\|\ell_2(\cdot\mid\theta)).
          \]
        </div>
        <p>Even if doctor 1 has better evidence, doctor 2's centrality can dominate the social conclusion. This is not because doctor 2 lies; it is because the updating process gives doctor 2 more repeated weight.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper gives a canonical foundation for non-Bayesian social learning in networks. It connects DeGroot averaging, Bayesian likelihood updating, misspecified learning, and network centrality in one tractable framework.</p>
        <p><strong>Proof technique.</strong> The main proof technique is to transform beliefs into log-belief ratios. The update then becomes a linear stochastic recursion plus likelihood shocks. Products of stochastic matrices and Perron-Frobenius theory identify the centrality vector that weights long-run learning.</p>
        <p><strong>Useful secondary technique.</strong> The KL-minimization characterization is very portable. It lets one handle misspecification: when the true model is outside the subjective state space, beliefs converge to the pseudo-true hypothesis that minimizes weighted KL divergence.</p>
        <p><strong>Problem solved.</strong> The paper solves the tractability problem of social learning with boundedly rational agents. It gives sharp long-run predictions without requiring agents to do impossible Bayesian inference over the whole network history.</p>
        <p><strong>Open questions.</strong> Extensions include endogenous network weights, rational inattention to neighbors, strategic communication, time-varying influence, and welfare design when central agents have poor signal models.</p>
        <p><strong>My comment.</strong> This is one of the cleanest bridges between network theory and learning theory. A new paper could endogenize \(\pi\): agents choose whom to listen to based on perceived expertise, but perceived expertise is itself learned from the biased social process.</p>
      `,
    },
  },
  {
    id: "rosenberg-vieille-2019",
    title: "On the Efficiency of Social Learning",
    authors: "Dinah Rosenberg; Nicolas Vieille",
    journal: "Econometrica",
    year: 2019,
    doi: "10.3982/ecta15845",
    status: "Digested",
    tags: ["social-learning", "aggregation"],
    takeaway: "Studies whether social learning aggregates information efficiently.",
    digest: {
      short: "Rosenberg and Vieille ask whether decentralized social learning is efficient. The central issue is the difference between eventual correctness and efficient use of information. A society may learn eventually, yet waste many observations, stop experimenting too early, or let early actions distort later learning. The paper studies conditions under which social learning aggregates information as well as an appropriate benchmark, and when inefficiencies remain.",
      motivation: `
        <p><strong>Motivation.</strong> Social learning is attractive because each person's action can reveal private information to others. But decentralized learning may be slow or distorted. If people copy too quickly, society saves individual effort but loses experimentation.</p>
        <p><strong>Reality example.</strong> In a market for a new technology, early adopters reveal useful information. But if too many later consumers imitate early buyers instead of trying alternatives, society may converge on a mediocre product and learn little about the better one.</p>
        <p><strong>Implication.</strong> The paper helps separate two questions: does society eventually become correct, and does it use information efficiently along the way?</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Social learning can be evaluated not only by long-run convergence but also by efficiency. The benchmark is a planner or centralized statistician who can use private signals and observed actions optimally. The decentralized process may fail to attain that benchmark because agents internalize private payoffs, not the informational value of their actions.</p>
        <p><strong>Main point.</strong> The paper studies the welfare and informational efficiency of social learning. It identifies how observation structures, action informativeness, and incentives determine whether decentralized learning aggregates information efficiently.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>There is an unknown state \(\theta\) and a sequence or population of agents. Each agent \(i\) receives private information \(s_i\) and observes some social history \(H_i\), typically past actions or reports. Agent \(i\) chooses an action \(a_i\) and receives payoff</p>
        <div class="math">
          \[
            u(a_i,\theta).
          \]
        </div>
        <p>The agent's private decision rule is</p>
        <div class="math">
          \[
            a_i
            \in
            \arg\max_{a}
            \mathbb{E}[u(a,\theta)\mid s_i,H_i].
          \]
        </div>
        <p>A social planner who values total welfare or information aggregation would also account for the effect of \(a_i\) on later agents' information. Thus the private objective omits an informational externality:</p>
        <div class="math">
          \[
            \text{private value}
            =
            \mathbb{E}[u(a_i,\theta)\mid s_i,H_i],
          \]
        </div>
        <div class="math">
          \[
            \text{social value}
            =
            \text{private value}
            +
            \text{value of information revealed to future agents}.
          \]
        </div>
        <h3>2. Efficiency Benchmark</h3>
        <p>Let \(V^{\mathrm{soc}}\) denote the welfare generated by the decentralized social-learning process, and let \(V^{\mathrm{eff}}\) denote the value under an efficient benchmark that uses the same primitive information. Efficiency asks whether</p>
        <div class="math">
          \[
            V^{\mathrm{soc}}=V^{\mathrm{eff}}
            \quad\text{or at least}\quad
            V^{\mathrm{eff}}-V^{\mathrm{soc}}\to 0.
          \]
        </div>
        <p>The informational version asks whether the posterior beliefs induced by decentralized actions become as informative as the posterior that would be induced by all private signals:</p>
        <div class="math">
          \[
            \Pr(\theta\mid H_i)
            \approx
            \Pr(\theta\mid s_1,\ldots,s_i).
          \]
        </div>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Efficiency Of Social Learning</h3>
          <p>The paper characterizes when decentralized social learning uses dispersed information efficiently and when it does not. Inefficiency arises because agents choose actions for their own decision value and may not reveal socially valuable information to later agents.</p>
          <div class="math">
            \[
              a_i^{\mathrm{private}}
              \in
              \arg\max_a \mathbb{E}[u(a,\theta)\mid s_i,H_i]
              \quad\not\Rightarrow\quad
              a_i^{\mathrm{private}}
              =
              a_i^{\mathrm{efficient}}.
            \]
          </div>
        </div>
        <p>The paper is therefore about the wedge between individual optimality and informational social optimality.</p>
      `,
      example: String.raw`
        <h3>Restaurant Experimentation Example</h3>
        <p>Two restaurants may be good or bad. Early customers observe private reviews. If each customer only cares about dinner tonight, she chooses the restaurant with the higher posterior mean:</p>
        <div class="math">
          \[
            a_i=\arg\max_{a\in\{A,B\}}\mathbb{E}[\theta_a\mid s_i,H_i].
          \]
        </div>
        <p>A planner may sometimes want a customer to try the less popular restaurant because the information helps many future customers:</p>
        <div class="math">
          \[
            a_i^{\mathrm{planner}}
            =
            \arg\max_a
            \left\{
              \mathbb{E}[\theta_a\mid s_i,H_i]
              +
              \text{future information value of }a
            \right\}.
          \]
        </div>
        <p>If nobody internalizes the future information value, society may learn too little about restaurant \(B\). The final consensus may be correct in easy cases, but inefficiently slow or wrong in hard cases.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes by evaluating social learning through efficiency, not only asymptotic correctness. It connects herding, experimentation, observational learning, and welfare analysis.</p>
        <p><strong>Proof technique.</strong> The key technique is to compare decentralized posterior/action processes with a benchmark that internalizes informational externalities. This often requires martingale arguments for beliefs and careful accounting of how much information is lost when actions coarsen private signals.</p>
        <p><strong>Useful secondary technique.</strong> A useful proof device is the value-of-information decomposition: split an action's payoff into current decision value and future informational value. This is portable to experimentation, recommendation, and platform-learning models.</p>
        <p><strong>Problem solved.</strong> The paper clarifies when social learning is merely correct and when it is efficient. This distinction matters because many models prove convergence but leave welfare losses unmeasured.</p>
        <p><strong>Open questions.</strong> Natural directions include optimal subsidies for experimentation, disclosure rules that preserve action informativeness, efficiency under misspecified social learning, and network design for welfare rather than convergence.</p>
        <p><strong>My comment.</strong> I like the paper because it asks the welfare question theorists often postpone. A new paper could combine this with behavioral naivete: when agents overinterpret others, the planner's problem is not just to create information but to prevent distorted information from becoming socially costly.</p>
      `,
    },
  },
  {
    id: "mossel-muellerfrank-sly-tamuz-2020",
    title: "Social Learning Equilibria",
    authors: "Elchanan Mossel; Manuel Mueller-Frank; Allan Sly; Omer Tamuz",
    journal: "Econometrica",
    year: 2020,
    doi: "10.3982/ecta16465",
    status: "Digested",
    tags: ["social-learning"],
    takeaway: "Equilibrium approach to social learning environments.",
    digest: {
      short: "Mossel, Mueller-Frank, Sly, and Tamuz introduce Social Learning Equilibria, a static concept that captures the asymptotic behavior of many dynamic social-learning games. Instead of solving every extensive-form observation process, the paper studies a limiting equilibrium object describing agents' actions, beliefs, and information. The main contribution is a general framework linking agreement, herding, and information aggregation.",
      motivation: `
        <p><strong>Motivation.</strong> Social learning models differ wildly in timing, networks, signals, actions, and observation rules. But many of them ask the same long-run question: do people agree, herd, and aggregate dispersed information? A general equilibrium object can reveal what these models have in common.</p>
        <p><strong>Reality example.</strong> In financial markets, political communities, and product-adoption networks, we often observe stable opinion patterns without seeing the entire path that produced them. A static long-run equilibrium concept helps analyze those stable patterns directly.</p>
        <p><strong>Implication.</strong> The paper gives a language for studying the endpoint of social learning without being trapped by the details of one particular dynamic protocol.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> A dynamic social-learning process generates long-run beliefs and actions. The paper abstracts from the extensive form and defines Social Learning Equilibrium as a static consistency condition among private signals, posterior beliefs, and actions.</p>
        <p><strong>Main point.</strong> The framework establishes general conditions under which social learning equilibria exhibit agreement, herding, and information aggregation. It shows that agreement and aggregation are closely connected but not identical.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>There is a state \(\theta\), a set of agents, private signals \(s_i\), and a common payoff function \(u(a,\theta)\). Each agent chooses an action \(a_i\) after learning from some social process. The full dynamic process may be complicated, but its limiting behavior can be summarized by an information variable \(H_i\) and a posterior belief</p>
        <div class="math">
          \[
            \mu_i(\cdot)
            =
            \Pr(\theta\in\cdot\mid s_i,H_i).
          \]
        </div>
        <p>Agent \(i\)'s action must be optimal given this posterior:</p>
        <div class="math">
          \[
            a_i
            \in
            \arg\max_{a}
            \mathbb{E}_{\mu_i}[u(a,\theta)].
          \]
        </div>
        <h3>2. Social Learning Equilibrium</h3>
        <p>A Social Learning Equilibrium is a distribution over states, private signals, beliefs, and actions such that beliefs are Bayesian given the equilibrium information and actions are optimal. In schematic form:</p>
        <div class="math">
          \[
            \text{signals}\to\text{beliefs}\to\text{actions},
            \qquad
            \mu_i=\Pr(\theta\mid\text{agent }i\text{'s information}).
          \]
        </div>
        <p>The concept is static but is designed to represent the asymptotic outcome of dynamic learning games.</p>
        <h3>3. Agreement, Herding, Aggregation</h3>
        <p>Agreement means agents' posteriors or actions coincide. Herding means actions stop depending on private signals. Information aggregation means the common behavior reflects the information in all private signals.</p>
        <div class="math">
          \[
            \text{agreement}
            \neq
            \text{aggregation}
          \]
        </div>
        <p>A society may agree on the wrong action, or agree because private information has been suppressed by social information.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Static Characterization Of Long-Run Social Learning</h3>
          <p>Social Learning Equilibria capture asymptotic equilibrium behavior across a broad class of social-learning models. The framework gives general conditions connecting agreement, herding, and information aggregation.</p>
          <div class="math">
            \[
              \text{dynamic equilibrium limit}
              \quad\leadsto\quad
              \text{Social Learning Equilibrium}.
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Long-Run Political Opinion Example</h3>
        <p>Many voters receive private signals about whether a policy is good. After years of discussion, each voter has a stable political action \(a_i\). We may not observe the entire communication history, but we can ask whether the final distribution of actions is consistent with Bayesian optimality given some social information.</p>
        <div class="math">
          \[
            a_i
            \in
            \arg\max_{a}
            \mathbb{E}[u(a,\theta)\mid s_i,H_i].
          \]
        </div>
        <p>If everyone chooses the same policy, that is agreement. But if the common action ignores strong private signals, it may be herding rather than aggregation.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper provides a unifying equilibrium concept for social learning. It connects sequential herding, network learning, agreement theorems, and information aggregation under one static asymptotic framework.</p>
        <p><strong>Proof technique.</strong> The main proof technique is an abstraction argument: take limits of dynamic equilibrium behavior and characterize the restrictions those limits must satisfy. This lets the authors prove general results without solving each dynamic game separately.</p>
        <p><strong>Useful secondary technique.</strong> The distinction between agreement, herding, and aggregation is a valuable conceptual tool. It helps diagnose whether a model's convergence result is actually informative or merely an agreement result.</p>
        <p><strong>Problem solved.</strong> The paper solves the fragmentation problem in social-learning theory by giving a common language for asymptotic outcomes.</p>
        <p><strong>Open questions.</strong> Extensions include behavioral Social Learning Equilibria, misspecified beliefs, endogenous observation networks, and welfare rankings of different equilibrium information structures.</p>
        <p><strong>My comment.</strong> The paper is useful because it turns many dynamic questions into static consistency questions. A new project could define a misspecified Social Learning Equilibrium where each agent's posterior is Bayesian within a subjective model, then ask when false agreement is robust.</p>
      `,
    },
  },
  {
    id: "board-meyertervehn-2021",
    title: "Learning Dynamics in Social Networks",
    authors: "Simon Board; Moritz Meyer-ter-Vehn",
    journal: "Econometrica",
    year: 2021,
    doi: "10.3982/ecta18659",
    status: "Digested",
    tags: ["social-learning", "networks"],
    takeaway: "Dynamic model of how beliefs evolve through social networks.",
    digest: {
      short: "Board and Meyer-ter-Vehn study learning dynamics in social networks. The paper focuses on how beliefs evolve when agents repeatedly exchange information locally. The economic message is that network structure and timing determine not only whether beliefs converge, but also how quickly and through which channels information spreads.",
      motivation: `
        <p><strong>Motivation.</strong> In real networks, learning is dynamic. People do not receive all social information at once; beliefs move gradually through conversations, meetings, reposts, citations, and repeated observation.</p>
        <p><strong>Reality example.</strong> A new scientific result spreads through a research community. A few specialists see the evidence first, then their colleagues update, then seminar audiences update, then the consensus reaches adjacent fields. The speed and accuracy of this process depend on the network.</p>
        <p><strong>Implication.</strong> The paper treats learning as a process, not only an endpoint. That matters for welfare, because slow learning can be costly even if eventual learning occurs.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Agents in a network update beliefs over time using their own information and information transmitted by neighbors. The paper studies the dynamics generated by this local interaction and characterizes convergence, speed, and the role of network structure.</p>
        <p><strong>Main point.</strong> Long-run beliefs and transition dynamics are shaped by the graph. Central agents, bottlenecks, and local clusters affect both what information is incorporated and how quickly it is incorporated.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>Let \(G\) be a social network with agents \(i=1,\ldots,n\). There is an unknown state \(\theta\). Agent \(i\) starts with private information \(s_i\) and an initial belief \(\mu_{i,0}\). Over time, agents observe messages, beliefs, or actions from neighbors \(N(i)\).</p>
        <div class="math">
          \[
            H_{i,t}
            =
            \left(
              s_i,\,
              \{m_{j,\tau}:j\in N(i),\ \tau &lt; t\}
            \right),
            \qquad
            \mu_{i,t}=\Pr(\theta\mid H_{i,t}).
          \]
        </div>
        <p>Depending on the exact communication protocol, messages may be posterior beliefs, actions, or coarse reports. The central object is the path</p>
        <div class="math">
          \[
            (\mu_{1,t},\ldots,\mu_{n,t})_{t\ge 0}.
          \]
        </div>
        <h3>2. Dynamic Learning</h3>
        <p>Learning dynamics ask whether beliefs converge and whether the limit uses all available information. Full-information learning would mean</p>
        <div class="math">
          \[
            \mu_{i,t}
            \to
            \Pr(\theta\mid s_1,\ldots,s_n)
            \quad\text{for every }i.
          \]
        </div>
        <p>In many network settings, the speed of convergence is governed by paths, bottlenecks, and repeated averaging. A generic linearized representation is</p>
        <div class="math">
          \[
            x_{t+1}=A x_t+\varepsilon_{t+1},
          \]
        </div>
        <p>where \(x_t\) is a vector of belief statistics and \(A\) captures network communication weights.</p>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Network Learning Dynamics</h3>
          <p>The paper characterizes how local communication rules and network structure determine the evolution and convergence of beliefs. The same aggregate information can produce very different learning paths depending on who observes whom and when.</p>
          <div class="math">
            \[
              G,\ \text{timing},\ \text{message space}
              \quad\Rightarrow\quad
              \{\mu_{i,t}\}_{i,t}.
            \]
          </div>
        </div>
        <p>The main conceptual result is that social learning should be evaluated dynamically: convergence, speed, and transient disagreement are all part of the theory.</p>
      `,
      example: String.raw`
        <h3>Bottleneck Network Example</h3>
        <p>Suppose two communities are connected by one bridge agent. Within each community, people communicate frequently. Across communities, information must pass through the bridge. If one side has strong evidence about the state, the other side learns only after the bridge receives and transmits that information.</p>
        <div class="math">
          \[
            \text{community A}
            \longleftrightarrow
            \text{bridge}
            \longleftrightarrow
            \text{community B}.
          \]
        </div>
        <p>Even if eventual learning is correct, beliefs can remain polarized for a long time because the network has a bottleneck. The model gives a way to study that delay formally.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to network learning by focusing on dynamics rather than only asymptotic correctness. It relates Bayesian learning, DeGroot-style updating, and graph-based diffusion of information.</p>
        <p><strong>Proof technique.</strong> The useful technique is to represent belief evolution through sufficient statistics that travel through the network. Once beliefs or log-likelihood ratios are represented as state variables, convergence can be studied using dynamic systems and network operators.</p>
        <p><strong>Useful secondary technique.</strong> A portable idea is bottleneck decomposition: identify cuts or agents through which information must pass, then bound learning speed by the rate at which those bottlenecks transmit information.</p>
        <p><strong>Problem solved.</strong> The paper addresses how social information actually moves over time, which is essential for applications where delay, disagreement, or transient polarization matters.</p>
        <p><strong>Open questions.</strong> Natural extensions include endogenous meeting rates, attention constraints over neighbors, strategic delay in communication, and platform algorithms that alter learning speed.</p>
        <p><strong>My comment.</strong> The dynamic focus is valuable. A new paper could combine this with costly attention: agents allocate attention to neighbors over time, creating endogenous bottlenecks and endogenous learning speed.</p>
      `,
    },
  },
  {
    id: "frick-iijima-ishii-2020",
    title: "Misinterpreting Others and the Fragility of Social Learning",
    authors: "Mira Frick; Ryota Iijima; Yuhta Ishii",
    journal: "Econometrica",
    year: 2020,
    doi: "10.3982/ecta16981",
    status: "Digested",
    tags: ["social-learning", "behavioral-learning"],
    takeaway: "Shows how small interpretive mistakes can disrupt social learning.",
    digest: {
      short: "Frick, Iijima, and Ishii study social learning when agents misinterpret how others map information into actions. The result is a fragility theorem: even small misspecifications about others' behavior can prevent correct learning. Social learning works only if actions are correctly decoded; when agents read the same action through the wrong model, observed behavior can become misleading.",
      motivation: `
        <p><strong>Motivation.</strong> Learning from others requires interpreting what their actions mean. If I see someone buy a stock, do I infer that she has good information, high risk tolerance, liquidity needs, or a behavioral bias? A small mistake in interpretation can change the informational content of the action.</p>
        <p><strong>Reality example.</strong> Suppose students observe classmates choosing a difficult course. Some classmates choose it because they know it is valuable; others choose it because they overestimate themselves. If observers ignore overconfidence, they infer too much positive information from enrollment.</p>
        <p><strong>Implication.</strong> The paper warns that social learning is model-dependent. The same action can teach different things under different theories of why people act.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Agents observe others' actions but have a possibly misspecified model of how those actions are generated. The action is a signal only after it is interpreted. If the interpretation rule is wrong, then social information can systematically mislead.</p>
        <p><strong>Main point.</strong> Social learning is fragile: small errors in beliefs about others' preferences, signal distributions, or decision rules can produce large failures of information aggregation.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>There is an unknown state \(\theta\), private signals \(s_i\), and actions \(a_i\). Agent \(i\) observes previous actions and forms beliefs about \(\theta\). A correct Bayesian learner uses the true likelihood of an observed action:</p>
        <div class="math">
          \[
            \Pr(a_j\mid \theta)
            =
            \int
            \mathbf{1}\{\sigma_j(s_j,H_j)=a_j\}
            f_{\theta}(ds_j).
          \]
        </div>
        <p>A misspecified learner uses a subjective likelihood</p>
        <div class="math">
          \[
            \widehat{\Pr}(a_j\mid\theta)
            \neq
            \Pr(a_j\mid\theta).
          \]
        </div>
        <p>The subjective posterior is therefore</p>
        <div class="math">
          \[
            \widehat{\mu}_i(\theta\mid H_i)
            \propto
            \mu_0(\theta)
            f_{\theta}(s_i)
            \prod_{j &lt; i}
            \widehat{\Pr}(a_j\mid\theta,H_j).
          \]
        </div>
        <h3>2. Fragility Mechanism</h3>
        <p>The problem is that actions are coarse. A small error in the model of action choice can flip the likelihood ranking of actions. If an action \(a\) is objectively more likely in state \(0\) but subjectively believed more likely in state \(1\), then each observation pushes beliefs in the wrong direction:</p>
        <div class="math">
          \[
            \frac{\Pr(a\mid 1)}{\Pr(a\mid 0)}<1
            \quad\text{but}\quad
            \frac{\widehat{\Pr}(a\mid 1)}{\widehat{\Pr}(a\mid 0)}>1.
          \]
        </div>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Fragility Of Social Learning</h3>
          <p>Correct social learning can fail under small misspecifications of how agents interpret others' actions. Because observed actions are endogenous and coarse, small subjective errors can accumulate and lead society away from the true state.</p>
          <div class="math">
            \[
              \widehat{\Pr}(a\mid\theta)
              \approx
              \Pr(a\mid\theta)
              \quad\text{pointwise}
              \not\Rightarrow
              \Pr(a_i=\theta)\to 1.
            \]
          </div>
        </div>
        <p>The result is not that agents ignore information. It is that they decode social information through a slightly wrong codebook.</p>
      `,
      example: String.raw`
        <h3>Restaurant Choice With Taste Differences Example</h3>
        <p>Alice chooses restaurant \(A\). Bob observes this and wants to learn which restaurant is better. If Bob thinks Alice has the same tastes as him, he interprets \(a_A\) as evidence that \(A\) is high quality.</p>
        <div class="math">
          \[
            \widehat{\Pr}(a_A\mid A\text{ good})
            >
            \widehat{\Pr}(a_A\mid B\text{ good}).
          \]
        </div>
        <p>But suppose Alice actually has a strong idiosyncratic taste for \(A\). Then her choice is less informative about quality:</p>
        <div class="math">
          \[
            \Pr(a_A\mid A\text{ good})
            \approx
            \Pr(a_A\mid B\text{ good}).
          \]
        </div>
        <p>Bob overlearns from Alice. If many people make the same interpretive mistake, the market may herd toward \(A\) for reasons unrelated to quality.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper brings misspecified learning into social-learning theory. It complements classical Bayesian herding by showing that the interpretation of actions is itself a fragile modeling assumption.</p>
        <p><strong>Proof technique.</strong> The main proof technique is likelihood-ratio comparison under true and subjective models. The authors show how small errors in action likelihoods can generate persistent or amplified errors in posterior odds.</p>
        <p><strong>Useful secondary technique.</strong> A useful reusable method is to analyze the action channel separately from the signal channel. Private signals may be correctly understood, while social actions are misread; this decomposition isolates the source of fragility.</p>
        <p><strong>Problem solved.</strong> The paper explains why social learning can fail even when agents are sophisticated and observe many actions: the actions must be interpreted correctly to be informative.</p>
        <p><strong>Open questions.</strong> Extensions include learning the interpretation model itself, heterogeneous misinterpretations, platform labels that reveal motives, and robust social learning rules that work under ambiguity about others' preferences.</p>
        <p><strong>My comment.</strong> This paper is conceptually sharp. A new paper could study robust observation design: what action spaces or disclosure formats make social learning less sensitive to small misspecifications about others?</p>
      `,
    },
  },
  {
    id: "levy-peski-vieille-2024",
    title: "Stationary Social Learning in a Changing Environment",
    authors: "Raphael Levy; Marcin Peski; Nicolas Vieille",
    journal: "Econometrica",
    year: 2024,
    doi: "10.3982/ecta20475",
    status: "Digested",
    tags: ["social-learning"],
    takeaway: "Social learning when the underlying environment changes over time.",
    digest: {
      short: "Levy, Peski, and Vieille study social learning when the state changes over time. In a changing world, society must balance social learning from past actions against responsiveness to fresh private signals. The key insight is that stronger social learning can create inertia: when everyone relies on past actions, actions become highly correlated and less informative about the current state.",
      motivation: `
        <p><strong>Motivation.</strong> Many environments are not fixed. Political conditions change, technologies improve, diseases mutate, and product quality changes. Learning from the past is useful, but old social information can become stale.</p>
        <p><strong>Reality example.</strong> A city keeps believing one neighborhood is unsafe because past residents avoided it. Conditions improve, but people still avoid it because others avoid it. The old consensus persists after the state changes.</p>
        <p><strong>Implication.</strong> More precise signals or larger social samples need not improve welfare if they make actions too correlated and society too inertial after changes.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> The state follows a persistent but changing process. Each generation or agent observes private information and past actions. Social information helps identify the current state, but it also creates consensus. When the state changes, consensus can delay adaptation.</p>
        <p><strong>Main point.</strong> The paper characterizes stationary social learning in a changing environment. Consensus often emerges when the state is persistent, but the consensus action is imperfectly correlated with the current state because of inertia.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>The state changes over time according to a Markov process:</p>
        <div class="math">
          \[
            \theta_t\in\{0,1\},\qquad
            \Pr(\theta_{t+1}=\theta_t)=\rho.
          \]
        </div>
        <p>Each agent at time \(t\) receives a private signal \(s_t\) about the current state and observes a sample of past actions. The agent chooses</p>
        <div class="math">
          \[
            a_t\in\{0,1\}
          \]
        </div>
        <p>with payoff \(\mathbf{1}\{a_t=\theta_t\}\).</p>
        <p>The social information is a finite or large sample of past actions:</p>
        <div class="math">
          \[
            H_t=\{a_{\tau}:\tau\in S_t,\ \tau &lt; t\}.
          \]
        </div>
        <p>The decision rule is Bayesian given the stationary environment:</p>
        <div class="math">
          \[
            a_t=1
            \quad\text{if}\quad
            \Pr(\theta_t=1\mid s_t,H_t)\ge \frac{1}{2}.
          \]
        </div>
        <h3>2. Inertia</h3>
        <p>If the state is highly persistent, past actions are informative. But when many past actions are themselves based on earlier social information, they become correlated. A large sample of past actions may contain less independent evidence than it appears to contain.</p>
        <div class="math">
          \[
            \text{many actions}
            \neq
            \text{many independent signals}.
          \]
        </div>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Stationary Social Learning With Changing State</h3>
          <p>When the state is persistent, a consensus action typically emerges, but the consensus does not perfectly track the current state. After state changes, society can remain inertial, and more precise private signals can sometimes lengthen inertia by making past actions more correlated.</p>
          <div class="math">
            \[
              \Pr(a_t=\theta_t)<1
              \quad\text{in stationary equilibrium,}
            \]
          </div>
          <p>even when agents observe many past actions.</p>
        </div>
      `,
      example: String.raw`
        <h3>Changing Product Quality Example</h3>
        <p>A software product was bad last year but has improved. Consumers observe reviews from past buyers and receive a private current signal. If old reviews dominate, consumers keep avoiding the product after quality improves.</p>
        <div class="math">
          \[
            \theta_t=1\ \text{means current quality is high}.
          \]
        </div>
        <p>When past buyers avoided the product, today's buyers infer low quality and also avoid it. Their avoidance becomes new social evidence for tomorrow's buyers. The market can remain stuck in a low-adoption consensus after the true state has changed.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper extends social learning from fixed states to changing environments. It connects herding, stationary equilibrium, Markov learning, and the value of fresh information.</p>
        <p><strong>Proof technique.</strong> The main technique is stationary equilibrium analysis. Instead of studying convergence to truth, the paper characterizes an invariant distribution over states, histories, and actions in a Markov environment.</p>
        <p><strong>Useful secondary technique.</strong> The correlation accounting in samples of past actions is especially useful. The paper shows that sample size is not the same as information size when actions are endogenously correlated by social learning.</p>
        <p><strong>Problem solved.</strong> The paper explains why societies can be simultaneously good at forming consensus and bad at adapting after the world changes.</p>
        <p><strong>Open questions.</strong> Extensions include optimal memory windows, platform review decay, agents who know that old actions are stale but are inattentive to dates, and endogenous experimentation to detect state changes.</p>
        <p><strong>My comment.</strong> This paper is very useful for modern information environments. A new paper could study optimal forgetting: how quickly should platforms downweight old actions or reviews to balance learning from history with responsiveness to change?</p>
      `,
    },
  },
  {
    id: "kartik-lee-liu-rappoport-2024",
    title: "Beyond Unbounded Beliefs: How Preferences and Information Interplay in Social Learning",
    authors: "Navin Kartik; SangMok Lee; Tianhao Liu; Daniel Rappoport",
    journal: "Econometrica",
    year: 2024,
    doi: "10.3982/ecta21470",
    status: "Digested",
    tags: ["social-learning", "information-acquisition"],
    takeaway: "Shows that multi-state social learning is governed by a joint preference-information condition, excludability, not by unbounded beliefs alone.",
    digest: {
      short: "The paper studies Bayesian observational learning with many states, many actions, and general observation networks. Its central point is that, once there are more than two states, learning depends on how preferences partition the state space and how signals distinguish those preference-relevant regions. The key concept is excludability: for every pair of actions, signals must be able to make an agent almost sure that one action is better than the other whenever that is true. Excludability is enough for adequate learning, and if it fails, learning fails for some choice set. For ordered states, single-crossing preferences plus directionally unbounded beliefs imply excludability. For multidimensional states, intermediate preferences plus subexponential location-shift information imply excludability.",
      motivation: `
        <p><strong>Motivation.</strong> People rarely need to learn the exact state of the world; they need to learn enough to choose the right action. A doctor may not need the exact disease subtype if the same treatment is optimal. A voter may not need the exact policy parameter if the same candidate is best across a range.</p>
        <p><strong>Reality example.</strong> Suppose consumers infer restaurant quality from others' choices. They may not learn the exact quality score, but they can still learn enough to reject the wrong restaurant. The paper explains why this weaker but economically relevant learning can succeed even when classic unbounded-belief conditions fail.</p>
      `,
      medium: String.raw`
        <p><strong>Big question.</strong> In standard herding models, society may stop learning because each agent's action is too coarse: after a history, even a strong private signal may not change the next action. The classic solution is <em>unbounded beliefs</em>: every state can be made arbitrarily likely by one private signal. This paper asks whether that condition is really the right one in multi-state environments.</p>
        <p><strong>Main answer.</strong> No. With more than two states, unbounded beliefs is often too strong and even incompatible with normal signals. What matters is not whether one agent can identify the true state, but whether one agent can rule out a currently wrong action. This is the paper's core conceptual move.</p>
        <p><strong>Core object.</strong> For actions \(a,a'\), define the preferred set
        \[
          \Omega_{a,a'}=\{\omega\in\Omega:u(a,\omega)>u(a',\omega)\}.
        \]
        Excludability requires \(\Omega_{a,a'}\) to be statistically distinguishable from \(\Omega_{a',a}\) for every pair of actions. If so, any wrong action can eventually be displaced by some private signal, so society cannot be permanently trapped in an informational cascade with inadequate knowledge.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>There is an unknown payoff-relevant state, a sequence of Bayesian agents, private signals, and an observation network. The version below is the canonical form used in the paper.</p>
        <div class="math">
          \[
            \Omega \text{ is a countable state space},\qquad
            A \text{ is a standard Borel action space},\qquad
            S \text{ is a signal space}.
          \]
        </div>
        <p>The state is drawn once from a common prior \(\mu_0\in\Delta(\Omega)\). Conditional on the true state \(\omega\), agent \(n\)'s signal \(s_n\in S\) is drawn independently from distribution \(F(\cdot\mid\omega)\), with density \(f(\cdot\mid\omega)>0\). The full-support condition means no single signal literally rules out a state.</p>
        <div class="math">
          \[
            \omega\sim\mu_0,\qquad
            s_n\mid\omega\sim F(\cdot\mid\omega),\qquad
            f(s\mid\omega)>0\quad\forall(s,\omega).
          \]
        </div>
        <p>Agent \(n\) observes her own signal and the actions of a random subset of predecessors. Let \(B_n\subseteq\{1,\ldots,n-1\}\) be her observational neighborhood. The realized neighborhood is private to agent \(n\), and the distribution \(Q_n\) over neighborhoods is common knowledge.</p>
        <div class="math">
          \[
            I_n=\left(s_n,B_n,(a_k)_{k\in B_n}\right),\qquad
            \sigma_n:I_n\to\Delta(A),\qquad
            a_n\sim\sigma_n(I_n).
          \]
        </div>
        <p>Preferences are common and payoff-relevant only through the agent's own action and the state:</p>
        <div class="math">
          \[
            u:A\times\Omega\to\mathbb{R},\qquad |u(a,\omega)|\le \bar u.
          \]
        </div>
        <p>The solution concept is Bayes-Nash equilibrium. Strategic interaction is limited: an agent's action affects later agents only through information transmission, not through payoff externalities.</p>

        <h3>2. Network Condition: Expanding Observations</h3>
        <p>The network must not keep infinitely many agents trapped observing only a fixed early set of predecessors. The paper assumes expanding observations:</p>
        <div class="math">
          \[
            \forall K\in\mathbb{N}:\quad
            \lim_{n\to\infty}Q_n\!\left(B_n\subseteq\{1,\ldots,K\}\right)=0.
          \]
        </div>
        <p>This includes the complete network, the immediate-predecessor network, and random-predecessor networks. If this fails, later agents may never receive information generated after the first \(K\) agents, so learning can fail for a purely network reason.</p>

        <h3>3. Adequate Learning</h3>
        <p>The paper does not require society to identify the exact state if exact identification is payoff-irrelevant. It uses the weaker and economically natural criterion of adequate learning.</p>
        <p>For any belief \(\mu\), define the value of full information:</p>
        <div class="math">
          \[
            u^*(\mu)
            :=
            \sum_{\omega\in\Omega}
            \max_{a\in A}u(a,\omega)\,\mu(\omega).
          \]
        </div>
        <p>If the state were revealed before acting, the agent would choose a state-optimal action \(a\in c(\omega)\), where</p>
        <div class="math">
          \[
            c(\mu):=\arg\max_{a\in A}\sum_{\omega\in\Omega}u(a,\omega)\mu(\omega),
            \qquad
            c(\omega):=c(\delta_\omega).
          \]
        </div>
        <p>Let \(u_n\) be agent \(n\)'s equilibrium payoff. Adequate learning means that every equilibrium eventually achieves the full-information payoff:</p>
        <div class="math">
          \[
            \mathbb{E}_{\sigma,\mu_0}[u_n]\longrightarrow u^*(\mu_0)
            \quad\text{for every prior }\mu_0\text{ and every equilibrium }\sigma.
          \]
        </div>
        <p>Interpretation: society need not learn \(\omega\) itself; it must learn enough to take actions that are optimal in the realized state.</p>

        <h3>4. Stationary Beliefs And Adequate Knowledge</h3>
        <p>Let \(\mu_s\) denote the posterior after seeing private signal \(s\) starting from belief \(\mu\).</p>
        <div class="theorem-box">
          <h3>Definition: Stationary Belief</h3>
          <p>A belief \(\mu\) is stationary if there exists an action \(a\in c(\mu)\) such that after almost every signal, the same action remains optimal:</p>
          <div class="math">
            \[
              \exists a\in c(\mu)
              \quad\text{s.t.}\quad
              a\in c(\mu_s)\quad\mu\text{-a.e. }s.
            \]
          </div>
          <p>Economically, \(\mu\) is a cascade belief: if society reaches this belief, a private signal does not change the action.</p>
        </div>
        <div class="theorem-box">
          <h3>Definition: Adequate Knowledge</h3>
          <p>A belief \(\mu\) has adequate knowledge if some action optimal under \(\mu\) is also state-optimal for every state in the support of \(\mu\):</p>
          <div class="math">
            \[
              \exists a\in c(\mu)
              \quad\text{s.t.}\quad
              a\in c(\omega)\quad\forall\omega\in\operatorname{Supp}(\mu).
            \]
          </div>
          <p>So adequate knowledge means that even if uncertainty remains, the remaining uncertainty is not payoff-relevant.</p>
        </div>
        <div class="theorem-box">
          <h3>Theorem 1: Dynamic Learning Reduces To A Static Belief Test</h3>
          <p>Under expanding observations, there is adequate learning if and only if every stationary belief has adequate knowledge.</p>
          <div class="math">
            \[
              \text{Adequate learning}
              \quad\Longleftrightarrow\quad
              \{\mu:\mu\text{ stationary}\}
              \subseteq
              \{\mu:\mu\text{ has adequate knowledge}\}.
            \]
          </div>
        </div>
        <p>This is the paper's methodological backbone. It turns a hard infinite-agent dynamic problem into a one-agent condition: if every possible cascade belief is already payoff-sufficient, then learning is adequate.</p>

        <h3>5. Distinguishability</h3>
        <p>The paper then gives a practical way to rule out bad stationary beliefs. For subsets \(\Omega'\) and \(\Omega''\), say that \(\Omega'\) is distinguishable from \(\Omega''\) if an agent can receive a signal that makes \(\Omega'\) almost certain relative to \(\Omega''\), whenever the prior gives \(\Omega'\) positive probability.</p>
        <div class="math">
          \[
            \Omega'\succsim_D\Omega''
            \quad\Longleftrightarrow\quad
            \forall\varepsilon>0,\;
            \forall\mu\in\Delta(\Omega'\cup\Omega'')\text{ with }\mu(\Omega')>0,
          \]
          \[
            \Pr_{\mu}\!\left(s:\mu_s(\Omega')>1-\varepsilon\right)>0.
          \]
        </div>
        <p>A useful likelihood-ratio sufficient condition is:</p>
        <div class="math">
          \[
            \forall\omega'\in\Omega',\;\forall\varepsilon>0,\;
            \exists S'\subseteq S\text{ with }F(S'\mid\omega')>0
          \]
          \[
            \text{s.t.}\quad
            \frac{f(s\mid\omega'')}{f(s\mid\omega')} &lt; \varepsilon
            \quad
            \forall s\in S',\;\forall\omega''\in\Omega''.
          \]
        </div>
        <p>The set of signals \(S'\) must distinguish \(\omega'\) from all states in \(\Omega''\) simultaneously.</p>

        <h3>6. Excludability</h3>
        <p>For any two actions, define the state set where one action is strictly better than another:</p>
        <div class="math">
          \[
            \Omega_{a,a'}
            :=
            \{\omega\in\Omega:u(a,\omega)>u(a',\omega)\}.
          \]
        </div>
        <div class="theorem-box">
          <h3>Definition: Excludability</h3>
          <p>Preferences and information jointly satisfy excludability if, for every action pair \(a,a'\), the states where \(a\) beats \(a'\) are distinguishable from the states where \(a'\) beats \(a\):</p>
          <div class="math">
            \[
              \forall a,a'\in A:\quad
              \Omega_{a,a'}\text{ is distinguishable from }\Omega_{a',a}.
            \]
          </div>
        </div>
        <p>This is the conceptual heart of the paper. Excludability does <em>not</em> require a signal that identifies the true state. It only requires a signal that can defeat any currently wrong action.</p>
        <div class="theorem-box">
          <h3>Theorem 2: Excludability Characterizes Learning Across Choice Sets</h3>
          <p>If excludability holds, then there is adequate learning for every choice set. If excludability fails and the state space is finite, then some choice set has inadequate learning.</p>
          <div class="math">
            \[
              \text{Excludability}
              \;\Longrightarrow\;
              \text{adequate learning for every choice set}.
            \]
          </div>
          <div class="math">
            \[
              \neg\text{Excludability}
              \;\Longrightarrow\;
              \exists\widetilde A\subseteq A
              \text{ such that adequate learning fails.}
            \]
          </div>
        </div>
        <p>The economic logic is: if \(\mu\) is a stationary belief without adequate knowledge, some action \(a\in c(\mu)\) is wrong in some state \(\omega^*\in\operatorname{Supp}(\mu)\). Excludability gives a signal that shifts posterior mass toward the set where the state-optimal action beats \(a\). Then \(a\) cannot remain optimal after all signals, contradicting stationarity.</p>

        <h3>7. Ordered States: SCD + DUB</h3>
        <p>Now suppose \(\Omega\subseteq\mathbb{R}\) is ordered. Preferences have single-crossing differences (SCD) if, for every pair of actions, the payoff difference crosses zero at most once as the state increases:</p>
        <div class="math">
          \[
            h_{a,a'}(\omega):=u(a,\omega)-u(a',\omega)
          \]
          \[
            h_{a,a'} \text{ is single crossing for every }a,a'.
          \]
        </div>
        <p>Directionally unbounded beliefs (DUB) says that every state can be distinguished from lower states and from higher states separately:</p>
        <div class="math">
          \[
            \forall\omega\in\Omega:\quad
            \{\omega\}\text{ is distinguishable from }\{\omega' &lt; \omega\},
          \]
          \[
            \{\omega\}\text{ is distinguishable from }\{\omega' &gt; \omega\}.
          \]
        </div>
        <p>DUB is weaker than unbounded beliefs because it does not require an intermediate state to be distinguishable from both sides at once.</p>
        <div class="theorem-box">
          <h3>Proposition 1: One-Dimensional Learning</h3>
          <p>If preferences have SCD and information has DUB, then adequate learning obtains. Conversely, if DUB fails and there are at least two actions, then there exist SCD preferences for which learning is inadequate.</p>
          <div class="math">
            \[
              \text{SCD}+\text{DUB}
              \;\Longrightarrow\;
              \text{Excludability}
              \;\Longrightarrow\;
              \text{Adequate learning}.
            \]
          </div>
        </div>
        <p>Why? Under SCD, for any two actions the preferred sets \(\Omega_{a,a'}\) and \(\Omega_{a',a}\) are ordered regions: one lies weakly above the other or vice versa. DUB says ordered regions can be separated by extreme directional signals. Therefore the preferred set of one action can be distinguished from the preferred set of the other.</p>

        <h3>8. Multidimensional States: Intermediate Preferences + Thin-Tailed Location Signals</h3>
        <p>Let \(A,\Omega\subseteq\mathbb{R}^d\). Preferences are intermediate if each nontrivial preferred set is a half-space:</p>
        <div class="math">
          \[
            \Omega_{a,a'}=\{\omega:h\cdot\omega>c\}
            \quad\text{for some }h\in\mathbb{R}^d,\;c\in\mathbb{R}.
          \]
        </div>
        <p>Weighted Euclidean loss is the leading example:</p>
        <div class="math">
          \[
            u(a,\omega)=-\ell\!\left((a-\omega)'W(a-\omega)\right),
            \qquad W\succ0,\quad \ell\text{ strictly increasing}.
          \]
        </div>
        <p>The information structure is location-shift if \(S=\mathbb{R}^d\) and</p>
        <div class="math">
          \[
            f(s\mid\omega)=g(s-\omega).
          \]
        </div>
        <p>It is subexponential if its tail decays faster than some exponential power \(p>1\):</p>
        <div class="math">
          \[
            \exists p>1,\;M>0
            \quad\text{s.t.}\quad
            g(s) &lt; \exp(-\|s\|^p)
            \quad\forall \|s\|>M.
          \]
        </div>
        <div class="theorem-box">
          <h3>Proposition 2: Multidimensional Learning</h3>
          <p>If preferences are intermediate and information is subexponential location-shift, then adequate learning obtains.</p>
          <div class="math">
            \[
              \text{Intermediate preferences}
              +\text{subexponential location-shift information}
              \;\Longrightarrow\;
              \text{Excludability}
              \;\Longrightarrow\;
              \text{Adequate learning}.
            \]
          </div>
        </div>
        <p>The key lemma is that under subexponential location-shift information, any half-space can be distinguished from its complement. Since intermediate preferences make all relevant preferred sets half-spaces, excludability follows.</p>
      `,
      example: String.raw`
        <h3>A Three-State Example With Normal Signals</h3>
        <p>Let the state be product quality or policy ideal point:</p>
        <div class="math">
          \[
            \Omega=\{1,2,3\},\qquad
            \mu_0(1)=\mu_0(2)=\mu_0(3)=\frac13.
          \]
        </div>
        <p>Each agent observes a private signal</p>
        <div class="math">
          \[
            s_n=\omega+\varepsilon_n,\qquad
            \varepsilon_n\sim N(0,\sigma^2),
          \]
          \[
            f(s\mid\omega)=\frac{1}{\sqrt{2\pi\sigma^2}}
            \exp\!\left(-\frac{(s-\omega)^2}{2\sigma^2}\right).
          \]
        </div>
        <p>With three states, normal signals fail unbounded beliefs for the middle state. To see this, compare the likelihood of state \(2\) to states \(1\) and \(3\):</p>
        <div class="math">
          \[
            \frac{f(s\mid 1)}{f(s\mid 2)}
            =
            \exp\!\left(\frac{(s-2)^2-(s-1)^2}{2\sigma^2}\right)
            =
            \exp\!\left(\frac{-2s+3}{2\sigma^2}\right),
          \]
          \[
            \frac{f(s\mid 3)}{f(s\mid 2)}
            =
            \exp\!\left(\frac{(s-2)^2-(s-3)^2}{2\sigma^2}\right)
            =
            \exp\!\left(\frac{2s-5}{2\sigma^2}\right).
          \]
        </div>
        <p>As \(s\to+\infty\), the first ratio goes to \(0\), so very high signals distinguish state \(2\) from state \(1\). But the second ratio goes to \(+\infty\), so those same high signals favor state \(3\) over state \(2\). As \(s\to-\infty\), the reverse happens. Hence no signal makes state \(2\) almost certain against both \(1\) and \(3\) simultaneously.</p>
        <div class="math">
          \[
            \text{State }2\text{ is not distinguishable from }\{1,3\}.
          \]
        </div>
        <p>This is exactly why unbounded beliefs fails.</p>

        <h3>Why Learning Can Still Work</h3>
        <p>Now use a payoff structure with single-crossing differences. For example, suppose there are two actions, \(L\) and \(H\), interpreted as a low or high action, and payoffs are</p>
        <div class="math">
          \[
            u(L,\omega)=-(1-\omega)^2,\qquad
            u(H,\omega)=-(3-\omega)^2.
          \]
        </div>
        <p>Then</p>
        <div class="math">
          \[
            u(H,\omega)-u(L,\omega)
            =
            -(3-\omega)^2+(1-\omega)^2
            =
            4\omega-8.
          \]
        </div>
        <p>So \(L\) is better for low states and \(H\) is better for high states:</p>
        <div class="math">
          \[
            \Omega_{H,L}=\{\omega:u(H,\omega)>u(L,\omega)\}=\{3\},
          \]
          \[
            \Omega_{L,H}=\{\omega:u(L,\omega)>u(H,\omega)\}=\{1\},
          \]
          \[
            \omega=2\text{ is an indifference/cutoff state in this simplified two-action version.}
          \]
        </div>
        <p>The preferred sets are ordered. Normal information can distinguish high states from lower states using high signals, and low states from higher states using low signals. Thus, even though the middle state cannot be identified with near certainty, the wrong directional action can be displaced.</p>

        <h3>Three Actions: Displacing Wrong Actions Without Immediately Choosing The Correct One</h3>
        <p>The paper emphasizes an even sharper point. Let \(A=\{1,2,3\}\) and use single-peaked or quadratic-loss preferences:</p>
        <div class="math">
          \[
            u(a,\omega)=-(a-\omega)^2.
          \]
        </div>
        <p>The correct action in state \(\omega\) is \(a=\omega\). Under normal information and three states, a single signal may be unable to make an agent choose the correct middle action \(a=2\) from some social beliefs. But if society is stuck choosing \(a=1\) when \(\omega=2\), a sufficiently high signal can make action \(1\) unattractive. If society is stuck choosing \(a=3\), a sufficiently low signal can make action \(3\) unattractive.</p>
        <div class="math">
          \[
            \text{Learning does not require}
            \quad
            s\Rightarrow a=\omega.
          \]
          \[
            \text{It requires}
            \quad
            s\Rightarrow a_{\text{wrong}}\notin c(\mu_s).
          \]
        </div>
        <p>That is the simplest way to remember the paper. In binary-state models, identifying the correct action and displacing the wrong action are basically the same. In multi-state models, they are different, and the second is the economically relevant one.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper generalizes the classic Banerjee and Bikhchandani-Hirshleifer-Welch observational-learning logic beyond binary states and complete observation. Smith-Sørensen and later Arieli-Mueller-Frank emphasize unbounded beliefs as the central anti-cascade condition. Kartik-Lee-Liu-Rappoport show that, with multiple states, unbounded beliefs is not the right primitive unless one wants learning for all possible preferences. For economically structured preferences, weaker information is enough.</p>
        <p><strong>What is new.</strong> The key new concept is excludability. It moves the focus from identifying the true state to excluding wrong actions. This is a genuine conceptual improvement: in multi-state environments, an agent may be unable to become almost certain of the correct state, but still able to receive a signal that makes a currently wrong action unattractive.</p>
        <p><strong>Proof technique.</strong> The proof uses a static reduction plus an improvement principle. The static reduction is Theorem 1: learning holds if and only if all stationary beliefs have adequate knowledge. The improvement principle establishes a lower welfare bound even when beliefs do not converge cleanly. Define</p>
        <div class="math">
          \[
            u(\mu)=\max_{a\in A}\sum_{\omega}u(a,\omega)\mu(\omega),
          \]
          \[
            I(\mu)=
            \sum_{\omega\in\Omega}\int_S u(\mu_s)\,dF(s\mid\omega)\mu(\omega)
            -u(\mu).
          \]
        </div>
        <p>Here \(I(\mu)\) is the value of one extra private signal at belief \(\mu\). Stationary beliefs are exactly those with zero signal-improvement. Let \(\Phi^{BP}\) be the set of Bayes-plausible distributions of beliefs and let \(\Phi^S\subseteq\Phi^{BP}\) be distributions supported on stationary beliefs:</p>
        <div class="math">
          \[
            \Phi^{BP}:=\{\phi\in\Delta\Delta\Omega:\mathbb{E}_{\phi}[\mu]=\mu_0\},
            \qquad
            \Phi^S:=\{\phi\in\Phi^{BP}:I(\phi)=0\}.
          \]
        </div>
        <p>The cascade utility is</p>
        <div class="math">
          \[
            u^c(\mu_0):=\inf_{\phi\in\Phi^S}\mathbb{E}_{\phi}[u(\mu)].
          \]
        </div>
        <p>Theorem 3 says that every equilibrium eventually gives agents at least this cascade utility:</p>
        <div class="math">
          \[
            \liminf_{n\to\infty}\mathbb{E}_{\sigma,\mu_0}[u_n]\ge u^c(\mu_0).
          \]
        </div>
        <p>The technical novelty is the compactness-continuity machinery behind this welfare bound. The paper uses compactness of Bayes-plausible belief distributions under the Prohorov metric, continuity of \(u(\phi)\) and \(I(\phi)\), and the expanding-observations network condition to get a uniform improvement argument. This replaces martingale convergence, which works cleanly in complete networks but not in general observational networks.</p>
        <p><strong>Useful reusable trick.</strong> When a dynamic learning problem is hard, define the set of beliefs at which private information has zero value. Then prove that the long-run welfare is bounded below by the worst Bayes-plausible distribution over that set. This can convert a dynamic network problem into a static geometry-of-beliefs problem.</p>
        <p><strong>Problem solved.</strong> The paper solves a conceptual gap in social learning: why normal information can still support learning with three or more states, even though it fails unbounded beliefs. The answer is that normal signals can directionally rule out lower or higher regions, and under single-crossing or intermediate preferences that is exactly what is needed to displace wrong actions.</p>
        <p><strong>Open questions.</strong> First, speed is open: adequate learning is asymptotic, but how fast does welfare approach \(u^*(\mu_0)\) under DUB or subexponential information? Second, robustness to misspecification is open: if agents misread others' actions or have wrong signal models, does approximate excludability still imply approximate learning? Third, endogenous information acquisition is open: what if agents can pay to choose signal precision before acting? Fourth, platform design is open: can a recommender or institution choose what actions are visible so that excludability is restored?</p>
        <p><strong>My comment.</strong> I like this paper because it identifies the right economic object. In binary models, "find the truth" and "reject the wrong action" are almost the same. In multi-state models they separate, and this separation creates room for a much richer theory. A promising new paper could study <em>endogenous excludability</em>: agents or platforms choose signal structures, action categories, or observation networks, and the designer's goal is to make every wrong action excludable at minimal information cost.</p>
      `,
    },
  },
  {
    id: "che-horner-2017",
    title: "Recommender Systems as Mechanisms for Social Learning",
    authors: "Yeon-Koo Che; Johannes Horner",
    journal: "The Quarterly Journal of Economics",
    year: 2017,
    doi: "10.1093/qje/qjx044",
    status: "Digested",
    tags: ["social-learning", "information-design"],
    takeaway: "A platform/recommender-system interpretation of social learning.",
    digest: {
      short: "Che and Horner model a recommender system as a mechanism for social learning. The platform wants users to explore a product so that society learns its quality, but each user privately prefers recommendations that maximize her own current payoff. The optimal recommender may deliberately overrecommend, or spam, the product to some users in order to create exploration incentives. The paper is a central bridge between social learning and platform information design.",
      motivation: `
        <p><strong>Motivation.</strong> Online platforms do not merely report information; they shape what users try. A music app, shopping site, job platform, or streaming service learns product quality from user feedback, but feedback only arrives if users experiment.</p>
        <p><strong>Reality example.</strong> A platform launches a new movie. If it only recommends the movie when it is already confident, few people try it and the platform learns slowly. If it recommends it too often, users receive bad recommendations. The platform faces an exploration-versus-exploitation problem mediated through recommendations.</p>
        <p><strong>Implication.</strong> Some recommendation inflation can be optimal. What looks like platform bias may be a mechanism to generate socially valuable experimentation.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Users choose whether to try a product. The platform observes information about quality from previous users and sends recommendations to later users. Because trying the product produces information for the future, the platform may recommend the product even when current information is not strong enough to make the recommendation myopically optimal.</p>
        <p><strong>Main point.</strong> The optimal recommendation policy trades off transparency against exploration. It selectively overrecommends the product to induce experimentation, but stops doing so when the product looks sufficiently bad.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>A product has unknown quality</p>
        <div class="math">
          \[
            \theta\in\{G,B\}.
          \]
        </div>
        <p>Users arrive over time. A user can try the product or choose an outside option. Trying yields payoff depending on quality and generates feedback observed by the recommender. Let \(p_t=\Pr(\theta=G\mid H_t)\) be the platform's posterior after history \(H_t\).</p>
        <p>If the platform were purely transparent, it would recommend the product only when current expected user value exceeds the outside option:</p>
        <div class="math">
          \[
            p_t u_G+(1-p_t)u_B
            \ge
            u_0.
          \]
        </div>
        <p>But the platform values future learning. Recommendation \(r_t\in\{0,1\}\) affects whether the user experiments, and experiment outcomes update \(p_{t+1}\).</p>
        <h3>2. Incentive Constraint</h3>
        <p>The recommendation must persuade the user to follow it. If a user receives a recommendation to try, obedience requires</p>
        <div class="math">
          \[
            \mathbb{E}[u(\text{try},\theta)\mid r_t=1]\ge u_0.
          \]
        </div>
        <p>The platform can pool states or histories in its recommendation policy. Overrecommendation means sending \(r_t=1\) in some histories where full transparency would not recommend trying.</p>
        <h3>3. Dynamic Design Problem</h3>
        <p>The platform's value function has the form</p>
        <div class="math">
          \[
            V(p)
            =
            \max_{\sigma}
            \left\{
              \text{current user surplus}
              +
              \delta
              \mathbb{E}[V(p')\mid p,\sigma]
            \right\}
          \]
        </div>
        <p>subject to users' obedience constraints. The control \(\sigma\) is a recommendation policy that maps posterior histories into messages.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Optimal Recommender As Exploration Mechanism</h3>
          <p>The optimal recommender selectively overrecommends the product to induce exploration. It spams little immediately after release, increases overrecommendation over part of the learning path, and stops recommending once beliefs become sufficiently pessimistic.</p>
          <div class="math">
            \[
              \text{recommendation}
              =
              \text{information disclosure}
              +
              \text{experimentation incentive}.
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>New Restaurant On An App Example</h3>
        <p>A food app does not know if a new restaurant is good. If it recommends only well-established restaurants, it never learns. So it sometimes recommends the new restaurant to users whose outside option is not too valuable.</p>
        <div class="math">
          \[
            \Pr(r=\text{try}\mid p)
            >
            \mathbf{1}\{p u_G+(1-p)u_B\ge u_0\}.
          \]
        </div>
        <p>If early reviews are terrible, the app stops recommending. If reviews are mixed but still informative, the app keeps some experimentation alive. This maps directly to review inflation and platform exploration.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper connects social learning, experimentation, and Bayesian persuasion. It treats the recommender as a mechanism designer who controls information disclosure to generate exploration.</p>
        <p><strong>Proof technique.</strong> The main technique is dynamic mechanism design with obedience constraints. The platform's posterior is the state variable, and recommendations are designed to balance current persuasion against future information value.</p>
        <p><strong>Useful secondary technique.</strong> The paper's overrecommendation logic is reusable: an information designer can create exploration by pooling weak states with stronger states, as long as the recommendation remains obedient on average.</p>
        <p><strong>Problem solved.</strong> The paper explains why platforms may rationally distort recommendations upward for new products, and when such distortion improves social learning.</p>
        <p><strong>Open questions.</strong> Extensions include competition among recommenders, user suspicion about spam, heterogeneous users, strategic sellers, and regulatory rules requiring disclosure of exploration recommendations.</p>
        <p><strong>My comment.</strong> This is one of the most useful platform-learning papers. A new paper could study transparent exploration labels, asking when saying "recommended for learning" preserves enough obedience while reducing perceived manipulation.</p>
      `,
    },
  },
  {
    id: "liang-mu-2019",
    title: "Complementary Information and Learning Traps",
    authors: "Annie Liang; Xiaosheng Mu",
    journal: "The Quarterly Journal of Economics",
    year: 2019,
    doi: "10.1093/qje/qjz033",
    status: "Digested",
    tags: ["social-learning", "information-acquisition"],
    takeaway: "Learning traps arise when pieces of information are complementary.",
    digest: {
      short: "Liang and Mu study learning when information sources are complementary. A single piece of evidence may be useless unless combined with another, so agents who acquire information myopically can get trapped: they stop learning because no single additional source looks valuable, even though a bundle of sources would be very valuable. The paper is especially useful for thinking about research, experimentation, and search problems where insights require combinations.",
      motivation: `
        <p><strong>Motivation.</strong> Many important discoveries require multiple pieces of information. One medical test, one dataset, one interview, or one experiment may have little value alone, but a combination can reveal the truth.</p>
        <p><strong>Reality example.</strong> A researcher needs both a new dataset and a theoretical identification argument. Either one alone is not publishable, so a myopic researcher may acquire neither. A patient needs two complementary tests; if the first test alone is uninformative, the doctor may stop too early.</p>
        <p><strong>Implication.</strong> The model explains learning traps: agents can rationally stop at a locally optimal information set that is globally poor.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Information acquisition is not always separable. The value of one signal can depend on which other signals the agent already has. Complementarity breaks the logic that greedy learning will eventually find the right information.</p>
        <p><strong>Main point.</strong> When signals are complementary, agents may become stuck in learning traps. They do not acquire a signal because it has low marginal value today, even though acquiring several signals together would unlock high value.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>There is an unknown state \(\theta\). An agent can acquire signals from a collection \(M=\{1,\ldots,m\}\). If she acquires subset \(S\subseteq M\), she observes \(x_S=\{x_j:j\in S\}\) and chooses an action \(a\) with payoff \(u(a,\theta)\).</p>
        <p>The value of information set \(S\) is</p>
        <div class="math">
          \[
            V(S)
            =
            \mathbb{E}
            \left[
              \max_a
              \mathbb{E}[u(a,\theta)\mid x_S]
            \right]
            -
            c(S).
          \]
        </div>
        <p>Signals are complementary when the marginal value of signal \(j\) is higher after acquiring other signals:</p>
        <div class="math">
          \[
            V(S\cup\{j\})-V(S)
            <
            V(T\cup\{j\})-V(T)
            \quad\text{for }S\subset T.
          \]
        </div>
        <h3>2. Learning Trap</h3>
        <p>A learning trap is an information set \(S\) such that no single additional signal is worth acquiring, even though a larger bundle is valuable:</p>
        <div class="math">
          \[
            V(S\cup\{j\})\le V(S)
            \quad\text{for every }j\notin S,
          \]
        </div>
        <div class="math">
          \[
            \text{but there exists }T\supset S
            \text{ with }
            V(T)>V(S).
          \]
        </div>
        <p>The agent is locally optimal but globally underinformed.</p>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Complementarity Creates Learning Traps</h3>
          <p>When information sources are complementary, individually rational sequential acquisition can stop too early. The agent may reject every single next signal even though acquiring a group of signals would improve decisions.</p>
          <div class="math">
            \[
              \text{local no-acquisition}
              \not\Rightarrow
              \text{global optimal information}.
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Two-Test Diagnosis Example</h3>
        <p>A disease is present only if two markers are both abnormal. Test 1 reveals marker 1, and test 2 reveals marker 2. Either test alone barely changes treatment because one abnormal marker is not enough. Together they are decisive.</p>
        <div class="math">
          \[
            V(\{1\})-V(\varnothing) &lt; c,\qquad
            V(\{2\})-V(\varnothing) &lt; c,
          \]
        </div>
        <p>but</p>
        <div class="math">
          \[
            V(\{1,2\})-V(\varnothing) &gt; 2c.
          \]
        </div>
        <p>A myopic doctor buys neither test, even though buying both would be optimal. This is the learning trap.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to information acquisition by emphasizing complementarity rather than separability or substitutability. It is related to rational inattention, experimentation, search, and organizational learning.</p>
        <p><strong>Proof technique.</strong> The key technique is set-function analysis of information value. By studying marginal values over subsets of signals, the paper can distinguish local optimality from global optimality.</p>
        <p><strong>Useful secondary technique.</strong> The learning-trap definition is very reusable: find a set where all one-step deviations are unattractive, then exhibit a profitable multi-step deviation. This is useful in models of research, career investment, and experimentation.</p>
        <p><strong>Problem solved.</strong> The paper explains why agents may fail to acquire information even when the missing information is objectively valuable: the value is locked behind complementary acquisition.</p>
        <p><strong>Open questions.</strong> Extensions include social learning with complementary signals across agents, institutions that subsidize bundles, dynamic teams, and platforms that recommend information packages rather than individual signals.</p>
        <p><strong>My comment.</strong> This paper is very fertile. A new theory paper could study academic research as complementary information acquisition: researchers underinvest in projects requiring several costly ingredients unless grants or collaborations bundle them.</p>
      `,
    },
  },
  {
    id: "bowen-dmitriev-galperti-2023",
    title: "Learning from Shared News: When Abundant Information Leads to Belief Polarization",
    authors: "T. Renee Bowen; Danil Dmitriev; Simone Galperti",
    journal: "The Quarterly Journal of Economics",
    year: 2023,
    doi: "10.1093/qje/qjac045",
    status: "Digested",
    tags: ["social-learning", "behavioral-learning"],
    takeaway: "Explains how shared information can generate polarization rather than agreement.",
    digest: {
      short: "Bowen, Dmitriev, and Galperti study how shared news can lead to belief polarization. The key idea is that common information need not create common interpretation. When agents have different prior models, preferences, or interpretations of the news-generating process, the same public signal can move beliefs in opposite directions. Abundant shared information can therefore intensify disagreement rather than eliminate it.",
      motivation: `
        <p><strong>Motivation.</strong> A common hope is that more public information reduces polarization. But in politics, macroeconomics, public health, and finance, people often consume the same news and become more divided.</p>
        <p><strong>Reality example.</strong> Two voters watch the same unemployment report. One interprets job growth as evidence that the incumbent's policy works; the other interprets inflation pressure as evidence that the policy is dangerous. The same report strengthens both prior views.</p>
        <p><strong>Implication.</strong> The paper explains why shared news is not automatically a public-good solution to disagreement. Interpretation and model uncertainty matter.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Agents observe common news but may differ in how they map news into states or actions. Public signals can be multidimensional or ambiguous, so agents with different prior beliefs update in different directions.</p>
        <p><strong>Main point.</strong> Abundant shared information can generate polarization when the news is interpreted through different models. The mechanism is Bayesian or quasi-Bayesian updating from a common signal that has different likelihood implications for different agents.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>There is an unknown state \(\theta\). Agents \(i\) and \(j\) observe the same public news signal \(y\), but may have different priors or different subjective likelihoods.</p>
        <div class="math">
          \[
            \mu_i^0(\theta)\neq \mu_j^0(\theta)
            \quad\text{or}\quad
            f_i(y\mid\theta)\neq f_j(y\mid\theta).
          \]
        </div>
        <p>Agent \(i\)'s posterior is</p>
        <div class="math">
          \[
            \mu_i^1(\theta)
            =
            \frac{f_i(y\mid\theta)\mu_i^0(\theta)}
            {\sum_{\theta'}f_i(y\mid\theta')\mu_i^0(\theta')}.
          \]
        </div>
        <p>Polarization means posterior beliefs move farther apart after observing the same signal. For a scalar belief \(m_i=\mathbb{E}_i[\theta]\), this is</p>
        <div class="math">
          \[
            |m_i^1-m_j^1|>|m_i^0-m_j^0|.
          \]
        </div>
        <h3>2. Shared News, Different Interpretations</h3>
        <p>The same news can contain multiple components. Agents may disagree about which component is diagnostic or which model generated the news. Then the likelihood ratio induced by the public signal differs across agents:</p>
        <div class="math">
          \[
            \frac{f_i(y\mid\theta_H)}{f_i(y\mid\theta_L)}
            \neq
            \frac{f_j(y\mid\theta_H)}{f_j(y\mid\theta_L)}.
          \]
        </div>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Shared News Can Polarize</h3>
          <p>Public information does not necessarily reduce disagreement. When agents interpret shared news through different subjective models or priors, additional shared information can increase belief dispersion and generate polarization.</p>
          <div class="math">
            \[
              y\ \text{common to all}
              \quad\not\Rightarrow\quad
              \mu_i^1\approx\mu_j^1.
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Inflation News Example</h3>
        <p>Two economists observe the same inflation report. Economist A thinks inflation mainly reflects excess demand. Economist B thinks it reflects supply shocks. Let \(\theta\) be whether demand policy is too loose. The same inflation number \(y\) has different likelihood ratios:</p>
        <div class="math">
          \[
            LR_A(y)
            =
            \frac{f_A(y\mid\theta=1)}{f_A(y\mid\theta=0)}
            >
            1,
          \]
        </div>
        <div class="math">
          \[
            LR_B(y)
            =
            \frac{f_B(y\mid\theta=1)}{f_B(y\mid\theta=0)}
            \approx
            1.
          \]
        </div>
        <p>A becomes more convinced that policy is too loose. B does not. If B also interprets the report as evidence of supply disruption, their policy beliefs may move farther apart.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to belief polarization by showing how common information can polarize. It connects social learning, Bayesian disagreement, media economics, and models of heterogeneous interpretations.</p>
        <p><strong>Proof technique.</strong> The core technique is likelihood-ratio geometry. The proof studies how a common signal transforms a distribution of beliefs and identifies when posterior dispersion increases.</p>
        <p><strong>Useful secondary technique.</strong> A useful method is to separate commonness of the signal from commonness of the model. Agreement theorems rely on common priors and common interpretation; this paper exploits what happens when the second condition fails.</p>
        <p><strong>Problem solved.</strong> The paper explains why providing more shared news can fail to create consensus and may even amplify disagreement.</p>
        <p><strong>Open questions.</strong> Extensions include endogenous media choice, strategic framing, learning about the news model itself, and platform algorithms that choose between personalized and common news.</p>
        <p><strong>My comment.</strong> This is a very useful corrective to the simple "more information fixes polarization" view. A new paper could study interventions that reveal model diagnostics, not only facts, so agents learn how to interpret the same news.</p>
      `,
    },
  },
  {
    id: "lobel-sadler-2015",
    title: "Information Diffusion in Networks through Social Learning",
    authors: "Ilan Lobel; Evan Sadler",
    journal: "Theoretical Economics",
    year: 2015,
    doi: "10.3982/te1549",
    status: "Digested",
    tags: ["social-learning", "networks"],
    takeaway: "Network diffusion model for social learning.",
    digest: {
      short: "Lobel and Sadler study how information diffuses through networks via social learning. Agents observe local predecessors or neighbors and choose actions, so information spreads only through the network's observation structure. The paper identifies network conditions under which information aggregates and conditions under which local bottlenecks or influential agents prevent diffusion.",
      motivation: `
        <p><strong>Motivation.</strong> Information does not spread uniformly through society. It moves through families, villages, professional networks, and online links. The same private signals can aggregate well in one network and poorly in another.</p>
        <p><strong>Reality example.</strong> Farmers in different villages learn about a new crop from neighbors. If villages are connected by a few bridges, information may diffuse slowly or stop at local clusters. If observation expands over time, the innovation's true quality becomes widely known.</p>
        <p><strong>Implication.</strong> Network architecture determines whether local social learning becomes global information aggregation.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Each agent observes some previous agents in a network and chooses an action based on private and social information. Actions are informative but coarse, so diffusion depends on whether enough independent information reaches later agents.</p>
        <p><strong>Main point.</strong> The paper studies network conditions for successful information diffusion through social learning. Expanding observations help learning; narrow neighborhoods and bottlenecks can generate persistent errors.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>Agents act in a network. There is an unknown state \(\theta\), private signals \(s_i\), and actions \(a_i\). Agent \(i\) observes a neighborhood of previous actions \(N_i\):</p>
        <div class="math">
          \[
            H_i=(s_i,\{a_j:j\in N_i\}).
          \]
        </div>
        <p>The action maximizes expected payoff:</p>
        <div class="math">
          \[
            a_i
            \in
            \arg\max_a
            \mathbb{E}[u(a,\theta)\mid H_i].
          \]
        </div>
        <h3>2. Expanding Observations</h3>
        <p>A key condition is whether agents eventually observe information from a growing set of predecessors. In schematic form, learning is favored when</p>
        <div class="math">
          \[
            |N_i|\to\infty
            \quad\text{and}\quad
            N_i\ \text{contains sufficiently independent sources}.
          \]
        </div>
        <p>But size alone is not enough if all observed actions trace back to the same few signals.</p>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Information Diffusion Through Social Learning</h3>
          <p>Successful learning depends on network diffusion. When observation neighborhoods expand in a way that brings independent information to agents, actions aggregate information. When the network creates bottlenecks or repeated dependence, information diffusion can fail.</p>
          <div class="math">
            \[
              \text{expanding independent observations}
              \quad\Rightarrow\quad
              \Pr(a_i=\theta)\to 1.
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Village Diffusion Example</h3>
        <p>If each farmer observes only two close friends, and those friends observe the same elder, the farmer may see multiple actions but only one original signal. Learning is weak. If each generation observes farmers from many villages, the number of independent original signals grows.</p>
        <div class="math">
          \[
            \text{many observed actions}
            \quad\text{must mean}\quad
            \text{many independent origins}.
          \]
        </div>
        <p>The model separates communication volume from informational diversity.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to network social learning by formalizing information diffusion through local observation. It complements herding models and network-topology results.</p>
        <p><strong>Proof technique.</strong> The main technique is to trace how private signals are embedded in observed action histories and then bound whether enough independent information reaches each agent.</p>
        <p><strong>Useful secondary technique.</strong> The expanding-observations condition is reusable. It translates a hard Bayesian learning problem into a graph condition about how neighborhoods grow.</p>
        <p><strong>Problem solved.</strong> The paper explains when local social observation diffuses information widely enough for society to learn.</p>
        <p><strong>Open questions.</strong> Extensions include endogenous observation links, costly attention to neighbors, misinformation sources, and diffusion when actions are algorithmically ranked.</p>
        <p><strong>My comment.</strong> This paper is a useful backbone for applied network learning. A new project could combine diffusion with source transparency: what minimal provenance labels restore independent-source counting in dense networks?</p>
      `,
    },
  },
  {
    id: "li-tan-2020",
    title: "Locally Bayesian Learning in Networks",
    authors: "Wei Li; Xu Tan",
    journal: "Theoretical Economics",
    year: 2020,
    doi: "10.3982/te3273",
    status: "Digested",
    tags: ["social-learning", "networks"],
    takeaway: "Studies agents who update Bayesianly using local network information.",
    digest: {
      short: "Li and Tan study locally Bayesian learning in networks. Agents process local information in a Bayesian way but do not solve the full global inference problem generated by the entire network. This produces a middle ground between fully Bayesian social learning and simple DeGroot updating. The paper is useful because many real agents are sophisticated locally but naive about distant correlation and repeated information.",
      motivation: `
        <p><strong>Motivation.</strong> Full Bayesian inference in a network is too hard, but people are not purely mechanical averagers either. They often understand their local neighborhood well: who talked to whom, who saw what, and how close friends behave.</p>
        <p><strong>Reality example.</strong> A manager correctly interprets reports from her direct team but does not fully model how information circulated across the whole company before reaching them. She is Bayesian locally and approximate globally.</p>
        <p><strong>Implication.</strong> The model gives a tractable way to study boundedly rational network learning without reducing agents to simple opinion averaging.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Agents update beliefs using a subjective model that treats their local network information carefully while simplifying the rest of the network. The resulting behavior lies between full Bayesian inference and non-Bayesian heuristic learning.</p>
        <p><strong>Main point.</strong> Local Bayesian reasoning can improve on naive updating but still create systematic distortions when information outside the local neighborhood is correlated or duplicated.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>There is an unknown state \(\theta\), private signals \(s_i\), and a network \(G\). Agent \(i\) observes local information \(H_i^L\), such as signals or actions in a neighborhood around \(i\).</p>
        <div class="math">
          \[
            H_i^L
            =
            \{s_j,a_j:j\in B_r(i)\},
          \]
        </div>
        <p>where \(B_r(i)\) is the radius-\(r\) neighborhood of \(i\). The agent forms a posterior using a local Bayesian model:</p>
        <div class="math">
          \[
            \widehat{\mu}_i(\theta)
            =
            \Pr_i(\theta\mid H_i^L).
          \]
        </div>
        <p>The subjective probability \(\Pr_i\) is correct about local variables but may simplify or ignore global dependencies.</p>
        <h3>2. Local Versus Global Bayesianism</h3>
        <p>A fully Bayesian posterior would condition on the complete network history:</p>
        <div class="math">
          \[
            \mu_i^{FB}(\theta)
            =
            \Pr(\theta\mid H_i^{global}).
          \]
        </div>
        <p>A locally Bayesian posterior satisfies</p>
        <div class="math">
          \[
            \widehat{\mu}_i(\theta)
            =
            \Pr(\theta\mid H_i^L;\ \text{local model}),
          \]
        </div>
        <p>which is computationally simpler but may fail to adjust for repeated paths outside the local neighborhood.</p>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Locally Bayesian Network Learning</h3>
          <p>The paper characterizes learning behavior when agents are Bayesian over local network information but not over the full global network. Local Bayesianism can produce tractable updating and partial information aggregation, while preserving systematic errors from neglected global correlation.</p>
          <div class="math">
            \[
              \widehat{\mu}_i
              \neq
              \mu_i^{FB}
              \quad\text{but}\quad
              \widehat{\mu}_i
              \text{ is Bayesian on }H_i^L.
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Office Network Example</h3>
        <p>A worker hears the same rumor from two teammates. She knows both teammates well and correctly accounts for their biases. But she does not know that both heard the rumor from the same distant executive. Her local Bayesian calculation treats the two reports as more independent than they are.</p>
        <div class="math">
          \[
            \widehat{\Pr}(r_1,r_2\mid\theta)
            \approx
            \widehat{\Pr}(r_1\mid\theta)
            \widehat{\Pr}(r_2\mid\theta),
          \]
        </div>
        <p>while the true probability has a common-source dependence. The worker is not foolish; her model is locally correct and globally incomplete.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes a middle-ground behavioral model between fully Bayesian social learning and simple non-Bayesian averaging. It is useful for network settings where global inference is unrealistic.</p>
        <p><strong>Proof technique.</strong> The key technique is subjective-model construction. The proof defines the local information structure agents understand and compares the resulting posterior to the full Bayesian posterior.</p>
        <p><strong>Useful secondary technique.</strong> The radius-neighborhood idea is portable: one can model bounded cognition as exact inference on a local subgraph plus simplification outside it.</p>
        <p><strong>Problem solved.</strong> The paper gives a disciplined way to model bounded rationality in networks without abandoning Bayesian reasoning entirely.</p>
        <p><strong>Open questions.</strong> Extensions include endogenous radius choice, costly cognition, heterogeneous local sophistication, and platforms that reveal enough global provenance to make local Bayesian reasoning more accurate.</p>
        <p><strong>My comment.</strong> I find this modeling approach very useful. A new paper could study optimal local cognition: how much of the network should an agent understand when expanding the radius is costly?</p>
      `,
    },
  },
  {
    id: "levy-razin-2025",
    title: "Political Social Learning: Short-Term Memory and Cycles of Polarization",
    authors: "Gilat Levy; Ronny Razin",
    journal: "American Economic Review",
    year: 2025,
    doi: "10.1257/aer.20220226",
    status: "Digested",
    tags: ["social-learning", "behavioral-learning", "political-economy"],
    takeaway: "Political social learning with limited memory and polarization cycles.",
    digest: {
      short: "Levy and Razin study political social learning with short-term memory. Agents learn from recent political actions or opinions, but society forgets older information. This limited memory can generate cycles of polarization: groups swing between consensus and disagreement because recent behavior overweights transient information. The paper is useful for understanding why political beliefs can remain unstable even with repeated public discussion.",
      motivation: `
        <p><strong>Motivation.</strong> Political societies have short memories. Voters, media, and parties often focus on recent events, scandals, polls, and speeches. Older information fades even if it remains statistically relevant.</p>
        <p><strong>Reality example.</strong> A party gains support after several favorable news cycles. Voters infer that many others have favorable information, which increases support further. Later, a negative sequence reverses the inference. Beliefs and polarization cycle rather than converge.</p>
        <p><strong>Implication.</strong> Polarization need not be permanent ideological sorting. It can be a dynamic consequence of social learning with memory constraints.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Agents infer the state of the world from recent political behavior. Because memory is short, old signals drop out of the social information set. The public belief can therefore overreact to recent observations and underweight older evidence.</p>
        <p><strong>Main point.</strong> Short-term memory can generate persistent cycles of polarization and depolarization. Social learning does not necessarily converge when society repeatedly forgets.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>There is an unknown political state \(\theta\), such as which policy is better. Agents arrive or act over time. Agent \(t\) observes a private signal \(s_t\) and a short memory of recent actions:</p>
        <div class="math">
          \[
            H_t^M
            =
            (a_{t-M},a_{t-M+1},\ldots,a_{t-1}).
          \]
        </div>
        <p>The agent chooses a political action \(a_t\), such as support for party \(L\) or \(R\), to match the state or maximize ideological payoff.</p>
        <div class="math">
          \[
            a_t
            \in
            \arg\max_a
            \mathbb{E}[u(a,\theta)\mid s_t,H_t^M].
          \]
        </div>
        <h3>2. Short Memory</h3>
        <p>With full memory, the social history grows and can accumulate evidence. With short memory, information leaves the system:</p>
        <div class="math">
          \[
            H_{t+1}^M
            =
            (a_{t-M+1},\ldots,a_t).
          \]
        </div>
        <p>The state of public belief is therefore a finite-memory Markov process. This process can cycle because recent actions both reflect and shape beliefs.</p>
        <h3>3. Polarization Cycles</h3>
        <p>Polarization can be represented by dispersion or disagreement in actions or beliefs. If \(m_t\) is a public belief statistic, cycles mean that \(m_t\) does not converge but moves persistently across regions:</p>
        <div class="math">
          \[
            m_t
            \Rightarrow
            \text{nondegenerate stationary distribution or cycle}.
          \]
        </div>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Short Memory Generates Political Learning Cycles</h3>
          <p>When social learning relies on recent actions rather than the full history, political beliefs can cycle. Society may alternate between polarized and less polarized phases because recent information is repeatedly amplified and forgotten.</p>
          <div class="math">
            \[
              M &lt; \infty
              \quad\Rightarrow\quad
              \text{learning need not converge}.
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Polling Cycle Example</h3>
        <p>Voters observe only the last few polls. If recent polls favor candidate \(A\), voters infer that others have good information about \(A\). Some switch to \(A\), making future polls even more favorable. After older pro-\(B\) information disappears, the public belief overshoots.</p>
        <div class="math">
          \[
            H_t^3=(a_{t-3},a_{t-2},a_{t-1})
          \]
        </div>
        <p>contains no record of earlier signals. A later sequence of negative news can reverse the cycle. The mechanism is not random mood; it is rational inference from a short public memory.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper connects political economy, social learning, and bounded memory. It complements models of herding and polarization by generating cycles from memory structure rather than fixed ideological types alone.</p>
        <p><strong>Proof technique.</strong> The main technique is finite-state dynamic analysis. Short memory turns the social history into a Markov state, allowing the authors to study recurrent classes, cycles, and stationary behavior.</p>
        <p><strong>Useful secondary technique.</strong> A useful trick is to model memory as a rolling window of actions. This makes forgetting explicit and tractable, and it can be applied to markets, organizations, and online platforms.</p>
        <p><strong>Problem solved.</strong> The paper explains how political learning can remain cyclical even though agents continually observe social information.</p>
        <p><strong>Open questions.</strong> Extensions include endogenous media memory, archival institutions, strategic parties that exploit short memory, and heterogeneous memory lengths across voters.</p>
        <p><strong>My comment.</strong> The paper is a good reminder that information systems have memory architecture. A new paper could study platform design for political memory: how long should old information remain salient to reduce cycles without freezing outdated beliefs?</p>
      `,
    },
  },
  {
    id: "matejka-mckay-2015",
    title: "Rational Inattention to Discrete Choices: A New Foundation for the Multinomial Logit Model",
    authors: "Filip Matejka; Alisdair McKay",
    journal: "American Economic Review",
    year: 2015,
    doi: "10.1257/aer.20130047",
    status: "Digested",
    tags: ["rational-inattention"],
    takeaway: "Derives multinomial-logit-like stochastic choice from optimal information acquisition with Shannon information costs.",
    digest: {
      short: "The paper gives a rational-inattention foundation for multinomial logit. A decision maker must choose among discrete actions with uncertain payoffs. Before acting, she can acquire costly information. When the cost is proportional to Shannon mutual information, the optimal policy has a generalized logit form: actions with higher realized utility are more likely, but choice probabilities also depend on prior unconditional action frequencies.",
      motivation: `
        <p><strong>Motivation.</strong> Discrete-choice data often look noisy: consumers sometimes choose dominated-looking products, commuters vary routes, and investors switch assets. This paper says the noise can come from optimal limited attention rather than random taste shocks.</p>
        <p><strong>Reality example.</strong> A shopper choosing among many cereals may not inspect every nutrition label and price. She pays more attention to commonly relevant options and less to rare ones. Her final choices look logit-like because information is costly.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> In standard logit, choice is stochastic because utility has additive shocks. In Matějka-McKay, choice is stochastic because the agent optimally chooses not to learn everything. Random-looking choice is the reduced form of optimal attention allocation.</p>
        <p><strong>Economic object.</strong> The agent chooses a conditional action rule \(P(a\mid v)\), where \(v=(v_1,\ldots,v_N)\) is the vector of payoffs from actions. Information cost is the mutual information between the payoff state \(v\) and the chosen action \(a\).</p>
        <p><strong>Main message.</strong> Shannon-cost rational inattention generates a generalized multinomial logit formula. The probability of choosing action \(i\) in payoff state \(v\) is increasing in \(v_i\), but it also depends on the unconditional probability of action \(i\), which is pinned down by a fixed point.</p>
      `,
      deep: String.raw`
        <h3>1. Setup</h3>
        <p>There is a finite set of actions \(i\in\{1,\ldots,N\}\). A payoff state is a vector</p>
        <div class="math">
          \[
            v=(v_1,\ldots,v_N)\in\mathbb{R}^N,
          \]
        </div>
        <p>where \(v_i\) is the payoff from action \(i\). The state \(v\) is drawn from a prior distribution \(G\). The decision maker does not initially know \(v\), but she can acquire information before choosing.</p>
        <p>Rather than explicitly naming signals, the paper works directly with a state-contingent stochastic choice rule:</p>
        <div class="math">
          \[
            P(i\mid v)\ge0,\qquad
            \sum_{i=1}^N P(i\mid v)=1.
          \]
        </div>
        <p>The unconditional probability of choosing action \(i\) is</p>
        <div class="math">
          \[
            P_i^0=\int P(i\mid v)\,dG(v).
          \]
        </div>
        <p>Think of \(P_i^0\) as the agent's average attention or average usage of action \(i\). It is endogenous because it is generated by the same conditional choice rule \(P(i\mid v)\).</p>

        <h3>2. Information Cost</h3>
        <p>The information cost is proportional to the mutual information between the payoff state \(v\) and the chosen action \(i\):</p>
        <div class="math">
          \[
            \mathcal{I}(v;i)
            =
            \int
            \sum_{i=1}^N
            P(i\mid v)
            \log\frac{P(i\mid v)}{P_i^0}
            \,dG(v).
          \]
        </div>
        <p>The multiplier \(\lambda>0\) is the cost of information. Low \(\lambda\) means attention is cheap; high \(\lambda\) means attention is expensive.</p>

        <h3>3. Optimization Problem</h3>
        <p>The decision maker chooses the conditional choice rule \(P(i\mid v)\) to maximize expected payoff net of information cost:</p>
        <div class="math">
          \[
            \max_{\{P(i\mid v)\}}
            \int
            \sum_{i=1}^N
            P(i\mid v)v_i
            \,dG(v)
            -
            \lambda
            \int
            \sum_{i=1}^N
            P(i\mid v)
            \log\frac{P(i\mid v)}{P_i^0}
            \,dG(v).
          \]
        </div>
        <p>subject to</p>
        <div class="math">
          \[
            \sum_i P(i\mid v)=1,\qquad
            P_i^0=\int P(i\mid v)\,dG(v).
          \]
        </div>

        <h3>4. Main Result: Generalized Multinomial Logit</h3>
        <div class="theorem-box">
          <h3>Logit Characterization</h3>
          <p>For any action with positive unconditional probability, the optimal conditional choice probability has the form</p>
          <div class="math">
            \[
              P(i\mid v)
              =
              \frac{P_i^0\exp(v_i/\lambda)}
              {\sum_{j=1}^N P_j^0\exp(v_j/\lambda)}.
            \]
          </div>
          <p>The unconditional probabilities must satisfy the fixed-point equations</p>
          <div class="math">
            \[
              P_i^0
              =
              \int
              \frac{P_i^0\exp(v_i/\lambda)}
              {\sum_{j=1}^N P_j^0\exp(v_j/\lambda)}
              \,dG(v).
            \]
          </div>
        </div>
        <p>This is not exactly textbook multinomial logit because the intercept-like terms \(P_i^0\) are endogenous. They summarize how often the action is worth paying attention to ex ante.</p>

        <h3>5. Economic Interpretation</h3>
        <p>The formula can be rewritten as</p>
        <div class="math">
          \[
            \log P(i\mid v)
            =
            \log P_i^0+\frac{v_i}{\lambda}
            -
            \log\left(\sum_j P_j^0e^{v_j/\lambda}\right).
          \]
        </div>
        <p>So choice is more likely when the realized payoff \(v_i\) is high, when information cost \(\lambda\) is low, and when action \(i\) has high unconditional relevance \(P_i^0\). The \(P_i^0\) term is crucial: the agent designs an information strategy that economizes on rare actions unless they become sufficiently valuable.</p>
      `,
      example: String.raw`
        <h3>Two-Action Example</h3>
        <p>Let there be two actions, \(A=\{1,2\}\), and payoff state \(v=(v_1,v_2)\). Suppose both actions are used with positive unconditional probability. The optimal probability of choosing action \(1\) is</p>
        <div class="math">
          \[
            P(1\mid v)
            =
            \frac{P_1^0e^{v_1/\lambda}}
            {P_1^0e^{v_1/\lambda}+P_2^0e^{v_2/\lambda}}.
          \]
        </div>
        <p>Divide numerator and denominator by \(P_1^0e^{v_1/\lambda}\):</p>
        <div class="math">
          \[
            P(1\mid v)
            =
            \frac{1}
            {1+\frac{P_2^0}{P_1^0}\exp((v_2-v_1)/\lambda)}.
          \]
        </div>
        <p>Thus action \(1\) is more likely when its payoff advantage \(v_1-v_2\) rises. The parameter \(\lambda\) controls sensitivity. As \(\lambda\to0\), information is cheap and the agent almost always chooses the better action:</p>
        <div class="math">
          \[
            \lambda\to0
            \quad\Rightarrow\quad
            P(1\mid v)\to
            \mathbf{1}\{v_1>v_2\}.
          \]
        </div>
        <p>As \(\lambda\to\infty\), information is very costly and choices become much less responsive to \(v\):</p>
        <div class="math">
          \[
            \lambda\to\infty
            \quad\Rightarrow\quad
            P(1\mid v)\approx P_1^0.
          \]
        </div>
        <p>This is the clean intuition: logit noise is not taste noise; it is optimal coarsening of information.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper connects rational inattention to discrete choice. Before this paper, multinomial logit was usually motivated by additive extreme-value taste shocks. Matějka and McKay show that logit can instead arise from optimal information acquisition under Shannon costs. This gives logit a decision-theoretic foundation grounded in costly cognition.</p>
        <p><strong>Proof technique.</strong> The key proof is a convex optimization / first-order-condition argument. The agent chooses \(P(i\mid v)\), and the mutual information term contributes the derivative</p>
        <div class="math">
          \[
            \frac{\partial}{\partial P(i\mid v)}
            \left[
              P(i\mid v)\log\frac{P(i\mid v)}{P_i^0}
            \right]
            \approx
            \log\frac{P(i\mid v)}{P_i^0}
          \]
        </div>
        <p>after accounting for the endogenous unconditional probabilities. Setting marginal payoff equal to marginal information cost gives</p>
        <div class="math">
          \[
            v_i-\lambda\log\frac{P(i\mid v)}{P_i^0}
            =
            \text{constant across active }i,
          \]
        </div>
        <p>which rearranges into the generalized logit formula.</p>
        <p><strong>Problem solved.</strong> The paper explains why discrete choices can look logit even when agents have stable preferences and no taste shocks: they optimally economize on information.</p>
        <p><strong>Open questions.</strong> A natural extension is dynamic rational inattention: if the agent repeatedly faces related discrete choices, how does \(P_i^0\) evolve with learning? Another extension is social rational inattention: if agents observe others' actions, do the endogenous logit weights aggregate information or generate herding? A third extension is misspecified rational inattention: what if the agent uses the wrong prior \(G\), so the fixed point \(P_i^0\) is internally optimal but externally biased?</p>
        <p><strong>My comment.</strong> The paper is powerful because it turns a workhorse empirical formula into an optimal information object. The most useful modeling trick is to use action choice itself as the signal: the agent does not need to choose a rich message and then an action; one can optimize directly over \(P(a\mid v)\). A new paper could use this trick in observational learning, where each agent's action is both her decision and the public signal observed by successors.</p>
      `,
    },
  },
  {
    id: "aybas-jackson-2026-homophily-learning",
    title: "Social Learning with Endogenous Information and the Countervailing Effects of Homophily",
    authors: "Yunus C. Aybas; Matthew O. Jackson",
    journal: "arXiv",
    year: 2026,
    sourceType: "Working paper",
    url: "https://arxiv.org/abs/2602.00934",
    status: "Digested",
    tags: ["working-paper", "social-learning", "networks", "information-acquisition"],
    takeaway: "Homophily improves information quality but can reduce endogenous information generation; its learning effect depends on network density.",
    digest: {
      short: "Aybas and Jackson study social learning when people learn from friends' experiences and the informativeness of a friend's experience depends on similarity. Homophily has two countervailing effects. Similar friends generate higher-quality information because their payoffs are more relevant. But homophily can also make people choose less informative actions, reducing information diversity. The paper shows that homophily hurts learning in sparse networks but helps learning in sufficiently dense networks.",
      motivation: `
        <p><strong>Motivation.</strong> People often learn what to buy, where to work, which school to choose, or which treatment to try by observing friends. Friends are usually similar, so their experiences are highly relevant. But similar friends may also all try similar things, creating less experimentation.</p>
        <p><strong>Reality example.</strong> If a student asks friends from the same background whether a major is good, their experiences may be very relevant but narrow. If she has many friends, homophily gives lots of precise local evidence. If she has few friends, homophily may leave her without exposure to alternatives.</p>
        <p><strong>Implication.</strong> Homophily is not simply good or bad for learning. Its effect depends on whether the network is dense enough for the quality benefit to dominate the diversity loss.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Agents choose actions and then others learn from their realized payoffs. Information is endogenous because earlier agents' actions determine which payoff data become available. Homophily changes both the usefulness of observed payoffs and the diversity of actions people take.</p>
        <p><strong>Main result in words.</strong> In sparse networks, homophily hampers learning because it limits exposure to diverse information. In dense networks, homophily enhances learning because agents already observe enough experiences, so payoff relevance becomes more important than diversity.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>Agents have types or characteristics \(x_i\). They choose actions \(a_i\in A\) and receive payoffs that depend on both the action and the match between the action and the agent's type:</p>
        <div class="math">
          \[
            u_i(a_i,\theta,x_i)+\varepsilon_i.
          \]
        </div>
        <p>Later agents observe friends' actions and realized payoffs. A friend \(j\)'s payoff is more informative for agent \(i\) when \(x_j\) is close to \(x_i\):</p>
        <div class="math">
          \[
            \text{informativeness}_{ij}
            \text{ decreases with }
            d(x_i,x_j).
          \]
        </div>
        <p>Homophily means agents are more likely to be connected to similar others:</p>
        <div class="math">
          \[
            \Pr(i\sim j)
            \text{ is larger when }
            d(x_i,x_j)
            \text{ is smaller}.
          \]
        </div>
        <h3>2. Endogenous Information</h3>
        <p>The set of observations available to agent \(i\) is</p>
        <div class="math">
          \[
            H_i=
            \{(a_j,u_j):j\in N(i),\ j\text{ acted before }i\}.
          \]
        </div>
        <p>But the actions in \(H_i\) are themselves chosen based on previous information. Thus homophily affects not only which payoffs are seen, but also which experiments are generated by society.</p>
        <h3>3. Countervailing Effects</h3>
        <p>There are two forces:</p>
        <div class="math">
          \[
            \text{homophily}
            \Rightarrow
            \text{higher payoff relevance}
            -
            \text{lower action diversity}.
          \]
        </div>
        <p>In sparse networks, the loss of diversity is severe. In dense networks, the agent observes enough similar people that relevance dominates.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Density Determines The Effect Of Homophily</h3>
          <p>Homophily hampers learning in sparse networks but enhances learning in sufficiently dense networks. The sign changes because network density changes the relative importance of information quantity/diversity versus information quality/relevance.</p>
          <div class="math">
            \[
              \text{sparse }G
              \Rightarrow
              \frac{\partial \text{learning}}{\partial \text{homophily}}&lt;0,
              \qquad
              \text{dense }G
              \Rightarrow
              \frac{\partial \text{learning}}{\partial \text{homophily}}&gt;0.
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>College Major Example</h3>
        <p>Students choose whether to major in Economics or Computer Science. A student's payoff from a major depends on her skills and tastes. Observing a similar friend's payoff is useful; observing a very different student's payoff is less useful.</p>
        <p>In a sparse network with only two close friends, homophily may mean all friends try the same major. The student learns little about alternatives. In a dense network with many similar friends, enough people try different options, and similarity makes their outcomes highly informative.</p>
        <div class="math">
          \[
            \text{few similar friends}
            \Rightarrow
            \text{narrow data},
            \qquad
            \text{many similar friends}
            \Rightarrow
            \text{relevant data}.
          \]
        </div>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to social learning and network economics by endogenizing the information generated by observed actions. It sharpens the homophily debate by showing that homophily's welfare effect depends on network density.</p>
        <p><strong>Proof technique.</strong> The key proof technique is a decomposition of homophily's effect into information-quality and information-diversity channels. The model compares how network density scales these two channels.</p>
        <p><strong>Useful secondary technique.</strong> A reusable trick is to treat observed experiences as endogenous experiments. Friends do not merely transmit signals; their own choices determine which signals exist.</p>
        <p><strong>Problem solved.</strong> The paper explains why empirical or theoretical claims about homophily can point in opposite directions: sparse and dense networks have different learning economics.</p>
        <p><strong>Open questions.</strong> Extensions include strategic experimentation by early agents, platform interventions that diversify observed experiences, heterogeneous attention to friends, and dynamic networks where agents choose links to improve learning.</p>
        <p><strong>My comment.</strong> This is a very nice paper idea because it refuses the one-sentence answer about homophily. A new paper could ask how a recommender should choose which friends' outcomes to show when it can trade off similarity against experimentation diversity.</p>
      `,
    },
  },
  {
    id: "jackson-malladi-mcadams-2024-noisy-communication",
    title: "The Impossibility of Social Learning with Noisy Communication: an Identification Failure",
    authors: "Matthew O. Jackson; Suraj Malladi; David McAdams",
    journal: "SSRN working paper",
    year: 2024,
    sourceType: "Working paper",
    url: "https://ssrn.com/abstract=4480702",
    status: "Digested",
    tags: ["working-paper", "social-learning", "networks", "behavioral-learning"],
    takeaway: "Even many independent noisy relay chains cannot support learning when receivers are slightly uncertain about mutation rates.",
    digest: {
      short: "Jackson, Malladi, and McAdams study social learning when original information reaches agents only through noisy relay chains. A receiver can learn from many chains if she perfectly understands the mutation/noise process. But even slight uncertainty about message mutation rates destroys learning from long chains, no matter how many independent sources are available. The core problem is identification: with noisy relay, the receiver cannot distinguish the original state from the noise process that transformed messages.",
      motivation: `
        <p><strong>Motivation.</strong> Much real social information reaches us indirectly. We hear rumors, reposts, summaries, translations, screenshots, and retellings. Each relay can mutate the original message. If we do not know the mutation process exactly, more communication may not solve the problem.</p>
        <p><strong>Reality example.</strong> Imagine learning whether a policy worked from stories passed through many people. Even if hundreds of stories reach you, each story may have been distorted. If you are not sure how often people exaggerate or flip the message, the original truth is hard to identify.</p>
        <p><strong>Implication.</strong> The paper gives a formal reason why fake news, rumor chains, and noisy communication can make social learning impossible even with many sources.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> A source observes information about a state, then a message travels along a chain. At each step, the message can mutate. The receiver observes the final messages from many chains. Learning depends on whether the receiver knows the mutation rate.</p>
        <p><strong>Main result in words.</strong> If the receiver knows the noise process exactly and observes enough independent chains, learning is possible. If the receiver is even slightly uncertain about mutation rates, long-chain messages cannot identify the state.</p>
      `,
      deep: String.raw`
        <h3>1. State And Messages</h3>
        <p>There is a binary state</p>
        <div class="math">
          \[
            \theta\in\{0,1\}.
          \]
        </div>
        <p>An original source observes or generates a message correlated with \(\theta\). The message is then relayed along a chain of length \(L\). At each link, the message mutates with probability \(r\):</p>
        <div class="math">
          \[
            m_{\ell+1}
            =
            \begin{cases}
              m_{\ell}, & \text{with probability }1-r,\\
              1-m_{\ell}, & \text{with probability }r.
            \end{cases}
          \]
        </div>
        <p>The receiver observes final messages from many chains:</p>
        <div class="math">
          \[
            y_k=m_{k,L_k},
            \qquad
            k=1,\ldots,K.
          \]
        </div>
        <h3>2. Known Noise Benchmark</h3>
        <p>If \(r\) is known and less than one half, a final message remains statistically related to the original source. With enough independent chains, the receiver can aggregate evidence.</p>
        <div class="math">
          \[
            \Pr(y_k=\theta\mid r,L_k)
            =
            \frac12+
            \frac12(1-2r)^{L_k}.
          \]
        </div>
        <p>The informativeness decays with chain length, but it is known and can be corrected.</p>
        <h3>3. Uncertain Mutation Rates</h3>
        <p>If the receiver is unsure about \(r\), the same distribution of final messages can be explained by different combinations of state and mutation process. The likelihood is</p>
        <div class="math">
          \[
            \Pr(y_1,\ldots,y_K\mid \theta)
            =
            \int
            \prod_{k=1}^K
            \Pr(y_k\mid \theta,r,L_k)
            dF(r).
          \]
        </div>
        <p>Small uncertainty over \(r\) creates an identification problem that does not disappear merely by increasing \(K\), especially for long chains.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Identification Failure In Noisy Relay Learning</h3>
          <p>Receivers learn from noisy relay chains if and only if they access sufficiently many chains and perfectly understand the noise process. With even slight uncertainty over mutation rates, learning from long chains becomes impossible regardless of the number of independent sources.</p>
          <div class="math">
            \[
              \text{known }r
              \Rightarrow
              \text{aggregation possible},
              \qquad
              r\text{ uncertain}
              \Rightarrow
              \text{identification failure}.
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Rumor Chain Example</h3>
        <p>A village wants to learn whether a medicine worked. Ten original patients report outcomes, but each report passes through five people before reaching a decision maker. Each relay may accidentally flip or distort the message.</p>
        <p>If the decision maker knows the flip probability is exactly \(r=0.1\), she can correct statistically. If she only knows \(r\) is somewhere near \(0.1\), then a high number of positive final messages could mean the medicine worked, or it could mean the mutation process is biased toward positive retellings.</p>
        <div class="math">
          \[
            \text{many messages}
            \neq
            \text{identification}
            \quad
            \text{when the noise model is unknown}.
          \]
        </div>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper contributes to social learning, network communication, misinformation, and fake-news theory. It complements models where more independent signals solve learning by showing that independence is not enough when communication noise is not identified.</p>
        <p><strong>Proof technique.</strong> The central technique is an identification argument. The proof compares likelihoods generated by different states and different mutation-rate processes, showing that long-chain observations cannot separate them under uncertainty.</p>
        <p><strong>Useful secondary technique.</strong> A reusable method is to distinguish quantity of sources from identifiability of the signal channel. Adding more observations cannot help if the channel parameters are not learned.</p>
        <p><strong>Problem solved.</strong> The paper explains why noisy social communication can block learning even in large societies with many independent origins.</p>
        <p><strong>Open questions.</strong> Extensions include endogenous verification, platform provenance labels, strategic mutation, heterogeneous trust in channels, and learning both the state and the noise process from repeated events.</p>
        <p><strong>My comment.</strong> This paper is a sharp warning for social-learning models. A promising new paper could study optimal provenance design: what minimal metadata about relay length or mutation rates restores identifiability?</p>
      `,
    },
  },
  {
    id: "steiner-stewart-matejka-2017",
    title: "Rational Inattention Dynamics: Inertia and Delay in Decision-Making",
    authors: "Jakub Steiner; Colin Stewart; Filip Matejka",
    journal: "Econometrica",
    year: 2017,
    doi: "10.3982/ecta13636",
    status: "Digested",
    tags: ["rational-inattention", "learning"],
    takeaway: "Dynamic rational inattention model producing inertia and delay.",
    digest: {
      short: "Steiner, Stewart, and Matejka put rational inattention into a dynamic decision problem. A decision maker repeatedly faces a changing environment, can process only costly information, and chooses actions over time. The model explains inertia and delay without assuming mechanical adjustment costs: people may keep old actions because updating information is costly, not because changing the action itself is costly.",
      motivation: `
        <p><strong>Motivation.</strong> In many real decisions, people do not revise their choices every time the world changes. Households stay with old phone plans, managers keep old projects alive, firms delay price changes, investors underreact to news, and workers postpone switching tasks. Standard models often explain this with switching costs. This paper shows that costly attention alone can generate similar behavior.</p>
        <p><strong>Reality example.</strong> Suppose a manager chose a supplier last year. New suppliers may now be better, but checking quality, delivery reliability, and contract terms takes attention. Even if switching suppliers is free, the manager may rationally keep the old supplier until enough evidence accumulates or the old choice becomes sufficiently likely to be wrong.</p>
        <p><strong>Implication.</strong> Inertia can be an information-processing phenomenon. Observing slow adjustment does not automatically mean preferences are sticky or physical switching is costly.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> A static rational-inattention model explains noisy choice in one decision problem. This paper studies a dynamic environment where the state evolves and the agent decides how much to attend over time. Because the previous action is informative about the previous state, and because the state is persistent, the previous action becomes a useful low-cost anchor.</p>
        <p><strong>Economic mechanism.</strong> The agent updates only when the value of fresh information is high enough. This generates delay after state changes and inertia in actions, even without an exogenous cost of changing action.</p>
      `,
      deep: String.raw`
        <h3>1. Dynamic Environment</h3>
        <p>Time is discrete, \(t=0,1,2,\ldots\). A payoff-relevant state \(\omega_t\in\Omega\) evolves over time according to a Markov process:</p>
        <div class="math">
          \[
            \Pr(\omega_{t+1}=\omega'\mid\omega_t=\omega)=P(\omega'\mid\omega).
          \]
        </div>
        <p>At each date, the decision maker chooses an action \(a_t\in A\) and obtains payoff \(u(a_t,\omega_t)\). Before acting, she can process information about the current state, but information is costly.</p>
        <h3>2. Belief State</h3>
        <p>The sufficient state for the decision problem is the belief about \(\omega_t\), often together with information inherited from past choices. Let \(\mu_t\in\Delta(\Omega)\) denote the prior belief at the beginning of date \(t\), before choosing the current information structure.</p>
        <div class="math">
          \[
            \mu_t(\omega)=\Pr(\omega_t=\omega\mid h_t),
          \]
        </div>
        <p>where \(h_t\) is the history of past actions, signals, and known transition dynamics.</p>
        <h3>3. Attention Choice</h3>
        <p>The agent chooses an information structure that generates posterior \(p_t\in\Delta(\Omega)\). In posterior notation, an information policy at belief \(\mu\) is a distribution \(\pi\in\Delta(\Delta(\Omega))\) satisfying</p>
        <div class="math">
          \[
            \int p\,d\pi(p)=\mu.
          \]
        </div>
        <p>After observing posterior \(p\), the agent chooses an action</p>
        <div class="math">
          \[
            a(p)\in\arg\max_{a\in A}\sum_{\omega\in\Omega}u(a,\omega)p(\omega).
          \]
        </div>
        <h3>4. Dynamic Program</h3>
        <p>A compact way to write the problem is</p>
        <div class="math">
          \[
            V(\mu)
            =
            \max_{\pi:\mathbb{E}_{\pi}[p]=\mu}
            \left\{
              \int
              \left[
                \max_{a\in A}\sum_{\omega}u(a,\omega)p(\omega)
                +
                \beta V(T(p,a))
              \right]d\pi(p)
              -
              C(\pi,\mu)
            \right\}.
          \]
        </div>
        <p>Here \(T(p,a)\) is the next-period predictive belief after action and state transition. The exact state variable in the paper is tailored to the dynamic rational-inattention environment, but the economic structure is this Bellman tradeoff: better current information improves current action and future beliefs, but it is costly.</p>
        <h3>5. Main Result</h3>
        <div class="theorem-box">
          <h3>Inertia And Delay</h3>
          <p>The main result shows that optimal dynamic attention naturally produces inertia: the probability of repeating the previous action is high, and action changes can be delayed after the payoff-relevant state changes. Formally, the optimal policy can make action \(a_{t-1}\) a privileged predictor of \(a_t\):</p>
          <div class="math">
            \[
              \Pr(a_t=a_{t-1}\mid h_t)
              >
              \Pr(a_t=a\mid h_t)
              \quad
              \text{for many competing }a.
            \]
          </div>
          <p>This persistence is not imposed as a switching cost. It is generated by the endogenous value of reusing past information when states are persistent and information is costly.</p>
        </div>
        <p>The paper therefore gives a rational-inattention foundation for delayed adjustment: when the state changes, beliefs and actions need not move immediately because the agent optimally economizes on updating.</p>
      `,
      example: String.raw`
        <h3>Two-State Product Choice Example</h3>
        <p>A household chooses between two phone plans, \(A\) and \(B\). The state \(\omega_t\in\{A,B\}\) says which plan is currently better. The state is persistent:</p>
        <div class="math">
          \[
            \Pr(\omega_{t+1}=\omega_t)=\rho,\qquad \rho &gt; \frac12.
          \]
        </div>
        <p>The payoff is \(1\) if the household chooses the better plan and \(0\) otherwise:</p>
        <div class="math">
          \[
            u(a_t,\omega_t)=\mathbf{1}\{a_t=\omega_t\}.
          \]
        </div>
        <p>If the household chose \(A\) last period because it believed \(A\) was better, then persistence implies \(A\) is still more likely to be good today. Before paying attention, its prior may be</p>
        <div class="math">
          \[
            \mu_t(A)=\Pr(\omega_t=A\mid h_t)=\rho p_{t-1}+(1-\rho)(1-p_{t-1}).
          \]
        </div>
        <p>If \(\mu_t(A)\) is already high, the value of buying new information may be small. The household keeps plan \(A\). If the state actually changed to \(B\), the household switches only after enough evidence accumulates or the value of checking becomes large. That is delay from costly information, not a literal switching cost.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper connects static rational inattention, which explains stochastic choice, with dynamic adjustment phenomena such as inertia, underreaction, and delayed switching. It contributes to bounded rationality, macro price adjustment, consumer choice, and dynamic decision theory by showing that attention costs can mimic adjustment frictions.</p>
        <p><strong>Proof technique.</strong> The central technique is dynamic programming with an endogenous information structure. The proof identifies the right belief-state representation and then studies the Bellman operator when the control is a distribution over posterior beliefs rather than a simple action.</p>
        <p><strong>Useful secondary technique.</strong> A very portable idea is to treat the previous action as an endogenous statistic of past information. The previous action is not merely a lagged dependent variable; it is a compressed signal about what the agent used to know. This helps prove why persistence arises without adding switching costs.</p>
        <p><strong>Problem solved.</strong> The paper solves the puzzle of how rationally inattentive agents can display inertia and delay in dynamic settings even when they are forward-looking and face no mechanical cost of changing actions.</p>
        <p><strong>Open questions.</strong> Natural extensions include social dynamic rational inattention, where agents also learn from others' delayed actions; misspecified dynamic rational inattention, where agents process information about the wrong state; and equilibrium models where firms' sluggish price changes arise from endogenous attention rather than menu costs.</p>
        <p><strong>My comment.</strong> This is one of the most conceptually useful RI papers because it changes how we interpret persistence. A new paper could combine this with social learning: if everyone is rationally inattive and actions are persistent, observers may mistake inertia for strong private information, creating social delay cascades.</p>
      `,
    },
  },
  {
    id: "miao-wu-young-2022",
    title: "Multivariate Rational Inattention",
    authors: "Jianjun Miao; Jieran Wu; Eric R. Young",
    journal: "Econometrica",
    year: 2022,
    doi: "10.3982/ecta18086",
    status: "Digested",
    tags: ["rational-inattention"],
    takeaway: "Extends rational inattention to multivariate settings.",
    digest: {
      short: "Miao, Wu, and Young study rational inattention when the state and action are multidimensional. In a Gaussian-quadratic environment with Shannon information costs, the agent chooses which linear combinations of state variables to learn. The main result characterizes optimal attention through eigenvalues and dimensional reduction: the agent attends to payoff-relevant directions with high value relative to information cost and ignores low-value directions.",
      motivation: `
        <p><strong>Motivation.</strong> Most real decisions require attention to many variables at once. A firm setting prices tracks demand, costs, competitors, inventories, and macro conditions. A household tracks income, interest rates, health, and housing prices. Attention is not just about how much to learn, but which dimensions to learn.</p>
        <p><strong>Reality example.</strong> A central bank may pay close attention to inflation and unemployment but less attention to asset prices unless they become especially informative for policy. The model explains selective attention across correlated variables.</p>
        <p><strong>Implication.</strong> Multivariate RI predicts attention allocation, dimensionality reduction, and correlated mistakes. Agents make larger errors in low-value directions and sharper decisions along high-value directions.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> The decision maker faces a vector state and chooses a vector action. Information is costly, so she chooses a signal that reveals only some dimensions or linear combinations of the state. With Gaussian priors, quadratic losses, and Shannon information cost, the problem becomes a matrix optimization problem.</p>
        <p><strong>Main point.</strong> Optimal attention is characterized by the covariance matrix of posterior uncertainty. The agent reduces uncertainty along payoff-important eigen-directions and leaves other directions noisy.</p>
      `,
      deep: String.raw`
        <h3>1. Gaussian-Quadratic Environment</h3>
        <p>The state is a random vector</p>
        <div class="math">
          \[
            \theta\sim N(\bar{\theta},\Sigma_0),
            \qquad
            \theta\in\mathbb{R}^k.
          \]
        </div>
        <p>The agent chooses an action \(a\in\mathbb{R}^m\). A canonical quadratic loss is</p>
        <div class="math">
          \[
            u(a,\theta)
            =
            -(a-B\theta)'Q(a-B\theta),
          \]
        </div>
        <p>where \(B\theta\) is the full-information ideal action and \(Q\) weights mistakes across action dimensions.</p>
        <p>The agent chooses an information structure that induces a posterior covariance matrix \(\Sigma\). Bayesian plausibility and Gaussian information imply</p>
        <div class="math">
          \[
            0\preceq \Sigma \preceq \Sigma_0.
          \]
        </div>
        <p>For Gaussian variables, mutual information is</p>
        <div class="math">
          \[
            I(\theta;s)
            =
            \frac{1}{2}
            \log
            \frac{\det \Sigma_0}{\det \Sigma}.
          \]
        </div>
        <h3>2. Reduced Matrix Problem</h3>
        <p>Conditional on a posterior mean, the optimal action is</p>
        <div class="math">
          \[
            a^*(s)=B\,\mathbb{E}[\theta\mid s].
          \]
        </div>
        <p>The expected residual decision loss is proportional to posterior uncertainty:</p>
        <div class="math">
          \[
            \mathrm{Loss}(\Sigma)
            =
            \mathrm{tr}(B'QB\,\Sigma).
          \]
        </div>
        <p>Thus the RI problem can be written as</p>
        <div class="math">
          \[
            \min_{0\preceq \Sigma\preceq \Sigma_0}
            \left\{
              \mathrm{tr}(M\Sigma)
              +
              \frac{\lambda}{2}
              \log
              \frac{\det \Sigma_0}{\det \Sigma}
            \right\},
            \qquad
            M=B'QB.
          \]
        </div>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Eigen-Direction Attention Allocation</h3>
          <p>The optimal signal reduces uncertainty along the directions where payoff sensitivity and prior uncertainty make information valuable. In an appropriate rotated basis, attention has a water-filling form: dimensions with high marginal value receive precision; low-value dimensions are left at prior uncertainty.</p>
          <div class="math">
            \[
              \Sigma^*
              =
              P
              \operatorname{diag}(\sigma_1^{*2},\ldots,\sigma_k^{*2})
              P',
            \]
          </div>
          <p>with each posterior variance chosen by comparing the payoff value of reducing that variance to the marginal information cost.</p>
        </div>
      `,
      example: String.raw`
        <h3>Firm Tracking Demand And Cost Example</h3>
        <p>A firm sets price based on demand \(\theta_1\) and marginal cost \(\theta_2\). Suppose profit losses are much more sensitive to demand mistakes than cost mistakes. Then \(M\) puts higher weight on the demand direction.</p>
        <div class="math">
          \[
            \mathrm{Loss}
            =
            m_1\sigma_1^2+m_2\sigma_2^2,
            \qquad
            m_1>m_2.
          \]
        </div>
        <p>The firm optimally chooses a more precise demand signal:</p>
        <div class="math">
          \[
            \sigma_1^{*2} &lt; \sigma_2^{*2}.
          \]
        </div>
        <p>If demand and cost are correlated, the optimal signal may track a linear combination of both rather than either variable separately. This is why multivariate RI predicts correlated errors.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper extends Gaussian rational inattention from scalar problems to genuinely multivariate decision environments. It connects RI to covariance choice, dimensionality reduction, and matrix methods.</p>
        <p><strong>Proof technique.</strong> The central technique is covariance reduction. In Gaussian-quadratic problems, the whole information structure can be summarized by posterior covariance, turning the signal-design problem into a semidefinite matrix optimization problem.</p>
        <p><strong>Useful secondary technique.</strong> The eigenvalue rotation is very useful. By diagonalizing the relevant payoff-information matrix, the paper separates the attention problem into orthogonal directions, making the economics transparent.</p>
        <p><strong>Problem solved.</strong> The paper solves the problem of how a rationally inattentive agent allocates limited attention across multiple correlated variables.</p>
        <p><strong>Open questions.</strong> Extensions include non-Gaussian multivariate RI, dynamic attention to changing covariance, social learning with multidimensional signals, and empirical tests using correlated forecast errors.</p>
        <p><strong>My comment.</strong> This is a key methods paper for macro and finance applications. A new paper could combine multivariate RI with misspecified learning: agents choose attention directions inside a wrong factor model, creating systematic blind spots.</p>
      `,
    },
  },
  {
    id: "caplin-dean-leahy-2018",
    title: "Rational Inattention, Optimal Consideration Sets, and Stochastic Choice",
    authors: "Andrew Caplin; Mark Dean; John Leahy",
    journal: "The Review of Economic Studies",
    year: 2018,
    doi: "10.1093/restud/rdy037",
    status: "Digested",
    tags: ["rational-inattention"],
    takeaway: "Links rational inattention to consideration sets and stochastic choice.",
    digest: {
      short: "Caplin, Dean, and Leahy connect rational inattention to limited consideration. The decision maker need not fully evaluate every available alternative. Instead, she optimally chooses what to consider, and the resulting stochastic choice can be interpreted as the outcome of costly information processing. The paper helps explain why people seem to choose from small consideration sets even when many alternatives are available.",
      motivation: `
        <p><strong>Motivation.</strong> Consumers rarely compare every product in a market. Voters do not study every candidate. Job seekers do not inspect every opening. Investors do not evaluate every asset. Limited consideration is one of the most common facts of real choice.</p>
        <p><strong>Reality example.</strong> A consumer buying a laptop may first narrow attention to Apple, Dell, and Lenovo, ignoring many technically feasible alternatives. The final choice looks stochastic across consumers, but the randomness may come from optimal attention and consideration rather than taste shocks.</p>
        <p><strong>Implication.</strong> The paper gives a disciplined way to connect observed stochastic choice with an internal attention problem: what looks like random consideration can be optimal information acquisition.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> In rational inattention, the decision maker chooses a signal about payoffs and then chooses an action. In limited-consideration language, the signal can be interpreted as determining which alternatives are worth serious evaluation. The observed choice rule reflects both preferences and attention.</p>
        <p><strong>Main point.</strong> The paper builds a bridge between stochastic choice data, optimal consideration sets, and rational-inattention foundations. It gives conditions under which limited consideration can be treated as the optimal response to information-processing costs.</p>
      `,
      deep: String.raw`
        <h3>1. Choice Environment</h3>
        <p>Let \(X\) be a finite set of alternatives. A decision problem presents a feasible menu \(A\subseteq X\). The decision maker has payoff \(u(x,\omega)\) for alternative \(x\in A\), where \(\omega\) is an uncertain state or payoff vector.</p>
        <div class="math">
          \[
            \omega\sim\mu,\qquad
            x\in A,\qquad
            u:X\times\Omega\to\mathbb{R}.
          \]
        </div>
        <p>A standard fully attentive decision maker would choose</p>
        <div class="math">
          \[
            x^*(\omega,A)\in\arg\max_{x\in A}u(x,\omega).
          \]
        </div>
        <p>But the paper studies a decision maker who can economize on attention by not fully resolving all payoff information.</p>
        <h3>2. Information And Consideration</h3>
        <p>An information structure generates posterior beliefs \(p\in\Delta(\Omega)\). Conditional on posterior \(p\), the decision maker chooses the alternative with highest expected payoff among the alternatives she effectively considers:</p>
        <div class="math">
          \[
            x(p,A)\in
            \arg\max_{x\in A}
            \sum_{\omega\in\Omega}u(x,\omega)p(\omega).
          \]
        </div>
        <p>The rational-inattention problem is</p>
        <div class="math">
          \[
            \max_{\pi:\mathbb{E}_{\pi}[p]=\mu}
            \left\{
              \int_{\Delta(\Omega)}
              \max_{x\in A}
              \sum_{\omega}u(x,\omega)p(\omega)
              \,d\pi(p)
              -
              C(\pi,\mu,A)
            \right\}.
          \]
        </div>
        <p>The limited-consideration interpretation says that the chosen signal partitions attention across alternatives. Some alternatives are rarely or never selected because the optimal information policy makes them rarely worth considering.</p>
        <h3>3. Stochastic Choice</h3>
        <p>The observable implication is a stochastic choice rule</p>
        <div class="math">
          \[
            P(x\mid A)
            =
            \int_{\Delta(\Omega)}
            \mathbf{1}\{x=x(p,A)\}\,d\pi^*_A(p).
          \]
        </div>
        <p>Choice probabilities come from endogenous attention, not necessarily from random utility shocks. A change in the menu can change the information problem, so menu dependence is economically meaningful rather than a nuisance.</p>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Optimal Consideration Foundation</h3>
          <p>The paper characterizes when stochastic choice can be understood as rationally inattentive choice with optimal consideration. In this representation, the decision maker behaves as if she chooses attention optimally and then chooses the best alternative according to the information she acquired.</p>
          <div class="math">
            \[
              P(\cdot\mid A)
              \quad\text{is generated by}\quad
              \pi_A^*
              \in
              \arg\max_{\pi}
              \{ \text{expected decision value} - \text{attention cost} \}.
            \]
          </div>
        </div>
        <p>The key contribution is not just that RI can generate stochastic choice, but that it gives a theory of which alternatives enter effective consideration and how consideration changes with the menu.</p>
      `,
      example: String.raw`
        <h3>Three-Product Example</h3>
        <p>A consumer chooses from \(A=\{1,2,3\}\). Each product has uncertain match value \(\omega_i\), and the payoff from choosing \(i\) is \(\omega_i\). Full attention means learning enough to choose</p>
        <div class="math">
          \[
            i^*(\omega)=\arg\max_{i\in\{1,2,3\}}\omega_i.
          \]
        </div>
        <p>Suppose product \(3\) is usually dominated or rarely attractive. It may be optimal to use a coarse signal that mainly distinguishes product \(1\) from product \(2\), while product \(3\) receives little attention. Then</p>
        <div class="math">
          \[
            P(3\mid\{1,2,3\})\approx 0,
          \]
        </div>
        <p>not because product \(3\) is impossible to choose, but because it is not worth spending attention on in most states.</p>
        <p>If the menu changes to \(\{2,3\}\), product \(3\) may now become worth considering. Thus limited consideration is menu-dependent:</p>
        <div class="math">
          \[
            P(3\mid\{2,3\})>P(3\mid\{1,2,3\}).
          \]
        </div>
        <p>The model explains this without saying preferences changed. The attention problem changed.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper connects rational inattention with stochastic choice and limited-consideration models. It sits between the revealed-preference RI program of Caplin and Dean, Shannon/logit RI models, and the empirical literature on consideration sets in industrial organization and marketing.</p>
        <p><strong>Proof technique.</strong> The key technique is to translate stochastic choice restrictions into an information-acquisition problem. Instead of treating unchosen alternatives as preference failures, the analysis asks whether there is an attention cost and an optimal information policy that rationalize the observed menu-dependent choice probabilities.</p>
        <p><strong>Useful secondary technique.</strong> A useful modeling move is to let the menu enter the value of information. Adding an alternative changes not only the maximization stage but also which comparisons are worth learning. This helps derive limited consideration from optimization rather than imposing consideration exogenously.</p>
        <p><strong>Problem solved.</strong> The paper explains how limited consideration and stochastic choice can arise from optimal costly attention, providing a disciplined alternative to purely random utility or ad hoc consideration probabilities.</p>
        <p><strong>Open questions.</strong> Natural extensions include dynamic consideration sets, social consideration where products enter attention because peers chose them, and misspecified consideration where agents ignore alternatives because they misunderstand the state space. Another useful direction is empirical: estimate whether menu effects are better explained by attention costs or by preference heterogeneity.</p>
        <p><strong>My comment.</strong> This paper is valuable because it turns consideration into an economic object. A promising new theory paper could combine it with information aggregation: if each agent's consideration set is observed by others, then limited attention itself becomes a public signal.</p>
      `,
    },
  },
  {
    id: "bergemann-morris-2016",
    title: "Information Design, Bayesian Persuasion, and Bayes Correlated Equilibrium",
    authors: "Dirk Bergemann; Stephen Morris",
    journal: "American Economic Review",
    year: 2016,
    doi: "10.1257/aer.p20161046",
    status: "Digested",
    tags: ["persuasion", "information-design"],
    takeaway: "Compact AER treatment of information design and Bayes correlated equilibrium.",
    digest: {
      short: "Bergemann and Morris connect information design, Bayesian persuasion, and Bayes correlated equilibrium. The central insight is that if a designer can choose information structures, the set of possible outcomes can be characterized without explicitly listing signals: it is the set of Bayes correlated equilibria satisfying obedience and Bayes plausibility. This is one of the cleanest tools for turning information design into incentive constraints.",
      motivation: `
        <p><strong>Motivation.</strong> Institutions often shape what people know before they act: platforms show reviews, regulators disclose stress tests, sellers provide product information, and central banks communicate forecasts. Instead of asking what happens under one information structure, information design asks which outcomes can be induced by choosing information.</p>
        <p><strong>Reality example.</strong> A regulator wants banks to take prudent actions. By disclosing carefully designed stress-test information, the regulator changes banks' beliefs and therefore actions. The question is not only what banks believe, but what joint distribution of states and actions can be implemented.</p>
        <p><strong>Implication.</strong> Bayes correlated equilibrium lets us analyze all possible information policies through a finite set of feasibility and obedience inequalities.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> An information structure sends signals to players before they choose actions. A recommendation rule maps states into recommended action profiles. If players are willing to obey the recommendations, the induced distribution over states and actions is feasible.</p>
        <p><strong>Main point.</strong> The set of outcomes induced by all possible information structures is exactly the set of Bayes correlated equilibria. Information design can therefore be studied by optimizing over BCE distributions.</p>
      `,
      deep: String.raw`
        <h3>1. Game And Information</h3>
        <p>There is a state \(\theta\in\Theta\), prior \(\mu_0\), players \(i=1,\ldots,n\), actions \(a_i\in A_i\), and payoffs \(u_i(a,\theta)\). An information structure generates signals and hence a distribution over states and actions.</p>
        <p>A direct recommendation rule is a conditional distribution</p>
        <div class="math">
          \[
            \phi(a\mid\theta),
            \qquad
            a=(a_1,\ldots,a_n).
          \]
        </div>
        <p>Bayes plausibility requires that the state marginal remains the prior:</p>
        <div class="math">
          \[
            \sum_a \mu_0(\theta)\phi(a\mid\theta)
            =
            \mu_0(\theta).
          \]
        </div>
        <h3>2. Obedience</h3>
        <p>If player \(i\) is recommended action \(a_i\), obedience requires that she does not want to deviate to \(a_i'\). For every \(i,a_i,a_i'\),</p>
        <div class="math">
          \[
            \sum_{\theta,a_{-i}}
            \mu_0(\theta)\phi(a_i,a_{-i}\mid\theta)
            \left[
              u_i(a_i,a_{-i},\theta)
              -
              u_i(a_i',a_{-i},\theta)
            \right]
            \ge 0.
          \]
        </div>
        <h3>3. Bayes Correlated Equilibrium</h3>
        <p>A distribution over \((\theta,a)\) satisfying Bayes plausibility and obedience is a Bayes correlated equilibrium.</p>
        <div class="math">
          \[
            \text{BCE}
            =
            \{\phi:
              \text{Bayes plausible and obedient}
            \}.
          \]
        </div>
        <h3>4. Main Result</h3>
        <div class="theorem-box">
          <h3>Information Structures Equal BCE Outcomes</h3>
          <p>The set of outcomes that can arise from some information structure and equilibrium behavior is exactly the set of Bayes correlated equilibria. Thus information design can be written as</p>
          <div class="math">
            \[
              \max_{\phi\in \mathrm{BCE}}
              \sum_{\theta,a}
              \mu_0(\theta)\phi(a\mid\theta)
              v(a,\theta),
            \]
          </div>
          <p>where \(v\) is the designer's payoff.</p>
        </div>
      `,
      example: String.raw`
        <h3>Stress-Test Disclosure Example</h3>
        <p>A regulator observes bank health \(\theta\) and recommends whether a bank should raise capital. A recommendation policy \(\phi(a\mid\theta)\) is feasible if it preserves the prior and banks prefer to follow recommendations.</p>
        <div class="math">
          \[
            \mathbb{E}[u_i(a_i,a_{-i},\theta)\mid a_i]
            \ge
            \mathbb{E}[u_i(a_i',a_{-i},\theta)\mid a_i].
          \]
        </div>
        <p>The regulator can then optimize over recommendation distributions directly, rather than designing a complicated signal language.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper unifies Bayesian persuasion and incomplete-information games through Bayes correlated equilibrium. It is a foundational information-design result.</p>
        <p><strong>Proof technique.</strong> The key technique is the revelation principle for information structures. Any signal structure and equilibrium can be replaced by direct recommendations that satisfy obedience.</p>
        <p><strong>Useful secondary technique.</strong> The obedience-inequality representation is extremely portable. It turns information design into a linear program when states and actions are finite.</p>
        <p><strong>Problem solved.</strong> The paper solves the problem of characterizing all possible equilibrium outcomes under arbitrary information structures.</p>
        <p><strong>Open questions.</strong> Extensions include dynamic BCE, robust BCE, information design with costly signals, and behavioral obedience under misspecified beliefs.</p>
        <p><strong>My comment.</strong> This is a tool paper every theorist should know. A new project could use BCE to study social learning platforms where recommendations are both information and incentives.</p>
      `,
    },
  },
  {
    id: "doval-ely-2020",
    title: "Sequential Information Design",
    authors: "Laura Doval; Jeffrey C. Ely",
    journal: "Econometrica",
    year: 2020,
    doi: "10.3982/ecta17260",
    status: "Digested",
    tags: ["persuasion", "information-design", "learning"],
    takeaway: "Core sequential information design paper.",
    digest: {
      short: "Doval and Ely study information design in dynamic environments. A designer controls how information arrives over time, not just what posterior is induced once. The paper develops a recursive approach to sequential persuasion: promises about future information affect current incentives, and current signals shape the continuation belief. The key object is a dynamic analogue of Bayes plausibility and obedience.",
      motivation: `
        <p><strong>Motivation.</strong> Many real disclosures are sequential. A central bank releases statements, minutes, and forecasts over time. A prosecutor reveals evidence during a trial. A platform sends notifications and updates as new data arrive. Timing matters because early information changes how later information is interpreted.</p>
        <p><strong>Reality example.</strong> A drug regulator may release preliminary trial results and later final results. Revealing too much early can stop experimentation; revealing too little can reduce trust. The design problem is dynamic.</p>
        <p><strong>Implication.</strong> Static persuasion is not enough when receivers act and learn over time. Sequential design studies information policies as dynamic promises.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> In static persuasion, the designer chooses a distribution over posteriors with mean equal to the prior. In sequential information design, the designer chooses a stochastic process of beliefs. The belief process must be a martingale, because posterior beliefs must satisfy Bayesian plausibility at every date.</p>
        <p><strong>Main point.</strong> The paper characterizes feasible and optimal dynamic information policies recursively. The designer chooses today's signal and a continuation information policy, subject to dynamic Bayes plausibility and incentive constraints.</p>
      `,
      deep: String.raw`
        <h3>1. Dynamic Environment</h3>
        <p>There is a state \(\theta\) and time \(t=0,1,\ldots,T\) or an infinite horizon. At each date, the receiver may take action \(a_t\), and the designer controls signals. Let \(p_t\in\Delta(\Theta)\) be the public belief after signals up to date \(t\).</p>
        <p>Bayesian plausibility implies that beliefs form a martingale:</p>
        <div class="math">
          \[
            \mathbb{E}[p_{t+1}\mid h_t]=p_t.
          \]
        </div>
        <p>The receiver's action must be optimal given the current belief and expected continuation:</p>
        <div class="math">
          \[
            a_t
            \in
            \arg\max_a
            \mathbb{E}_{p_t}
            \left[
              u_R(a,\theta)+\delta W_R(p_{t+1})
            \right].
          \]
        </div>
        <h3>2. Recursive Design</h3>
        <p>The designer's value can be written recursively:</p>
        <div class="math">
          \[
            V(p)
            =
            \sup_{\pi\in\Delta(\Delta(\Theta))}
            \left\{
              \mathbb{E}_{p'\sim\pi}
              \left[
                v(p,p')+\delta V(p')
              \right]
            \right\}
          \]
        </div>
        <p>subject to the martingale constraint</p>
        <div class="math">
          \[
            \mathbb{E}_{\pi}[p']=p
          \]
        </div>
        <p>and any obedience constraints implied by receiver actions.</p>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Recursive Sequential Persuasion</h3>
          <p>Sequential information design can be characterized by feasible belief processes satisfying dynamic Bayes plausibility and obedience. Optimal policies can be studied through a recursive concavification-style problem over continuation values.</p>
          <div class="math">
            \[
              \{p_t\}_{t\ge0}
              \text{ feasible}
              \quad\Longleftrightarrow\quad
              \{p_t\}
              \text{ is a Bayes-plausible belief process}.
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Central Bank Communication Example</h3>
        <p>A central bank knows whether inflation pressure is high. It can release a statement now and a forecast later. If it fully reveals high inflation today, markets may overreact. If it hides everything, the later forecast may lack credibility.</p>
        <p>The bank chooses a belief process:</p>
        <div class="math">
          \[
            p_0
            \to
            p_1
            \to
            p_2,
            \qquad
            \mathbb{E}[p_1]=p_0,\quad
            \mathbb{E}[p_2\mid p_1]=p_1.
          \]
        </div>
        <p>The martingale restrictions are the formal discipline: the bank can choose timing and noise, but cannot make beliefs systematically drift away from the truth without information.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper extends Bayesian persuasion to dynamic/sequential settings. It connects information design with martingale belief processes, dynamic programming, and recursive concavification.</p>
        <p><strong>Proof technique.</strong> The central technique is the martingale representation of Bayesian beliefs. Dynamic information policies are represented as distributions over future posteriors satisfying conditional mean constraints.</p>
        <p><strong>Useful secondary technique.</strong> The recursive promise-keeping approach is useful beyond persuasion. It treats future information policies as continuation values, which can be plugged into dynamic mechanism design and experimentation models.</p>
        <p><strong>Problem solved.</strong> The paper solves how to characterize and optimize information disclosure when information arrives over time and current disclosure affects future incentives.</p>
        <p><strong>Open questions.</strong> Extensions include robust sequential persuasion, costly information production, multiple receivers, behavioral receivers with limited memory, and learning environments where the state itself changes.</p>
        <p><strong>My comment.</strong> This is a powerful template. A new paper could combine it with Levy-Peski-Vieille: sequential information design when receivers socially learn in a changing environment and old disclosures become stale.</p>
      `,
    },
  },
  {
    id: "dworczak-pavan-2022",
    title: "Preparing for the Worst but Hoping for the Best: Robust (Bayesian) Persuasion",
    authors: "Piotr Dworczak; Alessandro Pavan",
    journal: "Econometrica",
    year: 2022,
    doi: "10.3982/ecta19107",
    status: "Digested",
    tags: ["persuasion", "information-design"],
    takeaway: "Robust persuasion under uncertainty about the receiver or environment.",
    digest: {
      short: "Dworczak and Pavan study robust Bayesian persuasion. The sender wants to design information, but is uncertain about features of the environment, such as receiver payoffs, beliefs, or the mapping from actions to outcomes. The sender prepares for the worst while hoping for the best: the optimal policy maximizes guaranteed payoff while retaining upside when the environment is favorable. The paper gives tools for information design when the designer does not fully trust her model.",
      motivation: `
        <p><strong>Motivation.</strong> Real persuaders rarely know the receiver's exact preferences or interpretation. A regulator, platform, seller, or policymaker may design disclosures for a population with heterogeneous or uncertain reactions.</p>
        <p><strong>Reality example.</strong> A public health agency discloses vaccine information without knowing whether citizens are skeptical, trusting, risk-averse, or politically motivated. A message that persuades one group may backfire for another. The agency wants a robust communication policy.</p>
        <p><strong>Implication.</strong> Information design should not rely too heavily on a knife-edge model of the receiver. Robust persuasion formalizes this concern.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> In standard Bayesian persuasion, the sender knows the receiver's payoff environment and chooses a signal to maximize expected payoff. In robust persuasion, the sender faces ambiguity over environments and evaluates a policy by its worst-case performance, while also caring about upside in better cases.</p>
        <p><strong>Main point.</strong> The optimal robust signal solves a max-min information-design problem. Robustness changes disclosure: the sender may reveal more, pool differently, or avoid policies that perform well only under fragile assumptions.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>There is a state \(\theta\in\Theta\) with prior \(\mu_0\). The sender chooses an information policy \(\pi\) that induces posteriors \(p\). The receiver chooses action \(a\) to maximize receiver payoff, while the sender receives payoff \(v(a,\theta)\).</p>
        <p>The sender is uncertain about an environment parameter \(\eta\in E\), which may affect receiver payoffs, beliefs, or feasible responses. For a fixed information policy, sender payoff in environment \(\eta\) is</p>
        <div class="math">
          \[
            U(\pi,\eta)
            =
            \mathbb{E}_{p\sim\pi}
            \left[
              v(a^*(p,\eta),\theta)
            \right].
          \]
        </div>
        <h3>2. Robust Objective</h3>
        <p>The robust designer evaluates policies by worst-case performance:</p>
        <div class="math">
          \[
            \max_{\pi:\mathbb{E}_{\pi}[p]=\mu_0}
            \min_{\eta\in E}
            U(\pi,\eta).
          \]
        </div>
        <p>The phrase "hoping for the best" captures that among policies with good worst-case performance, the designer may prefer policies with higher upside under favorable \(\eta\).</p>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Robust Persuasion Characterization</h3>
          <p>The robust persuasion problem can be characterized as an optimization over Bayes-plausible distributions of posteriors with a lower-envelope payoff. The optimal signal maximizes the concavification of the worst-case sender value.</p>
          <div class="math">
            \[
              V^{R}(\mu_0)
              =
              \operatorname{cav}
              \left[
                p\mapsto
                \min_{\eta\in E} v_{\eta}(p)
              \right](\mu_0),
          \]
          </div>
          <p>with refinements that preserve upside among worst-case optimal policies.</p>
        </div>
      `,
      example: String.raw`
        <h3>Vaccine Communication Example</h3>
        <p>The agency wants citizens to vaccinate when the benefit is high. It does not know whether receivers are highly skeptical or moderately trusting. A highly tailored optimistic message may work for trusting receivers but fail badly for skeptics.</p>
        <div class="math">
          \[
            \max_{\pi}
            \min\{
              U(\pi,\text{skeptical}),
              U(\pi,\text{trusting})
            \}.
          \]
        </div>
        <p>The robust policy may disclose evidence in a way that remains credible and useful for skeptics, even if that sacrifices some persuasion power for trusting receivers.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper extends Bayesian persuasion to ambiguous environments. It connects persuasion, robust mechanism design, max-min preferences, and concavification methods.</p>
        <p><strong>Proof technique.</strong> The main technique is lower-envelope concavification. The robust payoff at each posterior is the worst-case payoff across environments; the sender then solves a Bayes-plausible splitting problem for that lower envelope.</p>
        <p><strong>Useful secondary technique.</strong> The "prepare for worst, hope for best" refinement is useful for selecting among robustly optimal policies. It keeps max-min discipline while allowing upside comparisons.</p>
        <p><strong>Problem solved.</strong> The paper addresses the fragility of standard persuasion to exact knowledge of receiver behavior.</p>
        <p><strong>Open questions.</strong> Extensions include robust sequential persuasion, learning the receiver type from responses, many receivers with heterogeneous ambiguity, and behavioral receivers with misspecified updating.</p>
        <p><strong>My comment.</strong> This paper is practically important. A new paper could study robust social-learning design: a platform chooses disclosures when it is uncertain whether users are Bayesian, naive, or polarization-prone.</p>
      `,
    },
  },
  {
    id: "gentzkow-kamenica-2016",
    title: "Competition in Persuasion",
    authors: "Matthew Gentzkow; Emir Kamenica",
    journal: "The Review of Economic Studies",
    year: 2016,
    doi: "10.1093/restud/rdw052",
    status: "Digested",
    tags: ["persuasion", "information-design"],
    takeaway: "Studies persuasion when multiple senders compete.",
    digest: {
      short: "Gentzkow and Kamenica study competition in persuasion. Multiple senders choose information structures to influence a receiver's action. Competition changes disclosure incentives: each sender may reveal information to undo or counteract others' persuasion. The paper is a key reference for media markets, lobbying, expert advice, and political communication where information is supplied by competing interested parties.",
      motivation: `
        <p><strong>Motivation.</strong> Most persuasion environments have more than one sender. Voters hear from parties, consumers hear from firms, courts hear from opposing lawyers, and investors hear from analysts. Competition can discipline manipulation, but it can also flood receivers with strategically selected information.</p>
        <p><strong>Reality example.</strong> In a trial, the prosecution and defense each choose what evidence and arguments to present. One side's disclosure may force the other side to reveal counterevidence. The final information environment is shaped by strategic competition.</p>
        <p><strong>Implication.</strong> Information competition can generate more disclosure than monopoly persuasion, but the welfare effect depends on whether extra information helps the receiver choose better actions.</p>
      `,
      medium: String.raw`
        <p><strong>Big idea.</strong> Each sender commits to an information structure about a common state. The receiver observes the realized signals and chooses an action. Senders have preferences over the receiver's action, so they design signals strategically.</p>
        <p><strong>Main point.</strong> Competition among persuaders can unravel concealment and lead to more informative outcomes. But the exact outcome depends on sender preferences, information structures, and whether senders can provide independent or overlapping information.</p>
      `,
      deep: String.raw`
        <h3>1. Environment</h3>
        <p>There is a state \(\theta\in\Theta\), a receiver action \(a\in A\), and senders \(k=1,\ldots,K\). Sender \(k\) chooses an information structure \(\pi_k\). The receiver observes signals \(s=(s_1,\ldots,s_K)\) and chooses</p>
        <div class="math">
          \[
            a^*(s)
            \in
            \arg\max_a
            \mathbb{E}[u_R(a,\theta)\mid s].
          \]
        </div>
        <p>Sender \(k\)'s payoff is</p>
        <div class="math">
          \[
            \mathbb{E}[u_k(a^*(s),\theta)].
          \]
        </div>
        <p>The strategic variables are information structures, not messages after the state is known.</p>
        <h3>2. Competition</h3>
        <p>If one sender hides information favorable to the receiver's alternative action, another sender may reveal it. A sender's information policy affects the marginal value of other senders' information.</p>
        <div class="math">
          \[
            \pi_k
            \in
            \arg\max_{\pi}
            U_k(\pi,\pi_{-k}).
          \]
        </div>
        <h3>3. Main Result</h3>
        <div class="theorem-box">
          <h3>Equilibrium Information Under Persuasion Competition</h3>
          <p>Equilibrium information disclosure under multiple senders differs sharply from monopoly persuasion. Competition can force additional disclosure and, in important cases, leads to highly informative or fully revealing outcomes.</p>
          <div class="math">
            \[
              K>1
              \quad\Rightarrow\quad
              \text{sender's concealment incentive is disciplined by rivals.}
            \]
          </div>
        </div>
      `,
      example: String.raw`
        <h3>Two Lobbyists Example</h3>
        <p>A regulator decides whether to approve a project. The industry lobbyist prefers approval; the environmental lobbyist prefers rejection. If the industry lobbyist hides pollution evidence, the environmental lobbyist has an incentive to disclose it. If the environmental lobbyist hides job-creation evidence, the industry lobbyist discloses it.</p>
        <div class="math">
          \[
            \text{opposed preferences}
            \quad\Rightarrow\quad
            \text{mutual incentive to reveal counterevidence}.
          \]
        </div>
        <p>The receiver may become better informed under competition than under a single monopolistic persuader.</p>
      `,
      technical: String.raw`
        <p><strong>Contribution to literature.</strong> The paper extends Bayesian persuasion to oligopolistic information provision. It connects media competition, lobbying, disclosure, and strategic experimentation with information structures.</p>
        <p><strong>Proof technique.</strong> The central technique is best-response analysis in the space of Blackwell experiments. The proof compares information structures by their induced distributions of receiver posteriors.</p>
        <p><strong>Useful secondary technique.</strong> The deviation-to-reveal argument is highly reusable: if one sender benefits from information the other suppresses, then nondisclosure can be unstable in equilibrium.</p>
        <p><strong>Problem solved.</strong> The paper explains how competition changes the persuasion benchmark. A monopolist may hide information, while competing senders may reveal more.</p>
        <p><strong>Open questions.</strong> Extensions include costly evidence production, platform ranking of competing senders, boundedly rational receivers, misinformation, and dynamic sender competition.</p>
        <p><strong>My comment.</strong> This is essential for applying persuasion to real institutions. A new paper could combine competition in persuasion with shared-news polarization: competing senders may reveal more facts while also increasing disagreement through different interpretations.</p>
      `,
    },
  }
];
