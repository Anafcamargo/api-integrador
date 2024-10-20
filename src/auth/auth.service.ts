import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUsuarioDTO } from 'src/usuario/dto/loginUsuario.dto';
import { USUARIO } from 'src/usuario/usuario.entity';
import { UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(USUARIO)
        private usuarioRepository: Repository<USUARIO>,
    ) {}

    async login(dados: LoginUsuarioDTO): Promise<USUARIO | null> {
        const { TELEFONE, SENHA } = dados;

        // 1. Encontrar o usuário pelo telefone
        const usuario = await this.usuarioRepository.findOne({ where: { TELEFONE } });
        if (!usuario) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        // 2. Comparar a senha informada com a senha armazenada
        const isPasswordValid = await bcrypt.compare(SENHA, usuario.SENHA);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        return usuario;

       
      }

      gerarToken(usuario: USUARIO): string {
        const payload = { id: usuario.IDUSUARIO };
        return jwt.sign(payload, 'seu_segredo', { expiresIn: '1h' }); // Ajuste o segredo e as opções conforme necessário
    }

    
}
