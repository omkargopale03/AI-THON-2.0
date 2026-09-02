import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import AdminLayout from '../../components/admin/AdminLayout'
import StatusBadge from '../../components/admin/StatusBadge'
import {
  GithubIcon,
  GlobeIcon,
  ArrowLeftIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon,
  SparklesIcon,
} from '../../components/Icons'

export default function AdminSubmissionDetail() {
  const { id } = useParams()
  const { submissions, updateSubmissionStatus } = useAdmin()
  const navigate = useNavigate()

  const submission = submissions.find((s) => s.id === id) || submissions[0]

  const [score, setScore] = useState(submission.score || 85)
  const [feedback, setFeedback] = useState(submission.feedback || '')
  const [savedNotice, setSavedNotice] = useState(false)

  const handleSaveEvaluation = (e) => {
    e.preventDefault()
    updateSubmissionStatus(submission.id, submission.status, feedback, Number(score))
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 3000)
  }

  const handleSetStatus = (newStatus) => {
    updateSubmissionStatus(submission.id, newStatus, feedback, Number(score))
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 3000)
  }

  return (
    <AdminLayout
      title={`Submission: ${submission.id}`}
      breadcrumbs={[
        { label: 'Management' },
        { label: 'Submissions', path: '/admin/submissions' },
        { label: submission.id },
      ]}
    >
      <div className="space-y-6 animate-fadeIn max-w-5xl">
        {/* Top Back & Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <button
            type="button"
            onClick={() => navigate('/admin/submissions')}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to Submissions</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Current Status:</span>
            <StatusBadge status={submission.status} />

            <div className="h-4 w-px bg-slate-800 mx-1" />

            <button
              type="button"
              onClick={() => handleSetStatus('Shortlisted')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              <CheckIcon className="w-3.5 h-3.5" />
              <span>Shortlist</span>
            </button>

            <button
              type="button"
              onClick={() => handleSetStatus('Under Review')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              <ClockIcon className="w-3.5 h-3.5" />
              <span>Under Review</span>
            </button>

            <button
              type="button"
              onClick={() => handleSetStatus('Rejected')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              <XMarkIcon className="w-3.5 h-3.5" />
              <span>Reject</span>
            </button>
          </div>
        </div>

        {savedNotice && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between animate-fadeIn">
            <span>✓ Submission evaluation and score updated successfully.</span>
          </div>
        )}

        {/* 2-Column Evaluation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column: Project Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-[#0d111d] border border-slate-800 p-6 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-mono">
                    {submission.track}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    ID: {submission.id} • Submitted: {submission.submittedAt}
                  </span>
                </div>
                <h2 className="text-2xl font-mono font-bold text-white tracking-tight m-0">
                  {submission.projectTitle}
                </h2>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {submission.tagline}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Tech Stack & Frameworks
                </span>
                <div className="flex flex-wrap gap-2">
                  {submission.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Deliverable Links */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Project Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  {submission.repoUrl && (
                    <a
                      href={submission.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <GithubIcon className="w-4 h-4 text-cyan-400" />
                        <span>Source Code Repository</span>
                      </div>
                      <span className="text-slate-500">↗</span>
                    </a>
                  )}

                  {submission.demoUrl && (
                    <a
                      href={submission.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <GlobeIcon className="w-4 h-4 text-cyan-400" />
                        <span>Live Prototype Demo</span>
                      </div>
                      <span className="text-slate-500">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Judge Score & Feedback Card */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-[#0d111d] border border-slate-800 p-6 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-slate-200">
                <SparklesIcon className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider m-0">
                  Judge Scoring & Evaluation
                </h3>
              </div>

              <form onSubmit={handleSaveEvaluation} className="space-y-4">
                {/* Score Input Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-mono font-semibold text-slate-300">
                      Evaluation Score
                    </label>
                    <span className="text-lg font-mono font-extrabold text-cyan-400">
                      {score}/100
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Feedback */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-slate-300">
                    Judge Review Feedback
                  </label>
                  <textarea
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter rubric evaluation feedback, innovation comments, or review notes..."
                    className="w-full rounded-xl bg-[#090b14] border border-slate-800 p-3 text-xs font-sans text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
                >
                  Save Evaluation
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
