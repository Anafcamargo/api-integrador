/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

export class loginUsuarioDTO{
    
    @IsEmail(undefined, {message: "email inválido"})
    email: string;

    @MinLength(6, {message: "senha deve ter no minimo 6 digitos"})
    senha:string;
    
}