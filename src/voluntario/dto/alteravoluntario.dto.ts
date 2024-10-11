
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
// import { EmailUnico } from "../validacao/email.validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class alteraVoluntarioDTO {

    @IsString()
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    @ApiPropertyOptional({
        example: "Ana",
        description: "Nome do usuário, deve ser informado um texto contendo o nome"
    })
    NOME: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "12345678901", // Example CPF
        description: "CPF do usuário, deve ser informado um texto com a numeração"
    })
    CPF: string;

    // @EmailUnico({ message: "Email já está em uso" })
    @IsEmail({}, { message: "Email inválido" })
    @IsOptional()
    @ApiPropertyOptional({
        example: "ana@teste.com",
        description: "Email do usuário, deve ser informado um email válido e que não se repita"
    })
    EMAIL: string;

    @MinLength(6, { message: "Senha deve ter pelo menos 6 dígitos" })
    @IsOptional()
    @ApiPropertyOptional({
        example: "senha123",
        description: "Senha do usuário, deve ter pelo menos 6 dígitos"
    })
    SENHA: string;

    @IsNumber({}, { message: "Ano de nascimento deve ser um número" })
    @IsOptional()
    @ApiPropertyOptional({
        example: 1990,
        description: "Ano de nascimento do usuário, deve ser informado como um número"
    })
    NASCIMENTO: Date; // Use number or Date depending on your preference

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "Rua das Flores",
        description: "Endereço do usuário, deve ser informado um texto com o nome da rua"
    })
    ENDERECO: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "123",
        description: "Número da casa do usuário, deve ser informado um texto com o número"
    })
    NUMEROCASA: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "Jardim",
        description: "Bairro do usuário, deve ser informado um texto com o nome do bairro"
    })
    BAIRRO: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "11987654321", // Example phone number
        description: "Telefone do usuário, deve ser informado um texto apenas com os números do telefone"
    })
    TELEFONE: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "São Paulo",
        description: "Cidade do usuário, deve ser informado um texto com o nome da cidade"
    })
    CIDADE: string;
}
