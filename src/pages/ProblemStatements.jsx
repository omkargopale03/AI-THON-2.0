import HeaderTop from '../components/HeaderTop'
import Navbar from '../components/Navbar'
import AnnouncementTicker from '../components/AnnouncementTicker'
import TracksSection from '../components/TracksSection'
import Footer from '../components/Footer'

export default function ProblemStatements() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      <HeaderTop />
      <Navbar />
      <AnnouncementTicker />

      <main className="flex-1">
        <TracksSection />
      </main>

      <Footer />
    </div>
  )
}
