import { Controller, Post, Body, Res, ConflictException } from '@nestjs/common';
 // Serviço de autenticação de voluntários
import { LoginVoluntarioDTO } from 'src/voluntario/dto/loginVoluntario.dto'; // DTO para voluntários
import { Response } from 'express';
import { AuthVoluntarioService } from './authservicev';
import { VOLUNTARIO } from 'src/voluntario/voluntario.entity';
import { RegisterVoluntarioDTO } from 'src/voluntario/dto/RegisterVoluntario.DTO';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('voluntarios')
export class AuthVoluntarioController {
    constructor(private readonly Authservicev: AuthVoluntarioService,
        @InjectRepository(VOLUNTARIO)
        private voluntarioRepository: Repository<VOLUNTARIO>,
    ) {}

    // @Post('login')
    // async login(@Body() dados: LoginVoluntarioDTO, @Res() res: Response) {
    //     try {
    //         const voluntario = await this.Authservicev.login(dados);
    //         const token = this.Authservicev.gerarToken(voluntario); // Gera o token
    //         return res.status(200).json({ token, voluntario }); // Retorna o token e o voluntário
    //     } catch (error) {
    //         return res.status(401).json({ message: 'Credenciais inválidas' });
    //     }
    // }

    @Post('login')
async login(@Body() loginDto: LoginVoluntarioDTO) {
    const voluntario = await this.Authservicev.login(loginDto.EMAIL, loginDto.SENHA);
    return voluntario; // Retorna o token e os dados do voluntário
}

async register(dados: RegisterVoluntarioDTO): Promise<VOLUNTARIO> {
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

