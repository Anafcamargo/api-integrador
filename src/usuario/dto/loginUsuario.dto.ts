

import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";


export class loginUsuarioDTO{
    
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    nome: string;

    @IsString()
    telefone: string;
}