import React, { FormEvent, useEffect, useState } from 'react';
import { Dialog } from '@material-ui/core';
import Button from '../../components/Button';
import Select from '../../components/Select';

import Navbar from '../../components/Navbar';

import './styles.css';
import Classes from '../../models/Class';
import api from '../../services/api';
import Activity from '../../models/Activiy';

const Rate = () => {
    const [open, setOpen] = useState(false);

    const [classes, setClasses] = useState<Classes[]>([]);
    const [selectedClassId, setSelectedClassId] = useState(0);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivityId, setSelectedActivityId] = useState(0);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        api.get<Classes[]>('turma/listar').then(response => {
            const classes = response.data.map(classes => classes);
            setClasses(classes);
        });

        api.get<Activity[]>('atividade/listar').then(response => {
            const activities = response.data.map(activities => activities);
            setActivities(activities);
        });
    }, [])

    function handleSearchStudent(e: FormEvent) {
        e.preventDefault();

        
    }

    return (
        <>
            <Navbar />
            <div className="gambs">
                <div className="rate-area">

                    <Select
                        value={selectedActivityId}
                        name="Atividade"
                        label="Atividade"
                        onChange={(e) => { setSelectedActivityId(Number(e.target.value)) }}
                    >
                        <option value=""></option>
                        {activities.map(activity => (
                            <option key={activity.descricao} value={activity.id}>{activity.descricao}</option>
                        ))}

                    </Select>

                    <Select
                        value={selectedClassId}
                        onChange={(e) => { setSelectedClassId(Number(e.target.value)) }}
                        name="turma"
                        label="Turma"
                    >
                        <option value=""></option>
                        {classes.map(classes => (
                            <option key={classes.nome} value={classes.id}>{classes.nome}</option>
                        ))}
                    </Select>

                    <Button label="Buscar" func={() => handleOpen}></Button>
                    <Dialog
                        open={open}
                        keepMounted
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        className="modal"
                    >

                    </Dialog>
                </div>
                <Button label="Salvar" func={() => { }}></Button>

            </div>
        </>
    )
}

export default Rate;
