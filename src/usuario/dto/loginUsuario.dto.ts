import { IsNotEmpty, IsString, MinLength, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUsuarioDTO {
    status(arg0: number) {
        throw new Error('Method not implemented.');
    }
    
    @IsString()
    @IsNotEmpty({ message: "Senha não pode ser vazia" })
    @MinLength(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    @ApiProperty({
        example: "senhaSegura123",
        description: "Senha do usuário, deve ter pelo menos 6 caracteres"
    })
    SENHA: string;

    @IsString()
    @IsNotEmpty({ message: "Telefone não pode ser vazio" })
    @Matches(/^\d{10,15}$/, { message: "O telefone deve conter entre 10 a 15 dígitos" }) 
    @ApiProperty({
        example: "9876543210",
        description: "Telefone do usuário, deve ter entre 10 a 15 dígitos"
    })
    TELEFONE: string; 
}
