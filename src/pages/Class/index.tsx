import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Navbar from '../../components/Navbar';
import Select from '../../components/Select';

import './styles.css'

const Class = () => {

    const [subject, setSubject] = useState('');

    return (
        <>
            <Navbar />

            <div className="gambs">
                <div className="area-class">
                    <div className="input-area-header">
                        <Input
                            label="Nome da Turma"
                            name="turma"
                            auxText="Nome da turma"
                        />
                        <Input
                            label="Semestre"
                            name="semestre"
                            auxText="Semestre"
                        />

                    </div>

                    <div className="input-area-footer">
                        <Input
                            label="Ano"
                            name="ano"
                            auxText="Ano"
                        />

                        <Select
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            name="subject"
                            label="Professores"
                        />
                    </div>
                </div>
                <Button label="Salvar" func={() => { }}></Button>
            </div>
        </>
    )
}

export default Class;
