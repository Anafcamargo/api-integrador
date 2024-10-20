import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsuarioDTO } from 'src/usuario/dto/loginUsuario.dto';
import { Response } from 'express';

@Controller('usuarios')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() dados: LoginUsuarioDTO, @Res() res: Response) {
        return await this.authService.login(dados);
    }
}
