import React from 'react';
import {useState, useEffect} from 'react';
import { BsPersonGear, BsTrash } from 'react-icons/bs';
import UserAuth from '../hooks/UserAuth';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import getAuthHeader from '../hooks/AuthHeader';


const Account = () => {

    const navigate = useNavigate();
    const authHeader = getAuthHeader();
    const {user, isAuthenticated} = UserAuth();
    const [activeSection, setActiveSection] = useState('profileinfo');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
    const [errors, setErrors] = useState({});

    const handleOldPasswordChange = (e) => setOldPassword(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleNewPasswordRepeatChange = (e) => setNewPasswordRepeat(e.target.value);

    const handleSectionClick = (section) => {
        setActiveSection(section);
      };

    useEffect(() => {
            if (isAuthenticated && user?.id) {
                const fetchItems = async () => {
                    try {
                        const response = await axios.get(`/api/pouzivatelia/getEmail/${user.id}`);
                        setEmail(response.data.email);
                    } catch (error) {
                        console.log(error);
                    }
            };
                fetchItems();
            }
    }, [isAuthenticated, user]);

    const validate = () => {
        const errors = {};

        if (newPassword.length < 5 || newPassword.length > 30)
        {
            errors.newPassword = "Heslo musí mať aspoň 5 a najviac 30 znakov.";
        } else if (!/\d/.test(newPassword))
        {
            errors.newPassword = "Heslo musí obsahovať aspoň jedno číslo.";
        }

        if (newPassword !== newPasswordRepeat)
        {
            errors.newPasswordRepeat = "Heslá sa nezhodujú.";
        }

        return errors;
    };

    const handleChangePassword = async () => {
            const validationErr = validate();
            if (Object.keys(validationErr).length > 0)
            {
                setErrors(validationErr);
                return;
            }
            setErrors({});
    
            const passwordInfo = {
                id: user.id,
                oldPassword: oldPassword,
                newPassword: newPassword,
            };
            
            try {
                const response = await axios.put('/api/pouzivatelia/changePassword', passwordInfo, authHeader);
                if (response.data.message)
                {
                    alert(response.data.message);
                }
                window.location.reload();
            } catch (error) {
                if (error.response.data.message) {
                    console.error('Chyba pri meneni hesla:', error);
                    alert(error.response.data.message);
                }
                else {
                    console.error('Chyba pri meneni hesla: ', error);
                    alert('Niečo sa pokazilo pri registrácii!');
                }
                
            }
            
        };

        const handleDeleteAccount = async () => {        
            try {
                if (!window.confirm('Naozaj chcete odstrániť svoj účet? Táto akcia je nezvratná.')) {
                    return;
                }
                const response = await axios.delete(`/api/pouzivatelia/deleteUser/${user.id}`, authHeader);
                if (response.data.message)
                {
                    alert(response.data.message);
                }
                logout();
            } catch (error) {
                if (error.response.data.message) {
                    console.error('Chyba pri odstraňovaní účtu.', error);
                    alert(error.response.data.message);
                }
                else {
                    console.error('Chyba pri odstraňovaní účtu: ', error);
                    alert('Niečo sa pokazilo pri odstraňovaní účtu.!');
                }
                
            }         
        };

        const logout = () => {
            localStorage.removeItem('authToken');
            navigate('/');
            window.location.reload();
        };

    const renderSection = () => {
        switch (activeSection) {
            case 'profileinfo':
                return (
                    <div class="tab-pane active" id="profile">
                        <h6>Informácie o tebe</h6>
                        <hr/>
                        <form>
                        <div class="form-group">
                            <label for="Email">Email</label>
                            <input type="text" class="form-control" id="email" value={email} disabled/>
                            <small id="Email" class="form-text text-muted">Email nemôžeš zmeniť.</small>
                        </div>
                        <h6 className='mt-4'>Zmena hesla</h6>
                        <hr></hr>
                        <div class="form-group">
                            <label>Staré heslo</label>
                            <input type="password" className={`form-control ${errors.oldPassword ? 'input-error' : ''}`} id="oldpassword" value={oldPassword} onChange={handleOldPasswordChange} required/>
                            {errors.oldPassword && <p className='error'>{errors.oldPassword}</p>}
                        </div>
                        <div class="form-group">
                            <label>Nové heslo</label>
                            <input type="text" className={`form-control ${errors.newPassword ? 'input-error' : ''}`} id="newpass" value={newPassword} onChange={handleNewPasswordChange} required/>
                            {errors.newPassword && <p className='error'>{errors.newPassword}</p>}
                        </div>
                        <div class="form-group">
                            <label>Zopakuj nové heslo</label>
                            <input type="text" className={`form-control ${errors.newPasswordRepeat ? 'input-error' : ''}`} id="newpassrepeat" value={newPasswordRepeat} onChange={handleNewPasswordRepeatChange} required/>
                            {errors.newPasswordRepeat && <p className='error'>{errors.newPasswordRepeat}</p>}
                        </div>

                        <button type="button" class="btn btn-danger mt-2" onClick={() => handleChangePassword()}>Zmeň heslo</button>
                        </form>
                    </div>
                );
                case 'deleteprofile':
                return (
                    <div class="tab-pane active" id="profile">
                        <h6>Zmazanie účtu</h6>
                        <hr/>
                        <form>
                        <button type="button" class="btn btn-danger" onClick={() => handleDeleteAccount()}>Zmazať účet</button>
                        </form>
                    </div>
                );
            default:
                return <div></div>;
        }
    };

    return (
    <div class="container mt-5 mb-5">


      <div class="row gutters-sm">
        <div class="col-12 col-md-4 mb-sm-3">
          <div class="card">
            <div class="card-body">
              <nav class="nav flex-column nav-pills nav-gap-y-1">
                <a onClick={() => handleSectionClick('profileinfo')} data-toggle="tab" className={`nav-item nav-link has-icon nav-link-faded ${activeSection === 'profileinfo' ? 'activcursoe' : ''}`} 
                style={{cursor: 'pointer', backgroundColor: activeSection === 'profileinfo' ? 'grey' : 'white', color: activeSection === 'profileinfo' ? 'white' : 'black'}}>
                  <BsPersonGear size={20}/>Detaily profilu
                </a>
                <hr className='m-2 mb-2'/>
                <a onClick={() => handleSectionClick('deleteprofile')} data-toggle="tab" className={`nav-item nav-link has-icon nav-link-faded ${activeSection === 'deleteprofile' ? 'active' : ''}`}
                    style={{cursor: 'pointer', backgroundColor: activeSection === 'deleteprofile' ? '#dc3545' : 'white', color: activeSection === 'deleteprofile' ? 'white' : '#dc3545'}}>
                <BsTrash size={20}/>Zmazanie profilu
                </a>
              </nav>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-body tab-content">

                {renderSection()}

            </div>
          </div>
        </div>
      </div>

    </div>
    );
}

export default Account;