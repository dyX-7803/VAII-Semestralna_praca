import React, { useState} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


const EditItemForm = () => {
    const { id, nazov, popis, cena, pocet_ks} = useParams();
    const handleNazovChange = (e) => {nazov = e.target.value};
    const handlePopisChange = (e) => {popis = e.target.value};
    const handleCenaChange = (e) => {cena = e.target.value};
    const handlePocetKsChange = (e) => {pocet_ks = e.target.value};

    const [mainImage, setMainImage] = useState(null);
    const [otherImages, setOtherImages] = useState([]);

    const handleMainImage = (e) => {
        setMainImage(e.target.files[0]);
    };

    const handleOtherImages = (e) => {
        setOtherImages(e.target.files);
    };

    const [isMainImageChanged, setIsMainImageChanged] = useState(false);
    const [areOtherImagesChanged, setAreOtherImagesChanged] = useState(false);

    




    return(
        <div>
            <div class="mb-3 m-4">
                <label for="Nazov" class="form-label">Názov</label>
                <input type="text" class="form-control" id="Nazov" value={nazov} onChange={handleNazovChange} required/>
            </div>
            <div class="mb-3 m-4">
                <label for="Cena" class="form-label">Cena (€)</label>
                <input type="text" class="form-control" id="Cena" value={cena} onChange={handleCenaChange} required/>
            </div>
            <div class="mb-3 m-4">
                <label for="Popis" class="form-label">Popis</label>
                <textarea class="form-control" id="Popis" rows="3" value={popis} onChange={handlePopisChange} required></textarea>
            </div>
            <div class="mb-3 m-4">
                <label for="PocetKs" class="form-label">Počet kusov</label>
                <input type="text" class="form-control" value={pocet_ks} id="PocetKs" onChange={handlePocetKsChange} required/>
            </div>
            
            <div class="mb-3 m-4">
                <label for="HlavnyObrazok" class="form-label">Hlavný obrázok</label>
                <input class="form-control" type="file" id="HlavnyObrazok" required/>
            </div>
            
            <div class="mb-3 m-4">
                <label class="form-label">Ďalšie obrázky</label>
                <input class="form-control" type="file" id="DalsieObrazky" multiple style={{ display: 'none' }}/>
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
            </div>

            <div class="mb-3 m-4">
                <Link to='/katalog' className='no-decoration-text'>
                    <button class="btn btn-primary">
                        Pridať
                    </button>
                </Link>
            <button class="btn btn-secondary">
                Zrušiť
            </button>
            </div>
        </div>
    );
};



export default EditItemForm;