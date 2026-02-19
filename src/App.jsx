

import Header from './components/header/header.jsx';
import Navbar from './components/navbar/navbar.jsx';
import Carousel from './components/carousel/carousel.jsx';
import AfficheEvent from './components/evenements/afficheevent.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'



function App() {
  return (
    <>
      <Header />
      <Navbar />
  <Carousel />
  <AfficheEvent />
    </>
  );
}

export default App
