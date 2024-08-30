import { useState } from 'react';

function App() {
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState("");

  function insertCard() {
    fetch('http://localhost:3000/api/insert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, image: "https://via.placeholder.com/150" })
    })
  }

  function searchCards() {
    fetch(`http://localhost:3000/api/select?name=${name}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(console.log)
  }

  return (
    <>
      <div className="card">
        <input type="text" placeholder='Pessoas' value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" placeholder='Desc' value={description} onChange={(e) => setDescription(e.target.value)}/>
        <input type="text" placeholder='url' value={image} onChange={(e) => setImage(e.target.value)}/>
        <button onClick={insertCard}>Inserir Carta</button>
        <button onClick={searchCards}>Pesquisar</button>
      </div>
    </>
  )
}

export default App;
