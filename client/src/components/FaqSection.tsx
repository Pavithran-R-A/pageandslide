const FAQs = [
  ["What does SoftBazzar do?", "SoftBazzar provides presentation design, assignment support, project-report formatting, notes and resume assistance for college students."],
  ["How much does a PPT cost?", "Presentation packages start at ₹99 for up to 5 slides. The catalogue shows the current price for each slide-count package."],
  ["Are editable files included?", "Yes. Editable files are included wherever the selected service supports an editable working format, including PPTX presentations."],
  ["How quickly can an order be delivered?", "Timing is confirmed after the brief and source files are reviewed. Priority within 24 hours is +25% and same-day or under 12 hours is +50% when capacity allows."],
  ["How many revisions are included?", "Two minor revisions are included. Major scope changes, new sections or substantial rewrites may need a new quote."],
  ["How do I place an order?", "Choose a service and tier, open the cart, enter your name, topic and deadline, review the total, then choose WhatsApp or Telegram to send the prepared brief."],
  ["How does payment work?", "The cart prepares an order request; SoftBazzar confirms scope, availability and the next payment step through the selected contact channel before work begins."],
  ["Can students from any college use SoftBazzar?", "Yes. SoftBazzar is a general student-support service and does not claim affiliation with a particular college or university."],
  ["Does SoftBazzar guarantee marks?", "No. SoftBazzar does not guarantee grades or academic outcomes. Students remain responsible for accuracy, authorship and their institution's rules."],
  ["How do cancellations and refunds work?", "The outcome depends on whether work has started, whether delivery materially failed, whether a paid priority deadline was missed because of SoftBazzar, and whether the request changes the agreed scope. See Refunds & Cancellations for the full route."],
] as const;

export function FaqSection() {
  return <section className="faq-section" id="faq" aria-labelledby="faq-title"><div className="faq-heading"><p className="eyebrow">FAQ</p><h2 id="faq-title">Clear answers, before you begin.</h2><p>Short answers to the questions students usually ask before sending a brief.</p></div><div className="faq-list">{FAQs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div></section>;
}
