import React, {useEffect} from 'react'
import Header from './components/Header';
import Faqs from './components/Faqs';
import Footer from './components/Footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Catalogue from './components/Catalogue';
import AddItemForm from './components/AddItemForm';
import EditItemForm from './components/EditItemForm';

function App() {

  return (
    <div>


      <Router>
        <Header/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/katalog' element={<Catalogue/>}/>
              <Route path='/faqs' element={<Faqs/>}/>
              <Route path='/katalog/pridat' element={<AddItemForm/>}/>
              <Route path='/katalog/editovat/:id' element={<EditItemForm/>}/>
            </Routes>
          <Footer/>
      </Router>


    </div>
  )
};

export default App;