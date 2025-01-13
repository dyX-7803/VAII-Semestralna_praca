import React, { useState, useEffect } from "react";
import axios from "axios";
import UserAuth from "../hooks/UserAuth";
import getAuthHeader from "../hooks/AuthHeader";

const ShoppingCart = () => {
    const baseUrl = 'http://localhost:5000/';
    const { user, isAuthenticated } = UserAuth();
    const [items, setItems] = useState([]);
    const [quants, setQuants] = useState([]);
    const [finalPrice, setFinalPrice] = useState('');
    const authHeader = getAuthHeader();

    useEffect(() => {
        if (isAuthenticated && user?.id) {
            const fetchItems = async () => {
                try {
                    const response = await axios.get(`/api/kosik/getUserCart/${user.id}`);
                    setItems(response.data);
                    const quants_ = response.data.map(item => item.pocet_ks);
                    setQuants(quants_);
                } catch (error) {
                    console.log(error);
                }
        };
            fetchItems();
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        const calculateFinalPrice = () => {
            let fp = 0;
            items.forEach((item, index) => {
                fp += item.cena * quants[index];
            });
            setFinalPrice(parseFloat(fp.toFixed(2)));
        };
        calculateFinalPrice();
    }, [items, quants]);

    const handleQuantMinus = async (index) => {
        try {
            const { polozka_id } = items[index];
            const response = await axios.put(`/api/kosik/decreaseQuantity`, {
                pouzivatel_id: user.id,
                polozka_id: polozka_id
            }, authHeader);
            if (response.data) {
                setQuants((prevQuants) => {
                    const updatedQuants = [...prevQuants];
                    updatedQuants[index] = response.data.pocet_ks;
                    return updatedQuants;
                });
            }
        } catch (error) {
            console.error("Chyba pri zvýšení kusov.", error);
        }
    };

    const handleQuantPlus = async (index) => {
        try {
            const { polozka_id } = items[index];
            const response = await axios.put(`/api/kosik/increaseQuantity`, {
                pouzivatel_id: user.id,
                polozka_id: polozka_id
            }, authHeader);
            if (response.data) {
                setQuants((prevQuants) => {
                    const updatedQuants = [...prevQuants];
                    updatedQuants[index] = response.data.pocet_ks;
                    return updatedQuants;
                });
            }
        } catch (error) {
            console.error("Chyba pri znížení kusov.", error);
        }
    };

    const handleDeleteItem = async (index) => {
        try {
            const { polozka_id } = items[index];
            const response = await axios.delete(`/api/kosik/deleteItem`, {
                params: {
                    pouzivatel_id: user.id,
                    polozka_id: polozka_id,
                }, headers: authHeader.headers,
            });
            if (response.status === 200) {
                setItems((prevItems) => prevItems.filter((_, i) => i !== index));
                setQuants((prevQuants) => prevQuants.filter((_, i) => i !== index));
            }
        } catch (error) {
            console.error("Chyba pri mazaní položky.", error);
        }
    };

    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css" rel="stylesheet" />

            <div className="container py-5">
                <h1 className="fw-bold mb-5">Váš nákupný košík:</h1>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className="card-body">

                                {items.length === 0 ? (
                                    <div>
                                        <h2 style={{color: 'darkgrey'}} className="text-center">
                                            Váš košík je prázdny!
                                        </h2>
                                    </div>
                                ) 
                                : 
                                (<div></div>)}

                                {items.map((item, index) => (
                                    <div key={item.id}>
                                        <div className="row cart-item">
                                            <div className="col-md-2">
                                                <img src={`${baseUrl}${item.cesta}`} alt={item.id} className="img-fluid rounded" style={{ width: '80px', height: '100px' }} />
                                            </div>
                                            <div className="col-md-6">
                                                <h5 className="card-title">{item.nazov}</h5>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="input-group">
                                                    <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => handleQuantMinus(index)}>-</button>
                                                    <input style={{ maxWidth: '100px' }} type="text" className="form-control form-control-sm text-center quantity-input" value={quants[index]} readOnly />
                                                    <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => handleQuantPlus(index)}>+</button>
                                                </div>
                                            </div>
                                            <div className="col-md-2 text-end">
                                                <p className="fw-bold">{(item.cena * quants[index]).toFixed(2)}€</p>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteItem(index)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                        {index !== items.length - 1 && <hr />}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-lg-4">
                        <div className="card cart-summary">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Zhrnutie objednávky</h5>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Položky</span>
                                    <span>{finalPrice}€</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-4">
                                    <strong>Celkovo</strong>
                                    <strong>{finalPrice}€</strong>
                                </div>
                                <button className="btn btn-success w-100" disabled={items.length === 0}>Objednať</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
