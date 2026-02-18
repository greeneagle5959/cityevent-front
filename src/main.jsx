
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Connexion from './components/connexion/connexion.jsx';
import InscrireUtilisateur from './components/inscription/inscription.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<InscrireUtilisateur />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
  
