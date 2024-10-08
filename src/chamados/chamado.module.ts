import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { chamadoProviders } from "./chamado.provides";
import { ChamadoService } from "./chamado.service";
import { ChamadoController } from "./chamado.controller";


@Module({
    imports: [DatabaseModule],
    controllers: [ChamadoController],
    providers: [
        ...chamadoProviders,
        ChamadoService,
    ],
})

export class ChamadoModule {}