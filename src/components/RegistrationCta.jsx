import { Link } from 'react-router-dom'

export default function RegistrationCta() {
  return (
    <section className="w-full bg-[#0f2b5c] text-white py-20 lg:py-24 px-6 lg:px-8 border-b border-[#091e42]">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        
        <p className="text-xs font-bold text-blue-300 uppercase tracking-widest">
          NATIONAL LEVEL AI HACKATHON
        </p>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          READY TO BUILD THE FUTURE?
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Bring your team, your ideas and your passion for technology to AITHON 2.0 at Amrutvahini College of Engineering, Sangamner.
        </p>

        <div className="pt-4">
          <Link
            to="/register"
            className="inline-block px-10 py-4 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-sm uppercase tracking-wider transition-colors shadow-md"
          >
            REGISTER NOW
          </Link>
        </div>

      </div>
    </section>
  )
}
