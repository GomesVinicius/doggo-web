import Activity from "./Activiy";
import Classes from "./Class";
import Student from "./Student";

export default interface RatePut {
    id?: number,
    aluno: Student,
    atividade: Activity,
    valor: number,
};
