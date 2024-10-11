

import { IsNotEmpty, IsString } from 'class-validator';

export class RetornoCadastroDTO {
    @IsString()
    @IsNotEmpty({ message: 'ID não pode ser vazio.' })
    readonly id: string;

    @IsString()
    @IsNotEmpty({ message: 'Mensagem não pode ser vazia.' })
    readonly message: string;
}

export class RetornoObjDTO {
    readonly return: any;  // Considere tipar isso com um tipo mais específico se possível
    @IsString()
    @IsNotEmpty({ message: 'Mensagem não pode ser vazia.' })
    readonly message: string;
}
