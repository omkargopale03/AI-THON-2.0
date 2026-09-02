import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import RegistrationProgress from '../components/RegistrationProgress'
import RegistrationInfo from '../components/RegistrationInfo'
import FormInput from '../components/FormInput'
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  GithubIcon,
  LinkedinIcon,
  GlobeIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
} from '../components/Icons'

const STEPS = [
  { number: 1, title: 'Team Lead Details' },
  { number: 2, title: 'Team Details' },
  { number: 3, title: 'Additional Info' },
]

const YEAR_OPTIONS = [
  '1st Year (Freshman)',
  '2nd Year (Sophomore)',
  '3rd Year (Junior)',
  '4th Year (Senior)',
  'Postgraduate / Master\'s',
  'Other',
]

const EXPERIENCE_OPTIONS = [
  'First-time Hacker (Beginner)',
  '1–2 Hackathons Attended',
  '3–5 Hackathons Attended',
  'Seasoned Veteran (5+ Hackathons)',
]

const REFERRAL_OPTIONS = [
  'College / Faculty Announcement',
  'Discord / Developer Community',
  'LinkedIn / Social Media',
  'Friends / Classmates',
  'Hackathon Listing Portal (Devpost/Devfolio)',
  'Other',
]

const POPULAR_SKILLS = [
  'Python',
  'React / Next.js',
  'PyTorch / LLMs',
  'Node.js / Express',
  'TypeScript',
  'FastAPI',
  'UI/UX Design',
  'Tailwind CSS',
  'Docker / Cloud',
  'PostgreSQL / MongoDB',
  'Solidity / Web3',
  'LangChain / Agentic AI',
]

export default function Registration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [registrationId, setRegistrationId] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Team Lead
    leadFullName: '',
    leadEmail: '',
    leadPhone: '',
    leadCollege: '',
    leadCourse: '',
    leadYear: '',
    leadCity: '',

    // Step 2: Team Details
    teamName: '',
    teamSize: '3', // default 3 members (Lead + 2 members)
    members: [
      { fullName: '', email: '', college: '' },
      { fullName: '', email: '', college: '' },
      { fullName: '', email: '', college: '' },
    ],

    // Step 3: Additional Info
    github: '',
    linkedin: '',
    portfolio: '',
    skills: [],
    customSkill: '',
    experience: '',
    referral: '',
    agreedToTerms: false,
  })

  // Validation Errors
  const [errors, setErrors] = useState({})

  // Handle standard input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  // Handle Team Size change
  const handleTeamSizeChange = (sizeStr) => {
    setFormData((prev) => ({
      ...prev,
      teamSize: sizeStr,
    }))
  }

  // Handle Member field change
  const handleMemberChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedMembers = [...prev.members]
      updatedMembers[index] = {
        ...updatedMembers[index],
        [field]: value,
      }
      return { ...prev, members: updatedMembers }
    })

    const errorKey = `member_${index}_${field}`
    if (errors[errorKey]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[errorKey]
        return next
      })
    }
  }

  // Toggle Technical Skill Tag
  const toggleSkill = (skill) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skill)
      return {
        ...prev,
        skills: exists
          ? prev.skills.filter((s) => s !== skill)
          : [...prev.skills, skill],
      }
    })
  }

  // Add Custom Skill
  const handleAddCustomSkill = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault()
      const trimmed = formData.customSkill.trim()
      if (trimmed && !formData.skills.includes(trimmed)) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, trimmed],
          customSkill: '',
        }))
      }
    }
  }

  // Validation functions
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  }

  const validatePhone = (phone) => {
    // Validates 10-digit Indian phone, with optional +91 or 91 prefix
    const cleanPhone = phone.replace(/[\s-]/g, '')
    return /^(?:\+91|91)?[6-9]\d{9}$/.test(cleanPhone)
  }

  const validateStep1 = () => {
    const newErrors = {}

    if (!formData.leadFullName.trim()) {
      newErrors.leadFullName = 'This field is required.'
    } else if (formData.leadFullName.trim().length < 2) {
      newErrors.leadFullName = 'Please enter a valid full name.'
    }

    if (!formData.leadEmail.trim()) {
      newErrors.leadEmail = 'This field is required.'
    } else if (!validateEmail(formData.leadEmail)) {
      newErrors.leadEmail = 'Please enter a valid email address.'
    }

    if (!formData.leadPhone.trim()) {
      newErrors.leadPhone = 'This field is required.'
    } else if (!validatePhone(formData.leadPhone)) {
      newErrors.leadPhone = 'Please enter a valid 10-digit Indian mobile number.'
    }

    if (!formData.leadCollege.trim()) {
      newErrors.leadCollege = 'This field is required.'
    }

    if (!formData.leadCourse.trim()) {
      newErrors.leadCourse = 'This field is required.'
    }

    if (!formData.leadYear) {
      newErrors.leadYear = 'This field is required.'
    }

    if (!formData.leadCity.trim()) {
      newErrors.leadCity = 'This field is required.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}

    if (!formData.teamName.trim()) {
      newErrors.teamName = 'This field is required.'
    } else if (formData.teamName.trim().length < 3) {
      newErrors.teamName = 'Team name must be at least 3 characters.'
    }

    const teamSizeNum = parseInt(formData.teamSize, 10) || 3
    const additionalMembersCount = teamSizeNum - 1 // leader is member 1

    for (let i = 0; i < additionalMembersCount; i++) {
      const member = formData.members[i] || {}
      if (!member.fullName || !member.fullName.trim()) {
        newErrors[`member_${i}_fullName`] = 'This field is required.'
      }
      if (!member.email || !member.email.trim()) {
        newErrors[`member_${i}_email`] = 'This field is required.'
      } else if (!validateEmail(member.email)) {
        newErrors[`member_${i}_email`] = 'Please enter a valid email address.'
      }
      if (!member.college || !member.college.trim()) {
        newErrors[`member_${i}_college`] = 'This field is required.'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors = {}

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the hackathon rules and terms.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Navigation handlers
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2)
        window.scrollTo({ top: 120, behavior: 'smooth' })
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3)
        window.scrollTo({ top: 120, behavior: 'smooth' })
      }
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo({ top: 120, behavior: 'smooth' })
    }
  }

  // Final Form Submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateStep3()) return

    setIsSubmitting(true)

    // Simulate clean frontend submission state
    setTimeout(() => {
      const randomCode = Math.floor(1000 + Math.random() * 9000)
      setRegistrationId(`AI25-${randomCode}`)
      setIsSubmitting(false)
      setIsSubmitted(true)
      window.scrollTo({ top: 100, behavior: 'smooth' })
    }, 800)
  }

  const handleReset = () => {
    setFormData({
      leadFullName: '',
      leadEmail: '',
      leadPhone: '',
      leadCollege: '',
      leadCourse: '',
      leadYear: '',
      leadCity: '',
      teamName: '',
      teamSize: '3',
      members: [
        { fullName: '', email: '', college: '' },
        { fullName: '', email: '', college: '' },
        { fullName: '', email: '', college: '' },
      ],
      github: '',
      linkedin: '',
      portfolio: '',
      skills: [],
      customSkill: '',
      experience: '',
      referral: '',
      agreedToTerms: false,
    })
    setErrors({})
    setIsSubmitted(false)
    setCurrentStep(1)
  }

  const teamSizeNum = parseInt(formData.teamSize, 10) || 3
  const additionalMembersCount = teamSizeNum - 1

  return (
    <div className="min-h-screen bg-[#05070e] text-slate-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Background Cyber Grid & Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Futuristic Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.25) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Ambient Top Cyan Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-cyan-500/20 via-blue-600/10 to-transparent rounded-full blur-3xl opacity-70" />

        {/* Ambient Bottom Right Glow */}
        <div className="absolute -bottom-40 right-10 w-[500px] h-[350px] bg-cyan-600/10 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Website Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* PAGE HERO */}
        <section className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Small Cyan Uppercase Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            AI THON 2.0
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono tracking-tight text-white mb-4">
            TEAM <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]">REGISTRATION</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
            Fill in the details below to register your team for the hackathon.
          </p>
        </section>

        {isSubmitted ? (
          /* ==================================================
             SUCCESS STATE SCREEN
             ================================================== */
          <section className="max-w-2xl mx-auto">
            <div className="relative rounded-3xl bg-[#090d1a]/95 border border-cyan-500/40 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)] text-center overflow-hidden">
              {/* Glow accent */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl" />

              {/* Animated Checkmark Badge */}
              <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-[0_0_30px_rgba(6,182,212,0.6)] mb-6 animate-bounce">
                <div className="w-full h-full rounded-full bg-[#070b18] flex items-center justify-center text-cyan-400">
                  <CheckIcon className="w-10 h-10 stroke-[3]" />
                </div>
              </div>

              {/* Success Headings */}
              <span className="inline-block px-3 py-1 rounded-md bg-cyan-950 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-2">
                APPLICATION RECEIVED
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-wide mb-3">
                REGISTRATION SUCCESSFUL
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
                Your team registration has been submitted successfully for AI THON 2.0.
              </p>

              {/* Registration ID & Summary Card */}
              <div className="p-6 rounded-2xl bg-[#0c1224]/80 border border-cyan-500/30 mb-8 text-left space-y-4 shadow-inner">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-cyan-500/20 gap-2">
                  <span className="text-xs font-mono uppercase text-slate-400">Registration ID</span>
                  <span className="font-mono text-lg font-bold text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-500/40 inline-block shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    {registrationId}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[11px]">TEAM NAME</span>
                    <span className="text-slate-100 font-bold text-sm">{formData.teamName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">TEAM LEADER</span>
                    <span className="text-slate-100 font-bold text-sm">{formData.leadFullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">TEAM SIZE</span>
                    <span className="text-slate-100 font-bold text-sm">{formData.teamSize} Members</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">PRIMARY EMAIL</span>
                    <span className="text-slate-100 font-bold text-sm truncate block">{formData.leadEmail}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-mono font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.5)] text-center"
                >
                  BACK TO HOME
                </Link>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-500/30 font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  REGISTER ANOTHER TEAM
                </button>
              </div>
            </div>
          </section>
        ) : (
          /* ==================================================
             MULTI-STEP REGISTRATION CONTAINER & SIDEBAR LAYOUT
             ================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left / Main Column: Multi-Step Registration Form */}
            <div className="lg:col-span-8">
              <div className="relative rounded-3xl bg-[#080c18]/90 border border-cyan-500/30 p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(6,182,212,0.18)]">
                {/* 3-Step Progress Indicator */}
                <RegistrationProgress
                  currentStep={currentStep}
                  steps={STEPS}
                  onStepClick={(stepNum) => {
                    if (stepNum < currentStep) {
                      setCurrentStep(stepNum)
                    }
                  }}
                />

                <form onSubmit={handleSubmit} noValidate>
                  {/* ==================================================
                      STEP 1 — TEAM LEAD DETAILS
                      ================================================== */}
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* Step Header */}
                      <div className="pb-4 border-b border-cyan-500/20">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                            STEP 01
                          </span>
                          <h2 className="text-xl sm:text-2xl font-bold font-mono text-white m-0">
                            Team Lead Details
                          </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-sans">
                          Enter the details of the team leader.
                        </p>
                      </div>

                      {/* 2-Column Responsive Form Layout */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {/* Full Name */}
                        <div className="sm:col-span-2">
                          <FormInput
                            label="Full Name"
                            name="leadFullName"
                            value={formData.leadFullName}
                            onChange={handleChange}
                            placeholder="e.g. Alex Morgan"
                            required
                            error={errors.leadFullName}
                            icon={UserIcon}
                          />
                        </div>

                        {/* Email Address */}
                        <div>
                          <FormInput
                            label="Email Address"
                            type="email"
                            name="leadEmail"
                            value={formData.leadEmail}
                            onChange={handleChange}
                            placeholder="e.g. alex.morgan@gmail.com"
                            required
                            error={errors.leadEmail}
                            icon={MailIcon}
                          />
                        </div>

                        {/* Phone Number */}
                        <div>
                          <FormInput
                            label="Phone Number"
                            type="tel"
                            name="leadPhone"
                            value={formData.leadPhone}
                            onChange={handleChange}
                            placeholder="e.g. 9876543210"
                            required
                            error={errors.leadPhone}
                            icon={PhoneIcon}
                          />
                        </div>

                        {/* College / University */}
                        <div className="sm:col-span-2">
                          <FormInput
                            label="College / University"
                            name="leadCollege"
                            value={formData.leadCollege}
                            onChange={handleChange}
                            placeholder="e.g. National Institute of Technology"
                            required
                            error={errors.leadCollege}
                            icon={AcademicCapIcon}
                          />
                        </div>

                        {/* Course / Branch */}
                        <div>
                          <FormInput
                            label="Course / Branch"
                            name="leadCourse"
                            value={formData.leadCourse}
                            onChange={handleChange}
                            placeholder="e.g. Computer Science & Engineering"
                            required
                            error={errors.leadCourse}
                            icon={BookOpenIcon}
                          />
                        </div>

                        {/* Year of Study */}
                        <div>
                          <FormInput
                            label="Year of Study"
                            type="select"
                            name="leadYear"
                            value={formData.leadYear}
                            onChange={handleChange}
                            options={YEAR_OPTIONS}
                            placeholder="Select year..."
                            required
                            error={errors.leadYear}
                            icon={CalendarIcon}
                          />
                        </div>

                        {/* City */}
                        <div className="sm:col-span-2">
                          <FormInput
                            label="City"
                            name="leadCity"
                            value={formData.leadCity}
                            onChange={handleChange}
                            placeholder="e.g. Mumbai / Bangalore / Delhi"
                            required
                            error={errors.leadCity}
                            icon={MapPinIcon}
                          />
                        </div>
                      </div>

                      {/* Step 1 Actions */}
                      <div className="pt-6 border-t border-cyan-500/20 flex items-center justify-end">
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] cursor-pointer group"
                        >
                          <span>NEXT STEP</span>
                          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ==================================================
                      STEP 2 — TEAM DETAILS
                      ================================================== */}
                  {currentStep === 2 && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* Step Header */}
                      <div className="pb-4 border-b border-cyan-500/20">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                            STEP 02
                          </span>
                          <h2 className="text-xl sm:text-2xl font-bold font-mono text-white m-0">
                            Team Details
                          </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-sans">
                          Specify your team name and add details of your teammates (Team Lead is Member 1).
                        </p>
                      </div>

                      {/* Team Name & Size Selectors */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <FormInput
                            label="Team Name"
                            name="teamName"
                            value={formData.teamName}
                            onChange={handleChange}
                            placeholder="e.g. Neural Nexus"
                            required
                            error={errors.teamName}
                            icon={UsersIcon}
                          />
                        </div>

                        {/* Team Size Selector (2, 3, 4) */}
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-xs font-semibold font-mono tracking-wide text-slate-300">
                            Team Size <span className="text-cyan-400 font-bold">*</span>
                          </label>
                          <div className="grid grid-cols-3 gap-2.5">
                            {['2', '3', '4'].map((size) => {
                              const isSelected = formData.teamSize === size
                              return (
                                <button
                                  key={size}
                                  type="button"
                                  onClick={() => handleTeamSizeChange(size)}
                                  className={`py-2.5 px-3 rounded-xl font-mono text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                                    isSelected
                                      ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                      : 'bg-[#0c1022] text-slate-300 border border-cyan-500/20 hover:border-cyan-500/40'
                                  }`}
                                >
                                  <span>{size} Members</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Team Members Cards */}
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                            ADDITIONAL TEAM MEMBERS ({additionalMembersCount})
                          </h3>
                          <span className="text-[11px] font-mono text-slate-400">
                            Leader: <strong className="text-white">{formData.leadFullName || 'You'}</strong>
                          </span>
                        </div>

                        {Array.from({ length: additionalMembersCount }).map((_, idx) => {
                          const memberNum = idx + 2
                          const memberData = formData.members[idx] || {}
                          return (
                            <div
                              key={idx}
                              className="p-4 sm:p-5 rounded-2xl bg-[#0d1326]/70 border border-cyan-500/20 space-y-4 hover:border-cyan-500/35 transition-colors"
                            >
                              <div className="flex items-center justify-between pb-2 border-b border-cyan-500/15">
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-400 text-[10px] font-mono font-bold text-cyan-400 flex items-center justify-center">
                                    {memberNum}
                                  </div>
                                  <span className="text-xs font-mono font-bold text-slate-200">
                                    Team Member {idx + 1} (Member #{memberNum})
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono text-cyan-400/80">Required</span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                                <FormInput
                                  label="Full Name"
                                  value={memberData.fullName || ''}
                                  onChange={(e) => handleMemberChange(idx, 'fullName', e.target.value)}
                                  placeholder="Member's full name"
                                  required
                                  error={errors[`member_${idx}_fullName`]}
                                  icon={UserIcon}
                                />
                                <FormInput
                                  label="Email Address"
                                  type="email"
                                  value={memberData.email || ''}
                                  onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                                  placeholder="member@example.com"
                                  required
                                  error={errors[`member_${idx}_email`]}
                                  icon={MailIcon}
                                />
                                <FormInput
                                  label="College / University"
                                  value={memberData.college || ''}
                                  onChange={(e) => handleMemberChange(idx, 'college', e.target.value)}
                                  placeholder="College name"
                                  required
                                  error={errors[`member_${idx}_college`]}
                                  icon={AcademicCapIcon}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Step 2 Actions */}
                      <div className="pt-6 border-t border-cyan-500/20 flex items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer group"
                        >
                          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                          <span>BACK</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] cursor-pointer group"
                        >
                          <span>NEXT STEP</span>
                          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ==================================================
                      STEP 3 — ADDITIONAL INFORMATION
                      ================================================== */}
                  {currentStep === 3 && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* Step Header */}
                      <div className="pb-4 border-b border-cyan-500/20">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                            STEP 03
                          </span>
                          <h2 className="text-xl sm:text-2xl font-bold font-mono text-white m-0">
                            Additional Information
                          </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-sans">
                          Provide links to your team's code profiles, technical skillsets, and experience.
                        </p>
                      </div>

                      {/* Social & Portfolio Links (2-Column) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <FormInput
                            label="GitHub Profile / Organization"
                            name="github"
                            value={formData.github}
                            onChange={handleChange}
                            placeholder="https://github.com/your-username"
                            icon={GithubIcon}
                          />
                        </div>

                        <div>
                          <FormInput
                            label="LinkedIn Profile"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/your-profile"
                            icon={LinkedinIcon}
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <FormInput
                            label="Portfolio / Website (Optional)"
                            name="portfolio"
                            value={formData.portfolio}
                            onChange={handleChange}
                            placeholder="https://yourportfolio.dev"
                            icon={GlobeIcon}
                          />
                        </div>
                      </div>

                      {/* Technical Skills Selection */}
                      <div className="space-y-2.5">
                        <label className="text-xs font-semibold font-mono tracking-wide text-slate-300 block">
                          Technical Skills & Stack
                        </label>

                        {/* Popular Skill Badges */}
                        <div className="flex flex-wrap gap-2">
                          {POPULAR_SKILLS.map((skill) => {
                            const isSelected = formData.skills.includes(skill)
                            return (
                              <button
                                key={skill}
                                type="button"
                                onClick={() => toggleSkill(skill)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                                  isSelected
                                    ? 'bg-cyan-500 text-black font-bold border border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                                    : 'bg-[#0c1022] text-slate-300 border border-cyan-500/20 hover:border-cyan-400/40 hover:text-white'
                                }`}
                              >
                                {isSelected ? <span>✓</span> : <span>+</span>}
                                <span>{skill}</span>
                              </button>
                            )
                          })}
                        </div>

                        {/* Custom Skill Input */}
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            name="customSkill"
                            value={formData.customSkill}
                            onChange={handleChange}
                            onKeyDown={handleAddCustomSkill}
                            placeholder="Add other skill (e.g. Flutter, Rust, OpenCV)..."
                            className="flex-1 rounded-xl bg-[#0c1022]/90 border border-cyan-500/20 px-3.5 py-2 text-xs font-sans text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                          />
                          <button
                            type="button"
                            onClick={handleAddCustomSkill}
                            className="px-4 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold transition-colors cursor-pointer"
                          >
                            + ADD
                          </button>
                        </div>
                      </div>

                      {/* Experience and Referral Selection */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <FormInput
                            label="Previous Hackathon Experience"
                            type="select"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            options={EXPERIENCE_OPTIONS}
                            placeholder="Select experience level..."
                          />
                        </div>

                        <div>
                          <FormInput
                            label="How did you hear about AI THON 2.0?"
                            type="select"
                            name="referral"
                            value={formData.referral}
                            onChange={handleChange}
                            options={REFERRAL_OPTIONS}
                            placeholder="Select referral source..."
                          />
                        </div>
                      </div>

                      {/* Required Terms & Conditions Checkbox */}
                      <div className="pt-2">
                        <div
                          className={`p-4 rounded-xl border transition-colors ${
                            errors.agreedToTerms
                              ? 'bg-rose-950/20 border-rose-500/60'
                              : 'bg-[#0b1022]/70 border-cyan-500/20 hover:border-cyan-500/40'
                          }`}
                        >
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              name="agreedToTerms"
                              checked={formData.agreedToTerms}
                              onChange={handleChange}
                              className="mt-0.5 w-4 h-4 rounded border-cyan-500/40 text-cyan-500 focus:ring-cyan-400 focus:ring-offset-0 bg-[#0c1022] cursor-pointer"
                            />
                            <div className="text-xs text-slate-300 font-sans leading-relaxed">
                              <span className="font-semibold text-white">I agree to the hackathon rules and terms.</span>{' '}
                              We confirm that all details provided are accurate and our team commits to adhering to the AI THON 2.0 Code of Conduct.
                            </div>
                          </label>
                        </div>
                        {errors.agreedToTerms && (
                          <p className="text-[11px] font-mono text-rose-400 flex items-center gap-1 mt-1">
                            <span>⚠</span> {errors.agreedToTerms}
                          </p>
                        )}
                      </div>

                      {/* Step 3 Actions */}
                      <div className="pt-6 border-t border-cyan-500/20 flex items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          disabled={isSubmitting}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer group disabled:opacity-50"
                        >
                          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                          <span>BACK</span>
                        </button>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-mono font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] cursor-pointer disabled:opacity-50 group"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin w-4 h-4 text-black" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                              </svg>
                              <span>SUBMITTING...</span>
                            </>
                          ) : (
                            <>
                              <ShieldCheckIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                              <span>SUBMIT REGISTRATION</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Right Column: Registration Info Sidebar (on desktop) / Bottom on mobile */}
            <div className="lg:col-span-4 w-full">
              <RegistrationInfo />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cyan-500/20 bg-[#04060b]/90 backdrop-blur-md py-6 mt-16 text-center text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">AI THON 2.0</span>
            <span>© 2026. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <a href="#rules" className="hover:text-cyan-400 transition-colors">RULES</a>
            <span>•</span>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
            <span>•</span>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">CONTACT</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
