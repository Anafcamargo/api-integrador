
import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usuarioProviders } from './usuario.providers';
import { UsuarioService } from './usuario.service';


@Module({  
  imports: [DatabaseModule],
  controllers: [UsuarioController],  
  providers: [
    ...usuarioProviders,
    UsuarioService,
  ],
  exports: [UsuarioService],
})
export class UsuarioModule {}
