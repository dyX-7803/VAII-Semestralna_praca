import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {BsPersonFill, BsKeyFill} from 'react-icons/bs';

const RegisterForm = () => {
    const navigate = useNavigate();
    const handleTitle = (text) => {
        document.title = text;
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleVerifyPasswordChange = (e) => setVerifyPassword(e.target.value);

    const validate = () => {
        const errors = {};

        if (!emailRegex.test(email)) 
        {
            errors.email = "Zadajte platnú emailovú adresu.";
        } 

        if (password.length < 5)
        {
            errors.password = "Heslo musí mať aspoň 5 znakov.";
        } else if (!/\d/.test(password))
        {
            errors.password = "Heslo musí obsahovať aspoň jedno číslo.";
        }

        if (password !== verifyPassword)
        {
            errors.verifyPassword = "Heslá sa nezhodujú.";
        }

        return errors;
    };

    const handleSubmit = async () => {
        const validationErr = validate();
        if (Object.keys(validationErr).length > 0)
        {
            setErrors(validationErr);
            return;
        }
        setErrors({});

        const userInfo = {
            email: email,
            password: password,
            role: 'user'
        };

        
        try {
            console.log(userInfo);
            await axios.post('/api/pouzivatelia/register', userInfo);
        } catch (error) {
            console.error('Chyba pri registrácii: ', error);
            alert('Niečo sa pokazilo pri registrácii!');
        }
        
        navigate('/');
    };

    return(
        <div class="container-fluid mb-5" style={{marginTop: '30px'}}>
            <div class="" style={{marginTop: '20px'}}>
                <div class="rounded d-flex justify-content-center">
                    <div class="col-lg-6 col-md-8 col-sm-12 shadow-lg p-5 bg-light">
                        <div class="text-center">
                            <h3 class="text-dark">Registrovať sa</h3>
                        </div>
                        <div class="p-4">
                            <form action="">                               
                                <div className={`input-group ${errors.email ? '' : 'mb-3'}`}>
                                    <span class="input-group-text bg-dark">
                                        <BsPersonFill size={16} color='white'/>
                                    </span>
                                    <input type="email" className={`form-control ${errors.email ? 'input-error' : ''}`} 
                                    placeholder="Email" value={email} onChange={handleEmailChange} required/>
                                </div>
                                <div>
                                        {errors.email && <p className='error mb-2'>{errors.email}</p>}
                                </div>
                                
                                <div className={`input-group ${errors.password ? '' : 'mb-3'}`}>
                                    <span class="input-group-text bg-dark">
                                        <BsKeyFill size={16} color='white'/>
                                    </span>
                                    <input type="password" className={`form-control ${errors.password ? 'input-error' : ''}`}
                                    placeholder="Heslo" value={password} onChange={handlePasswordChange} required/>
                                </div>
                                <div>
                                    {errors.password && <p className='error mb-2'>{errors.password}</p>}
                                </div>


                                <div className={`input-group ${errors.verifyPassword ? '' : 'mb-3'}`}>
                                    <span class="input-group-text bg-dark">
                                        <BsKeyFill size={16} color='white'/>
                                    </span>
                                    <input type="password" className={`form-control ${errors.verifyPassword ? 'input-error' : ''}`}
                                    placeholder="Overenie hesla" 
                                    value={verifyPassword} onChange={handleVerifyPasswordChange} required/>
                                </div>
                                <div>
                                    {errors.verifyPassword && <p className='error mb-2'>{errors.verifyPassword}</p>}
                                </div>

                                <div class="d-grid col-12 mx-auto">
                                    <button class="btn btn-dark" type="button" onClick={handleSubmit}><span></span>Registrovať</button>
                                </div>
                                <p class="text-center mt-3">Už máte účet?
                                <Link to='/prihlasit' className='no-decoration-text' onClick={() => handleTitle('WearWave | Prihlásenie')}>
                                    <span class="text-primary"> Prihlásiť sa</span>
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

export default RegisterForm;