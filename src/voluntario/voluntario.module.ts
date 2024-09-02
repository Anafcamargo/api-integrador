
import { Module } from '@nestjs/common';
import { emailUnicoValidator } from './validacao/email.validator';
import { voluntarioController } from './voluntario.controller';
import { voluntariosArmazenados } from './voluntario.dm';




@Module({
  
  controllers: [voluntarioController],
  providers:[voluntariosArmazenados,emailUnicoValidator],
  
})

export class voluntarioModule {}