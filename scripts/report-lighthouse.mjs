import { readFile } from "node:fs/promises";

const reportPath = process.argv[2];
if (!reportPath) throw new Error("Provide a Lighthouse JSON report path.");

const report = JSON.parse(await readFile(reportPath, "utf8"));
for (const reference of report.categories.seo.auditRefs) {
  const audit = report.audits[reference.id];
  if (audit.score !== 1 && audit.score !== null) {
    console.log(JSON.stringify({
      id: audit.id,
      title: audit.title,
      score: audit.score,
      displayValue: audit.displayValue ?? null,
      description: audit.description,
    }));
  }
}
