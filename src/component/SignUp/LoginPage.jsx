import React from 'react'
import Header from "../Header/Header";

import Classes from "./LoginPage.module.css";
// import AskQuestion from '../../Pages/Question/AskQuestion';
import Login  from '../../Pages/LogIn/Login';

function LoginPage() {
  return (
    <div>
      <Header />
      <div className={Classes.background_image}>
        <Login />
      </div>
    </div>
  );
}

export default LoginPage
