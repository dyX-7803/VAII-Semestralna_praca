import React, {useEffect} from 'react'
import Header from './components/Header';
import Faqs from './components/Faqs';
import Footer from './components/Footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Catalogue from './components/Catalogue';
import AddItemForm from './components/AddItemForm';
import EditItemForm from './components/EditItemForm';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './hooks/ProtectedRoute';
import ItemDetail from './components/ItemDetail';
import ShoppingCart from './components/ShoppingCart';
import Account from './components/Account';

function App() {

  return (
    <div>


      <Router>
        <Header/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/katalog' element={<Catalogue/>}/>
              <Route path='/faqs' element={<Faqs/>}/>
              <Route path='/katalog/pridat' element={<ProtectedRoute element={AddItemForm}/>}/>
              <Route path='/katalog/editovat/:id' element={<ProtectedRoute element={EditItemForm}/>}/>
              <Route path='/registrovat' element={<ProtectedRoute element={RegisterForm}/>}/>
              <Route path='/prihlasit' element={<ProtectedRoute element={LoginForm}/>}/>
              <Route path='/katalog/detail/:id' element={<ItemDetail/>}/>
              <Route path='/shoppingcart' element={<ProtectedRoute element={ShoppingCart}/>}/>
              <Route path='/account' element={<ProtectedRoute element={Account}/>}/>
            </Routes>
          <Footer/>
      </Router>


    </div>
  )
};

export default App;