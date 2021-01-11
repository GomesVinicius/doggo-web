import Classes from "./Class";
import Student from "./Student";

export default interface Activity {
    id?: number,
    valor: number,
    descricao: string,
    turma: Classes,
    data: string,
    aluno: Student,
};
