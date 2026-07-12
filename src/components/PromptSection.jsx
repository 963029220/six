import { useEffect, useRef } from 'react';
import gsap from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sections } from '../data/content.js'; import { useReducedMotion, PromptCard } from './UI.jsx';
gsap.registerPlugin(ScrollTrigger);

export default function PromptSection() {
  const reduced = useReducedMotion(); const ref = useRef(null); const { prompts } = sections;
  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      ref.current.querySelectorAll('.reveal').forEach(el => { gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }); });
    }, ref);
    return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [reduced]);

  const cardItems = [
    { code: '提示词开头', title: '', text: '禁止字幕，不要字幕，不要音乐，禁止音乐，仅保留现场录音。对应剧本的<span class="text-red">朝代或者时代</span>。加上对标：', extra: '什么电影 或者风格' },
    { code: '前缀-看情况使用', title: '', text: '1.注意人物的光线根据环境光设定，其全部的受光都是来自于环境，不要单独给光源，电影级布光！ 参考什么电影\n2.人物可以自然裁切，无需保持人物的面部以及的身体都在构图画面中！\n3.所有镜头的人物位置关系以及人物和环境的关系要有正确的合理性和连贯性！' },
    { code: '提示词结构', title: '', text: '图片1作为沈念的形象视觉锚定。 \n图片2作为沈清婉的形象视觉锚定。\n 图片3是轿子。 \n音频1作为的参考音色。\n 沈念近景，过肩镜头，沈念双手负于身后， 沈念（面露讥讽，趾高气昂的说）：你体内的毒只剩三天时间，（切太子的近景，过肩镜头）你现在动怒气血上涌，毒素直冲心脉。（切回沈念近景，过肩镜头）再耽搁半个时辰，（切回沈念面部特写）谁都救不了你。 \n\n<span class=\"text-red\">最后用agent优化一遍提示词，注意人物要有表情和动作而不是僵尸。</span>', caution: '<strong>注意：</strong>横屏剧需要加上 光圈和焦段' },
    { code: '尾缀打光提示词-看情况使用', title: '', text: '打光：人物侧后方45°暖金色柔光主光，勾勒人物轮廓、勾勒发丝、肩线与衣摆的金边，形成通透的发光边缘。\n正面柔光箱柔化伦勃朗光补光，光比柔和，消除面部硬阴影，人物面部皮肤呈现通透柔光质感。\n背景虚化暖调散景光斑+户外自然光漫反射，整体笼罩一层柔和的橘金色光晕。\n色温3200K，色调偏暖。' },
    { code: '尾缀摄影机使用', title: '', text: '使用IMAX胶片摄影机，搭配Panavision C系列镜头' },
  ];

  return (
    <section className="sect" id={prompts.id} ref={ref}>
      <div className="sect__inner">
        <div className="reveal" style={{ marginBottom: 'clamp(40px,6vh,64px)' }}><div className="sect__index">{prompts.index}</div><h2 className="sect__title">{prompts.title}</h2><p className="sect__desc">{prompts.desc}</p></div>
        <div className="prompt-row">
          {cardItems.map((item, i) => <PromptCard key={i} code={item.code} title={item.title} text={item.text} extra={item.extra} caution={item.caution} />)}
        </div>
      </div>
    </section>
  );
}
