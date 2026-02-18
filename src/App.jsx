

import Header from './components/header/header.jsx';
import Headersimple from './components/header/headersimple.jsx';
import Navbar from './components/navbar/navbar.jsx';
import Footer from './components/footer/footer.jsx';
import ModernCarousel from './components/carrousel/ModernCarousel.jsx';

import BarreRecherche from './components/barrecherche/barrecherche.jsx';
import AfficheEvent from './components/evenements/afficheevent.jsx';



import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';








function App() {
  return (
    <>
      {(() => { const showSimpleHeader = false; return showSimpleHeader ? (
        <Headersimple />
      ) : (
        <Header />
      ); })()}
      <Navbar /><br />
      <BarreRecherche /><br />
      <ModernCarousel /><br />

      <AfficheEvent />
      <Footer />
    </>
  );
}

export default App;
