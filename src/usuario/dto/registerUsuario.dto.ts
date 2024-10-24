import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUsuarioDTO {
    @IsString()
    @IsNotEmpty()
    TELEFONE: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 20) // Exemplo: definir um tamanho mínimo e máximo para a senha
    SENHA: string;
}
