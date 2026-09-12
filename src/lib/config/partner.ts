/** The JV story, from the company profile. Config so the page stays markup-thin. */

export const JV_CONTRIBUTIONS = [
  {
    party: "You bring",
    items: ["The land, contributed as equity", "Clean title and documentation"],
  },
  {
    party: "We bring",
    items: [
      "Design leadership",
      "Development planning",
      "Financial modelling",
      "Investor coordination",
      "Project execution and management",
    ],
  },
] as const;

export const RETURN_OPTIONS = [
  {
    title: "Completed units",
    detail:
      "An allocation of finished residential or commercial units, sized against the land's contribution to project value.",
  },
  {
    title: "Profit share",
    detail: "An agreed share of net development profit, paid as the scheme sells or lets down.",
  },
  {
    title: "Fixed cash or hybrid",
    detail:
      "A fixed return, or a smaller fixed sum alongside a reduced profit share, where certainty matters more than upside.",
  },
  {
    title: "Long-term income",
    detail:
      "Under a Build–Operate–Transfer term, a share of operating income for the concession, with the asset returning to you at the end of it.",
  },
] as const;

export const ADVANTAGES = [
  "Strong understanding of land economics and development feasibility",
  "Design creativity combined with financial discipline",
  "Proven experience structuring bankable JV and BOT models",
  "Documentation that stands up to investors and institutions",
  "Local market intelligence with an international design outlook",
] as const;
