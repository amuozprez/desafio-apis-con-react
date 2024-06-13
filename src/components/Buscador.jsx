import React from 'react';

function Buscador({ setSearchTerm }) {
  return (
    <div className='busqueda'>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default Buscador;
