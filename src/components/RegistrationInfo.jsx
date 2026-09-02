import {
  ClockIcon,
  UsersIcon,
  TagIcon,
  CalendarIcon,
  DiscordIcon,
  InfoIcon,
} from './Icons'

export default function RegistrationInfo() {
  const infoItems = [
    {
      label: 'Form Duration',
      value: '~ 8–10 Minutes',
      icon: ClockIcon,
    },
    {
      label: 'Team Size',
      value: '2–4 Members',
      icon: UsersIcon,
    },
    {
      label: 'Registration Fee',
      value: 'Free',
      badge: '100% FREE',
      icon: TagIcon,
    },
    {
      label: 'Hackathon Duration',
      value: '48 Hours',
      icon: CalendarIcon,
    },
  ]

  return (
    <aside className="w-full space-y-6">
      {/* Registration Info Panel */}
      <div className="relative rounded-2xl bg-[#090d1a]/85 border border-cyan-500/30 p-6 backdrop-blur-xl shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Panel Header */}
        <div className="flex items-center gap-2.5 pb-4 border-b border-cyan-500/20 mb-5">
          <div className="p-1.5 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-400">
            <InfoIcon className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold font-mono tracking-wider text-white uppercase m-0">
            REGISTRATION INFO
          </h2>
        </div>

        {/* Info Grid / Items */}
        <div className="space-y-4">
          {infoItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-[#0e1428]/60 border border-cyan-500/15 hover:border-cyan-400/35 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono uppercase text-slate-400">
                      {item.label}
                    </span>
                    <span className="block text-sm font-semibold text-slate-100">
                      {item.value}
                    </span>
                  </div>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                    {item.badge}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Perks Note */}
        <div className="mt-5 p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-slate-300 text-xs leading-relaxed font-sans">
          <span className="text-cyan-400 font-mono font-bold">⚡ Quick Tip:</span> Ensure your team lead and member email addresses match your GitHub/Discord IDs for smooth communication.
        </div>
      </div>

      {/* Need Help / Discord Support Panel */}
      <div className="relative rounded-2xl bg-[#090d1a]/85 border border-cyan-500/30 p-6 backdrop-blur-xl shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] overflow-hidden">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
          <h2 className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase m-0">
            NEED HELP?
          </h2>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Join our Discord server for instant query resolution, teammate matching, and official announcements.
        </p>

        <a
          href="https://discord.gg"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#5865F2]/20 hover:bg-[#5865F2] text-[#8ea1ff] hover:text-white border border-[#5865F2]/40 hover:border-[#5865F2] font-mono text-xs font-bold tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(88,101,242,0.2)] hover:shadow-[0_0_20px_rgba(88,101,242,0.5)] group"
        >
          <DiscordIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
          <span>JOIN DISCORD</span>
        </a>
      </div>
    </aside>
  )
}
