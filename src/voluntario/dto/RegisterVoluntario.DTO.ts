import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterVoluntarioDTO {
    @IsEmail()
    @IsNotEmpty()
    EMAIL: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 20) // Exemplo: definir um tamanho mínimo e máximo para a senha
    SENHA: string;
}
