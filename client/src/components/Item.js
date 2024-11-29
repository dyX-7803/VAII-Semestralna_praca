import React from "react";

const Item = ({id, nazov, popis, cena, pocet_ks}) => {


    return (
        <div class="col">
                <div class="card card-scale h-100">
                    <a class="h-100" href="/#">
                    <img src="images/catalog/picture1.jpg" class="card-img-top h-100 img-fluid" alt={nazov + id}/>
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