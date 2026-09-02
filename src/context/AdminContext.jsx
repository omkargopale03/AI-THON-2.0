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

  // Participant status updater
  const updateParticipantStatus = (id, newStatus) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    )
  }

  // Team status updater
  const updateTeamStatus = (id, newStatus) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    )
  }

  // Submission status updater
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

  // Announcement creator
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

  // Settings updater
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  return (
    <AdminContext.Provider
      value={{
        stats,
        setStats,
        analytics,
        participants,
        teams,
        submissions,
        announcements,
        settings,
        adminUser,
        notifications,
        updateParticipantStatus,
        updateTeamStatus,
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
