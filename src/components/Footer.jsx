import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full bg-[#062b59] text-white py-12 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-12 border-b border-[#1e3a8a] pb-12">
        
        <div className="space-y-4 max-w-sm">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            AITHON 2.0
          </h2>
          <p className="text-[#60a5fa] font-bold text-sm tracking-widest uppercase">
            National Level AI Hackathon
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Department of Artificial Intelligence & Data Science<br/>
            Amrutvahini College of Engineering<br/>
            Sangamner, Maharashtra
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-3 text-sm text-slate-300 font-medium">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#problem-statement" className="hover:text-white transition-colors">Problem Statement</a></li>
              <li><a href="#guidelines" className="hover:text-white transition-colors">Guidelines</a></li>
              <li><a href="#sponsors" className="hover:text-white transition-colors">Sponsors</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Connect</h3>
            <ul className="space-y-3 text-sm text-slate-300 font-medium">
              <li>
                <a href="https://instagram.com/aiesa.avcoe" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>Instagram: @aiesa.avcoe</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
      
      <div className="max-w-5xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <p>© 2026 AITHON 2.0. All Rights Reserved.</p>
        <Link to="/admin" className="hover:text-white transition-colors">Admin Login</Link>
      </div>
    </footer>
  )
}
