import { useState, useEffect } from 'react'
import './App.css'
import Hero from './components/Hero/Hero.jsx';
import Jumbotrons from './components/Jumbotrons/eventCards.jsx';
import Carousel from './components/carousel/carousel';
import Footer from './components/footer/Footer.jsx';
import Evenements from './components/evenements/afficheevent.jsx';
import Header from './components/header/Header.jsx';
function App() {
 
  return ( <>
            <Header />
			<Hero />
			<Jumbotrons />
			<Carousel />
			<Evenements />
			<Footer />
    </>
  );
}

export default App;
