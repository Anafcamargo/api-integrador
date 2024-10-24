import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { USUARIO } from 'src/usuario/usuario.entity';
import { LoginUsuarioDTO } from 'src/usuario/dto/loginUsuario.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usuarioService: UsuarioService,
        private configService: ConfigService,
    ) {}

    // Função de login
    async login(dados: LoginUsuarioDTO): Promise<{ token: string; usuario: USUARIO }> {
        const { TELEFONE, SENHA } = dados;
        const usuario = await this.usuarioService.validarUsuario(TELEFONE, SENHA);

        if (!usuario) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        // Gerar o token JWT
        const token = this.gerarToken(usuario);
        return { token, usuario };
    }

    // Função para gerar token JWT
    public gerarToken(usuario: USUARIO): string {
        const secret = this.configService.get<string>('JWT_SECRET');
        const payload = { telefone: usuario.TELEFONE, sub: usuario.ID };
        return this.jwtService.sign(payload);  // Gera o token
    }

    // Método para validar o usuário com base no payload do JWT
    async validateUser(userId: string): Promise<USUARIO> {
        const usuario = await this.usuarioService.findById(userId); // Implemente este método no UsuarioService
        if (!usuario) {
            throw new UnauthorizedException('Usuário não encontrado');
        }
        return usuario;
    }
}
