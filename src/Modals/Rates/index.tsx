import { DialogContent, DialogTitle } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Activity from '../../models/Activiy';
import Classes from '../../models/Class';
import RatePut from '../../models/RatePut';
import Student from '../../models/Student';

import api from '../../services/api';

const RateEdit = () => {
    const [classes, setClasses] = useState<Classes[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [rate, setRate] = useState<RatePut[]>([]);
    const [newRate, setNewRate] = useState<number>();

    const [selectedClassId, setSelectedClassId] = useState<number>(0);
    const [selectedActivityId, setSelectedActivityId] = useState<number>(0);
    const [selectedRateId, setSelectedRateId] = useState<number>(0);
    const [selectedStudentCpf, setSelectedStudentCpf] = useState<string>('');

    useEffect(() => {
        handleGetClasses();
    }, []);

    function handleGetClasses() {
        api.get<Classes[]>('turma/listar').then(response => {
            const classes = response.data.map(classes => classes);
            setClasses(classes);

        }).catch(() => 'Houve um erro ao procurar as turmas');
    }

    function handleGetActivitiesByClass(idClass: number) {
        api.get<Activity[]>(`atividade/listar/idTurma=${idClass}`).then(response => {
            const activitiesByClass = response.data.map(activities => activities);
            setActivities(activitiesByClass);

        }).catch((err) => {
            setActivities([])
            console.log(err);
        });
    }

    function handleGetStudents(idActivity: number) {
        
        api.get<RatePut[]>(`nota/listar/idAtividade=${idActivity}`).then(response => {
            const rate = response.data.map(rate => rate);
            setRate(rate);
            const student = response.data.map(rate => rate.aluno);
            setStudents(student);
        })
    }

    function handleGetEditRate() {
        const studentSelected = students.find(student => student.cpf == selectedStudentCpf);
        const activitySelected = activities.find(activity => activity.id == selectedActivityId);

        api.put<RatePut>('nota/atualizar', {
            id: selectedRateId,
            valor: newRate,
            aluno: studentSelected,
            atividade: activitySelected
        })
    }

    return (
        <>
            <DialogTitle id="alert-dialog-slide-title">Editar turma</DialogTitle>

            <DialogContent>
                <Select
                    value={selectedClassId}
                    onChange={(e) => { setSelectedClassId(Number(e.target.value)); handleGetActivitiesByClass(Number(e.target.value)); }}
                    name="turma"
                    label="Turma"
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
                    onChange={(e) => { setSelectedActivityId(Number(e.target.value)); handleGetStudents(Number(e.target.value)); }}
                >
                    <option value=""></option>
                    {activities.map(activity => (
                        <option key={activity.descricao} value={activity.id}>{activity.descricao}</option>
                    ))}
                </Select>

                <Select
                    value={selectedStudentCpf}
                    name="Estudante"
                    label="Estudante"
                    onChange={(e) => { setSelectedStudentCpf(e.target.value); }}
                >
                    <option value=""></option>
                    {students.map(students => (
                        <option key={students.cpf} value={students.cpf}>{students.nome}</option>
                    ))}
                </Select>

                <Input
                    label="Nota"
                    name="Nota"
                    auxText="Insira a nota a ser alterada"
                    onChange={(e) => {setNewRate(Number(e.target.value))}}
                    value={newRate}
                />

                <Button func={() => handleGetEditRate} label="Editar" color="#e6af19" />

            </DialogContent>
        </>
    )
}

export default RateEdit;
