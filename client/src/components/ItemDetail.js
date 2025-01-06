import React, {useState, useEffect} from "react";
import axios from "axios";
import UserAuth from "../hooks/UserAuth";
import { useParams } from 'react-router-dom';
import {BiPencil} from 'react-icons/bi';
import {FaTrash} from 'react-icons/fa';
import { Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const ItemDetail = ({nazov, popis, cena, pocet_ks}) => {

    const navigate = useNavigate();
    const { id } = useParams();
    const {user, isAuthenticated} = UserAuth();
    const baseUrl = 'http://localhost:5000/';

    const [mainImage, setMainImage] = useState('');
    const [otherImages, setOtherImages] = useState([]);
    const [showcaseImage, setShowcaseImage] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [quant, setQuant] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchItems = async () => {

            try {
                const response = await axios.get(`/api/polozka/getDetailsById/${id}`);
                const { nazov, popis, cena, pocet_ks } = response.data;
                setName(nazov);
                setDesc(popis);
                setPrice(cena);
                setQuant(pocet_ks);
            } catch (err) {
                console.error(err);
            }

            try {               
                const response = await axios.get(`/api/obrazky/getAllImagesByItemId/${id}`);
                setMainImage(response.data[0]);
                setShowcaseImage(response.data[0]);
                response.data.shift();
                setOtherImages(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchItems();
    }, [id]);

    const handleDeleteItem = async () => {
        try {
            await axios.delete(`/api/polozka/deleteItemById/${id}`);
        } catch (error) {
            console.error('Chyba pri odstraňovaní', error);
            alert('Niečo sa pokazilo pri odstaňovaní!');
        }
    };

    const changeShowcaseImage = (newImage) =>
    {
        setShowcaseImage(newImage);
    }


    return (
        <div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"/>

            <div class="container mt-5">
                <div class="row">

                    <div class="col-md-12 col-lg-6 mb-4">
                        <img src={`${baseUrl}${showcaseImage.cesta}`} alt="Product" class="img-fluid rounded mb-3 product-image h-100" id="mainImage"/>
                        <div class="d-flex justify-content-between">
                        </div>
                    </div>



                    <div class="col-md-6">
                    <div class="col-lg-12">
                        </div>
                        <h2 class="mb-3">{name}</h2>
                        <div class="mb-3">
                            <span class="h4 me-2">{price}€</span>
                        </div>
                        <div>
                            <label for="quantity" className='form-label fw-bold'>Popis:</label>
                            <p class="mb-4">{desc}</p>
                        </div>
                          
                        <div class="mb-4">
                            <label for="quantity" className='form-label fw-bold'>Množstvo:</label>
                            <input type="number" class="form-control" id="quantity" value="1" min="1" style={{width: '80px'}}/>
                        </div>
                        <div>
                            <button class="btn btn-dark btn-lg mb-3 me-2">
                                    <i class="bi bi-cart-plus"></i> Pridať do košíka
                            </button>

                            <div class="d-flex align-items-center gap-2">

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
                                        <Button variant="danger" onClick={() => {handleDeleteItem(); handleClose(); navigate('/katalog');}}>
                                            Zmazať
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    </div>
                                ) : (<div/>)}
                                
                            </div>  
                        </div>
                        
                        <div class="mt-4">

                        <div class="col-lg-12">
                            <div class="row row-cols-2 row-cols-lg-4 row-cols-md-2">
                                
                            
                            <div class="col mb-4">
                                <div class="card card-scale h-100">
                                        <img loading="lazy" src={`${baseUrl}${mainImage.cesta}`} class="card-img-top h-100 img-fluid" alt={mainImage + id}
                                        style={{cursor: 'pointer'}} onClick={() => changeShowcaseImage(mainImage)}/>
                                </div>
                            </div>

                            {otherImages.map((image) => (
                                <div class="col mb-4">
                                    <div class="card card-scale h-100">
                                        <img loading="lazy" src={`${baseUrl}${image.cesta}`} class="card-img-top h-100 img-fluid" alt={image + id}
                                        style={{cursor: 'pointer'}} onClick={() => changeShowcaseImage(image)}/>
                                    </div>
                                </div>
                            ))}
                            
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default ItemDetail;