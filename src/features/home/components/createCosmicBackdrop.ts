import {
  createBlackHole,
  createSupernova,
} from "@/features/home/components/createCosmicPhenomena";
import * as THREE from "three";

type DistantPlacement = {
  object: THREE.Object3D;
  x: number;
  y: number;
  depth: number;
  size: number;
  mobile?: [number, number];
};

export function createCosmicBackdrop(
  texture: THREE.Texture,
  colors: THREE.Color[],
  random: () => number,
  voidColor: THREE.Color,
) {
  const group = new THREE.Group();
  const galaxies: THREE.Group[] = [];
  const planets: THREE.Group[] = [];
  const placements: DistantPlacement[] = [];
  const corners = [
    [-0.84, 0.76],
    [0.86, 0.79],
    [-0.87, -0.76],
    [0.86, -0.79],
  ];

  // Different galaxy shapes, all beyond the main orb and framed around its silhouette.
  for (let index = 0; index < 25; index++) {
    const galaxy = new THREE.Group();
    const positions: number[] = [];
    const color = colors[index % colors.length];
    const kind = index % 4;
    const count = index < 7 ? 900 : 260;

    for (let i = 0; i < count; i++) {
      const radius = Math.pow(random(), 0.7);
      const arm =
        ((i % (kind === 3 ? 2 : 3)) * Math.PI * 2) / (kind === 3 ? 2 : 3);
      const angle = radius * 6 + arm + (random() - 0.5) * 0.7;
      if (kind === 1) {
        const a = random() * Math.PI * 2;
        positions.push(
          Math.cos(a) * radius,
          Math.sin(a) * radius * 0.6,
          (random() - 0.5) * 0.15,
        );
      } else if (kind === 2) {
        positions.push(
          (random() - 0.5) * 1.8,
          (random() - 0.5) * 0.8 + Math.sin(radius * 5) * 0.2,
          (random() - 0.5) * 0.2,
        );
      } else {
        positions.push(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.5,
          (random() - 0.5) * 0.07,
        );
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    const material = new THREE.PointsMaterial({
      color,
      size: 1.4,
      map: texture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    galaxy.add(new THREE.Points(geometry, material));
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        color,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    glow.scale.set(0.6, 0.6, 1);
    galaxy.add(glow);
    galaxy.rotation.z = random() * Math.PI * 2;

    const [x, y] = corners[index % corners.length];
    const depth = 200 + (index % 3) * 300 + random() * 100;
    placements.push({
      object: galaxy,
      x: x + (random() - 0.5) * 0.16,
      y: y + (random() - 0.5) * 0.22,
      depth,
      size: depth * (index < 7 ? 0.032 : 0.012),
    });
    galaxies.push(galaxy);
    group.add(galaxy);
  }

  [
    [-0.92, 0.32],
    [0.94, -0.4],
    [-0.57, -0.9],
    [0.3, 0.94],
    [-0.9, -0.55],
  ].forEach(([x, y], index) => {
    const planet = new THREE.Group();
    const color = colors[index % colors.length];
    planet.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(1, 24, 16),
        new THREE.MeshPhongMaterial({
          color,
          emissive: color.clone().multiplyScalar(0.12),
          shininess: 40,
        }),
      ),
    );
    if (index % 2 === 0) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.65, 0.025, 6, 72),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.65,
        }),
      );
      ring.rotation.set(0.8, 0.3, index);
      planet.add(ring);
    }
    placements.push({
      object: planet,
      x,
      y,
      depth: 140 + index * 40,
      size: 1.2 + index * 0.2,
      mobile: [x, y > 0 ? 0.87 : -0.84],
    });
    planets.push(planet);
    group.add(planet);
  });

  const blackHole = createBlackHole(
    colors[2],
    new THREE.Color().copy(colors[2]).lerp(new THREE.Color(1, 1, 1), 0.7),
    voidColor,
  );
  group.add(blackHole.group);
  placements.push({
    object: blackHole.group,
    x: 0.78,
    y: 0.63,
    depth: 360,
    size: 9,
    mobile: [0.64, -0.73],
  });

  const supernova = createSupernova(
    texture,
    colors[0],
    colors[2].clone().lerp(new THREE.Color(1, 1, 1), 0.8),
    random,
  );
  group.add(supernova);
  placements.push({
    object: supernova,
    x: -0.83,
    y: -0.7,
    depth: 600,
    size: 7,
    mobile: [0.63, 0.74],
  });

  // Every distant object has a real depth. Responsive placement keeps the outer sky
  // outside the central ring, rather than projecting the backdrop onto its interior.
  const resize = (aspect: number, mobile: boolean) => {
    const tangent = Math.tan(THREE.MathUtils.degToRad(24));
    placements.forEach(({ object, x, y, depth, size, mobile: alternate }) => {
      const [px, py] = mobile && alternate ? alternate : [x, y];
      const distance = depth + (mobile ? 36 : 24);
      object.position.set(
        px * distance * tangent * aspect,
        py * distance * tangent,
        -depth,
      );
      object.scale.setScalar(
        size * (mobile && object === blackHole.group ? 0.72 : 1),
      );
    });
  };

  return { group, galaxies, planets, resize, update: blackHole.update };
}
