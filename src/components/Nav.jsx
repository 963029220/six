import { useReducedMotion } from './UI.jsx';
import { site } from '../data/content.js';

export default function Nav({ active }) {
  const reduced = useReducedMotion();
  const items = ['hero', 'characters', 'scenes', 'prompts', 'camera', 'tips'];
  const labels = ['HOME', '人物资产', '场景资产', '视频提示词', '相机设置', '小技巧'];
  const scroll = (e, id) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); };
  return (
    <header className="nav">
      <a href="#hero" className="nav__brand" onClick={e => scroll(e, 'hero')}>影月寒风<span>·</span> 堵桥小分队</a>
      <nav className="nav__links" aria-label="主导航">
        {items.map((id, i) => (
          <><a key={id} href={`#${id}`} className={`nav__item${active === id ? ' is-active' : ''}`} onClick={e => scroll(e, id)}>{labels[i]}</a>{i < items.length - 1 && <span className="nav__sep" aria-hidden="true">·</span>}</>
        ))}
      </nav>
    </header>
  );
}
