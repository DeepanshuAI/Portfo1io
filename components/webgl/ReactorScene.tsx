"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Line, PresentationControls, Text, Html, Billboard, Points, PointMaterial, MeshTransmissionMaterial, Octahedron, Float } from "@react-three/drei";
import * as THREE from "three";
import { SKILL_LAYERS, type SkillLayer, type SkillNode } from "@/lib/site";

function toColor(triplet: string) {
  const [r, g, b] = triplet.split(" ").map(Number);
  return new THREE.Color(`rgb(${r}, ${g}, ${b})`);
}

function toHex(triplet: string) {
  const [r, g, b] = triplet.split(" ").map(Number);
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

type ActiveNode = {
  layer: SkillLayer;
  node: SkillNode;
  position: THREE.Vector3;
} | null;

function TechLabel({
  layer,
  node,
  angle,
  radius,
  onHover,
  onBlur,
}: {
  layer: SkillLayer;
  node: SkillNode;
  angle: number;
  radius: number;
  onHover: (p: THREE.Vector3) => void;
  onBlur: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<any>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const color = useMemo(() => toColor(layer.color), [layer.color]);
  const hexColor = useMemo(() => toHex(layer.color), [layer.color]);
  const [hovered, setHovered] = useState(false);

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const pos = useMemo(() => new THREE.Vector3(x, 0, z), [x, z]);

  useFrame((state) => {
    if (!groupRef.current || !textRef.current) return;
    
    // Add subtle vertical floating
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5 + angle) * 0.15;

    // Subtle scale on hover
    const targetScale = hovered ? 1.2 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
  });

  return (
    <group
      ref={groupRef}
      position={pos}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        const worldPos = new THREE.Vector3();
        groupRef.current?.getWorldPosition(worldPos);
        onHover(worldPos);
      }}
      onPointerOut={() => {
        setHovered(false);
        onBlur();
      }}
    >
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        
        {/* Glass Crystal Orb (Physical Node Representation) */}
        <Sphere ref={orbRef} args={[0.15, 32, 32]}>
          <meshPhysicalMaterial 
            transmission={1} 
            thickness={0.5} 
            roughness={0.1} 
            ior={1.5} 
            clearcoat={1} 
            color="#ffffff"
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.2}
          />
        </Sphere>

        {/* Glow effect when hovered (disabled raycast to prevent flickering) */}
        {hovered && (
          <Sphere args={[0.4, 16, 16]} position={[0, 0, -0.05]} raycast={() => null}>
            <meshBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
          </Sphere>
        )}
        
        <Text
          ref={textRef}
          position={[0.3, 0, 0]} // Shift text to the right of the orb
          fontSize={0.15}
          color={hovered ? "#ffffff" : color}
          anchorX="left"
          anchorY="middle"
          outlineWidth={hovered ? 0.015 : 0}
          outlineColor={color}
          fillOpacity={hovered ? 1 : 0.8}
        >
          {node.name}
        </Text>

        {/* Holographic Info Card */}
        {hovered && (
          <Html position={[0.5, 0.5, 0]} center zIndexRange={[100, 0]}>
            <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl p-5 w-80 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 pointer-events-none">
              <h4 className="text-2xl font-bold mb-1 tracking-tight" style={{ color: hexColor }}>
                {node.name}
              </h4>
              <div className="flex justify-between items-center mb-4">
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                  {node.category}
                </p>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                  {node.experience}
                </span>
              </div>
              <p className="text-sm text-gray-200 mb-5 leading-relaxed">
                {node.description}
              </p>
              
              <div className="mb-4">
                <strong className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Projects Used In</strong>
                <div className="flex flex-wrap gap-1.5">
                  {node.projects.map(p => (
                    <span key={p} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">{p}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <strong className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Key Capabilities</strong>
                <div className="flex flex-wrap gap-1.5">
                  {node.capabilities.map(c => (
                    <span key={c} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </Html>
        )}
      </Billboard>
    </group>
  );
}

function OrbitRing({ layer, radius, isActive }: { layer: SkillLayer; radius: number; isActive: boolean }) {
  const color = useMemo(() => toColor(layer.color), [layer.color]);
  
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={isActive ? 2 : 1}
      transparent
      opacity={isActive ? 0.5 : 0.15}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  );
}

function RingGroup({
  layer,
  radius,
  isActiveRing,
  index,
  setActiveNode,
  isPaused
}: {
  layer: SkillLayer;
  radius: number;
  isActiveRing: boolean;
  index: number;
  setActiveNode: (n: ActiveNode) => void;
  isPaused: boolean;
}) {
  const outerGroup = useRef<THREE.Group>(null);
  const innerGroup = useRef<THREE.Group>(null);
  
  const speed = useMemo(() => (index % 2 === 0 ? 1 : -1) * (0.015 + Math.random() * 0.01), [index]);

  const tilt = useMemo(() => {
    const tiltX = (Math.random() - 0.5) * 0.4;
    const tiltZ = (Math.random() - 0.5) * 0.4;
    return new THREE.Euler(tiltX, 0, tiltZ);
  }, []);

  useFrame(() => {
    if (!innerGroup.current || isPaused) return;
    innerGroup.current.rotation.y += speed * 0.1;
  });

  return (
    <group ref={outerGroup} rotation={tilt}>
      <group ref={innerGroup}>
        <OrbitRing layer={layer} radius={radius} isActive={isActiveRing} />
        
        {layer.nodes.map((node, i) => {
          const angle = (i / layer.nodes.length) * Math.PI * 2;
          return (
            <TechLabel
              key={node.name}
              layer={layer}
              node={node}
              angle={angle}
              radius={radius}
              onHover={(pos) => setActiveNode({ layer, node, position: pos })}
              onBlur={() => setActiveNode(null)}
            />
          );
        })}
      </group>
    </group>
  );
}

const noiseGLSL = `
// Ashima 3D Simplex Noise
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}
`;

const plasmaVertexShader = `
uniform float uTime;
uniform vec3 uMouse;
uniform float uHover;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
${noiseGLSL}
void main() {
  vUv = uv;
  vNormal = normal;
  
  float alignment = dot(normalize(position), normalize(uMouse));
  float magnetic = smoothstep(0.8, 1.0, alignment) * uHover;
  
  // Subtle magical breathing
  float pulse = snoise(position * 1.5 + uTime * 0.2) * 0.05;
  
  vec3 pos = position + normal * (pulse + magnetic * 0.3);
  vPosition = pos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const plasmaFragmentShader = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
${noiseGLSL}
void main() {
  vec3 baseColor = vec3(0.545, 0.361, 0.965); // Core: #8B5CF6
  vec3 coreColor = vec3(0.753, 0.518, 0.988); // Mid Glow: #C084FC
  vec3 edgeColor = vec3(1.000, 0.235, 0.675); // Highlights: #FF3CAC
  
  float noise = snoise(vPosition * 3.0 - uTime * 0.5);
  float noise2 = snoise(vPosition * 6.0 + uTime * 0.3);
  float combinedNoise = (noise + noise2) * 0.5;
  
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = dot(viewDirection, normalize(vNormal));
  fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
  float edgeGlow = pow(fresnel, 2.0);
  float intenseEdge = pow(fresnel, 4.0);
  
  vec3 color = mix(baseColor, coreColor, combinedNoise * 0.5 + 0.5);
  color = mix(color, edgeColor, edgeGlow);
  color += edgeColor * intenseEdge * 0.8;
  
  float pulse = smoothstep(0.8, 1.0, snoise(vPosition * 2.0 - uTime));
  color += coreColor * pulse * 0.3;
  
  float alpha = 0.6 + edgeGlow * 0.4;
  
  gl_FragColor = vec4(color, alpha);
}
`;

const membraneVertexShader = `
uniform float uTime;
uniform vec3 uMouse;
uniform float uHover;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoise;
${noiseGLSL}
void main() {
  vNormal = normal;
  vNoise = snoise(position * 1.5 + uTime * 0.3);
  
  float alignment = dot(normalize(position), normalize(uMouse));
  float magnetic = smoothstep(0.8, 1.0, alignment) * uHover;
  
  vec3 pos = position + normal * (vNoise * 0.08 + magnetic * 0.4); // Warp outward
  vPosition = pos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const membraneFragmentShader = `
varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoise;
void main() {
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = dot(viewDirection, normalize(vNormal));
  fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
  
  // Highlight only the peaks of the noise and the extreme edges
  float alpha = smoothstep(0.3, 0.8, vNoise) * 0.3 + pow(fresnel, 3.0) * 0.7;
  
  vec3 color = mix(vec3(0.545, 0.361, 0.965), vec3(1.000, 0.235, 0.675), fresnel);
  
  gl_FragColor = vec4(color, alpha);
}
`;

const sparkleVertexShader = `
uniform float uTime;
varying float vAlpha;
${noiseGLSL}
void main() {
  float angle = uTime * 0.08 + position.y * 1.5;
  mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  vec3 pos = position;
  pos.xz = rot * pos.xz;
  
  float wave = snoise(pos * 2.0 - uTime * 0.2);
  pos += normalize(pos) * wave * 0.15;
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  float waveAlpha = smoothstep(-0.2, 0.5, wave);
  float twinkle = (sin(uTime * 2.0 + pos.x * 20.0 + pos.y * 20.0) * 0.5 + 0.5);
  vAlpha = waveAlpha * twinkle;
  
  gl_PointSize = (1.5 + vAlpha * 1.5) * (10.0 / -mvPosition.z);
}
`;

const sparkleFragmentShader = `
varying float vAlpha;
void main() {
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  if (dist > 0.5) discard;
  float pAlpha = smoothstep(0.5, 0.0, dist);
  
  vec3 cWhite = vec3(1.0, 1.0, 1.0);
  vec3 cPink = vec3(1.0, 0.4, 0.8);
  vec3 color = mix(cPink, cWhite, vAlpha);
  
  gl_FragColor = vec4(color, pAlpha * vAlpha * 0.8);
}
`;

const haloVertexShader = `
uniform float uTime;
varying float vAlpha;
void main() {
  float angle = uTime * 0.02;
  mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  vec3 pos = position;
  pos.xz = rot * pos.xz;
  pos.y += sin(uTime * 0.1 + pos.x) * 0.2;
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  vAlpha = sin(uTime * 0.5 + pos.x * 5.0) * 0.5 + 0.5;
  gl_PointSize = (1.0 + vAlpha) * (10.0 / -mvPosition.z);
}
`;

function ParticleReactorCore() {
  const groupRef = useRef<THREE.Group>(null);
  const innerReactorRef = useRef<THREE.Mesh>(null);
  
  const targetHover = useRef(0);
  const currentHover = useRef(0);
  const targetMouse = useRef(new THREE.Vector3());
  const currentMouse = useRef(new THREE.Vector3());
  
  // Layer 2: Electric Sparks (Dense, swirling)
  const sparksCount = 10000;
  const sparksPositions = useMemo(() => {
    const pos = new Float32Array(sparksCount * 3);
    for (let i = 0; i < sparksCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.02 + Math.pow(Math.random(), 3.0) * 0.15; 
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [sparksCount]);

  // Layer 1: Particle Halo (Sparse, widespread)
  const haloCount = 2000;
  const haloPositions = useMemo(() => {
    const pos = new Float32Array(haloCount * 3);
    for (let i = 0; i < haloCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.3 + Math.random() * 1.5; 
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [haloCount]);

  const sharedUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uHover: { value: 0 },
    uMouse: { value: new THREE.Vector3() }
  }), []);

  useFrame((state, delta) => {
    currentHover.current = THREE.MathUtils.lerp(currentHover.current, targetHover.current, delta * 5);
    currentMouse.current.lerp(targetMouse.current, delta * 5);

    sharedUniforms.uTime.value = state.clock.elapsedTime;
    sharedUniforms.uHover.value = currentHover.current;
    sharedUniforms.uMouse.value.copy(currentMouse.current);
    
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
    
    if (innerReactorRef.current) {
      innerReactorRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      innerReactorRef.current.rotation.y = state.clock.elapsedTime * -0.15;
    }
  });

  const handlePointerMove = (e: any) => {
    if (groupRef.current && e.point) {
      const localPoint = groupRef.current.worldToLocal(e.point.clone());
      targetMouse.current.copy(localPoint);
      targetHover.current = 1.0;
    }
  };

  return (
    <group ref={groupRef}>
      {/* Invisible hit sphere for magnetic interaction */}
      <mesh onPointerMove={handlePointerMove} onPointerOver={handlePointerMove} onPointerOut={() => { targetHover.current = 0; }}>
        <sphereGeometry args={[1.3, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {/* 6. Core (Inner-most bright center) */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* 5. Inner Reactor (Structural wireframe) */}
      <mesh ref={innerReactorRef}>
        <icosahedronGeometry args={[0.75, 2]} />
        <meshBasicMaterial color="#FF3CAC" wireframe transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* 4. Plasma Layer (Turbulent glowing base sphere) */}
      <mesh>
        <sphereGeometry args={[1.0, 64, 64]} />
        <shaderMaterial
          vertexShader={plasmaVertexShader}
          fragmentShader={plasmaFragmentShader}
          uniforms={sharedUniforms}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Energy Membrane (Translucent, warped outer shell) */}
      <mesh>
        <sphereGeometry args={[1.05, 64, 64]} />
        <shaderMaterial
          vertexShader={membraneVertexShader}
          fragmentShader={membraneFragmentShader}
          uniforms={sharedUniforms}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Electric Sparks (Dense swirling particles) */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sparksPositions, 3]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={sparkleVertexShader}
          fragmentShader={sparkleFragmentShader}
          uniforms={sharedUniforms}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      {/* 1. Particle Halo (Sparse outer particles) */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[haloPositions, 3]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={haloVertexShader}
          fragmentShader={sparkleFragmentShader}
          uniforms={sharedUniforms}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      <pointLight color="#FF3CAC" intensity={3.0} distance={20} />
      <pointLight color="#8B5CF6" intensity={2.0} distance={10} />
    </group>
  );
}

export default function ReactorScene() {
  const [activeNode, setActiveNode] = useState<ActiveNode>(null);
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (group.current && !activeNode) {
      group.current.rotation.y += 0.0005;
    }
  });

  return (
    <>
      {/* Stronger ambient light to catch the glass crystal spheres */}
      <ambientLight intensity={0.5} color="#ffffff" />
      
      <PresentationControls
        global
        rotation={[0.3, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Infinity, Infinity]}
        cursor={true}
      >
        <group ref={group}>
          <ParticleReactorCore />

          {SKILL_LAYERS.map((layer, li) => {
            const radius = 2.5 + li * 1.0; 
            const isActiveRing = activeNode?.layer.key === layer.key;
            
            return (
              <RingGroup
                key={layer.key}
                layer={layer}
                radius={radius}
                isActiveRing={isActiveRing}
                index={li}
                setActiveNode={setActiveNode}
                isPaused={isActiveRing}
              />
            );
          })}
          
          {/* Connection beam to core on hover */}
          {activeNode && (
            <Line
              points={[new THREE.Vector3(0,0,0), activeNode.position]}
              color={toColor(activeNode.layer.color)}
              transparent
              opacity={0.8}
              lineWidth={3}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          )}
        </group>
      </PresentationControls>
    </>
  );
}
