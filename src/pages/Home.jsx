import HeaderTop from '../components/HeaderTop'
import Navbar from '../components/Navbar'
import AnnouncementTicker from '../components/AnnouncementTicker'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ProblemStatements from '../components/ProblemStatements'
import GuidelinesSection from '../components/GuidelinesSection'
import SponsorsSection from '../components/SponsorsSection'
import FaqSection from '../components/FaqSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import WaveTransition from '../components/WaveTransition'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Top Utility Header */}
      <HeaderTop />

      {/* 2. Main Sticky Navigation Header */}
      <Navbar />

      {/* 3. Announcement Marquee Ticker */}
      <AnnouncementTicker />

      {/* 01 HOME */}
      <div id="home">
        <HeroSection />
        <WaveTransition colorClass="text-slate-50" bgClass="bg-white" />
      </div>

      {/* 02 ABOUT */}
      <div id="about">
        <AboutSection />
        <WaveTransition colorClass="text-white" bgClass="bg-slate-50" />
      </div>

      {/* 03 PROBLEM STATEMENT */}
      <div id="problem-statement">
        <ProblemStatements />
        <WaveTransition colorClass="text-blue-50/40" bgClass="bg-white" />
      </div>

      {/* 04 GUIDELINES */}
      <div id="guidelines">
        <GuidelinesSection />
        <WaveTransition colorClass="text-white" bgClass="bg-blue-50/40" />
      </div>

      {/* 05 SPONSORS */}
      <div id="sponsors">
        <SponsorsSection />
        <WaveTransition colorClass="text-slate-50" bgClass="bg-white" />
      </div>

      {/* 06 FAQ */}
      <div id="faq">
        <FaqSection />
        <WaveTransition colorClass="text-white" bgClass="bg-slate-50" />
      </div>

      {/* 07 CONTACT */}
      <div id="contact">
        <ContactSection />
      </div>

      {/* 17. Official Footer */}
      <Footer />
    </div>
  )
}
