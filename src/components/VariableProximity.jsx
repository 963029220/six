import { useRef, useEffect, useState, forwardRef } from 'react';

function springUpdate(state, target, stiffness, damping) {
  const diff = target - state.current;
  state.velocity += diff * stiffness * 0.016;
  state.velocity *= Math.max(0, 1 - damping * 0.016);
  state.current += state.velocity * 0.016;
  if (Math.abs(diff) < 0.001 && Math.abs(state.velocity) < 0.001) state.current = target;
  return Math.max(0, Math.min(1, state.current));
}

function ProximityChar({ char, fromWght, toWght, fromOpsz, toOpsz, radius }) {
  const charRef = useRef(null);
  const [settings, setSettings] = useState(`'wght' ${fromWght}, 'opsz' ${fromOpsz}`);
  const s = useRef({ current: 0, velocity: 0, target: 0, running: true });

  useEffect(() => {
    s.current.running = true;
    let raf;
    const loop = () => {
      if (!s.current.running) return;
      const t = springUpdate(s.current, s.current.target, 150, 20);
      const w = Math.round(fromWght + t * (toWght - fromWght));
      const o = Math.round(fromOpsz + t * (toOpsz - fromOpsz));
      setSettings(`'wght' ${w}, 'opsz' ${o}`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { s.current.running = false; cancelAnimationFrame(raf); };
  }, [fromWght, toWght, fromOpsz, toOpsz]);

  useEffect(() => {
    const onMove = (e) => {
      const el = charRef.current;
      if (!el) { s.current.target = 0; return; }
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      s.current.target = dist >= radius ? 0 : 1 - dist / radius;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [radius]);

  return <span ref={charRef} className="inline-block" style={{ fontVariationSettings: settings }}>{char}</span>;
}

const VariableProximity = forwardRef(function VariableProximity({
  label,
  fromWght = 400,
  toWght = 800,
  fromOpsz = 9,
  toOpsz = 40,
  radius = 50,
  className = '',
}, ref) {
  return (
    <span ref={ref} className={`inline-flex flex-wrap items-center ${className}`}>
      {label.split('').map((char, i) => (
        <ProximityChar key={i} char={char} fromWght={fromWght} toWght={toWght} fromOpsz={fromOpsz} toOpsz={toOpsz} radius={radius} />
      ))}
    </span>
  );
});

export default VariableProximity;
