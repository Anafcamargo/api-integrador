import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthVoluntarioService } from 'src/auth-voluntario/authservicev';
import { VoluntarioModule } from 'src/voluntario/voluntario.module';
import { AuthVoluntarioController } from 'src/auth-voluntario/authcontrollerv';
import { VOLUNTARIO } from 'src/voluntario/voluntario.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    TypeOrmModule.forFeature([VOLUNTARIO]),
    forwardRef(() => VoluntarioModule), // certifique-se de que está correto
  ],
  controllers: [ AuthVoluntarioController],
  providers: [ AuthVoluntarioService],
  exports: [ AuthVoluntarioService, JwtModule],
})
export class AuthModuleVoluntario {}
