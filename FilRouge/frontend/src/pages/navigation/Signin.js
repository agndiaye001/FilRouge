import React, { useState } from 'react';


const Signin = () => {
  const [isLogin, setIsLogin] = useState(true); 

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
            {isLogin ? 'Connexion' : 'Inscription'}
          </h2>

          {/* Form */}
          <form>
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                placeholder="Votre mot de passe"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
            >
              {isLogin ? 'Se connecter' : 'S\'inscrire'}
            </button>
          </form>

          {/* Toggle Form (Login / Signup) */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Vous n'avez pas de compte ?" : 'Vous avez déjà un compte ?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 font-medium hover:underline ml-2"
              >
                {isLogin ? 'Inscrivez-vous' : 'Connectez-vous'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
