import { Controller, Post, Body, Res, ConflictException, Get } from '@nestjs/common';
import { Response } from 'express';
import { VOLUNTARIO } from 'src/voluntario/voluntario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { USUARIO } from 'src/usuario/usuario.entity';
import { LoginUsuarioDTO } from 'src/usuario/dto/loginUsuario.dto';
import { AuthService } from './auth.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RegisterUsuarioDTO } from 'src/usuario/dto/registerUsuario.dto';


@Controller('usuarios')
export class AuthController {
    constructor(
        private readonly AuthService: AuthService,
        private readonly usuarioService: UsuarioService, // Injetar o VoluntarioService
        @InjectRepository(USUARIO)
        private usuarioRepository: Repository<USUARIO>,
    ) {}

    @Post('login')
    async login(@Body() loginDto: LoginUsuarioDTO, @Res() res: Response) {
        console.log('Dados de login recebidos:', loginDto); // Log dos dados recebidos
        
        try {
            const usuario = await this.usuarioService.login(loginDto); // Usar VoluntarioService para login
            
            const token = this.AuthService.gerarToken(usuario); // Gerar token com AuthService
            return res.status(200).json({ token, usuario });
        } catch (error) {
            console.error('Erro no login:', error);
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
    }

    @Post('register')
    async register(@Body() dados: RegisterUsuarioDTO): Promise<USUARIO> {
        // Verificar se o e-mail já está em uso
        const existingUsuario = await this.usuarioRepository.findOne({ where: { TELEFONE: dados.TELEFONE } });
        if (existingUsuario) {
            throw new ConflictException('Telefone já está em uso');
        }

        // Se o e-mail não estiver em uso, prosseguir com o registro
        return await this.usuarioService.register(dados); 
    }

    @Get('test-login')
    async testLogin() {
        const telefone = '14988084759'; // substitua pelo email que você está testando
        const senha = '123456'; // substitua pela senha correspondente
        console.log('Buscando usuário com email:', telefone);
        const usuario = await this.usuarioRepository.findOne({ where: { TELEFONE: telefone } });
        
        if (usuario) {
            const isPasswordValid = await bcrypt.compare(senha, usuario.SENHA);
            return { isPasswordValid, usuario };
        } else {
            return { message: 'Voluntário não encontrado' };
        }
    }

    @Post('test-password')
    async testPassword(@Body() body: { passwordToTest: string, hashedPassword: string }) {
        const { passwordToTest, hashedPassword } = body;
        
        const isPasswordValid = await bcrypt.compare(passwordToTest, hashedPassword);
        return { isPasswordValid };
    }
}

