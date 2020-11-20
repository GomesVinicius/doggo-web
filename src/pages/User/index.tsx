import React, { useState } from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import './styles.css';

const User = () => {
    const [value, setValue] = useState('aluno');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    }

    function test() {
        alert('aa');
    }

    return (
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
                        <Input label="Nome" name="nome" auxText="Nome" />
                        <Input label="E-mail" name="email" auxText="E-mail" />
                        <Input label="CPF" name="cpf" auxText="CPF" />
                    </form>
                )
            }


            <Button label="Salvar" func={() => test}></Button>
        </div>
    );
}

export default User;
