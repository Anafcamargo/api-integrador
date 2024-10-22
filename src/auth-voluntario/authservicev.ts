import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { VoluntarioService } from 'src/voluntario/voluntario.service';
import { VOLUNTARIO } from 'src/voluntario/voluntario.entity';
import { LoginVoluntarioDTO } from 'src/voluntario/dto/loginvoluntario.dto';

@Injectable()
export class AuthVoluntarioService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly voluntarioService: VoluntarioService,
    ) {}

    // Função de login
    async login(dados: LoginVoluntarioDTO): Promise<{ token: string; voluntario: VOLUNTARIO }> {
        const { EMAIL, SENHA } = dados;

        // Validação do voluntário (delegando ao VoluntarioService)
        const voluntario = await this.voluntarioService.validarVoluntario(EMAIL, SENHA);
            // // Log para verificar as senhas
            // console.log('Email:', EMAIL);
            // console.log('Senha fornecida:', SENHA);
            // console.log('Senha armazenada:', voluntario.SENHA); // A senha armazenada no banco de dados
        if (!voluntario) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        // Gerar o token JWT
        const token = this.gerarToken(voluntario);
        return { token, voluntario };
    }

    // Função para gerar token JWT
    public gerarToken(voluntario: VOLUNTARIO): string {
        const payload = { email: voluntario.EMAIL, sub: voluntario.ID };
        return this.jwtService.sign(payload);  // Gera o token
    }
}
