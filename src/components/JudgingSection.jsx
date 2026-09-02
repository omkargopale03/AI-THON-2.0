export default function JudgingSection() {
  const criteria = [
    {
      title: 'Innovation',
      desc: 'Originality of thought, novel approach, and creative solution to the target problem.',
    },
    {
      title: 'Technical Implementation',
      desc: 'Code quality, software/hardware architecture, prototype stability, and technical completeness.',
    },
    {
      title: 'AI Integration',
      desc: 'Effective application and depth of artificial intelligence, machine learning models, or data pipelines.',
    },
    {
      title: 'Real-World Impact',
      desc: 'Practical utility, scalability, market viability, and potential benefit to industry or society.',
    },
    {
      title: 'User Experience',
      desc: 'Intuitive interface design, smooth workflow, clarity of interaction, and accessibility.',
    },
    {
      title: 'Presentation',
      desc: 'Clarity of the pitch deck, live prototype demonstration, and team response during jury Q&A.',
    },
  ]

  return (
    <section className="w-full bg-[#f4f8fc] py-20 lg:py-28 px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-bold text-[#2563eb] uppercase tracking-widest">
            EVALUATION RUBRIC
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#062b59]">
            JUDGING CRITERIA
          </h2>
          <p className="text-slate-600 text-base">
            All project submissions are evaluated objectively across six core technical criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {criteria.map((c, idx) => (
            <div key={c.title} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-400 block">0{idx + 1}</span>
              <h3 className="text-base font-bold text-[#062b59]">{c.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
