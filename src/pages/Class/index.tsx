import React, { FormEvent, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Navbar from '../../components/Navbar';
import Select from '../../components/Select';

import Teacher from '../../models/Teacher';
import Classes from '../../models/Class';

import api from '../../services/api';

import './styles.css'

const Class = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState<number>(0);
    const [classes, setClasses] = useState<Classes[]>([]);

    const [className, setClassName] = useState('');
    const [classSemester, setClassSemester] = useState('');
    const [classYear, setClassYear] = useState(0);
    const [classTeacher, setClassTeacher] = useState<Teacher>();

    const [teste, setTeste] = useState('');

    useEffect(() => {
        api.get<Teacher[]>('professor/listar').then(response => {
            const teacher = response.data.map((teacher: Teacher) => teacher)
            setTeachers(teacher);
        })
    }, [])

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();
        const professor = teachers.find(teacher => teacher.id == selectedTeacherId);

        console.log(professor)
        api.post('turma/salvar', {
            nome: className,
            semestre: classSemester,
            ano: classYear,
            professor
        }).then(() => {
            alert('Turma criada com sucesso');
        }).catch(() => {
            alert('Não foi possível criar a turma');
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
                            auxText="Ano"
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
                <Button label="Salvar" func={() => handleCreateClass}></Button>
            </div>
        </>
    )
}

export default Class;
