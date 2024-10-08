import { IsNotEmpty, IsString } from "class-validator";


export class CriaChamadoDTO {
    @IsString()
    @IsNotEmpty ({message: "Telefone não pode ser vazio"})
    TELEFONE: string;

    @IsString()
    @IsNotEmpty({message: " Descrição não pode ser vazio"})
    DESCRICAO: string;

    @IsString()
    @IsNotEmpty({message: " Tipo não pode ser vazio"})
    TIPO: string;
}