# 🏎️ F1 Performance Analytics Dashboard
*Interactive 3D F1 car visualization with real-time performance statistics*

<!-- Centered GIF preview -->
<div align="center">
  <img src="./preview.gif" alt="F1 Exploded View Animation" style="max-width:100%;height:auto;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,0.35);" />
</div>

---

## 🔗 Live Demo
**[View the Live Application](https://f13-d.vercel.app)**

---

## 🛠 Tech Stack
- **Frontend:** React (Vite)
- **3D:** React Three Fiber, Three.js
- **Animation:** React Spring
- **Helpers:** Drei (OrbitControls, Html, Environment)
- **Styling:** Tailwind CSS / CSS Modules

---

## 💡 Key Features
- **3D F1 Car Visualization**: Interactive Mercedes F1 car with explode/disassemble animation
- **Performance Analytics Dashboard**: Lewis Hamilton 2023 season statistics with interactive charts
- **Real-time Data Visualization**: Bar charts, radar charts, and line charts for performance metrics
- **Cyberpunk UI Theme**: Sleek, dark interface with smooth animations using Framer Motion
- **Keyboard Controls**: Press 'S' to toggle stats dashboard, intuitive navigation
- **Responsive 3D Environment**: Dynamic grid, lighting, and camera controls for immersive experience

---


## 📁 Project Structure
```
src/
├── App.jsx          # Main app component with 3D scene and stats dashboard
├── F1.jsx           # 3D F1 car model component
├── App.css          # Custom styles for the UI
├── index.css        # Global styles and cyberpunk theme
└── assets/          # Static assets
```

## 🚀 How to Use
- **3D Interaction**: Use mouse to rotate, zoom, and pan around the car
- **Explode/Assemble**: Click the DISASSEMBLE/ASSEMBLE button to toggle car parts
- **Stats Dashboard**: Press 'S' or click STATS to view performance analytics
- **Auto-Rotation**: Camera auto-rotates when car is assembled

## 🔧 Installation & Setup
```bash
# Clone the repository
git clone https://github.com/moinahmed97/F13D.git
cd F13D

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## 📊 Technologies Used
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

---

**Built by [Moin Syed](https://www.linkedin.com/in/moin-syed-cs/)**
