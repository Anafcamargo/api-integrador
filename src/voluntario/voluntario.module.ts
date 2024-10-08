
import { Module } from '@nestjs/common';
import { emailUnicoValidator } from './validacao/email.validator';
import { voluntarioController } from './voluntario.controller';
import { voluntarioProviders } from './voluntario.providers';
import { VoluntarioService } from './voluntario.service';
import { DatabaseModule } from 'src/database/database.module';




@Module({
  
  imports: [DatabaseModule],
  controllers: [voluntarioController],
  providers:[
    ...voluntarioProviders,
    VoluntarioService,
    emailUnicoValidator
  ],
  
})

export class voluntarioModule {} 


