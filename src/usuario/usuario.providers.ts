import { USUARIO } from './usuario.entity';
import { Inject } from "@nestjs/common";
import { DataSource } from "typeorm";



export const usuarioProviders = [
    {
        provide: 'USUARIO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository<USUARIO>(USUARIO),
        inject: ['DATA_SOURCE'],
    },
];