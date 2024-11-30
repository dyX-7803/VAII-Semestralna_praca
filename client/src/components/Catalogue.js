import React, {useState, useEffect} from 'react'
import Item from './Item';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



const Catalogue = () => {

    const handleTitle = (text) => {
        document.title = text;
    };

    const [items, setItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/api/polozka');
                setItems(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch items');
            }
        };
        fetchItems(); 
    }, []);

    if (error) return <p>{error}</p>
    //if (!items.length) return <p>Loading...</p>

    return (
        <div class="container">
                
                <div class="pt-3 text-center">
                    <Link to='/katalog/pridat' className='no-decoration-text' onClick={() => handleTitle('WearWave | Pridať položku')}>
                        <button class="btn btn-primary"> Pridať položku
                        </button>
                    </Link>
                </div>
                
        <div class="row">
            <div class="col h-100 col-lg-2 g-4">
            <div class="card p-3 mb-4 border-3 border-black">
                <h4>Filter</h4>
                <h6 class="pt-2">Druh</h6>
                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckMens"/>
                <label class="form-check-label" for="flexCheckMens">
                    Muži
                </label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckWomans"/>
                <label class="form-check-label" for="flexCheckWomans">
                    Ženy
                </label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckChildren"/>
                <label class="form-check-label" for="flexCheckChildren">
                    Deti
                </label>
                </div>
            </div>
            </div>



            <div class="col-lg-10">
            <div class="p-lg-4 row row-cols-1 row-cols-lg-4 row-cols-md-2">
                {items.map(item => (
                    <Item
                        key={item.id}
                        id={item.id}
                        nazov={item.nazov}
                        popis={item.popis}
                        cena={item.cena}
                        pocet_ks={item.pocet_ks}
                    />
                ))}

            </div>
            </div>
        </div>


        </div>
    );
}

export default Catalogue;