import { IsNotEmpty, IsString } from "class-validator";




export class RetornoVoluntarioDTO {
    @IsString()
    @IsNotEmpty({ message: 'ID não pode ser vazio.' })
    readonly id: string;

    @IsString()
    @IsNotEmpty({ message: 'Mensagem não pode ser vazia.' })
    readonly message: string;
}