import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USUARIO } from 'src/usuario/usuario.entity';
import { AuthController } from './auth.controller';
import { VOLUNTARIO } from 'src/voluntario/voluntario.entity';
import { AuthVoluntarioController } from 'src/auth-voluntario/authcontrollerv';
import { AuthVoluntarioService } from 'src/auth-voluntario/authservicev';
import { VoluntarioModule } from 'src/voluntario/voluntario.module';
import { UsuarioModule } from 'src/usuario/usuario.module';




@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    TypeOrmModule.forFeature([USUARIO]),
    forwardRef(() => UsuarioModule), 
  ],
  controllers: [AuthController,],
  providers: [AuthService],
  exports: [AuthService,JwtModule],
})
export class AuthModule {}
