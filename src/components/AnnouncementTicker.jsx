export default function AnnouncementTicker() {
  return (
    <div className="w-full bg-[#062b59] overflow-hidden flex items-center h-10">
      <div className="bg-[#ea580c] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 flex-shrink-0 z-10 flex items-center h-full">
        ANNOUNCEMENTS
      </div>
      
      <div className="flex-1 overflow-hidden relative h-full">
        <div className="absolute whitespace-nowrap will-change-transform animate-[marquee_20s_linear_infinite] flex items-center h-full">
          <span className="text-xs font-medium text-white tracking-wide">
            AITHON 2.0 • 9 OCTOBER 2026 • 12 HOURS • NATIONAL LEVEL AI HACKATHON • AVCOE SANGAMNER
            <span className="mx-8 opacity-50">•</span>
            AITHON 2.0 • 9 OCTOBER 2026 • 12 HOURS • NATIONAL LEVEL AI HACKATHON • AVCOE SANGAMNER
            <span className="mx-8 opacity-50">•</span>
            AITHON 2.0 • 9 OCTOBER 2026 • 12 HOURS • NATIONAL LEVEL AI HACKATHON • AVCOE SANGAMNER
          </span>
        </div>
      </div>
    </div>
  )
}
