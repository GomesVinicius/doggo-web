import React from 'react';

import Doge from '../../assets/doge.png';
import './styles.css';

function InitialPage() {
    return (
        <div className="background-image">
            <div className="mark">
                <img src={Doge} alt="Doggo"/>
            </div>
        </div>

    );
}

export default InitialPage;
