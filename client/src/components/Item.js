import React, {useState, useEffect} from "react";
import axios from "axios";

const Item = ({id, nazov, popis, cena, pocet_ks}) => {

    const baseUrl = 'http://localhost:5000/';
    const [path, setPath] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`/api/obrazky/getPath/${id}`);
                setPath(response.data.cesta);
            } catch (err) {
                console.error(err);
            }
        };
        fetchItems(); 
    }, []);

    return (
        <div class="col">
                <div class="card card-scale h-100">
                    <a class="h-100" href="/#">
                    <img src={`${baseUrl}${path}`} class="card-img-top h-100 img-fluid" alt={nazov + id}/>
                    </a>
                    <div class="card-body">
                    <h5 class="card-title">{nazov}</h5>
                    <p class="card-text">{cena}€</p>
                    <a href="/#" class="btn btn-dark">Pridať do košíka</a>
                </div>
            </div>
        </div>
    );
};

export default Item;