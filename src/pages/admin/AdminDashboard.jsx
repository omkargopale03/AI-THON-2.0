import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import AdminLayout from '../../components/admin/AdminLayout'
import StatCard from '../../components/admin/StatCard'
import StatusBadge from '../../components/admin/StatusBadge'
import CreateAnnouncementModal from '../../components/admin/CreateAnnouncementModal'
import {
  UserIcon,
  UsersIcon,
  SubmissionIcon,
  ClockIcon,
  PlusIcon,
  ArrowRightIcon,
  EyeIcon,
  SparklesIcon,
} from '../../components/Icons'

export default function AdminDashboard() {
  const { stats, analytics, participants, teams, submissions } = useAdmin()
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false)
  const [chartView, setChartView] = useState('7days') // 'today', 'yesterday', '7days'
  const navigate = useNavigate()

  // Calculate team status distribution
  const teamStatusCounts = {
    approved: teams.filter((t) => t.status === 'Approved').length,
    pending: teams.filter((t) => t.status === 'Pending').length,
    rejected: teams.filter((t) => t.status === 'Rejected').length,
  }
  const totalTeamsCount = teams.length || 1

  // Calculate submission status distribution
  const subStatusCounts = {
    submitted: submissions.filter((s) => s.status === 'Submitted').length,
    underReview: submissions.filter((s) => s.status === 'Under Review').length,
    shortlisted: submissions.filter((s) => s.status === 'Shortlisted').length,
    rejected: submissions.filter((s) => s.status === 'Rejected').length,
  }
  const totalSubsCount = submissions.length || 1

  // Chart SVG Coordinates Generator for 7 days data
  const dataPoints = analytics.last7Days
  const maxVal = Math.max(...dataPoints.map((d) => d.count), 80)
  const chartHeight = 160
  const chartWidth = 560
  const stepX = chartWidth / (dataPoints.length - 1)

  const points = dataPoints.map((d, i) => {
    const x = i * stepX
    const y = chartHeight - (d.count / maxVal) * (chartHeight - 30) - 15
    return { x, y, count: d.count, day: d.day }
  })

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x},${p.y}` : `${acc} L ${p.x},${p.y}`
  }, '')

  const areaD = `${pathD} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8 animate-fadeIn">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight m-0">
              Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
              Welcome back, Admin. Here's what's happening with{' '}
              <span className="text-cyan-400 font-mono font-semibold">AI THON 2.0</span>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAnnouncementModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] cursor-pointer"
          >
            <PlusIcon className="w-4 h-4 stroke-[2.5]" />
            <span>CREATE ANNOUNCEMENT</span>
          </button>
        </div>

        {/* 4 Professional Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <StatCard
            title="TOTAL PARTICIPANTS"
            value={stats.totalParticipants.value}
            change={stats.totalParticipants.change}
            isPositive={stats.totalParticipants.isPositive}
            subtext={stats.totalParticipants.subtext}
            icon={UserIcon}
          />
          <StatCard
            title="TOTAL TEAMS"
            value={stats.totalTeams.value}
            change={stats.totalTeams.change}
            isPositive={stats.totalTeams.isPositive}
            subtext={stats.totalTeams.subtext}
            icon={UsersIcon}
          />
          <StatCard
            title="SUBMISSIONS"
            value={stats.submissions.value}
            change={stats.submissions.change}
            isPositive={stats.submissions.isPositive}
            subtext={stats.submissions.subtext}
            icon={SubmissionIcon}
          />
          <StatCard
            title="PENDING REVIEW"
            value={stats.pendingReview.value}
            change={stats.pendingReview.change}
            isPositive={stats.pendingReview.isPositive}
            subtext={stats.pendingReview.subtext}
            icon={ClockIcon}
          />
        </div>

        {/* Analytics Section (2-Column Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Registration Analytics Visual */}
          <div className="lg:col-span-8 rounded-2xl bg-[#0d111d] border border-slate-800 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800/80 gap-3">
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 m-0">
                  REGISTRATION ANALYTICS
                </h2>
                <span className="text-[11px] text-slate-400 font-mono">
                  Participant sign-up volume over the past 7 days
                </span>
              </div>

              {/* Time Range Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => setChartView('today')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    chartView === 'today'
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Today ({analytics.todayCount})
                </button>
                <button
                  type="button"
                  onClick={() => setChartView('yesterday')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    chartView === 'yesterday'
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Yesterday ({analytics.yesterdayCount})
                </button>
                <button
                  type="button"
                  onClick={() => setChartView('7days')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    chartView === '7days'
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Last 7 Days
                </button>
              </div>
            </div>

            {/* Custom SVG Line/Area Chart */}
            <div className="relative w-full overflow-hidden">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-44 sm:h-52 overflow-visible"
              >
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                    <stop offset="90%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>

                {/* Subtle Horizontal Grid lines */}
                {[0.25, 0.5, 0.75].map((factor, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={chartHeight * factor}
                    x2={chartWidth}
                    y2={chartHeight * factor}
                    stroke="#1e293b"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                ))}

                {/* Area Fill */}
                <path d={areaD} fill="url(#areaGradient)" />

                {/* Smooth Stroke Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Interactive Points */}
                {points.map((p, i) => (
                  <g key={i} className="group cursor-pointer">
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      className="fill-cyan-400 stroke-[#0d111d] stroke-2 group-hover:r-6 transition-all"
                    />
                    <text
                      x={p.x}
                      y={p.y - 10}
                      textAnchor="middle"
                      className="text-[10px] fill-slate-300 font-mono opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                    >
                      {p.count}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Day Labels along bottom */}
              <div className="flex justify-between pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                {points.map((p, i) => (
                  <span key={i} className="text-center font-medium">
                    {p.day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Quick Actions Card */}
          <div className="lg:col-span-4 rounded-2xl bg-[#0d111d] border border-slate-800 p-5 sm:p-6 space-y-4">
            <div className="pb-3 border-b border-slate-800/80">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 m-0">
                QUICK ACTIONS
              </h2>
              <span className="text-[11px] text-slate-400 font-mono">
                Admin workflow shortcuts
              </span>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setAnnouncementModalOpen(true)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-cyan-950/20 text-slate-200 hover:text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-950/70 text-cyan-400 group-hover:scale-105 transition-transform">
                    <SparklesIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-semibold">+ Create Announcement</span>
                </div>
                <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/participants')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-cyan-950/20 text-slate-200 hover:text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 group-hover:scale-105 transition-transform">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-semibold">View Participants</span>
                </div>
                <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/teams')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-cyan-950/20 text-slate-200 hover:text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 group-hover:scale-105 transition-transform">
                    <UsersIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-semibold">Manage Teams</span>
                </div>
                <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/submissions')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-cyan-950/20 text-slate-200 hover:text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 group-hover:scale-105 transition-transform">
                    <SubmissionIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-semibold">Review Submissions</span>
                </div>
                <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Registrations Full-Width Table */}
        <div className="rounded-2xl bg-[#0d111d] border border-slate-800 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white m-0">
                Recent Registrations
              </h2>
              <span className="text-[11px] text-slate-400 font-mono">
                Latest participants queued for review
              </span>
            </div>

            <Link
              to="/admin/participants"
              className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>View All</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="text-[11px] font-mono uppercase text-slate-400 border-b border-slate-800/80">
                <tr>
                  <th className="py-3 px-3">Registration ID</th>
                  <th className="py-3 px-3">Participant</th>
                  <th className="py-3 px-3">College</th>
                  <th className="py-3 px-3">Team</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Registered</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {participants.slice(0, 5).map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/40 transition-colors group">
                    <td className="py-3 px-3 font-mono font-bold text-cyan-400">
                      {p.id}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-100">{p.name}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[180px]">{p.email}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{p.college}</td>
                    <td className="py-3 px-3 font-mono text-slate-200">{p.teamName}</td>
                    <td className="py-3 px-3">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">
                      {p.registeredDate}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        to={`/admin/participants/${p.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 text-[11px] font-mono transition-colors"
                      >
                        <EyeIcon className="w-3.5 h-3.5 text-cyan-400" />
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Secondary Analytics: 2 Equal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: TEAM STATUS */}
          <div className="rounded-2xl bg-[#0d111d] border border-slate-800 p-5 sm:p-6 space-y-4">
            <div className="pb-3 border-b border-slate-800">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 m-0">
                TEAM STATUS BREAKDOWN
              </h2>
              <span className="text-[11px] text-slate-400 font-mono">
                Verification status across all {teams.length} registered teams
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Approved */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Approved
                  </span>
                  <span className="text-slate-300">
                    {teamStatusCounts.approved} (
                    {Math.round((teamStatusCounts.approved / totalTeamsCount) * 100)}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{
                      width: `${(teamStatusCounts.approved / totalTeamsCount) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Pending */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Pending Review
                  </span>
                  <span className="text-slate-300">
                    {teamStatusCounts.pending} (
                    {Math.round((teamStatusCounts.pending / totalTeamsCount) * 100)}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{
                      width: `${(teamStatusCounts.pending / totalTeamsCount) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Rejected */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    Rejected
                  </span>
                  <span className="text-slate-300">
                    {teamStatusCounts.rejected} (
                    {Math.round((teamStatusCounts.rejected / totalTeamsCount) * 100)}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full"
                    style={{
                      width: `${(teamStatusCounts.rejected / totalTeamsCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: SUBMISSION STATUS */}
          <div className="rounded-2xl bg-[#0d111d] border border-slate-800 p-5 sm:p-6 space-y-4">
            <div className="pb-3 border-b border-slate-800">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 m-0">
                SUBMISSION STATUS PIPELINE
              </h2>
              <span className="text-[11px] text-slate-400 font-mono">
                Evaluation pipeline across {submissions.length} project repositories
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Submitted */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Submitted
                  </span>
                  <span className="text-slate-300">
                    {subStatusCounts.submitted} (
                    {Math.round((subStatusCounts.submitted / totalSubsCount) * 100)}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-full"
                    style={{
                      width: `${(subStatusCounts.submitted / totalSubsCount) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Under Review */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Under Review
                  </span>
                  <span className="text-slate-300">
                    {subStatusCounts.underReview} (
                    {Math.round((subStatusCounts.underReview / totalSubsCount) * 100)}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{
                      width: `${(subStatusCounts.underReview / totalSubsCount) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Shortlisted */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Shortlisted
                  </span>
                  <span className="text-slate-300">
                    {subStatusCounts.shortlisted} (
                    {Math.round((subStatusCounts.shortlisted / totalSubsCount) * 100)}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{
                      width: `${(subStatusCounts.shortlisted / totalSubsCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Broadcast Announcement Modal */}
      <CreateAnnouncementModal
        isOpen={announcementModalOpen}
        onClose={() => setAnnouncementModalOpen(false)}
      />
    </AdminLayout>
  )
}
