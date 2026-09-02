import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  DashboardIcon,
  UserIcon,
  UsersIcon,
  SubmissionIcon,
  AnnouncementIcon,
  SettingsIcon,
  HelpCircleIcon,
  LogOutIcon,
  XMarkIcon,
} from '../Icons'
import aithonLogo from '../../assets/aithon-logo.png'

export default function AdminSidebar({ mobileOpen, setMobileOpen, onOpenHelp }) {
  const location = useLocation()
  const navigate = useNavigate()

  const navSections = [
    {
      label: 'OVERVIEW',
      items: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: DashboardIcon },
      ],
    },
    {
      label: 'MANAGEMENT',
      items: [
        { name: 'Participants', path: '/admin/participants', icon: UserIcon },
        { name: 'Teams', path: '/admin/teams', icon: UsersIcon },
        { name: 'Submissions', path: '/admin/submissions', icon: SubmissionIcon },
      ],
    },
    {
      label: 'ENGAGEMENT',
      items: [
        { name: 'Announcements', path: '/admin/announcements', icon: AnnouncementIcon },
      ],
    },
    {
      label: 'SYSTEM',
      items: [
        { name: 'Settings', path: '/admin/settings', icon: SettingsIcon },
      ],
    },
  ]

  const handleLogout = () => {
    navigate('/admin/login')
  }

  const isItemActive = (path) => {
    if (path === '/admin/dashboard') {
      return location.pathname === '/admin/dashboard' || location.pathname === '/admin'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-60 bg-[#0a0d17] border-r border-slate-800/90 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header / Branding */}
        <div>
          <div className="h-16 px-5 border-b border-slate-800/80 flex items-center justify-between">
            <Link
              to="/admin/dashboard"
              className="flex items-center focus:outline-none"
              onClick={() => setMobileOpen && setMobileOpen(false)}
            >
              <img
                src={aithonLogo}
                alt="AiTHON 2.0"
                className="object-contain w-auto"
                style={{ height: '36px', maxWidth: '148px' }}
              />
            </Link>

            {/* Mobile close button */}
            <button
              type="button"
              className="p-1 rounded-md text-slate-400 hover:text-white lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-label="Close sidebar"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links Grouped by Section */}
          <nav className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
            {navSections.map((section) => (
              <div key={section.label}>
                <div className="px-3 mb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  {section.label}
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const active = isItemActive(item.path)
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setMobileOpen && setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono font-medium transition-colors duration-150 relative ${
                          active
                            ? 'bg-cyan-500/10 text-white font-semibold border-l-2 border-cyan-400 pl-[10px]'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${
                            active ? 'text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]' : 'text-slate-400'
                          }`}
                        />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Actions: Help & Logout */}
        <div className="p-3 border-t border-slate-800/80 space-y-1 bg-[#090b14]">
          <button
            type="button"
            onClick={() => {
              if (onOpenHelp) onOpenHelp()
              if (setMobileOpen) setMobileOpen(false)
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 transition-colors cursor-pointer"
          >
            <HelpCircleIcon className="w-4 h-4 text-slate-400" />
            <span>Help & Docs</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono text-rose-400/90 hover:text-rose-300 hover:bg-rose-950/20 transition-colors cursor-pointer"
          >
            <LogOutIcon className="w-4 h-4 text-rose-400/80" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
