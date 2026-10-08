import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import Hardware from './components/Hardware.jsx'
import Process from './components/Process.jsx'
import Info from './components/Info.jsx'
import Contact from './components/Contact.jsx'
import { CursorProvider } from './components/Cursor.jsx'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CursorProvider>
        <Nav />
        <main>
          <Hero />
          <Work />
          <Hardware />
          <Process />
          <Info />
        </main>
        <Contact />
      </CursorProvider>
    </MotionConfig>
  )
}
