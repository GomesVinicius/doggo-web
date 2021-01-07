import { Dialog } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Navbar from '../../components/Navbar';
import Select from '../../components/Select';
import ActivityEdit from '../../Modals/Activies';
import Classes from '../../models/Class';
import api from '../../services/api';

import './styles.css';

const Activy = () => {
    const [value, setValue] = useState(0);
    const [classes, setClasses] = useState<Classes[]>([]);
    const [selectedClassId, setSelectedClassId] = useState(0);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    
    const [open, setOpen] = useState(false);

    function handleOpenDialog() {
        setOpen(true);
    }

    function handleCLoseDialog() {
        setOpen(false);
    }

    useEffect(() => {
        api.get<Classes[]>('turma/listar').then(response => {
            const classes = response.data.map(classes => classes);
            setClasses(classes);
        })
    }, []);

    function handleCreateActivity() {
        if (!Number(value) || value > 100)
            return alert('Nota inválida');

        if (!description || description.length < 10)
            return alert('Descrição inválida');

        if (!date || date.length !== 10)
            return alert('Descrição inválida');

        if (!selectedClassId)
            return alert('Selecione uma turma');

        const turma = classes.find(classes => classes.id === selectedClassId);

        api.post('atividade/salvar', {
            descricao: description,
            valor: value,
            data: date,
            turma
        }).then(() => {
            alert('Atividade criado com sucesso');
        }).catch(() => {
            alert('Erro inesperado');
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
                        maxLength={3}
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
                        onChange={(e) => { setDate((e.target.value)) }}
                    />

                    <Input
                        label="Descrição"
                        name="descrição"
                        auxText="Descrição da atividade"
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </div>
                <div className="buttons">
                    <FaPencilAlt color="#e6af19" size={32} className="icon-edit" onClick={handleOpenDialog} />
                    <Button label="Salvar" func={() => handleCreateActivity}></Button>
                </div>
            </div >
            <Dialog
                open={open}
                onClose={handleCLoseDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <ActivityEdit />
            </Dialog>
        </>
    )
}

export default Activy;
