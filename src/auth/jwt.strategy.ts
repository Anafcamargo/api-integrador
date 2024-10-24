import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { USUARIO } from 'src/usuario/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usuarioService: UsuarioService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'seu_segredo', // Substitua pela sua chave secreta
        });
    }

    async validate(payload: any): Promise<USUARIO> {
        return this.usuarioService.findById(payload.id);
    }
}
