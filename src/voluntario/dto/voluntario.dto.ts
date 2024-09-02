

import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { EmailUnico } from "../validacao/email.validator";

 
export class criavoluntarioDTO{
    @IsString()
    @IsNotEmpty({message:"Nome não pode ser vazio"})
    @ApiProperty({
        example: "Ana ",
        description: "Nome do usuário, deve ser informado um texto"
    })
    nome: string;

    @IsString()
    @ApiProperty({
        example: "CPF ",
        description: "CPF do usuário, deve ser informado um texto com a numeração"
    })
    cpf: string;

    @IsNumber()
    @ApiProperty({
        example: "1990",
        description: "Ano de nascimento do usuário, deve ser informado como Numero"
    })
    idade: number;

  
    @EmailUnico({message: "Email repetido"})
    @IsEmail(undefined, {message: "email inválido"})
    @ApiProperty({
        example: "ana@teste.com",
        description: "Email do usuário, deve ser informado um email válido e que não se repita"
    })
    email: string;

    @IsString()
    @ApiProperty({
        example: "senha123",
        description: "Senha do usuário, deve ter pelo menos 6 digitos"
    })
    senha:string;
    

    @IsString()
    @ApiProperty({
        example: "12123412349",
        description: "Telefone do usuário, deve ser informado um texto apenas com os numeros do telefone"
    })
    telefone: string;

    @IsString()
    @ApiProperty({
        example: "Rua",
        description: "Endereço do usuário, deve ser informado um texto com o nome da rua"
    })
    endereco: string;

    @IsString()
    @ApiProperty({
        example: "Numero da casa",
        description: "Numero da casa do usuário, deve ser informado um texto com o numero"
    })
    numero_casa: string;

    @IsString()
    @ApiProperty({
        example: "Bairro",
        description: "Bairro do usuário, deve ser informado um texto com o nome do bairro"
    })
    bairro: string;
   
    
}