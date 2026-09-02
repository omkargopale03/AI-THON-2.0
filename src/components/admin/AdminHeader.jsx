import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import {
  BellIcon,
  ChevronDownIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
} from '../Icons'

export default function AdminHeader({ onToggleMobileSidebar, title, breadcrumbs = [] }) {
  const { adminUser, notifications, markAllNotificationsRead } = useAdmin()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notifMenuOpen, setNotifMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const userMenuRef = useRef(null)
  const notifMenuRef = useRef(null)

  const unreadCount = notifications.filter((n) => n.unread).length

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target)) {
        setNotifMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Derive default title if not passed
  const getPageTitle = () => {
    if (title) return title
    const path = location.pathname
    if (path.includes('/participants')) return 'Participants Management'
    if (path.includes('/teams')) return 'Team Management'
    if (path.includes('/submissions')) return 'Project Submissions'
    if (path.includes('/announcements')) return 'Announcements & Broadcasts'
    if (path.includes('/settings')) return 'System Settings'
    return 'Dashboard'
  }

  const handleLogout = () => {
    setUserMenuOpen(false)
    navigate('/admin/login')
  }

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-[#0a0d17]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger & Title / Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden cursor-pointer"
          aria-label="Toggle navigation sidebar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div>
          {breadcrumbs.length > 0 ? (
            <nav className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <Link to="/admin/dashboard" className="hover:text-cyan-400 transition-colors">
                Admin
              </Link>
              {breadcrumbs.map((b, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  <span>/</span>
                  {b.path ? (
                    <Link to={b.path} className="hover:text-cyan-400 transition-colors">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="text-slate-200 font-semibold">{b.label}</span>
                  )}
                </span>
              ))}
            </nav>
          ) : (
            <h1 className="text-sm sm:text-base font-mono font-bold text-white tracking-wide m-0">
              {getPageTitle()}
            </h1>
          )}
        </div>
      </div>

      {/* Right: Notifications & Admin Profile Dropdown */}
      <div className="flex items-center gap-3">
        {/* Notifications Dropdown */}
        <div className="relative" ref={notifMenuRef}>
          <button
            type="button"
            onClick={() => setNotifMenuOpen(!notifMenuOpen)}
            className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <BellIcon className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-[#0a0d17] animate-pulse" />
            )}
          </button>

          {notifMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#0e1220] border border-slate-800 shadow-2xl p-3 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs font-mono">
                <span className="font-bold text-slate-200 uppercase tracking-wider">
                  Notifications ({unreadCount})
                </span>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    Mark read
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-2.5 rounded-lg text-xs font-sans transition-colors ${
                      notif.unread ? 'bg-cyan-950/30 border border-cyan-500/20' : 'bg-slate-900/40 text-slate-400'
                    }`}
                  >
                    <p className="text-slate-200 leading-snug">{notif.text}</p>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                      {notif.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer group"
            aria-expanded={userMenuOpen}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-mono text-xs font-bold text-black ring-1 ring-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              {adminUser.avatar}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-mono font-semibold text-white leading-tight">
                {adminUser.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 leading-tight">
                {adminUser.role}
              </span>
            </div>
            <ChevronDownIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#0e1220] border border-slate-800 shadow-2xl py-1.5 z-50 animate-fadeIn">
              <div className="px-3.5 py-2 border-b border-slate-800">
                <p className="text-xs font-mono font-bold text-white truncate">{adminUser.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{adminUser.email}</p>
              </div>

              <div className="py-1">
                <Link
                  to="/admin/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-slate-400" />
                  <span>Profile</span>
                </Link>

                <Link
                  to="/admin/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <SettingsIcon className="w-4 h-4 text-slate-400" />
                  <span>Settings</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-mono text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer text-left"
                >
                  <LogOutIcon className="w-4 h-4 text-rose-400" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
