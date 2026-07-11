export const site = {
  title: '影月寒风 — 堵桥小分队',
  nav: ['人物资产','场景资产','视频提示词','相机设置'],
  hero: { chars: ['影','月','寒','风'], sub: ['堵','桥','小','分','队'], tag: ['内','部','使','用'], cta: '开始学习' },
  footer: '堵桥小分队 · 内部工具 · v3.0',
};

export const sections = {
  characters: {
    id: 'characters', index: '角色', title: '人物资产', desc: '提示词标准及制作流程',
    flow: [
      { title: 'IMAGE2-人物版', text: '上格中间 —— 正面面部近景，左上格 ——纯右侧面脸部近景（标准侧颜） ，右上角—— 纯左侧面脸部近景（标准侧颜），左下格 ——正面全身（颈部往下裁切，无脸部），下格中间 —— 纯左侧全身（颈部往下裁切，无脸部），右下格 —— 背面全身（含后脑）。人物比例正常。无动作，无表情，纯灰色背景，9：16' },
      { label: '用Banana pro 进行去除噪点', isArrow: true },
      { title: 'Banana Pro 重绘', text: '请完整识别这张图里的所有信息：人物长相、姿态、表情、服装、配饰、场景、道具、光源方向、色彩基调、镜头景别与构图。保持以上一切不变，只重绘画面的质感 —— 让线条更柔和、边缘不锐利、材质更统一、细节不堆砌、整体更通透。参考：一张精心打光的电影剧照，而不是高清数码照片。' },
    ],
    compares: [
      { id: 'compare-char-1', ratio: '9x16', before: '左侧.png', after: '右侧.png' },
      { id: 'compare-char-2', ratio: '16x9', before: '左侧2.png', after: '右侧2.png' },
    ], alt: false,
  },
  scenes: {
    id: 'scenes', index: '场景', title: '场景资产', desc: '提示词标准及制作流程',
    cards: [
      { title: 'IMAGE2场景尾缀（按需求适当删减提示词）', text: '画面风格要求：柔焦边缘，克制的细节表达，大色块优先，材质统一干净，避免堆砌细碎纹理，整体通透高级。参考电影摄影质感：浅景深柔光、自然胶片颗粒、Kodak Portra 400 色调，像一张精心打光的电影剧照，而不是高清数码照片。' },
      { title: '场景切换角度提示词-使用IMAGE2模型', text: '参考@图片1，相机位于画面的 右侧(90°) / 俯视(30°) / 全景×1.8' },
    ],
    compares: [
      { id: 'compare-scene-1', ratio: '16x9', before: '左侧3.png', after: '右侧3.jpg' },
    ], alt: true,
  },
  prompts: {
    id: 'prompts', index: '提示词', title: '生成提示词', desc: '多平台视频生成提示词模板与参数预设。',
    items: [
      { platform: 'Seedance · 2.0', text: 'cinematic wide shot, ancient bridge under moonlight, cold wind blowing snow, slow camera push-in, 24fps, anamorphic lens, film grain, desaturated cold palette, 35mm', scene: 'SCN.001 月下古城' },
      { platform: 'Kling · 1.6', text: '远景，月光下的断桥，寒风夹雪，镜头缓慢推进，冷色调，电影质感，35mm胶片，浅景深，变形宽银幕', scene: 'SCN.004 断桥残雪' },
      { platform: 'Sora · v2', text: 'dense forest shrouded in mist, dappled moonlight piercing through canopy, character silhouette standing still, ambient fog, volumetric lighting, 48fps slow motion, cinematic grading', scene: 'SCN.002 密林深处' },
      { platform: 'Seedance · 2.0', text: 'extreme long shot, frozen canyon under storm clouds, wind gusts carving ice particles, camera crane down, 8K RAW, ARRI Alexa, cold LUT, dramatic sky', scene: 'SCN.003 寒风峡谷' },
    ],
    compares: [{ id: 'compare-prompt', ratio: '16x9', before: '左侧3.png', after: '右侧3.jpg' }], alt: false,
  },
  camera: {
    id: 'camera', index: '相机', title: '摄影机参数', desc: '虚拟摄影机配置、镜头库与运镜轨迹预设。',
    lensData: [
      { category: '超广角', range: '＜24mm（14mm·16mm·20mm）', feature: '视角极广，透视夸张（近大远小），空间纵深感极强，边缘有明显畸变', scene: '大场景环境交代、运动跟拍、建筑空镜、营造压迫/空旷的情绪氛围' },
      { category: '广角', range: '24mm–35mm', feature: '视角开阔，畸变可控，兼顾环境与主体，代入感强', scene: '人物全景/中景、室内对话戏、人文纪实、街景叙事' },
      { category: '标准焦段', range: '40mm–60mm（核心 50mm）', feature: '视角接近人眼，透视自然无畸变，画面真实平实', scene: '人物中近景、写实叙事、日常对话戏，观众代入感最强' },
      { category: '中长焦', range: '70mm–135mm（经典 85mm·135mm）', feature: '空间压缩感明显，背景虚化能力强，人物畸变为零', scene: '人物特写、双人对话、情绪镜头，突出主体剥离背景' },
      { category: '长焦（望远）', range: '≥200mm', feature: '极强空间压缩，放大倍率高，虚化柔和', scene: '远距离拍摄、远景细节、写意空镜、营造疏离/窥视感' },
    ],
    stats: [
      { label: '光圈', value: 'AIGC常用的光圈为 f/1.0、f/1.4、f/2.0', unit: '' },
    ], alt: true,
  },
};
