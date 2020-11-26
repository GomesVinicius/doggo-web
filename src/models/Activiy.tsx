import Classes from "./Class";

export default interface Activity {
    id?: number,
    valor: number,
    descricao: string,
    turma: Classes,
    data: Date
};
