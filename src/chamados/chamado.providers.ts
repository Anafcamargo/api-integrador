
import { Inject } from "@nestjs/common";
import { DataSource } from "typeorm";
import { chamados } from "./chamado.entity";


export const chamadossProviders = [
    {
        provide: 'chamados_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(chamados),
        inject: ['DATA_SOURCE'],
    },
];
