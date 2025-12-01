import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Grid, Center, ContactShadows } from '@react-three/drei'
import { Suspense, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
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
  const [showStats, setShowStats] = useState(false)
  // Season data for Lewis Hamilton 2023
  const seasonData = {
    driver: 'Lewis Hamilton',
    team: 'Mercedes',
    achievements: { wins: 0, podiums: 2, championships: 0 },
    performance: [
      { race: 'Bahrain', points: 10, position: 3 },
      { race: 'Saudi Arabia', points: 8, position: 4 },
      { race: 'Australia', points: 18, position: 2 },
      { race: 'Azerbaijan', points: 15, position: 3 },
      { race: 'Miami', points: 12, position: 4 },
      { race: 'Monaco', points: 4, position: 7 },
      { race: 'Spain', points: 25, position: 1 },
      { race: 'Canada', points: 18, position: 2 },
      { race: 'Austria', points: 15, position: 3 },
      { race: 'Britain', points: 10, position: 5 },
      { race: 'Hungary', points: 12, position: 4 },
      { race: 'Belgium', points: 6, position: 6 }
    ]
  }

  // Keyboard listener for stats toggle
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 's' || e.key === 'S') {
        setShowStats(!showStats)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showStats])

  const currentSeasonData = seasonData

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

        <button
          onClick={() => setShowStats(!showStats)}
          className="stats-button"
          tabIndex={0}
        >
          STATS
        </button>
      </div>

      {/* Advanced Stats Dashboard */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            className="stats-sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
          >
            <div className="stats-content">
              <motion.div
                className="stats-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2>F1 PERFORMANCE ANALYTICS</h2>
                <p>Real-time telemetry and specifications</p>

                <div className="season-info">
                  <h4>{currentSeasonData.driver} - {currentSeasonData.team}</h4>
                  <p>Season 2023 Performance Data</p>
                </div>
              </motion.div>

              {/* Performance Metrics Chart */}
              <motion.div
                className="chart-section"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3>Performance Metrics</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[
                    { name: 'Top Speed', value: 350, max: 400 },
                    { name: 'Acceleration', value: 2.0, max: 3.0 },
                    { name: 'Horsepower', value: 1000, max: 1100 },
                    { name: 'Weight', value: 798, max: 850 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,204,0.2)" />
                    <XAxis dataKey="name" stroke="#00ffcc" fontSize={12} />
                    <YAxis stroke="#00ffcc" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(0,0,0,0.9)',
                        border: '1px solid #00ffcc',
                        borderRadius: '8px',
                        color: '#00ffcc'
                      }}
                    />
                    <Bar dataKey="value" fill="#00ffcc" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Engine Specifications Radar */}
              <motion.div
                className="chart-section"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3>Engine Characteristics</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={[
                    { subject: 'Power', A: 100, fullMark: 100 },
                    { subject: 'Efficiency', A: 85, fullMark: 100 },
                    { subject: 'Torque', A: 95, fullMark: 100 },
                    { subject: 'Reliability', A: 90, fullMark: 100 },
                    { subject: 'Weight', A: 75, fullMark: 100 },
                    { subject: 'Tech Level', A: 98, fullMark: 100 }
                  ]}>
                    <PolarGrid stroke="rgba(0,255,204,0.2)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#00ffcc', fontSize: 11 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#00ffcc', fontSize: 10 }} />
                    <Radar name="Engine" dataKey="A" stroke="#00ffcc" fill="#00ffcc" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Historical Performance Line */}
              <motion.div
                className="chart-section"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3>Season Performance Trend</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={currentSeasonData.performance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,204,0.2)" />
                    <XAxis dataKey="race" stroke="#00ffcc" fontSize={10} />
                    <YAxis stroke="#00ffcc" fontSize={10} />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(0,0,0,0.9)',
                        border: '1px solid #00ffcc',
                        borderRadius: '8px',
                        color: '#00ffcc'
                      }}
                    />
                    <Line type="monotone" dataKey="points" stroke="#00ffcc" strokeWidth={3} dot={{ fill: '#00ffcc', strokeWidth: 2, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Key Stats Cards */}
              <motion.div
                className="stats-cards"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                {[
                  { value: "0", label: "Race Wins", icon: "🏆" },
                  { value: "0", label: "Championships", icon: "👑" },
                  { value: "350+", label: "Top Speed (km/h)", icon: "⚡" },
                  { value: "1000+", label: "Peak HP", icon: "💪" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="stat-card-compact"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + (index * 0.1) }}
                  >
                    <div className="card-icon">{stat.icon}</div>
                    <div className="card-value">{stat.value}</div>
                    <div className="card-label">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    

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
