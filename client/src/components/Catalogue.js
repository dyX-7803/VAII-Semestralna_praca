import React from 'react'


const Catalogue = () => {

    return (
        <div class="container">
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
            <div class="p-lg-4 row row-cols-1 row-cols-lg-4 row-cols-md-2 g-4">
                <div class="col">
                <div class="card card-scale h-100">
                    <a class="h-100" href="#">
                    <img src="images/catalog/picture1.jpg" class="card-img-top h-100 img-fluid" alt="LeatherJacketImg"/>
                    </a>
                    <div class="card-body">
                    <h5 class="card-title">Kožená bunda</h5>
                    <p class="card-text">24,99€</p>
                    <a class="btn btn-dark">Pridať do košíka</a>
                    </div>
                </div>
                </div>
                <div class="col">
                <div class="card card-scale h-100">
                    <a class="h-100" href="#">
                    <img src="images/catalog/picture2.jpg" class="card-img-top h-100 img-fluid" alt="YellowHoodieImg"/>
                    </a>
                    <div class="card-body">
                    <h5 class="card-title">Žltá mikina</h5>
                    <p class="card-text">19,99€</p>
                    <a class="btn btn-dark">Pridať do košíka</a>
                    </div>
                </div>
                </div>
                <div class="col">
                <div class="card card-scale h-100">
                    <a class="h-100" href="#">
                    <img src="images/catalog/picture3.jpg" class="card-img-top h-100 img-fluid" alt="TrousersImg"/>
                    </a>

                    <div class="card-body">
                    <h5 class="card-title">Nohavice</h5>
                    <p class="card-text">29,99€</p>
                    <a class="btn btn-dark">Pridať do košíka</a>
                    </div>
                </div>
                </div>
                <div class="col">
                <div class="card card-scale h-100">
                    <a class="h-100" href="#">
                    <img src="images/catalog/picture4.jpg" class="card-img-top h-100 img-fluid" alt="SneakersImg"/>
                    </a>
                    <div class="card-body">
                    <h5 class="card-title">Bežecké tenisky</h5>
                    <p class="card-text">39,99€</p>
                    <a class="btn btn-dark">Pridať do košíka</a>
                    </div>
                </div>
                </div>

            </div>
            </div>
        </div>


        </div>
    );
}

export default Catalogue;