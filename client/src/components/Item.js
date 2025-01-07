import React, {useState, useEffect} from "react";
import axios from "axios";
import {BiPencil} from 'react-icons/bi';
import {FaTrash} from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link} from 'react-router-dom';
import UserAuth from "../hooks/UserAuth";

const Item = ({id, name, desc, price, quant}) => {

    const {user, isAuthenticated} = UserAuth();
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
    }, [id]);

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);


    const handleDeleteItem = async () => {
        try {
            await axios.delete(`/api/polozka/deleteItemById/${id}`);
        } catch (error) {
            console.error('Chyba pri odstraňovaní', error);
            alert('Niečo sa pokazilo pri odstaňovaní!');
        }
    };

    const addItemToCart = async () => {
        try {
            const response = await axios.post('/api/kosik/addItem', {
                pouzivatel_id: user.id,
                polozka_id: id,
                pocet_ks: 1,
            });
    
            if (response.status === 201) {
                console.log("Položka bola pridaná do košíka:", response.data);
                alert("Položka bola pridaná do košíka.");
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert("Položka už existuje v košíku.");
            } else {
                console.error("Chyba pri pridávaní položky do košíka:", error);
                alert("Nastala chyba pri pridávaní položky do košíka.");
            }
        }
    };
    


    return (
        <div class="col mb-4">
            <div class="card card-scale h-100">

                <Link to={`/katalog/detail/${id}`} className='no-decoration-text h-100' >
                    <a class="h-100">
                    <img loading="lazy" src={`${baseUrl}${path}`} class="card-img-top h-100 img-fluid" alt={name + id}/>
                    </a>
                </Link>
                    
                <div class="card-body">
                    <h5 class="card-title">{name}</h5>
                    <p class="card-text">{price}€</p>

                        <div class="d-flex align-items-center gap-2">
                            <a class="btn btn-dark" onClick={() => addItemToCart()}>Pridať do košíka</a>

                            {isAuthenticated && user.role === 'admin' ? (
                                <div className="d-flex gap-1">
                                <Link to={`/katalog/editovat/${id}`} className='no-decoration-text' >
                                <button class="btn btn-primary ">
                                        <BiPencil size={18}></BiPencil>
                                </button>
                                </Link>
                                
                                <button type="button" class="btn btn-danger " data-toggle="modal" data-targer="#exampleModal" onClick={handleShow}>
                                        <FaTrash size={18}></FaTrash>
                                </button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Odstránenie položky</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Skutočne chceš odstrániť túto položku?</Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Zružiť
                                    </Button>
                                    <Button variant="danger" onClick={() => {handleDeleteItem(); handleClose(); window.location.reload()}}>
                                        Zmazať
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                                </div>
                            ) : (<div/>)}
                            
                    </div>     
                </div>
            </div>
        </div>
    );
};

export default Item;