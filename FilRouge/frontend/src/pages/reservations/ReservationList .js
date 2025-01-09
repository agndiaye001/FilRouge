import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationList = ({ userId }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Appel API pour récupérer les réservations d'un utilisateur
    axios.get(`http://127.0.0.1:8000/api/reservations/`, {
      params: { user: userId }
    })
      .then((response) => {
        setReservations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des réservations :", error);
        setError('Erreur lors de la récupération des réservations');
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Chargement des réservations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="reservation-list">
      <h2>Vos réservations</h2>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.idReservation}>
            <h3>{reservation.name}</h3>
            <p>Space: {reservation.workspace.workspace_type}</p>
            <p>De {reservation.start_time} à {reservation.end_time}</p>
            <p>Statut : {reservation.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
