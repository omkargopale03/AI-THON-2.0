import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import AdminLayout from '../../components/admin/AdminLayout'
import StatusBadge from '../../components/admin/StatusBadge'
import { SearchIcon, FilterIcon, EyeIcon, GithubIcon, GlobeIcon } from '../../components/Icons'

export default function AdminSubmissions() {
  const { submissions } = useAdmin()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filtered = submissions.filter((s) => {
    const matchesSearch =
      s.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.track.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.techStack.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus =
      statusFilter === 'ALL' || s.status.toUpperCase().replace(/\s+/g, '_') === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <AdminLayout
      title="Project Submissions"
      breadcrumbs={[{ label: 'Management' }, { label: 'Submissions' }]}
    >
      <div className="space-y-6 animate-fadeIn">
        {/* Header & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-extrabold font-mono text-white tracking-tight m-0">
              Project Submissions
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Review code repositories, live prototypes, and evaluation scores from participating teams.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-[#0d111d] border border-slate-800 text-slate-300">
              Total Submissions: <strong className="text-cyan-400">{submissions.length}</strong>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
              Shortlisted: {submissions.filter((s) => s.status === 'Shortlisted').length}
            </span>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="p-4 rounded-2xl bg-[#0d111d] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search project title, team, tech..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#090b14] border border-slate-800 text-xs font-sans text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono overflow-x-auto w-full sm:w-auto">
            <div className="px-2 text-slate-500 flex items-center gap-1">
              <FilterIcon className="w-3.5 h-3.5" />
            </div>
            {[
              { label: 'ALL', val: 'ALL' },
              { label: 'SUBMITTED', val: 'SUBMITTED' },
              { label: 'UNDER REVIEW', val: 'UNDER_REVIEW' },
              { label: 'SHORTLISTED', val: 'SHORTLISTED' },
            ].map((st) => (
              <button
                key={st.val}
                type="button"
                onClick={() => setStatusFilter(st.val)}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === st.val
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submissions Table */}
        <div className="rounded-2xl bg-[#0d111d] border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="text-[11px] font-mono uppercase text-slate-400 bg-slate-900/50 border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Submission ID</th>
                  <th className="py-3.5 px-4">Project & Team</th>
                  <th className="py-3.5 px-4">Track</th>
                  <th className="py-3.5 px-4">Tech Stack</th>
                  <th className="py-3.5 px-4">Score</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Submitted At</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500 font-mono text-xs">
                      No project submissions match the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filtered.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-900/40 transition-colors group">
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                        <Link to={`/admin/submissions/${s.id}`} className="hover:underline">
                          {s.id}
                        </Link>
                      </td>
                      <td className="py-3.5 px-4">
                        <Link
                          to={`/admin/submissions/${s.id}`}
                          className="font-semibold text-slate-100 hover:text-cyan-300 block max-w-xs truncate"
                        >
                          {s.projectTitle}
                        </Link>
                        <span className="text-[11px] text-slate-400 font-mono">{s.teamName}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-[10px]">
                          {s.track}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[180px]">
                          {s.techStack.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="px-1.5 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-300 border border-slate-800"
                            >
                              {t}
                            </span>
                          ))}
                          {s.techStack.length > 3 && (
                            <span className="text-[10px] font-mono text-slate-500">
                              +{s.techStack.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-200">
                        {s.score ? `${s.score}/100` : '—'}
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={s.status} />
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                        {s.submittedAt}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {s.repoUrl && (
                            <a
                              href={s.repoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                              title="GitHub Repo"
                            >
                              <GithubIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {s.demoUrl && (
                            <a
                              href={s.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                              title="Live Demo"
                            >
                              <GlobeIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <Link
                            to={`/admin/submissions/${s.id}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] transition-colors"
                          >
                            <EyeIcon className="w-3.5 h-3.5" />
                            <span>Evaluate</span>
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
