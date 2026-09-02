import HeaderTop from '../components/HeaderTop'
import Navbar from '../components/Navbar'
import AnnouncementTicker from '../components/AnnouncementTicker'
import GuidelinesSection from '../components/GuidelinesSection'
import Footer from '../components/Footer'

export default function Guidelines() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      <HeaderTop />
      <Navbar />
      <AnnouncementTicker />

      <main className="flex-1">
        <GuidelinesSection />
      </main>

      <Footer />
    </div>
  )
}
