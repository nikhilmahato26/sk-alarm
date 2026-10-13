import { MotionConfig } from 'motion/react'
import { Route, Routes } from 'react-router-dom'

import { Footer } from './components/layout/Footer'
import { MobileActionBar } from './components/layout/MobileActionBar'
import { Navbar } from './components/layout/Navbar'
import { WhatsAppButton } from './components/ui/WhatsAppButton'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    // reducedMotion="user" makes every motion component honour prefers-reduced-motion.
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileActionBar />
    </MotionConfig>
  )
}
