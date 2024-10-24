import { forwardRef, Module} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USUARIO } from 'src/usuario/usuario.entity';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtStrategy } from './jwt.strategy'; 
import { UsuarioService } from 'src/usuario/usuario.service';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [
    forwardRef(() => UsuarioModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],  // Adicione o ConfigModule
      inject: [ConfigService],  // Injeta o ConfigService
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),  // Use o ConfigService para pegar o segredo
        signOptions: { expiresIn: '2h' },
      }),
    }),
    TypeOrmModule.forFeature([USUARIO]),
    ConfigModule
  ],
  controllers: [AuthController,],
  providers: [AuthService,UsuarioService,JwtStrategy],
  exports: [AuthService,JwtModule],
})
export class AuthModule {}





