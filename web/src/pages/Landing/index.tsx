import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import teachIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';
import api from '../../services/api';

const Landing: React.FC = () => {

  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('/connections').then(response => {
      const total = response.data;
      
      setTotalConnections(total);
    });
  }, []);


  return (
    <div id="page-landing">
        <div id="page-landing-content" className="container">
            <div className="logo-container">
                <img src={logoImg} alt="Proffy"/>
                <h2>Your online studing platform</h2>
            </div>

            <img 
                src={landingImg} 
                alt="Studing platform" 
                className="hero-image"
            />

            <div className="buttons-container">
                <Link to="study" className="study">
                    <img src={studyIcon} alt="Study"/>
                    Study
                </Link>

                <Link to="teach" className="teach">
                    <img src={teachIcon} alt="teach"/>
                    Teach
                </Link>
            </div>

            <span className="total-conections">
                More than {totalConnections} conections made <img src={purpleHeartIcon} alt="purple heart"/>
            </span>
        </div>
    </div>
  );
}

export default Landing;