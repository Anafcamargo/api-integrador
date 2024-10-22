import { Controller, Post, Body, Res, ConflictException, Get } from '@nestjs/common';
import { LoginVoluntarioDTO } from 'src/voluntario/dto/loginVoluntario.dto';
import { Response } from 'express';
import { AuthVoluntarioService } from './authservicev';
import { VOLUNTARIO } from 'src/voluntario/voluntario.entity';
import { RegisterVoluntarioDTO } from 'src/voluntario/dto/RegisterVoluntario.DTO';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('voluntarios')
export class AuthVoluntarioController {
    constructor(
        private readonly Authservicev: AuthVoluntarioService,
        @InjectRepository(VOLUNTARIO)
        private voluntarioRepository: Repository<VOLUNTARIO>,
    ) {}

    @Post('login')
    async login(@Body() loginDto: LoginVoluntarioDTO, @Res() res: Response) {
    console.log('Dados de login recebidos:', loginDto); // Log dos dados recebidos
    try {
        const { token, voluntario } = await this.Authservicev.login(loginDto);
        return res.status(200).json({ token, voluntario });
    } catch (error) {
        console.error('Erro no login:', error); // Log do erro
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    }

    @Post('generate-hash')
    async generateHash(@Body() body: { password: string }) {
        const hash = await this.Authservicev.generateHash(body.password);
        return { hash };
    }

    @Get('test-login')
    async testLogin() {
    const email = 'af.bauru16@gmail.com'; // substitua pelo email que você está testando
    const senha = '123456'; // substitua pela senha correspondente
    console.log('Buscando voluntário com email:', email); // Adicione este log
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


    @Post('register')
    async register(@Body() dados: RegisterVoluntarioDTO): Promise<VOLUNTARIO> {
        // Verificar se o e-mail já está em uso
        const existingVoluntario = await this.voluntarioRepository.findOne({ where: { EMAIL: dados.EMAIL } });
        if (existingVoluntario) {
            throw new ConflictException('E-mail já está em uso');
        }

        // Se o e-mail não estiver em uso, prosseguir com o registro
        const voluntario = this.voluntarioRepository.create(dados);
        // Aqui você deve hash a senha antes de salvar
        voluntario.SENHA = await bcrypt.hash(dados.SENHA, 10);
        return await this.voluntarioRepository.save(voluntario);
    }
}
