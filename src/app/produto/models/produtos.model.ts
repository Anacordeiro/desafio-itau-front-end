import {Strings} from "aws-sdk/clients/opsworks";

export interface Produto {
    imagemBase64: string;
    
    estoque: number;
    id: string;
    imagem: File | string;    
    nome: string;
    valor:  string;

    
}