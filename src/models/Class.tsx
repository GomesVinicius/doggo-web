import Teacher from "./Teacher";

export default interface Classes {
    id?: number,
    nome: string,
    semestre: string,
    ano: number,
    professor: Teacher
};
