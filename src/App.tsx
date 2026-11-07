import { useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Navigation } from "./components/Navigation";
import { ScrollProgress } from "./components/ScrollProgress";
import { CustomCursor } from "./components/CustomCursor";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { ProjectDetail } from "./pages/ProjectDetail";
import { Tutorials } from "./pages/Tutorials";
import { TutorialDetail } from "./pages/TutorialDetail";
import { Interests } from "./pages/Interests";
import { Contact } from "./pages/Contact";
import { usePrefersReducedMotion } from "./hooks";

function PageTransition({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.main
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: reduced ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-h-[100svh]"
    >
      {children}
    </motion.main>
  );
}

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname]);

  return (
    <>
      <Navigation />
      <ScrollProgress />
      <CustomCursor />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition>
                <About />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/work"
            element={
              <PageTransition>
                <Projects />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/work/:id"
            element={
              <PageTransition>
                <ProjectDetail />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/tutorials"
            element={
              <PageTransition>
                <Tutorials />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/tutorials/:id"
            element={
              <PageTransition>
                <TutorialDetail />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/interests"
            element={
              <PageTransition>
                <Interests />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <Contact />
                <Footer />
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <Home />
                <Footer />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
