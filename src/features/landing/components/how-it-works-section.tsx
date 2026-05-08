const steps = [
  {
    number: "01",
    title: "Answer 5 Questions",
    description: "Budget, timeline, financing, and area preferences. Takes 5 minutes.",
  },
  {
    number: "02",
    title: "We Review Your Profile",
    description: "Our team qualifies you within 24 hours. No spam, no auto-replies.",
  },
  {
    number: "03",
    title: "Get 3 Curated Matches",
    description: "Properties personally selected for your criteria — not mass-emailed listings.",
  },
  {
    number: "04",
    title: "Tour & Close",
    description: "We handle negotiations, paperwork, and bilingual support through closing.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-slate-900 py-20 text-white">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight md:text-4xl">
            How the Process Works
          </h2>
          <p className="mb-12 text-center text-slate-400">
            Four steps from qualification to keys in hand.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10">
                  <span className="text-lg font-bold text-amber-400">{step.number}</span>
                </div>
                <h3 className="mb-2 font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
