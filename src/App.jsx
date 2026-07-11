import { useState, useEffect } from 'react';
import { sections } from './data/content.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import CharacterSection from './components/CharacterSection.jsx';
import SceneSection from './components/SceneSection.jsx';
import PromptSection from './components/PromptSection.jsx';
import CameraSection from './components/CameraSection.jsx';
import TipsSection from './components/TipsSection.jsx';
import BgCanvas from './components/BgCanvas.jsx';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const ids = ['hero', ...Object.values(sections).map(s => s.id), 'tips'];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { rootMargin: '-44% 0px -44% 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="grain-layer" style={{ minHeight: '100vh' }}>
      <div className="vignette" aria-hidden="true" />
      <BgCanvas />
      <Nav active={activeSection} />
      <main className="content">
        <Hero />
        <CharacterSection />
        <SceneSection />
        <PromptSection />
        <CameraSection />
        <TipsSection />
        <footer className="footer">
          <span className="footer__text">堵桥小分队 · 内部工具 · v3.0</span>
          <a href="#hero" className="footer__top">回到顶部 ↑</a>
        </footer>
      </main>
    </div>
  );
}
