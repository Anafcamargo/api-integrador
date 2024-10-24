

import { IsNotEmpty, IsString } from "class-validator";
import { USUARIO } from "../usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

export class RetornoUsuarioDTO {
    @IsString()
    @IsNotEmpty({ message: 'ID não pode ser vazio.' })
    readonly id: string;

    @IsString()
    @IsNotEmpty({ message: 'Mensagem não pode ser vazia.' })
    readonly message: string;
}
