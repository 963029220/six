import { useEffect, useRef } from 'react';
import { site } from '../data/content.js';
import { useReducedMotion } from './UI.jsx';
import VariableProximity from './VariableProximity.jsx';

export default function Hero() {
  const reduced = useReducedMotion();
  const proximityRef = useRef(null);
  const titleRef = useRef(null); const subRef = useRef(null); const dividerRef = useRef(null);
  const laserRef = useRef(null); const ruleRef = useRef(null); const ctaRef = useRef(null);

  useEffect(() => {
    if (reduced) {
      proximityRef.current?.classList.add('revealed');
      subRef.current?.querySelectorAll('.sub-char').forEach(c => c.classList.add('revealed'));
      dividerRef.current?.classList.add('visible'); laserRef.current?.classList.add('visible'); ruleRef.current?.classList.add('visible'); ctaRef.current?.classList.add('visible');
      return;
    }
    setTimeout(() => { proximityRef.current?.classList.add('revealed'); }, 320);
    const titleDone = 820;
    setTimeout(() => {
      const subs = subRef.current.querySelectorAll('.sub-char');
      subs.forEach((c, i) => setTimeout(() => c.classList.add('revealed'), i * 35));
      setTimeout(() => dividerRef.current?.classList.add('visible'), 520);
      setTimeout(() => { laserRef.current?.classList.add('visible'); setTimeout(() => ruleRef.current?.classList.add('visible'), 200); setTimeout(() => ctaRef.current?.classList.add('visible'), 500); }, titleDone);
    }, titleDone);
  }, [reduced]);

  return (
    <section className="hero" id="hero">
      <div className="hero__inner">
        <div className="hero__title-row" ref={titleRef} aria-label="影月寒风">
          <VariableProximity
            label="影月寒风"
            fromWght={400}
            toWght={900}
            fromOpsz={9}
            toOpsz={40}
            radius={60}
            className="proximity-title"
            ref={proximityRef}
          />
        </div>
        <div className="hero__sub-row" ref={subRef}>
          {site.hero.sub.map((ch, i) => <span className="sub-char" key={`s${i}`}><span>{ch}</span></span>)}
          <span className="sub-divider" ref={dividerRef} aria-hidden="true" />
          {site.hero.tag.map((ch, i) => <span className="sub-char" key={`t${i}`}><span>{ch}</span></span>)}
        </div>
        <div className="hero__laser" ref={laserRef} aria-hidden="true" />
        <div className="hero__rule" ref={ruleRef} aria-hidden="true" />
        <div className="hero__cta" ref={ctaRef}><a href="#characters" className="hero__cta-btn"><span className="hero__rec-dot" aria-hidden="true" /><span>{site.hero.cta}</span><span className="hero__cta-arrow" aria-hidden="true">&rarr;</span></a></div>
      </div>
    </section>
  );
}
