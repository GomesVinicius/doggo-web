import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Navbar from '../../components/Navbar';
import Select from '../../components/Select';

import './styles.css';

const Activy = () => {

    const [subject, setSubject] = useState('');

    return (
        <>
            <Navbar />
            <div className="gambs">
                <div className="activity-area">
                    <Input
                        label="Valor"
                        name="turma"
                        auxText="Valor"
                    />

                    <Select
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        name="subject"
                        label="Turma"
                    />

                    <Input
                        label="Data"
                        name="data"
                        auxText="Data"
                    />
                </div>
                <Button label="Salvar" func={() => { }}></Button>
            </div >
        </>
    )
}

export default Activy;
