import { useState, useEffect } from 'react'
import { XMarkIcon } from '../Icons'
import { REJECTION_REASONS } from '../../data/adminMockData'

/**
 * RejectTeamModal — Modal for collecting rejection reason with validation.
 * Note: Pass a unique `key` when opening (e.g. key={teamId}) to reset state automatically.
 *
 * Props:
 *   isOpen: boolean
 *   teamName: string
 *   onConfirm: (reason: string, additionalDetails: string) => void
 *   onCancel: () => void
 */
export default function RejectTeamModal({ isOpen, teamName, onConfirm, onCancel }) {
  const [selectedReason, setSelectedReason] = useState('')
  const [additionalDetails, setAdditionalDetails] = useState('')
  const [validationError, setValidationError] = useState('')

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') onCancel() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onCancel])

  const isOtherSelected = selectedReason === 'Other'

  const handleCancel = () => {
    // Reset local state before closing so next open starts fresh
    setSelectedReason('')
    setAdditionalDetails('')
    setValidationError('')
    onCancel()
  }

  const handleConfirm = () => {
    // Validation: reason must be selected
    if (!selectedReason) {
      setValidationError('Please provide a reason for rejecting this team.')
      return
    }
    // If "Other" is selected, additional details are required
    if (isOtherSelected && !additionalDetails.trim()) {
      setValidationError('Please provide additional details when selecting "Other".')
      return
    }
    setValidationError('')
    onConfirm(selectedReason, additionalDetails.trim())
    // Reset after successful submit
    setSelectedReason('')
    setAdditionalDetails('')
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reject-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleCancel}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0e1220] border border-rose-500/20 shadow-[0_0_40px_rgba(239,68,68,0.10)] p-6 space-y-5 animate-fadeIn">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <XMarkIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 id="reject-modal-title" className="text-base font-mono font-bold text-white m-0">
                Reject Team
              </h2>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                A rejection reason is required.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Team Name Display */}
        <div className="px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block mb-1">Team:</span>
          <span className="text-sm font-mono font-bold text-white">&ldquo;{teamName}&rdquo;</span>
        </div>

        {/* Rejection Reason Select */}
        <div className="space-y-2">
          <label htmlFor="rejection-reason" className="block text-xs font-mono font-semibold text-slate-300">
            Reason for Rejection <span className="text-rose-400">*</span>
          </label>
          <select
            id="rejection-reason"
            value={selectedReason}
            onChange={(e) => {
              setSelectedReason(e.target.value)
              setValidationError('')
            }}
            className="w-full rounded-xl bg-[#090b14] border border-slate-800 px-3 py-2.5 text-xs font-mono text-slate-100 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30 cursor-pointer"
          >
            <option value="">— Select a reason —</option>
            {REJECTION_REASONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Additional Details Textarea */}
        <div className="space-y-2">
          <label htmlFor="rejection-details" className="block text-xs font-mono font-semibold text-slate-300">
            Additional Details
            {isOtherSelected && <span className="text-rose-400 ml-1">*</span>}
            {!isOtherSelected && <span className="text-slate-500 ml-1">(optional)</span>}
          </label>
          <textarea
            id="rejection-details"
            rows={3}
            value={additionalDetails}
            onChange={(e) => {
              setAdditionalDetails(e.target.value)
              setValidationError('')
            }}
            placeholder={
              isOtherSelected
                ? 'Describe the specific reason for rejection...'
                : 'Optionally provide more context or specific details...'
            }
            className="w-full rounded-xl bg-[#090b14] border border-slate-800 p-3 text-xs font-sans text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30 resize-none"
          />
        </div>

        {/* Validation Error (inline, no alert()) */}
        {validationError && (
          <div
            role="alert"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs font-mono"
          >
            <span className="text-rose-400 font-bold shrink-0">!</span>
            <span>{validationError}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono font-semibold transition-colors cursor-pointer"
          >
            CANCEL
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <XMarkIcon className="w-4 h-4" />
            <span>REJECT TEAM</span>
          </button>
        </div>
      </div>
    </div>
  )
}
