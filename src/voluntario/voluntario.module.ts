/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { voluntarioController } from './voluntario.controller';
import { voluntariosArmazenados } from './voluntario.dm';




@Module({
  
  controllers: [voluntarioController],
  providers:[voluntariosArmazenados],
  
})

export class voluntarioModule {}