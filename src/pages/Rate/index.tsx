import React, { FormEvent, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Select from '../../components/Select';

import Navbar from '../../components/Navbar';

import './styles.css';
import api from '../../services/api';

import Classes from '../../models/Class';
import Activity from '../../models/Activiy';
import Student from '../../models/Student';
import Input from '../../components/Input';
import { FaPencilAlt } from 'react-icons/fa';
import { Dialog } from '@material-ui/core';
import RateEdit from '../../Modals/Rates';
import { Console } from 'console';
import { cpfMask } from '../../components/Mask';

interface NewValue {
    cpf: string,
    descricao: string,
    valor: number
}

const Rate = () => {
    const [classes, setClasses] = useState<Classes[]>([]);
    const [selectedClassId, setSelectedClassId] = useState(0);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivityId, setSelectedActivityId] = useState(0);
    const [students, setStudents] = useState<Student[]>([]);

    const [valueRates, setValueRates] = useState<number[]>([]);
    const [activityValue, setActivityValue] = useState<number>(0);
    const [open, setOpen] = useState(false);

    const [rateSended, setRateSended] = useState(false);
    const [rates, setRates] = useState<number>();

    const [disableClasses, setDisableClasses] = useState(false);
    const [disableActivities, setDisableActivities] = useState(false);

    const [activityActual, setActivityActual] = useState<Activity>();

    function handleOpenDialog() {
        setOpen(true);
    }

    function handleCLoseDialog() {
        setOpen(false);
    }

    useEffect(() => {
        api.get<Classes[]>('turma/listar').then(response => {
            const classes = response.data.map(classes => classes);
            setClasses(classes);
        }).catch(() => 'Houve um erro ao procurar as turmas');

        // api.get<Activity[]>('atividade/listar').then(response => {
        //     const activities = response.data.map(activities => activities);
        //     setActivities(activities);
        // }).catch(() => 'Houve um erro ao carregar as atividades');

        // api.get<Student[]>(`aluno/listar/idTurma=2`).then(response => {
        //     const students = response.data.map(student => student);
        //     setStudents(students);
        //     console.log(students);
        // });
    }, []);

    function handleSearchStudent(idActivity?: number) {
        api.get<Student[]>(`aluno/listar/idTurma=${selectedClassId}`).then(response => {
            const students = response.data.map(student => student);
            setStudents(students);
            setDisableActivities(true);
        });

        api.get<Activity[]>(`nota/listar/idAtividade=${idActivity}`).then(response => {
            const activity = response.data.map(activity => activity);
            activity.length >= 1 ? setRateSended(false) : setRateSended(true);
            const rates = response.data.map(rates => rates);
        });
    }

    function handleGetActivity(idActivity?: number) {
        api.get<Activity>(`atividade/listar/id=${idActivity}`).then(response => {
            const activity = response.data;
            setActivityValue(activity.valor);
            setActivityActual(activity);

        }).catch((err) => {
            console.log(err, 'err');
        });
    }

    function handleGetActivitiesByClass(idClass: number) {
        api.get<Activity[]>(`atividade/listar/idTurma=${idClass}`).then(response => {
            const activitiesByClass = response.data.map(activities => activities);
            setActivities(activitiesByClass);
            setDisableClasses(true);
        }).catch((err) => {
            setActivities([])
            console.log(err);
        });
    }

    function handleCreateNote() {
        let body: any[] = [];

        // for (let i = 0; i < valueRates.length; i++) {
        //     let cpf = students[i].cpf;
        //     let descricao = activities[0].descricao;
        //     let valor = valueRates[i];
        //     body.push({
        //         cpf,
        //         descricao,
        //         valor
        //     })
        //     console.log(body)
        // }

        api.post('nota/salvar',
            newValue
        ).then(() => {
            alert('Notas inseridas');
            window.location.reload();
        }).catch(() => {
            alert('Não foi possível fazer inserção das notas')
        });
    }

    const tamanho2: number[] = [];
    const limite = 13;
    let final;
    function setValor() {
        for (let i = 0; i <= activityValue; i++) {
            tamanho2[i] = i;
        }
        final = tamanho2.map(mapeado => (
            <option value={mapeado}>{mapeado}</option>
        ))
        console.log(tamanho2)

        return final;
    }

    const [newValue, setNewValue] = useState<NewValue[]>([]);

    return (
        <>
            <Navbar />
            <div className="gambs">
                <div className="rate-area">
                    <Select
                        value={selectedClassId}
                        onChange={(e) => { setSelectedClassId(Number(e.target.value)); handleGetActivitiesByClass(Number(e.target.value)); }}
                        name="turma"
                        label="Turma"
                        disabled={disableClasses}
                    >
                        <option value=""></option>
                        {classes.map(classes => (
                            <option key={classes.nome} value={classes.id}>{classes.nome}</option>
                        ))}
                    </Select>

                    <Select
                        value={selectedActivityId}
                        name="Atividade"
                        label="Atividade"
                        onChange={(e) => { setSelectedActivityId(Number(e.target.value)); handleGetActivity(Number(e.target.value)); handleSearchStudent(Number(e.target.value)) }}
                        disabled={disableActivities}
                    >
                        <option value=""></option>
                        {activities.map(activity => (
                            <option key={activity.descricao} value={activity.id}>{activity.descricao}</option>
                        ))}
                    </Select>

                    {/* <Button label="Buscar" func={() => handleSearchStudent}></Button> */}
                </div>

                {students[0] && rateSended ?
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
                                            {/* <Input type="text" onChange={(e) => { valueRates.push(Number(e.target.value)); }} /> */}
                                            <Select
                                                // onChange={(e) => {valueRates.push(Number(e.target.value))}}
                                                onChange={(e) => {
                                                    const index = newValue.findIndex(cpf => cpf.cpf === student.cpf);
                                                    if (index <= 0) {
                                                        newValue.push({ cpf: student.cpf, descricao: String(activityActual?.descricao), valor: (Number(e.target.value)) })
                                                    } else {
                                                        for (let i = 0; i <= newValue.length; i++) {
                                                            if (i == index) {
                                                                newValue[i].valor = Number(e.target.value)
                                                            }
                                                            return newValue;
                                                        }
                                                    }
                                                    //newValue.splice({cpf: student.cpf, descricao: String(activityActual?.descricao), valor: (Number(e.target.value))}, index)

                                                    console.log('Index: ', index);
                                                    console.log(newValue);
                                                }}
                                                value={valueRates[0]}

                                            >
                                                <option value="" hidden></option>
                                                {setValor()}
                                            </Select>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    : <></>
                }
                {
                    selectedActivityId != 0 ?
                        <h1>
                            Esta atividade já teve suas notas lançadas
                    </h1>
                        : <></>
                }

                <div className="buttons">
                    <FaPencilAlt color="#e6af19" size={32} className="icon-edit" onClick={handleOpenDialog} />
                    <Button label="Salvar" func={() => handleCreateNote}></Button>
                </div>

            </div>

            <Dialog
                open={open}
                onClose={handleCLoseDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <RateEdit />
            </Dialog>

        </>
    )
}

export default Rate;
