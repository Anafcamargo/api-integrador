
import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usuarioProviders } from './usuario.providers';
import { UsuarioService } from './usuario.service';
import { telefoneUnicoValidator } from './validacao/telefone.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USUARIO } from './usuario.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({  
  imports: [DatabaseModule, TypeOrmModule.forFeature([USUARIO]),AuthModule],
  controllers: [UsuarioController],  
  providers: [
    ...usuarioProviders,
    UsuarioService,
    telefoneUnicoValidator
  ],
  exports: [UsuarioService],
})
export class UsuarioModule {
}
