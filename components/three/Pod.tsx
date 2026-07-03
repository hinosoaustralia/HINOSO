"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group } from "three";
import type { MotionValue } from "framer-motion";

/** A prop that may be a static number or a live framer-motion value. */
type NumberLike = number | MotionValue<number>;
const read = (v: NumberLike | undefined, fallback = 0): number =>
  v === undefined ? fallback : typeof v === "number" ? v : v.get();

/**
 * The HINOSO pod, modelled as a nested stack of precision layers.
 * When `explode` → 0 the layers compress into one cohesive lens-shaped pod;
 * as `explode` → 1 they fan apart along Y to reveal the internal architecture.
 *
 * The component lerps its own `explode` toward `explodeTarget` every frame so
 * scroll-driven changes feel weighty rather than snappy.
 */

// Glossy piano-black product palette (matches the real HINOSO pod).
// Everything reads as dark, wet-look black with quiet sage tech accents.
const COL = {
  shell: "#0C0C0C", // glossy black silicone shell
  heater: "#171717", // graphene — matte near-black
  battery: "#2C2C2C", // dark brushed metal
  pcb: "#161A15", // dark board with a faint sage cast
  magnet: "#3E3E3E", // dark nickel
  electrode: "#101010", // black contacts
  sage: "#9CAE95", // status-LED sage (slightly lifted so it reads on black)
};

type Layer = {
  id: number; // maps to POD_LAYERS index for label sync
  y: number; // assembled Y position
  dir: number; // explode direction/magnitude along Y
};

// Assembled top→bottom, tightly nested so the pod reads as one cohesive lens.
// Radii taper around the battery (widest) to form a smooth pebble profile.
const LAYERS: Record<string, Layer> = {
  heater: { id: 1, y: 0.15, dir: 1.7 },
  battery: { id: 2, y: 0.05, dir: 0.8 },
  pcb: { id: 3, y: -0.03, dir: -0.1 },
  magnets: { id: 4, y: -0.12, dir: -0.9 },
  electrodes: { id: 5, y: -0.21, dir: -1.8 },
};

// Assembled resting Y for the two silicone shell caps.
const TOP_CAP_Y = 0.175;
const BOTTOM_CAP_Y = -0.235;

export default function Pod({
  explodeTarget = 0,
  tilt = 0,
  autoRotate = true,
  pointer = true,
}: {
  explodeTarget?: NumberLike;
  tilt?: NumberLike;
  autoRotate?: boolean;
  pointer?: boolean;
}) {
  const group = useRef<Group>(null);
  const explode = useRef(0);
  const topCap = useRef<Group>(null);
  const bottomCap = useRef<Group>(null);
  const layerRefs = useRef<Record<string, Group | null>>({});

  useFrame((state, delta) => {
    // Ease the current explode value toward its (possibly live) target.
    explode.current = MathUtils.damp(
      explode.current,
      read(explodeTarget),
      4,
      delta
    );
    const e = explode.current;

    // Spread each internal layer along Y.
    for (const [key, layer] of Object.entries(LAYERS)) {
      const ref = layerRefs.current[key];
      if (ref) ref.position.y = layer.y + layer.dir * 0.42 * e;
    }
    // Shell caps split apart.
    if (topCap.current) topCap.current.position.y = TOP_CAP_Y + 0.42 * e;
    if (bottomCap.current)
      bottomCap.current.position.y = BOTTOM_CAP_Y - 0.42 * e;

    if (!group.current) return;

    // Continuous slow rotation + gentle float.
    if (autoRotate) group.current.rotation.y += delta * 0.35;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.6) * 0.04;

    // Scroll tilt + subtle pointer parallax.
    const targetX = read(tilt) + (pointer ? state.pointer.y * 0.12 : 0);
    const targetZ = pointer ? -state.pointer.x * 0.06 : 0;
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      targetX,
      3,
      delta
    );
    group.current.rotation.z = MathUtils.damp(
      group.current.rotation.z,
      targetZ,
      3,
      delta
    );
  });

  return (
    // Elongated + flattened → the glossy oval "lozenge" silhouette of the real pod.
    <group ref={group} scale={[1.85, 0.78, 1.28]}>
      {/* ---- Glossy black shell — top cap ---- */}
      <group ref={topCap} position={[0, TOP_CAP_Y, 0]}>
        <mesh castShadow scale={[1, 0.5, 1]}>
          <sphereGeometry args={[0.8, 96, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial
            color={COL.shell}
            roughness={0.14}
            clearcoat={1}
            clearcoatRoughness={0.08}
            metalness={0}
            reflectivity={0.6}
            sheen={0.3}
            sheenColor={COL.sage}
            envMapIntensity={1.3}
          />
        </mesh>
        {/* subtle raised crown element + sage status LED */}
        <mesh position={[0, 0.16, 0]} scale={[1, 0.4, 0.7]}>
          <sphereGeometry args={[0.22, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial color={COL.shell} roughness={0.12} clearcoat={1} clearcoatRoughness={0.1} />
        </mesh>
        <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.035, 0.06, 48]} />
          <meshStandardMaterial
            color={COL.sage}
            emissive={COL.sage}
            emissiveIntensity={1.1}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* ---- Graphene heater ---- */}
      <group ref={(el) => { layerRefs.current.heater = el; }} position={[0, LAYERS.heater.y, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.82, 0.82, 0.05, 64]} />
          <meshStandardMaterial color={COL.heater} roughness={0.42} metalness={0.25} />
        </mesh>
        {/* concentric heater trace */}
        <mesh position={[0, 0.027, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.34, 64]} />
          <meshStandardMaterial color={COL.sage} emissive={COL.sage} emissiveIntensity={0.35} roughness={0.5} />
        </mesh>
      </group>

      {/* ---- Battery ---- */}
      <group ref={(el) => { layerRefs.current.battery = el; }} position={[0, LAYERS.battery.y, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.9, 0.9, 0.13, 64]} />
          <meshStandardMaterial color={COL.battery} roughness={0.35} metalness={0.65} />
        </mesh>
      </group>

      {/* ---- PCB ---- */}
      <group ref={(el) => { layerRefs.current.pcb = el; }} position={[0, LAYERS.pcb.y, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.88, 0.88, 0.04, 64]} />
          <meshStandardMaterial color={COL.pcb} roughness={0.6} metalness={0.2} />
        </mesh>
        {/* a few sage "components" */}
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.5, 0.03, Math.sin(a) * 0.5]}>
              <boxGeometry args={[0.09, 0.02, 0.09]} />
              <meshStandardMaterial color={COL.sage} emissive={COL.sage} emissiveIntensity={0.25} />
            </mesh>
          );
        })}
      </group>

      {/* ---- Magnets ---- */}
      <group ref={(el) => { layerRefs.current.magnets = el; }} position={[0, LAYERS.magnets.y, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.86, 0.86, 0.05, 64]} />
          <meshStandardMaterial color={COL.pcb} roughness={0.55} metalness={0.3} />
        </mesh>
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.6, 0, Math.sin(a) * 0.6]}>
              <cylinderGeometry args={[0.11, 0.11, 0.07, 32]} />
              <meshStandardMaterial color={COL.magnet} roughness={0.25} metalness={0.9} />
            </mesh>
          );
        })}
      </group>

      {/* ---- Electrodes ---- */}
      <group ref={(el) => { layerRefs.current.electrodes = el; }} position={[0, LAYERS.electrodes.y, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.8, 0.8, 0.05, 64]} />
          <meshStandardMaterial color={COL.electrode} roughness={0.5} metalness={0.3} />
        </mesh>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.5, -0.03, Math.sin(a) * 0.5]}>
              <cylinderGeometry args={[0.08, 0.08, 0.02, 24]} />
              <meshStandardMaterial color={COL.magnet} roughness={0.3} metalness={0.7} />
            </mesh>
          );
        })}
      </group>

      {/* ---- Glossy black shell — bottom cap ---- */}
      <group ref={bottomCap} position={[0, BOTTOM_CAP_Y, 0]}>
        <mesh receiveShadow scale={[1, 0.5, 1]} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.82, 96, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial
            color={COL.shell}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0}
            reflectivity={0.6}
            envMapIntensity={1.2}
          />
        </mesh>
      </group>
    </group>
  );
}
