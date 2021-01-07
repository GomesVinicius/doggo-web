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

    const [valueRates, setValueRates] = useState<number[]>([]);

    useEffect(() => {
        api.get<Classes[]>('turma/listar').then(response => {
            const classes = response.data.map(classes => classes);
            setClasses(classes);
        }).catch(() => 'Houve um erro ao procurar as turmas');

        api.get<Activity[]>('atividade/listar').then(response => {
            const activities = response.data.map(activities => activities);
            setActivities(activities);
        }).catch(() => 'Houve um erro ao carregar as atividades');

        api.get<Student[]>(`aluno/listar/idTurma=2`).then(response => {
            const students = response.data.map(student => student);
            setStudents(students);
            console.log(students);
        });
    }, [])

    function handleSearchStudent(e: FormEvent) {
        e.preventDefault();

        api.get<Student[]>(`aluno/listar/idTurma=${selectedClassId}`).then(response => {
            const students = response.data.map(student => student);
            setStudents(students);
        });
    }

    function handleCreateNote() {
        let body: any[] = [];

        for (let i = 0; i < valueRates.length; i++) {
            let cpf = students[i].cpf;
            let descricao = activities[0].descricao;
            let valor = valueRates[i];
            body.push({
                cpf,
                descricao,
                valor
            })
            console.log(body)
        }

        api.post('nota/salvar',
            body
        ).then(() => {
            alert('Notas inseridas')
        }).catch(() => {
            alert('Não foi possível fazer inserção das notas')
        })
    }

    return (
        <>
            <Navbar />
            <div className="gambs">
                <div className="rate-area">

                    {/* <Select
                        value={selectedActivityId}
                        name="Atividade"
                        label="Atividade"
                        onChange={(e) => { setSelectedActivityId(Number(e.target.value)) }}
                    >
                        <option value=""></option>
                        {activities.map(activity => (
                            <option key={activity.descricao} value={activity.id}>{activity.descricao}</option>
                        ))}

                    </Select> */}

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

                </div>

                {students[0] &&
                    <table>
                        <tbody>
                            <th>Aluno</th>
                            <th>Turma</th>
                            <th>Nota</th>
                            {
                                students.map(student => (
                                    <tr key={student.cpf}>
                                        <td>
                                            {student.nome}
                                        </td>

                                        <td>
                                            {student.turmas.map(turma => turma.nome + ' ')}
                                        </td>

                                        <td>
                                            <input type="text" onChange={(e) => { valueRates.push(Number(e.target.value)) }} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }

                <Button label="Salvar" func={() => handleCreateNote}></Button>

            </div>
        </>
    )
}

export default Rate;
