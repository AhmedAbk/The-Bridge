import React from 'react';
import './Landing.css';
import Contact from '../Contact/Contact';
import Courses from '../Courses/Courses';

const LandingPage = () => {
  return (
    <div>
      <nav>
        <img src="https://9antra.tn/content/images/LogoBridge.png"  />
      </nav>
      <header>
        <div>
          <img src="https://academic-services.providence.edu/files/2020/06/JM4_4790-1024x683.jpg" alt="Étudiants au travail" />
          <div>
            <h2>
              Améliorez vos compétences de manière autonome <br /> Pour préparer un avenir meilleur
            </h2>
            <button>INSCRIVEZ-VOUS MAINTENANT</button>
          </div>
        </div>
      </header>
     
      <Courses />
 
      <Contact />
   
    </div>
  );
};

export default LandingPage;
