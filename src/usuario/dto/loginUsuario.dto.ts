

import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUsuarioDTO {
    
    @IsString()
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    @ApiProperty({
        example: "Alecrim",
        description: "Nome do usuário, deve ser informado um texto contendo o nome"
    })
    NOME: string;

    @IsString()
    @MinLength(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    @ApiProperty({
        example: "senhaSegura123",
        description: "Senha do usuário, deve ter pelo menos 6 caracteres"
    })
    SENHA: string;
}
