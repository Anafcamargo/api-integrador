// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { VoluntarioController } from './voluntario.controller'; // Capitalized the controller name
// import { VoluntarioService } from './voluntario.service';
// import { voluntarioProviders } from './voluntario.providers';
// import { DatabaseModule } from 'src/database/database.module';
// import { VOLUNTARIO } from './voluntario.entity';
// // import { validarEmail } from './validacao/email.validator'; // Uncomment if needed

// @Module({
//   imports: [
//     DatabaseModule,
//     TypeOrmModule.forFeature([VOLUNTARIO])  // Register VOLUNTARIO entity
//   ],
//   controllers: [VoluntarioController], // Capitalized the controller name
//   providers: [
//     ...voluntarioProviders,
//     VoluntarioService,
//     // validarEmail // Uncomment if needed
//   ],
//   exports: [VoluntarioService],
// })
// export class VoluntarioModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { voluntarioController } from './voluntario.controller';
import { VoluntarioService } from './voluntario.service';
import { voluntarioProviders } from './voluntario.providers';
import { DatabaseModule } from 'src/database/database.module';
import { VOLUNTARIO } from './voluntario.entity';
// import { validarEmail } from './validacao/email.validator';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([VOLUNTARIO])  // Register VOLUNTARIO entity
  ],
  controllers: [voluntarioController],
  providers: [
    ...voluntarioProviders,
    VoluntarioService,
    // validarEmail
  ],
  exports: [VoluntarioService],
})
export class VoluntarioModule {}
