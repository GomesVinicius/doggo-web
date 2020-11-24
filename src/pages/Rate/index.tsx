import React, { useEffect, useState } from 'react';
import { Dialog } from '@material-ui/core';
import Button from '../../components/Button';
import Select from '../../components/Select';

//import ModalDialog from '../ModalDialog';
import Navbar from '../../components/Navbar';

import api from '../../services/api';

import './styles.css';

interface Teacher {
    cpf: string,
    email: string,
    nome: string
}

const Rate = () => {
    const [subject, setSubject] = useState('');
    const [open, setOpen] = useState(false);
    const [teacher, setTeacher] = useState<Teacher[]>([]);
    const [professorName, setProfessorName] = useState<string[]>([]);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        api.get<Teacher[]>('/professor/listar').then(response => {
            const teacherName = response.data.map((professor: Teacher) => professor.nome);
            setProfessorName(teacherName);
        })
    }, []);

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
                    >
                    </Select>

                    <Select
                        value={subject}
                        name="atividade"
                        label="atividade"
                        onChange={(e) => { setSubject(e.target.value) }}
                    >
                        <option value="" disabled hidden></option>
                        {professorName.map(nome => (
                            <option key={nome} value={nome}>{nome}</option>
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
