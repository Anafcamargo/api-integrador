/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { voluntarioModule } from './voluntario/voluntario.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ChamadoModule } from './chamados/chamado.module';


@Module({
  imports: [voluntarioModule,UsuarioModule,ChamadoModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
