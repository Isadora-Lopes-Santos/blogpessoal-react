import type Postagem from "./Postagem";

export default interface Tema {
    id: number;
    descricao: string;
    postagem?: Postagem[] | null; //O Operador de Encadeamento Opcional (?) junto do atributo postagem sinaliza que o preenchimento deste campo é opcional.
}