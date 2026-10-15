import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  ["01", "Define", "Describe the user need and the limits of the problem."],
  ["02", "Plan", "Choose the page structure, data shape, and technical boundaries."],
  ["03", "Build", "Implement the interface and connect the required behavior."],
  ["04", "Review", "Check the important paths, responsive layout, and edge cases."],
];

export default function Process() {
  return (
    <section id="process" className="section-y relative z-10">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="A practical project sequence"
          title={<>From a question to a <span className="text-gradient">working build.</span></>}
          intro="A simple way to frame a web project. The project cards above describe the features that are actually implemented in each repository."
        />
        <ol className="mt-12 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([number, title, detail]) => (
            <li key={number} className="border-b border-white/10 py-6 sm:border-r sm:px-5 sm:py-7 first:sm:pl-0 last:sm:border-r-0 lg:first:pl-0">
              <p className="font-mono text-xs text-[rgb(var(--accent))]">{number}</p>
              <h3 className="mt-3 font-display text-display-sm">{title}</h3>
              <p className="mt-3 max-w-[34ch] text-body-sm text-ink-muted">{detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
