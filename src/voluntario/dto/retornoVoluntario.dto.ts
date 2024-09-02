/* eslint-disable prettier/prettier */
import { voluntarioEntity} from "../voluntario.entity";

export class RetornovoluntarioDTO{
    constructor(
        readonly status: string,
        readonly voluntario: voluntarioEntity
        ){}
}