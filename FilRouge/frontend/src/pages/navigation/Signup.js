import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios'; // Importez axios



const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const payload = {
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/signup/', payload); // Utilisez axios.post

      if (response.status === 201) {
        setIsSubmitted(true);  // Marquer la soumission comme réussie
        console.log('Inscription réussie !', response.data);
      }
    } catch (error) {
      // Gérer les erreurs venant de l'API ou du réseau
      if (error.response) {
        // Erreurs retournées par l'API (par exemple, erreur 400)
        setError(error.response.data.detail || "Une erreur est survenue.");
      } else {
        // Erreur réseau (par exemple, serveur non joignable)
        setError("Une erreur réseau s'est produite.");
      }
    }
    

  };



  useEffect(() => {
    if (isSubmitted) {
      // Rediriger vers la page de connexion après une inscription réussie
      setTimeout(() => {
        navigate('/usertypes/signin');
      }, 2000); // Attendez 2 secondes avant de rediriger
    }
  }, [isSubmitted, navigate]); // Utilisez le state isSubmitted comme dépendance


  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/tasse-cafe_74190-3571.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay semi-transparent */}

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
          {/* Form Title */}
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Inscription
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Votre mot de passe"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmez votre mot de passe"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
            >
              S'inscrire
            </button>
          </form>

          {/* Toggle to Login */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte ?
              <a
                href="/usertypes/signin"
                className="text-blue-600 font-medium hover:underline ml-2"
              >
                Connectez-vous
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
