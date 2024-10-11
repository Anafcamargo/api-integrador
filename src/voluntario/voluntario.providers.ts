
import { Inject } from "@nestjs/common";
import { DataSource } from "typeorm";
import { VOLUNTARIO } from "./voluntario.entity";



export const voluntarioProviders = [
    {
        provide: "VOLUNTARIO_REPOSITORY",
        useFactory: (DataSource: DataSource) => DataSource.getRepository(VOLUNTARIO),
        Inject: ["DATA_SOURCE"],
    },
];

