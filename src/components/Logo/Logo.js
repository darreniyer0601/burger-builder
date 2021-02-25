import React from 'react';

import './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.jpeg';

const logo = (props) => (
    <div className="Logo">
        <img src={burgerLogo} alt="MyBurger"></img>
    </div>
);

export default logo;