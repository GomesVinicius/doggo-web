import React, { useState } from 'react';
import { Dialog } from '@material-ui/core';
import Button from '../../components/Button';
import Select from '../../components/Select';

import './styles.css';
import ModalDialog from '../ModalDialog';

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
                        { value: "Atividade 1", label: "Atividade 1" },
                        { value: "Atividade 2", label: "Atividade 2" },
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
    )
}

export default Rate;
