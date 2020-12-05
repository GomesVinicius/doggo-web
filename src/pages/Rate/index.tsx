import React, { FormEvent, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Select from '../../components/Select';

import Navbar from '../../components/Navbar';

import './styles.css';
import api from '../../services/api';

import Classes from '../../models/Class';
import Activity from '../../models/Activiy';
import Student from '../../models/Student';

const Rate = () => {
    const [classes, setClasses] = useState<Classes[]>([]);
    const [selectedClassId, setSelectedClassId] = useState(0);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivityId, setSelectedActivityId] = useState(0);
    const [students, setStudents] = useState<Student[]>([]);
    
    const [valueRates, setValueRates] = useState<number>();
    const [descriptionRates, setDescriptionRates] = useState<string[]>(['']);
    const [cpfRates, setCpfRates] = useState<string[]>(['']);

    useEffect(() => {
        api.get<Classes[]>('turma/listar').then(response => {
            const classes = response.data.map(classes => classes);
            setClasses(classes);
        }).catch(() => 'Houve um erro ao procurar as turmas');

        api.get<Activity[]>('atividade/listar').then(response => {
            const activities = response.data.map(activities => activities);
            setActivities(activities);
        }).catch(() => 'Houve um erro ao carregar as atividades');

        api.get<Student[]>(`aluno/listar/idTurma=1`).then(response => {
            const students = response.data.map(student => student);
            setStudents(students);
            console.log(students);
        });
    }, [])

    function handleSearchStudent(e: FormEvent) {
        e.preventDefault();

        api.get<Student[]>(`aluno/listar/idTurma=${selectedActivityId}`).then(response => {
            const students = response.data.map(student => student);
            setStudents(students);
            console.log(students);
        });
    }

    function handleCreateNote(e: FormEvent) {
        e.preventDefault();

        let body = [{}]
        
        /*api.post<Rates[]>('nota/salvar', {
            
        }).catch(() => {
            alert('Não foi possível fazer inserção das notas')
        })*/
    }

    return (
        <>
            <Navbar />
            <div className="gambs">
                <div className="rate-area">

                    <Select
                        value={selectedActivityId}
                        name="Atividade"
                        label="Atividade"
                        onChange={(e) => { setSelectedActivityId(Number(e.target.value)) }}
                    >
                        <option value=""></option>
                        {activities.map(activity => (
                            <option key={activity.descricao} value={activity.id}>{activity.descricao}</option>
                        ))}

                    </Select>

                    <Select
                        value={selectedClassId}
                        onChange={(e) => { setSelectedClassId(Number(e.target.value)) }}
                        name="turma"
                        label="Turma"
                    >
                        <option value=""></option>
                        {classes.map(classes => (
                            <option key={classes.nome} value={classes.id}>{classes.nome}</option>
                        ))}
                    </Select>

                    <Button label="Buscar" func={() => handleSearchStudent}></Button>

                    <table>
                        <thead>
                            <th>Aluno</th>
                            <th>Turma</th>
                            <th>Nota</th>
                        </thead>

                        <tbody>
                            {
                                students.map(student => (
                                    <tr>
                                        <td key={student.cpf}>
                                            {student.nome}
                                        </td>

                                        <td key={student.cpf}>
                                            {student.turmas.map(turma => turma.nome + ' ')}
                                        </td>

                                        <td key={student.cpf}>
                                            <input type="text" onChange={(e) => { setValueRates(Number(e.target.value)) }} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
                <Button label="Salvar" func={() => { }}></Button>

            </div>
        </>
    )
}

export default Rate;
