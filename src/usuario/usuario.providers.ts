import { USUARIO } from './usuario.entity';
import { Inject } from "@nestjs/common";
import { DataSource } from "typeorm";



export const usuarioProviders = [
    {
        provide: "USUARIO_REPOSITORY",
        useFactory: (DataSource: DataSource) => DataSource.getRepository(USUARIO),
        Inject: ["DATA_SOURCE"],
    },
];