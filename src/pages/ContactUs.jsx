import HeaderTop from '../components/HeaderTop'
import Navbar from '../components/Navbar'
import AnnouncementTicker from '../components/AnnouncementTicker'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      <HeaderTop />
      <Navbar />
      <AnnouncementTicker />

      <main className="flex-1">
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
