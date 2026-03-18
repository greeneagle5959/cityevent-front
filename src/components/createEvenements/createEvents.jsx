import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./createEvents.css";

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
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');


    const formCreateEvent = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('address', address);
        formData.append('price', price);
        formData.append('seats', seats);
        formData.append('dateStart', dateStart);
        formData.append('dateEnd', dateEnd);
        formData.append('cityName', cityName);
        formData.append('categoryName', categoryName);



        const files = Array.from(images).slice(0, 3);

        files.forEach(file => {
            formData.append("images[]", file);
        });

        if (images.length > 3) {
            setMessage("Seulement 3 images ont été prises");
        }
        // recuperer id de lutilisateur

        const tokenId = localStorage.getItem("token");


        const connecterResponse = await fetch("http://127.0.0.1:8000/api/v1/users/connecter", {
            method: 'GET',
            headers: { Authorization: "Bearer " + tokenId }
        });
        if (!connecterResponse.ok) {
            setMessage("Impossible de récupérer l'utilisateur");
            return;
        }
        const connecterData = await connecterResponse.json();

        //////////////////////////
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/events_add/${connecterData.userId}/event`,
                {
                    method: 'POST',
                    headers: { Authorization: "Bearer " + tokenId },
                    body: formData
                }
            );
            const data = await response.json();

            if (!response.ok) {
                setMessage(data.erreur || "Erreur tout les champ doivent etre remplie ");
                return;
            }

            setMessage(data.success || "Événement ajouté avec succès !");


            setTitle('');
            setDescription('');
            setAddress('');
            setPrice('');
            setSeats('');
            setDateStart('');
            setDateEnd('');
            setCityName('');
            setCategoryName('');
            setImages([]);
        } catch {
            setMessage("Erreur serveur ");
        }
    };

    return (
        <div className="create-event-container">
            <div className="create-event-card">
                <div className="create-event-header">
                    <h1> Créer un Nouvel Événement</h1>
                    <p>Remplissez le formulaire pour ajouter votre événement</p>
                </div>

                {message && (<div ><span>{message}</span> </div>)}
                <form onSubmit={formCreateEvent}>
                    <label>Catégorie</label>
                    <input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} className="form-control" />
                    <label>Titre Evenement</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-control" />
                    <label>Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} className="form-control"></textarea>

                    <label>Prix</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="form-control" />

                    <label>Nombre de place</label>
                    <input type="text" value={seats} onChange={e => setSeats(e.target.value)} className="form-control" />

                    <label>inserer vos images</label>
                    <input type="file" multiple onChange={e => setImages(Array.from(e.target.files))} className="form-control" />
                    <div className="row">
                        <div className="col-lg-6">
                            <label>Date de début</label>
                            <input type="datetime-local" value={dateStart} onChange={e => setDateStart(e.target.value)} className="form-control" />
                        </div>
                        <div className="col-lg-6">
                            <label>Date de fin</label>
                            <input type="datetime-local" value={dateEnd} onChange={e => setDateEnd(e.target.value)} className="form-control" />
                        </div>
                    </div>
                    <label>Adresse</label>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="form-control" />

                    <label>Ville</label>
                    <input type="text" value={cityName} onChange={e => setCityName(e.target.value)} className="form-control" />
                    <button type="submit" className="btn btn-primary mt-3">Valider</button>
                </form>
            </div>
        </div>
    );
}

export default CreateEvent;


