import * as THREE from "three";

/** An articulated, faceless figure with an open hand facing the central orb. */
export function createPlexusFigure(
  green: THREE.Color,
  gold: THREE.Color,
  texture: THREE.Texture,
) {
  const figure = new THREE.Group();
  const wire = new THREE.MeshBasicMaterial({
    color: green,
    wireframe: true,
    transparent: true,
    opacity: 0.38,
    depthWrite: false,
  });
  const skin = new THREE.MeshPhongMaterial({
    color: green.clone().multiplyScalar(0.16),
    emissive: green.clone().multiplyScalar(0.04),
    specular: gold.clone().multiplyScalar(0.65),
    shininess: 70,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
  const nodes: number[] = [];
  const addMesh = (
    geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    position: THREE.Vector3,
    scale = new THREE.Vector3(1, 1, 1),
    quaternion?: THREE.Quaternion,
  ) => {
    const mesh = new THREE.Mesh(geometry, wire);
    const surface = new THREE.Mesh(geometry, skin);
    mesh.add(surface);
    mesh.renderOrder = 1;
    mesh.position.copy(position);
    mesh.scale.copy(scale);
    if (quaternion) mesh.quaternion.copy(quaternion);
    figure.add(mesh);
    mesh.updateMatrix();
    const vertices = geometry.getAttribute("position");
    const point = new THREE.Vector3();
    for (let i = 0; i < vertices.count; i += 3) {
      point.fromBufferAttribute(vertices, i).applyMatrix4(mesh.matrix);
      nodes.push(point.x, point.y, point.z);
    }
    return mesh;
  };
  const sphere = (
    x: number,
    y: number,
    z: number,
    sx: number,
    sy: number,
    sz: number,
    detail = 1,
  ) =>
    addMesh(
      new THREE.IcosahedronGeometry(1, detail),
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(sx, sy, sz),
    );
  const limb = (a: number[], b: number[], upper: number, lower: number) => {
    const from = new THREE.Vector3(...a),
      to = new THREE.Vector3(...b);
    const direction = to.clone().sub(from);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize(),
    );
    addMesh(
      new THREE.CylinderGeometry(lower, upper, direction.length(), 10, 6, true),
      from.clone().add(to).multiplyScalar(0.5),
      undefined,
      quaternion,
    );
  };

  // Head, jaw, neck, ribcage and pelvis have separate contours rather than a single primitive.
  const headProfile = [
    [0, 0],
    [0.13, 0.04],
    [0.24, 0.13],
    [0.3, 0.28],
    [0.34, 0.46],
    [0.33, 0.61],
    [0.26, 0.74],
    [0.14, 0.81],
    [0, 0.84],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  addMesh(
    new THREE.LatheGeometry(headProfile, 28),
    new THREE.Vector3(0, 1.92, 0),
    new THREE.Vector3(1, 1, 0.92),
  );
  limb([0, 1.62, 0], [0, 1.98, 0], 0.17, 0.14);
  const profile = [
    [0.3, -0.1],
    [0.36, 0.1],
    [0.4, 0.4],
    [0.45, 0.55],
    [0.51, 0.65],
    [0.55, 0.75],
    [0.57, 1.02],
    [0.43, 1.2],
    [0.18, 1.28],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  addMesh(
    new THREE.LatheGeometry(profile, 32),
    new THREE.Vector3(0, 0.38, 0),
    new THREE.Vector3(1, 1, 0.6),
  );
  sphere(0, 0.3, 0, 0.42, 0.35, 0.28, 2);
  const circuitMaterial = new THREE.LineBasicMaterial({
    color: gold,
    transparent: true,
    opacity: 0.75,
  });
  const circuit = (path: number[][]) => {
    const curve = new THREE.CatmullRomCurve3(
      path.map((point) => new THREE.Vector3(...point)),
    );
    figure.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(32)),
        circuitMaterial,
      ),
    );
  };
  // Fine rib contours and bilateral data paths give the torso structure.
  for (let rib = 0; rib < 6; rib++) {
    const y = 0.62 + rib * 0.14,
      width = 0.34 + rib * 0.032;
    circuit([
      [-width, y, 0.14],
      [-width * 0.6, y - 0.045, 0.27],
      [0, y - 0.06, 0.31],
      [width * 0.6, y - 0.045, 0.27],
      [width, y, 0.14],
    ]);
  }
  circuit([
    [-0.17, 1.65, 0.14],
    [-0.42, 1.4, 0.27],
    [-0.35, 0.94, 0.28],
    [-0.22, 0.5, 0.23],
  ]);
  circuit([
    [0.17, 1.65, 0.14],
    [0.42, 1.4, 0.27],
    [0.35, 0.94, 0.28],
    [0.22, 0.5, 0.23],
  ]);
  circuit([
    [-0.22, 2.5, 0.22],
    [0, 2.55, 0.315],
    [0.22, 2.5, 0.22],
  ]);

  // Left arm is extended toward the orb, right arm hangs naturally.
  const shoulders = [
    [-0.58, 1.43, 0],
    [0.58, 1.43, 0],
  ];
  const elbows = [
    [-1.03, 0.84, 0.2],
    [0.79, 0.62, 0.02],
  ];
  const wrists = [
    [-1.55, 1.04, 0.32],
    [0.79, -0.02, 0.14],
  ];
  for (let side = 0; side < 2; side++) {
    const s = shoulders[side],
      e = elbows[side],
      w = wrists[side];
    sphere(s[0], s[1], s[2], 0.25, 0.26, 0.25, 2);
    limb(s, e, 0.21, 0.15);
    circuit([
      [s[0], s[1], s[2] + 0.22],
      [e[0], e[1], e[2] + 0.15],
      [w[0], w[1], w[2] + 0.09],
    ]);
    sphere(e[0], e[1], e[2], 0.15, 0.16, 0.15);
    limb(e, w, 0.16, 0.09);
    sphere(w[0], w[1], w[2], 0.09, 0.1, 0.09);
    const palm = new THREE.Vector3(
      w[0] + (side === 0 ? -0.12 : 0),
      w[1] + (side === 0 ? 0.01 : -0.16),
      w[2],
    );
    sphere(palm.x, palm.y, palm.z, 0.12, 0.16, 0.06, 2);
    for (let finger = 0; finger < 5; finger++) {
      const offset = (finger - 2) * 0.046;
      const length = finger === 0 ? 0.16 : 0.24 - Math.abs(finger - 2) * 0.025;
      const from =
        side === 0
          ? [palm.x - 0.05, palm.y + offset, palm.z]
          : [palm.x + offset, palm.y - 0.09, palm.z];
      const mid =
        side === 0
          ? [from[0] - length * 0.6, from[1] + 0.07, from[2] + 0.025]
          : [from[0] + offset * 0.15, from[1] - length * 0.6, from[2] + 0.03];
      const tip =
        side === 0
          ? [mid[0] - length * 0.4, mid[1] + 0.04, mid[2] + 0.04]
          : [mid[0], mid[1] - length * 0.4, mid[2] + 0.05];
      limb(from, mid, 0.025, 0.02);
      limb(mid, tip, 0.02, 0.012);
    }
  }
  for (const side of [-1, 1]) {
    const hip = [side * 0.25, 0.2, 0],
      knee = [side * 0.29, -0.8, 0.09],
      ankle = [side * 0.34, -1.75, 0];
    limb(hip, knee, 0.24, 0.15);
    sphere(knee[0], knee[1], knee[2], 0.16, 0.19, 0.17);
    limb(knee, ankle, 0.17, 0.09);
    sphere(ankle[0], -1.86, 0.13, 0.14, 0.12, 0.28, 2);
    circuit([
      [hip[0], hip[1], 0.24],
      [knee[0], knee[1], 0.26],
      [ankle[0], ankle[1], 0.1],
    ]);
  }
  const nodeGeometry = new THREE.BufferGeometry();
  nodeGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(nodes, 3),
  );
  const nodeMaterial = new THREE.PointsMaterial({
    color: gold,
    size: 0.065,
    map: texture,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  figure.add(new THREE.Points(nodeGeometry, nodeMaterial));
  const spine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(
      Array.from(
        { length: 20 },
        (_, i) => new THREE.Vector3(0, 0.3 + i * 0.074, 0.22),
      ),
    ),
    new THREE.LineBasicMaterial({
      color: gold,
      transparent: true,
      opacity: 0.6,
    }),
  );
  figure.add(spine);
  const heart = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.11, 1),
    new THREE.MeshBasicMaterial({ color: gold, wireframe: true }),
  );
  heart.position.set(-0.12, 1.24, 0.31);
  figure.add(heart);
  return { figure, wire, nodeMaterial, heart, skin, circuitMaterial };
}
