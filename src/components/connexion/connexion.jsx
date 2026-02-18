import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./connexion.css";
import { Route, Router , useNavigate} from "react-router-dom";
import Header from "../header/header";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";






export default function Connexion() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Navbar /><br />
      <form>
        <div className="form-group mb-3 lg-6">
          <label htmlFor="email">Adresse email :</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
          <small id="emailHelp" className="form-text text-muted"></small>
        </div>
        <div className="form-group mb-3 lg-6">
          <label htmlFor="password">Mot de passe :</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Se connecter</button><br />
         <p>Pas encore de compte ? <button onClick={() => navigate("/inscription")} className="inscript"> 
   Inscription
            </button></p>
        
      </form>
      <Footer />
    </>
  );
  
  
  }
