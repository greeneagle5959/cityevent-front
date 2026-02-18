
import Header from './components/header/header.jsx'
import Navbar from './components/navbar/navbar.jsx'
import Footer from './components/footer/footer.jsx'
import ModernCarousel from './components/Carousel/ModernCarousel'



import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'





function App() {
  return (
    <>
      <Header />
      <Navbar />
      {/* Carousel d'événements */}
      <ModernCarousel />
      <Footer />
    </>
  );
}

export default App
