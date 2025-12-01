import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Grid, Center, ContactShadows } from '@react-three/drei'
import { Suspense, useState, useRef } from 'react'
import F1 from './F1'

function DynamicGrid({ rolling, ...props }) {
  const gridRef = useRef(null)
  useFrame((_, delta) => {
    if (!gridRef.current || !rolling) return
    const material = gridRef.current.material
    if (material && material.uniforms && material.uniforms.uTime) {
      material.uniforms.uTime.value += delta * 10
    } else {
      gridRef.current.position.z = (gridRef.current.position.z - delta * 5) % 1
    }
  })
  return <Grid ref={gridRef} {...props} />
}

export default function App() {
  const [exploded, setExploded] = useState(false)

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#15151a' }}>
      {/* The UI Overlay */}
      <div className="ui-overlay">
        <button
          onClick={() => setExploded(!exploded)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExploded(!exploded) }}
          className="explode-button"
          tabIndex={0}
        >
          {exploded ? "ASSEMBLE" : "DISASSEMBLE"}
        </button>
      </div>

    

      <Canvas camera={{ position: [5, 4, 6], fov: 50 }}>
        {/* 1. Atmosphere */}
        <color attach="background" args={['#15151a']} />
        <fog attach="fog" args={['#15151a', 10, 25]} />

        {/* 2. Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Environment preset="city" /> 

        {/* 3. Grid (With pointerEvents="none" so you can click the car!) */}
        <DynamicGrid 
          rolling={!exploded}
          pointerEvents="none"
          position={[0, -0.66, 0]} 
          args={[30, 30]} 
          cellColor="#2a2a35" 
          sectionColor="#00ffcc" 
          sectionThickness={1.2} 
          cellThickness={0.6} 
          fadeDistance={25} 
          fadeStrength={1.5}
          infiniteGrid 
        />

        <Suspense fallback={null}>
            <Center>
              <F1 exploded={exploded} position={[0, -0.66, 0]} />
            </Center>
        </Suspense>
        
        <OrbitControls 
        autoRotate={!exploded} 
  autoRotateSpeed={1}  
          maxPolarAngle={Math.PI / 2 - 0.05} 
          minDistance={2} 
          maxDistance={12} 
        />
      </Canvas>
    </div>
  )
}
