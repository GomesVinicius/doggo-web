import React, { FormEvent, useEffect, useState } from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import './styles.css';
import Navbar from '../../components/Navbar';
import api from '../../services/api';
import Classes from '../../models/Class';

const User = () => {
    const [typeUser, setTypeUser] = useState('aluno');

    const [classes, setClasses] = useState<Classes[]>([]);
    const [selectedClass, setSelectedClass] = useState<Classes>();

    const [teacherName, setTeacherName] = useState('');
    const [teacherEmail, setTeacherEmail] = useState('');
    const [teacherCpf, setTeacherCpf] = useState('');

    const [studentName, setStudentName] = useState('');
    const [studentRegistration, setStudentRegistration] = useState('');
    const [studentCpf, setStudentCpf] = useState('');
    const [studentEmail, setStudentEmail] = useState('');


    const handleChangeTypeUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeUser((event.target as HTMLInputElement).value);
    }

    function handleCreateUser(e: FormEvent) {
        e.preventDefault();

        if (typeUser === 'professor') {
            handleCreateTeacher();
        } else {
            console.log();
            handleCreateStudent();
        }
    }

    function handleCreateTeacher() {

        if (!teacherName || teacherName.length <= 3)
            return alert('Insira os dados corretamente');

        if (teacherEmail.length <= 6 || !teacherEmail.includes('@') || !teacherEmail.includes('.com'))
            return alert('E-mail inválido');
        
        if (!teacherCpf || teacherCpf.length !== 14)
            return alert('CPF inválido');

        api.post('professor/salvar', {
            nome: teacherName,
            email: teacherEmail,
            cpf: teacherCpf
        }).then(() => {
            alert('Professor criado');
            clearInputs();
        }).catch((error) => {
            alert(error);
        });
    }

    function handleCreateStudent() {
        if (!studentName || studentName.length <= 3)
            return alert('Nome inválido');

        if (studentEmail.length <= 6 || !studentEmail.includes('@') || !studentEmail.includes('.com') )
            return alert('E-mail inválido');

        if (!studentCpf || studentCpf.length !== 14)
            return alert('CPF inválido');

        if (studentRegistration.length !== 6 || !Number(studentRegistration))
            return alert('Matrícula inválida');

        if (!selectedClass)
            return alert('Selecione uma turma');

        api.post('aluno/salvar', {
            nome: studentName,
            email: studentEmail,
            cpf: studentCpf,
            matricula: studentRegistration,
            listaTurma: [selectedClass]
        }).then(() => {
            alert('Aluno Criado');
            clearInputs();
        }).catch(() => {
            alert('Erro inesperado');
        });
    }

    useEffect(() => {
        api.get<Classes[]>('turma/listar').then(response => {
            const classes = response.data.map(classes => classes);
            setClasses(classes);
        })
    }, [])


    function clearInputs() {
        setTeacherName('');
        setTeacherEmail('');
        setTeacherCpf('');
        setStudentRegistration('');
        setStudentName('');
        setStudentEmail('');
        setStudentCpf('');
    }

    return (
        <>
            <Navbar />
            <div className="gambs">

                <RadioGroup
                    name="gender1"
                    value={typeUser}
                    onChange={handleChangeTypeUsers}
                    row
                    className="radio-group"
                >
                    <FormControlLabel
                        value="professor"
                        label="Professor"
                        control={<Radio />}
                    />
                    <FormControlLabel
                        value="aluno"
                        label="Aluno"
                        control={<Radio />}
                    />
                </RadioGroup>

                {
                    typeUser === 'aluno' &&
                    (
                        <form className="aluno">
                            <div className="area-input">
                                <Input
                                    label="Nome"
                                    name="nome"
                                    auxText="Nome"
                                    onChange={((e) => { setStudentName(e.target.value) })}
                                />
                                <Input
                                    label="Matrícula"
                                    name="matricula"
                                    auxText="037065"
                                    mask="register"
                                    onChange={((e) => { setStudentRegistration(e.target.value) })}
                                />
                                <Input
                                    label="CPF"
                                    name="cpf"
                                    auxText="CPF"
                                    onChange={((e) => { setStudentCpf(e.target.value) })}
                                    mask="cpf"
                                />
                                <Input
                                    label="E-mail"
                                    name="email"
                                    auxText="E-mail"
                                    onChange={((e) => { setStudentEmail(e.target.value) })}

                                />
                            </div>
                            <p>Turma</p>

                            <div className="container-radio">
                                {classes.map(classes => (
                                    <div key={classes.nome}>
                                        <input type="radio" id={classes.nome} name="class" onChange={() => setSelectedClass(classes)} />
                                        <label htmlFor={classes.nome}>{classes.nome}</label>
                                    </div>
                                ))}

                            </div>
                        </form>
                    )
                }
                {
                    typeUser === 'professor' &&
                    (
                        <form className="professor">
                            <Input
                                label="Nome"
                                name="nome"
                                auxText="Nome"
                                onChange={(e) => { setTeacherName(e.target.value) }}
                            />
                            <Input
                                label="E-mail"
                                name="email"
                                auxText="E-mail"
                                onChange={(e) => { setTeacherEmail(e.target.value) }}
                            />
                            <Input
                                label="CPF"
                                name="cpf"
                                auxText="CPF"
                                onChange={(e) => { setTeacherCpf(e.target.value) }}
                                mask="cpf"
                            />
                        </form>
                    )
                }

                <Button label="Salvar" func={() => handleCreateUser}></Button>
            </div>
        </>
    );
}

export default User;
