export default function StatusBadge({ status }) {
  const getBadgeStyle = (st) => {
    switch (st?.toLowerCase()) {
      case 'approved':
      case 'shortlisted':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
      case 'pending':
      case 'under review':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30'
      case 'rejected':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30'
      case 'submitted':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
      case 'draft':
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-700'
    }
  }

  const getDotStyle = (st) => {
    switch (st?.toLowerCase()) {
      case 'approved':
      case 'shortlisted':
        return 'bg-emerald-400'
      case 'pending':
      case 'under review':
        return 'bg-amber-400 animate-pulse'
      case 'rejected':
        return 'bg-rose-400'
      case 'submitted':
        return 'bg-cyan-400'
      case 'draft':
      default:
        return 'bg-slate-400'
    }
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium border uppercase tracking-wider ${getBadgeStyle(
        status
      )}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getDotStyle(status)}`} />
      <span>{status || 'Unknown'}</span>
    </span>
  )
}
