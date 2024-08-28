import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App=()=>{

  //  state variables
  
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState(1);
  const [conversionResult, setConversionResult] = useState(null);

  const API_KEY = 'fcfaabc95173c35f9354ba6f'; // API key
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

  // Fetch currencies on mount
  useEffect(() => {
    axios.get(`${API_URL}USD`)
      .then(response => {
        const currencyCodes = Object.keys(response.data.conversion_rates);
        setCurrencies(currencyCodes);
        setFromCurrency('USD');
        setToCurrency('EUR');
      })
      .catch(error => console.error('Error fetching currencies:', error));
  }, []);

  // Handle conversion
  const handleConvert = () => {
    if (fromCurrency && toCurrency) {
      axios.get(`${API_URL}${fromCurrency}`)
        .then(response => {
          const rate = response.data.conversion_rates[toCurrency];
          setConversionResult((amount * rate).toFixed(2));
        })
        .catch(error => console.error('Error converting currency:', error));
    }
  };

  return (
    <div className='Container'>
      <div className='Area'>
      <h2>CURRENCY CONVERTER</h2>
      <div className='From-To'>
      <div className='From'>
        <label>From:</label>
        <select id='select' value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
          {currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
        </select>
        </div>
        <div className='To'>
        <label>To:</label>
        <select id='select' value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
          {currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
        </select>
      </div>
      </div>
      <div className='Amount'>
        <label>Amount:</label>
        <input id='input' type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <button id='Btn' onClick={handleConvert}>Convert</button>
      {conversionResult && (
        <div className='Result'>
          <h3>Conversion Result:</h3>
          <p>{amount} {fromCurrency} = {conversionResult} {toCurrency}</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
