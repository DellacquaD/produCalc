import { useState } from 'react'
import './App.css'
import Cronometro from './Cronometro'

function App() {
  const [count, setCount] = useState(0);
  const [hours, setHours] = useState(0);

  // Esta función se llama cada vez que el cronómetro actualiza el tiempo
  const handleTimeChange = (hours) => {
    setHours(hours);
  };

  return (
    <>
      <Cronometro onTimeChange={handleTimeChange} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button style={{ maxHeight: '40px' }} onClick={() => setCount((count) => count - 1)}>
            -
          </button>
          <div style={{ maxHeight: '40px', padding: '1rem' }}>{count}</div>
          <button style={{ maxHeight: '40px' }} onClick={() => setCount((count) => count + 1)}>
            +
          </button>
          <button onClick={() => setCount((count) => 0)}>↺</button>
        </div>
        <p>Cantidad de casos</p>
      </div>
      <div className="real-time-prdu">
        <p>Productividad: {hours > 0 ? (count / hours).toFixed(2) : "N/A"}</p>
      </div>
    </>
  );
}

export default App;
