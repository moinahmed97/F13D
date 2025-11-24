Interactive F1 Technical Showcase 🏎️

An interactive, physics-based 3D web application that simulates the mechanical assembly and technical specifications of a Mercedes-AMG Formula 1 car. This project demonstrates complex state management, 3D rendering optimization, and interactive UI integration within a modern React environment.

(Replace the link above with a screenshot of your exploded view once uploaded)

🚀 Live Demo

View the Live Application here

🛠️ Tech Stack

Frontend Framework: React.js (Vite)

3D Engine: React Three Fiber (R3F) & Three.js

Animation Physics: React Spring (for non-linear, physics-based transitions)

Helpers & UI: Drei (OrbitControls, Html overlays, Environment)

Styling: CSS Modules / Tailwind CSS

💡 Key Features

1. Physics-Based "Exploded View" Animation

Unlike linear CSS animations, this project uses react-spring to calculate the trajectory of over 50+ individual mesh groups.

The Challenge: Managing the kinematic hierarchy of complex assemblies (e.g., ensuring the brake discs stay attached to the hub while the tire flies off).

The Solution: Implemented a custom React hook to manage the exploded state boolean, triggering coordinated spring animations for the Front Wing, Rear Wing, Chassis, and Suspension simultaneously.

2. Interactive Scene Graph & Raycasting

Users can interact directly with the 3D model to retrieve technical data.

Implemented raycasting to detect clicks on specific 3D meshes.

Utilized drei/Html to map 3D coordinates (Vector3) to 2D screen space, allowing HTML tooltips to "stick" to moving 3D parts in real-time.

Dynamic Cursor Logic: The cursor state changes contextually based on hover events over interactive components.

3. High-Fidelity "Wind Tunnel" Environment

Designed a custom environment to simulate a professional engineering testing facility.

Procedural Grid: Infinite scrolling grid using shader materials to simulate speed and scale.

Atmospheric Fog: Used fog primitives to blend the floor seamlessly into the background color (#15151a), preventing visual clipping.

PBR Lighting: Configured Studio Lighting and Environment Maps (.hdr) to ensure realistic reflections on carbon fiber and metallic surfaces.

4. Performance Optimization

Suspense & Lazy Loading: The heavy GLTF model is wrapped in React Suspense to prevent the UI from blocking during asset loading.

Ref-Based Animation Loop: Used useFrame (the React equivalent of requestAnimationFrame) to handle continuous animations (like wheel spin and moving road) outside of the React render cycle, ensuring a stable 60 FPS.

📂 Project Structure

src/
├── App.jsx          # Main entry point, Canvas setup, Lights, and Fog
├── F1.jsx           # The primary 3D Model component. Contains:
│    ├── Mesh hierarchy
│    ├── Animation logic (Springs)
│    ├── Interaction handlers (Click/Hover)
│    └── The "Moving Road" logic
├── index.css        # Styling for the UI overlays and labels
└── assets/          # Static assets (GLB models)


🔧 Installation & Setup

Clone the repository:

git clone [https://github.com/YOUR_USERNAME/f1-3d-showcase.git](https://github.com/YOUR_USERNAME/f1-3d-showcase.git)


Install dependencies:

cd f1-3d-showcase
npm install


Run the development server:

npm run dev


Open http://localhost:5173 in your browser.

🤝 Contact

Moin Syed

LinkedIn

GitHub

This project was built for educational purposes to demonstrate proficiency in 3D Web Development.