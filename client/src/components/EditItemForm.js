import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


const EditItemForm = () => {
    const { id, nazov, popis, cena, pocet_ks} = useParams();
    const baseUrl = 'http://localhost:5000/';
    const handleNazovChange = (e) => {nazov = e.target.value};
    const handlePopisChange = (e) => {popis = e.target.value};
    const handleCenaChange = (e) => {cena = e.target.value};
    const handlePocetKsChange = (e) => {pocet_ks = e.target.value};

    const [mainImage, setMainImage] = useState('');
    const [newMainImage, setNewMainImage] = useState(null);
    const [otherImages, setOtherImages] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [newOtherImages, setNewOtherImages] = useState([]);
    const [isMainImageChanged, setIsMainImageChanged] = useState(false);

    const handleSelectedIdsChange = (imageId) => {
        setSelectedIds((prev) => {
            if (prev.includes(imageId)) {
              return prev.filter(id => id !== imageId);
            } else {
              return [...prev, imageId];
            }
        });
    };

    const handleOtherImagesChange = (e) => {
        const newImages = Array.from(e.target.files);
        setNewOtherImages((prevImages) => [...prevImages, ...newImages]);
    };

    const handleRemoveOtherImage = (index) => {
        setNewOtherImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleNewMainImage = (e) => {
        setNewMainImage(e.target.files[0])
    }


    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`/api/obrazky/getAllImagesByItemId/${id}`);
                setMainImage(response.data[0]);
                response.data.shift();
                setOtherImages(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchItems(); 
    }, []);


    const handleSubmit = async () => {
        try {
            for (const imageId of selectedIds) {
                await axios.delete(`/api/obrazky/deleteById/${imageId}`);
            }
        } catch (error) {
            console.error('Chyba pri odstraňovaní obrázkov', error);
            alert('Niečo sa pokazilo pri odstaňovaní obrázkov!');
        }

        try {
            const uploadPromises = Array.from(newOtherImages).map(async (image) => {
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


        if (isMainImageChanged)
        {
            try {
                const formData = new FormData();
                formData.append('image', newMainImage);
                await axios.put(`/api/obrazky/updateMainImageByItemId/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data'},
                });
            } catch (error) {
                console.error('Chyba pri updatovaní hlavného obrázka.', error);
                alert('Nepodarilo sa updatnúť hlavný obrázok.');
            }
        }
    };

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

                {isMainImageChanged ? (
                    <input class="form-control" type="file" id="HlavnyObrazok" onChange={handleNewMainImage} required/>
                ) : (
                    <div class="row row-cols-2 row-cols-lg-4 row-cols-md-4">
                        <div class="col">
                            <div class="card h-100 col-lg-8 col-10">
                                <img loading="lazy" src={`${baseUrl}${mainImage.cesta}`} class="card-img-top h-100 img-fluid" alt={id + mainImage.cesta}/>

                                <div class="card-body text-center">
                                    <button className='btn btn-danger' onClick={() => setIsMainImageChanged(true)}>
                                        Zmazať
                                    </button>
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                    
                )}
            </div>
            

            


            <div class="mb-3 m-4">
                <label class="form-label">Ďalšie obrázky</label>

                <div class="container-fluid">
                    <div class="row">
                        <div class="row row-cols-lg-6 row-cols-2 row-cols-md-4">

                            {otherImages.map((image) => (
                                        <div class="col mb-4">
                                        <div class="card h-100">
                                            
                                            <img loading="lazy" src={`${baseUrl}${image.cesta}`} class="card-img-top h-100 img-fluid" alt={id + image.cesta}
                                            style={{
                                                opacity: selectedIds.includes(image.id) ? 0.2 : 1,
                                                transition: 'opacity 0.3s ease',
                                              }}/>
                                            <div class="card-body text-center">

                                                {selectedIds.includes(image.id) ? (
                                                    <button className='btn btn-success' onClick={() => handleSelectedIdsChange(image.id)}>
                                                        Späť
                                                    </button>
                                                ) : (
                                                <button className='btn btn-danger' onClick={() => handleSelectedIdsChange(image.id)}>
                                                    Zmazať
                                                </button>
                                                )}
                                                

                                            </div>
                                        </div>
                                    </div>
                            ))}
                            
                                

                        </div>
                    </div>
                </div>
                


                <input class="form-control" type="file" id="DalsieObrazky" onChange={handleOtherImagesChange} multiple style={{ display: 'none' }}/>
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
                    Vybrať ďalšie súbory
                </label>

                <div>
                    {newOtherImages.map((image, index) => (
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
                <Link to='/katalog' className='no-decoration-text'>
                    <button class="btn btn-primary" onClick={handleSubmit}>
                        Uložiť
                    </button>
                </Link>
                <Link to='/katalog' className='no-decoration-text'>
                    <button class="btn btn-secondary">
                        Zrušiť
                    </button>
                </Link>
            
            </div>
        </div>
    );
};



export default EditItemForm;