import { Dialog } from '@material-ui/core';
import React, { FormEvent, useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Navbar from '../../components/Navbar';
import Select from '../../components/Select';
import ClassEdit from '../../Modals/Class';

import Teacher from '../../models/Teacher';

import api from '../../services/api';

import './styles.css'

const Class = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState<number>(0);

    const [className, setClassName] = useState('');
    const [classSemester, setClassSemester] = useState('');
    const [classYear, setClassYear] = useState(0);

    const year = new Date().getFullYear();

    const [open, setOpen] = useState(false);

    function handleOpenDialog() {
        setOpen(true);
    }

    function handleCLoseDialog() {
        setOpen(false);
    }

    useEffect(() => {
        api.get<Teacher[]>('professor/listar').then(response => {
            const teacher = response.data.map((teacher: Teacher) => teacher)
            setTeachers(teacher);
        })
    }, [])

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        if (!className || className.length <= 3)
            return alert('Nome da turma inválida');

        if (!classSemester || classSemester.length > 2)
            return alert('Semestre inválido');

        if (!classYear || classYear.toString().length !== 4 || classYear > year + 1 || classYear < 2010)
            return alert('Ano inválido')

        if (!selectedTeacherId)
            return alert('Selecione um professor')

        const professor = teachers.find(teacher => teacher.id === selectedTeacherId);

        api.post('turma/salvar', {
            nome: className,
            semestre: classSemester,
            ano: classYear,
            professor
        }).then(() => {
            alert('Turma criada com sucesso');
        }).catch(() => {
            alert('Ocorreu um erro inesperado');
        })
    }

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
                            onChange={(e) => { setClassName(e.target.value) }}
                        />
                        <Input
                            label="Semestre"
                            name="semestre"
                            auxText="Semestre"
                            onChange={(e) => { setClassSemester(e.target.value) }}
                        />

                    </div>

                    <div className="input-area-footer">
                        <Input
                            label="Ano"
                            name="ano"
                            auxText={year.toString()}
                            onChange={(e) => { setClassYear(Number(e.target.value)) }}
                            mask="year"
                        />

                        <Select
                            value={selectedTeacherId}
                            onChange={(e) => setSelectedTeacherId(Number(e.target.value))}
                            name="subject"
                            label="Professores"
                        >
                            <option value=""></option>
                            {teachers.map(teacher => (
                                <option key={teacher.cpf} value={teacher.id}>{teacher.nome}</option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="buttons">
                    <FaPencilAlt color="#e6af19" size={32} className="icon-edit" onClick={handleOpenDialog} />
                    <Button label="Salvar" func={() => handleCreateClass}></Button>
                </div>

                <Dialog
                    open={open}
                    onClose={handleCLoseDialog}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <ClassEdit />
                </Dialog>
            </div>
        </>
    )
}

export default Class;
