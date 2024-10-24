import { USUARIO } from './usuario.entity';
import { Inject } from "@nestjs/common";
import { DataSource } from "typeorm";



export const usuarioProviders = [
    {
        provide: 'USUARIO_REPOSITORY',
        useFactory: (dataSource: DataSource) => {
            if (!dataSource) {
                throw new Error('DataSource is not initialized');
            }
            return dataSource.getRepository(USUARIO);
        },
        inject: ['DATA_SOURCE'],
    },
];