import "bootstrap/dist/css/bootstrap.min.css";
import "./inscription.css";

import { useState } from "react";
import { Route, Router ,} from "react-router-dom";





function InscrireUtilisateur() {
    

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [mdp, setMdp] = useState('');
    const [tel, setTel] = useState('');
    const [message, setMessage] = useState('');

    const formInscription = async (e) => {

        e.preventDefault();

        const reponse = await fetch('http://127.0.0.1:8000/api/v1/users/inscription', {
            method: 'POST',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({ nom, prenom, email, mdp, tel, })
        });
        const data = await reponse.json();
        if (!reponse.ok) {
            setMessage(data.erreur);
            return;

        }
        setMessage(data.success);
        setNom('');
        setPrenom('');
        setEmail('');
        setMdp('');
        setTel('');
    }
    return (<div>
        <div className="row ">
            <div className="col-lg-6 mx-auto">
                <h1>Formulaire D'inscription</h1>
                <form onSubmit={formInscription}>
                    {message && <div className="alert alert-danger">{message}</div>}
                    <label>Nom</label>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} className="form-control" />
                    <label>Prenom</label>
                    <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} className="form-control" />
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                    <label>Mot de passe</label>
                    <input type="text" value={mdp} onChange={(e) => setMdp(e.target.value)} className="form-control" />
                    <label>Numero de telephone</label>
                    <input type="tel" value={tel} onChange={(e) => setTel(e.target.value)} className="form-control" />
                    <button type="submit" className="btn btn-primary mt-3">Valider</button>
                </form>
            </div>
        </div>
    </div>);


}
export default InscrireUtilisateur;