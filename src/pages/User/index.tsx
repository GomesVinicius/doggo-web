import React, { FormEvent, useState } from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import './styles.css';
import Navbar from '../../components/Navbar';
import api from '../../services/api';

const User = () => {
    const [value, setValue] = useState('aluno');

    const [teacherName, setTeacherName] = useState('');
    const [teacherEmail, setTeacherEmail] = useState('');
    const [teacherCpf, setTeacherCpf] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    }

    function handleCreateTeacher(e: FormEvent) {
        e.preventDefault();

        api.post('professor/salvar', {
            nome: teacherName,
            email: teacherEmail,
            cpf: teacherCpf
        }).then(() => {
            alert('Professor criado');
        }).catch(() => {
            alert('Erro ao enviar');
        });
    }

    return (
        <>
            <Navbar />
            <div className="gambs">

                <RadioGroup
                    name="gender1"
                    value={value}
                    onChange={handleChange}
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
                    value === 'aluno' &&
                    (
                        <form className="aluno">
                            <div className="area-input">
                                <Input label="Nome" name="nome" auxText="Nome" />
                                <Input label="Matrícula" name="matricula" auxText="Matrícula" />
                                <Input label="CPF" name="cpf" auxText="CPF" />
                                <Input label="E-mail" name="email" auxText="E-mail" />
                            </div>
                            <p>Turma</p>

                            <div className="container-radio">
                                <RadioGroup
                                    value={value}
                                    onChange={handleChange}
                                    className="radio-group"
                                    row
                                >
                                    <FormControlLabel
                                        value="professor"
                                        label="Turma Unus"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        value="aluno"
                                        label="Turma Duo"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        value="aluno"
                                        label="Turma Tribus"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        value="aluno"
                                        label="Turma Quattur"
                                        control={<Radio />}
                                    />
                                    <FormControlLabel
                                        value="aluno"
                                        label="Turma Quinque"
                                        control={<Radio />}
                                    />
                                </RadioGroup>
                            </div>
                        </form>
                    )
                }
                {
                    value === 'professor' &&
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
                            />
                        </form>
                    )
                }


                <Button label="Salvar" func={() => handleCreateTeacher}></Button>
            </div>
        </>
    );
}

export default User;
