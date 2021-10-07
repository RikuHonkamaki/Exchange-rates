import {useState} from 'react';

const URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=';
const API_KEY = 'de5338ca3ed3b7ecda39f60048a7a0e4'

function App() {
  const [eur,setEur] = useState(0);
  const [gbp,setGbp] = useState(0);
  const [rate,setRate] = useState(0);

  return (
    <div id="container">
      <h2>Exchange rates</h2>
      <form onSubmit={convert}>
        <div>
          <label>Eur</label>&nbsp;
          <input type="number" step="0.01" 
          value={eur} onChange={e => setEur(e.target.value)} ></input>
          <output>{rate}</output>
        </div>
        <div>
          <label>Gbp</label>
          <output>{gbp.toFixed(2)} £</output>
        </div>
        <div>
          <button>Calculate</button>
        </div>
      </form>
    </div>
  );


async function convert(e) {
  e.preventDefault();
  try {
    const address = URL + API_KEY;
    const response = await fetch(address);

    if (response.ok) {
      const json = await response.json();
      console.log(json.rates.GBP);
      setRate(json.rates.GBP);

      setGbp(eur * json.rates.GBP);
    } else {
      alert('Error retvieving exchange rate.');
      console.log(response);
    }
  } catch(err) {
    alert(err);
  }
}
}

export default App;


