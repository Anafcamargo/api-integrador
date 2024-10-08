
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength} from "class-validator";
import { EmailUnico } from "../validacao/email.validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class alteraVoluntarioDTO{

    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"}) 
    @IsOptional()
    @ApiPropertyOptional({
        example: "Ana",
        description: "Nome do usuário, deve ser informado um texto contendo o nome"
    })
    NOME: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "CPF",
        description: "CPF do usuário, deve ser informado um texto com a numeração"
    })
    CPF: string;
    
    @EmailUnico({message: "Email repetido"})
    @IsEmail(undefined, {message: "email inválido"})
    @IsOptional()
    @ApiPropertyOptional({
        example: "ana@teste.com",
        description: "Email do usuário, deve ser informado um email válido e que não se repita"
    })
    EMAIL: string;

    @MinLength(6, {message: "senha deve ter no minimo 6 digitos"})
    @IsOptional()
    @ApiPropertyOptional({
        example: "senha123",
        description: "Senha do usuário, deve ter pelo menos 6 digitos"
    })
    SENHA:string;
    
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        example: "1990",
        description: "Ano de nascimento do usuário, deve ser informado como Numero"
    })
    NASCIMENTO: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
         example: "Rua",
        description: "Endereço do usuário, deve ser informado um texto com o nome da rua"
    })
    ENDERECO: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "Numero da casa",
        description: "Numero da casa do usuário, deve ser informado um texto com o numero"
    })
    NUMERO_CASA: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "Bairro",
        description: "Bairro do usuário, deve ser informado um texto com o nome do bairro"
    })
    BAIRRO: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "12123412349",
        description: "Telefone do usuário, deve ser informado um texto apenas com os numeros do telefone"
    })
    TELEFONE: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "Cidade",
        description: "Cidade do usuário, deve ser informado um texto com o nome do cidade"
    })
    CIDADE: string;
}
   
