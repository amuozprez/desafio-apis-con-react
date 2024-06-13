import React, { useState } from 'react';
import MiApi from './components/MiApi';
import Buscador from './components/Buscador';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container">
      <header>
        <h1>Conversor de Monedas</h1>
      </header>
      <MiApi searchTerm={searchTerm} />
      <Buscador setSearchTerm={setSearchTerm} />
      <Footer />
    </div>
  );
}

export default App;
