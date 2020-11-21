import React, { useEffect, useState } from 'react';
import { Dialog } from '@material-ui/core';
import Button from '../../components/Button';
import Select from '../../components/Select';

import './styles.css';
import ModalDialog from '../ModalDialog';
import Navbar from '../../components/Navbar';
import api from '../../services/api';

const Rate = () => {
    const [subject, setSubject] = useState('');
    const [open, setOpen] = useState(false);
    //const [teacher, setTeacher] = useState('');

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        api.get('/professor/listar').then(response => {
            console.log('data', response.data);
            console.log('status', response.status);
        })
    });

    return (
        <>
            <Navbar />
            <div className="gambs">
                <div className="rate-area">
                    <Select
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        name="turma"
                        label="Turma"
                        options={[
                            { value: "Uno", label: "Uno" },
                            { value: "Duo", label: "Duo" },
                        ]}
                    >
                    </Select>

                    <Select
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        name="atividade"
                        label="Atividade"
                        options={[
                            
                        ]}
                    >

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
                        <ModalDialog />
                    </Dialog>
                </div>
                <Button label="Salvar" func={() => { }}></Button>

            </div>
        </>
    )
}

export default Rate;
