import React, { FormEvent, useEffect, useState } from 'react';
import { Dialog, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import './styles.css';

import { FaPencilAlt } from 'react-icons/fa';

import Navbar from '../../components/Navbar';
import api from '../../services/api';
import Classes from '../../models/Class';
import TeacherEdit from '../../Modals/Users/Teacher';
import StudentEdit from '../../Modals/Users/Student';

const User = () => {
    const [typeUser, setTypeUser] = useState('aluno');

    const [classes, setClasses] = useState<Classes[]>([]);
    const [selectedClass, setSelectedClass] = useState<Classes>();
    const [selectedClasses, setSelectedClasses] = useState<Classes[]>([]);
    //const [selectedClassId, setSelectedClassId] = useState(0);
    const selectedClassId: number[] = []

    const [teacherName, setTeacherName] = useState('');
    const [teacherEmail, setTeacherEmail] = useState('');
    const [teacherCpf, setTeacherCpf] = useState('');

    const [studentName, setStudentName] = useState('');
    const [studentRegistration, setStudentRegistration] = useState('');
    const [studentCpf, setStudentCpf] = useState('');
    const [studentEmail, setStudentEmail] = useState('');

    let [check, setCheck] = useState(false);

    const [open, setOpen] = useState(false);

    function handleOpenDialog() {
        setOpen(true);
    }

    function handleCLoseDialog() {
        setOpen(false);
    }

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

        if (teacherEmail.length <= 6 || !teacherEmail.includes('@'))
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

        api.post('aluno/salvar', {
            nome: studentName,
            email: studentEmail,
            cpf: studentCpf,
            matricula: studentRegistration,
            listaTurma: selectedClasses
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
    }, []);

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

                                        <input type="checkbox" id={classes.nome} value={classes.id} name="classes" onChange={(e) => {
                                            console.log(e.target.value);
                                            selectedClassId.push(Number(e.target.value));
                                            selectedClasses.push(classes);
                                            setSelectedClass(classes);
                                            console.log(selectedClassId, selectedClasses)
                                            //setSelectedClass(classes);
                                        }}

                                        />
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
                <div className="buttons">
                    <FaPencilAlt color="#e6af19" size={32} className="icon-edit" onClick={handleOpenDialog} />
                    <Button label="Salvar" className="save" func={() => handleCreateUser}></Button>
                </div>
            </div>

            <Dialog
                open={open}
                onClose={handleCLoseDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {
                    typeUser === 'professor' ?
                    <TeacherEdit /> :
                    <StudentEdit />
                }
            </Dialog>
        </>
    );
}

export default User;
