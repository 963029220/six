import { useEffect, useRef } from 'react';
import gsap from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sections } from '../data/content.js'; import { useReducedMotion, PromptCard, CompareSlider } from './UI.jsx';
gsap.registerPlugin(ScrollTrigger);

export default function SceneSection() {
  const reduced = useReducedMotion(); const ref = useRef(null); const { scenes } = sections;
  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      ref.current.querySelectorAll('.reveal').forEach(el => { gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }); });
    }, ref);
    return () => { ctx.revert(); };
  }, [reduced]);

  return (
    <section className="sect sect--alt" id={scenes.id} ref={ref}>
      <div className="sect__inner">
        <div className="reveal" style={{ marginBottom: 'clamp(40px,6vh,64px)' }}><div className="sect__index">{scenes.index}</div><h2 className="sect__title">{scenes.title}</h2><p className="sect__desc">{scenes.desc}</p></div>
        <div className="grid-2x2">{scenes.cards.map((card, i) => <PromptCard key={i} title={card.title} text={card.text} />)}</div>
        {scenes.compares.map((cmp, i) => <div className="compare-row reveal" style={{ marginTop: 16 }} key={i}><CompareSlider ratio={cmp.ratio} beforeSrc={cmp.before} afterSrc={cmp.after} /></div>)}
      </div>
    </section>
  );
}
