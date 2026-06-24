window.JF_PAPERS = [
  {
    "id": "jf-2026-model-ambiguity-versus-model-misspecification-in-dynamic-p",
    "title": "Model Ambiguity versus Model Misspecification in Dynamic Portfolio Choice",
    "authors": "Pascal J. Maenhout; Hao Xing; Anne G. Balter",
    "journal": "The Journal of Finance",
    "year": 2026,
    "sourceType": "Published article",
    "doi": "10.1111/jofi.70027",
    "url": "https://doi.org/10.1111/jofi.70027",
    "status": "Digested",
    "tags": [
      "journal-of-finance",
      "finance",
      "robust-pricing",
      "misspecified-learning"
    ],
    "takeaway": "Separates ambiguity about which model is right from misspecification concerns inside a benchmark model, showing that investors endogenously fear different return dynamics depending on risk aversion.",
    "digest": {
      "short": "Separates ambiguity about which model is right from misspecification concerns inside a benchmark model, showing that investors endogenously fear different return dynamics depending on risk aversion.",
      "motivation": "\n      <p><strong>Motivation.</strong> Finance is one of the cleanest real-world laboratories for information economics because prices, trades, portfolios, and forecasts all reveal beliefs only indirectly. This paper enters the library because it studies how information, beliefs, or model uncertainty changes market behavior.</p>\n      <p><strong>Reality example.</strong> In financial markets, a signal is rarely just a statistic. It changes trading incentives, perceived tail risk, withdrawal timing, portfolio demand, or real investment. The same information can stabilize or destabilize depending on the strategic environment.</p>\n      <p><strong>Paper-specific angle.</strong> Separates ambiguity about which model is right from misspecification concerns inside a benchmark model, showing that investors endogenously fear different return dynamics depending on risk aversion.</p>",
      "medium": "\n      <p><strong>Big idea.</strong> Separates ambiguity about which model is right from misspecification concerns inside a benchmark model, showing that investors endogenously fear different return dynamics depending on risk aversion.</p>\n      <p><strong>Reading lens.</strong> Treat the paper as part of robust dynamic portfolio choice: identify the belief object, the information friction, the equilibrium price/contract/action, and the welfare or predictability implication.</p>",
      "deep": "\n      <h3>1. Environment</h3>\n      \n      <p>The investor chooses a dynamic portfolio share \\(\\pi_t\\) between a risk-free asset and a risky return process. A benchmark model gives returns \\(dR_t=\\mu_tdt+\\sigma_tdW_t\\), but the investor worries either that the model class is ambiguous or that the benchmark is locally misspecified.</p>\n      <div class=\"math\">\\[\n        dW_t^Q=dW_t+h_tdt,\\qquad\n        E^Q\\left[\\int_0^T \\frac12\\|h_t\\|^2dt\\right]\\le eta .\n      \\]</div>\n      <p>The distortion \\(h_t\\) is chosen by an adversarial model. Portfolio choice solves a max-min problem: choose \\(\\pi), then evaluate utility under the worst nearby model.</p>\n      <h3>2. Main Result</h3>\n      \n      <div class=\"theorem-box\"><h3>Risk-Aversion-Dependent Worst-Case Dynamics</h3>\n      <p>Under dynamic robust control, the worst-case return distortion is not mechanically the same for all investors. Risk-averse investors, who value intertemporal hedging, fear persistence because it damages hedging opportunities; risk-tolerant investors fear mean reversion; log investors are myopic and are affected by model ambiguity but not by the same misspecification channel.</p></div>\n      <p><strong>Intuition.</strong> Misspecification is endogenous to the investor's objective. The adversarial model does not simply lower the mean return; it changes the part of the process that hurts the investor's desired hedging motive most.</p>",
      "example": "\n      <h3>Concrete Example</h3>\n      \n      <p>Take one risky asset with excess return \\(\\mu-r\\), volatility \\(\\sigma), and CRRA risk aversion \\(\\gamma). Without robustness, the Merton share is</p>\n      <div class=\"math\">\\[\n        \\pi^{M}=\\frac{\\mu-r}{\\gamma\\sigma^2}.\n      \\]</div>\n      <p>With a multiplier-robust penalty, a convenient reduced-form worst-case drift is \\(\\mu-r-\\delta\\sigma\\), where \\(\\delta>0\\) summarizes fear of misspecification. The robust share becomes</p>\n      <div class=\"math\">\\[\n        \\pi^{R}=\\frac{\\mu-r-\\delta\\sigma}{\\gamma\\sigma^2}.\n      \\]</div>\n      <p>Step by step: write expected instantaneous utility as a mean term \\(\\pi(\\mu-r)\\), subtract variance cost \\(\\frac{\\gamma}{2}\\pi^2\\sigma^2\\), subtract the worst-case drift wedge \\(\\delta\\pi\\sigma\\), and set the derivative equal to zero. This shows why ambiguity reduces risky investment even before adding learning about persistence.</p>",
      "technical": "\n      <p><strong>Contribution to literature.</strong> Connects Hansen-Sargent robust control, Maenhout-style robust portfolio choice, ambiguity in asset pricing, and learning models with extrapolative or scarred beliefs. Its gap is to separate ambiguity over models from local misspecification within a dynamic portfolio problem.</p>\n      <p><strong>Proof technique and mathematical tools.</strong> The useful tool is continuous-time robust control: write the investor's Hamilton-Jacobi-Bellman equation, add the minimization over likelihood-ratio distortions, solve the inner minimization, and inspect how the induced drift distortion depends on risk aversion and hedging demand.</p>\n      <p><strong>Open questions and critique.</strong> The model is powerful because it makes fear endogenous, but its empirical discipline depends on how the ambiguity radius is chosen. A natural extension is to let the investor learn the ambiguity set from realized model failures rather than fixing it exogenously.</p>"
    }
  },
  {
    "id": "jf-2024-information-aggregation-with-asymmetric-asset-payoffs",
    "title": "Information Aggregation with Asymmetric Asset Payoffs",
    "authors": "Elias Albagli; Christian Hellwig; Aleh Tsyvinski",
    "journal": "The Journal of Finance",
    "year": 2024,
    "sourceType": "Published article",
    "doi": "10.1111/jofi.13361",
    "url": "https://doi.org/10.1111/jofi.13361",
    "status": "Digested",
    "tags": [
      "journal-of-finance",
      "finance",
      "aggregation",
      "information-aggregation"
    ],
    "takeaway": "Characterizes noisy aggregation of dispersed information in financial markets with asymmetric payoffs, linking tail-risk weights to forecast dispersion and return anomalies.",
    "digest": {
      "short": "Characterizes noisy aggregation of dispersed information in financial markets with asymmetric payoffs, linking tail-risk weights to forecast dispersion and return anomalies.",
      "motivation": "\n      <p><strong>Motivation.</strong> Finance is one of the cleanest real-world laboratories for information economics because prices, trades, portfolios, and forecasts all reveal beliefs only indirectly. This paper enters the library because it studies how information, beliefs, or model uncertainty changes market behavior.</p>\n      <p><strong>Reality example.</strong> In financial markets, a signal is rarely just a statistic. It changes trading incentives, perceived tail risk, withdrawal timing, portfolio demand, or real investment. The same information can stabilize or destabilize depending on the strategic environment.</p>\n      <p><strong>Paper-specific angle.</strong> Characterizes noisy aggregation of dispersed information in financial markets with asymmetric payoffs, linking tail-risk weights to forecast dispersion and return anomalies.</p>",
      "medium": "\n      <p><strong>Big idea.</strong> Characterizes noisy aggregation of dispersed information in financial markets with asymmetric payoffs, linking tail-risk weights to forecast dispersion and return anomalies.</p>\n      <p><strong>Reading lens.</strong> Treat the paper as part of asset-market information aggregation: identify the belief object, the information friction, the equilibrium price/contract/action, and the welfare or predictability implication.</p>",
      "deep": "\n      <h3>1. Environment</h3>\n      \n      <p>A continuum or large population of traders observes dispersed private signals about fundamentals. Asset payoffs are asymmetric: downside or upside states matter differently for marginal valuation. The price is an equilibrium object that aggregates information but is distorted by risk and payoff asymmetry.</p>\n      <div class=\"math\">\\[\n        x_i=\\theta+\\varepsilon_i,qquad\n        P=P(\\{x_i\\},z),qquad\n        R=g(\\theta),\n      \\]</div>\n      <p>Instead of imposing parametric normality, the paper characterizes returns through a risk-neutral probability measure that places excess mass on tail risks.</p>\n      <h3>2. Main Result</h3>\n      \n      <div class=\"theorem-box\"><h3>Tail-Weighted Aggregation Representation</h3>\n      <p>Equilibrium asset returns can be represented under a risk-neutral measure \\(Q\\) that distorts the physical distribution \\(P\\) by overweighting payoff-relevant tail states. Observable forecast dispersion and forecast accuracy are linked to the magnitude of this tail weight.</p>\n      <div class=\"math\">\\[\n        E_Q[R]=R_f,\\qquad\n        \\frac{dQ}{dP}(\\theta)\\text{ is larger in tail states.}\n      \\]</div></div>\n      <p><strong>Intuition.</strong> Prices aggregate dispersed information, but they aggregate payoffs through marginal utility and risk compensation. If tail states have asymmetric payoff consequences, the price acts as if it overweights them.</p>",
      "example": "\n      <h3>Concrete Example</h3>\n      \n      <p>Let \\(\\theta\\in\\{-1,+1\\}\\), prior \\(1/2), and payoff \\(R=1\\) in the good state but \\(R=-L\\) in the bad state, with \\(L>1\\). Suppose private signals imply posterior \\(p=\\Pr(\\theta=+1\\mid P)\\). The physical expected payoff is</p>\n      <div class=\"math\">\\[\n        E_P[R\\mid P]=p\\cdot 1+(1-p)(-L)=p(1+L)-L .\n      \\]</div>\n      <p>A risk-neutral tail-weighted measure replaces \\(1-p) by \\(\\omega(1-p)\\), \\(\\omega>1\\), after normalization:</p>\n      <div class=\"math\">\\[\n        q_G=\\frac{p}{p+\\omega(1-p)},\\qquad\n        q_B=\\frac{\\omega(1-p)}{p+\\omega(1-p)}.\n      \\]</div>\n      <p>The priced expected payoff is \\(q_G-Lq_B\\). Even with the same signal-implied \\(p\\), a larger tail weight \\(\\omega\\) lowers the price. This is the small algebra behind the paper's broader point: aggregation and tail risk are inseparable.</p>",
      "technical": "\n      <p><strong>Contribution to literature.</strong> Builds on rational-expectations information aggregation, Grossman-Stiglitz, Hellwig, noisy REE, and disagreement/dispersion asset-pricing models. The gap is a general nonparametric link between asymmetric payoffs, information aggregation, and return anomalies.</p>\n      <p><strong>Proof technique and mathematical tools.</strong> The proof strategy is a change of measure. Instead of solving every equilibrium price directly, characterize the risk-neutral measure that rationalizes the price, then prove that its Radon-Nikodym derivative must overweight payoff-relevant tails.</p>\n      <p><strong>Open questions and critique.</strong> The representation is elegant, but it leaves open how tail weights are identified separately from preferences, constraints, or rare-disaster beliefs. A new project could add endogenous information acquisition and ask whether traders overproduce signals about tails because those states are over-weighted in prices.</p>"
    }
  },
  {
    "id": "jf-2023-information-aggregation-via-contracting",
    "title": "Information Aggregation via Contracting",
    "authors": "Jiasun Li",
    "journal": "The Journal of Finance",
    "year": 2023,
    "sourceType": "Published article",
    "doi": "10.1111/jofi.13205",
    "url": "https://doi.org/10.1111/jofi.13205",
    "status": "Digested",
    "tags": [
      "journal-of-finance",
      "finance",
      "aggregation",
      "information-aggregation",
      "contract-theory"
    ],
    "takeaway": "Shows that a simple risk-sharing contract can help a group of privately informed investors aggregate information by changing their portfolio incentives.",
    "digest": {
      "short": "Shows that a simple risk-sharing contract can help a group of privately informed investors aggregate information by changing their portfolio incentives.",
      "motivation": "\n      <p><strong>Motivation.</strong> Finance is one of the cleanest real-world laboratories for information economics because prices, trades, portfolios, and forecasts all reveal beliefs only indirectly. This paper enters the library because it studies how information, beliefs, or model uncertainty changes market behavior.</p>\n      <p><strong>Reality example.</strong> In financial markets, a signal is rarely just a statistic. It changes trading incentives, perceived tail risk, withdrawal timing, portfolio demand, or real investment. The same information can stabilize or destabilize depending on the strategic environment.</p>\n      <p><strong>Paper-specific angle.</strong> Shows that a simple risk-sharing contract can help a group of privately informed investors aggregate information by changing their portfolio incentives.</p>",
      "medium": "\n      <p><strong>Big idea.</strong> Shows that a simple risk-sharing contract can help a group of privately informed investors aggregate information by changing their portfolio incentives.</p>\n      <p><strong>Reading lens.</strong> Treat the paper as part of contracting for information aggregation: identify the belief object, the information friction, the equilibrium price/contract/action, and the welfare or predictability implication.</p>",
      "deep": "\n      <h3>1. Environment</h3>\n      \n      <p>Several investors jointly finance a risky project. Investor \\(i\\) has risk tolerance \\(\\tau_i\\) and private signal \\(s_i\\) about the project payoff \\(X\\). A contract specifies how realized profits are divided after investors choose strategies that map signals into investment exposure.</p>\n      <div class=\"math\">\\[\n        X=\\theta+\\epsilon,qquad\n        s_i=\\theta+eta_i,qquad\n        w_i(X)=\\alpha_i X .\n      \\]</div>\n      <p>The contract changes each investor's payoff from using her private signal aggressively or conservatively.</p>\n      <h3>2. Main Result</h3>\n      \n      <div class=\"theorem-box\"><h3>Risk-Tolerance Sharing Rule</h3>\n      <p>A contract that divides project profits in proportion to risk tolerances, \\(\\alpha_i=\\tau_i/\\sum_j\\tau_j\\), can facilitate information aggregation because it aligns risk-taking incentives with efficient use of private information.</p></div>\n      <p><strong>Intuition.</strong> If investors bear risk in the wrong proportions, some private signals are underused or distorted. Risk-tolerance sharing makes the marginal cost of acting on information match the investor's ability to bear risk.</p>",
      "example": "\n      <h3>Concrete Example</h3>\n      \n      <p>With two CARA-normal investors, efficient risk sharing solves</p>\n      <div class=\"math\">\\[\n        \\min_{\\alpha_1+\\alpha_2=1}\n        \\frac{\\alpha_1^2}{\\tau_1}+\\frac{\\alpha_2^2}{\\tau_2}.\n      \\]</div>\n      <p>The first-order condition is</p>\n      <div class=\"math\">\\[\n        \\frac{2\\alpha_1}{\\tau_1}=\\frac{2\\alpha_2}{\\tau_2}\n        \\quad\\Rightarrow\\quad\n        \\frac{\\alpha_1}{\\alpha_2}=\\frac{\\tau_1}{\\tau_2}.\n      \\]</div>\n      <p>Using \\(\\alpha_1+\\alpha_2=1\\),</p>\n      <div class=\"math\">\\[\n        \\alpha_1=\\frac{\\tau_1}{\\tau_1+\\tau_2},\\qquad\n        \\alpha_2=\\frac{\\tau_2}{\\tau_1+\\tau_2}.\n      \\]</div>\n      <p>Now investor 1's signal affects investment in proportion to the risk she efficiently bears, so her private information is less likely to be muted by bad sharing incentives.</p>",
      "technical": "\n      <p><strong>Contribution to literature.</strong> Connects rational-expectations aggregation, team theory, partnership contracting, and security design. The contribution is to show that aggregation can be produced by contracts, not only by prices.</p>\n      <p><strong>Proof technique and mathematical tools.</strong> The proof uses CARA-normal or risk-sharing algebra, equilibrium first-order conditions, and comparison between signal-contingent investment under arbitrary sharing rules and under the risk-tolerance rule.</p>\n      <p><strong>Open questions and critique.</strong> The contract is simple and memorable. The open issue is robustness: what if risk tolerances, signal precisions, or participation constraints are private information too? A natural extension is robust contracting for aggregation when the designer does not know investors' signal structures.</p>"
    }
  },
  {
    "id": "jf-2023-interest-rate-skewness-and-biased-beliefs",
    "title": "Interest Rate Skewness and Biased Beliefs",
    "authors": "Michael Bauer; Mikhail Chernov",
    "journal": "The Journal of Finance",
    "year": 2023,
    "sourceType": "Published article",
    "doi": "10.1111/jofi.13276",
    "url": "https://doi.org/10.1111/jofi.13276",
    "status": "Digested",
    "tags": [
      "journal-of-finance",
      "finance",
      "behavioral-learning",
      "misspecified-learning"
    ],
    "takeaway": "Uses interest-rate skewness and forecast errors to identify biased beliefs about macroeconomic risks, with a heterogeneous-beliefs model in which one agent is wrong about consumption growth.",
    "digest": {
      "short": "Uses interest-rate skewness and forecast errors to identify biased beliefs about macroeconomic risks, with a heterogeneous-beliefs model in which one agent is wrong about consumption growth.",
      "motivation": "\n      <p><strong>Motivation.</strong> Finance is one of the cleanest real-world laboratories for information economics because prices, trades, portfolios, and forecasts all reveal beliefs only indirectly. This paper enters the library because it studies how information, beliefs, or model uncertainty changes market behavior.</p>\n      <p><strong>Reality example.</strong> In financial markets, a signal is rarely just a statistic. It changes trading incentives, perceived tail risk, withdrawal timing, portfolio demand, or real investment. The same information can stabilize or destabilize depending on the strategic environment.</p>\n      <p><strong>Paper-specific angle.</strong> Uses interest-rate skewness and forecast errors to identify biased beliefs about macroeconomic risks, with a heterogeneous-beliefs model in which one agent is wrong about consumption growth.</p>",
      "medium": "\n      <p><strong>Big idea.</strong> Uses interest-rate skewness and forecast errors to identify biased beliefs about macroeconomic risks, with a heterogeneous-beliefs model in which one agent is wrong about consumption growth.</p>\n      <p><strong>Reading lens.</strong> Treat the paper as part of biased beliefs in asset pricing: identify the belief object, the information friction, the equilibrium price/contract/action, and the welfare or predictability implication.</p>",
      "deep": "\n      <h3>1. Environment</h3>\n      \n      <p>Bond prices encode expectations under a pricing measure, while survey forecasts encode subjective beliefs. Let \\(r_{t+1}\\) be an interest-rate change and let agents disagree about the conditional distribution of consumption growth or monetary-policy shocks.</p>\n      <div class=\"math\">\\[\n        P_t^n=E_t^Q\\left[M_{t,t+n}\\right],qquad\n        E_t^i[\\Delta r_{t+1}]\\neq E_t^P[\\Delta r_{t+1}].\n      \\]</div>\n      <p>Skewness is used as a state variable summarizing asymmetric perceived risks.</p>\n      <h3>2. Main Result</h3>\n      \n      <div class=\"theorem-box\"><h3>Skewness-Belief Link</h3>\n      <p>Conditional skewness of interest rates predicts future bond returns, high-frequency rate changes, and survey forecast errors. In a heterogeneous-beliefs model, this predictability is consistent with biased beliefs rather than only time-varying risk premia.</p></div>\n      <p><strong>Intuition.</strong> When investors overstate one tail of future rate movements, prices and surveys disagree in systematic ways. Skewness becomes a measurable footprint of belief distortion.</p>",
      "example": "\n      <h3>Concrete Example</h3>\n      \n      <p>Suppose the true rate change is \\(\\Delta r\\in\\{-1,0,+2\\}\\) with probabilities \\((0.25,0.50,0.25)\\). The true mean is</p>\n      <div class=\"math\">\\[\n        E[\\Delta r]=-.25+0+.50=.25.\n      \\]</div>\n      <p>A biased agent overweights the upper tail, using probabilities \\((0.20,0.45,0.35)\\). Her perceived mean is</p>\n      <div class=\"math\">\\[\n        E^b[\\Delta r]=-.20+0+.70=.50.\n      \\]</div>\n      <p>The forecast error is \\(\\Delta r-E^b[\\Delta r]\\), whose average under the true distribution is \\(.25-.50=-.25\\). Thus upper-tail overweighting predicts systematically negative forecast errors, which is the logic used in richer bond data.</p>",
      "technical": "\n      <p><strong>Contribution to literature.</strong> Related to survey-expectations asset pricing, heterogeneous beliefs, diagnostic expectations, and subjective-belief explanations for bond risk premia. Its contribution is to connect skewness, return predictability, and forecast errors in one belief-based framework.</p>\n      <p><strong>Proof technique and mathematical tools.</strong> The empirical-theory proof architecture decomposes returns into expected-rate and risk-premium components, then checks whether skewness predicts forecast errors in the direction implied by the belief model.</p>\n      <p><strong>Open questions and critique.</strong> The hard identification problem is separating biased beliefs from omitted risk factors. A useful theory extension would embed endogenous information acquisition: agents may choose not to learn about rare rate-tail states because those states are cognitively or statistically costly.</p>"
    }
  },
  {
    "id": "jf-2023-visibility-bias-in-the-transmission-of-consumption-beliefs",
    "title": "Visibility Bias in the Transmission of Consumption Beliefs and Undersaving",
    "authors": "Bing Han; David Hirshleifer; Johan Walden",
    "journal": "The Journal of Finance",
    "year": 2023,
    "sourceType": "Published article",
    "doi": "10.1111/jofi.13223",
    "url": "https://doi.org/10.1111/jofi.13223",
    "status": "Digested",
    "tags": [
      "journal-of-finance",
      "finance",
      "behavioral-learning",
      "social-learning"
    ],
    "takeaway": "Models how visible consumption causes biased inference about others' wealth or prospects, creating a feedback loop of overconsumption and undersaving.",
    "digest": {
      "short": "Models how visible consumption causes biased inference about others' wealth or prospects, creating a feedback loop of overconsumption and undersaving.",
      "motivation": "\n      <p><strong>Motivation.</strong> Finance is one of the cleanest real-world laboratories for information economics because prices, trades, portfolios, and forecasts all reveal beliefs only indirectly. This paper enters the library because it studies how information, beliefs, or model uncertainty changes market behavior.</p>\n      <p><strong>Reality example.</strong> In financial markets, a signal is rarely just a statistic. It changes trading incentives, perceived tail risk, withdrawal timing, portfolio demand, or real investment. The same information can stabilize or destabilize depending on the strategic environment.</p>\n      <p><strong>Paper-specific angle.</strong> Models how visible consumption causes biased inference about others' wealth or prospects, creating a feedback loop of overconsumption and undersaving.</p>",
      "medium": "\n      <p><strong>Big idea.</strong> Models how visible consumption causes biased inference about others' wealth or prospects, creating a feedback loop of overconsumption and undersaving.</p>\n      <p><strong>Reading lens.</strong> Treat the paper as part of biased social learning: identify the belief object, the information friction, the equilibrium price/contract/action, and the welfare or predictability implication.</p>",
      "deep": "\n      <h3>1. Environment</h3>\n      \n      <p>Agents observe a selected sample of others' consumption. Consumption is more visible than nonconsumption, so observed behavior is not a representative sample. Agents infer aggregate prospects from what they see, then choose consumption and saving.</p>\n      <div class=\"math\">\\[\n        q=\\Pr(C),qquad\n        \\Pr(\\text{visible}\\mid C)=\\pi_C,qquad\n        \\Pr(\\text{visible}\\mid N)=\\pi_N,quad \\pi_C>\\pi_N .\n      \\]</div>\n      <h3>2. Main Result</h3>\n      \n      <div class=\"theorem-box\"><h3>Visibility-Biased Belief Transmission</h3>\n      <p>If consumption is more visible than nonconsumption, social observation leads agents to overestimate consumption and infer overly favorable future prospects. The resulting consumption choice creates a positive feedback loop and can generate undersaving.</p></div>\n      <p><strong>Intuition.</strong> People learn from what they see, but what they see is selected. Spending is loud; saving is quiet. That selection bias turns ordinary social learning into distorted social learning.</p>",
      "example": "\n      <h3>Concrete Example</h3>\n      \n      <p>Let the true fraction of high-consuming households be \\(q=0.4\\). Suppose high consumption is visible with probability \\(\\pi_C=0.9\\), while low consumption/saving is visible with probability \\(\\pi_N=0.3\\). The perceived consumption share among visible observations is</p>\n      <div class=\"math\">\\[\n        \\hat q\n        =\\frac{q\\pi_C}{q\\pi_C+(1-q)\\pi_N}\n        =\\frac{0.4\\cdot0.9}{0.4\\cdot0.9+0.6\\cdot0.3}\n        =\\frac{0.36}{0.54}=\\frac23 .\n      \\]</div>\n      <p>Agents see a world where two-thirds of households appear to consume heavily, even though the true share is only 40 percent. If higher perceived consumption raises expected income growth, saving falls.</p>",
      "technical": "\n      <p><strong>Contribution to literature.</strong> Builds on social learning, visibility bias, conspicuous consumption, and behavioral household finance. The gap is a formal channel from biased observation to aggregate saving distortions.</p>\n      <p><strong>Proof technique and mathematical tools.</strong> The core proof uses Bayes' rule with selected observations and then embeds the biased posterior in a consumption-saving equilibrium. The useful theorem is simply selection-biased Bayesian updating.</p>\n      <p><strong>Open questions and critique.</strong> The model's strength is its transparent selection channel. The next step is network heterogeneity: visibility bias should be stronger in networks where high-consumption agents are central or algorithmically amplified.</p>"
    }
  },
  {
    "id": "jf-2022-beliefs-aggregation-and-return-predictability",
    "title": "Beliefs Aggregation and Return Predictability",
    "authors": "Albert S. Kyle; Anna A. Obizhaeva; Yajun Wang",
    "journal": "The Journal of Finance",
    "year": 2022,
    "sourceType": "Published article",
    "doi": "10.1111/jofi.13195",
    "url": "https://doi.org/10.1111/jofi.13195",
    "status": "Digested",
    "tags": [
      "journal-of-finance",
      "finance",
      "aggregation",
      "information-aggregation",
      "behavioral-learning"
    ],
    "takeaway": "Shows that even Bayesian traders who agree to disagree about signal precision can generate predictable returns through speculative trading over future disagreement.",
    "digest": {
      "short": "Shows that even Bayesian traders who agree to disagree about signal precision can generate predictable returns through speculative trading over future disagreement.",
      "motivation": "\n      <p><strong>Motivation.</strong> Finance is one of the cleanest real-world laboratories for information economics because prices, trades, portfolios, and forecasts all reveal beliefs only indirectly. This paper enters the library because it studies how information, beliefs, or model uncertainty changes market behavior.</p>\n      <p><strong>Reality example.</strong> In financial markets, a signal is rarely just a statistic. It changes trading incentives, perceived tail risk, withdrawal timing, portfolio demand, or real investment. The same information can stabilize or destabilize depending on the strategic environment.</p>\n      <p><strong>Paper-specific angle.</strong> Shows that even Bayesian traders who agree to disagree about signal precision can generate predictable returns through speculative trading over future disagreement.</p>",
      "medium": "\n      <p><strong>Big idea.</strong> Shows that even Bayesian traders who agree to disagree about signal precision can generate predictable returns through speculative trading over future disagreement.</p>\n      <p><strong>Reading lens.</strong> Treat the paper as part of belief aggregation in markets: identify the belief object, the information friction, the equilibrium price/contract/action, and the welfare or predictability implication.</p>",
      "deep": "\n      <h3>1. Environment</h3>\n      \n      <p>Competitive traders receive signals about long-run value but disagree about signal precision. Each trader updates by Bayes' rule inside her own model. Prices aggregate beliefs, but also reflect speculation about how future disagreement will affect future prices.</p>\n      <div class=\"math\">\\[\n        s_i=v+\\varepsilon_i,qquad\n        \\varepsilon_i\\sim N(0,\\sigma_i^2)\\text{ according to trader }i .\n      \\]</div>\n      <h3>2. Main Result</h3>\n      \n      <div class=\"theorem-box\"><h3>Return Predictability From Disagreement</h3>\n      <p>When traders agree to disagree about private-signal precision, equilibrium prices can exhibit return predictability even though each trader uses Bayes' Law consistently. Short-term speculation about future disagreement can dampen price fluctuations and generate time-series momentum.</p></div>\n      <p><strong>Intuition.</strong> Bayesian updating alone does not eliminate predictability when agents disagree about how informative signals are. Prices reflect both beliefs about fundamentals and beliefs about future market beliefs.</p>",
      "example": "\n      <h3>Concrete Example</h3>\n      \n      <p>Let trader A think her signal precision is \\(\\rho_A=4\\), while trader B thinks A's precision is \\(\\rho_B=1\\). With prior precision \\(1\\) and signal \\(s=1\\), A's posterior mean is</p>\n      <div class=\"math\">\\[\n        m_A=\\frac{4}{1+4}\\cdot1=0.8,\n      \\]</div>\n      <p>while B's assessment of A's information is</p>\n      <div class=\"math\">\\[\n        m_B=\\frac{1}{1+1}\\cdot1=0.5.\n      \\]</div>\n      <p>The same signal therefore creates a 0.3 belief wedge. If future prices partly depend on who will trade on that wedge, today's price includes a speculative component, which can make returns predictable.</p>",
      "technical": "\n      <p><strong>Contribution to literature.</strong> Related to Harrison-Kreps disagreement, beauty-contest asset pricing, rational-expectations aggregation, and heterogeneous-prior finance. The contribution is a belief-aggregation model in which Bayesian agents generate momentum-like predictability.</p>\n      <p><strong>Proof technique and mathematical tools.</strong> The proof solves for competitive equilibrium with heterogeneous perceived precisions, decomposes demand into long-run fundamental demand and short-run speculative demand, and derives the implied autocovariance of returns.</p>\n      <p><strong>Open questions and critique.</strong> The model makes disagreement productive for explaining momentum, but disagreement beliefs are difficult to discipline. A follow-up could combine this with misspecified learning: traders update precision beliefs from endogenous prices and may never agree.</p>"
    }
  },
  {
    "id": "jf-2019-costly-information-acquisition-social-networks-and-asset-p",
    "title": "Costly Information Acquisition, Social Networks, and Asset Prices: Experimental Evidence",
    "authors": "Edward Halim; Yohanes E. Riyanto; Nilanjan Roy",
    "journal": "The Journal of Finance",
    "year": 2019,
    "sourceType": "Published article",
    "doi": "10.1111/jofi.12768",
    "url": "https://doi.org/10.1111/jofi.12768",
    "status": "Digested",
    "tags": [
      "journal-of-finance",
      "finance",
      "information-acquisition",
      "social-learning",
      "aggregation"
    ],
    "takeaway": "Shows experimentally that social communication can crowd out costly information acquisition; sharing improves liquidity and volume but need not improve price informativeness.",
    "digest": {
      "short": "Shows experimentally that social communication can crowd out costly information acquisition; sharing improves liquidity and volume but need not improve price informativeness.",
      "motivation": "\n      <p><strong>Motivation.</strong> Finance is one of the cleanest real-world laboratories for information economics because prices, trades, portfolios, and forecasts all reveal beliefs only indirectly. This paper enters the library because it studies how information, beliefs, or model uncertainty changes market behavior.</p>\n      <p><strong>Reality example.</strong> In financial markets, a signal is rarely just a statistic. It changes trading incentives, perceived tail risk, withdrawal timing, portfolio demand, or real investment. The same information can stabilize or destabilize depending on the strategic environment.</p>\n      <p><strong>Paper-specific angle.</strong> Shows experimentally that social communication can crowd out costly information acquisition; sharing improves liquidity and volume but need not improve price informativeness.</p>",
      "medium": "\n      <p><strong>Big idea.</strong> Shows experimentally that social communication can crowd out costly information acquisition; sharing improves liquidity and volume but need not improve price informativeness.</p>\n      <p><strong>Reading lens.</strong> Treat the paper as part of costly information acquisition in networks: identify the belief object, the information friction, the equilibrium price/contract/action, and the welfare or predictability implication.</p>",
      "deep": "\n      <h3>1. Environment</h3>\n      \n      <p>Traders can buy costly private signals and can also receive information through a social network. The market price aggregates order flow. Network communication creates a free-riding motive: if neighbors acquire signals, one's own acquisition is less valuable.</p>\n      <div class=\"math\">\\[\n        \\text{buy signal at cost }c,qquad\n        s_i=\\theta+\\varepsilon_i,qquad\n        G=(N,E)\\text{ communication network.}\n      \\]</div>\n      <h3>2. Main Result</h3>\n      \n      <div class=\"theorem-box\"><h3>Network Free-Riding in Information Production</h3>\n      <p>Information sharing can reduce private incentives to acquire costly signals. Even when communication increases trading volume and liquidity, price informativeness may fail to improve because the market produces fewer independent signals.</p></div>\n      <p><strong>Intuition.</strong> A network can spread information, but it can also reduce the number of people who create information in the first place. Better diffusion is not the same as more total information.</p>",
      "example": "\n      <h3>Concrete Example</h3>\n      \n      <p>Two traders each choose whether to buy a signal. A signal is worth \\(B=10\\) if no neighbor buys one and worth only \\(b=3\\) if the neighbor's signal will be shared. Let cost be \\(c=5\\). Without sharing, buy because \\(10-5>0\\). With expected sharing probability \\(x\\), the expected value is</p>\n      <div class=\"math\">\\[\n        V(x)=(1-x)B+xb=10-7x.\n      \\]</div>\n      <p>Buying is optimal iff \\(10-7x\\ge5\\), i.e.</p>\n      <div class=\"math\">\\[\n        x\\le \\frac57 .\n      \\]</div>\n      <p>If a trader expects a neighbor to acquire and share with probability above \\(5/7\\), she free-rides. Total signal production can fall even though communication is easier.</p>",
      "technical": "\n      <p><strong>Contribution to literature.</strong> Connects Grossman-Stiglitz information acquisition, social learning on networks, experimental asset markets, and price informativeness. The gap is evidence on how network communication changes endogenous signal production.</p>\n      <p><strong>Proof technique and mathematical tools.</strong> The key calculation is a strategic-substitutes condition in information acquisition. Empirically, the design compares network treatments and measures signal purchase, liquidity, volume, and price informativeness.</p>\n      <p><strong>Open questions and critique.</strong> The result warns against equating communication with learning. A theory extension could study platform design: which network topology maximizes price informativeness when signal production is endogenous?</p>"
    }
  },
  {
    "id": "jf-2019-informed-trading-and-intertemporal-substitution",
    "title": "Informed Trading and Intertemporal Substitution",
    "authors": "Yizhou Xiao",
    "journal": "The Journal of Finance",
    "year": 2019,
    "sourceType": "Published article",
    "doi": "10.1111/jofi.12857",
    "url": "https://doi.org/10.1111/jofi.12857",
    "status": "Digested",
    "tags": [
      "journal-of-finance",
      "finance",
      "aggregation",
      "information-aggregation"
    ],
    "takeaway": "Develops a condition under which information-based trade can occur in a multiperiod consumption model, using intertemporal substitution to escape standard no-trade logic.",
    "digest": {
      "short": "Develops a condition under which information-based trade can occur in a multiperiod consumption model, using intertemporal substitution to escape standard no-trade logic.",
      "motivation": "\n      <p><strong>Motivation.</strong> Finance is one of the cleanest real-world laboratories for information economics because prices, trades, portfolios, and forecasts all reveal beliefs only indirectly. This paper enters the library because it studies how information, beliefs, or model uncertainty changes market behavior.</p>\n      <p><strong>Reality example.</strong> In financial markets, a signal is rarely just a statistic. It changes trading incentives, perceived tail risk, withdrawal timing, portfolio demand, or real investment. The same information can stabilize or destabilize depending on the strategic environment.</p>\n      <p><strong>Paper-specific angle.</strong> Develops a condition under which information-based trade can occur in a multiperiod consumption model, using intertemporal substitution to escape standard no-trade logic.</p>",
      "medium": "\n      <p><strong>Big idea.</strong> Develops a condition under which information-based trade can occur in a multiperiod consumption model, using intertemporal substitution to escape standard no-trade logic.</p>\n      <p><strong>Reading lens.</strong> Treat the paper as part of informed trading theory: identify the belief object, the information friction, the equilibrium price/contract/action, and the welfare or predictability implication.</p>",
      "deep": "\n      <h3>1. Environment</h3>\n      \n      <p>Agents receive private information but trade claims that transfer consumption across time and states. Standard no-trade theorems say that with common priors and purely allocative motives, private information alone need not generate mutually beneficial trade. Here, time-nonseparable preferences and aggregate shocks change marginal rates of substitution.</p>\n      <div class=\"math\">\\[\n        U_i(c_0,c_1,Z)=u_i(c_0,c_1;Z),qquad\n        s_i\\text{ is private information about }Z.\n      \\]</div>\n      <h3>2. Main Result</h3>\n      \n      <div class=\"theorem-box\"><h3>Condition For Information-Based Trade</h3>\n      <p>Information-based trade occurs if and only if private information changes agents' desired intertemporal substitution in heterogeneous ways. The no-trade result survives without aggregate shocks, with homogeneous preferences, or with time-separable preferences.</p></div>\n      <p><strong>Intuition.</strong> Information matters for trade when it changes not only beliefs about payoffs, but also how different agents want to move consumption across time.</p>",
      "example": "\n      <h3>Concrete Example</h3>\n      \n      <p>Let two agents have marginal rate of substitution</p>\n      <div class=\"math\">\\[\n        MRS_i(Z)=\\beta_i(1+\\chi_i Z).\n      \\]</div>\n      <p>If \\(\\chi_1=\\chi_2\\), a signal about \\(Z\\) moves both MRSs proportionally and there is no special reason for trade. If \\(\\chi_1>0\\) and \\(\\chi_2<0\\), a high signal raises agent 1's desire for future consumption but lowers agent 2's. The trade surplus from shifting one unit of future consumption from 2 to 1 is</p>\n      <div class=\"math\">\\[\n        MRS_1(Z)-MRS_2(Z)\n        =\\beta_1(1+\\chi_1Z)-\\beta_2(1+\\chi_2Z).\n      \\]</div>\n      <p>A private signal about \\(Z\\) therefore creates mutually acceptable information-based trade precisely because it changes relative intertemporal valuations.</p>",
      "technical": "\n      <p><strong>Contribution to literature.</strong> Builds on Milgrom-Stokey no-trade logic, asset-market information aggregation, and dynamic consumption-based finance. The gap is a clean necessary-and-sufficient condition for informed trade in a multiperiod setting.</p>\n      <p><strong>Proof technique and mathematical tools.</strong> The proof compares agents' marginal rates of substitution after conditioning on private information. Necessity comes from showing no trade when information does not create heterogeneous MRS movements; sufficiency constructs a trade when it does.</p>\n      <p><strong>Open questions and critique.</strong> The result is sharp. A useful extension would add endogenous information acquisition: when do agents pay to learn exactly the signals that create intertemporal-trade surplus?</p>"
    }
  },
  {
    "id": "jf-2017-are-cds-auctions-biased-and-inefficient",
    "title": "Are CDS Auctions Biased and Inefficient?",
    "authors": "Songzi Du; Haoxiang Zhu",
    "journal": "The Journal of Finance",
    "year": 2017,
    "sourceType": "Published article",
    "doi": "10.1111/jofi.12541",
    "url": "https://doi.org/10.1111/jofi.12541",
    "status": "Digested",
    "tags": [
      "journal-of-finance",
      "finance",
      "auctions",
      "robust-mechanism",
      "pricing"
    ],
    "takeaway": "Uses a mechanism-design model to show how CDS auction restrictions can bias prices and produce inefficient allocations, and proposes a double-auction alternative.",
    "digest": {
      "short": "Uses a mechanism-design model to show how CDS auction restrictions can bias prices and produce inefficient allocations, and proposes a double-auction alternative.",
      "motivation": "\n      <p><strong>Motivation.</strong> Finance is one of the cleanest real-world laboratories for information economics because prices, trades, portfolios, and forecasts all reveal beliefs only indirectly. This paper enters the library because it studies how information, beliefs, or model uncertainty changes market behavior.</p>\n      <p><strong>Reality example.</strong> In financial markets, a signal is rarely just a statistic. It changes trading incentives, perceived tail risk, withdrawal timing, portfolio demand, or real investment. The same information can stabilize or destabilize depending on the strategic environment.</p>\n      <p><strong>Paper-specific angle.</strong> Uses a mechanism-design model to show how CDS auction restrictions can bias prices and produce inefficient allocations, and proposes a double-auction alternative.</p>",
      "medium": "\n      <p><strong>Big idea.</strong> Uses a mechanism-design model to show how CDS auction restrictions can bias prices and produce inefficient allocations, and proposes a double-auction alternative.</p>\n      <p><strong>Reading lens.</strong> Treat the paper as part of auction design and price discovery: identify the belief object, the information friction, the equilibrium price/contract/action, and the welfare or predictability implication.</p>",
      "deep": "\n      <h3>1. Environment</h3>\n      \n      <p>After a credit event, a CDS auction determines the cash settlement price. Participants have heterogeneous positions and valuations for the defaulted bond. Auction rules impose participation restrictions and price caps/floors, so the auction is not a frictionless price-discovery mechanism.</p>\n      <div class=\"math\">\\[\n        v_i\\text{ valuation},qquad q_i\\text{ position},qquad\n        p^A\\text{ auction price}.\n      \\]</div>\n      <h3>2. Main Result</h3>\n      \n      <div class=\"theorem-box\"><h3>Bias And Inefficiency Of Restricted CDS Auctions</h3>\n      <p>Restrictions in the current CDS auction design can prevent high-value participants from fully affecting price discovery and allocation. Price caps or floors give dealers excessive influence over the final price. A suitably designed double auction improves price discovery and allocation efficiency.</p></div>\n      <p><strong>Intuition.</strong> The auction price is supposed to summarize dispersed valuations, but the rule filters who can express demand and how strongly. The mechanism itself creates bias.</p>",
      "example": "\n      <h3>Concrete Example</h3>\n      \n      <p>Two traders value a bond at \\(v_1=40\\) and \\(v_2=80\\). The efficient allocation gives the bond to trader 2. If a price cap/floor rule and participation restriction make the final auction price depend only on trader 1's submitted bound, the price may be \\(p=40\\). The allocation can remain with trader 1 even though trader 2 values it more, creating surplus loss</p>\n      <div class=\"math\">\\[\n        v_2-v_1=80-40=40.\n      \\]</div>\n      <p>A double auction lets both sides submit demand/supply schedules, so the price is more likely to clear between valuations and assign the bond to the high-value trader.</p>",
      "technical": "\n      <p><strong>Contribution to literature.</strong> Related to double auctions, market microstructure, mechanism design, and financial benchmark design. Its gap is applying auction theory to the institutional details of CDS settlement.</p>\n      <p><strong>Proof technique and mathematical tools.</strong> The proof constructs equilibrium bidding under the existing rules, identifies the price bias from constraints, then compares it with a mechanism satisfying stronger price-discovery and allocation properties.</p>\n      <p><strong>Open questions and critique.</strong> The paper is a good example of mechanism design for real market plumbing. A robust-design extension would ask which auction rule performs well when the designer does not know participants' positions or valuation distributions.</p>"
    }
  },
  {
    "id": "jf-2016-information-acquisition-in-rumor-based-bank-runs",
    "title": "Information Acquisition in Rumor-Based Bank Runs",
    "authors": "Zhiguo He; Asaf Manela",
    "journal": "The Journal of Finance",
    "year": 2016,
    "sourceType": "Published article",
    "doi": "10.1111/jofi.12202",
    "url": "https://doi.org/10.1111/jofi.12202",
    "status": "Digested",
    "tags": [
      "journal-of-finance",
      "finance",
      "information-acquisition",
      "optimal-stopping",
      "social-learning"
    ],
    "takeaway": "Models how depositors who hear a rumor acquire private signals and decide when to withdraw, producing endogenous withdrawal speed and bank survival time.",
    "digest": {
      "short": "Models how depositors who hear a rumor acquire private signals and decide when to withdraw, producing endogenous withdrawal speed and bank survival time.",
      "motivation": "\n      <p><strong>Motivation.</strong> Finance is one of the cleanest real-world laboratories for information economics because prices, trades, portfolios, and forecasts all reveal beliefs only indirectly. This paper enters the library because it studies how information, beliefs, or model uncertainty changes market behavior.</p>\n      <p><strong>Reality example.</strong> In financial markets, a signal is rarely just a statistic. It changes trading incentives, perceived tail risk, withdrawal timing, portfolio demand, or real investment. The same information can stabilize or destabilize depending on the strategic environment.</p>\n      <p><strong>Paper-specific angle.</strong> Models how depositors who hear a rumor acquire private signals and decide when to withdraw, producing endogenous withdrawal speed and bank survival time.</p>",
      "medium": "\n      <p><strong>Big idea.</strong> Models how depositors who hear a rumor acquire private signals and decide when to withdraw, producing endogenous withdrawal speed and bank survival time.</p>\n      <p><strong>Reading lens.</strong> Treat the paper as part of dynamic information acquisition and bank runs: identify the belief object, the information friction, the equilibrium price/contract/action, and the welfare or predictability implication.</p>",
      "deep": "\n      <h3>1. Environment</h3>\n      \n      <p>A solvent but illiquid bank may face a spreading rumor. Depositors who hear the rumor decide whether to acquire costly private signals about liquidity or solvency, and whether to withdraw now or wait. The aggregate withdrawal path determines survival.</p>\n      <div class=\"math\">\\[\n        \\theta\\in\\{S,F\\},qquad\n        \\text{signal }s\\text{ bought at cost }c,qquad\n        \\tau_i=\\text{withdrawal time}.\n      \\]</div>\n      <h3>2. Main Result</h3>\n      \n      <div class=\"theorem-box\"><h3>Information Acquisition Can Accelerate Runs</h3>\n      <p>Private information acquisition in response to rumors generates gradual withdrawal and endogenous bank survival time. Public provision of solvency information can mitigate runs partly by crowding out private liquidity-information acquisition.</p></div>\n      <p><strong>Intuition.</strong> Learning does not always stabilize markets. If bad private signals arrive gradually and trigger withdrawals, the act of learning can coordinate a run.</p>",
      "example": "\n      <h3>Concrete Example</h3>\n      \n      <p>A depositor with prior \\(p=\\Pr(S)) can withdraw immediately for payoff \\(1\\), wait for payoff \\(R>1\\) if solvent and \\(0\\) if failed, or buy a signal of precision \\(q\\) at cost \\(c\\). Without a signal, waiting is better iff</p>\n      <div class=\"math\">\\[\n        pR\\ge1.\n      \\]</div>\n      <p>After buying a good signal, posterior is</p>\n      <div class=\"math\">\\[\n        p_G=\\frac{pq}{pq+(1-p)(1-q)}.\n      \\]</div>\n      <p>The value of sampling is approximately</p>\n      <div class=\"math\">\\[\n        V^{sample}=\\Pr(G)\\max\\{1,p_GR\\}+\\Pr(B)\\max\\{1,p_BR\\}-c.\n      \\]</div>\n      <p>If many depositors sample, bad signals trigger withdrawals over time, shortening survival even when the bank might be solvent.</p>",
      "technical": "\n      <p><strong>Contribution to literature.</strong> Connects Diamond-Dybvig bank runs, global games, dynamic information acquisition, rumor transmission, and optimal stopping. The gap is endogenous costly learning during a run.</p>\n      <p><strong>Proof technique and mathematical tools.</strong> The proof combines dynamic programming for individual withdrawal/sampling decisions with an aggregate law of motion for withdrawals and bank survival. The useful technique is solving a stopping/acquisition boundary under strategic externalities.</p>\n      <p><strong>Open questions and critique.</strong> The paper clarifies why transparency can help by reducing wasteful private learning. A natural extension is digital-bank-run dynamics where rumor arrival and withdrawals are nearly instantaneous.</p>"
    }
  },
  {
    "id": "jf-2016-misspecified-recovery",
    "title": "Misspecified Recovery",
    "authors": "Jaroslav Borovicka; Lars Peter Hansen; Jose A. Scheinkman",
    "journal": "The Journal of Finance",
    "year": 2016,
    "sourceType": "Published article",
    "doi": "10.1111/jofi.12404",
    "url": "https://doi.org/10.1111/jofi.12404",
    "status": "Digested",
    "tags": [
      "journal-of-finance",
      "finance",
      "misspecified-learning",
      "robust-pricing"
    ],
    "takeaway": "Shows that recovering beliefs from asset prices can be misspecified when the stochastic discount factor has a nondegenerate martingale component.",
    "digest": {
      "short": "Shows that recovering beliefs from asset prices can be misspecified when the stochastic discount factor has a nondegenerate martingale component.",
      "motivation": "\n      <p><strong>Motivation.</strong> Finance is one of the cleanest real-world laboratories for information economics because prices, trades, portfolios, and forecasts all reveal beliefs only indirectly. This paper enters the library because it studies how information, beliefs, or model uncertainty changes market behavior.</p>\n      <p><strong>Reality example.</strong> In financial markets, a signal is rarely just a statistic. It changes trading incentives, perceived tail risk, withdrawal timing, portfolio demand, or real investment. The same information can stabilize or destabilize depending on the strategic environment.</p>\n      <p><strong>Paper-specific angle.</strong> Shows that recovering beliefs from asset prices can be misspecified when the stochastic discount factor has a nondegenerate martingale component.</p>",
      "medium": "\n      <p><strong>Big idea.</strong> Shows that recovering beliefs from asset prices can be misspecified when the stochastic discount factor has a nondegenerate martingale component.</p>\n      <p><strong>Reading lens.</strong> Treat the paper as part of misspecified asset-pricing recovery: identify the belief object, the information friction, the equilibrium price/contract/action, and the welfare or predictability implication.</p>",
      "deep": "\n      <h3>1. Environment</h3>\n      \n      <p>Asset prices identify risk-adjusted probabilities, not beliefs directly. Let \\(S_t\\) be the stochastic discount factor. Recovery asks whether one can infer investors' physical probabilities from Arrow prices or transition prices. The paper uses Perron-Frobenius theory to factor \\(S_t\\).</p>\n      <div class=\"math\">\\[\n        S_t=\\exp(-\\eta t)\\frac{e(X_0)}{e(X_t)}M_t^{\\infty},\n      \\]</div>\n      <p>The martingale \\(M_t^{\\infty}\\) changes probability measures and absorbs long-term risk adjustments.</p>\n      <h3>2. Main Result</h3>\n      \n      <div class=\"theorem-box\"><h3>Nondegenerate Martingale Component Blocks Naive Recovery</h3>\n      <p>If the long-term martingale component \\(M_t^{\\infty}\\) is nondegenerate, the probability measure recovered from prices need not equal investors' beliefs. Treating recovered probabilities as beliefs therefore distorts inference about risk-return tradeoffs.</p></div>\n      <p><strong>Intuition.</strong> Prices mix beliefs with discounting. Perron-Frobenius recovery peels off one component, but a remaining martingale can still carry risk adjustments that look like beliefs.</p>",
      "example": "\n      <h3>Concrete Example</h3>\n      \n      <p>In a two-state Markov economy, suppose the one-period pricing matrix is \\(Q\\), with entries \\(Q_{ij}=S_{ij}P_{ij}\\). Perron-Frobenius gives a positive eigenvalue-eigenvector pair</p>\n      <div class=\"math\">\\[\n        Qe=\\lambda e.\n      \\]</div>\n      <p>A recovered transition is often constructed as</p>\n      <div class=\"math\">\\[\n        \\widehat P_{ij}=\\frac{Q_{ij}e_j}{\\lambda e_i}.\n      \\]</div>\n      <p>Rows sum to one because \\(Qe=\\lambda e\\). But if the true SDF contains a martingale component, \\(\\widehat P\\) is a risk-adjusted long-term measure, not necessarily the physical belief \\(P\\). The algebra shows exactly where misspecification enters.</p>",
      "technical": "\n      <p><strong>Contribution to literature.</strong> Engages Ross recovery, Hansen-Scheinkman factorization, long-run risk, and robust asset-pricing inference. The contribution is a warning: recovery requires restrictions on the martingale component.</p>\n      <p><strong>Proof technique and mathematical tools.</strong> The central mathematical tool is Perron-Frobenius theory for positive operators. The proof factors the pricing operator into eigenvalue, eigenfunction, and martingale components, then characterizes when the recovered measure coincides with beliefs.</p>\n      <p><strong>Open questions and critique.</strong> This is a foundational misspecification warning for asset pricing. A new paper could connect it with behavioral beliefs: if investors themselves use misspecified recovery-like inference from prices, prices and beliefs may form a feedback loop.</p>"
    }
  },
  {
    "id": "jf-2015-asymmetric-learning-from-financial-information",
    "title": "Asymmetric Learning from Financial Information",
    "authors": "Camelia M. Kuhnen",
    "journal": "The Journal of Finance",
    "year": 2015,
    "sourceType": "Published article",
    "doi": "10.1111/jofi.12223",
    "url": "https://doi.org/10.1111/jofi.12223",
    "status": "Digested",
    "tags": [
      "journal-of-finance",
      "finance",
      "behavioral-learning",
      "information-acquisition"
    ],
    "takeaway": "Shows that people learn asymmetrically from gains and losses, with negative-domain experiences producing overly pessimistic beliefs about investment options.",
    "digest": {
      "short": "Shows that people learn asymmetrically from gains and losses, with negative-domain experiences producing overly pessimistic beliefs about investment options.",
      "motivation": "\n      <p><strong>Motivation.</strong> Finance is one of the cleanest real-world laboratories for information economics because prices, trades, portfolios, and forecasts all reveal beliefs only indirectly. This paper enters the library because it studies how information, beliefs, or model uncertainty changes market behavior.</p>\n      <p><strong>Reality example.</strong> In financial markets, a signal is rarely just a statistic. It changes trading incentives, perceived tail risk, withdrawal timing, portfolio demand, or real investment. The same information can stabilize or destabilize depending on the strategic environment.</p>\n      <p><strong>Paper-specific angle.</strong> Shows that people learn asymmetrically from gains and losses, with negative-domain experiences producing overly pessimistic beliefs about investment options.</p>",
      "medium": "\n      <p><strong>Big idea.</strong> Shows that people learn asymmetrically from gains and losses, with negative-domain experiences producing overly pessimistic beliefs about investment options.</p>\n      <p><strong>Reading lens.</strong> Treat the paper as part of behavioral learning from financial outcomes: identify the belief object, the information friction, the equilibrium price/contract/action, and the welfare or predictability implication.</p>",
      "deep": "\n      <h3>1. Environment</h3>\n      \n      <p>Agents observe financial outcomes and update beliefs about an investment option. The behavioral primitive is asymmetric sensitivity: bad outcomes in the loss domain receive more weight than comparable good outcomes.</p>\n      <div class=\"math\">\\[\n        \\log\\frac{p_{t+1}}{1-p_{t+1}}\n        =\n        \\log\\frac{p_t}{1-p_t}\n        +w(y_t)\\log\\frac{f(y_t\\mid H)}{f(y_t\\mid L)}.\n      \\]</div>\n      <p>The weight \\(w(y)) is higher for low outcomes in the negative domain.</p>\n      <h3>2. Main Result</h3>\n      \n      <div class=\"theorem-box\"><h3>Asymmetric Learning Bias</h3>\n      <p>Negative-domain outcomes induce stronger belief revisions toward pessimism than positive-domain outcomes induce toward optimism. This asymmetric learning can affect investment choices and macro-financial behavior.</p></div>\n      <p><strong>Intuition.</strong> The agent does update from information, but the psychological state changes the gain assigned to the signal. Losses teach too loudly.</p>",
      "example": "\n      <h3>Concrete Example</h3>\n      \n      <p>Prior odds that an investment is good are 1:1. A bad signal has likelihood ratio \\(LR=f(B\\mid H)/f(B\\mid L)=1/3\\). A Bayesian posterior odds would be</p>\n      <div class=\"math\">\\[\n        O_1=1\\cdot\\frac13=\\frac13,\n        \\qquad p_1=\\frac{1/3}{1+1/3}=\\frac14.\n      \\]</div>\n      <p>If a loss-domain agent overweights the bad signal with weight \\(w=2\\), posterior odds become</p>\n      <div class=\"math\">\\[\n        O_1^{bias}=1\\cdot\\left(\\frac13\\right)^2=\\frac19,\n        \\qquad p_1^{bias}=\\frac{1/9}{1+1/9}=\\frac1{10}.\n      \\]</div>\n      <p>The same signal pushes the posterior from 1/4 to 1/10 because the learner treats the bad information as if it arrived twice.</p>",
      "technical": "\n      <p><strong>Contribution to literature.</strong> Links reinforcement learning, prospect theory, belief updating, and household finance. The contribution is direct evidence and modeling of asymmetric learning from financial information.</p>\n      <p><strong>Proof technique and mathematical tools.</strong> The useful formal device is weighted likelihood-ratio updating. Once the weight differs by domain, standard Bayesian log-odds updating becomes a behavioral updating rule with clear comparative statics.</p>\n      <p><strong>Open questions and critique.</strong> A theory extension could endogenize information choice: pessimistic agents may avoid information after losses, creating both biased beliefs and lower experimentation.</p>"
    }
  },
  {
    "id": "jf-2015-government-intervention-and-information-aggregation-by-pri",
    "title": "Government Intervention and Information Aggregation by Prices",
    "authors": "Philip Bond; Itay Goldstein",
    "journal": "The Journal of Finance",
    "year": 2015,
    "sourceType": "Published article",
    "doi": "10.1111/jofi.12303",
    "url": "https://doi.org/10.1111/jofi.12303",
    "status": "Digested",
    "tags": [
      "journal-of-finance",
      "finance",
      "aggregation",
      "information-aggregation"
    ],
    "takeaway": "Shows that government reliance on market prices can reduce the informativeness of those prices, so optimal policy may limit use of prices or transparency.",
    "digest": {
      "short": "Shows that government reliance on market prices can reduce the informativeness of those prices, so optimal policy may limit use of prices or transparency.",
      "motivation": "\n      <p><strong>Motivation.</strong> Finance is one of the cleanest real-world laboratories for information economics because prices, trades, portfolios, and forecasts all reveal beliefs only indirectly. This paper enters the library because it studies how information, beliefs, or model uncertainty changes market behavior.</p>\n      <p><strong>Reality example.</strong> In financial markets, a signal is rarely just a statistic. It changes trading incentives, perceived tail risk, withdrawal timing, portfolio demand, or real investment. The same information can stabilize or destabilize depending on the strategic environment.</p>\n      <p><strong>Paper-specific angle.</strong> Shows that government reliance on market prices can reduce the informativeness of those prices, so optimal policy may limit use of prices or transparency.</p>",
      "medium": "\n      <p><strong>Big idea.</strong> Shows that government reliance on market prices can reduce the informativeness of those prices, so optimal policy may limit use of prices or transparency.</p>\n      <p><strong>Reading lens.</strong> Treat the paper as part of policy feedback and price informativeness: identify the belief object, the information friction, the equilibrium price/contract/action, and the welfare or predictability implication.</p>",
      "deep": "\n      <h3>1. Environment</h3>\n      \n      <p>A government wants to use stock prices as signals about firm fundamentals, but traders know that policy will respond to prices. Because policy affects payoffs, the price becomes endogenous to the intervention rule.</p>\n      <div class=\"math\">\\[\n        \\theta\\text{ fundamental},qquad\n        P\\text{ market price},qquad\n        a(P)\\text{ government intervention}.\n      \\]</div>\n      <h3>2. Main Result</h3>\n      \n      <div class=\"theorem-box\"><h3>Policy Reliance Can Destroy Price Informativeness</h3>\n      <p>When government intervention responds strongly to market prices, traders' incentives and payoff exposure change in ways that can reduce information aggregation into prices. It may be optimal for the government to commit to limited reliance on prices or limited transparency.</p></div>\n      <p><strong>Intuition.</strong> A price is informative partly because traders profit from making it informative. If policy leans too hard on the price, it changes the object traders are pricing.</p>",
      "example": "\n      <h3>Concrete Example</h3>\n      \n      <p>Suppose a trader's value of acquiring information is \\(B\\) when the government does not offset the fundamental shock. If policy offsets fraction \\(\\rho\\) of the shock after seeing price, private profit from information falls to</p>\n      <div class=\"math\">\\[\n        V(\\rho)=(1-\\rho)^2B-c.\n      \\]</div>\n      <p>Information is acquired iff \\((1-\\rho)^2B\\ge c\\). With \\(B=9,c=4\\), this requires</p>\n      <div class=\"math\">\\[\n        1-\\rho\\ge \\frac23\n        \\quad\\Rightarrow\\quad\n        \\rho\\le\\frac13.\n      \\]</div>\n      <p>If the government relies too much on price, \\(\\rho>1/3\\), traders stop producing information and the price becomes less useful.</p>",
      "technical": "\n      <p><strong>Contribution to literature.</strong> Builds on Grossman-Stiglitz, rational-expectations markets, feedback effects, and policy design. The gap is the two-way feedback from prices to policy and back to price informativeness.</p>\n      <p><strong>Proof technique and mathematical tools.</strong> The proof solves trader information/trading incentives as a function of policy feedback, then solves the government's commitment problem. The key inequality compares the informational benefit of price-contingent policy with the incentive cost of reducing price informativeness.</p>\n      <p><strong>Open questions and critique.</strong> This is useful well beyond government policy: platforms, central banks, and firms all use market signals. A natural extension is robust policy when the government is unsure how traders acquire information.</p>"
    }
  },
  {
    "id": "jf-2015-information-diversity-and-complementarities-in-trading-and",
    "title": "Information Diversity and Complementarities in Trading and Information Acquisition",
    "authors": "Itay Goldstein; Liyan Yang",
    "journal": "The Journal of Finance",
    "year": 2015,
    "sourceType": "Published article",
    "doi": "10.1111/jofi.12226",
    "url": "https://doi.org/10.1111/jofi.12226",
    "status": "Digested",
    "tags": [
      "journal-of-finance",
      "finance",
      "information-acquisition",
      "aggregation",
      "information-aggregation"
    ],
    "takeaway": "Identifies strategic complementarities in trading and information acquisition when traders learn about different fundamentals, so greater information diversity can improve price informativeness.",
    "digest": {
      "short": "Identifies strategic complementarities in trading and information acquisition when traders learn about different fundamentals, so greater information diversity can improve price informativeness.",
      "motivation": "\n      <p><strong>Motivation.</strong> Finance is one of the cleanest real-world laboratories for information economics because prices, trades, portfolios, and forecasts all reveal beliefs only indirectly. This paper enters the library because it studies how information, beliefs, or model uncertainty changes market behavior.</p>\n      <p><strong>Reality example.</strong> In financial markets, a signal is rarely just a statistic. It changes trading incentives, perceived tail risk, withdrawal timing, portfolio demand, or real investment. The same information can stabilize or destabilize depending on the strategic environment.</p>\n      <p><strong>Paper-specific angle.</strong> Identifies strategic complementarities in trading and information acquisition when traders learn about different fundamentals, so greater information diversity can improve price informativeness.</p>",
      "medium": "\n      <p><strong>Big idea.</strong> Identifies strategic complementarities in trading and information acquisition when traders learn about different fundamentals, so greater information diversity can improve price informativeness.</p>\n      <p><strong>Reading lens.</strong> Treat the paper as part of information acquisition and price informativeness: identify the belief object, the information friction, the equilibrium price/contract/action, and the welfare or predictability implication.</p>",
      "deep": "\n      <h3>1. Environment</h3>\n      \n      <p>The asset value depends on multiple fundamentals. Traders may acquire information about different components. Trading aggressively on one component can reduce uncertainty faced by traders informed about another component, creating complementarities.</p>\n      <div class=\"math\">\\[\n        V=\\theta_1+\\theta_2,qquad\n        s_i^k=\\theta_k+\\varepsilon_i,qquad k\\in\\{1,2\\}.\n      \\]</div>\n      <h3>2. Main Result</h3>\n      \n      <div class=\"theorem-box\"><h3>Information-Diversity Complementarity</h3>\n      <p>When different traders are informed about different fundamentals, aggressive trading on one fundamental can increase the return to acquiring and trading on information about the other fundamental. Greater diversity of information can therefore improve price informativeness.</p></div>\n      <p><strong>Intuition.</strong> Signals about different dimensions are complements because price becomes easier to interpret when other dimensions are also traded on aggressively.</p>",
      "example": "\n      <h3>Concrete Example</h3>\n      \n      <p>Suppose trader 1 can learn \\(\\theta_1\\), trader 2 can learn \\(\\theta_2\\), and price noise variance faced by trader 2 is \\(\\sigma_z^2/(1+a_1)), where \\(a_1\\) is trader 1's aggressiveness. Trader 2's value of information is</p>\n      <div class=\"math\">\\[\n        V_2(a_1)=\\frac{K}{\\sigma_z^2/(1+a_1)}-c\n        =\\frac{K(1+a_1)}{\\sigma_z^2}-c.\n      \\]</div>\n      <p>The derivative is positive:</p>\n      <div class=\"math\">\\[\n        \\frac{dV_2}{da_1}=\\frac{K}{\\sigma_z^2}>0.\n      \\]</div>\n      <p>Thus more aggressive trading on one signal raises the incentive to acquire the other signal, the basic complementarity.</p>",
      "technical": "\n      <p><strong>Contribution to literature.</strong> Connects endogenous information acquisition, noisy rational-expectations equilibrium, and market informativeness. The gap is showing that diversity of information can create complementarities rather than only duplication or free-riding.</p>\n      <p><strong>Proof technique and mathematical tools.</strong> The proof derives equilibrium trading coefficients and information-acquisition payoffs, then signs cross-partials: whether one trader's information/trading intensity raises another's value of information.</p>\n      <p><strong>Open questions and critique.</strong> The complementarity result is powerful but may depend on payoff separability and how price noise is modeled. A useful extension is networked information acquisition with multidimensional fundamentals.</p>"
    }
  },
  {
    "id": "jf-2014-biased-beliefs-asset-prices-and-investment-a-structural-ap",
    "title": "Biased Beliefs, Asset Prices, and Investment: A Structural Approach",
    "authors": "Aydogan Alti; Paul C. Tetlock",
    "journal": "The Journal of Finance",
    "year": 2014,
    "sourceType": "Published article",
    "doi": "10.1111/jofi.12089",
    "url": "https://doi.org/10.1111/jofi.12089",
    "status": "Digested",
    "tags": [
      "journal-of-finance",
      "finance",
      "behavioral-learning",
      "misspecified-learning"
    ],
    "takeaway": "Structurally estimates a model in which overconfidence and overextrapolation distort expectations, affecting asset prices and firm investment.",
    "digest": {
      "short": "Structurally estimates a model in which overconfidence and overextrapolation distort expectations, affecting asset prices and firm investment.",
      "motivation": "\n      <p><strong>Motivation.</strong> Finance is one of the cleanest real-world laboratories for information economics because prices, trades, portfolios, and forecasts all reveal beliefs only indirectly. This paper enters the library because it studies how information, beliefs, or model uncertainty changes market behavior.</p>\n      <p><strong>Reality example.</strong> In financial markets, a signal is rarely just a statistic. It changes trading incentives, perceived tail risk, withdrawal timing, portfolio demand, or real investment. The same information can stabilize or destabilize depending on the strategic environment.</p>\n      <p><strong>Paper-specific angle.</strong> Structurally estimates a model in which overconfidence and overextrapolation distort expectations, affecting asset prices and firm investment.</p>",
      "medium": "\n      <p><strong>Big idea.</strong> Structurally estimates a model in which overconfidence and overextrapolation distort expectations, affecting asset prices and firm investment.</p>\n      <p><strong>Reading lens.</strong> Treat the paper as part of biased beliefs and investment: identify the belief object, the information friction, the equilibrium price/contract/action, and the welfare or predictability implication.</p>",
      "deep": "\n      <h3>1. Environment</h3>\n      \n      <p>Firms invest based on perceived productivity. Investors or managers may process signals with overconfidence or extrapolation. These biased beliefs affect both asset returns and real investment.</p>\n      <div class=\"math\">\\[\n        a_{t+1}=\\rho a_t+\\epsilon_{t+1},qquad\n        E_t^b[a_{t+1}]=\\rho a_t+\\beta(a_t-\\bar a),\n      \\]</div>\n      <p>The parameter \\(\\beta>0\\) captures extrapolation; overconfidence can be represented as underestimating signal noise.</p>\n      <h3>2. Main Result</h3>\n      \n      <div class=\"theorem-box\"><h3>Structural Biased-Beliefs Channel</h3>\n      <p>A neoclassical investment model augmented with overconfidence and overextrapolation can match return predictability and investment inefficiencies that efficient-belief models fail to match. The bias parameters are identified through joint asset-pricing and firm-behavior moments.</p></div>\n      <p><strong>Intuition.</strong> Biased beliefs matter not only because prices are wrong; they also change real decisions. Investment becomes too sensitive to perceived trends or overly precise signals.</p>",
      "example": "\n      <h3>Concrete Example</h3>\n      \n      <p>Suppose true expected productivity growth is \\(2\\%\\). A manager extrapolates recent high growth of \\(6\\%\\) with \\(\\beta=0.5\\):</p>\n      <div class=\"math\">\\[\n        E^b[g]=0.02+0.5(0.06-0.02)=0.04.\n      \\]</div>\n      <p>If optimal investment satisfies \\(I=I_0+\\phi E[g]\\), with \\(I_0=10\\) and \\(\\phi=100\\), unbiased investment is \\(12\\), while biased investment is</p>\n      <div class=\"math\">\\[\n        I^b=10+100(0.04)=14.\n      \\]</div>\n      <p>A two-percentage-point belief distortion creates two extra units of investment, linking belief bias to real misallocation.</p>",
      "technical": "\n      <p><strong>Contribution to literature.</strong> Related to behavioral asset pricing, structural investment models, overconfidence, extrapolative expectations, and return predictability. The contribution is joint structural discipline from prices and investment.</p>\n      <p><strong>Proof technique and mathematical tools.</strong> The method is structural identification: derive model-implied moments for returns and investment, then estimate bias parameters and compare against efficient-belief alternatives.</p>\n      <p><strong>Open questions and critique.</strong> The structural approach is informative but model-dependent. A theoretical extension could microfound the bias parameters as outcomes of misspecified learning from endogenous firm signals.</p>"
    }
  }
];

(function addJfPapers() {
  if (!Array.isArray(window.PAPERS) && typeof PAPERS === "undefined") return;
  const list = Array.isArray(window.PAPERS) ? window.PAPERS : PAPERS;
  const ids = new Set(list.map((paper) => paper.id));
  for (const paper of window.JF_PAPERS) {
    if (!ids.has(paper.id)) list.push(paper);
  }
})();
