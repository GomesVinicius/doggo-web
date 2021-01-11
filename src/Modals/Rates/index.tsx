import { DialogContent, DialogTitle } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Classes from '../../models/Class';
import Teacher from '../../models/Teacher';
import api from '../../services/api';

const RateEdit = () => {


    return (
        <>
            <DialogTitle id="alert-dialog-slide-title">Editar turma</DialogTitle>

            <DialogContent>
                <Select
                    // value={selectedClassId}
                    // onChange={(e) => { setSelectedClassId(Number(e.target.value)); handleGetActivitiesByClass(Number(e.target.value)); }}
                    name="turma"
                    label="Turma"
                >
                    <option value=""></option>
                    {/* {classes.map(classes => (
                        <option key={classes.nome} value={classes.id}>{classes.nome}</option>
                    ))} */}
                </Select>

                <Select
                    // value={selectedActivityId}
                    name="Atividade"
                    label="Atividade"
                    // onChange={(e) => { setSelectedActivityId(Number(e.target.value)); handleGetActivity(Number(e.target.value)); handleSearchStudent(Number(e.target.value)) }}
                >
                    <option value=""></option>
                    {/* {activities.map(activity => (
                        <option key={activity.descricao} value={activity.id}>{activity.descricao}</option>
                    ))} */}
                </Select>

                {/* <Button label="Buscar" func={() => handleSearchStudent}></Button> */}


            <Button func={() => {}} label="Editar" color="#e6af19" />

        </DialogContent>
        </>
    )
}

export default RateEdit;
