import React, {useState, useEffect} from "react";
import axios from "axios";
import UserAuth from "../hooks/UserAuth";
import { useParams } from 'react-router-dom';
import {BiPencil} from 'react-icons/bi';
import {FaTrash} from 'react-icons/fa';
import { Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ShoppingCart = () => {

    useEffect(() => {
        const fetchItems = async () => {

            
        };
        fetchItems();
    }, []);


    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css" rel="stylesheet"/>

            <div class="container py-5">
                <h1 class="fw-bold mb-5">Váš nákupný košík</h1>
                <div class="row">
                    <div class="col-lg-8">
                        <div class="card mb-4">
                            <div class="card-body">
                                <div class="row cart-item mb-3">
                                    <div class="col-md-3">
                                        <img src="https://via.placeholder.com/100" alt="Product 1" class="img-fluid rounded"/>
                                    </div>
                                    <div class="col-md-5">
                                        <h5 class="card-title">Product 1</h5>
                                        <p class="text-muted">Category: Electronics</p>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="input-group">
                                            <button class="btn btn-outline-secondary btn-sm" type="button">-</button>
                                            <input style={{maxWidth: '100px'}} type="text" class="form-control  form-control-sm text-center quantity-input" value="1"/>
                                            <button class="btn btn-outline-secondary btn-sm" type="button">+</button>
                                        </div>
                                    </div>
                                    <div class="col-md-2 text-end">
                                        <p class="fw-bold">$99.99</p>
                                        <button class="btn btn-sm btn-outline-danger">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                    </div>
                                </div>
                                <hr/>
                                <div class="row cart-item">
                                    <div class="col-md-3">
                                        <img src="https://via.placeholder.com/100" alt="Product 2" class="img-fluid rounded"/>
                                    </div>
                                    <div class="col-md-5">
                                        <h5 class="card-title">Product 2</h5>
                                        <p class="text-muted">Category: Clothing</p>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="input-group">
                                            <button class="btn btn-outline-secondary btn-sm" type="button">-</button>
                                            <input style={{maxWidth: '100px'}} type="text" class="form-control form-control-sm text-center quantity-input" value="2"/>
                                            <button class="btn btn-outline-secondary btn-sm" type="button">+</button>
                                        </div>
                                    </div>
                                    <div class="col-md-2 text-end">
                                        <p class="fw-bold">$49.99</p>
                                        <button class="btn btn-sm btn-outline-danger">
                                                <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-start mb-4">
                            <a href="#" class="btn btn-outline-dark">
                                <i class="bi bi-arrow-left me-2"></i>Spať k nákupu
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card cart-summary">
                            <div class="card-body">
                                <h5 class="card-title mb-4">Zhrnutie objednávky</h5>
                                <div class="d-flex justify-content-between mb-3">
                                    <span>Celkovo</span>
                                    <span>$199.97</span>
                                </div>
                                <hr/>
                                <div class="d-flex justify-content-between mb-4">
                                    <strong>Total</strong>
                                    <strong>$229.97</strong>
                                </div>
                                <button class="btn btn-success w-100">Objednať</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
          
    );
};

export default ShoppingCart;