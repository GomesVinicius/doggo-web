import Classes from "./Class";

export default interface Student {
    id?: number,
    nome: string,
    email: string,
    cpf: string,
    turmas: Classes[],
    matricula: string,
    senha: string,
}
