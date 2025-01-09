import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/navbar';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import { Link } from 'react-router-dom';
import SearchBarHome from './navigation/search/SearchBarHome';



const Home = () => {



  return (
    <div>
      <Navbar />
      <Header />
      <main className="container mx-auto px-4 py-6">
        
        <section className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-800">Nos Espaces de Travail</h2>
          <p className="text-gray-600 mt-2">Choisissez parmi nos bureaux, salles de réunion, ou espaces partagés.</p>
        </section>

        <section className="hero-section py-12 bg-gray-100">
          <div className="hero-content container mx-auto flex flex-col md:flex-row items-center px-6 space-y-8 md:space-y-0">
            {/* Partie gauche : texte */}
            <div className="hero-text flex-1 text-center md:text-left md:pr-12">
              <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-0 mb-4 text-gray-900">
                Location d'une salle de réunion
              </h1>

              <p className="hero-subtitle mb-6 text-lg sm:text-xl text-gray-700">
                Découvrez nos lieux partout en France
              </p>

              <a
                className="btn btn-lg btn-primary mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                href="/usertypes/signup"
              >
                Reserver maintenant
              </a>

              <ul className="list-unstyled text-left text-gray-600 space-y-5 mt-5">
                <li>
                  <i className="fas fa-check mr-2 text-green-500"></i>
                  Soyez flexible
                </li>
                <li>
                  <i className="fas fa-check mr-2 text-green-500"></i>
                  Les meilleurs tarifs sur le marché
                </li>
                <li>
                  <i className="fas fa-check mr-2 text-green-500"></i>
                  Une équipe d'experts pour vous accompagner
                </li>
              </ul>
            </div>

            {/* Partie droite : image */}
            <div className="hero-image flex-1 mt-8 md:mt-0">
              <img
                srcSet="https://kactus-assets.gumlet.io/assets/seo/categories/meeting@2x-fdbc15503628c88c9d4f02ddfc2c4dbae3a05d8f139d0f932aa7dcc21fa6630b.webp 2x, https://kactus-assets.gumlet.io/assets/seo/categories/meeting@3x-ba2b068c4083c2b3cd108400434a8c5e4f4768b909ef7a7db9cfee640f4d85b0.webp 3x"
                width="auto"
                height="540"
                alt="Salle de réunion"
                className="w-full h-auto rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* <section className="hero-section py-12 bg-gray-100">
          <div className="container mx-auto">
            <div className="scroll-banner">
              <ul className="flex space-x-12 m-0 p-0 list-none">
                <li>
                  <i className="fab fa-apple text-3xl" aria-hidden="true"></i>
                </li>
                <li>
                  <i className="fab fa-google text-3xl" aria-hidden="true"></i>
                </li>
                <li>
                  <i className="fab fa-microsoft text-3xl" aria-hidden="true"></i>
                </li>
                <li>
                  <i className="fab fa-amazon text-3xl" aria-hidden="true"></i>
                </li>
              </ul>
            </div>
          </div>
        </section>
        */}

        <section className="bg-white py-16">
          <div className="container mx-auto px-6">
            {/* Titre et Description */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Les meilleures salles pour vos réunions avec WorkspaceHube</h2>
              <p className="text-lg text-gray-700">
                Vous cherchez une salle de réunion idéale pour votre prochain événement professionnel ? WorkspaceHub vous aide à trouver l'espace parfait, adapté à vos besoins uniques.
              </p>
            </div>

            {/* Section Texte + Image */}
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Pourquoi choisir WorkspaceHub ?</h3>
                <p className="text-lg text-gray-600 mb-4">
                  Grâce à notre expertise, nous vous proposons une sélection sur-mesure, répondant à vos critères spécifiques. Trouvez votre salle en quelques clics et bénéficiez de notre accompagnement.
                </p>
                <p className="text-lg text-gray-600">
                  WorkspaceHub parcourt la France pour vous offrir des lieux uniques et adaptés à tous vos événements, qu'ils soient professionnels ou créatifs. Chaque lieu est rigoureusement sélectionné pour sa qualité et son ambiance.
                </p>
              </div>

              <div className="flex-1">
                <img
                  src="https://img.freepik.com/photos-premium/elegante-salle-lecture-bibliotheque-fauteuil-pour-se-detendre-espace-pour-texte-rendu-3d_360032-1277.jpg?w=1060"
                  alt="Salle de réunion"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
              <Link
                to="/search"  
                className="px-8 py-4 bg-primary text-white rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105"
              >
                Trouvez votre salle maintenant
              </Link>
              
            </div>
          </div>
        </section>

        <section>
          <workspace />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
