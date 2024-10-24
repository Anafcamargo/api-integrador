import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VoluntarioModule } from './voluntario/voluntario.module';
import { UsuarioModule } from './usuario/usuario.module';

import { VOLUNTARIO } from './voluntario/voluntario.entity';
import { Any } from 'typeorm';
import { join } from 'path';
import { chamadosModule } from './chamados/chamado.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModuleVoluntario } from './auth-voluntario/authv.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    DatabaseModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // or 'postgres', etc.
      host: 'localhost', //'50.116.112.16'
      port: 3306,
      username: 'root', //'vitali04_rootchamaki'
      password: '', //'toctoctoc123'
      database: 'CHAMAKI', //'vitali04_chamaki'
      entities:  [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: false, // Be cautious in production
    }),
    VoluntarioModule,
    UsuarioModule,
    chamadosModule,
    FilesModule,
    AuthModule,
    AuthModuleVoluntario
  ],
  controllers: [],
  providers: [
    
        
  ],
})
export class AppModule {}
