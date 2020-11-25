import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Navbar from '../../components/Navbar';
import Select from '../../components/Select';
import Classes from '../../models/Class';
import api from '../../services/api';

import './styles.css';

const Activy = () => {
    const [subject, setSubject] = useState('');

    const [value, setValue] = useState(0);
    const [classes, setClasses] = useState<Classes[]>([]);
    const [date, setDate] = useState();
    const [description, setDescription] = useState('');

    useEffect(() => {
        api.get<Classes[]>('turma/listar').then(response => {
            const classes = response.data.map(classes => classes);
            setClasses(classes);
        })
    }, [])

    return (
        <>
            <Navbar />
            <div className="gambs">
                <div className="activity-area">
                    <Input
                        label="Valor"
                        name="turma"
                        auxText="Valor"
                        onChange={(e) => { setValue(Number(e.target.value)) }}
                    />

                    <Select
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        name="subject"
                        label="Turma"
                    >
                        <option value=""></option>
                        {classes.map(classes => (
                            <option key={classes.nome} value={classes.nome}>{classes.nome}</option>
                        ))}
                    </Select>

                    <Input
                        label="Data"
                        name="data"
                        auxText="Data"

                    />

                    <Input
                        label="Descrição"
                        name="descrição"
                        auxText="Descrição da atividade"
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </div>
                <Button label="Salvar" func={() => { }}></Button>
            </div >
        </>
    )
}

export default Activy;
