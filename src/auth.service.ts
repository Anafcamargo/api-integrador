import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  gerarToken(usuarioId: string): string {
    const payload = { id: usuarioId };
    return this.jwtService.sign(payload);
  }
}
