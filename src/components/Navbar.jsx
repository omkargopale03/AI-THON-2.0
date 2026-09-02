import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import aithonLogo from '../assets/aithon-logo.png'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isRegisterPage = location.pathname === '/register'

  const navLinks = [
    { name: 'ABOUT', href: '/#about' },
    { name: 'THEMES', href: '/#themes' },
    { name: 'PRIZES', href: '/#prizes' },
    { name: 'TIMELINE', href: '/#timeline' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#05070e]/85 border-b border-cyan-500/20 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="flex items-center focus:outline-none group"
            aria-label="AI THON 2.0 Homepage"
          >
            <img
              src={aithonLogo}
              alt="AiTHON 2.0"
              className="object-contain w-auto transition-opacity duration-300 group-hover:opacity-80"
              style={{ height: '48px', maxWidth: '200px' }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold tracking-wider text-slate-300 hover:text-cyan-400 transition-colors duration-200 uppercase font-mono relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Register Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/register"
              className={`relative inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-xs font-bold font-mono tracking-wider transition-all duration-300 uppercase ${
                isRegisterPage
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.6)] ring-2 ring-cyan-300'
                  : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]'
              }`}
            >
              {isRegisterPage ? '● REGISTERING' : 'REGISTER'}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-cyan-400 hover:text-white hover:bg-cyan-950/50 border border-cyan-500/30 focus:outline-none transition-colors cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile navigation menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-cyan-500/20 bg-[#070a14]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-semibold tracking-wider text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/40 font-mono transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-cyan-500/20">
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full block text-center py-2.5 rounded-lg text-xs font-bold font-mono tracking-wider uppercase transition-all duration-200 ${
                isRegisterPage
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              }`}
            >
              {isRegisterPage ? '● REGISTERING' : 'REGISTER NOW'}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
