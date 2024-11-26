import React, {useEffect, useState} from 'react'
import Header from './components/Header';
import Faqs from './components/Faqs';
import Footer from './components/Footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Catalogue from './components/Catalogue';

function App() {

  return (
    <div>


      <Router>
        <Header/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/katalog' element={<Catalogue/>}/>
              <Route path='/faqs' element={<Faqs/>}/>
            </Routes>
          <Footer/>
      </Router>


    </div>
  )
};

export default App;