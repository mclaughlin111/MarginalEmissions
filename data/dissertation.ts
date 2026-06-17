import type {
  ChartSpec,
  DissertationSection,
  Equation,
  FigureAsset,
  NavItem,
  Reference,
  StatCard,
  TableDataset,
} from "@/types/dissertation";

export const thesisMeta = {
  title:
    "Investigating the Relationship Between Short-Run Marginal Emissions Factors and Coal and Gas Prices",
  shortTitle: "Short-Run MEFs and Fuel Prices",
  author: "D.M. McLaughlin",
  supervisor: "S.U. Camilla Thomson",
  institution: "The University of Edinburgh",
  date: "April 23, 2026",
  sourcePdf: "/Users/thomasmclaughlin/Downloads/DMcLaughlin Dissertation.pdf",
};

export const navItems: NavItem[] = [
  { id: "overview", label: "Overview", eyebrow: "Start" },
  { id: "introduction", label: "Introduction", eyebrow: "Chapter 1" },
  { id: "literature", label: "Literature", eyebrow: "Chapter 2" },
  { id: "mechanism", label: "Mechanism", eyebrow: "Chapter 3" },
  { id: "methodology", label: "Methodology", eyebrow: "Chapter 4" },
  { id: "equations", label: "Equations", eyebrow: "Model" },
  { id: "data", label: "Data Explorer", eyebrow: "Tables" },
  { id: "results", label: "Results", eyebrow: "Charts" },
  { id: "discussion", label: "Discussion", eyebrow: "Chapter 5" },
  { id: "conclusion", label: "Conclusion", eyebrow: "Chapter 6" },
  { id: "references", label: "References", eyebrow: "Bibliography" },
];

export const headlineStats: StatCard[] = [
  {
    label: "Headline specification",
    value: "Model D",
    description: "Quadratic price ratio with ARDL(1,0), trend, CPS slope shift, and 2009 intercept control.",
  },
  {
    label: "Adjusted R2",
    value: "0.845",
    description: "Model D fit reported in Table 4.2.",
  },
  {
    label: "Prediction interval recovery",
    value: "68 / 71",
    description: "Observed MEF values recovered inside the 95% prediction interval.",
  },
  {
    label: "Turning point",
    value: "PR = 1.076",
    description: "Non-centred coal-to-gas price ratio where marginal effects become indistinguishable from zero.",
  },
];

export const sections: DissertationSection[] = [
  {
    id: "overview",
    eyebrow: "Interactive dissertation",
    title: "Fuel prices as a tractable signal for marginal emissions",
    summary:
      "The dissertation tests whether short-run marginal emissions factors (MEFs) in the British electricity system can be estimated from external coal, gas, and carbon price data.",
    body: [
      "The research addresses a predictive gap in British MEF methods. Existing regression studies estimate MEFs from observed generation and emissions data, which is strong for retrospective analysis but difficult to use in medium-term scenario modelling.",
      "The core argument is that coal and gas prices influence generator short-run marginal costs, which reorder coal and CCGT plant in the merit order. That merit-order movement changes which fuel sits on the margin, and therefore changes the short-run MEF.",
      "The final model identifies a statistically significant concave quadratic relationship between the coal-to-gas price ratio and MEFs for 2009-2014, once system lag and structural controls are included.",
    ],
    takeaways: [
      "MEFs are more relevant than average emissions factors for marginal demand changes.",
      "The British 2009-2014 marginal mix is well suited to a coal-gas price-ratio specification.",
      "The result is useful for predictive scenario methods, but it requires recalibration after policy or generation-mix changes.",
    ],
  },
  {
    id: "introduction",
    eyebrow: "Chapter 1",
    title: "Motivation and objectives",
    summary:
      "The UK net-zero context motivates more granular carbon tracking, but existing MEF methods face barriers when used predictively.",
    body: [
      "The dissertation starts from the UK's legally binding net-zero target and the call from Energy Systems Catapult and ELEXON for near-real-time carbon-flow monitoring in electricity markets.",
      "British MEF studies such as Hawkes and Thomson et al. rely on observed generation data, which limits them to retrospective analysis. Dispatch models can simulate future scenarios but are computationally intensive and sensitive to technical assumptions. Machine learning methods can perform well over short horizons, but accuracy decays as the forecast horizon grows.",
      "The project therefore asks whether a robust mathematical relationship can estimate MEFs from coal and gas wholesale benchmark prices, creating a tractable framework for predictive scenario models.",
    ],
    details: [
      {
        title: "Research objectives extracted from the dissertation",
        body: [
          "Identify the state-of-the-art understanding of short-run MEFs and the methods used to estimate them.",
          "Collate the physical and econometric factors that support or complicate the relationship between MEFs and coal-gas benchmark prices.",
          "Test historical empirical data to determine whether a reliable relationship exists for the British system.",
          "Evaluate how that relationship could be applied in predictive scenario modelling.",
        ],
      },
    ],
  },
  {
    id: "literature",
    eyebrow: "Chapter 2",
    title: "Literature review and research gap",
    summary:
      "The literature supports MEFs over AEFs for marginal changes, but British methods still depend on observed generation data.",
    body: [
      "Average emissions factors divide total emissions by total generation. MEFs instead identify the emissions from the generator responding to marginal demand, making them more accurate for demand-response and marginal-consumption decisions.",
      "Hawkes calculated a British MEF of 0.69 kgCO2 +/- 10% for 2002-2009, compared with a system AEF of 0.51 kgCO2 +/- 10%. Thomson et al. calculated the MEF to be 26% higher than the AEF in 2010.",
      "The dissertation focuses on short-run MEFs, where generation capacity is fixed. It reviews regression, ARIMA, dispatch, and machine-learning methods, then identifies the predictive limitation: British methods generally regress on observed generation data rather than external market data.",
    ],
    takeaways: [
      "Short-run MEFs are the relevant metric for instantaneous or near-term marginal demand changes.",
      "Model choice is constrained by the British self-dispatch market structure and limited plant-level dispatch data.",
      "The research gap is a direct, tractable relationship from external fuel and carbon prices to MEFs.",
    ],
  },
  {
    id: "mechanism",
    eyebrow: "Chapter 3",
    title: "Fuel price to marginal emissions mechanism",
    summary:
      "Fuel and carbon prices set coal and CCGT short-run marginal costs. Those costs determine merit order and the marginal fuel mix.",
    body: [
      "The central mechanism is the merit order. Generators are dispatched according to short-run marginal cost, so changes in fuel and carbon prices change the relative position of coal and gas plant.",
      "The dissertation reports Thomson et al.'s sub-period MEFs: 0.635 kgCO2/kWh in 2010 when gas was cheaper than coal, then 0.548 and 0.504 kgCO2/kWh in 2012 and 2014 when coal was cheaper than gas.",
      "The British system during the study window is especially suitable for this model because coal and gas dominate marginal generation. Nuclear and renewables have near-zero operational emissions and low variable costs, while oil and other sources are small.",
    ],
    details: [
      {
        title: "Complicating factors",
        body: [
          "The dispatch curve is a step function, so fuel switching creates structural non-linearity rather than a simple straight-line relationship.",
          "Transmission constraints, plant dynamics, ramping limits, and reserve obligations introduce system lag.",
          "Part loading can increase emissions independently of the price ratio, especially when thermal plant remains at minimum stable generation during low-demand or high-renewable periods.",
        ],
      },
    ],
    takeaways: [
      "A useful model should expect both non-linearity and lag.",
      "The price signal is strong, but omitted operational variables still matter.",
    ],
  },
  {
    id: "methodology",
    eyebrow: "Chapter 4",
    title: "Data, assumptions, and empirical specification",
    summary:
      "The empirical analysis uses monthly British data from 2009-2014, with MEFs from Thomson et al. and coal, gas, and carbon price series converted into a coal-to-gas price ratio.",
    body: [
      "Monthly resolution balances accessibility and sample size for econometric estimation. The final analysis uses 72 monthly observations, with one observation lost in dynamic models that include lagged MEF.",
      "The dependent variable is the monthly MEF in kg CO2 eq/kWh. The independent variable is the coal-to-gas price ratio, formed from fuel prices plus fuel-specific carbon costs.",
      "All specifications are estimated using OLS with Newey-West HAC standard errors. Model selection uses BIC, and diagnostics check heteroskedasticity, autocorrelation, and dynamic stability.",
    ],
    details: [
      {
        title: "Identification assumption",
        body: [
          "The dissertation assumes the price ratio is exogenous to British MEFs during 2009-2014.",
          "API 2 is an international coal benchmark, NBP is linked to European gas networks, and carbon pricing was set through the EU ETS plus policy-set CPS rates during the analysis period.",
          "The dissertation explicitly notes that this assumption is weaker after the transition to the UK ETS in 2021.",
        ],
      },
    ],
  },
  {
    id: "equations",
    eyebrow: "Model",
    title: "Mathematical model and interactive equations",
    summary:
      "The equations below are represented as LaTeX and paired with hoverable variable metadata for reading without losing the model structure.",
    body: [
      "The equation components render the original formulae in KaTeX and expose variable definitions in an interactive legend. This avoids brittle manipulation of KaTeX internals while keeping variables understandable and keyboard accessible.",
      "The headline model is a quadratic ARDL(1,0) specification. Marginal effects are then extracted by differentiating with respect to the centred price ratio.",
    ],
  },
  {
    id: "data",
    eyebrow: "Tables",
    title: "Data explorer",
    summary:
      "The dissertation's numerical tables are converted into typed interactive tables with search, sorting, and pagination.",
    body: [
      "PDF table extraction only detected the word-count table automatically, so the statistical tables were curated from the extracted page text.",
      "The month-level data behind Figures 4.1-4.6 is not present as raw table data in the PDF. Those plots are included as extracted figure assets, while interactive charts use numeric values explicitly printed in tables or prose.",
    ],
    takeaways: [
      "No runtime PDF parsing is required by the deployed app.",
      "Rows marked by source captions are grounded in the dissertation tables and appendix.",
    ],
  },
  {
    id: "results",
    eyebrow: "Charts",
    title: "Results and interactive charts",
    summary:
      "Model D combines quadratic price-ratio terms with lagged MEF and controls, achieving the strongest diagnostic performance.",
    body: [
      "Model A provides a useful static baseline but leaves autocorrelation. Model B2 improves fit with a quadratic price ratio, while Model C captures lag but weakens the isolated price-ratio term. Model D combines both and is selected for detailed analysis.",
      "Model D recovers 68 of 71 observed MEFs inside its 95% prediction interval. Its RMSE is 0.026 kgCO2 eq/kWh, equal to 4.52% of the mean MEF.",
      "Out-of-sample 2014 testing produces RMSE values within Hawkes's +/- 10% accuracy band, although post-April 2014 over-prediction reveals sensitivity to CPS policy changes outside the training exposure.",
    ],
    takeaways: [
      "The linear and quadratic price-ratio terms are significant at the 1% level in Model D.",
      "The lag coefficient is stable and significant, supporting immediate and steady-state marginal-effect extraction.",
      "The 75th percentile marginal effects are statistically indistinguishable from zero, consistent with coal-saturation theory.",
    ],
  },
  {
    id: "discussion",
    eyebrow: "Chapter 5",
    title: "Discussion and limitations",
    summary:
      "The literature mechanism and statistical findings converge, but the model is period-specific and sensitive to structural change.",
    body: [
      "The results confirm the theoretical mechanism for the British system between 2009 and 2014: fuel prices affect SRMC, SRMC affects merit order, and merit order affects MEFs.",
      "The dissertation's two main methodological contributions are the use of external market data for a British MEF model and the extraction of immediate and steady-state marginal effects from an ARDL specification.",
      "Limitations include monthly resolution, a small sample of 72 observations, omitted variables such as part-loading efficiency penalties, and structural changes such as the Large Combustion Plant Directive and CPS changes.",
    ],
    details: [
      {
        title: "Why the price ratio was used",
        body: [
          "The dissertation reflects on using a coal-to-gas price ratio rather than the price differential used by Chyong et al.",
          "At hourly resolution, a price differential more directly reflects dispatch decisions. Across a multi-year period with changing underlying price levels, a differential can overweight high-price periods, so the ratio was selected.",
        ],
      },
    ],
  },
  {
    id: "conclusion",
    eyebrow: "Chapter 6",
    title: "Conclusion and future work",
    summary:
      "The dissertation identifies a reliable 2009-2014 relationship between the coal-to-gas price ratio and British short-run MEFs, but further work is required for current systems.",
    body: [
      "The headline specification achieves adjusted R2 = 0.845 and recovers 68 of 71 observed MEFs within the 95% prediction interval. This supports the claim that the fuel-price to MEF mechanism can be modelled from market data.",
      "The predictive test establishes a foundation for tractable predictive MEF methods, with rolling and recursive 2014 predictions inside Hawkes's +/- 10% accuracy band.",
      "Future work must address the UK's 2021 ETS transition, which challenges price exogeneity, and the 2024 coal phase-out, which invalidates the coal-gas two-fuel marginal structure. Higher-resolution daily data would also help test cubic curvature and a possible gas-saturation turning point.",
    ],
    takeaways: [
      "The method is promising, but not a plug-and-play model for the post-coal British system.",
      "The headline mechanism is expected to remain useful, but the independent variable must be reformulated for the current marginal mix.",
    ],
  },
];

export const equations: Equation[] = [
  {
    id: "srmc",
    title: "Short-run marginal cost",
    latex:
      "SRMC_i = \\frac{FP_i + (EI_i \\cdot CP)}{\\omega_i}, \\quad i \\in \\{\\text{coal}, \\text{gas}\\}",
    explanation:
      "Fuel and carbon costs divided by plant efficiency determine each fuel type's position in the merit order.",
    source: "Equation 3.1",
    variables: [
      {
        symbol: "SRMC_i",
        label: "Short-run marginal cost",
        description: "Cost used to rank generator i in the dispatch merit order.",
      },
      {
        symbol: "FP_i",
        label: "Fuel price",
        description: "Fuel price for fuel i.",
        unit: "GBP/kWh in the empirical conversion",
      },
      {
        symbol: "EI_i",
        label: "Emissions intensity",
        description: "Carbon intensity for fuel type i.",
        unit: "kg CO2 eq/kWh",
      },
      {
        symbol: "CP",
        label: "Carbon price",
        description: "Carbon price from the CPS and EU ETS.",
        unit: "GBP/tCO2 before conversion",
      },
      {
        symbol: "\\omega_i",
        label: "Thermal efficiency",
        description: "Plant efficiency for fuel i.",
      },
    ],
  },
  {
    id: "price-ratio",
    title: "Coal-to-gas price ratio",
    latex:
      "PR_t = \\frac{FP_{\\text{coal},t} + CP_{\\text{coal},t}}{FP_{\\text{gas},t} + CP_{\\text{gas},t}}",
    explanation:
      "The independent variable combines fuel and carbon costs for coal and gas into one relative price signal.",
    source: "Equation 4.1",
    variables: [
      {
        symbol: "PR_t",
        label: "Price ratio",
        description: "Coal-to-gas price ratio at month t.",
      },
      {
        symbol: "FP_{coal,t}",
        label: "Coal fuel price",
        description: "Monthly coal benchmark price after conversion to GBP/kWh.",
      },
      {
        symbol: "CP_{coal,t}",
        label: "Coal carbon cost",
        description: "Fuel-specific carbon cost for coal.",
      },
      {
        symbol: "FP_{gas,t}",
        label: "Gas fuel price",
        description: "Monthly NBP gas benchmark price after conversion to GBP/kWh.",
      },
      {
        symbol: "CP_{gas,t}",
        label: "Gas carbon cost",
        description: "Fuel-specific carbon cost for gas.",
      },
    ],
  },
  {
    id: "bic",
    title: "Bayesian Information Criterion",
    latex: "BIC = k\\ln(n) - 2\\ln(\\hat{L})",
    explanation:
      "BIC is used to compare model fit against complexity. Lower, more negative values are preferred.",
    source: "Equation 4.2",
    variables: [
      {
        symbol: "k",
        label: "Parameters",
        description: "Number of estimated parameters in the model.",
      },
      {
        symbol: "n",
        label: "Sample size",
        description: "Number of observations used by the model.",
      },
      {
        symbol: "\\hat{L}",
        label: "Maximum likelihood estimate",
        description: "The fitted likelihood value used in the BIC calculation.",
      },
    ],
  },
  {
    id: "model-d",
    title: "Headline Model D",
    latex:
      "MEF_t = \\epsilon_0 + \\epsilon_1 PR_t + \\epsilon_2 PR_t^2 + \\epsilon_3 t + \\epsilon_4 CPS\\_slope_t + \\vartheta MEF_{t-1} + \\epsilon_5 D\\_2009_t + \\varpi_t",
    explanation:
      "Model D combines the quadratic price ratio with an ARDL(1,0) lag and structural controls.",
    source: "Equation 4.6",
    variables: [
      {
        symbol: "MEF_t",
        label: "Marginal emissions factor",
        description: "Monthly short-run marginal emissions factor at month t.",
        unit: "kg CO2 eq/kWh",
      },
      {
        symbol: "PR_t",
        label: "Centred price ratio",
        description: "Mean-centred coal-to-gas price ratio.",
      },
      {
        symbol: "t",
        label: "Trend",
        description: "Monthly trend control.",
      },
      {
        symbol: "CPS_slope_t",
        label: "CPS slope shift",
        description: "Post-April 2013 trend-shift dummy for Carbon Price Support.",
      },
      {
        symbol: "MEF_{t-1}",
        label: "Lagged MEF",
        description: "Previous month's MEF, used to capture system lag.",
      },
      {
        symbol: "D_2009_t",
        label: "2009 break control",
        description: "Post-January 2010 intercept-shift dummy.",
      },
      {
        symbol: "\\varpi_t",
        label: "HAC-adjusted error",
        description: "Regression error term with HAC inference.",
      },
    ],
  },
  {
    id: "immediate-effect",
    title: "Immediate marginal effect",
    latex:
      "Immediate(PR_t) = \\left.\\frac{\\partial MEF_t}{\\partial PR_t}\\right|_{PR_t} = \\epsilon_1 + 2\\epsilon_2 PR_t",
    explanation:
      "The within-period MEF response to a change in the centred price ratio, holding lagged MEF fixed.",
    source: "Equation 4.7",
    variables: [
      {
        symbol: "\\partial MEF_t / \\partial PR_t",
        label: "Immediate derivative",
        description: "Change in current MEF for a current price-ratio change.",
      },
      {
        symbol: "\\epsilon_1",
        label: "Linear price-ratio coefficient",
        description: "Estimated linear effect of the centred price ratio.",
      },
      {
        symbol: "\\epsilon_2",
        label: "Quadratic coefficient",
        description: "Estimated curvature of the centred price-ratio relationship.",
      },
    ],
  },
  {
    id: "steady-state-effect",
    title: "Steady-state marginal effect",
    latex:
      "Steady\\text{-}state(PR) = \\left.\\frac{\\partial MEF^*}{\\partial PR}\\right|_{PR} = \\frac{\\epsilon_1 + 2\\epsilon_2 PR}{1 - \\vartheta}",
    explanation:
      "The total response after system lag has resolved, obtained by imposing the steady-state condition on the lagged dependent variable.",
    source: "Equation 4.8 and Appendix A.6",
    variables: [
      {
        symbol: "MEF^*",
        label: "Steady-state MEF",
        description: "Equilibrium MEF after the lagged response has resolved.",
      },
      {
        symbol: "\\vartheta",
        label: "Lag coefficient",
        description: "Coefficient on lagged MEF. Model D estimates it as 0.245.",
      },
      {
        symbol: "1 - \\vartheta",
        label: "Lag scaling denominator",
        description: "Transforms the immediate response into the steady-state response.",
      },
    ],
  },
  {
    id: "hac-lag",
    title: "Newey-West automatic lag length",
    latex: "L = 4(n / 100)^{2/9}",
    explanation:
      "The automatic rule gives a HAC lag length of L = 3 for n = 72 and n = 71.",
    source: "Appendix A.5, Equation A.1",
    variables: [
      {
        symbol: "L",
        label: "HAC lag length",
        description: "Lag length used for Newey-West HAC standard errors.",
      },
      {
        symbol: "n",
        label: "Sample size",
        description: "Number of monthly observations in the model.",
      },
    ],
  },
];

export const tables: TableDataset[] = [
  {
    id: "summary-statistics",
    title: "Summary statistics for analysis dataset",
    description: "Monthly analysis dataset covering 2009-2014.",
    source: "Table 4.1",
    columns: [
      { key: "variable", label: "Variable" },
      { key: "units", label: "Units" },
      { key: "mean", label: "Mean", numeric: true },
      { key: "sd", label: "SD", numeric: true },
      { key: "min", label: "Min", numeric: true },
      { key: "max", label: "Max", numeric: true },
      { key: "n", label: "N", numeric: true },
    ],
    rows: [
      {
        variable: "MEF",
        units: "kg CO2 eq/kWh",
        mean: 0.576,
        sd: 0.0692,
        min: 0.4585,
        max: 0.7331,
        n: 72,
      },
      {
        variable: "Coal price (API 2 + carbon)",
        units: "GBP/kWh",
        mean: 0.0186,
        sd: 0.0034,
        min: 0.0119,
        max: 0.0259,
        n: 72,
      },
      {
        variable: "Gas price (NBP + carbon)",
        units: "GBP/kWh",
        mean: 0.0221,
        sd: 0.0041,
        min: 0.013,
        max: 0.0281,
        n: 72,
      },
      {
        variable: "Coal/gas ratio (incl. carbon)",
        units: "ratio",
        mean: 0.8763,
        sd: 0.2476,
        min: 0.4664,
        max: 1.461,
        n: 72,
      },
    ],
    notes: [
      "Data from Thomson et al., Investing.com, HMRC, DUKES, and a commercially confidential source, as cited in the dissertation.",
    ],
  },
  {
    id: "model-d-diagnostics",
    title: "Model D diagnostic test results",
    description: "Headline model diagnostic statistics.",
    source: "Table 4.2",
    columns: [
      { key: "diagnostic", label: "Diagnostic" },
      { key: "value", label: "Value", numeric: true },
      { key: "pValue", label: "p-value" },
      { key: "interpretation", label: "Interpretation" },
    ],
    rows: [
      {
        diagnostic: "Sample size (n)",
        value: 71,
        pValue: "",
        interpretation: "One observation lost to lagged dependent variable.",
      },
      {
        diagnostic: "Parameters (k)",
        value: 7,
        pValue: "",
        interpretation: "Model D parameter count.",
      },
      {
        diagnostic: "Adjusted R2",
        value: 0.8452,
        pValue: "",
        interpretation: "Strong explanatory power for monthly MEFs.",
      },
      {
        diagnostic: "BIC",
        value: -286.8,
        pValue: "",
        interpretation: "Lower than Model C by 6.1 points.",
      },
      {
        diagnostic: "F-statistic",
        value: 64.68,
        pValue: "<0.001",
        interpretation: "Overall model significance.",
      },
      {
        diagnostic: "Breusch-Pagan",
        value: 3.108,
        pValue: "0.795",
        interpretation: "Heteroskedasticity null is not rejected.",
      },
      {
        diagnostic: "Breusch-Godfrey LM(1)",
        value: 3.273,
        pValue: "0.070",
        interpretation: "Residual autocorrelation is marginal at one lag.",
      },
    ],
  },
  {
    id: "model-d-coefficients",
    title: "Model D regression results",
    description: "HAC standard errors and confidence intervals for the headline model.",
    source: "Table 4.3",
    columns: [
      { key: "variable", label: "Variable" },
      { key: "coefficient", label: "Coef.", numeric: true },
      { key: "hacSe", label: "HAC SE", numeric: true },
      { key: "tStat", label: "t-stat", numeric: true },
      { key: "pValue", label: "p-value" },
      { key: "ciLower", label: "95% CI lower", numeric: true },
      { key: "ciUpper", label: "95% CI upper", numeric: true },
      { key: "significance", label: "Significance" },
    ],
    rows: [
      {
        variable: "Constant (epsilon_0)",
        coefficient: 0.5094,
        hacSe: 0.0511,
        tStat: 9.97,
        pValue: "<0.001",
        ciLower: 0.4073,
        ciUpper: 0.6115,
        significance: "p < 0.01",
      },
      {
        variable: "PR_t (epsilon_1)",
        coefficient: 0.1022,
        hacSe: 0.0287,
        tStat: 3.56,
        pValue: "<0.001",
        ciLower: 0.0448,
        ciUpper: 0.1596,
        significance: "p < 0.01",
      },
      {
        variable: "PR_t^2 (epsilon_2)",
        coefficient: -0.2564,
        hacSe: 0.0515,
        tStat: -4.97,
        pValue: "<0.001",
        ciLower: -0.3594,
        ciUpper: -0.1534,
        significance: "p < 0.01",
      },
      {
        variable: "Trend (epsilon_3)",
        coefficient: -0.0006,
        hacSe: 0.0007,
        tStat: -0.94,
        pValue: "0.353",
        ciLower: -0.0019,
        ciUpper: 0.0007,
        significance: "n.s.",
      },
      {
        variable: "CPS_slope (epsilon_4)",
        coefficient: -0.0035,
        hacSe: 0.0016,
        tStat: -2.22,
        pValue: "0.030",
        ciLower: -0.0067,
        ciUpper: -0.0004,
        significance: "p < 0.05",
      },
      {
        variable: "D_2009 (epsilon_5)",
        coefficient: -0.0307,
        hacSe: 0.0187,
        tStat: -1.64,
        pValue: "0.106",
        ciLower: -0.068,
        ciUpper: 0.0066,
        significance: "n.s.",
      },
      {
        variable: "MEF_t-1 (theta)",
        coefficient: 0.245,
        hacSe: 0.0789,
        tStat: 3.11,
        pValue: "0.003",
        ciLower: 0.0875,
        ciUpper: 0.4026,
        significance: "p < 0.01",
      },
    ],
  },
  {
    id: "marginal-effects",
    title: "Marginal effects of price ratio on MEF",
    description: "Immediate and steady-state derivatives evaluated at selected centred price-ratio values.",
    source: "Table 4.4",
    columns: [
      { key: "reference", label: "PR evaluated at" },
      { key: "centredPr", label: "Centred PR", numeric: true },
      { key: "immediate", label: "Immediate dMEF/dPR", numeric: true },
      { key: "immediateSe", label: "Immediate HAC SE", numeric: true },
      { key: "steady", label: "Steady-state dMEF/dPR", numeric: true },
      { key: "steadySe", label: "Steady-state HAC SE", numeric: true },
      { key: "significance", label: "Significance" },
    ],
    rows: [
      {
        reference: "25th percentile",
        centredPr: -0.234,
        immediate: 0.222,
        immediateSe: 0.0473,
        steady: 0.294,
        steadySe: 0.0634,
        significance: "p < 0.01",
      },
      {
        reference: "Mean",
        centredPr: 0,
        immediate: 0.1022,
        immediateSe: 0.0287,
        steady: 0.1354,
        steadySe: 0.0369,
        significance: "p < 0.01",
      },
      {
        reference: "75th percentile",
        centredPr: 0.187,
        immediate: 0.0064,
        immediateSe: 0.023,
        steady: 0.0085,
        steadySe: 0.0303,
        significance: "n.s.",
      },
    ],
  },
  {
    id: "model-selection",
    title: "Model comparison diagnostics",
    description: "Diagnostics for Models A, B2, B3, B4, C, and E-lagged.",
    source: "Table A.5",
    columns: [
      { key: "model", label: "Model" },
      { key: "n", label: "n", numeric: true },
      { key: "r2", label: "R2", numeric: true },
      { key: "adjR2", label: "Adj. R2", numeric: true },
      { key: "bic", label: "BIC", numeric: true },
      { key: "dw", label: "DW" },
      { key: "bg", label: "BG LM(1)" },
      { key: "bp", label: "BP" },
    ],
    rows: [
      { model: "A", n: 72, r2: 0.7983, adjR2: 0.7863, bic: -275.19, dw: "1.276", bg: "", bp: "11.819 [0.019]" },
      { model: "B2", n: 72, r2: 0.8393, adjR2: 0.8271, bic: -287.27, dw: "1.316", bg: "", bp: "4.398 [0.494]" },
      { model: "B3", n: 72, r2: 0.8393, adjR2: 0.8245, bic: -283, dw: "1.319", bg: "", bp: "4.766 [0.574]" },
      { model: "B4", n: 72, r2: 0.8449, adjR2: 0.8279, bic: -281.27, dw: "1.408", bg: "", bp: "7.427 [0.386]" },
      { model: "C", n: 71, r2: 0.8348, adjR2: 0.8221, bic: -280.1, dw: "", bg: "0.729 [0.393]", bp: "7.483 [0.187]" },
      { model: "E-lagged", n: 71, r2: 0.8647, adjR2: 0.8448, bic: -277.24, dw: "", bg: "3.273 [0.063]", bp: "3.897 [0.918]" },
    ],
  },
  {
    id: "stationarity",
    title: "Stationarity and structural break tests",
    description: "ADF, KPSS, ZA, and QA test results for the MEF and price-ratio series.",
    source: "Table A.2",
    columns: [
      { key: "variable", label: "Variable" },
      { key: "spec", label: "Spec." },
      { key: "adf", label: "ADF" },
      { key: "kpss", label: "KPSS" },
      { key: "za", label: "ZA" },
      { key: "qa", label: "QA" },
      { key: "conclusion", label: "Conclusion" },
    ],
    rows: [
      { variable: "MEF", spec: "Levels", adf: "-1.222", kpss: "1.182***", za: "", qa: "", conclusion: "Non-stationary" },
      { variable: "MEF", spec: "+ Trend", adf: "-5.391***", kpss: "0.115", za: "", qa: "9.48*", conclusion: "Trend-stationary" },
      { variable: "Price Ratio", spec: "Levels", adf: "-1.623", kpss: "0.760***", za: "", qa: "", conclusion: "Non-stationary" },
      { variable: "Price Ratio", spec: "+ Trend", adf: "-2.321", kpss: "0.207**", za: "-6.285***", qa: "69.47***", conclusion: "Trend-stationary with breaks" },
    ],
  },
  {
    id: "efficiency-penalties",
    title: "Efficiency-curve exclusion validation",
    description: "Appendix validation of the simplifying assumption excluding efficiency curves.",
    source: "Table A.1",
    columns: [
      { key: "metric", label: "Metric" },
      { key: "coal", label: "Coal", numeric: true },
      { key: "ccgt", label: "CCGT", numeric: true },
    ],
    rows: [
      { metric: "Total output (kWh)", coal: 1298250000000, ccgt: 1355870000000 },
      { metric: "Average Carbon Intensity (kg CO2 eq/kWh)", coal: 0.9776, ccgt: 0.4181 },
      { metric: "Total CO2 emissions, no efficiency curve (t CO2 eq)", coal: 1269165553, ccgt: 566887392 },
      { metric: "Total CO2 emissions, with efficiency curve (t CO2 eq)", coal: 1288774401, ccgt: 558104664 },
      { metric: "Percentage difference (%)", coal: -1.5215, ccgt: 1.5737 },
    ],
  },
  {
    id: "predictive-training",
    title: "Predictive training-sample coefficients",
    description: "Model D re-estimated on the 2009-2013 training sub-sample.",
    source: "Table A.6",
    columns: [
      { key: "variable", label: "Variable" },
      { key: "coefficient", label: "Coef.", numeric: true },
      { key: "hacSe", label: "HAC SE", numeric: true },
      { key: "pValue", label: "p-value" },
      { key: "delta", label: "Delta vs full sample" },
    ],
    rows: [
      { variable: "Constant", coefficient: 0.4955, hacSe: 0.053, pValue: "<0.001", delta: "-0.0139" },
      { variable: "PR_t", coefficient: 0.1317, hacSe: 0.0323, pValue: "<0.001", delta: "+0.0295" },
      { variable: "PR_t^2", coefficient: -0.2833, hacSe: 0.0556, pValue: "<0.001", delta: "-0.0269" },
      { variable: "Trend", coefficient: -0.0002, hacSe: 0.0007, pValue: "0.826", delta: "+0.0004" },
      { variable: "CPS_slope", coefficient: -0.0029, hacSe: 0.0021, pValue: "0.164", delta: "+0.0006" },
      { variable: "D_2009", coefficient: -0.0341, hacSe: 0.019, pValue: "0.079", delta: "-0.0034" },
      { variable: "MEF_t-1", coefficient: 0.2518, hacSe: 0.0829, pValue: "0.004", delta: "+0.0068" },
    ],
  },
  {
    id: "sap-robustness",
    title: "Model D robustness using SAP gas benchmark",
    description: "Regression coefficients under the System Average Price benchmark.",
    source: "Table A.7",
    columns: [
      { key: "variable", label: "Variable" },
      { key: "coefficient", label: "Coef.", numeric: true },
      { key: "hacSe", label: "HAC SE", numeric: true },
      { key: "pValue", label: "p-value" },
      { key: "ciLower", label: "95% CI lower", numeric: true },
      { key: "ciUpper", label: "95% CI upper", numeric: true },
    ],
    rows: [
      { variable: "Constant", coefficient: 0.4912, hacSe: 0.0684, pValue: "<0.001", ciLower: 0.3545, ciUpper: 0.628 },
      { variable: "PR_t", coefficient: 0.1156, hacSe: 0.0286, pValue: "0.001", ciLower: 0.0586, ciUpper: 0.1727 },
      { variable: "PR_t^2", coefficient: -0.1344, hacSe: 0.0534, pValue: "0.014", ciLower: -0.2411, ciUpper: -0.0277 },
      { variable: "Trend", coefficient: -0.0005, hacSe: 0.0006, pValue: "0.384", ciLower: -0.0018, ciUpper: 0.0007 },
      { variable: "CPS_slope", coefficient: -0.0036, hacSe: 0.0015, pValue: "0.022", ciLower: -0.0067, ciUpper: -0.0006 },
      { variable: "D_2009", coefficient: -0.0164, hacSe: 0.0159, pValue: "0.306", ciLower: -0.0482, ciUpper: 0.0154 },
      { variable: "MEF_t-1", coefficient: 0.2404, hacSe: 0.0968, pValue: "0.016", ciLower: 0.0471, ciUpper: 0.4337 },
    ],
  },
];

export const charts: ChartSpec[] = [
  {
    id: "period-mefs",
    title: "Sub-period MEFs from Thomson et al.",
    description:
      "MEFs reported in the mechanism chapter show lower values when coal was cheaper than gas and gas moved to the margin.",
    primaryLabel: "Period",
    secondaryLabel: "MEF (kg CO2/kWh)",
    type: "bar",
    data: [
      {
        label: "MEF",
        data: [
          { primary: "2010", secondary: 0.635, note: "Gas cheaper than coal" },
          { primary: "2012", secondary: 0.548, note: "Coal cheaper than gas" },
          { primary: "2014", secondary: 0.504, note: "Coal cheaper than gas" },
        ],
      },
    ],
    source: "Section 3.2",
  },
  {
    id: "generation-mix",
    title: "British generation mix noted for 2014",
    description:
      "The dissertation uses the dominance of coal and gas in the marginal mix to justify a two-fuel price-ratio specification.",
    primaryLabel: "Fuel group",
    secondaryLabel: "Share of total generation (%)",
    type: "bar",
    data: [
      {
        label: "Share",
        data: [
          { primary: "Coal + gas", secondary: 59.3 },
          { primary: "Nuclear", secondary: 19 },
          { primary: "Renewables", secondary: 19.2 },
          { primary: "Oil and other", secondary: 2.5 },
        ],
      },
    ],
    source: "Section 3.2, citing UK energy statistics",
  },
  {
    id: "model-fit",
    title: "Adjusted R2 across candidate models",
    description:
      "Model D is discussed as the selected headline model because it combines non-linearity and lag while satisfying diagnostics.",
    primaryLabel: "Model",
    secondaryLabel: "Adjusted R2",
    type: "bar",
    data: [
      {
        label: "Adjusted R2",
        data: [
          { primary: "A", secondary: 0.7863 },
          { primary: "B2", secondary: 0.8271 },
          { primary: "B3", secondary: 0.8245 },
          { primary: "B4", secondary: 0.8279 },
          { primary: "C", secondary: 0.8221 },
          { primary: "D", secondary: 0.8452 },
          { primary: "E", secondary: 0.8448 },
        ],
      },
    ],
    source: "Tables 4.2 and A.5",
  },
  {
    id: "coefficients",
    title: "Model D coefficient estimates",
    description:
      "The positive linear term and negative quadratic term create the concave price-ratio relationship.",
    primaryLabel: "Coefficient",
    secondaryLabel: "Estimate",
    type: "bar",
    data: [
      {
        label: "Coefficient",
        data: [
          { primary: "Constant", secondary: 0.5094 },
          { primary: "PR_t", secondary: 0.1022 },
          { primary: "PR_t^2", secondary: -0.2564 },
          { primary: "Trend", secondary: -0.0006 },
          { primary: "CPS_slope", secondary: -0.0035 },
          { primary: "D_2009", secondary: -0.0307 },
          { primary: "MEF_t-1", secondary: 0.245 },
        ],
      },
    ],
    source: "Table 4.3",
  },
  {
    id: "marginal-effects-chart",
    title: "Effect of a 0.1 unit price-ratio increase",
    description:
      "The dissertation explains Table 4.4 by scaling the derivative to a 0.1 unit price-ratio increase.",
    primaryLabel: "Evaluation point",
    secondaryLabel: "MEF change (kg CO2 eq/kWh)",
    type: "bar",
    data: [
      {
        label: "Immediate",
        data: [
          { primary: "25th PR", secondary: 0.0222 },
          { primary: "Mean PR", secondary: 0.01022 },
          { primary: "75th PR", secondary: 0.00064 },
        ],
      },
      {
        label: "Steady-state",
        data: [
          { primary: "25th PR", secondary: 0.0294 },
          { primary: "Mean PR", secondary: 0.01354 },
          { primary: "75th PR", secondary: 0.00085 },
        ],
      },
    ],
    source: "Table 4.4 and Section 4.3.2",
  },
  {
    id: "predictive-performance",
    title: "Out-of-sample 2014 predictive RMSE",
    description:
      "Both predictive tests stay within Hawkes's +/- 10% benchmark, while revealing sensitivity to the April 2014 CPS step change.",
    primaryLabel: "Prediction method",
    secondaryLabel: "RMSE (% of 2014 mean MEF)",
    type: "bar",
    data: [
      {
        label: "RMSE",
        data: [
          { primary: "Recursive", secondary: 6.8, note: "0.034 kgCO2 eq/kWh; 12/12 in 95% PI" },
          { primary: "Rolling/dynamic", secondary: 8.4, note: "0.042 kgCO2 eq/kWh; 11/12 in 95% PI" },
        ],
      },
    ],
    source: "Section 4.3.3",
  },
  {
    id: "efficiency-validation-chart",
    title: "Efficiency-curve impact in appendix validation",
    description:
      "The appendix reports approximately 1.5% difference in total emissions when efficiency curves are included.",
    primaryLabel: "Fuel",
    secondaryLabel: "Difference (%)",
    type: "bar",
    data: [
      {
        label: "Percentage difference",
        data: [
          { primary: "Coal", secondary: -1.5215 },
          { primary: "CCGT", secondary: 1.5737 },
        ],
      },
    ],
    source: "Table A.1",
  },
];

export const figures: FigureAsset[] = [
  {
    id: "carbon-cost",
    title: "Daily carbon cost comparison",
    caption: "Daily carbon cost comparison for coal and CCGT generation in Great Britain.",
    src: "/extracted-figures/page-12-image-1.png",
    alt: "Extracted dissertation figure showing daily carbon cost comparison for coal and CCGT generation.",
    source: "Figure 2.1",
  },
  {
    id: "monthly-mef-prices",
    title: "Monthly MEF and coal and gas prices",
    caption: "Monthly MEF and coal and gas prices.",
    src: "/extracted-figures/page-20-image-1.png",
    alt: "Extracted dissertation time series figure for monthly MEF and coal and gas prices.",
    source: "Figure 4.1",
    note: "The raw monthly values behind this plot are not printed in the PDF.",
  },
  {
    id: "monthly-price-ratio",
    title: "Monthly MEF and coal and gas price ratio",
    caption: "Monthly MEF and coal and gas price ratio.",
    src: "/extracted-figures/page-20-image-2.png",
    alt: "Extracted dissertation time series figure for monthly MEF and coal to gas price ratio.",
    source: "Figure 4.2",
    note: "The raw monthly values behind this plot are not printed in the PDF.",
  },
  {
    id: "model-d-vs-mef",
    title: "Model D vs observed MEF",
    caption: "Model D vs MEF from Thomson et al.",
    src: "/extracted-figures/page-25-image-1.png",
    alt: "Extracted dissertation figure comparing Model D predictions with Thomson et al. MEF values.",
    source: "Figure 4.3",
    note: "The chart image is preserved because the month-level fitted values are not tabulated in the PDF.",
  },
  {
    id: "marginal-impact-figure",
    title: "Marginal impacts of centred price ratio",
    caption: "Marginal impacts of the centred price ratio on MEFs.",
    src: "/extracted-figures/page-27-image-1.png",
    alt: "Extracted dissertation figure showing marginal impacts of the centred price ratio on MEFs.",
    source: "Figure 4.4",
  },
  {
    id: "predictive-results",
    title: "Out-of-sample predictive results",
    caption: "Out-of-sample predictive results for 2014.",
    src: "/extracted-figures/page-29-image-1.png",
    alt: "Extracted dissertation figure showing out-of-sample predictive results.",
    source: "Figure 4.5",
    note: "The plotted monthly predictions are not printed as a table in the PDF.",
  },
  {
    id: "sap-nbp",
    title: "SAP vs NBP robustness",
    caption: "SAP vs NBP regression results.",
    src: "/extracted-figures/page-30-image-1.png",
    alt: "Extracted dissertation figure comparing SAP and NBP regression results.",
    source: "Figure 4.6",
  },
  {
    id: "api-dukes",
    title: "API 2 vs DUKES coal price data",
    caption: "Quarterly coal fuel price comparison between API 2 data and DUKES Table 3.2.1.",
    src: "/extracted-figures/page-38-image-1.png",
    alt: "Extracted appendix figure comparing API 2 and DUKES coal price data.",
    source: "Figure A.1",
  },
];

export const references: Reference[] = [
  { id: 1, citation: "Department for Business, Energy and Industrial Strategy. The Climate Change Act 2008 (2050 Target Amendment) Order 2019, 2019.", url: "https://www.legislation.gov.uk/uksi/2019/1056/memorandum/contents" },
  { id: 2, citation: "Nuala Burnett, Iona Steward, and Thomas Hewitt. The UK's plans and progress to reach net zero by 2050. House of Commons Library, 2026.", url: "https://researchbriefings.files.parliament.uk/documents/CBP-9888/CBP-9888.pdf" },
  { id: 3, citation: "Sarah Keay-Bright, Danial Sturge, George Day, Nicholas Rubin, and Peter Frampton. Accurately tracking carbon in electricity markets. Energy Systems Catapult and ELEXON, 2021.", url: "https://es.catapult.org.uk/report/accurately-tracking-carbon-in-electricity-markets/" },
  { id: 4, citation: "A. D. Hawkes. Estimating marginal CO2 emissions rates for national electricity systems. Energy Policy, 38:5977-5987, 2010.", url: "https://www.sciencedirect.com/science/article/pii/S0301421510004246" },
  { id: 5, citation: "R. Camilla Thomson, Gareth P. Harrison, and John P. Chick. Marginal greenhouse gas emissions displacement of wind power in Great Britain. Energy Policy, 101:201-210, 2017.", url: "https://www.sciencedirect.com/science/article/pii/S0301421516306036" },
  { id: 6, citation: "Chi-Kong Chyong, Bowei Guo, and David Newbery. The impact of a carbon tax on the CO2 emissions reduction of wind. 2019.", url: "https://www.econ.cam.ac.uk/publications/cwpe/1904" },
  { id: 7, citation: "Julian Huber, Kai Lohmann, Marc Schmidt, and Christof Weinhardt. Carbon efficient smart charging using forecasts of marginal emission factors. Journal of Cleaner Production, 284:124766, 2021.", url: "https://www.sciencedirect.com/science/article/pii/S0959652620348101" },
  { id: 8, citation: "Kenneth Leerbeck, Peder Bacher, Rune Gronborg Junker, Goran Goranovic, Olivier Corradi, Razgar Ebrahimy, Anna Tveit, and Henrik Madsen. Short-term forecasting of CO2 emission intensity in power grids by machine learning. Applied Energy, 277:115527, 2020.", url: "https://www.sciencedirect.com/science/article/pii/S0306261920310394" },
  { id: 9, citation: "Kyle Siler-Evans, Ines Lima Azevedo, and M. Granger Morgan. Marginal emissions factors for the U.S. electricity system. Environmental Science and Technology, 46:4742-4748, 2012.", url: "https://pubs.acs.org/doi/10.1021/es300145v" },
  { id: 10, citation: "Alejandro G.N. Elenes, Eric Williams, Eric Hittinger, and Naga Srujana Goteti. How well do emission factors approximate emission changes from electricity system models? Environmental Science and Technology, 56:14701-14712, 2022.", url: "https://pubmed.ncbi.nlm.nih.gov/36153999/" },
  { id: 11, citation: "Defra. Environmental reporting guidelines. 2019.", url: "https://assets.publishing.service.gov.uk/media/67161e8696def6d27a4c9ab3/environmental-reporting-guidance-secr-march-2019.pdf" },
  { id: 12, citation: "Sustainability Directory. What is the difference between the short-run and long-run marginal grid mix?", url: "https://lifestyle.sustainability-directory.com/learn/what-is-the-difference-between-theshort-run-and-long-run-marginal-grid-mix/" },
  { id: 13, citation: "A. D. Hawkes. Long-run marginal CO2 emissions factors in national electricity systems. Applied Energy, 125:197-205, 2014.", url: "https://doi.org/10.1016/j.apenergy.2014.03.060" },
  { id: 14, citation: "Open Electricity Economics. The price and value of electricity.", url: "http://open-electricity-economics.org/book/text/04.html" },
  { id: 15, citation: "Ofgem/DTI. BETTA user guide. Ofgem, 2005.", url: "https://www.ofgem.gov.uk/sites/default/files/docs/2005/02/9549-2605.pdf" },
  { id: 16, citation: "National Energy System Operator. Balancing Code 2. NESO, 2024.", url: "https://www.neso.energy/document/33881/download" },
  { id: 17, citation: "National Energy System Operator. What is the balancing mechanism?, 2026.", url: "https://www.neso.energy/what-we-do/systems-operations/what-balancing-mechanism" },
  { id: 18, citation: "Chi-Kong Chyong and David Newbery. A unit commitment and economic dispatch model of the GB electricity market. Energy Policy, 170:113213, 2022.", url: "https://www.sciencedirect.com/science/article/pii/S0301421522004323" },
  { id: 19, citation: "J. M. Clancy, F. Gaffney, J. P. Deane, J. Curtis, and B. P. O Gallachoir. Fossil fuel and CO2 emissions savings on a high renewable electricity system. Energy Policy, 83:151-164, 2015.", url: "https://www.sciencedirect.com/science/article/pii/S0301421515001536" },
  { id: 20, citation: "Carbon emissions futures historical data. Investing.com, 2026.", url: "https://www.investing.com/commodities/carbon-emissions-historical-data" },
  { id: 21, citation: "EUR/GBP historical data. Investing.com, 2026.", url: "https://www.investing.com/currencies/eur-gbp-historical-data" },
  { id: 22, citation: "Environmental taxes bulletin historical rates. GOV.UK, 2025.", url: "https://www.gov.uk/government/statistics/environmental-taxes-bulletin/environmental-taxes-bulletin-historical-rates" },
  { id: 23, citation: "European Commission. Report on the functioning of the European carbon market in 2023, 2024.", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex:52024DC0538" },
  { id: 24, citation: "David Hirst and Matthew Keep. Carbon price floor and the price support mechanism. House of Commons Library, 2018.", url: "https://researchbriefings.files.parliament.uk/documents/SN05927/SN05927.pdf" },
  { id: 25, citation: "Malte Jansen, Iain Staffell, and Richard Green. Daily marginal CO2 emissions reductions from wind and solar generation. European Energy Market, 2018.", url: "https://ieeexplore.ieee.org/document/8469873" },
  { id: 26, citation: "Filippo Beltrami, Andrew Burlinson, Monica Giulietti, Luigi Grossi, Paul Rowley, and Grant Wilson. Where did the time (series) go? Energy Economics, 91:104905, 2020.", url: "https://www.sciencedirect.com/science/article/pii/S0140988320302450" },
  { id: 27, citation: "Souhir Ben Amor, Smaranda Sgarciu, Taimyra BatzLineiro, and Felix Muesgens. Advanced models for hourly marginal CO2 emissions factor estimations, 2024.", url: "https://www.researchgate.net/publication/387351317_Advanced_Models_for_Hourly_Marginal_CO2_Emission_Factor_Estimation_A_Synergy_between_Fundamental_and_Statistical_Approaches" },
  { id: 28, citation: "Stephen P. Holland, Matthew J. Kotchen, Erin T. Mansur, and Andrew J. Yates. Why marginal CO2 emissions are not decreasing for US electricity. PNAS, 2022.", url: "https://www.pnas.org/doi/pdf/10.1073/pnas.2116632119" },
  { id: 29, citation: "Sarah Brown and David Jones. European electricity review 2024. Ember, 2024.", url: "https://ember-energy.org/app/uploads/2024/10/European-Electricity-Review-2024.pdf" },
  { id: 30, citation: "I. A. Grant Wilson and Iain Staffell. Rapid fuel switching from coal to natural gas through effective carbon pricing. Nature Energy, 3:365-372, 2018.", url: "https://pure-oai.bham.ac.uk/ws/portalfiles/portal/54358204/Manuscript.pdf" },
  { id: 31, citation: "J. Scott Holladay and Jacob LaRiviere. The impact of cheap natural gas on marginal emissions from electricity generation. Journal of Environmental Economics and Management, 85:205-227, 2017.", url: "https://doi.org/10.1016/j.jeem.2017.06.004" },
  { id: 32, citation: "Iain MacLeay. UK energy statistics, 2014 and Q4 2014. Department of Energy and Climate Change, 2015.", url: "https://assets.publishing.service.gov.uk/media/5a8180f2e5274a2e8ab54578/PN_March_15.pdf" },
  { id: 33, citation: "National Grid Electricity System Operator. Balancing principles statement. 2020.", url: "https://www.neso.energy/document/160986/download" },
  { id: 34, citation: "Dhruv Suri, Jacques de Chalendar, and Ines M. L. Azevedo. Assessing the real implications for CO2 as generation from renewables increases. Nature Communications, 2025.", url: "https://www.nature.com/articles/s41467-025-59800-4" },
  { id: 35, citation: "Investing.com. USD/GBP historical data, 2026.", url: "https://uk.investing.com/currencies/usd-gbp-historical-data" },
  { id: 36, citation: "Department of Business, Energy and Industrial Strategy. Digest of UK energy statistics: Annex A. 2015.", url: "https://www.gov.uk/government/statistics/dukes-calorific-values" },
  { id: 37, citation: "Jeffrey M. Wooldridge. Introductory Econometrics: A Modern Approach. Cengage, 8th edition, 2025.", url: "https://cbpbu.ac.in/userfiles/file/2020/STUDY_MAT/ECO/2.pdf" },
  { id: 38, citation: "David A. Dickey and Wayne A. Fuller. Distribution of the estimators for autoregressive time series with a unit root. Journal of the American Statistical Association, 74:427-431, 1979.", url: "https://www.jstor.org/stable/2286348" },
  { id: 39, citation: "Denis Kwiatkowski, Peter C.B. Phillips, Peter Schmidt, and Yongcheol Shin. Testing the null hypothesis of stationarity. Journal of Econometrics, 54:159-178, 1992.", url: "https://www.sciencedirect.com/science/article/pii/030440769290104Y" },
  { id: 40, citation: "Eric Zivot and Donald W. K. Andrews. Further evidence on the great crash, the oil-price shock, and the unit-root hypothesis. Journal of Business and Economic Statistics, 10:251-270, 1992.", url: "https://www.jstor.org/stable/1391541" },
  { id: 41, citation: "Donald W. K. Andrews. Tests for parameter instability and structural change with unknown change point. Econometrica, 61:821-856, 1993.", url: "https://www.jstor.org/stable/2951764" },
  { id: 42, citation: "Intercontinental Exchange. UK NBP natural gas futures, 2026.", url: "https://www.ice.com/products/910/uk-natural-gas-futures" },
  { id: 43, citation: "Intercontinental Exchange. API 2 Rotterdam coal futures, 2026.", url: "https://www.ice.com/products/243/API2-Rotterdam-Coal-Futures" },
  { id: 44, citation: "Harrison Fell and Daniel T. Kaffine. The fall of coal: Joint impacts of fuel prices and renewables on generation and emissions. American Economic Journal: Economic Policy, 10:90-116, 2018.", url: "https://www.aeaweb.org/articles?id=10.1257/pol.20150321" },
  { id: 45, citation: "Department for Energy Security and Net Zero. Digest of UK energy statistics (DUKES). 2025.", url: "https://www.gov.uk/government/statistics/electricity-chapter-5-digest-of-united-kingdom-energy-statistics-dukes" },
  { id: 46, citation: "Whitney K. Newey and Kenneth D. West. Automatic lag selection in covariance matrix estimation. Review of Economic Studies, 61:631-653, 1994.", url: "https://www.jstor.org/stable/2297912" },
  { id: 47, citation: "Gideon Schwarz. Estimating the dimension of a model. Annals of Statistics, 6:461-464, 1978.", url: "https://projecteuclid.org/journals/annals-of-statistics/volume-6/issue-2/Estimating-the-Dimension-of-a-Model/10.1214/aos/1176344136.full" },
  { id: 48, citation: "Robert E. Kass and Adrian E. Raftery. Bayes factors. Journal of the American Statistical Association, 90:777-796, 1995.", url: "https://www.tandfonline.com/doi/abs/10.1080/01621459.1995.10476572" },
  { id: 49, citation: "Jeffrey M. Wooldridge. Econometric Analysis of Cross Section and Panel Data. MIT Press, 2010.", url: "https://ipcid.org/evaluation/apoio/Wooldridge%20-%20Cross-section%20and%20Panel%20Data.pdf" },
  { id: 50, citation: "Rob Hyndman and George Athanasopoulos. Forecasting: Principles and Practice. OTexts, 3rd edition.", url: "https://otexts.com/fpp2/prediction-intervals.html" },
  { id: 51, citation: "Sophie Brough and Stephen Ashcroft. Large combustion plant directive: running hours during winter 2014/2015 and capacity for 2015/2016. DECC, 2015.", url: "https://assets.publishing.service.gov.uk/media/5a8072c940f0b6230269391e/LCPD.pdf" },
  { id: 52, citation: "Department for Energy Security and Net Zero. UK Emissions Trading Scheme: a policy overview, 2026.", url: "https://www.gov.uk/government/publications/uk-emissions-trading-scheme-uk-ets-policy-overview/uk-emissions-trading-scheme-uk-ets-a-policy-overview" },
  { id: 53, citation: "Frankie Mayo. The UK's journey to a coal power phase-out. Ember, 2024.", url: "https://ember-energy.org/latest-insights/the-uks-journey-to-a-coal-power-phase-out/" },
];
