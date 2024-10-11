

import { IsNotEmpty, IsString, IsOptional, IsPhoneNumber, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CriaUsuarioDTO {
    @IsString()
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    @ApiProperty({
        example: "Alecrim",
        description: "Nome do usuário, deve ser informado um texto contendo o nome"
    })
    readonly NOME: string;

    @IsString()
    @IsOptional() // Tornar opcional se você quiser permitir que o telefone não seja obrigatório
    @IsPhoneNumber('BR', { message: "Telefone deve ser um número válido." }) // Exemplo para o Brasil
    @ApiProperty({
        example: "12123412349",
        description: "Telefone do usuário, deve ser informado um texto apenas com os números do telefone"
    })
    readonly TELEFONE?: string;

    @IsString()
    @Length(6, 20, { message: "A senha deve ter entre 6 e 20 caracteres." }) // Adicionando comprimento mínimo
    @ApiProperty({
        example: "senhaSegura123",
        description: "Senha do usuário, deve ser informado um texto com a senha."
    })
    readonly SENHA: string;
}
