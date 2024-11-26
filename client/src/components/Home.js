import React from 'react'


const Home = () => {

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
                        <p><a class="btn btn-lg btn-primary carousel-button" href="#">Prezerať</a></p>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <img src="images/woman-fashion.png" class="d-block w-100 opacity-50" alt="WomanFashionImg"/>
    
                <div class="container">
                    <div class="carousel-caption">
                        <h1 class="carousel-text">Ženská móda</h1>
                        <p class="carousel-text">Štýlové oblečenie pre moderné ženy. Zvýraznite svoju jedinečnosť.</p>
                        <p><a class="btn btn-lg btn-primary carousel-button" href="#">Katalóg</a></p>
                    </div>
                </div>
            </div>
            <div class="carousel-item">
                <img src="images/children-fashion.png" class="d-block w-100 opacity-50" alt="ChildrenFashionImg"/>
    
                <div class="container">
                    <div class="carousel-caption text-end">
                        <h1 class="carousel-text">Detská móda</h1>
                        <p class="carousel-text">Pohodlie a štýl pre najmenších. Oblečenie pre každý detský krok.</p>
                        <p><a class="btn btn-lg btn-primary carousel-button" href="#">Prezerať</a></p>
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
                    <div class="col">
                        <div class="card card-scale w-75 mx-auto">
                            <a href="#">
                                <img src="images/catalog/picture4.jpg" class="card-img-top" alt="..."/>
                            </a>

                            <div class="card-body">
                                <h5 class="card-title">Bežecké lall tenisky</h5>
                                <p class="card-text">39,99€</p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card card-scale w-75 mx-auto">
                            <a href="#">
                                <img src="images/catalog/picture1.jpg" class="card-img-top" alt="..."/>
                            </a>

                            <div class="card-body">
                                <h5 class="card-title">Kožená bunda</h5>
                                <p class="card-text">24,99€</p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card card-scale w-75 mx-auto">
                            <a href="#">
                                <img src="images/catalog/picture3.jpg" class="card-img-top" alt="..."/>
                            </a>

                            <div class="card-body">
                                <h5 class="card-title">Nohavice</h5>
                                <p class="card-text">29,99€</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;