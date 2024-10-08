
import { USUARIO } from "../usuario.entity";

export class RetornoUsuarioDTO{
    constructor(
        readonly status: string,
        readonly usuario: USUARIO
        ){}
}