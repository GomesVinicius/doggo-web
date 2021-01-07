import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Classes from '../../../models/Class';
import Student from '../../../models/Student';
import api from '../../../services/api';

const StudentEdit = () => {
    const [classes, setClasses] = useState<Classes[]>([]);
    const [selectedClass, setSelectedClass] = useState<Classes>();
    const [selectedClasses, setSelectedClasses] = useState<Classes[]>([]);
    //const [selectedClassId, setSelectedClassId] = useState(0);
    const selectedClassId: number[] = [];

    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudentId, setSelectStudentId] = useState(0);

    const [studentName, setStudentName] = useState('');
    const [studentRegistration, setStudentRegistration] = useState('');
    const [studentCpf, setStudentCpf] = useState('');
    const [studentEmail, setStudentEmail] = useState('');

    useEffect(() => {
        api.get<Classes[]>('turma/listar').then(response => {
            const classes = response.data.map(classes => classes);
            setClasses(classes);
        });
        handleGetStudents();
    }, []);

    function handleGetStudents() {
        api.get<Student[]>('aluno/listar').then(response => {
            const students = response.data.map(student => student);
            setStudents(students);
            console.log(students);
        }).catch((err) => {
            console.log('deu erro', err);
        });
    }

    function studentsSelected(idStudent: number) {
        api.get<Student>(`aluno/listar/id=${idStudent}`).then((response) => {
            setStudentName(response.data.nome);
            setStudentRegistration(response.data.matricula);
            setStudentCpf(response.data.cpf);
            setStudentEmail(response.data.email);
        }).catch(() => {
            alert('deu erro');
        })
    }

    function handleAlterStudent() {
        console.log(selectedClassId);
        console.log(classes);
        if (!studentName || studentName.length <= 3)
            return alert('Nome inválido');

        if (studentEmail.length <= 6 || !studentEmail.includes('@'))
            return alert('E-mail inválido');

        if (!studentCpf || studentCpf.length !== 14)
            return alert('CPF inválido');

        if (studentRegistration.length !== 6 || !Number(studentRegistration))
            return alert('Matrícula inválida');

        if (!selectedClass)
            return alert('Selecione uma turma');

        for (let i = 0; i < selectedClassId.length; i++) {
            let selected: any;
            selected = classes.filter(classes => classes.id == selectedClassId[i]);
            selectedClasses.push(selected);
        }

        api.put('aluno/atualizar', {
            nome: studentName,
            email: studentEmail,
            cpf: studentCpf,
            matricula: studentRegistration,
            listaTurma: selectedClasses
        }).then(() => {
            alert('Aluno Alterado');
            clearInputs();
            handleGetStudents();
        }).catch(() => {
            alert('Erro inesperado');
        });
    }

    function handleRemoveStudent() {
        api.delete<Student>(`aluno/deletar/cpf=${studentCpf}`).then((response) => {
            alert('Aluno removido');
        }).catch((err) => {
            alert('Não foi possível remover o aluno');
            console.log(err);
        });
    }

    function clearInputs() {
        setStudentRegistration('');
        setStudentName('');
        setStudentEmail('');
        setStudentCpf('');
    }

    return (
        <>
            <DialogTitle id="alert-dialog-slide-title">Editar aluno</DialogTitle>


            <DialogContent>
                <div className="area-input">
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
                    </Select>
                    <Input
                        label="Nome"
                        name="nome"
                        value={studentName}
                        onChange={((e) => { setStudentName(e.target.value) })}
                    />
                    <Input
                        label="Matrícula"
                        name="matricula"
                        mask="register"
                        value={studentRegistration}
                        onChange={((e) => { setStudentRegistration(e.target.value) })}
                    />
                    <Input
                        label="CPF"
                        name="cpf"
                        value={studentCpf}
                        onChange={((e) => { setStudentCpf(e.target.value) })}
                        mask="cpf"
                    />
                    <Input
                        label="E-mail"
                        name="email"
                        value={studentEmail}
                        onChange={((e) => { setStudentEmail(e.target.value) })}

                    />
                </div>
                <p style={{ fontSize: 24 }}>Turmas</p>

                <div className="container-radio" style={{ width: '29rem' }}>
                    {classes.map(classes => (
                        <div key={classes.professor.nome}>

                            <input type="checkbox" id={classes.nome} value={classes.id} name="classes" onChange={(e) => {
                                console.log(e.target.value);
                                selectedClassId.push(Number(e.target.value));
                                selectedClasses.push(classes);
                                setSelectedClass(classes);
                                console.log(selectedClassId, selectedClasses)
                            }}

                            />
                            <label htmlFor={classes.nome}>{classes.nome}</label>
                        </div>
                    ))}
                </div>

                <Button func={() => handleAlterStudent} label="Editar" color="#e6af19" />
                <Button func={() => handleRemoveStudent} label="Remover" color="#e6af19" />

            </DialogContent>
        </>
    )
}

export default StudentEdit;
