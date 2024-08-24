import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  function fetchteste() {
    fetch('http://localhost:3000/api')
      .then((response) => response.text())
      .then((data) => console.log(data));
  }

  return (
    <>
      <div className="card">
        <button onClick={fetchteste}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App;
