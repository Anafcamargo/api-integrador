

import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
// import { EmailUnico } from "../validacao/email.validator";

 
export class CriaVoluntarioDTO{
    @IsString()
    @IsNotEmpty({message:"Nome não pode ser vazio"}) 
    @ApiProperty({
        example: "Ana ",
        description: "Nome do usuário, deve ser informado um texto"
    })
    NOME: string;

    @IsString()
    @ApiProperty({
        example: "CPF ",
        description: "CPF do usuário, deve ser informado um texto com a numeração"
    })
    CPF: string;

    @IsNumber()
    @ApiProperty({
        example: "1990-11-27",
        description: "Ano de nascimento do usuário, deve ser informado como Numero"
    })
    NASCIMENTO: number;

  
    // @EmailUnico({message: "Email repetido"})
    @IsEmail(undefined, {message: "email inválido"})
    @ApiProperty({
        example: "ana@teste.com",
        description: "Email do usuário, deve ser informado um email válido e que não se repita"
    })
    EMAIL: string;

    @IsString()
    @ApiProperty({
        example: "senha123",
        description: "Senha do usuário, deve ter pelo menos 6 digitos"
    })
    SENHA:string;
    

    @IsString()
    @ApiProperty({
        example: "12123412349",
        description: "Telefone do usuário, deve ser informado um texto apenas com os numeros do telefone"
    })
    TELEFONE: string;

    @IsString()
    @ApiProperty({
        example: "Rua",
        description: "Endereço do usuário, deve ser informado um texto com o nome da rua"
    })
    ENDERECO: string;

    @IsString()
    @ApiProperty({
        example: "Numero da casa",
        description: "Numero da casa do usuário, deve ser informado um texto com o numero"
    })
    NUMEROCASA: string;

    @IsString()
    @ApiProperty({
        example: "Bairro",
        description: "Bairro do usuário, deve ser informado um texto com o nome do bairro"
    })
    BAIRRO: string;
   
    @IsString()
    @ApiProperty({
        example: "Cidade",
        description: "Cidade do usuário, deve ser informado um texto com o nome do cidade"
    })
    CIDADE: string;
}