import React, { useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddItemForm = () => {

        const handleTitle = (text) => {
            document.title = text;
        };
    
        const [nazov, setNazov] = useState('');
        const [popis, setPopis] = useState('');
        const [cena, setCena] = useState('');
        const [pocet_ks, setPocetKs] = useState('');

        const [selectedMainImage, setSelectedMainImage] = useState(null);
        const [selectedOtherImages, setSelectedOtherImages] = useState([]);

        const handleNazovChange = (e) => setNazov(e.target.value);
        const handlePopisChange = (e) => setPopis(e.target.value);
        const handleCenaChange = (e) => setCena(e.target.value);
        const handlePocetKsChange = (e) => setPocetKs(e.target.value);

        const handleImageChange = (e) => {
            setSelectedMainImage(e.target.files[0]);
        };

        const handleOtherImagesChange = (e) => {
            const newImages = Array.from(e.target.files);
            //setSelectedOtherImages(e.target.files);
            setSelectedOtherImages((prevImages) => [...prevImages, ...newImages]);
        };

        const handleRemoveOtherImage = (index) => {
            setSelectedOtherImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
        };

        const handleSubmit = async () => {
            const data = {
                nazov: nazov,
                popis: popis,
                cena: cena,
                pocet_ks: pocet_ks,
            };

            try {
                await axios.post('/api/polozka/add', data);
            } catch (error) {
                console.error('Chyba pri pridávaní položky:', error);
                alert('Niečo sa pokazilo!');
            }


            const formData = new FormData();
            formData.append('image', selectedMainImage);

            try {
                await axios.post('/api/obrazky/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data'},
                });
            } catch (error) {
                console.error('Chyba pri pridávaní obrázka.', error);
                alert('Nepodarilo sa nahrať obrázok.');
            }


            try {
                  const uploadPromises = Array.from(selectedOtherImages).map(async (image) => {
                  const formData = new FormData();
                  formData.append('image', image);
          
                  await axios.post('/api/obrazky/upload', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  });
                });
          
                await Promise.all(uploadPromises);
              } catch (error) {
                console.error('Chyba pri pridávaní obrázkov.', error);
                alert('Nepodarilo sa nahrať obrázky.');
              }

        };




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
                <input class="form-control" type="file" id="HlavnyObrazok" onChange={handleImageChange} required/>
            </div>
            
            <div class="mb-3 m-4">
                <label class="form-label">Ďalšie obrázky</label>
                <input class="form-control" type="file" id="DalsieObrazky" multiple onChange={handleOtherImagesChange} style={{ display: 'none' }}/>
                <label
                    className="row m-1"
                    htmlFor="DalsieObrazky"
                    style={{
                    cursor: 'pointer',
                    padding: '10px',
                    background: 'gray',
                    color: 'white',
                    borderRadius: '5px',
                    }}
                >
                    Vybrať súbory
                </label>
                <div>
                    {selectedOtherImages.map((image, index) => (
                    <div key={index} style={{ marginTop: '10px' }}>
                        <span>{image.name}</span>
                        <button className='btn btn-danger' onClick={() => handleRemoveOtherImage(index)} style={{ marginLeft: '10px' }}>
                            Odstrániť
                        </button>
                    </div>
                    ))}
                </div>
            </div>

            <div class="mb-3 m-4">
                <Link to='/katalog' className='no-decoration-text' onClick={() => handleTitle('WearWave | Katalóg')}>
                    <button class="btn btn-primary" onClick={handleSubmit}>
                        Pridať
                    </button>
                </Link>
            <button class="btn btn-secondary">
                Zrušiť
            </button>
            </div>
        </div>
    )
};

export default AddItemForm;