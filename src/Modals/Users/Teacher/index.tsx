import { DialogContent, DialogTitle, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Teacher from '../../../models/Teacher';
import api from '../../../services/api';


const TeacherEdit = () => {
    const [teacherName, setTeacherName] = useState('');
    const [teacherEmail, setTeacherEmail] = useState('');
    const [teacherCpf, setTeacherCpf] = useState('');

    const [selectedTeacher, setSelectedTeacher] = useState<Teacher>();
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState(0);

    useEffect(() => {
        handleGetTeachers();
    }, []);

    function handleGetTeachers() {
        api.get<Teacher[]>('professor/listar').then(response => {
            const teachers = response.data.map(teacher => teacher);
            setTeachers(teachers);
        }).catch((err) => {
            console.log('Erro ao carregar professores', err);
        })
    }

    function handleAlterTeacher() {
        if (!teacherName || teacherName.length <= 3)
            return alert('Insira os dados corretamente');

        if (teacherEmail.length <= 6 || !teacherEmail.includes('@'))
            return alert('E-mail inválido');

        if (!teacherCpf || teacherCpf.length !== 14)
            return alert('CPF inválido');

        api.put<Teacher>('professor/atualizar', {
            id: selectedTeacherId,
            nome: teacherName,
            email: teacherEmail,
            cpf: teacherCpf,
        }).then(response => {
            alert('Professor alterado');
            clearInputs();
            handleGetTeachers();
        }).catch((err) => {
            alert('Erro inesperado');
        })
    }

    function teacherSelected(idTeacher: number) {
        console.log(idTeacher);
        api.get<Teacher>(`professor/listar/id=${idTeacher}`).then((response) => {
            setTeacherCpf(response.data.cpf);
            setTeacherEmail(response.data.email);
            setTeacherName(response.data.nome);
        }).catch(() => {
            alert('Deu erro');
        });
    }

    function handleRemoveTeacher() {
        api.delete<Teacher>(`professor/deletar/cpf=${teacherCpf}`).then((response) => {
            console.log(response);
            console.log(teacherCpf);
            alert('Professor excluído com sucesso');
        }).catch((err) => {
            alert('Erro ao excluir professor');
            console.log(err);
        });
    }

    function clearInputs() {
        setTeacherCpf('');
        setTeacherEmail('');
        setTeacherName('');
    }

    return (
        <>
            <DialogTitle id="alert-dialog-slide-title">Editar professor</DialogTitle>

            <DialogContent>
                <Select
                    value={selectedTeacherId}
                    onChange={(e) => { setSelectedTeacherId(Number(e.target.value)); teacherSelected(Number(e.target.value)); }}
                    name="professor"
                    label="Professores"
                >
                    <option value="" hidden></option>
                    {teachers.map(teacher => (
                        <option key={teacher.nome} value={teacher.id}>{teacher.nome}</option>
                    ))}
                </Select>

                {/*
                    <Select
                        value={selectedStudentId}
                        onChange={(e) => { setSelectStudentId(Number(e.target.value)); studentsSelected(Number(e.target.value)) }}
                        name="aluno"
                        label="Alunos"
                    >
                        <option value="" hidden></option>
                        {students.map(students => (
                            <option key={students.nome} value={students.id}>{students.nome} - {students.turmas.map(studentClasses => studentClasses.nome) + ''}</option>
                        ))}
                    </Select> */}

                <Input
                    label="Nome"
                    name="nome"
                    value={teacherName}
                    onChange={(e) => { setTeacherName(e.target.value) }}
                />
                <Input
                    label="E-mail"
                    name="email"
                    value={teacherEmail}
                    onChange={(e) => { setTeacherEmail(e.target.value) }}
                />
                <Input
                    label="CPF"
                    name="cpf"
                    value={teacherCpf}
                    onChange={(e) => { setTeacherCpf(e.target.value) }}
                    mask="cpf"
                />

                <Button func={() => handleAlterTeacher} label="Editar" color="#e6af19" />
                <Button func={() => handleRemoveTeacher} label="Excluir" color="#e6af19" />
            </DialogContent>
        </>
    )
}

export default TeacherEdit;
