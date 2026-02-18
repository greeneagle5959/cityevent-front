

import Header from './components/header/header.jsx';
import Headersimple from './components/header/headersimple.jsx';
import Navbar from './components/navbar/navbar.jsx';
import Footer from './components/footer/footer.jsx';
import ModernCarousel from './components/carrousel/ModernCarousel.jsx';
import Event from './components/evenements/evenements.jsx';
import Apropos from './components/apropos/apropos.jsx';
import Connexion from './components/connexion/connexion.jsx';
import Inscription from './components/inscription/inscription.jsx';
import BarreRecherche from './components/barrecherche/barrecherche.jsx';



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
      <Event />
      
      <Footer />
    </>
  );
}

export default App;
