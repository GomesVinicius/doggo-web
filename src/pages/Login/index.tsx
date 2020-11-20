import React from 'react';

import Logo from '../../assets/logo.png';

import Input from "../../components/Input";
import Footer from '../../components/Footer';

import { Link } from 'react-router-dom'

import './styles.css';

const Login = () => {
    return (
        <>
            <div className="container">
                <div className="image-container">
                    <h1 className="text">Doggo</h1>
                    {/*<h6>Não deixe que os preceitos te definam.</h6>*/}

                    <img src={Logo} alt="Doggo" />
                </div>
                <form>
                    <h1 className="text">Doggo</h1>

                    <Input label="Usuário" name="user" auxText="Insira seu usuário" />
                    &nbsp;
                    <Input label="Senha" name="password" auxText="Insira sua senha" type="password" />
                    <Link to="/initial-page">
                        <button type="button">
                            Entrar
                        </button>
                    </Link>

                </form>
            </div>
            <Footer />
        </>
    );
};

export default Login;
