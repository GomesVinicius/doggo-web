import React, { useEffect, useState } from 'react';
import { Dialog } from '@material-ui/core';
import Button from '../../components/Button';
import Select from '../../components/Select';

import Navbar from '../../components/Navbar';

import './styles.css';
import Classes from '../../models/Class';
import api from '../../services/api';
import Activity from '../../models/Activiy';

const Rate = () => {
    const [subject, setSubject] = useState('');
    const [open, setOpen] = useState(false);

    const [classes, setClasses] = useState<Classes[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);

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
        })
    }, [])

    return (
        <>
            <Navbar />
            <div className="gambs">
                <div className="rate-area">

                    <Select
                        value={subject}
                        name="Atividade"
                        label="Atividade"
                        onChange={(e) => { setSubject(e.target.value) }}
                    >
                        <option value=""></option>
                        {activities.map(activity => (
                            <option key={activity.descricao} value={activity.descricao}>{activity.descricao}</option>
                        ))}

                    </Select>

                    <Select
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        name="turma"
                        label="Turma"
                    >
                        <option value=""></option>
                        {classes.map(classes => (
                            <option key={classes.nome} value={classes.nome}>{classes.nome}</option>
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
