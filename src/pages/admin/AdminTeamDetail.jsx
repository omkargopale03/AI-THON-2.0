import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import AdminLayout from '../../components/admin/AdminLayout'
import StatusBadge from '../../components/admin/StatusBadge'
import {
  UsersIcon,
  MailIcon,
  AcademicCapIcon,
  SubmissionIcon,
  ArrowLeftIcon,
  ArrowRightIcon as ExternalLinkIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon,
} from '../../components/Icons'

export default function AdminTeamDetail() {
  const { id } = useParams()
  const { teams, submissions, updateTeamStatus } = useAdmin()
  const navigate = useNavigate()

  const team = teams.find((t) => t.id === id) || teams[0]
  const submission = submissions.find((s) => s.teamId === team.id || s.teamName === team.name)

  return (
    <AdminLayout
      title={`Team: ${team.name}`}
      breadcrumbs={[
        { label: 'Management' },
        { label: 'Teams', path: '/admin/teams' },
        { label: team.id },
      ]}
    >
      <div className="space-y-6 animate-fadeIn max-w-5xl">
        {/* Top Back & Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <button
            type="button"
            onClick={() => navigate('/admin/teams')}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to Teams List</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Team Status:</span>
            <StatusBadge status={team.status} />

            <div className="h-4 w-px bg-slate-800 mx-1" />

            <button
              type="button"
              onClick={() => updateTeamStatus(team.id, 'Approved')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              <CheckIcon className="w-3.5 h-3.5" />
              <span>Approve</span>
            </button>

            <button
              type="button"
              onClick={() => updateTeamStatus(team.id, 'Pending')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              <ClockIcon className="w-3.5 h-3.5" />
              <span>Pending</span>
            </button>

            <button
              type="button"
              onClick={() => updateTeamStatus(team.id, 'Rejected')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              <XMarkIcon className="w-3.5 h-3.5" />
              <span>Reject</span>
            </button>
          </div>
        </div>

        {/* Team Summary Card */}
        <div className="rounded-2xl bg-[#0d111d] border border-slate-800 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <UsersIcon className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-mono font-bold text-white m-0 flex items-center gap-2">
                  {team.name}
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                    {team.id}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-1 font-sans">
                  {team.college} • Registered on {team.registeredDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300">
                Track: <strong className="text-white">{team.track}</strong>
              </span>
            </div>
          </div>

          {/* Members Roster Grid */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 m-0">
              Team Roster ({team.members?.length || team.teamSize} Members)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(team.members || []).map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-[10px] font-mono font-bold text-cyan-400">
                        {idx + 1}
                      </div>
                      <span className="font-semibold text-slate-100 text-xs">{m.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded">
                      {m.role || (idx === 0 ? 'Leader' : 'Member')}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 font-sans flex items-center gap-2">
                    <MailIcon className="w-3.5 h-3.5 text-slate-500" />
                    <span>{m.email}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans flex items-center gap-2">
                    <AcademicCapIcon className="w-3.5 h-3.5 text-slate-500" />
                    <span>{m.college}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Linked Project Submission Section */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 m-0 flex items-center gap-2">
                <SubmissionIcon className="w-4 h-4 text-cyan-400" />
                <span>Project Submission Details</span>
              </h3>
              {submission && <StatusBadge status={submission.status} />}
            </div>

            {submission ? (
              <div className="p-4 rounded-xl bg-[#090b14] border border-slate-800 space-y-3">
                <div>
                  <h4 className="text-sm font-mono font-bold text-white m-0">
                    {submission.projectTitle}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans mt-1">
                    {submission.tagline}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {submission.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[11px] font-mono text-slate-500">
                    Submitted on {submission.submittedAt} • Score:{' '}
                    <strong className="text-cyan-400">{submission.score}/100</strong>
                  </span>
                  <Link
                    to={`/admin/submissions/${submission.id}`}
                    className="text-xs font-mono font-semibold text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>Evaluate Submission</span>
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-xs font-mono text-slate-500">
                No project submission uploaded yet by this team.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
