import "bootstrap/dist/css/bootstrap.min.css";
import "./inscription.css";
import { useState } from "react";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";


function inscrireUtilisateur() {

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
    return (
        <div>
            <Header scrolled={false} />
            <div className="inscription-container">
                <div className="inscription-wrapper">
                    <div className="inscription-header">
                        <h1 className="inscription-title">Formulaire D'inscription</h1>
                        <p className="inscription-subtitle">Créez votre compte CityEvents</p>
                    </div>

                    <form className="inscription-form" onSubmit={formInscription}>
                        {message && <div className={`form-message ${message.includes('succès') ? 'success' : 'error'}`}>{message}</div>}

                        <div className="form-group-wrap">
                            <div className="form-group-row">
                                <div className="form-field">
                                    <label htmlFor="nom" className="form-label">Nom</label>
                                    <input
                                        type="text"
                                        id="nom"
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                        className="form-input"
                                        placeholder="Entrez votre nom"
                                        required
                                    />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="prenom" className="form-label">Prénom</label>
                                    <input
                                        type="text"
                                        id="prenom"
                                        value={prenom}
                                        onChange={(e) => setPrenom(e.target.value)}
                                        className="form-input"
                                        placeholder="Entrez votre prénom"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-field">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input"
                                    placeholder="Entrez votre email"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="mdp" className="form-label">Mot de passe</label>
                                <input
                                    type="password"
                                    id="mdp"
                                    value={mdp}
                                    onChange={(e) => setMdp(e.target.value)}
                                    className="form-input"
                                    placeholder="Entrez un mot de passe sécurisé"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="tel" className="form-label">Numéro de téléphone</label>
                                <input
                                    type="tel"
                                    id="tel"
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                    className="form-input"
                                    placeholder="Entrez votre numéro de téléphone"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="inscription-btn">
                            Créer mon compte
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );


}
export default inscrireUtilisateur;
