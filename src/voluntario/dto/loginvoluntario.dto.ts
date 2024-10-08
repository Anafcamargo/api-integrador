

import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";


export class loginvoluntarioDTO{
    
    @IsEmail(undefined, {message: "email inválido"})
    EMAIL: string;


    @MinLength(6, {message: "senha deve ter no minimo 6 digitos"})
    SENHA:string;
    
} 