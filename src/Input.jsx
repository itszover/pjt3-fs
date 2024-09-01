import React, { useState } from 'react';
import DOMPurify from 'dompurify';

function Input({ onInsertCard }) {
    let [name, setName] = useState("");
    let [description, setDescription] = useState("");
    let [image, setImage] = useState("");

    function handleInsertCard() {
        onInsertCard({
            name: DOMPurify.sanitize(name),
            description: DOMPurify.sanitize(description),
            image: DOMPurify.sanitize(image)
        });
        setName("");
        setDescription("");
        setImage("");
    };

    return (
        <div className="card-input">
            <label htmlFor="">Nome</label>
            <input
                type="text"
                placeholder="Pessoas"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="">Descrição</label>
            <input
                type="text"
                placeholder="Desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="">URL da imagem</label>
            <input
                type="text"
                placeholder="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <button onClick={handleInsertCard}>Inserir Carta</button>
        </div>
    );
}

export default Input;