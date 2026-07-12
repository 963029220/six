import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => { const mq = window.matchMedia('(prefers-reduced-motion: reduce)'); setReduced(mq.matches); const fn = (e) => setReduced(e.matches); mq.addEventListener('change', fn); return () => mq.removeEventListener('change', fn); }, []);
  return reduced;
}

export function useCopy() {
  const [copied, setCopied] = useState(null);
  const copy = useCallback(async (text, id) => {
    try { await navigator.clipboard.writeText(text); } catch { const ta = document.createElement('textarea'); ta.value = text; ta.style.cssText = 'position:fixed;opacity:0;'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }
    setCopied(id); setTimeout(() => setCopied(null), 2000);
  }, []);
  return [copied, copy];
}

export function useRevealOnScroll(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll('.reveal');
    if (!items.length) return;
    const ctx = gsap.context(() => {
      items.forEach(el => { gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 84%', once: true } }); });
    }, ref);
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); ctx.revert(); };
  }, [ref]);
}

export function PromptCard({ code, title, text, caution, extra, square, className }) {
  const [copied, copy] = useCopy();
  const id = `${code || title}`;
  const cls = `card-bold card-prompt${square ? ' card-square' : ''}${className ? ' ' + className : ''}`;
  return (
    <div className={cls} style={{ opacity: 1 }}>
      <div className="card-prompt__header">{code && <span className="card-bold__index">{code}</span>}<h3 className="card-bold__title">{title}</h3></div>
      <div className="card-prompt__body">
        <p className="card-prompt__text" dangerouslySetInnerHTML={{ __html: text + (extra ? '<br/><span class="text-red">' + extra + '</span>' : '') }}></p>
        {caution && <div className="caution-tape" style={{ marginTop: 8, maxWidth: '100%' }}><span dangerouslySetInnerHTML={{ __html: caution }} /></div>}
        <button className={`card-prompt__copy${copied === id ? ' copied' : ''}`} onClick={() => copy(text, id)} aria-label="复制提示词内容">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.2"/><path d="M3 11V3a1 1 0 0 1 1-1h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          <span>{copied === id ? '已复制' : '复制'}</span>
        </button>
      </div>
    </div>
  );
}

export function CompareSlider({ id, ratio, beforeSrc, afterSrc }) {
  const containerRef = useRef(null);
  useEffect(() => {
    const slider = containerRef.current; if (!slider) return;
    const overlay = slider.querySelector('.compare-slider__img--overlay'); if (!overlay) return;
    const handle = slider.querySelector('.compare-slider__handle'); if (!handle) return;
    let dragging = false;
    const setPos = (px) => { const r = slider.getBoundingClientRect(); const x = Math.max(0, Math.min(px - r.left, r.width)); const pct = (x / r.width * 100).toFixed(1); overlay.style.clipPath = `inset(0 ${100 - parseFloat(pct)}% 0 0)`; handle.style.left = pct + '%'; handle.setAttribute('aria-valuenow', Math.round(parseFloat(pct))); };
    const onStart = (e) => { dragging = true; e.preventDefault(); };
    const onEnd = () => { dragging = false; };
    const onMove = (e) => { if (dragging) setPos(e.touches ? e.touches[0].clientX : e.clientX); };
    handle.addEventListener('mousedown', onStart); handle.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('mousemove', onMove); window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onEnd); window.addEventListener('touchend', onEnd);
    const onSliderMouseDown = (e) => { if (e.target === handle || handle.contains(e.target)) return; dragging = true; setPos(e.clientX); };
    slider.addEventListener('mousedown', onSliderMouseDown);
    const onKey = (e) => { const step = e.shiftKey ? 10 : 2; const val = parseFloat(handle.getAttribute('aria-valuenow')) || 50; let nv = null; if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') nv = Math.max(0, val - step); if (e.key === 'ArrowRight' || e.key === 'ArrowUp') nv = Math.min(100, val + step); if (nv !== null) { const r = slider.getBoundingClientRect(); setPos(r.left + r.width * nv / 100); } };
    handle.addEventListener('keydown', onKey);
    const r = slider.getBoundingClientRect(); setPos(r.left + r.width / 2);
    return () => {
      handle.removeEventListener('mousedown', onStart); handle.removeEventListener('touchstart', onStart);
      window.removeEventListener('mousemove', onMove); window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onEnd); window.removeEventListener('touchend', onEnd);
      slider.removeEventListener('mousedown', onSliderMouseDown);
      handle.removeEventListener('keydown', onKey);
    };
  }, []);
  const cls = ratio === '9x16' ? 'compare-slider compare-slider--9x16' : 'compare-slider compare-slider--16x9';
  return (
    <div className={cls} ref={containerRef}>
      <div className="compare-slider__label left"><span className="compare-slider__label-badge">应用前</span></div>
      <div className="compare-slider__label right"><span className="compare-slider__label-badge">应用后</span></div>
      <img className="compare-slider__img compare-slider__img--base" src={beforeSrc} alt="应用前" />
      <img className="compare-slider__img compare-slider__img--overlay" src={afterSrc} alt="应用后" />
      <div className="compare-slider__handle" role="slider" tabIndex="0" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
        <div className="compare-slider__handle-line" aria-hidden="true" />
        <div className="compare-slider__handle-grip" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 5l-7 7 7 7M15 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </div>
  );
}

export function ProcessArrow({ label }) {
  return (
    <div className="process-arrow" aria-hidden="true">
      <span className="process-arrow__label">{label}</span>
      <div className="process-arrow__line">
        <div className="process-arrow__shaft"><div className="process-arrow__shaft-inner" /></div>
        <div className="process-arrow__head"><span className="process-arrow__chevron" /><span className="process-arrow__chevron" /><span className="process-arrow__chevron" /></div>
      </div>
      <span className="process-arrow__note">场景同理</span>
    </div>
  );
}
