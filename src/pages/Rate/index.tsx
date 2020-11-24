import React, { useState } from 'react';
import { Dialog } from '@material-ui/core';
import Button from '../../components/Button';
import Select from '../../components/Select';

import Navbar from '../../components/Navbar';

import './styles.css';

const Rate = () => {
    const [subject, setSubject] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Navbar />
            <div className="gambs">
                <div className="rate-area">

                    <Select
                        value={subject}
                        name="atividade"
                        label="atividade"
                        onChange={(e) => { setSubject(e.target.value) }}
                    >
                        <option value="" disabled hidden></option>

                    </Select>

                    <Select
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        name="turma"
                        label="Turma"
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

                    </Dialog>
                </div>
                <Button label="Salvar" func={() => { }}></Button>

            </div>
        </>
    )
}

export default Rate;
