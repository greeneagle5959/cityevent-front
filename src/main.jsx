
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Connexion from "./components/connexion/connexion.jsx";
import Inscription from './components/inscription/inscription.jsx';
import AdminDashboard from './components/dashboard/adminDashboard.jsx';
import ModerateurDashboard from './components/dashboard/moderateurDashboard.jsx';
import UserDashboard from './components/dashboard/userDashboard.jsx';
import ProtectionDash from './components/dashboard/protectionDash.jsx';
import CreateEvenements from './components/createEvenements/createEvents.jsx';
import About from './components/about/about.jsx';
import AfficheEvents from './components/evenements/afficheevent.jsx';


createRoot(document.getElementById('root')).render(
    (
        <StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path='/connexion' element={<Connexion />} />
                    <Route path='/inscription' element={<Inscription />} />
                    <Route path="/headerSimple" element={<App />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/afficheevents" element={<AfficheEvents />} />
                    <Route path="/createEvenements" element={<ProtectionDash><CreateEvenements /></ProtectionDash>} />
                    <Route path="/adminDashboard" element={<ProtectionDash><AdminDashboard /></ProtectionDash>} />
                    <Route path="/moderatorDashboard" element={<ProtectionDash><ModerateurDashboard /></ProtectionDash>} />
                    <Route path="/userDashboard" element={<ProtectionDash> <UserDashboard /></ProtectionDash>} />
                </Routes>
            </BrowserRouter>
        </StrictMode>
    )
);
