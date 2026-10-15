import SectionHeading from "@/components/ui/SectionHeading";

const capabilities = [
  {
    number: "01",
    title: "Interface development",
    details: "React, TypeScript, and Tailwind CSS appear in the portfolio and project interfaces. The examples include responsive page layouts, reusable components, and client-side interactions.",
    proof: "Portfolio · Kairos · FlowPilot AI",
  },
  {
    number: "02",
    title: "Full-stack foundations",
    details: "The Student Management System pairs a React client with an Express API and MongoDB models for student records, attendance, and grades.",
    proof: "Student Management System",
  },
  {
    number: "03",
    title: "Interactive visuals",
    details: "Three.js and React Three Fiber power the portfolio scenes and Kairos resort presentation. These are project examples, not a claim of professional production experience.",
    proof: "Portfolio · Kairos",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-y relative z-10">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Skills in context"
          title={<>The tools, <span className="text-gradient">shown through the work.</span></>}
          intro="A short map of the technologies used in the projects above, with a direct pointer to where each is demonstrated."
        />
        <div className="mt-12 border-t border-white/10 md:mt-16">
          {capabilities.map((item) => (
            <article key={item.number} className="grid gap-3 border-b border-white/10 py-7 sm:grid-cols-[3rem_minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-6 sm:py-8">
              <span className="font-mono text-xs text-[rgb(var(--accent))]">{item.number}</span>
              <h3 className="font-display text-display-sm font-medium">{item.title}</h3>
              <div>
                <p className="max-w-[62ch] text-body-sm text-ink-muted">{item.details}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">Evidence: {item.proof}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
