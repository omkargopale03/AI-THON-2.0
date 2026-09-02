import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { SparklesIcon, ShieldCheckIcon, MailIcon, ArrowRightIcon } from '../../components/Icons'

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@aithon.io')
  const [password, setPassword] = useState('password123')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/admin/dashboard')
    }, 400)
  }

  return (
    <div className="min-h-screen bg-[#05070e] text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-cyan-500 selection:text-black">
      {/* Background Cyber Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top Ambient Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-[#090d1a]/95 border border-cyan-500/30 p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.15)] space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 mb-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <SparklesIcon className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-mono font-extrabold text-white tracking-wider m-0">
            AI THON <span className="text-cyan-400">2.0</span>
          </h1>
          <p className="text-[11px] font-mono tracking-widest text-cyan-400/80 uppercase">
            ADMINISTRATION CONSOLE
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono font-semibold text-slate-300">
              Admin Email
            </label>
            <div className="relative">
              <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aithon.io"
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0c1022] border border-slate-800 text-xs font-sans text-slate-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono font-semibold text-slate-300">
              Password
            </label>
            <div className="relative">
              <ShieldCheckIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#0c1022] border border-slate-800 text-xs font-sans text-slate-100 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>SIGN IN TO DASHBOARD</span>
                <ArrowRightIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-3 border-t border-slate-800/80 text-center">
          <Link
            to="/"
            className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
          >
            <span>← Back to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
