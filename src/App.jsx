import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'
import Navbar from './components/Navbar'
import FloatingContact from './components/FloatingContact'
import DarkModeToggle from './components/DarkModeToggle'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Admin from './pages/admin/Admin'
import Community from './pages/community/Community'
import Results from './pages/results/Results'
import Location from './pages/location/Location'
import Testimonials from './pages/testimonials/Testimonials'
import Teachers from './pages/teachers/Teachers'
import Footer from './components/Footer'

function AnimatedRoutes() {
  const location = useLocation();
  
  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Home/>
          </motion.div>
        }/>
        <Route path='/about' element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <About/>
          </motion.div>
        }/>
        <Route path='/admin' element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Admin/>
          </motion.div>
        }/>
        <Route path='/community' element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Community/>
          </motion.div>
        }/>
        <Route path='/results' element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Results/>
          </motion.div>
        }/>
        <Route path='/location' element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Location/>
          </motion.div>
        }/>
        <Route path='/testimonials' element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Testimonials/>
          </motion.div>
        }/>
        <Route path='/teachers' element={
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Teachers/>
          </motion.div>
        }/>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <AnimatedRoutes />
      <FloatingContact />
      <DarkModeToggle />
      <Footer/>
    </BrowserRouter>
  )
}

export default App