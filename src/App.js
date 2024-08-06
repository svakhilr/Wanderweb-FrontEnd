import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import UserRoutes from './Routes/user';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Authprovider from './store/authprovider';


const App = ()=>{
  return(
    
    <BrowserRouter>
    <Authprovider>
    <ToastContainer/>
    <Routes>
      <Route path='*' element={<UserRoutes/>}/>
    </Routes>
    </Authprovider>
    </BrowserRouter>
  )
}

export default App;
