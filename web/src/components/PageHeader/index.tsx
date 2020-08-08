import React from 'react';
import { Link } from 'react-router-dom';

import logoImage from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface pageHeaderProps {
  title: string,
  description?: string
}

const PageHeader: React.FC<pageHeaderProps> = (props) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="back"/>
        </Link>
        <img src={logoImage} alt="proffy"/>
      </div>

      <div className="header-content">
        <strong>{props.title}</strong>
        { props.children }
        { props.description && <p>{ props.description }</p> }
      </div>
    </header>
  );
}

export default PageHeader;