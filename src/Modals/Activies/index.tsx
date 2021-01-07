import { DialogContent, DialogTitle } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Activity from '../../models/Activiy';
import Classes from '../../models/Class';
import api from '../../services/api';

const ActivityEdit = () => {
    const [value, setValue] = useState<number>(0);
    const [classes, setClasses] = useState<Classes[]>([]);
    const [selectedClassId, setSelectedClassId] = useState(0);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const [selectedActivityId, setSelectedActivityId] = useState(0);
    const [activities, setActivities] = useState<Activity[]>([]);

    function handleAlterActivity() {
        if (!Number(value) || value > 100)
            return alert('Nota inválida');

        if (!description || description.length < 10)
            return alert('Descrição inválida');

        if (!date || date.length !== 10)
            return alert('Descrição inválida');

        if (!selectedClassId)
            return alert('Selecione uma turma');

        const turma = classes.find(classes => classes.id === selectedClassId);

        api.put(`atividade/atualizar`, {
            id: selectedActivityId,
            descricao: description,
            valor: value,
            data: date,
            turma
        }).then(() => {
            alert('Atividade criado com sucesso');
            handleGetActivities();
            handleGetClasses();
        }).catch(() => {
            alert('Erro inesperado');
        })
    }

    useEffect(() => {
        handleGetActivities();
        handleGetClasses();
    }, []);

    function handleGetClasses() {
        api.get<Classes[]>('turma/listar').then(response => {
            const classes = response.data.map(classes => classes);
            setClasses(classes);
        })
    }

    function handleGetActivities(){
        api.get<Activity[]>('atividade/listar').then((response) => {
            const activity = response.data.map(activity => activity);
            setActivities(activity);
        }).catch((err) => {
            console.log(err);
        });
    }

    function selectedActivity(idActivity: number) {
        api.get<Activity>(`atividade/listar/id=${idActivity}`).then((response) => {
            setValue(response.data.valor);
            setDate(response.data.data);
            setDescription(response.data.descricao);
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleRemoveActivity() {
        api.delete(`atividade/deletar/id=${selectedActivityId}`).then((response) => {
            alert('Atividade removida com sucesso');
            handleGetActivities();
        }).catch((err) => {
            alert('Ocorreu um erro ao remover');
            console.log(err);
        })
    }

    return (
        <>
            <DialogTitle id="alert-dialog-slide-title">Editar atividade</DialogTitle>
            <DialogContent>
                <Select
                    value={selectedActivityId}
                    onChange={(e) => { setSelectedActivityId(Number(e.target.value)); selectedActivity(Number(e.target.value)); }}
                    name="subject"
                    label="Turma"
                >
                    <option value="" hidden></option>
                    {activities.map(activity => (
                        <option key={activity.descricao} value={activity.id}>{activity.descricao}</option>
                    ))}
                </Select>

                <Input
                    label="Valor"
                    name="turma"
                    value={value}
                    onChange={(e) => { setValue(Number(e.target.value)) }}
                    maxLength={3}
                />

                <Select
                    value={selectedClassId}
                    onChange={(e) => { setSelectedClassId(Number(e.target.value)) }}
                    name="subject"
                    label="Turma"
                >
                    <option value="" hidden></option>
                    {classes.map(classes => (
                        <option key={classes.nome} value={classes.id}>{classes.nome}</option>
                    ))}
                </Select>

                <Input
                    label="Data"
                    name="data"
                    value={date}
                    mask="date"
                    onChange={(e) => { setDate((e.target.value)) }}
                />

                <Input
                    label="Descrição"
                    name="descrição"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                />

                <Button func={() => handleAlterActivity} label="Editar" color="#e6af19" />
                <Button func={() => handleRemoveActivity} label="Remover" color="#e6af19" />
            </DialogContent>
        </>
    )
}

export default ActivityEdit;
