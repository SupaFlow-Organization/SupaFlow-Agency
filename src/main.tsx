import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Book from './pages/Book'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import CaseStudy from './pages/CaseStudy'
import CaseStudies from './pages/CaseStudies'

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          // Temporarily disable smooth scroll to force instant jump
          document.documentElement.style.scrollBehavior = 'auto';
          element.scrollIntoView();
          
          // Restore smooth scroll behavior for normal navbar links
          setTimeout(() => {
            document.documentElement.style.scrollBehavior = '';
          }, 10);
        }
      }, 10); // Minimal delay for DOM to mount
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/book-a-call" element={<Book />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/case-studies/:id" element={<CaseStudy />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
