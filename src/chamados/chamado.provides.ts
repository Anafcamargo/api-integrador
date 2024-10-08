import { Inject } from "@nestjs/common";
import { DataSource } from "typeorm";
import { CHAMADO } from "./chamado.entity";



export const chamadoProviders = [
    {
        provide: "CHAMADO_REPOSITORY",
        useFactory: (DataSource: DataSource) => DataSource.getRepository(CHAMADO),
        Inject: ["DATA_SOURCE"],
    },
];