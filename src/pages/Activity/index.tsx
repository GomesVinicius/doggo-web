import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Navbar from '../../components/Navbar';
import Select from '../../components/Select';
import Classes from '../../models/Class';
import api from '../../services/api';

import './styles.css';

const Activy = () => {
    const [value, setValue] = useState(0);
    const [classes, setClasses] = useState<Classes[]>([]);
    const [selectedClass, setSelectedClass] = useState<Classes>();
    const [selectedClassId, setSelectedClassId] = useState(0);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        api.get<Classes[]>('turma/listar').then(response => {
            const classes = response.data.map(classes => classes);
            setClasses(classes);
        })
    }, [])

    function handleCreateActivity() {
        const turma = classes.find(classes => classes.id == selectedClassId);

        api.post('atividade/salvar', {
            descricao: description,
            valor: value,
            data: date,
            turma
        }).then(() => {
            alert('Atividade criado com sucesso');
        }).catch(() => {
            alert('Não foi possível criar atividade');
        })
    }

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
                        maxLength={4}
                    />

                    <Select
                        value={selectedClassId}
                        onChange={(e) => { setSelectedClassId(Number(e.target.value)) }}
                        name="subject"
                        label="Turma"
                    >
                        <option value=""></option>
                        {classes.map(classes => (
                            <option key={classes.nome} value={classes.id}>{classes.nome}</option>
                        ))}
                    </Select>

                    <Input
                        label="Data"
                        name="data"
                        auxText="Data"
                        mask="date"
                        onChange={(e) => {setDate((e.target.value)) }}
                    />

                    <Input
                        label="Descrição"
                        name="descrição"
                        auxText="Descrição da atividade"
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </div>
                <Button label="Salvar" func={() => handleCreateActivity}></Button>
            </div >
        </>
    )
}

export default Activy;
