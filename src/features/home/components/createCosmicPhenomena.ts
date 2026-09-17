import * as THREE from "three";

export function createBlackHole(
  gold: THREE.Color,
  paper: THREE.Color,
  voidColor: THREE.Color,
) {
  const group = new THREE.Group();
  group.name = "Distant black hole";

  const horizon = new THREE.Mesh(
    new THREE.SphereGeometry(1, 40, 28),
    new THREE.MeshBasicMaterial({ color: voidColor }),
  );
  group.add(horizon);

  const diskMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      gold: { value: gold },
      paper: { value: paper },
    },
    vertexShader: `varying vec3 positionOnDisk;
      void main() { positionOnDisk = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `uniform float time; uniform vec3 gold; uniform vec3 paper; varying vec3 positionOnDisk;
      void main() {
        float r = length(positionOnDisk.xy);
        float angle = atan(positionOnDisk.y, positionOnDisk.x);
        float bands = 0.6 + 0.4 * sin(r * 34.0 + angle * 4.0 - time * 0.5);
        float edge = smoothstep(1.15, 1.5, r) * (1.0 - smoothstep(2.0, 3.5, r));
        float hot = 1.0 - smoothstep(1.2, 2.4, r);
        gl_FragColor = vec4(mix(gold, paper, hot * 0.8), edge * (0.45 + bands * 0.5));
      }`,
    transparent: true,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const disk = new THREE.Mesh(
    new THREE.RingGeometry(1.2, 3.5, 128, 8),
    diskMaterial,
  );
  disk.rotation.set(1.28, -0.12, 0.1);
  group.add(disk);

  const photonRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.045, 0.027, 8, 112),
    new THREE.MeshBasicMaterial({
      color: paper,
      transparent: true,
      opacity: 0.9,
    }),
  );
  group.add(photonRing);

  // A bright upper image and a faint lower image suggest light bending around the horizon.
  [1, -1].forEach((side) => {
    const arc = new THREE.Mesh(
      new THREE.TorusGeometry(1.65, side === 1 ? 0.09 : 0.045, 8, 96, Math.PI),
      new THREE.MeshBasicMaterial({
        color: gold,
        transparent: true,
        opacity: side === 1 ? 0.9 : 0.45,
        blending: THREE.AdditiveBlending,
      }),
    );
    arc.scale.y = 0.76;
    arc.rotation.z = side === 1 ? 0 : Math.PI;
    arc.position.z = -0.15;
    group.add(arc);
  });

  group.rotation.z = -0.18;
  return {
    group,
    update: (time: number) => {
      diskMaterial.uniforms.time.value = time;
    },
  };
}

export function createSupernova(
  texture: THREE.Texture,
  cyan: THREE.Color,
  paper: THREE.Color,
  random: () => number,
) {
  const group = new THREE.Group();
  group.name = "Distant supernova remnant";
  const cloud = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: texture,
      color: cyan,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  cloud.scale.set(5, 5, 1);
  group.add(cloud);

  const core = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: texture,
      color: paper,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  core.scale.set(1.3, 1.3, 1);
  group.add(core);

  const positions: number[] = [];
  for (let i = 0; i < 600; i++) {
    const angle = random() * Math.PI * 2;
    const radius = 1.2 + random() * 1.2;
    positions.push(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * 0.8,
      (random() - 0.5) * 0.7,
    );
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  group.add(
    new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: cyan,
        size: 0.12,
        transparent: true,
        opacity: 0.75,
        map: texture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    ),
  );

  const rays = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-3.2, 0, 0),
    new THREE.Vector3(3.2, 0, 0),
    new THREE.Vector3(0, -2.3, 0),
    new THREE.Vector3(0, 2.3, 0),
  ]);
  group.add(
    new THREE.LineSegments(
      rays,
      new THREE.LineBasicMaterial({
        color: paper,
        transparent: true,
        opacity: 0.45,
      }),
    ),
  );
  return group;
}
