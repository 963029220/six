import { useEffect, useRef } from 'react';
import gsap from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sections } from '../data/content.js'; import { useReducedMotion, PromptCard, CompareSlider, ProcessArrow } from './UI.jsx';
gsap.registerPlugin(ScrollTrigger);

export default function CharacterSection() {
  const reduced = useReducedMotion(); const ref = useRef(null); const { characters } = sections;
  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      ref.current.querySelectorAll('.reveal').forEach(el => { gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }); });
    }, ref);
    return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [reduced]);

  return (
    <section className="sect" id={characters.id} ref={ref}>
      <div className="sect__inner">
        <div className="reveal" style={{ marginBottom: 'clamp(40px,6vh,64px)' }}><div className="sect__index">{characters.index}</div><h2 className="sect__title">{characters.title}</h2><p className="sect__desc">{characters.desc}</p></div>
        <div className="grid-2x2"><div className="char-row-top">
          {characters.flow.map((item, i) => item.isArrow ? <ProcessArrow key={i} label={item.label} /> : <PromptCard key={i} {...item} />)}
        </div>
        {characters.compares.map((cmp, i) => <div className="compare-row reveal" key={i}><CompareSlider ratio={cmp.ratio} beforeSrc={cmp.before} afterSrc={cmp.after} /></div>)}
        </div>
      </div>
    </section>
  );
}
