import { Module, forwardRef } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usuarioProviders } from './usuario.providers';
import { UsuarioService } from './usuario.service';
import { telefoneUnicoValidator } from './validacao/telefone.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DataSource } from 'typeorm';
import { USUARIO } from './usuario.entity';


@Module({  
  imports: [DatabaseModule, TypeOrmModule.forFeature([USUARIO]),forwardRef(() => AuthModule)],
  controllers: [UsuarioController],  
  providers: [
    {
      provide: 'USUARIO_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(USUARIO),
      inject: ['DATA_SOURCE'],
    },
    ...usuarioProviders,
    UsuarioService,
    telefoneUnicoValidator,
   
  ],
  exports: [UsuarioService,'USUARIO_REPOSITORY'],
})
export class UsuarioModule {
}
