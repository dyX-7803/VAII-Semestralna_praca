import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import { Link} from 'react-router-dom';


const Home = () => {

    const [news, setNews] = useState([]);
    const baseUrl = 'http://localhost:5000/';

    useEffect(() => {
            const fetchItems = async () => {
                try {
                    const response = await axios.get('/api/polozka/getNews');
                    setNews(response.data);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchItems(); 
    }, []);

    return (
        <div>
        <div id="myCarousel" class="carousel slide col-12 col-lg-8 offset-lg-2 p-3 mb-3" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-label="Slide 1" aria-current="true"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" class=""></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" class=""></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="images/man-fashion.jpg" class="d-block w-100 opacity-50" alt="ManFashionImg"/>
                <div class="container">
                    <div class="carousel-caption text-start">
                        <h1 class="carousel-text">Mužská móda.</h1>
                        <p class="carousel-text">Elegantné kúsky pre každý štýl. Objavujte trendy pánske oblečenie.</p>
                        <p><a class="btn btn-lg btn-primary carousel-button" href="/#">Prezerať</a></p>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <img src="images/woman-fashion.png" class="d-block w-100 opacity-50" alt="WomanFashionImg"/>
    
                <div class="container">
                    <div class="carousel-caption">
                        <h1 class="carousel-text">Ženská móda</h1>
                        <p class="carousel-text">Štýlové oblečenie pre moderné ženy. Zvýraznite svoju jedinečnosť.</p>
                        <p><a class="btn btn-lg btn-primary carousel-button" href="/#">Katalóg</a></p>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <img src="images/children-fashion.png" class="d-block w-100 opacity-50" alt="ChildrenFashionImg"/>
    
                <div class="container">
                    <div class="carousel-caption text-end">
                        <h1 class="carousel-text">Detská móda</h1>
                        <p class="carousel-text">Pohodlie a štýl pre najmenších. Oblečenie pre každý detský krok.</p>
                        <p><a class="btn btn-lg btn-primary carousel-button" href="/#">Prezerať</a></p>
                    </div>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div>

            <h1 class="p-3 fw-bold mb-4 text-center news-background">
                NOVINKY
            </h1>
            <div class="col-lg-8 offset-lg-2">
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">


                    {news.map(item => (
                        <div class="col">
                        <div class="card card-scale h-100 w-75 mx-auto">
                        <Link to={`/katalog/detail/${item.id}`} className='no-decoration-text h-100' >
                            <a>
                                <img loading="lazy" src={`${baseUrl}${item.cesta}`} class="card-img-top h-100" alt={item.nazov + item.id}/>
                            </a>
                            
                        </Link>

                            <div class="card-body">
                                <h5 class="card-title">{item.nazov}</h5>
                                <p class="card-text">{item.cena}€</p>
                            </div>
                        </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
}

export default Home;