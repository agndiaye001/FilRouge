import React, { useState,useEffect,navigate  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReservationForm = ({ idWorkspace }) => {
    const [workspace, setWorkspace] = useState(null); // Pour stocker les détails de l'espace
    const [name, setName] = useState('');
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');
    const [total_price, setTotalPrice] = useState(0);
    const [status, setStatus] = useState('pending');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Récupérer les informations de l'espace (prix, capacité, etc.)
        axios.get(`http://127.0.0.1:8000/api/workspace/${idWorkspace}`)
            .then((response) => {
                setWorkspace(response.data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération de l'espace :", error);
            });
    }, [idWorkspace]);

   /* const calculateTotalPrice = () => {
        if (!start_time || !end_time || !workspace) return;
    
        const start = new Date(start_time);
        const end = new Date(end_time);
        // Durée en heures
        const durationInHours = (end - start) / 1000 / 60 / 60; 
    
        // Supposons que le prix soit basé sur le tarif horaire
       // const pricePerHour = workspace.pricing ? workspace.pricing.hourly_rate : 0;
       // const calculatedPrice = pricePerHour * durationInHours;
        

        // Mettre à jour le prix total
        setTotalPrice(calculatedPrice.toFixed(2));
      };
    */

    const handleSubmit = (e) => {
        e.preventDefault();

        const reservationData = {
            workspace: idWorkspace,
            name,
            start_time,
            end_time,
            //total_price,
            status,
        };

        axios.post('http://127.0.0.1:8000/api/reservations/', reservationData)
            .then((response) => {
                setMessage('Réservation réussie !');
                // Redirige vers la liste des réservations
                setTimeout(() => navigate('/reservations'), 2000);
            })
            .catch((error) => {
                setMessage('Erreur lors de la réservation.');
                console.error(error);
            });
    };

    return (
        <div className="reservation-form">
            <h2>Réserver cet espace</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nom de la réservation :</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="start_time">Heure de début :</label>
                    <input type="datetime-local" id="start_time" value={start_time} onChange={(e) => setStartTime(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="end_time">Heure de fin :</label>
                    <input type="datetime-local" id="end_time" value={end_time} onChange={(e) => setEndTime(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="total_price">Prix total :</label>
                    <input type="number" id="total_price" value={total_price} onChange={(e) => setTotalPrice(e.target.value)} required />
                </div>
                <div>
                    <button type="submit">Réserver</button>
                </div>
            </form>

            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
        </div>
    );
};
export default ReservationForm;
