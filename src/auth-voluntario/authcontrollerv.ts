

import { Controller, Post, Body, Res, ConflictException, Get } from '@nestjs/common';
import { LoginVoluntarioDTO } from 'src/voluntario/dto/loginVoluntario.dto';
import { Response } from 'express';
import { AuthVoluntarioService } from './authservicev'; // Serviço de autenticação, se aplicável
import { VOLUNTARIO } from 'src/voluntario/voluntario.entity';
import { RegisterVoluntarioDTO } from 'src/voluntario/dto/RegisterVoluntario.DTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoluntarioService } from 'src/voluntario/voluntario.service'; // Importar o VoluntarioService
import * as bcrypt from 'bcryptjs';


@Controller('voluntarios')
export class AuthVoluntarioController {
    constructor(
        private readonly Authservicev: AuthVoluntarioService,
        private readonly voluntarioService: VoluntarioService, // Injetar o VoluntarioService
        @InjectRepository(VOLUNTARIO)
        private voluntarioRepository: Repository<VOLUNTARIO>,
    ) {}

    @Post('login')
    async login(@Body() loginDto: LoginVoluntarioDTO, @Res() res: Response) {
        console.log('Dados de login recebidos:', loginDto); // Log dos dados recebidos
        
        try {
            const voluntario = await this.voluntarioService.login(loginDto); // Usar VoluntarioService para login
            
            const token = this.Authservicev.gerarToken(voluntario); // Gerar token com AuthService
            return res.status(200).json({ token, voluntario });
        } catch (error) {
            console.error('Erro no login:', error);
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
    }

    @Post('register')
    async register(@Body() dados: RegisterVoluntarioDTO): Promise<VOLUNTARIO> {
        // Verificar se o e-mail já está em uso
        const existingVoluntario = await this.voluntarioRepository.findOne({ where: { EMAIL: dados.EMAIL } });
        if (existingVoluntario) {
            throw new ConflictException('E-mail já está em uso');
        }

        // Se o e-mail não estiver em uso, prosseguir com o registro
        return await this.voluntarioService.register(dados); // Chamar o método de registro do VoluntarioService
    }

    @Get('test-login')
    async testLogin() {
        const email = 'af.bauru@hotmail.com'; // substitua pelo email que você está testando
        const senha = 'senha123'; // substitua pela senha correspondente
        console.log('Buscando voluntário com email:', email);
        const voluntario = await this.voluntarioRepository.findOne({ where: { EMAIL: email } });
        
        if (voluntario) {
            const isPasswordValid = await bcrypt.compare(senha, voluntario.SENHA);
            return { isPasswordValid, voluntario };
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

