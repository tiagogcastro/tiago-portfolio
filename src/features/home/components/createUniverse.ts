import * as THREE from "three";
import type { MotionValue } from "motion/react";
import { createPlexusFigure } from "./createPlexusFigure";
import { TOPIC_WINDOWS } from "./cosmicJourney";

function timeline(progress: number, keys: number[], values: number[]) {
  let index = 0;
  while (index < keys.length - 2 && progress > keys[index + 1]) index++;
  const t = THREE.MathUtils.smoothstep(progress, keys[index], keys[index + 1]);
  return THREE.MathUtils.lerp(values[index], values[index + 1], t);
}

export function createUniverse(
  element: HTMLDivElement,
  progress: MotionValue<number>,
): (() => void) | undefined {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
  } catch {
    return;
  }
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, 1, 0.08, 100);
  const styles = getComputedStyle(element);
  const gold = new THREE.Color(styles.getPropertyValue("--accent").trim());
  const green = new THREE.Color(styles.getPropertyValue("--mineral").trim());
  const paper = new THREE.Color(styles.getPropertyValue("--paper").trim());
  scene.add(new THREE.HemisphereLight(paper, green, 1.8));
  const keyLight = new THREE.DirectionalLight(gold, 3.5);
  keyLight.position.set(-4, 8, 12);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(green, 4);
  rimLight.position.set(12, 3, -14);
  scene.add(rimLight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  element.appendChild(renderer.domElement);
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = 64;
  const context = sprite.getContext("2d")!;
  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.15, "rgba(255,255,255,0.8)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(sprite);
  let seed = 42;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  // The world stays in place. Scroll moves the camera through its actual depth.
  const universe = new THREE.Group();
  universe.position.z = -10;
  scene.add(universe);
  const orb = new THREE.Group();
  orb.scale.setScalar(6);
  universe.add(orb);
  const points = (
    positions: number[],
    color: THREE.Color,
    size: number,
    opacity: number,
  ) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    return new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color,
        size,
        map: texture,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
  };

  const dustPositions: number[] = [];
  const count = window.innerWidth < 900 ? 6500 : 11000;
  for (let i = 0; i < count; i++) {
    const radius = 1.3 + Math.pow(random(), 0.8) * 4.2;
    const angle =
      ((i % 4) * Math.PI) / 2 + radius * 1.4 + (random() - 0.5) * 0.5;
    dustPositions.push(
      Math.cos(angle) * radius,
      (random() - 0.5) * 0.4,
      Math.sin(angle) * radius,
    );
  }
  const dust = points(dustPositions, gold, 0.28, 0.9);
  dust.rotation.set(0.55, 0, -0.25);
  orb.add(dust);

  const shellMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: green },
      time: { value: 0 },
      strength: { value: 0.6 },
    },
    vertexShader: `varying vec3 vNormal; varying vec3 vView; varying vec3 vPosition;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vNormal=normalize(normalMatrix*normal); vView=normalize(-mv.xyz); vPosition=position; gl_Position=projectionMatrix*mv; }`,
    fragmentShader: `uniform vec3 color; uniform float time; uniform float strength; varying vec3 vNormal; varying vec3 vView; varying vec3 vPosition;
      void main(){ float rim=pow(1.0-abs(dot(normalize(vNormal),normalize(vView))),2.6); float scan=pow(0.5+0.5*sin(vPosition.y*26.0-time*0.65),18.0); gl_FragColor=vec4(color,(rim*0.6+scan*0.065)*strength); }`,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  orb.add(new THREE.Mesh(new THREE.SphereGeometry(2, 48, 32), shellMaterial));
  const spherePositions: number[] = [];
  for (let i = 0; i < 1400; i++) {
    const y = 1 - (i / 1399) * 2,
      radius = Math.sqrt(1 - y * y),
      angle = i * Math.PI * (3 - Math.sqrt(5));
    spherePositions.push(
      Math.cos(angle) * radius * 2.02,
      y * 2.02,
      Math.sin(angle) * radius * 2.02,
    );
  }
  const shellPoints = points(spherePositions, green, 0.14, 0.85);
  orb.add(shellPoints);
  const inner = new THREE.Group();
  orb.add(inner);
  const heart = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.45, 2),
    new THREE.MeshBasicMaterial({
      color: gold,
      transparent: true,
      opacity: 0.22,
      wireframe: true,
      blending: THREE.AdditiveBlending,
    }),
  );
  inner.add(heart);
  const glow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: texture,
      color: gold,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  glow.scale.set(2.3, 2.3, 1);
  inner.add(glow);
  const pulseRings: THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>[] =
    [];
  for (let i = 0; i < 2; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.6, 0.009, 5, 80),
      new THREE.MeshBasicMaterial({
        color: gold,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    inner.add(ring);
    pulseRings.push(ring);
  }
  const glyphMaterial = new THREE.MeshBasicMaterial({
    color: paper,
    transparent: true,
    opacity: 0.9,
  });
  const glyphGlowMaterial = new THREE.MeshBasicMaterial({
    color: gold,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const glyphPaths = [
    [
      [-0.4, 0.3, 0.5],
      [-0.7, 0, 0.5],
      [-0.4, -0.3, 0.5],
    ],
    [
      [0.4, 0.3, 0.5],
      [0.7, 0, 0.5],
      [0.4, -0.3, 0.5],
    ],
    [
      [0.13, 0.4, 0.5],
      [-0.13, -0.4, 0.5],
    ],
  ];
  for (const path of glyphPaths) {
    const curve = new THREE.CatmullRomCurve3(
      path.map((point) => new THREE.Vector3(...point)),
      false,
      "centripetal",
      0,
    );
    inner.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(curve, 16, 0.016, 5, false),
        glyphMaterial,
      ),
    );
    inner.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(curve, 16, 0.055, 5, false),
        glyphGlowMaterial,
      ),
    );
  }
  const rings: THREE.LineLoop[] = [];
  for (let i = 0; i < 4; i++) {
    const positions = Array.from({ length: 160 }, (_, j) => {
      const angle = (j / 160) * Math.PI * 2;
      return new THREE.Vector3(
        Math.cos(angle) * (2.1 + i * 0.18),
        Math.sin(angle) * (2.1 + i * 0.18),
        0,
      );
    });
    const ring = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(positions),
      new THREE.LineBasicMaterial({
        color: i % 2 ? green : gold,
        transparent: true,
        opacity: 0.32,
      }),
    );
    ring.rotation.set(i * 0.6, i * 0.8, 0.2);
    orb.add(ring);
    rings.push(ring);
  }

  const avatar = createPlexusFigure(green, gold, texture);
  universe.add(avatar.figure);
  avatar.figure.position.set(10.4, 0, 2);
  avatar.figure.scale.setScalar(2.5);
  // A code nucleus sits deeper inside the volume, beyond the outer membrane.
  inner.position.z = -1.65;
  for (let i = 0; i < 3; i++) {
    const layer = new THREE.LineSegments(
      new THREE.WireframeGeometry(
        new THREE.IcosahedronGeometry(1.5 - i * 0.3, 1),
      ),
      new THREE.LineBasicMaterial({
        color: green,
        transparent: true,
        opacity: 0.035,
      }),
    );
    orb.add(layer);
  }
  const connections: {
    line: THREE.Line;
    curve: THREE.CatmullRomCurve3;
    signals: THREE.Points;
  }[] = [];
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 + 0.4;
    const end = new THREE.Vector3(
      Math.cos(angle) * 4.2,
      Math.sin(angle) * 3.1,
      -0.7,
    );
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(end.x * 0.55, end.y * 0.3, 1),
      end,
    ]);
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(50)),
      new THREE.LineBasicMaterial({
        color: green,
        transparent: true,
        opacity: 0.25,
      }),
    );
    orb.add(line);
    const signals = points(new Array(24).fill(0), gold, 0.1, 0.9);
    orb.add(signals);
    connections.push({ line, curve, signals });
  }
  const starPositions: number[] = [];
  for (let i = 0; i < 800; i++)
    starPositions.push(
      (random() - 0.5) * 35,
      (random() - 0.5) * 25,
      (random() - 0.5) * 30,
    );
  const stars = points(starPositions, green, 0.055, 0.5);
  scene.add(stars);

  let width = 1,
    mobile = false;
  const resize = () => {
    width = element.clientWidth;
    mobile = width <= 900;
    avatar.figure.position.x = mobile ? 5 : 10.4;
    avatar.figure.scale.setScalar(mobile ? 1.8 : 2.5);
    camera.aspect = width / element.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(width, element.clientHeight);
  };
  const observer = new ResizeObserver(resize);
  observer.observe(element);
  resize();
  let pointerX = 0,
    pointerY = 0,
    frame = 0,
    active = false,
    lostContext = false,
    last = 0,
    elapsed = 0,
    slowFrames = 0;
  let dragging = false,
    lastPointerX = 0,
    lastPointerY = 0,
    yaw = 0,
    pitch = 0;
  let smoothProgress = progress.get();
  const point = new THREE.Vector3();
  const pointer = (event: PointerEvent) => {
    if (dragging) {
      yaw += (event.clientX - lastPointerX) * 0.004;
      pitch = THREE.MathUtils.clamp(
        pitch + (event.clientY - lastPointerY) * 0.002,
        -0.45,
        0.45,
      );
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      return;
    }
    if (event.pointerType !== "mouse") return;
    const rect = element.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.7;
    pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.4;
  };
  const resetPointer = () => {
    pointerX = 0;
    pointerY = 0;
  };
  const stage = element.parentElement!;
  const cards = Array.from(
    stage.querySelectorAll<HTMLElement>("[data-space-card]"),
  );
  const cardAnchors = [
    new THREE.Vector3(-3.5, 0, 8),
    new THREE.Vector3(3.5, 0, 3),
    new THREE.Vector3(-3.2, 0, -2),
    new THREE.Vector3(3.2, 0, -6),
    new THREE.Vector3(-3, 0, -10),
  ];
  const projected = new THREE.Vector3();
  const worldAnchor = new THREE.Vector3();
  const down = (event: PointerEvent) => {
    if (
      event.button !== 0 ||
      (event.target as HTMLElement).closest(
        "a, button, .cosmic-story-card, .cosmic-terminal",
      )
    )
      return;
    dragging = true;
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    stage.setPointerCapture(event.pointerId);
    stage.dataset.dragging = "true";
  };
  const up = (event: PointerEvent) => {
    dragging = false;
    stage.dataset.dragging = "false";
    if (stage.hasPointerCapture(event.pointerId))
      stage.releasePointerCapture(event.pointerId);
  };
  const resetView = () => {
    yaw = 0;
    pitch = 0;
    pointerX = 0;
    pointerY = 0;
  };
  stage.addEventListener("cosmic-reset", resetView);
  stage.addEventListener("pointerdown", down);
  stage.addEventListener("pointerup", up);
  stage.addEventListener("pointercancel", up);
  stage.addEventListener("pointermove", pointer);
  stage.addEventListener("pointerleave", resetPointer);
  const render = (now: number) => {
    if (!active || document.hidden || lostContext) return;
    const rawDt = (now - last) / 1000,
      dt = Math.max(0, Math.min(rawDt, 0.05));
    last = now;
    elapsed += dt;
    const blend = 1 - Math.exp(-dt * 7);
    smoothProgress += (progress.get() - smoothProgress) * blend;
    const p = smoothProgress;
    // Long, gently advancing reading stretches alternate with short flights.
    const keys = [
      0, 0.12, 0.14, 0.215, 0.25, 0.325, 0.36, 0.435, 0.47, 0.545, 0.58, 0.665,
      0.73, 0.84, 0.96, 1,
    ];
    const distance = timeline(
      p,
      keys,
      mobile
        ? [
            36, 18, 15.5, 15, 10.5, 10, 5.5, 5, 1.5, 1, -2.5, -3, -13, -13, 38,
            38,
          ]
        : [
            24, 12, 11.5, 11, 6.5, 6, 1.5, 1, -2.5, -3, -6.5, -7, -16, -16, 25,
            25,
          ],
    );
    const dive = timeline(
      p,
      [0, 0.56, 0.74, 0.85, 0.97, 1],
      [0, 0, 1, 1, 0, 0],
    );
    camera.position.set(
      pointerX * (1 - dive * 0.8),
      pointerY * (1 - dive),
      distance,
    );
    camera.lookAt(0, 0, distance - 30);
    // Only an explicit drag rotates the world. Autonomous motion stays in dust/rings.
    universe.rotation.y += (yaw - universe.rotation.y) * blend;
    universe.rotation.x += (pitch - universe.rotation.x) * blend;
    dust.rotation.y = elapsed * 0.035;
    shellPoints.rotation.y = elapsed * 0.035;
    shellMaterial.uniforms.time.value = elapsed;
    shellMaterial.uniforms.strength.value =
      0.95 + Math.sin(elapsed * 1.6) * 0.2;
    const beatPhase = (elapsed * 0.65) % 1;
    const heartbeat =
      Math.exp(-beatPhase * 12) +
      0.55 * Math.exp(-Math.pow((beatPhase - 0.2) / 0.07, 2));
    heart.rotation.set(elapsed * 0.14, elapsed * 0.2, 0);
    heart.scale.setScalar(1 + heartbeat * 0.22);
    inner.scale.setScalar(1 + heartbeat * 0.07);
    glow.material.opacity = (0.55 + heartbeat * 0.35) * (1 - dive * 0.6);
    glyphMaterial.opacity = (0.85 + heartbeat * 0.15) * (1 - dive * 0.8);
    glyphGlowMaterial.opacity = (0.3 + heartbeat * 0.35) * (1 - dive * 0.8);
    pulseRings.forEach((ring, i) => {
      const phase = (elapsed * 0.4 + i * 0.5) % 1;
      ring.scale.setScalar(1 + phase * 2.8);
      ring.material.opacity = (1 - phase) * 0.6 * (1 - dive * 0.75);
    });
    rings.forEach((ring, i) => {
      ring.rotation.z = elapsed * (i % 2 ? 0.025 : -0.02);
    });
    avatar.figure.rotation.y = -0.3 + Math.sin(elapsed * 0.22) * 0.06;
    avatar.figure.position.y =
      (mobile ? 4.8 : 0) + Math.sin(elapsed * 0.8) * 0.06;
    const presence = timeline(
      p,
      [0, 0.08, 0.5, 0.68, 0.86, 0.96, 1],
      [0.5, 1, 0.9, 0, 0, 1, 1],
    );
    avatar.wire.opacity = 0.26 * presence;
    avatar.nodeMaterial.opacity = 0.75 * presence;
    avatar.figure.visible = presence > 0.01;
    avatar.heart.scale.setScalar(1 + heartbeat * 0.35);
    avatar.circuitMaterial.opacity = (0.5 + heartbeat * 0.45) * presence;
    connections.forEach(({ line, curve, signals }, i) => {
      const [start, end] = TOPIC_WINDOWS[i];
      const focused = p > start && p < end;
      (line.material as THREE.LineBasicMaterial).opacity = focused ? 0.8 : 0.2;
      const positions = signals.geometry.getAttribute("position");
      for (let j = 0; j < positions.count; j++) {
        curve.getPoint((elapsed * 0.13 + j / positions.count) % 1, point);
        positions.setXYZ(j, point.x, point.y, point.z);
      }
      positions.needsUpdate = true;
    });
    renderer.render(scene, camera);
    // Project real world positions into HTML, preserving sharp, accessible text.
    // The cards do not slide in on a separate 2D animation timeline.
    cards.forEach((card, i) => {
      worldAnchor.copy(cardAnchors[i]);
      if (mobile) {
        worldAnchor.x = 0;
        worldAnchor.y = -0.7;
      }
      universe.localToWorld(worldAnchor);
      projected.copy(worldAnchor).project(camera);
      const depth = worldAnchor
        .clone()
        .applyMatrix4(camera.matrixWorldInverse).z;
      const visible = depth < -0.1 && projected.z < 1;
      card.style.visibility = visible ? "visible" : "hidden";
      if (!visible) return;
      const pixelsPerUnit =
        element.clientHeight /
        (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * -depth);
      const worldWidth = mobile ? 8.5 : 7.4;
      const scale = Math.min(
        mobile ? 1 : 1.12,
        Math.max(0.4, (pixelsPerUnit * worldWidth) / card.offsetWidth),
      );
      card.style.left = `${(projected.x * 0.5 + 0.5) * width}px`;
      card.style.top = `${(-projected.y * 0.5 + 0.5) * element.clientHeight}px`;
      card.style.transform = `translate(-50%, -50%) scale(${scale})`;
    });
    // Reduce fill cost on sustained slow devices without removing the journey.
    if (rawDt > 0.04) slowFrames++;
    else slowFrames = Math.max(0, slowFrames - 1);
    if (slowFrames > 100 && renderer.getPixelRatio() > 1) {
      renderer.setPixelRatio(1);
      renderer.setSize(width, element.clientHeight);
      slowFrames = 0;
    }
    frame = requestAnimationFrame(render);
  };
  const start = () => {
    cancelAnimationFrame(frame);
    last = performance.now();
    if (active && !document.hidden && !lostContext)
      frame = requestAnimationFrame(render);
  };
  const visibility = new IntersectionObserver(([entry]) => {
    active = entry.isIntersecting;
    start();
  });
  visibility.observe(element);
  document.addEventListener("visibilitychange", start);
  const lost = (event: Event) => {
    event.preventDefault();
    lostContext = true;
    cancelAnimationFrame(frame);
    renderer.domElement.style.opacity = "0";
  };
  const restored = () => {
    lostContext = false;
    renderer.domElement.style.opacity = "1";
    start();
  };
  renderer.domElement.addEventListener("webglcontextlost", lost);
  renderer.domElement.addEventListener("webglcontextrestored", restored);
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    visibility.disconnect();
    stage.removeEventListener("pointermove", pointer);
    stage.removeEventListener("pointerleave", resetPointer);
    stage.removeEventListener("pointerdown", down);
    stage.removeEventListener("pointerup", up);
    stage.removeEventListener("pointercancel", up);
    stage.removeEventListener("cosmic-reset", resetView);
    cards.forEach((card) => {
      card.style.removeProperty("left");
      card.style.removeProperty("top");
      card.style.removeProperty("transform");
      card.style.removeProperty("visibility");
    });
    document.removeEventListener("visibilitychange", start);
    renderer.domElement.removeEventListener("webglcontextlost", lost);
    renderer.domElement.removeEventListener("webglcontextrestored", restored);
    const materials = new Set<THREE.Material>();
    scene.traverse((object) => {
      if (
        object instanceof THREE.Mesh ||
        object instanceof THREE.Points ||
        object instanceof THREE.Line
      ) {
        object.geometry.dispose();
        (Array.isArray(object.material)
          ? object.material
          : [object.material]
        ).forEach((m) => materials.add(m));
      }
      if (object instanceof THREE.Sprite) materials.add(object.material);
    });
    materials.forEach((material) => material.dispose());
    texture.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
