import React from 'react';
import { Link } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa'

import { Data } from './data';

import Doge from '../../assets/doge.png';

import './styles.css';

const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <p>Doggo</p>
                    <div>
                        <Link to="/">
                            <FaPowerOff size={32} className="icon" color="#000"/>
                        </Link>
                    </div>
                </Link>
            </div>
            <nav className="nav-menu active">
                <ul className="nav-menu-items">
                    <Link to="#" className="menu-bars">
                        <img src={Doge} alt="Doggo" />
                    </Link>
                    <li className="navbar-toogle">

                        {Data.map((item, index: number) => {
                            return (
                                <Link
                                    to={item.path}
                                    id={item.id}
                                    key={item.id}
                                >
                                    <span className={item.cName}>{item.title}</span>
                                </Link>
                            );
                        })}
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;
