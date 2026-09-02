import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import AdminLayout from '../../components/admin/AdminLayout'
import StatusBadge from '../../components/admin/StatusBadge'
import { SearchIcon, FilterIcon, EyeIcon, CheckIcon, XMarkIcon } from '../../components/Icons'

export default function AdminTeams() {
  const { teams, updateTeamStatus } = useAdmin()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filtered = teams.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.track.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || t.status.toUpperCase() === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <AdminLayout
      title="Teams"
      breadcrumbs={[{ label: 'Management' }, { label: 'Teams' }]}
    >
      <div className="space-y-6 animate-fadeIn">
        {/* Header & Stats Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-extrabold font-mono text-white tracking-tight m-0">
              Team Management
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Review team rosters, track allocations, project submission readiness, and verification status.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-[#0d111d] border border-slate-800 text-slate-300">
              Total Teams: <strong className="text-cyan-400">{teams.length}</strong>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
              Approved: {teams.filter((t) => t.status === 'Approved').length}
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-[#0d111d] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search team name, leader, track, college..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#090b14] border border-slate-800 text-xs font-sans text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono overflow-x-auto w-full sm:w-auto">
            <div className="px-2 text-slate-500 flex items-center gap-1">
              <FilterIcon className="w-3.5 h-3.5" />
            </div>
            {['ALL', 'APPROVED', 'PENDING', 'REJECTED'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Teams Table */}
        <div className="rounded-2xl bg-[#0d111d] border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="text-[11px] font-mono uppercase text-slate-400 bg-slate-900/50 border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Team ID & Name</th>
                  <th className="py-3.5 px-4">Team Leader</th>
                  <th className="py-3.5 px-4">College</th>
                  <th className="py-3.5 px-4">Track</th>
                  <th className="py-3.5 px-4">Roster Size</th>
                  <th className="py-3.5 px-4">Verification</th>
                  <th className="py-3.5 px-4">Submission</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500 font-mono text-xs">
                      No teams found matching current search query.
                    </td>
                  </tr>
                ) : (
                  filtered.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-900/40 transition-colors group">
                      <td className="py-3.5 px-4">
                        <Link
                          to={`/admin/teams/${t.id}`}
                          className="font-mono font-bold text-slate-100 hover:text-cyan-400 block"
                        >
                          {t.name}
                        </Link>
                        <span className="text-[10px] font-mono text-cyan-400/80">{t.id}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-200">{t.leadName}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[160px]">{t.leadEmail}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 truncate max-w-[160px]">{t.college}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-[10px]">
                          {t.track}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-200">
                        {t.teamSize} Members
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={t.status} />
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={t.submissionStatus} />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {t.status !== 'Approved' && (
                            <button
                              type="button"
                              onClick={() => updateTeamStatus(t.id, 'Approved')}
                              title="Approve Team"
                              className="p-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-400 transition-colors cursor-pointer"
                            >
                              <CheckIcon className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {t.status !== 'Rejected' && (
                            <button
                              type="button"
                              onClick={() => updateTeamStatus(t.id, 'Rejected')}
                              title="Reject Team"
                              className="p-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 border border-rose-500/30 text-rose-400 transition-colors cursor-pointer"
                            >
                              <XMarkIcon className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <Link
                            to={`/admin/teams/${t.id}`}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 transition-colors inline-block"
                            title="View Full Team"
                          >
                            <EyeIcon className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
