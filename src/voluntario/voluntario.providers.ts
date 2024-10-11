
import { Inject } from "@nestjs/common";
import { DataSource } from "typeorm";
import { VOLUNTARIO } from "./voluntario.entity";

export const voluntarioProviders = [
    {
        provide: 'VOLUNTARIO_REPOSITORY',
        useFactory: (dataSource: DataSource) => {
            if (!dataSource) {
                throw new Error('DataSource is not initialized');
            }
            return dataSource.getRepository(VOLUNTARIO);
        },
        inject: ['DATA_SOURCE'],
    },
];

