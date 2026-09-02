import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import heroImg from '../assets/hero.png'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import '../App.css'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-[#05070e] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Banner CTA to Register */}
        <div className="w-full max-w-4xl mx-auto my-6 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.15)]">
          <div className="flex items-center gap-3 text-left">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Registrations Now Live
              </p>
              <p className="text-xs text-slate-300">
                Join AI THON 2.0 National Hackathon. 48 hours of building next-gen AI systems.
              </p>
            </div>
          </div>
          <Link
            to="/register"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.4)] whitespace-nowrap"
          >
            REGISTER TEAM →
          </Link>
        </div>

        {/* Existing Starter Content */}
        <div className="w-full max-w-5xl">
          <section id="center">
            <div className="hero">
              <img src={heroImg} className="base" width="170" height="179" alt="" />
              <img src={reactLogo} className="framework" alt="React logo" />
              <img src={viteLogo} className="vite" alt="Vite logo" />
            </div>
            <div>
              <h1 className="text-white">AI THON 2.0</h1>
              <p className="text-slate-400">
                Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
              </p>
            </div>
            <button
              type="button"
              className="counter cursor-pointer"
              onClick={() => setCount((c) => c + 1)}
            >
              Count is {count}
            </button>
          </section>

          <div className="ticks"></div>

          <section id="next-steps">
            <div id="docs">
              <svg className="icon text-cyan-400" role="presentation" aria-hidden="true">
                <use href="/icons.svg#documentation-icon"></use>
              </svg>
              <h2>Documentation</h2>
              <p>Your questions, answered</p>
              <ul>
                <li>
                  <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                    <img className="logo" src={viteLogo} alt="" />
                    Explore Vite
                  </a>
                </li>
                <li>
                  <a href="https://react.dev/" target="_blank" rel="noreferrer">
                    <img className="button-icon" src={reactLogo} alt="" />
                    Learn more
                  </a>
                </li>
              </ul>
            </div>
            <div id="social">
              <svg className="icon text-cyan-400" role="presentation" aria-hidden="true">
                <use href="/icons.svg#social-icon"></use>
              </svg>
              <h2>Connect with us</h2>
              <p>Join the Vite community</p>
              <ul>
                <li>
                  <a href="https://github.com/vitejs/vite" target="_blank" rel="noreferrer">
                    <svg className="button-icon" role="presentation" aria-hidden="true">
                      <use href="/icons.svg#github-icon"></use>
                    </svg>
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://chat.vite.dev/" target="_blank" rel="noreferrer">
                    <svg className="button-icon" role="presentation" aria-hidden="true">
                      <use href="/icons.svg#discord-icon"></use>
                    </svg>
                    Discord
                  </a>
                </li>
                <li>
                  <a href="https://x.com/vite_js" target="_blank" rel="noreferrer">
                    <svg className="button-icon" role="presentation" aria-hidden="true">
                      <use href="/icons.svg#x-icon"></use>
                    </svg>
                    X.com
                  </a>
                </li>
                <li>
                  <a href="https://bsky.app/profile/vite.dev" target="_blank" rel="noreferrer">
                    <svg className="button-icon" role="presentation" aria-hidden="true">
                      <use href="/icons.svg#bluesky-icon"></use>
                    </svg>
                    Bluesky
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <div className="ticks"></div>
          <section id="spacer"></section>
        </div>
      </main>
    </div>
  )
}
