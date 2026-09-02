import HeaderTop from '../components/HeaderTop'
import Navbar from '../components/Navbar'
import AnnouncementTicker from '../components/AnnouncementTicker'
import FaqSection from '../components/FaqSection'
import Footer from '../components/Footer'

export default function FaqsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      <HeaderTop />
      <Navbar />
      <AnnouncementTicker />

      <main className="flex-1">
        <FaqSection />
      </main>

      <Footer />
    </div>
  )
}
