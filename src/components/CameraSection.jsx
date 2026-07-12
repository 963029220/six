import { useEffect, useRef } from 'react';
import gsap from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sections } from '../data/content.js'; import { useReducedMotion } from './UI.jsx';
gsap.registerPlugin(ScrollTrigger);

export default function CameraSection() {
  const reduced = useReducedMotion(); const ref = useRef(null); const { camera } = sections;
  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      ref.current.querySelectorAll('.reveal').forEach(el => { gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }); });
      ref.current.querySelectorAll('.stat-block__value').forEach(el => { gsap.fromTo(el, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }); });
    }, ref);
    return () => { ctx.revert(); };
  }, [reduced]);

  return (
    <section className="sect sect--alt" id={camera.id} ref={ref}>
      <div className="sect__inner">
        <div className="reveal" style={{ marginBottom: 'clamp(40px,6vh,64px)' }}><div className="sect__index">{camera.index}</div><h2 className="sect__title">{camera.title}</h2><p className="sect__desc">{camera.desc}</p></div>

        <div className="reveal lens-section" style={{ marginBottom: 'clamp(40px,5vh,60px)' }}>
          <h3 className="lens-section__title">焦段</h3>
          <div className="lens-table">
            <div className="lens-table__header">
              <span className="lens-table__cell lens-table__cell--cat">焦段类别</span>
              <span className="lens-table__cell lens-table__cell--range">全画幅焦距范围</span>
              <span className="lens-table__cell lens-table__cell--feature">核心特点</span>
              <span className="lens-table__cell lens-table__cell--scene">典型影视场景</span>
            </div>
            {camera.lensData.map((row, i) => (
              <div className="lens-table__row" key={i}>
                <span className="lens-table__cell lens-table__cell--cat"><span className="lens-table__cat-label">{row.category}</span></span>
                <span className="lens-table__cell lens-table__cell--range">{row.range}</span>
                <span className="lens-table__cell lens-table__cell--feature">{row.feature}</span>
                <span className="lens-table__cell lens-table__cell--scene">{row.scene}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-wrap">
          <div className="stats-grid" style={{ gridTemplateColumns: '1fr' }}>{camera.stats.map((s, i) => <div className="stat-block reveal card-aperture" key={i}><span className="stat-block__label">{s.label}</span><div className="stat-block__value">{s.value}</div><span className="stat-block__unit">{s.unit}</span></div>)}</div>
        </div>
      </div>
    </section>
  );
}
