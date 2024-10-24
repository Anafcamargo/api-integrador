import { IsNotEmpty, IsString } from "class-validator";


export class CriachamadosDTO {
    @IsString()
    @IsNotEmpty ({message: "Nome não pode ser vazio"})
    NOME: string;

    @IsString()
    @IsNotEmpty ({message: "Telefone não pode ser vazio"})
    TELEFONE: string;

    @IsString()
    @IsNotEmpty({message: " Descrição não pode ser vazio"})
    DESCRICAO: string;

    @IsString()
    @IsNotEmpty({message: " CATEGORIA não pode ser vazio"})
    CATEGORIA: string;
    
    @IsString()
    @IsNotEmpty({message: " IDUsuario não pode ser vazio"})
    IDUSUARIO: string;

    
}