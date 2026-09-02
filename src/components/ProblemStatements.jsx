import React from 'react'

export default function ProblemStatements() {
  const domains = [
    'Artificial Intelligence',
    'Machine Learning',
    'Generative AI',
    'Data Science',
    'Computer Vision',
    'Natural Language Processing',
    'Automation',
    'Real-World Innovation'
  ]

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#062b59] tracking-tight mb-6">
          PROBLEM STATEMENT
        </h2>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl text-center mb-16 leading-relaxed">
          AITHON focuses on solving real-world challenges through innovative technology.
          Participants can build solutions across a variety of cutting-edge AI and data domains.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
          {domains.map((domain, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 border border-slate-100 p-8 flex items-center justify-center text-center group hover:bg-blue-50 transition-colors duration-300 rounded-sm"
            >
              <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                {domain}
              </h3>
            </div>
          ))}
        </div>

        <a 
          href="#problem-statement"
          className="bg-white text-[#062b59] border-2 border-[#062b59] px-8 py-4 font-semibold hover:bg-[#062b59] hover:text-white transition-all duration-300 tracking-wide"
        >
          VIEW PROBLEM STATEMENTS
        </a>
      </div>
    </section>
  )
}
