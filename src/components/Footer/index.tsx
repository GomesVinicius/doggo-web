import React from 'react';
import Emoji from '../Emoji';

import './styles.css'

function Footer() {
    return (
        <footer>
            <div className="repo">
                <a href="https://github.com/PedroAugustoPTC/tads_tema2">Repositório</a>
                &nbsp;<Emoji label="sheep" symbol="🚀"/>
            </div>
            <div className="signature">
                By: &nbsp;
                <a href="https://github.com/GomesVinicius">Vinícius Gomes</a>
                <Emoji label="estranho" symbol="👺"/>&nbsp;&nbsp;
                <a href="https://github.com/PedroAugustoPTC">Pedro Augusto</a>
                <Emoji label="doido" symbol="🤯"/>&nbsp;&nbsp;
                <a href="github.com/GomesVinicius">Outro Pedro</a>
                <Emoji label="padre" symbol="👼"/>&nbsp;&nbsp;
                <a href="github.com/GomesVinicius">Neithan Otni</a>
                <Emoji label="capeta" symbol="😈"/>&nbsp;&nbsp;
            </div>
        </footer>
    )
}

export default Footer;
