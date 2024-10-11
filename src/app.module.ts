import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VoluntarioModule } from './voluntario/voluntario.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DatabaseModule } from './database/database.module';
import { VOLUNTARIO } from './voluntario/voluntario.entity';
import { Any } from 'typeorm';
import { join } from 'path';
import { chamadosModule } from './chamados/chamado.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // or 'postgres', etc.
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'PROJETOCHAMAKI',
      entities:  [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: false, // Be cautious in production
    }),
    VoluntarioModule,
    UsuarioModule,
    chamadosModule,
  ],
  controllers: [],
  providers: [
    {
            provide: 'DATA_SOURCE',
            useValue: Any/* Instância do DataSource */
        },
        
  ],
})
export class AppModule {}
