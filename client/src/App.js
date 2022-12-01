

import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import './App.css';
import ContactState from './components/context/contact/ContactState';
import AuthState from './components/context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './components/context/alert/AlertState';
import Alerts from './components/layout/Alerts';
import setAuthToken from './components/utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
if (localStorage.token) {
  setAuthToken(localStorage.token);

}
const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <BrowserRouter>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Routes>
                  <Route path="/about" element={<About />} /> 
                   <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </Fragment>
          </BrowserRouter>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
