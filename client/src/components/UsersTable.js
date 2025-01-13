import React, {useState, useEffect} from 'react'
import axios from 'axios';
import UserAuth from '../hooks/UserAuth';
import getAuthHeader from '../hooks/AuthHeader';
import {BsTrash} from 'react-icons/bs';

const UsersTable = () => {

    const {user, isAuthenticated} = UserAuth();
    const authHeader = getAuthHeader();
    const [users, setUsers] = useState([]);

    useEffect(() => {
                if (isAuthenticated && user?.id) {
                    const fetchItems = async () => {
                        try {
                            const response = await axios.get(`/api/pouzivatelia/getAllUsers`, authHeader);
                            setUsers(response.data);
                        } catch (error) {
                            console.log(error);
                        }
                };
                    fetchItems();
                }
        }, [isAuthenticated, user]);


    const handleDeleteAccount = async (id) => {        
            try {
                if (!window.confirm('Naozaj chcete odstrániť svoj účet? Táto akcia je nezvratná.')) {
                    return;
                }
                const response = await axios.delete(`/api/pouzivatelia/deleteUser/${id}`, authHeader);
                if (response.data.message)
                {
                    alert(response.data.message);
                }
                window.location.reload();
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

    return (
        <div>
            <table class="table table-hover m-5">
                <thead>
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">email</th>
                    <th scope="col">vymazat</th>
                    </tr>
                </thead>
                <tbody>

                    {users.map(user => (
                        <tr>
                        <th scope="row">{user.id}</th>
                        <td>{user.email}</td>
                        <td><BsTrash size={20} style={{color: 'red', cursor: 'pointer'}} onClick={() => handleDeleteAccount(user.id)}/></td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
        
    );
}

export default UsersTable;