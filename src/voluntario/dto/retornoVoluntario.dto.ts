
import { VOLUNTARIO} from "../voluntario.entity";

export class RetornoVoluntarioDTO{
    constructor(
        readonly status: string,
        readonly voluntario: VOLUNTARIO
        ){}
} 