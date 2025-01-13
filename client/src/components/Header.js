import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import UserAuth from '../hooks/UserAuth';
import { BsPersonGear, BsCartFill } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const {user, isAuthenticated} = UserAuth();
    const location = useLocation();

    const [activeItem, setActiveItem] = useState(() => {
        return localStorage.getItem('activeItem') || 'domov';
    });

    useEffect(() => {
        if (location.pathname === '/katalog')
        {
            setActiveItem('katalog');
        }
    }, [location]);

    const handleNavClick = (item) => {
        setActiveItem(item);
        localStorage.setItem('activeItem', item);
    };

    const handleTitle = (text) => {
        document.title = text;
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
        handleNavClick('domov');
        handleTitle('WearWave | Domov')
        window.location.reload();
    }; 

    const openAccountDetails = () => {
        navigate('/account');
        handleTitle('WearWave | Účet')
    };
    

    return (
        <header class="p-3 bg-dark text-white top-header">
            <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                <Link to='/' className='no-decoration-text' onClick={() => handleTitle('WearWave | Domov')}>
                    <a href='/#' class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none" onClick={() => handleNavClick('domov')}>
                        <img class="logo" src="/images/logo.png" alt="Logo"/>
                    </a>
                </Link>
                

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">

                    <li>
                        <Link to='/' className='no-decoration-text' onClick={() => handleTitle('WearWave | Domov')}>
                            <a href='/#' className={`nav-link px-2 ${activeItem === 'domov' ? 'active-navbar-item' : ''}`} onClick={() => handleNavClick('domov')}>Domov</a>
                        </Link>
                    </li>
                    <li>
                        <Link to='/katalog' className='no-decoration-text' onClick={() => handleTitle('WearWave | Katalóg')}>
                            <a href='/#' className={`nav-link px-2 ${activeItem === 'katalog' ? 'active-navbar-item' : ''}`} onClick={() => handleNavClick('katalog')}>Katalóg</a>
                        </Link>
                    </li>
                    <li>
                        <Link to='/faqs' className='no-decoration-text' onClick={() => handleTitle('WearWave | FAQs')}>
                        <a href='/#' className={`nav-link px-2 ${activeItem === 'faqs' ? 'active-navbar-item' : ''}`} onClick={() => handleNavClick('faqs')}>FAQs</a>
                        </Link>
                    </li>
                    
                </ul>


                {isAuthenticated ? (
                    <div className="text-end">
                    <div className="d-flex align-items-center justify-content-end gap-2">
                      <div className="dropdown">
                        <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          <BsPersonGear size={24} color="black" />
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" style={{cursor: 'pointer'}} onClick={() => {openAccountDetails(); handleNavClick('')}}>Profil</a></li>
                            {user.role === 'admin' ? (
                                <li><a className="dropdown-item" onClick={() => {navigate('/userstable'); handleTitle('WearWave | Správa používateľov')}} style={{cursor: 'pointer'}}>Správa používateľov</a></li>
                            ) : (<div/>)}
                            <li><a className="dropdown-item" style={{color: 'red', cursor: 'pointer'}} 
                            onClick={() => logout()}>Odhlásiť sa</a></li>
                            
                        </ul>
                      </div>
                      <Link to="/shoppingcart" className="no-decoration-text" onClick={() => handleTitle('WearWave | Košík')}>
                        <button type="button" className="btn btn-success" onClick={() => handleNavClick('shoppingcart')}>
                          <BsCartFill size={24} color="white" />
                        </button>
                      </Link>
                    </div>
                  </div>
                  
                  
                    
                ) : (
                    <div class="text-end">
                        <Link to='/prihlasit' className='no-decoration-text' onClick={() => handleTitle('WearWave | Prihlásenie')}>
                            <button type="button" class="btn btn-outline-light me-2" onClick={() => handleNavClick('prihlasenie')}>Prihlásenie</button>
                        </Link>
                        <Link to='/registrovat' className='no-decoration-text' onClick={() => handleTitle('WearWave | Registrácia')}>
                            <button type="button" class="btn btn-warning" onClick={() => handleNavClick('registracia')}>Registrácia</button>
                            
                        </Link>
                    </div>
                )}
                
            </div>
            </div>
        </header>
    );
}

export default Header;