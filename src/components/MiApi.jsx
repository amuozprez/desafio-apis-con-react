import React, { useEffect, useState } from 'react';

function MiApi({ searchTerm }) {
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('dolar');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'codigo', direction: 'ascending' });

  useEffect(() => {
    fetch('https://mindicador.cl/api')
      .then(response => response.json())
      .then(data => {
        const dataArray = Object.keys(data).map(key => data[key]);
        setData(dataArray);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleConvert = () => {
    const currency = data.find(item => item.codigo === selectedCurrency);
    if (currency) {
      setConvertedAmount(amount / currency.valor);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data]
    .filter(item => item.codigo && item.nombre && item.unidad_medida && item.valor)
    .filter(item => item.codigo.includes(searchTerm) || item.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        return <i className="fas fa-arrow-up"></i>;
      } else {
        return <i className="fas fa-arrow-down"></i>;
      }
    }
    return <i className="fas fa-sort"></i>;
  };

  return (
    <div>
      <div className='conversor'>
        <input
            type="number"
            placeholder="Monto en pesos chilenos"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
        />
        <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
        >
            {data.filter(item => item.codigo && item.nombre && item.unidad_medida && item.valor).map((item) => (
            <option key={item.codigo} value={item.codigo}>
                {item.nombre}
            </option>
            ))}
        </select>
        <button onClick={handleConvert}>Convertir</button>
        {convertedAmount && (
            <p>{amount} CLP son {convertedAmount.toFixed(2)} {data.find(item => item.codigo === selectedCurrency).nombre}</p>
        )}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort('codigo')}>
              Código {getSortIcon('codigo')}
            </th>
            <th onClick={() => handleSort('nombre')}>
              Nombre {getSortIcon('nombre')}
            </th>
            <th onClick={() => handleSort('unidad_medida')}>
              Unidad de Medida {getSortIcon('unidad_medida')}
            </th>
            <th onClick={() => handleSort('valor')}>
              Valor {getSortIcon('valor')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.codigo}>
              <td>{item.codigo}</td>
              <td>{item.nombre}</td>
              <td>{item.unidad_medida}</td>
              <td>{item.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MiApi;
