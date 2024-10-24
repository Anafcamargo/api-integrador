
import { Module, forwardRef } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usuarioProviders } from './usuario.providers';
import { UsuarioService } from './usuario.service';
import { telefoneUnicoValidator } from './validacao/telefone.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USUARIO } from './usuario.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({  
  imports: [DatabaseModule, TypeOrmModule.forFeature([USUARIO]),forwardRef(() => AuthModule)],
  controllers: [UsuarioController],  
  providers: [
    {
      provide: 'VOLUNTARIO_REPOSITORY',
      useFactory: (dataSource) => dataSource.getRepository(USUARIO),
      inject: ['DATA_SOURCE'], // Certifique-se de que DATA_SOURCE está sendo injetado corretamente
    },
    ...usuarioProviders,
    UsuarioService,
    telefoneUnicoValidator,
    AuthModule
  ],
  exports: [UsuarioService],
})
export class UsuarioModule {
}
