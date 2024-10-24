import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { VoluntarioService } from 'src/voluntario/voluntario.service';
import { VOLUNTARIO } from 'src/voluntario/voluntario.entity';
import { LoginVoluntarioDTO } from 'src/voluntario/dto/loginvoluntario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginUsuarioDTO } from 'src/usuario/dto/loginUsuario.dto';
import { USUARIO } from 'src/usuario/usuario.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usuarioService: UsuarioService,
    ) {}

    // Função de login
    async login(dados: LoginUsuarioDTO): Promise<{ token: string; usuario: USUARIO }> {
        const { TELEFONE, SENHA } = dados;

        // Validação do voluntário (delegando ao VoluntarioService)
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
        const payload = { telefone: usuario.TELEFONE, sub: usuario.ID };
        return this.jwtService.sign(payload);  // Gera o token
    }
}
