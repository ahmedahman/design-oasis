/** Company facts, values and people — from the company profile. */

export const CORE_VALUES = [
  { title: "Integrity", detail: "Transparent dealings and ethical partnerships." },
  { title: "Excellence", detail: "Global design standards and execution quality." },
  { title: "Innovation", detail: "Forward-thinking solutions and creative development models." },
  {
    title: "Collaboration",
    detail: "Strong partnerships with clients, investors and stakeholders.",
  },
  { title: "Value creation", detail: "A focus on long-term asset appreciation and returns." },
] as const;

export const MISSION = [
  "Transform land into high-performing real estate assets",
  "Provide risk-mitigated development solutions for landowners and investors",
  "Deliver projects that meet international quality and governance standards",
  "Build long-term value through design innovation, financial clarity and operational excellence",
] as const;

export const VISION =
  "To be a leading real estate development partner in Africa, known for creating iconic, profitable and sustainable developments through design-led thinking and intelligent partnerships.";

export const TEAM = [
  {
    name: "Asmau Sani Shaaban",
    role: "Architectural Engineer & Chief Executive",
    bio: "A graduate of the University of Sharjah, UAE. Asmau leads Design Oasis, and has served as Executive Director of Desadel Nigeria Limited and as a technical partner with Hawksworth.",
    lead: true,
  },
  { name: "Folawale Oladipo", role: "Architect" },
  { name: "Nada Salmanpur", role: "Architect" },
  { name: "Success Festus", role: "Engineer" },
] as const;

export const CORPORATE = [
  { label: "Legal name", value: "Design Oasis Limited" },
  { label: "Operating model", value: "Private limited liability company" },
  { label: "Core markets", value: "Abuja, Lagos, Northern Nigeria" },
  { label: "Head office", value: "6D Osara Lane, Maitama, Abuja" },
] as const;
