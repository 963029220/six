import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function BgCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let RM = mq.matches;
    const mqListener = (e) => { RM = e.matches; };
    const canvas = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 600;

    // 8000 warm nebula particles — spread out, not dense
    const COUNT = 8000;
    const pos = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const t = Math.random();
      const r = Math.pow(t, 0.4) * 700;   // wider radius
      const angle = Math.random() * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 200;
      pos[i*3] = Math.cos(angle) * r;
      pos[i*3+1] = spread;
      pos[i*3+2] = Math.sin(angle) * r;

      const warmth = 1 - t;
      colors[i*3] = 0.95 * warmth + 0.6 * (1 - warmth);
      colors[i*3+1] = 0.75 * warmth + 0.1 * (1 - warmth);
      colors[i*3+2] = 0.1 * warmth + 0.05 * (1 - warmth);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        uniform vec2 uMouse;
        void main() {
          vColor = color;
          vec3 p = position;
          float a = uTime * 0.015;
          float ca = cos(a), sa = sin(a);
          p.xz = mat2(ca, -sa, sa, ca) * p.xz;
          p.x += uMouse.x * 15.0;
          p.y += uMouse.y * 8.0;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (1.5 + 2.0 * (1.0 - length(p) / 600.0)) * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float alpha = 1.0 - d * 2.0;
          alpha = pow(alpha, 2.0);
          gl_FragColor = vec4(vColor, alpha * 0.7);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    let mx = 0, my = 0;
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    mq.addEventListener('change', mqListener);
    window.addEventListener('mousemove', onMouse);

    let running = true;
    function loop(t) {
      if (!running) return;
      mat.uniforms.uTime.value = t * 0.001;
      mat.uniforms.uMouse.value.set(mx, my);
      renderer.render(scene, camera);
      if (!RM) requestAnimationFrame(loop);
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    if (RM) renderer.render(scene, camera);
    else requestAnimationFrame(loop);

    return () => {
      running = false;
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      mq.removeEventListener('change', mqListener);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" aria-hidden="true" />;
}
