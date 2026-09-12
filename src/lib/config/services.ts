/** The three business lines, from the company profile. */
export const SERVICES = [
  {
    id: "development",
    title: "Real Estate Development",
    subtitle: "Joint venture & direct development",
    summary:
      "Design Oasis acts as a development partner, not a consultant — carrying the project from land to completed asset.",
    points: [
      "Landowner–developer joint ventures",
      "Equity-based land contribution models",
      "Profit-sharing and unit-allocation structures",
      "Full lifecycle management, concept to completion",
    ],
  },
  {
    id: "design-build",
    title: "Design & Build",
    subtitle: "Turnkey projects",
    summary:
      "One contract, one point of responsibility, from the first sketch to the handover of keys.",
    points: [
      "End-to-end delivery under single-point responsibility",
      "Cost planning and value engineering",
      "Contractor coordination and construction supervision",
      "Quality control and timeline management",
    ],
  },
  {
    id: "architecture",
    title: "Architecture & Master Planning",
    subtitle: "Design leadership",
    summary:
      "The design practice the rest of the business is built on — from a single villa to a 22-hectare masterplan.",
    points: [
      "Conceptual and schematic design",
      "Urban and estate master planning",
      "Luxury residential, hospitality and mixed-use design",
      "Sustainable and green design integration",
      "3D visualisation, rendering and project branding",
    ],
  },
] as const;
