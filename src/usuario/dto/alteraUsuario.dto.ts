

import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AlteraUsuarioDTO {
    
    @IsString()
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    @IsOptional()
    @ApiPropertyOptional({
        example: "Alecrim",
        description: "Nome do usuário, deve ser informado um texto contendo o nome"
    })
    NOME: string; // Torne a propriedade opcional

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "12123412349",
        description: "Telefone do usuário, deve ser informado um texto apenas com os números do telefone"
    })
    TELEFONE: string; // Torne a propriedade opcional

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: "senhaSegura123",
        description: "Senha do usuário, deve ser informado um texto com a senha."
    })
   SENHA: string; // Torne a propriedade opcional
}
