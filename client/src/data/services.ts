export type ServiceTier = Readonly<{ id: string; label: string; price: number; unit: string; addable?: boolean }>;
export type ServiceCategory = Readonly<{ id: string; number: string; name: string; description: string; tiers: readonly ServiceTier[]; featured?: boolean }>;

export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  { id: "presentations", number: "01", name: "Presentations", description: "Structured presentation design with an editable PPTX file.", tiers: [
    { id: "up-to-5", label: "Up to 5 slides", price: 99, unit: "slides" }, { id: "6-to-10", label: "6–10 slides", price: 149, unit: "slides" }, { id: "11-to-15", label: "11–15 slides", price: 249, unit: "slides" }, { id: "16-to-20", label: "16–20 slides", price: 299, unit: "slides" }, { id: "21-to-30", label: "21–30 slides", price: 449, unit: "slides" }, { id: "additional-slide", label: "Additional slide", price: 15, unit: "per slide", addable: false },
  ] },
  { id: "assignment-support", number: "02", name: "Assignment support", description: "Formatting, editing, organisation and academic-support assistance for student documents.", tiers: [
    { id: "up-to-5", label: "Up to 5 pages", price: 79, unit: "pages" }, { id: "6-to-10", label: "6–10 pages", price: 119, unit: "pages" }, { id: "11-to-20", label: "11–20 pages", price: 179, unit: "pages" }, { id: "21-to-30", label: "21–30 pages", price: 249, unit: "pages" }, { id: "31-to-50", label: "31–50 pages", price: 349, unit: "pages" }, { id: "additional-page", label: "Additional page", price: 8, unit: "per page", addable: false },
  ] },
  { id: "project-reports", number: "03", name: "Project reports", description: "Report formatting, consistency, layout and presentation polish.", tiers: [
    { id: "up-to-20", label: "Up to 20 pages", price: 199, unit: "pages" }, { id: "21-to-40", label: "21–40 pages", price: 299, unit: "pages" }, { id: "41-to-60", label: "41–60 pages", price: 399, unit: "pages" }, { id: "61-to-80", label: "61–80 pages", price: 549, unit: "pages" },
  ] },
  { id: "notes", number: "04", name: "Notes", description: "Clear, organised and consistently formatted study notes.", tiers: [
    { id: "up-to-10", label: "Up to 10 pages", price: 79, unit: "pages" }, { id: "11-to-20", label: "11–20 pages", price: 129, unit: "pages" }, { id: "21-to-30", label: "21–30 pages", price: 179, unit: "pages" },
  ] },
  { id: "resume", number: "05", name: "Resumes", description: "A focused first impression, arranged for student and application contexts.", tiers: [
    { id: "student-resume", label: "Student Resume", price: 199, unit: "document" }, { id: "ats-resume", label: "ATS-friendly Resume", price: 299, unit: "document" },
  ] },
  { id: "combinations", number: "06", name: "Combination pricing", description: "Two considered presentation-and-report options for connected submissions.", featured: true, tiers: [
    { id: "presentation-15-report-20", label: "15-slide Presentation + 20-page Report", price: 399, unit: "bundle" }, { id: "presentation-20-report-40", label: "20-slide Presentation + 40-page Report", price: 549, unit: "bundle" },
  ] },
];

export type ServiceTierMatch = Readonly<{ service: ServiceCategory; tier: ServiceTier }>;

export type ServicePageDetail = Readonly<{
  slug: string;
  eyebrow: string;
  headline: string;
  intro: string;
  included: readonly string[];
  customerProvides: readonly string[];
  output: string;
  turnaround: string;
  revisions: string;
  useCases: readonly string[];
  faqs: readonly Readonly<{ question: string; answer: string }>[];
}>;

export const SERVICE_PAGE_DETAILS: Readonly<Record<string, ServicePageDetail>> = {
  presentations: {
    slug: "/presentations", eyebrow: "PRESENTATION DESIGN", headline: "Presentations that make the point clearly.", intro: "Page & Slide turns your brief, notes or draft into a considered, editable presentation that is easier to present and easier to revise.", included: ["Slide hierarchy and layout", "Typography, spacing and visual consistency", "Editable PPTX delivery", "Presentation polish for your supplied content"], customerProvides: ["Your topic, outline or draft", "Required slide count and any reference material", "Names, dates and figures that must remain accurate"], output: "Editable PPTX file, with any supplied assets kept in the working file where applicable.", turnaround: "Timing is confirmed after your brief is reviewed. Priority within 24 hours is available at +25%; same-day or under 12 hours is +50% when capacity allows.", revisions: "Two minor revisions are included. A minor revision changes wording, spacing, colour or a small layout detail without changing the agreed scope.", useCases: ["Class presentations", "Seminar decks", "Project vivas", "Group presentation polish"], faqs: [{ question: "How much does a PPT cost?", answer: "Presentation packages start at ₹99 for up to 5 slides. Choose the slide-count package that matches your brief." }, { question: "Are editable files included?", answer: "Yes. Presentation delivery includes an editable PPTX file." }],
  },
  "assignment-support": {
    slug: "/assignment-support", eyebrow: "ASSIGNMENT SUPPORT", headline: "Assignment support, with structure.", intro: "Get practical help with formatting, editing, document organisation and presentation polish while keeping responsibility for the academic content and submission with you.", included: ["Formatting and document consistency", "Proofreading and light editing of supplied text", "Headings, spacing and page organisation", "Editable document delivery"], customerProvides: ["Your draft or source material", "Required format, rubric or template", "The page range and deadline"], output: "An editable document in the agreed working format, such as DOCX or a supplied template format.", turnaround: "Timing is confirmed after scope review. Priority within 24 hours is +25%; same-day or under 12 hours is +50% when available.", revisions: "Two minor revisions are included for the agreed scope. New sections, major rewrites or a new format are quoted separately.", useCases: ["Assignment formatting", "Proofreading a supplied draft", "Reference and heading consistency", "Document organisation"], faqs: [{ question: "What is Assignment Support?", answer: "It is formatting, editing, organisation and presentation assistance for your supplied academic document. It is not a promise to complete assessed work dishonestly." }, { question: "Can you guarantee marks?", answer: "No. Page & Slide does not guarantee grades or academic outcomes." }],
  },
  "project-reports": {
    slug: "/project-reports", eyebrow: "PROJECT REPORTS", headline: "Project reports with a considered finish.", intro: "Make a supplied project report easier to navigate through consistent structure, page layout, formatting and final presentation polish.", included: ["Report hierarchy and styles", "Page layout, contents and section consistency", "Tables, figures and supplied references arranged clearly", "Editable report delivery"], customerProvides: ["Your report draft and source files", "Required format, template or submission rules", "Final figures, names, citations and page target"], output: "An editable report file in the agreed format, with a PDF export where requested and practical.", turnaround: "Timing depends on page count and source-file readiness. Priority within 24 hours is +25%; same-day or under 12 hours is +50% when available.", revisions: "Two minor revisions are included. A major content change or a new report structure requires a new quote.", useCases: ["Project submissions", "Research report formatting", "Viva-ready report polish", "Long-document consistency"], faqs: [{ question: "How much does a project report cost?", answer: "Project report packages start at ₹199 for up to 20 pages. The final scope is confirmed from the supplied files." }, { question: "Do you write fabricated results?", answer: "No. Customers remain responsible for the truthfulness and academic integrity of supplied content." }],
  },
  notes: {
    slug: "/notes", eyebrow: "NOTES", headline: "Notes made easier to return to.", intro: "Turn supplied notes or study material into a cleaner, more consistent document that supports revision without adding unnecessary decoration.", included: ["Clear headings and information hierarchy", "Consistent spacing and page organisation", "Readable formatting for supplied content", "Editable delivery"], customerProvides: ["Your notes or source material", "Preferred page range and format", "Any required terminology or emphasis"], output: "An editable notes document in the agreed format.", turnaround: "Timing is confirmed after checking the source material. Priority within 24 hours is +25%; same-day or under 12 hours is +50% when available.", revisions: "Two minor revisions are included for layout and presentation details. New content or major restructuring is quoted separately.", useCases: ["Revision notes", "Lecture-note organisation", "Study handouts", "Topic summaries from supplied material"], faqs: [{ question: "Are notes supplied as editable files?", answer: "Yes. Notes are delivered in an editable working format agreed for the order." }, { question: "Do you guarantee exam results?", answer: "No. Page & Slide does not guarantee grades or outcomes." }],
  },
  resumes: {
    slug: "/resumes", eyebrow: "RESUME SUPPORT", headline: "A resume that reads like you mean it.", intro: "Shape your supplied experience, education and projects into a focused resume with deliberate hierarchy and an editable file you can keep updating.", included: ["Information hierarchy and concise layout", "Student or ATS-friendly format selection", "Typography and spacing tuned for readability", "Editable resume delivery"], customerProvides: ["Your accurate education, experience and project details", "Target role or application context", "Any existing resume, profile or portfolio information"], output: "An editable resume document. The ATS-friendly option prioritises simple structure and machine-readable text flow.", turnaround: "Timing is confirmed after the brief is reviewed. Priority within 24 hours is +25%; same-day or under 12 hours is +50% when available.", revisions: "Two minor revisions are included. Substantial new experience or a new target role may require a new quote.", useCases: ["First student resume", "Internship applications", "Graduate applications", "ATS-friendly application format"], faqs: [{ question: "How much does a resume cost?", answer: "Student Resume packages start at ₹199; ATS-friendly Resume packages start at ₹299." }, { question: "Do you invent experience?", answer: "No. You remain responsible for supplying accurate information and credentials." }],
  },
};

export function findService(serviceId: string): ServiceCategory | null { return SERVICE_CATEGORIES.find((entry) => entry.id === serviceId) ?? null; }
export function findServiceTier(serviceId: string, tierId: string): ServiceTierMatch | null {
  const service = findService(serviceId);
  const tier = service?.tiers.find((entry) => entry.id === tierId);
  return service && tier ? { service, tier } : null;
}

export function findPurchasableServiceTier(serviceId: string, tierId: string): ServiceTierMatch | null {
  const match = findServiceTier(serviceId, tierId);
  return match?.tier.addable === false ? null : match;
}
