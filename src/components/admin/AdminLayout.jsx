import { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { XMarkIcon, SparklesIcon, DiscordIcon, MailIcon } from '../Icons'

export default function AdminLayout({ children, title, breadcrumbs = [] }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [helpModalOpen, setHelpModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Sidebar (Desktop fixed 240px / Mobile drawer) */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        onOpenHelp={() => setHelpModalOpen(true)}
      />

      {/* Main Content Area (Offset by 240px / w-60 on lg screens) */}
      <div className="lg:pl-60 flex flex-col flex-1 min-w-0">
        {/* Top Header */}
        <AdminHeader
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          title={title}
          breadcrumbs={breadcrumbs}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Help & Support Modal */}
      {helpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl bg-[#0d111d] border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400">
                <SparklesIcon className="w-5 h-5" />
                <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider m-0">
                  Admin Support & Guide
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setHelpModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-md cursor-pointer"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 font-sans leading-relaxed">
              <p>
                Welcome to the <strong className="text-white font-mono">AI THON 2.0 Admin Console</strong>.
              </p>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-400">
                <li>Manage participant status, reviews, and team member details under <span className="text-cyan-300">Management</span>.</li>
                <li>Score and evaluate project submissions with direct GitHub & demo links.</li>
                <li>Broadcast high-priority announcements to Discord and participant portals.</li>
                <li>Update hackathon timeline & submission deadlines under <span className="text-cyan-300">Settings</span>.</li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3 text-xs font-mono">
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[#8ea1ff] hover:underline"
              >
                <DiscordIcon className="w-4 h-4" />
                <span>Discord Ops</span>
              </a>
              <a
                href="mailto:support@aithon.io"
                className="flex items-center gap-1.5 text-cyan-400 hover:underline"
              >
                <MailIcon className="w-4 h-4" />
                <span>Contact Tech Lead</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
