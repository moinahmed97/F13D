import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Grid, Center, ContactShadows } from '@react-three/drei'
import { Suspense, useState } from 'react'
import F1 from './F1'

export default function App() {
  const [exploded, setExploded] = useState(false)

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#15151a' }}>
      {/* The UI Overlay */}
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <button 
          onClick={() => setExploded(!exploded)}
          style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer', background: '#00ffcc', border: 'none', borderRadius: '4px' }}
        >
          {exploded ? "ASSEMBLE" : "DISASSEMBLE"}
        </button>
      </div>

      <Canvas camera={{ position: [5, 4, 6], fov: 45 }}>
        {/* 1. Atmosphere */}
        <color attach="background" args={['#15151a']} />
        <fog attach="fog" args={['#15151a', 10, 25]} />

        {/* 2. Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Environment preset="city" /> 

        {/* 3. Grid (With pointerEvents="none" so you can click the car!) */}
        <Grid 
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
          <Center top> 
             <F1 exploded={exploded} />
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