import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import AdminLayout from '../../components/admin/AdminLayout'
import StatusBadge from '../../components/admin/StatusBadge'
import {
  MailIcon,
  PhoneIcon,
  AcademicCapIcon,
  MapPinIcon,
  GithubIcon,
  LinkedinIcon,
  UsersIcon,
  ArrowLeftIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon,
} from '../../components/Icons'

export default function AdminParticipantDetail() {
  const { id } = useParams()
  const { participants, teams, updateParticipantStatus } = useAdmin()
  const navigate = useNavigate()

  const participant = participants.find((p) => p.id === id) || participants[0]
  const team = teams.find((t) => t.id === participant.teamId || t.name === participant.teamName)

  return (
    <AdminLayout
      title={`Participant: ${participant.name}`}
      breadcrumbs={[
        { label: 'Management' },
        { label: 'Participants', path: '/admin/participants' },
        { label: participant.id },
      ]}
    >
      <div className="space-y-6 animate-fadeIn max-w-5xl">
        {/* Top Back Button & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <button
            type="button"
            onClick={() => navigate('/admin/participants')}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to Participants List</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Current Status:</span>
            <StatusBadge status={participant.status} />

            <div className="h-4 w-px bg-slate-800 mx-1" />

            <button
              type="button"
              onClick={() => updateParticipantStatus(participant.id, 'Approved')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              <CheckIcon className="w-3.5 h-3.5" />
              <span>Approve</span>
            </button>

            <button
              type="button"
              onClick={() => updateParticipantStatus(participant.id, 'Pending')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              <ClockIcon className="w-3.5 h-3.5" />
              <span>Hold</span>
            </button>

            <button
              type="button"
              onClick={() => updateParticipantStatus(participant.id, 'Rejected')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              <XMarkIcon className="w-3.5 h-3.5" />
              <span>Reject</span>
            </button>
          </div>
        </div>

        {/* 2-Column Profile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column: Personal & College Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Info Card */}
            <div className="rounded-2xl bg-[#0d111d] border border-slate-800 p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-xl font-bold font-mono text-black shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    {participant.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-mono font-bold text-white m-0">
                      {participant.name}
                    </h2>
                    <p className="text-xs font-mono text-cyan-400 mt-0.5">
                      Registration ID: {participant.id} • Registered on {participant.registeredDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Detail Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80 text-xs font-sans">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <MailIcon className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-slate-400">Email Address</span>
                    <span className="text-slate-100 font-medium truncate">{participant.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <PhoneIcon className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-slate-400">Phone Number</span>
                    <span className="text-slate-100 font-mono font-medium">{participant.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <AcademicCapIcon className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-slate-400">College / University</span>
                    <span className="text-slate-100 font-medium">{participant.college}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <MapPinIcon className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-slate-400">City / Location</span>
                    <span className="text-slate-100 font-medium">{participant.city || 'India'}</span>
                  </div>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
                  Declared Technical Skills
                </span>
                <div className="flex flex-wrap gap-2">
                  {(participant.skills || ['Python', 'AI/ML', 'React']).map((sk) => (
                    <span
                      key={sk}
                      className="px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Team & Social Links */}
          <div className="space-y-6">
            {/* Team Info Card */}
            <div className="rounded-2xl bg-[#0d111d] border border-slate-800 p-5 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-slate-200">
                <UsersIcon className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider m-0">
                  Team Association
                </h3>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">TEAM NAME</span>
                <Link
                  to={team ? `/admin/teams/${team.id}` : '/admin/teams'}
                  className="text-sm font-mono font-bold text-cyan-400 hover:underline"
                >
                  {participant.teamName}
                </Link>
                <span className="text-xs text-slate-400 block mt-0.5 font-sans">
                  Role: <strong className="text-slate-200">{participant.role}</strong>
                </span>
              </div>

              {team && (
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2 text-xs font-sans">
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-slate-400">Team Size:</span>
                    <span className="text-slate-200 font-bold">{team.teamSize} Members</span>
                  </div>
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-slate-400">Submission Track:</span>
                    <span className="text-cyan-300 truncate max-w-[140px]">{team.track}</span>
                  </div>
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-slate-400">Team Status:</span>
                    <StatusBadge status={team.status} />
                  </div>
                </div>
              )}
            </div>

            {/* Social Links Card */}
            <div className="rounded-2xl bg-[#0d111d] border border-slate-800 p-5 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800 m-0">
                Developer Links
              </h3>
              <div className="space-y-2 text-xs font-mono">
                {participant.github && (
                  <a
                    href={participant.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    <GithubIcon className="w-4 h-4 text-slate-400" />
                    <span className="truncate">GitHub Profile</span>
                  </a>
                )}
                {participant.linkedin && (
                  <a
                    href={participant.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#0077b5]" />
                    <span className="truncate">LinkedIn Profile</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
