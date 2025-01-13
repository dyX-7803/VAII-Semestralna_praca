import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {BsPersonFill, BsKeyFill} from 'react-icons/bs';

const LoginForm = () => {
    const navigate = useNavigate();
    const handleTitle = (text) => {
        document.title = text;
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const login = async (email, password) => {
        try {
            
            const response = await axios.post('/api/pouzivatelia/login', {email, password});
            const {token} = response.data;

            localStorage.setItem('authToken', token);

            alert('Uspešné prihlásenie.');

            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Chyba pri prihlasovaní: ', error);
            alert('Nesprávne meno alebo heslo!');
        }

        
    };

    return(
        <div class="container-fluid mb-5" style={{marginTop: '30px'}}>
                <div class="" style={{marginTop: '20px'}}>
                    <div class="rounded d-flex justify-content-center">
                        <div class="col-lg-6 col-md-8 col-sm-12 shadow-lg p-5 bg-light">
                            <div class="text-center">
                                <h3 class="text-dark">Prihlásiť sa</h3>
                            </div>
                            <div class="p-4">
                                <form action="">                               
                                    <div class="input-group mb-3">
                                        <span class="input-group-text bg-dark">
                                            <BsPersonFill size={16} color='white'/>
                                        </span>
                                        <input type="email" class="form-control" placeholder="Email" value={email} onChange={handleEmailChange}/>
                                    </div>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text bg-dark">
                                            <BsKeyFill size={16} color='white'/>
                                        </span>
                                        <input type="password" class="form-control" placeholder="Heslo" value={password} onChange={handlePasswordChange}/>
                                    </div>
                                    <div class="d-grid col-12 mx-auto">
                                        <button class="btn btn-dark" type="button" onClick={() => login(email, password)}><span></span>Prihlásiť</button>
                                    </div>
                                    <p class="text-center mt-3">Ešte nemáte účet? 
                                        <Link to='/registrovat' className='no-decoration-text' onClick={() => handleTitle('WearWave | Registrácia')}>
                                                <span class="text-primary"> Zaregistrovať sa</span>
                                        </Link>  
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
    
};

export default LoginForm;