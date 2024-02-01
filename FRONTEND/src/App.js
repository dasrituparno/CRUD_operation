import React from 'react';
import LoginPage from "./LoginPage";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import RegistrationForm from './RegistrationForm';
import HomePage from './HomePage.jsx';

function App(){
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>}></Route>
      <Route path="/signup" element={<RegistrationForm/>}></Route>
      <Route path="/homepage" element={<HomePage/>}></Route>

    </Routes>
  </BrowserRouter>
  )
}

export default App;