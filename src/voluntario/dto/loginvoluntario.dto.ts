

import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginVoluntarioDTO {
    
    @IsEmail({}, { message: "Email inválido" })
    @IsNotEmpty({ message: "Email não pode ser vazio" })
    @ApiProperty({
        example: "ana@teste.com",
        description: "Email do voluntário, deve ser um email válido."
    })
    EMAIL: string;

    @MinLength(6, { message: "Senha deve ter no mínimo 6 dígitos" })
    @IsNotEmpty({ message: "Senha não pode ser vazia" })
    @ApiProperty({
        example: "senha123",
        description: "Senha do voluntário, deve ter pelo menos 6 dígitos."
    })
    SENHA: string;
}
