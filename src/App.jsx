
import Header from './components/header/header.jsx';
import Navbar from './components/navbar/navbar.jsx';
import Carousel from './components/carousel/carousel.jsx';
import AfficheEvent from './components/evenements/afficheevent.jsx';
import Hero from './components/Hero/Hero.jsx';
import Footer from './components/footer/footer.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';



import './App.css'



function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Hero />
      <Carousel />
      <AfficheEvent />
      <Footer />
    </>
  );
}

export default App
