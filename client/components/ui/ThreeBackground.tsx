'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const N = 100;
const BX = 500, BY = 360, BZ = 200;
const CONNECT = 155;

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let mouseX = 0;
    let mouseY = 0;

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / W) * 2 - 1;
      mouseY = -(e.clientY / H) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouse);

    /* renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    /* scene / camera */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 1, 3000);
    camera.position.z = 600;

    /* particles — darker colors for light bg */
    const posArr = new Float32Array(N * 3);
    const colArr = new Float32Array(N * 3);
    const vel: [number, number, number][] = [];

    const gold  = new THREE.Color(0xb8842a);
    const teal  = new THREE.Color(0x0a9e8c);
    const slate = new THREE.Color(0x4a6ca8);

    for (let i = 0; i < N; i++) {
      posArr[i * 3]     = (Math.random() - 0.5) * BX * 2;
      posArr[i * 3 + 1] = (Math.random() - 0.5) * BY * 2;
      posArr[i * 3 + 2] = (Math.random() - 0.5) * BZ * 2;
      vel.push([
        (Math.random() - 0.5) * 0.22,
        (Math.random() - 0.5) * 0.22,
        (Math.random() - 0.5) * 0.09,
      ]);
      const r = Math.random();
      const c = r < 0.4 ? gold : r < 0.65 ? teal : slate;
      colArr[i * 3] = c.r; colArr[i * 3 + 1] = c.g; colArr[i * 3 + 2] = c.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(colArr, 3));
    const pMat = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    /* connections */
    const linePos = new Float32Array(N * N * 6);
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    const lMat = new THREE.LineBasicMaterial({ color: 0xb8842a, transparent: true, opacity: 0.13 });
    const lines = new THREE.LineSegments(lGeo, lMat);
    scene.add(lines);

    /* resize */
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    /* animate */
    let raf: number;
    const pp = pGeo.attributes.position as THREE.BufferAttribute;
    const lp = lGeo.attributes.position as THREE.BufferAttribute;

    const tick = () => {
      raf = requestAnimationFrame(tick);

      /* smooth mouse-follow parallax */
      camera.position.x += (mouseX * 90 - camera.position.x) * 0.04;
      camera.position.y += (mouseY * 55 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      /* drift particles */
      for (let i = 0; i < N; i++) {
        pp.array[i * 3]     += vel[i][0];
        pp.array[i * 3 + 1] += vel[i][1];
        pp.array[i * 3 + 2] += vel[i][2];
        if (Math.abs(pp.array[i * 3])     > BX) vel[i][0] *= -1;
        if (Math.abs(pp.array[i * 3 + 1]) > BY) vel[i][1] *= -1;
        if (Math.abs(pp.array[i * 3 + 2]) > BZ) vel[i][2] *= -1;
      }
      pp.needsUpdate = true;

      /* rebuild connections */
      let li = 0;
      const C2 = CONNECT * CONNECT;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pp.array[i * 3]     - pp.array[j * 3];
          const dy = pp.array[i * 3 + 1] - pp.array[j * 3 + 1];
          const dz = pp.array[i * 3 + 2] - pp.array[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < C2 && li + 5 < linePos.length) {
            lp.array[li++] = pp.array[i * 3];
            lp.array[li++] = pp.array[i * 3 + 1];
            lp.array[li++] = pp.array[i * 3 + 2];
            lp.array[li++] = pp.array[j * 3];
            lp.array[li++] = pp.array[j * 3 + 1];
            lp.array[li++] = pp.array[j * 3 + 2];
          }
        }
      }
      lp.needsUpdate = true;
      lGeo.setDrawRange(0, li / 3);

      renderer.render(scene, camera);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      pGeo.dispose();
      lGeo.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }} />
  );
}
