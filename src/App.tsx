import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three"; // eslint-disable-line

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TOPOLOGY from "vanta/dist/vanta.topology.min";

import "./App.scss";
import HomeView from "./views/home/HomeView";
import StreamerView from "./views/streamer/StreamerView";
import MainTemplate from "./templetes/MainTemplate";
import LandingPage from "./views/landing/LandingPage";

function App() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        TOPOLOGY({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x181e50,
          backgroundColor: 0x0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div className="App" ref={myRef}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<LandingPage />} />
          <Route
            path="/app/*"
            element={
              <MainTemplate>
                <Routes>
                  <Route path="/" element={<HomeView />} />
                  <Route path="/streamer/:id" element={<StreamerView />} />
                </Routes>
              </MainTemplate>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
