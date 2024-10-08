
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Optional } from "@nestjs/common";

export class alteraUsuarioDTO{

    
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    @Optional()
    @ApiPropertyOptional({
        example: "Alecrim",
        description: "Nome do usuário, deve ser informado um texto contendo o nome"
    })
    NOME: string;
    

    @IsString()
    @Optional()
    @ApiPropertyOptional({
        example: "12123412349",
        description: "Telefone do usuário, deve ser informado um texto apenas com os numeros do telefone"
    })
    TELEFONE: string;

    @IsString()
    @Optional()
    @ApiProperty({
        example: "12123412349",
        description: "Senha do usuário, deve ser informado um texto com a senha."
    })
    SENHA: string;
}