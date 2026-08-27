/** College Press: typed source of truth for SoftBazzar's restrained editorial catalogue. */
export type ServiceTier = Readonly<{ id: string; label: string; price: number; unit: string }>;
export type ServiceCategory = Readonly<{ id: string; number: string; name: string; description: string; tiers: readonly ServiceTier[]; featured?: boolean }>;

export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  { id: "presentations", number: "01", name: "Presentations", description: "Structured presentation design with an editable PPTX file.", tiers: [
    { id: "up-to-5", label: "Up to 5 slides", price: 99, unit: "slides" }, { id: "6-to-10", label: "6–10 slides", price: 149, unit: "slides" }, { id: "11-to-15", label: "11–15 slides", price: 249, unit: "slides" }, { id: "16-to-20", label: "16–20 slides", price: 299, unit: "slides" }, { id: "21-to-30", label: "21–30 slides", price: 449, unit: "slides" }, { id: "additional-slide", label: "Additional slide", price: 15, unit: "per slide" },
  ] },
  { id: "assignment-support", number: "02", name: "Assignment support", description: "Formatting, editing, organisation and academic-support assistance for student documents.", tiers: [
    { id: "up-to-5", label: "Up to 5 pages", price: 79, unit: "pages" }, { id: "6-to-10", label: "6–10 pages", price: 119, unit: "pages" }, { id: "11-to-20", label: "11–20 pages", price: 179, unit: "pages" }, { id: "21-to-30", label: "21–30 pages", price: 249, unit: "pages" }, { id: "31-to-50", label: "31–50 pages", price: 349, unit: "pages" }, { id: "additional-page", label: "Additional page", price: 8, unit: "per page" },
  ] },
  { id: "project-reports", number: "03", name: "Project reports", description: "Report formatting, consistency, layout and presentation polish.", tiers: [
    { id: "up-to-20", label: "Up to 20 pages", price: 199, unit: "pages" }, { id: "21-to-40", label: "21–40 pages", price: 299, unit: "pages" }, { id: "41-to-60", label: "41–60 pages", price: 399, unit: "pages" }, { id: "61-to-80", label: "61–80 pages", price: 549, unit: "pages" },
  ] },
  { id: "notes", number: "04", name: "Notes", description: "Clear, organised and consistently formatted study notes.", tiers: [
    { id: "up-to-10", label: "Up to 10 pages", price: 79, unit: "pages" }, { id: "11-to-20", label: "11–20 pages", price: 129, unit: "pages" }, { id: "21-to-30", label: "21–30 pages", price: 179, unit: "pages" },
  ] },
  { id: "resume", number: "05", name: "Resume", description: "A focused first impression, arranged for student and application contexts.", tiers: [
    { id: "student-resume", label: "Student Resume", price: 199, unit: "document" }, { id: "ats-resume", label: "ATS-friendly Resume", price: 299, unit: "document" },
  ] },
  { id: "combinations", number: "06", name: "Combination pricing", description: "Two considered presentation-and-report options for connected submissions.", featured: true, tiers: [
    { id: "presentation-15-report-20", label: "15-slide Presentation + 20-page Report", price: 399, unit: "bundle" }, { id: "presentation-20-report-40", label: "20-slide Presentation + 40-page Report", price: 549, unit: "bundle" },
  ] },
];
export type ServiceTierMatch = Readonly<{ service: ServiceCategory; tier: ServiceTier }>;
export function findServiceTier(serviceId: string, tierId: string): ServiceTierMatch | null { const service = SERVICE_CATEGORIES.find((entry) => entry.id === serviceId); const tier = service?.tiers.find((entry) => entry.id === tierId); return service && tier ? { service, tier } : null; }
