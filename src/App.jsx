


import Header from './components/header/header.jsx';
import Navbar from './components/navbar/navbar.jsx';
import Carousel from './components/carousel/carousel.jsx';
import AfficheEvent from './components/evenements/afficheevent.jsx';
import Footer from './components/footer/footer.jsx';
// import ModernCarousel from './components/Carousel/ModernCarousel';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'



function App() {
  return (
    <>
      <Header />
      <Navbar />

      <Carousel />
      <AfficheEvent />
      {/* <ModernCarousel /> */}
      <Footer />

    </>
  );
}

export default App
