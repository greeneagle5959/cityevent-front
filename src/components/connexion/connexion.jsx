import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./connexion.css";
import { Route, Router , useNavigate} from "react-router-dom";
import Headersimple from "../header/headersimple";
import Footer from "../footer/footer";






export default function Connexion() {
  const navigate = useNavigate();

  return (
    <>
    <Headersimple />
    <br />
      <form  className="row mt-5 mb-4 mx-auto">
         <div className="col-lg-7 mx-auto bg-light p-4 rounded shadow">
        <div className="form-group mb-5 lg-6 w-25 mx-auto">
          <label className="py-2" htmlFor="email"><h5>Adresse email :</h5></label>
          <input type="email" className="form-control py-2" id="email" aria-describedby="emailHelp" />
          <small id="emailHelp" className="form-text text-muted"></small>
        </div>
        <div className="form-group mb-5  lg-6 w-25 mx-auto ">
          <label className="py-2" htmlFor="password"><h5>Mot de passe :</h5></label>
          <input type="password" className="form-control py-2" id="password" />
        </div>
        <button type="submit" className="btn btn-primary mb-3 w-25 mx-auto d-block">Se connecter</button><br />
         <p className="text-center">Pas encore de compte ? <button onClick={() => navigate("/inscription")} className="inscript btn btn-link p-0 m-0 align-baseline mx-auto"> 
   Inscription
            </button></p>
        </div>
      </form>
    
      <Footer />
    </>
  );
  
  
  }
