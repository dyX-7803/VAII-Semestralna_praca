import React, { useState } from 'react';
import axios from 'axios';

const AddItemForm = () => {

    const [nazov, setNazov] = useState('');
    const [popis, setPopis] = useState('');
    const [cena, setCena] = useState('');
    const [pocet_ks, setPocetKs] = useState('');

    const handleNazovChange = (e) => setNazov(e.target.value);
    const handlePopisChange = (e) => setPopis(e.target.value);
    const handleCenaChange = (e) => setCena(e.target.value);
    const handlePocetKsChange = (e) => setPocetKs(e.target.value);

    const handleSubmit = async () => {
        const data = {
            nazov: nazov,
            popis: popis,
            cena: cena,
            pocet_ks: pocet_ks,
        };

        try {
            await axios.post('/api/polozka', data);
        } catch (error) {
            console.error('Chyba pri pridávaní položky:', error);
            alert('Niečo sa pokazilo!');
        }
    }

    return (
        <div>
            <div class="mb-3 m-4">
                <label for="Nazov" class="form-label">Názov</label>
                <input type="text" class="form-control" id="Nazov" value={nazov} onChange={handleNazovChange} required/>
            </div>
            <div class="mb-3 m-4">
                <label for="Cena" class="form-label">Cena (€)</label>
                <input type="text" class="form-control" id="Cena" placeholder="9.99" value={cena} onChange={handleCenaChange} required/>
            </div>
            <div class="mb-3 m-4">
                <label for="Popis" class="form-label">Popis</label>
                <textarea class="form-control" id="Popis" rows="3" value={popis} onChange={handlePopisChange} required></textarea>
            </div>
            <div class="mb-3 m-4">
                <label for="PocetKs" class="form-label">Počet kusov</label>
                <input type="text" class="form-control" id="PocetKs" value={pocet_ks} onChange={handlePocetKsChange} required/>
            </div>
            
            <div class="mb-3 m-4">
                <label for="HlavnyObrazok" class="form-label">Hlavný obrázok</label>
                <input class="form-control" type="file" id="HlavnyObrazok"/>
            </div>
            
            <div class="mb-3 m-4">
                <label for="DalsieObrazky" class="form-label">Ďalšie obrázky</label>
                <input class="form-control" type="file" id="DalsieObrazky" multiple/>
            </div>

            <div class="mb-3 m-4">
            <button class="btn btn-primary" onClick={handleSubmit}>
                Pridať
            </button>
            <button class="btn btn-secondary">
                Zrušiť
            </button>
            </div>
        </div>
    )
};

export default AddItemForm;