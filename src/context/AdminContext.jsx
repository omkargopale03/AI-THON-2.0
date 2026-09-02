/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import {
  INITIAL_STATS,
  REGISTRATION_ANALYTICS,
  INITIAL_PARTICIPANTS,
  INITIAL_TEAMS,
  INITIAL_SUBMISSIONS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_SETTINGS,
} from '../data/adminMockData'

const AdminContext = createContext(null)

// Helper: format current timestamp as a readable string
function nowTimestamp() {
  const d = new Date()
  const date = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  const time = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
  return `${date} ${time}`
}

export function AdminProvider({ children }) {
  const [stats, setStats] = useState(INITIAL_STATS)
  const [analytics] = useState(REGISTRATION_ANALYTICS)
  const [participants, setParticipants] = useState(INITIAL_PARTICIPANTS)
  const [teams, setTeams] = useState(INITIAL_TEAMS)
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS)
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS)
  const [settings, setSettings] = useState(INITIAL_SETTINGS)
  const [adminUser] = useState({
    name: 'Alex Vance',
    email: 'admin@aithon.io',
    role: 'Lead Administrator',
    avatar: 'AV',
  })
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Team "Neural Nexus" submitted project for review', time: '10m ago', unread: true },
    { id: 2, text: 'New registration request from "COEP Tech University"', time: '42m ago', unread: true },
    { id: 3, text: 'Discord server member count crossed 1,500+', time: '2h ago', unread: false },
  ])

  // ─── PARTICIPANT ACTIONS ──────────────────────────────────────────────────
  const updateParticipantStatus = (id, newStatus) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    )
  }

  // ─── TEAM APPROVAL / REJECTION WORKFLOW ─────────────────────────────────
  // TODO (Firebase): Replace with Firestore updateDoc call to "teams/{id}" document.

  /**
   * Approve a team. Sets status → 'approved', records reviewedAt/reviewedBy,
   * and appends a review history entry.
   */
  const approveTeam = (id) => {
    const ts = nowTimestamp()
    setTeams((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: 'approved',
              rejectionReason: null,
              reviewedAt: ts,
              reviewedBy: adminUser.name,
              // Prepare reviewHistory for future re-submission cycles
              reviewHistory: [
                ...(t.reviewHistory || []),
                { action: 'approved', reason: null, reviewedBy: adminUser.name, reviewedAt: ts },
              ],
            }
          : t
      )
    )
    setNotifications((prev) => [
      { id: Date.now(), text: `Team approved by Admin`, time: 'Just now', unread: true },
      ...prev,
    ])
  }

  /**
   * Reject a team. Sets status → 'rejected', stores the rejection reason,
   * records reviewedAt/reviewedBy, and appends a review history entry.
   * @param {string} id - Team ID
   * @param {string} reason - Selected common reason
   * @param {string} additionalDetails - Optional free-text explanation
   */
  const rejectTeam = (id, reason, additionalDetails = '') => {
    const ts = nowTimestamp()
    const fullReason = additionalDetails ? `${reason} — ${additionalDetails}` : reason
    setTeams((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: 'rejected',
              rejectionReason: reason,
              rejectionDetails: additionalDetails,
              reviewedAt: ts,
              reviewedBy: adminUser.name,
              // Prepare reviewHistory for future re-submission cycles
              reviewHistory: [
                ...(t.reviewHistory || []),
                {
                  action: 'rejected',
                  reason: fullReason,
                  reviewedBy: adminUser.name,
                  reviewedAt: ts,
                },
              ],
            }
          : t
      )
    )
    setNotifications((prev) => [
      { id: Date.now(), text: `Team rejected: "${reason}"`, time: 'Just now', unread: true },
      ...prev,
    ])
  }

  // Legacy updateTeamStatus kept for backward compat with other pages that may still call it
  const updateTeamStatus = (id, newStatus) => {
    if (newStatus === 'Approved' || newStatus === 'approved') {
      approveTeam(id)
    } else if (newStatus === 'Rejected' || newStatus === 'rejected') {
      rejectTeam(id, 'Status updated by admin', '')
    } else {
      setTeams((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
      )
    }
  }

  // ─── SUBMISSION ACTIONS ──────────────────────────────────────────────────
  const updateSubmissionStatus = (id, newStatus, feedback = '', score = null) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: newStatus,
              feedback: feedback || s.feedback,
              score: score !== null ? score : s.score,
            }
          : s
      )
    )
  }

  // ─── ANNOUNCEMENT ACTIONS ────────────────────────────────────────────────
  const addAnnouncement = (newAnnouncement) => {
    const created = {
      id: `ANN-0${announcements.length + 1}`,
      postedAt: 'Just now',
      author: adminUser.name,
      ...newAnnouncement,
    }
    setAnnouncements((prev) => [created, ...prev])
    setNotifications((prev) => [
      { id: Date.now(), text: `Announcement published: "${created.title}"`, time: 'Just now', unread: true },
      ...prev,
    ])
  }

  // ─── SETTINGS ACTIONS ────────────────────────────────────────────────────
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  // ─── COMPUTED TEAM STATS (always derived from live state) ────────────────
  const teamStats = {
    total: teams.length,
    approved: teams.filter((t) => t.status === 'approved').length,
    pending: teams.filter((t) => t.status === 'pending').length,
    rejected: teams.filter((t) => t.status === 'rejected').length,
  }

  return (
    <AdminContext.Provider
      value={{
        stats,
        setStats,
        analytics,
        participants,
        teams,
        teamStats,
        submissions,
        announcements,
        settings,
        adminUser,
        notifications,
        updateParticipantStatus,
        updateTeamStatus,
        approveTeam,
        rejectTeam,
        updateSubmissionStatus,
        addAnnouncement,
        updateSettings,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
