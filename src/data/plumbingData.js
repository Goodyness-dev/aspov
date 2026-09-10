export const BUSINESS_INFO = {
  name: "Aspen Drain",
  tagline: "Markham's Trusted Drain & Plumbing Specialist — Serving the Community Since 2005",
  phoneDisplay: "(647) 522-1884",
  phoneRaw: "6475221884",
  phoneTel: "tel:6475221884",
  serviceArea: "Markham, ON and surrounding York Region",
  sinceYear: 2005,
  experienceYears: 22,
  ownerQuote: "If you want someone you can trust and has been in the service industry for 22 years, I'm here for all your Drain Cleaning & Plumbing Service needs.",
};

export const HOURS = [
  { day: "Monday", hours: "7:00 AM – 7:00 PM" },
  { day: "Tuesday", hours: "7:00 AM – 7:00 PM" },
  { day: "Wednesday", hours: "7:00 AM – 7:00 PM" },
  { day: "Thursday", hours: "7:00 AM – 7:00 PM" },
  { day: "Friday", hours: "7:00 AM – 7:00 PM" },
  { day: "Saturday", hours: "Closed" },
  { day: "Sunday", hours: "9:00 AM – 5:00 PM" },
];

export const SPECIAL_HOURS = {
  date: "Thu, Dec 31, 2026",
  hours: "9:00 AM – 5:00 PM"
};

export const SERVICE_CATEGORIES = [
  {
    id: "repair",
    name: "Plumbing Repair",
    tagline: "Fast diagnosis and permanent fixes for leaks, clogs, and broken fixtures.",
    badge: "Most Requested",
    popularFixtures: ["Drain", "Toilet", "Sink", "Faucet", "Sewer", "Sump pump", "Water heater"]
  },
  {
    id: "installation",
    name: "Plumbing Installation or Replacement",
    tagline: "Expert fitting of quality parts, fixtures, pumps, and full system upgrades.",
    badge: "Quality Guaranteed",
    popularFixtures: ["Drain", "Toilet", "Faucet", "Garbage disposal", "Sump pump", "Bathtub", "Shower"]
  },
  {
    id: "inspection",
    name: "Plumbing Inspection",
    tagline: "Thorough preventive checks, camera drain inspections, and condition assessments.",
    badge: "Preventive Care",
    popularFixtures: ["Drain", "Sewer", "Sump pump", "Toilet", "Sink", "Faucet"]
  }
];

export const ALL_FIXTURES = [
  "Backflow preventer",
  "Bathtub",
  "Drain",
  "Faucet",
  "Garbage disposal",
  "Gas line",
  "Hot water recirculation pump",
  "Sewer",
  "Shower",
  "Sink",
  "Sump pump",
  "Toilet",
  "Water heater",
  "Water pipe",
  "Other"
];

export const INSPECTION_FIXTURES = [
  "Drain",
  "Faucet",
  "Garbage disposal",
  "Sewer",
  "Sink",
  "Sump pump",
  "Toilet",
  "Other"
];

export const TOILET_COUNT_OPTIONS = [
  "1",
  "2",
  "3",
  "4",
  "5 or more",
  "Other"
];

export const TOILET_TYPE_OPTIONS = [
  "Dual flush toilet",
  "High-efficiency, low-flow toilet",
  "Standard flow toilet (most common)"
];

export const TOILET_ISSUE_OPTIONS = [
  "Broken or cracked",
  "Clogged",
  "Keeps running",
  "Leaking",
  "Low water pressure",
  "Other"
];

export const TIMELINE_OPTIONS = [
  { id: "asap", label: "As soon as possible", icon: "zap" },
  { id: "flexible", label: "I'm flexible", icon: "clock" },
  { id: "specific", label: "Specific date(s)", icon: "calendar" }
];

export const TRUST_BADGES = [
  { title: "22+ Years in Trade", subtitle: "Serving Markham since 2005", icon: "shield-check" },
  { title: "100% Response Rate", subtitle: "Quick, dependable replies", icon: "phone-call" },
  { title: "Free Consultations", subtitle: "Honest expert guidance", icon: "message-square" },
  { title: "Free Estimates", subtitle: "Upfront pricing with no surprise fees", icon: "badge-check" },
  { title: "Locally Owned", subtitle: "Serving Markham & York Region", icon: "map-pin" }
];

export const AMENITIES = [
  { name: "Free consultations", available: true },
  { name: "Free estimates", available: true },
  { name: "Locally owned and operated", available: true },
  { name: "Accepts cash", available: true },
  { name: "Accepts debit cards", available: true },
  { name: "Accepts PayPal", available: true },
  { name: "ASL proficient", available: false }
];
