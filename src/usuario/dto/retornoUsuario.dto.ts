

import { USUARIO } from "../usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

export class RetornoUsuarioDTO {
    @ApiProperty({
        example: "success",
        description: "Status da operação, indicando se a ação foi bem-sucedida."
    })
    readonly status: string;

    @ApiProperty({ type: USUARIO })
    readonly usuario: USUARIO;

    constructor(status: string, usuario: USUARIO) {
        this.status = status;
        this.usuario = usuario;
    }
}
