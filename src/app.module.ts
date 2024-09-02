/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { voluntarioModule } from './voluntario/voluntario.module';
import { UsuarioModule } from './usuario/usuario.module';


@Module({
  imports: [voluntarioModule,UsuarioModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
