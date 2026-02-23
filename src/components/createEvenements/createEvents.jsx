import "bootstrap/dist/css/bootstrap.min.css";
import "./createEvents.css";

import { useState } from "react";



function CreateEvent() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [seats, setSeats] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [cityName, setCityName] = useState('');
    const [categoryName, setCategoryName] = useState('');

    const [message, setMessage] = useState('');

    const formCreateEvent = async (e) => {

        e.preventDefault();

        const reponse = await fetch('http://127.0.0.1:8000/api/v1/events_add/{id}/event', {
            method: 'POST',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({ title, description, address, price, seats, dateStart, dateEnd, cityName, categoryName })
        });
        const data = await reponse.json();
        if (!reponse.ok) {
            setMessage(data.erreur);
            return;

        }
        setMessage(data.success);
        setTitle('');
        setDescription('');
        setAddress('');
        setPrice('');
        setSeats('')
        setDateStart('')
        setDateEnd('')
        setCityName('')
        setCategoryName('')
    }

    return (<div>
                <div className="row ">
                    <div className="col-lg-6 mx-auto">
                        <h1>Formulaire D'inscription</h1>
                        <form onSubmit={formCreateEvent}>
                            {message && <div className="alert alert-danger">{message}</div>}
                            <label>Titre Evenement</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
                            <label>description Evenement</label>
                            <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" ></textarea>
                            <label>Mot de passe</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" />
                            <label>Numero de telephone</label>
                            <input type="numbre" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" />
                            <label>Nombre de place</label>
                            <input type="text" value={seats} onChange={(e) => setSeats(e.target.value)} className="form-control" />
                            <label>Date de debut</label>
                            <input type="datetime-local" value={dateStart} onChange={(e) => setDateStart(e.target.value)} className="form-control" />
                            <label>Date de fin</label>
                            <input type="datetime-local" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} className="form-control" />
                            <label>Adresse </label>
                            <input type="name" name="adresse" id="adresse" value={cityName} onChange={(e) => setCityName(e.target.value)} className="form-control" placeholder="Adresse" />
                            <input class="form-control" name="cp" id="cp" type="text" placeholder="CP" />
                            <input class="form-control" name="ville" id="ville" type="text" placeholder="Ville" />
                            <label>La Categorie</label>
                            <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="form-control" />
                            <button type="submit" className="btn btn-primary mt-3">Valider</button>
                        </form>
                    </div>
                </div>
            </div>
        );

}
export default CreateEvent;
