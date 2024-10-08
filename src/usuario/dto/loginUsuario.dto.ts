

import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";


export class loginUsuarioDTO{
    
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    NOME: string;

    @IsString()
    SENHA: string;
}