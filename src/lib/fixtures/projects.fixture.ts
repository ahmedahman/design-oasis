import type { Project } from "@/types/project";

/**
 * Project content seeded from the Design Oasis company profile. The words and
 * facts are real; the photography is placeholder and swaps out here without
 * touching a component.
 *
 * Nothing outside `lib/data/` may import this file.
 */

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PROJECTS_FIXTURE: Project[] = [
  {
    id: "kano-golf-resort",
    slug: "kano-golf-resort",
    title: "Kano Golf Resort",
    location: "Kano State",
    year: "2025",
    sector: "resort",
    status: "IN_DESIGN",
    models: ["BOT", "JV"],
    featured: true,
    summary:
      "A 22-hectare integrated golf and hospitality development structured under a BOT and joint venture framework.",
    body: [
      "Twenty-two hectares outside Kano, planned as a single integrated destination rather than a hotel with a course attached. The masterplan sets a 200-room hotel, an 18-hole championship course, wellness facilities and an events campus on one continuous landscape, so the water strategy, the drainage and the fairway routing are one design decision rather than four.",
      "The commercial structure did as much work as the plan. Land came in as equity under a joint venture; the operating assets sit inside a Build–Operate–Transfer term that returns them to the landowner at the end of the concession. That let the project reach a scale neither party could have financed alone.",
      "Phasing was designed so the hotel and the first nine holes can open and trade while the second phase is still under construction — revenue arrives before the last certificate does.",
    ],
    facts: [
      { label: "Site area", value: "22 hectares" },
      { label: "Keys", value: "200+" },
      { label: "Golf", value: "18 holes" },
      { label: "Structure", value: "BOT + JV" },
    ],
    cover: {
      src: unsplash("1587174486073-ae5e5cff23aa"),
      alt: "Aerial view of a golf course flanked by water and low resort buildings",
    },
    gallery: [
      {
        src: unsplash("1587174486073-ae5e5cff23aa"),
        alt: "Golf course fairway curving between planted mounds",
      },
      {
        src: unsplash("1566073771259-6a8506099945"),
        alt: "Resort hotel frontage at dusk",
        orientation: "portrait",
      },
      {
        src: unsplash("1540541338287-41700207dee6"),
        alt: "Pool terrace looking out across the course",
      },
    ],
    floorPlan: {
      src: unsplash("1503387762-abdf1167b7bf", 2400),
      alt: "Masterplan drawing of the resort showing the hotel, course and wellness campus",
      width: 2400,
      height: 1600,
      hotspots: [
        {
          id: "hotel",
          x: 0.28,
          y: 0.36,
          label: "Hotel",
          detail:
            "200+ keys arranged in two wings around a central arrival court, with the ballroom and conference suites at podium level.",
        },
        {
          id: "clubhouse",
          x: 0.52,
          y: 0.55,
          label: "Clubhouse",
          detail:
            "Pro shop, locker suites and a terrace restaurant sited on the high point so it reads across the first and tenth tees.",
        },
        {
          id: "wellness",
          x: 0.71,
          y: 0.3,
          label: "Wellness",
          detail:
            "Spa, treatment rooms and a 25m lap pool, deliberately set away from the events campus so the two never compete.",
        },
        {
          id: "events",
          x: 0.4,
          y: 0.75,
          label: "Events campus",
          detail:
            "A separable venue with its own access road and parking, so large events never route through the hotel lobby.",
        },
      ],
    },
  },
  {
    id: "central-area-tower",
    slug: "central-area-tower",
    title: "Central Area Tower",
    location: "Central Business District, Abuja",
    year: "2025",
    sector: "mixed-use",
    status: "IN_PROGRESS",
    models: ["JV"],
    featured: true,
    summary:
      "Twelve floors combining an EV showroom, retail, serviced apartments and residences, on a JV with landowner equity participation.",
    body: [
      "A twelve-floor tower in the Central Business District that stacks four different uses and asks each to pay for itself. An electric-vehicle showroom takes the double-height ground plane, retail wraps the first two levels, serviced apartments occupy the middle band and long-stay residences sit at the top where the views are.",
      "Stacking uses this way is a servicing problem before it is an architectural one. Separate cores, separate refuse routes and separate lift banks were fixed at concept stage — retrofitting them later is what makes mixed-use schemes fail commercially.",
      "The landowner participates through equity rather than a land sale, taking allocated units on completion alongside a share of the operating income from the serviced floors.",
    ],
    facts: [
      { label: "Floors", value: "12" },
      { label: "Uses", value: "4" },
      { label: "Structure", value: "JV, landowner equity" },
      { label: "Status", value: "Under construction" },
    ],
    cover: {
      src: unsplash("1486406146926-c627a92ad1ab"),
      alt: "Glass and concrete mixed-use tower seen from street level",
    },
    gallery: [
      {
        src: unsplash("1486406146926-c627a92ad1ab"),
        alt: "Tower facade against an open sky",
        orientation: "portrait",
      },
      {
        src: unsplash("1497366754035-f200968a6e72"),
        alt: "Serviced apartment interior with floor-to-ceiling glazing",
      },
      {
        src: unsplash("1441986300917-64674bd600d8"),
        alt: "Double-height retail frontage at ground level",
      },
    ],
  },
  {
    id: "katampe-villas",
    slug: "katampe-villas",
    title: "Katampe Extension Villas",
    location: "Katampe Extension, Abuja",
    year: "2024",
    sector: "residential",
    status: "COMPLETED",
    models: ["DESIGN_BUILD"],
    featured: true,
    summary:
      "Fully detached villas on premium land, designed around privacy, modern luxury and long-term value appreciation.",
    body: [
      "Fully detached houses on one of the better-held pieces of land in Katampe Extension. The brief was privacy first: every villa is planned so that no principal room looks into a neighbour's, which on a site this tight is a question of orientation and wall placement rather than fencing.",
      "Delivered as a turnkey Design & Build contract — one contract, one point of responsibility, from the first sketch to the handover of keys.",
    ],
    facts: [
      { label: "Type", value: "Fully detached villas" },
      { label: "Delivery", value: "Turnkey" },
      { label: "Completed", value: "2024" },
    ],
    cover: {
      src: unsplash("1613490493576-7fde63acd811"),
      alt: "Contemporary detached villa with a landscaped approach",
    },
    gallery: [
      {
        src: unsplash("1613490493576-7fde63acd811"),
        alt: "Villa exterior at golden hour",
      },
      {
        src: unsplash("1600585154340-be6161a56a0c"),
        alt: "Open-plan living space with full-height glazing",
      },
      {
        src: unsplash("1600566753190-17f0baa2a6c3"),
        alt: "Principal bedroom looking onto a private terrace",
        orientation: "portrait",
      },
    ],
    floorPlan: {
      src: unsplash("1503387762-abdf1167b7bf", 2000),
      alt: "Ground floor plan of the villa type",
      width: 2000,
      height: 1400,
      hotspots: [
        {
          id: "living",
          x: 0.33,
          y: 0.44,
          label: "Living",
          detail:
            "A single open volume opening to the rear terrace, oriented away from the approach so the street never sees into it.",
        },
        {
          id: "kitchen",
          x: 0.6,
          y: 0.34,
          label: "Kitchen",
          detail:
            "Working kitchen with a separate prep scullery and its own service entry, kept off the entertaining route.",
        },
        {
          id: "principal",
          x: 0.72,
          y: 0.66,
          label: "Principal suite",
          detail:
            "Dressing room, ensuite and a private terrace, placed on the quiet corner of the plot.",
        },
        {
          id: "bq",
          x: 0.14,
          y: 0.76,
          label: "Boys' quarters",
          detail: "Self-contained accommodation with independent access from the service court.",
        },
      ],
    },
  },
  {
    id: "maitama-boutique-hotels",
    slug: "maitama-boutique-hotels",
    title: "Maitama Boutique Hotels",
    location: "Maitama, Abuja",
    year: "2024",
    sector: "hospitality",
    status: "IN_PROGRESS",
    models: ["BOT", "ADVISORY"],
    summary:
      "High-class hospitality developments with detailed revenue modelling and phased Build–Operate–Transfer structures.",
    body: [
      "Small, high-specification hotels in Maitama, where plot sizes reward precision over scale. Each scheme was modelled on its own revenue assumptions before a plan was drawn — key count, average rate and food-and-beverage contribution set the envelope, not the other way round.",
      "Phased BOT structures let the landowner retain the freehold while the operating business carries the construction risk and hands the asset back at the end of term.",
    ],
    facts: [
      { label: "Type", value: "Boutique hospitality" },
      { label: "Structure", value: "Phased BOT" },
      { label: "Location", value: "Maitama" },
    ],
    cover: {
      src: unsplash("1564501049412-61c2a3083791"),
      alt: "Boutique hotel lobby with warm timber and stone finishes",
    },
    gallery: [
      {
        src: unsplash("1564501049412-61c2a3083791"),
        alt: "Hotel lobby seating area",
      },
      {
        src: unsplash("1590490360182-c33d57733427"),
        alt: "Guest room with a city outlook",
        orientation: "portrait",
      },
    ],
  },
  {
    id: "gwarinpa-terraces",
    slug: "gwarinpa-terraces",
    title: "Gwarinpa Terraces",
    location: "Gwarinpa, Abuja",
    year: "2023",
    sector: "residential",
    status: "COMPLETED",
    models: ["DESIGN_BUILD"],
    summary: "Five units of modern European terraced houses in an established premium area.",
    body: [
      "Five terraced houses on an infill plot in Gwarinpa, drawn in a restrained European idiom — tall proportions, deep reveals and a limited palette of render, stone and dark metalwork.",
      "Terraces live or die on the party wall. Acoustic separation and independent services were specified from the outset, so the five houses read as one composition from the street while functioning as five entirely separate homes.",
    ],
    facts: [
      { label: "Units", value: "5" },
      { label: "Type", value: "Terraced houses" },
      { label: "Completed", value: "2023" },
    ],
    cover: {
      src: unsplash("1518780664697-55e3ad937233"),
      alt: "Row of modern terraced houses with tall windows",
    },
    gallery: [
      {
        src: unsplash("1518780664697-55e3ad937233"),
        alt: "Terrace frontage from the street",
      },
      {
        src: unsplash("1600607687939-ce8a6c25118c"),
        alt: "Interior stair hall with natural light from above",
        orientation: "portrait",
      },
    ],
  },
  {
    id: "rail-terminals",
    slug: "rail-terminals",
    title: "High-Speed Rail Terminals",
    location: "Six locations nationwide",
    year: "2023",
    sector: "institutional",
    status: "COMPLETED",
    models: ["DESIGN"],
    summary:
      "Six major high-speed rail station terminals designed across Nigeria, delivered to international and regulatory standards.",
    body: [
      "Six terminal buildings for the national high-speed rail programme, designed as a family rather than six unrelated stations. A shared structural grammar and a common wayfinding system mean a passenger who learns one terminal can read all six.",
      "Each building was adapted to its own site, climate and passenger volume while holding the family resemblance — the variation is in span, shading and concourse depth, not in language.",
      "Delivered to international and Nigerian regulatory standards, alongside rehabilitation and upgrade work on aviation and security infrastructure.",
    ],
    facts: [
      { label: "Terminals", value: "6" },
      { label: "Scope", value: "Architectural design" },
      { label: "Standards", value: "International + regulatory" },
    ],
    cover: {
      src: unsplash("1474487548417-781cb71495f3"),
      alt: "Wide rail station concourse under a long-span roof",
    },
    gallery: [
      {
        src: unsplash("1474487548417-781cb71495f3"),
        alt: "Station concourse with daylight through the roof structure",
      },
      {
        src: unsplash("1544620347-c4fd4a3d5957"),
        alt: "Platform canopy structure",
      },
    ],
  },
];
