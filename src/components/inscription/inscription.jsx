import "bootstrap/dist/css/bootstrap.min.css";
import "./inscription.css";

import { useState } from "react";
import { Route, Router } from "react-router-dom";
import Headersimple from "../header/headersimple";
import Footer from "../footer/footer";

function InscrireUtilisateur() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [tel, setTel] = useState("");
  const [message, setMessage] = useState("");

  const formInscription = async (e) => {
    e.preventDefault();

    const reponse = await fetch(
      "http://127.0.0.1:8000/api/v1/users/inscription",
      {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ nom, prenom, email, mdp, tel }),
      },
    );
    const data = await reponse.json();
    if (!reponse.ok) {
      setMessage(data.erreur);
      return;
    }
    setMessage(data.success);
    setNom("");
    setPrenom("");
    setEmail("");
    setMdp("");
    setTel("");
  };
  return (
    <div>
      <Headersimple />
      <div className="row mt-5 mb-4 mx-auto">
        <div className="col-lg-7 mx-auto bg-light p-4 rounded shadow">
          <h1 className="text-center mb-4">Formulaire D'inscription</h1>
          <form className="form-group mb-3 lg-6 w-25 mx-auto" onSubmit={formInscription}>
            {message && <div className="alert alert-danger">{message}</div>}
            <label className="py-2"><h5>Nom :</h5></label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="form-control py-2"
            />
            <label className="py-2"><h5>Prenom :</h5></label>
            <input
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="form-control py-2"
            />
            <label className="py-2"><h5>Email :</h5></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control py-2"
            />
            <label className="py-2"><h5>Mot de passe :</h5></label>
            <input
              type="text"
              value={mdp}
              onChange={(e) => setMdp(e.target.value)}
              className="form-control py-2"
            />
            <label className="py-2 mt-2"><h5>Numero de telephone :</h5></label>
            <input
              type="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className="form-control py-2"
            />
            <button type="submit" className="btn btn-primary mt-3">
              Valider
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default InscrireUtilisateur;
