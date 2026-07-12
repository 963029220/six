import { useEffect, useRef } from 'react';
import gsap from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './UI.jsx';
gsap.registerPlugin(ScrollTrigger);

const tips = [
  { icon: '01', title: '图片参考-垫图', text: '参考@图中的人物和位置关系<br/>分镜1：开场一帧快闪@图一的两人画面的人物关系（注意只有一帧）' },
  { icon: '02', title: '视频参考-控人物展位与环境光影', text: '参考@视频 ，加描述环境氛围和光影 ，最后加上参考视频但不延续<br/>理论和前面的垫图差不多' },
  { icon: '03', title: '人物刷光', text: '当场景颜色和氛围比较强的时候可以将人物放到场景中去参考场景的光影氛围去重新生成一个带打光的人物资产' },
  { icon: '04', title: '同动作延续（30s到30s同理）', text: '方法1：上一个视频尾帧的一个清晰的位置关系图， @图片加描述人物与人物之间的位置关系和动作，加上运镜。 <br/>方法2：将尾帧的截图拿出来用G2模型在跑一遍  连上人物资产后写  切换镜头位置，什么角度什么焦段什么表情等等重新生成一张底图。  视频提示词写参考@图1的构图，不要扩大构图画面！<br/>（还是有点脏的话用剪映的美颜消除一下）' },
  { icon: '05', title: '视频参考-特效和人物站位和姿态', text: '将直接接上2秒左右的参考视频  一点不要去@参考视频     就正常输入镜头和资产就行 即梦会自己去参考视频中的人物站位等等' },
  { icon: '06', title: '对标！', text: '一定要加上对标的电影电视剧等等 这次即梦才能去素材库中直接调用对应的素材质量人物动态等等' },
];

export default function TipsSection() {
  const reduced = useReducedMotion(); const ref = useRef(null);
  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      ref.current.querySelectorAll('.reveal').forEach(el => { gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }); });
    }, ref);
    return () => { ctx.revert(); };
  }, [reduced]);

  return (
    <section className="tips-section" id="tips" ref={ref}>
      <div className="tips-section__inner">
        <div className="reveal"><h2 className="tips-section__title">小技巧</h2></div>
        <div className="tips-grid">
          {tips.map((tip, i) => (
            <div className="tip-card reveal" key={i}>
              <span className="tip-card__icon">{tip.icon}</span>
              <h3 className="tip-card__title">{tip.title}</h3>
              <p className="tip-card__text" dangerouslySetInnerHTML={{ __html: tip.text }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
