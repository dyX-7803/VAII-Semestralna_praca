import React, {useState} from 'react'
import { Link } from 'react-router-dom';


const Header = () => {

    const [activeItem, setActiveItem] = useState('domov');

    const handleNavClick = (item) => {
        setActiveItem(item);
    };



    return (
        <header class="p-3 bg-dark text-white top-header">
            <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                <Link to='/' className='no-decoration-text'>
                    <a class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none" onClick={() => handleNavClick('domov')}>
                        <img class="logo" src="images/logo.png" alt="Logo"/>
                    </a>
                </Link>
                

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">

                    <li>
                        <Link to='/' className='no-decoration-text'>
                            <a href='/#' className={`nav-link px-2 ${activeItem === 'domov' ? 'active-navbar-item' : ''}`} onClick={() => handleNavClick('domov')}>Domov</a>
                        </Link>
                    </li>
                    <li>
                        <Link to='/katalog' className='no-decoration-text'>
                            <a href='/#' className={`nav-link px-2 ${activeItem === 'katalog' ? 'active-navbar-item' : ''}`} onClick={() => handleNavClick('katalog')}>Katalóg</a>
                        </Link>
                    </li>
                    <li>
                        <Link to='/faqs' className='no-decoration-text'>
                        <a href='/#' className={`nav-link px-2 ${activeItem === 'faqs' ? 'active-navbar-item' : ''}`} onClick={() => handleNavClick('faqs')}>FAQs</a>
                        </Link>
                    </li>
                    
                </ul>

                <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 search-bar">
                    <input type="search" class="form-control form-control-dark input-search" placeholder="Čo hľadáte? (značka, druh...)" aria-label="Search"/>
                    <button class="search-button" type="submit">
                        <img src="images/search-icon.png" alt="SearchIcon" class="search-icon"/>
                    </button>
                </form>

                <div class="text-end">
                    <button type="button" class="btn btn-outline-light me-2">Prihlásenie</button>
                    <button type="button" class="btn btn-warning">Registrácia</button>
                </div>
            </div>
            </div>
        </header>
    );
}

export default Header;