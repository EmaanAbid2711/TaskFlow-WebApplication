import FaqItem from "./FaqItem";

import { faqItems } from "../../../data/landingdata";

function FaqSection() {
  return (
    <section
      id="faq"
      className="border-t border-slate-100 bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <FaqItem
              key={item.question}
              question={item.question}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;