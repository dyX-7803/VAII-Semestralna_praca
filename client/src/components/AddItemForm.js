import React, { useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AddItemForm = () => {

        const navigate = useNavigate();
        const handleTitle = (text) => {
            document.title = text;
        };
    
        const [nazov, setNazov] = useState('');
        const [popis, setPopis] = useState('');
        const [cena, setCena] = useState('');
        const [pocet_ks, setPocetKs] = useState('');
        const [errors, setErrors] = useState({});

        const [selectedMainImage, setSelectedMainImage] = useState(null);
        const [selectedOtherImages, setSelectedOtherImages] = useState([]);

        const handleNazovChange = (e) => setNazov(e.target.value);
        const handlePopisChange = (e) => setPopis(e.target.value);
        const handleCenaChange = (e) => setCena(e.target.value);
        const handlePocetKsChange = (e) => setPocetKs(e.target.value);

        const handleImageChange = (e) => {
            const validImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
            if (!validImageTypes.includes(e.target.files[0].type)) {
                e.target.value = '';
                setSelectedMainImage(null);
                alert('Obrázok musí byť type png/jpg/jpeg!');
                return;
            }

            setSelectedMainImage(e.target.files[0]);
        };

        const handleOtherImagesChange = (e) => {
            const newImages = Array.from(e.target.files);
            setSelectedOtherImages((prevImages) => [...prevImages, ...newImages]);
        };

        const handleRemoveOtherImage = (index) => {
            setSelectedOtherImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
        };

        const validate = () => {
            const errors = {};

            if (!nazov.trim())
            {
                errors.nazov = "Názov nesmie byť prázdny!";
            }
            if (!cena || isNaN(Number(cena)))
            {
                errors.cena = "Cena musí byť číslo!";
            } else if (Number(cena) <= 0) 
            {
                errors.cena = "Cena musí byť väčšia ako 0!";
            }
            if (!pocet_ks || !Number.isInteger(Number(pocet_ks))) {
                errors.pocetKs = "Počet kusov musí byť celé číslo!";
            } else if (Number(pocet_ks) < 0) {
                errors.pocetKs = "Počet kusov musí byť 0 alebo viac!";
            }

            if (!selectedMainImage)
            {
                errors.mainImage = "Hlavný obrázok musí byť zvolený!"
            }

            return errors;
        };

        const handleSubmit = async () => {
            const validationErr = validate();
            if (Object.keys(validationErr).length > 0)
            {
                setErrors(validationErr);
                return;
            }

            setErrors({});
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


              navigate('/katalog');
        };




     return (
        <div>
            <div class="mb-3 m-4">
                <label for="Nazov" class="form-label">Názov</label>
                <input type="text" className={`form-control ${errors.nazov ? 'input-error' : ''}`} id="Nazov" value={nazov} onChange={handleNazovChange} required/>
                {errors.nazov && <p className='error'>{errors.nazov}</p>}
            </div>
            <div class="mb-3 m-4">
                <label for="Cena" class="form-label">Cena (€)</label>
                <input type="text" className={`form-control ${errors.cena ? 'input-error' : ''}`} id="Cena" placeholder="9.99" value={cena} onChange={handleCenaChange} required/>
                {errors.cena && <p className='error'>{errors.cena}</p>}
            </div>
            <div class="mb-3 m-4">
                <label for="Popis" class="form-label">Popis</label>
                <textarea class="form-control" id="Popis" rows="3" value={popis} onChange={handlePopisChange} required></textarea>
            </div>
            <div class="mb-3 m-4">
                <label for="PocetKs" class="form-label">Počet kusov</label>
                <input type="text" className={`form-control ${errors.pocetKs ? 'input-error' : ''}`} id="PocetKs" value={pocet_ks} onChange={handlePocetKsChange} required/>
                {errors.pocetKs && <p className='error'>{errors.pocetKs}</p>}
            </div>
            
            <div class="mb-3 m-4">
                <label for="HlavnyObrazok" class="form-label">Hlavný obrázok</label>
                <input className={`form-control ${errors.mainImage ? 'input-error' : ''}`} type="file" id="HlavnyObrazok" onChange={handleImageChange} required/>
                {errors.mainImage && <p className='error'>{errors.mainImage}</p>}
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
                <Link className='no-decoration-text' onClick={() => handleTitle('WearWave | Katalóg')}>
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