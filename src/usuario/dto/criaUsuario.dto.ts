

import { IsNotEmpty, IsString, IsOptional, IsPhoneNumber, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TelefoneUnico } from "../validacao/telefone.validator";

export class CriaUsuarioDTO {
    @IsString()
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    @ApiProperty({
        example: "Alecrim",
        description: "Nome do usuário, deve ser informado um texto contendo o nome"
    })
    NOME: string;


    @IsString()
    @IsPhoneNumber('BR', { message: "Telefone deve ser um número válido." }) // Exemplo para o Brasil
    @ApiProperty({
        example: "12123412349",
        description: "Telefone do usuário, deve ser informado um texto apenas com os números do telefone"
    })
    @TelefoneUnico({ message: 'Telefone já cadastrado' })
    TELEFONE: string;

    @IsString()
    @Length(6, 20, { message: "A senha deve ter entre 6 e 20 caracteres." }) // Adicionando comprimento mínimo
    @ApiProperty({
        example: "senhaSegura123",
        description: "Senha do usuário, deve ser informado um texto com a senha."
    })
    SENHA: string;
}
