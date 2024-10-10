import React from 'react'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Register from "../../Pages/Register/Register";
import Classes from "./RegisterPage.module.css";
function RegisterPage() {
  return (
    <div>
      <Header />
      <div className={Classes.background_image}>
        <Register />
      </div>
      <Footer />
    </div>
  );
}

export default RegisterPage
