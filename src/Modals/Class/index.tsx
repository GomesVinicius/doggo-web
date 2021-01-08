import { DialogContent, DialogTitle } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Classes from '../../models/Class';
import Teacher from '../../models/Teacher';
import api from '../../services/api';

const ClassEdit = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [classes, setClasses]  = useState<Classes[]>([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState<number>(0);
    const [selectedClassId, setSelectedClassId] = useState<number>(0);

    const [className, setClassName] = useState('');
    const [classSemester, setClassSemester] = useState('');
    const [classYear, setClassYear] = useState<number>();

    const year = new Date().getFullYear();

    function classSelected(idClass: number) {
        api.get<Classes>(`turma/listar/id=${idClass}`).then(response => {
            setClassName(response.data.nome);
            setClassSemester(response.data.semestre);
            setClassYear(response.data.ano);
        }).catch((err) => {
            console.log('Erro', err);
        });
    }

    function handleAlterClass() {
        if (!classSemester || classSemester.length > 2)
            return alert('Semestre inválido');

        if (!classYear || classYear.toString().length !== 4 || classYear > year + 1 || classYear < 2010)
            return alert('Ano inválido')

        if (!selectedTeacherId)
            return alert('Selecione um professor')

        const professor = teachers.find(teacher => teacher.id === selectedTeacherId);

        api.put(`turma/atualizar/id=${selectedClassId}`, {
            //id: selectedClassId,
            nome: className,
            semestre: classSemester,
            ano: classYear,
            professor
        }).then((response) => {
            alert('Turma alterada com sucesso');
            console.log(response)
        }).catch((err) => {
            alert('Ocorreu um erro inesperado');
        });
    }

    function handleGetClasses() {
        api.get<Classes[]>('turma/listar').then(response => {
            const classes = response.data.map(classes => classes);
            setClasses(classes);
        }).catch((err) => {
            console.log('error', err);
        });
    }

    function handleRemoveClass() {
        api.delete(`turma/deletar/id=${selectedClassId}`).then(response => {
            alert('Turma removida');
            handleGetClasses();
        }).catch((err) => {
            alert('Turma não foi removida');
            console.log(err);
        })
    }

    useEffect(() => {
        api.get<Teacher[]>('professor/listar').then(response => {
            const teacher = response.data.map((teacher: Teacher) => teacher)
            setTeachers(teacher);
        });
        handleGetClasses();
    }, []);


    return (
        <>
            <DialogTitle id="alert-dialog-slide-title">Editar turma</DialogTitle>

            <DialogContent>

                <Select
                    value={selectedClassId}
                    onChange={(e) => { setSelectedClassId(Number(e.target.value)); classSelected(Number(e.target.value)); }}
                    name="turma"
                    label="Turma"
                >
                    <option value="" hidden></option>
                    {classes.map(classes => (
                        <option key={classes.nome} value={classes.id}>{classes.nome}</option>
                    ))}
                </Select>

                <Input
                    label="Nome da Turma"
                    name="turma"
                    value={className}
                    onChange={(e) => { setClassName(e.target.value) }}
                />
                <Input
                    label="Semestre"
                    name="semestre"
                    value={classSemester}
                    onChange={(e) => { setClassSemester(e.target.value) }}
                />

                <Input
                    label="Ano"
                    name="ano"
                    value={classYear}
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

                <Button func={() => handleAlterClass} label="Editar" color="#e6af19" />
                <Button func={() => handleRemoveClass} label="Remover" color="#e6af19" />

            </DialogContent>
        </>
    )
}

export default ClassEdit;
