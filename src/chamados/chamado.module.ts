import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { chamadoProviders } from "./chamado.provides";
import { ChamadoService } from "./chamado.service";
import { ChamadoController } from "./chamado.controller";
import { voluntarioProviders } from "src/voluntario/voluntario.providers";
import { VoluntarioService } from "src/voluntario/voluntario.service";
import { usuarioProviders } from "src/usuario/usuario.providers";
import { UsuarioService } from "src/usuario/usuario.service";


@Module({
    imports: [DatabaseModule],
    controllers: [ChamadoController],
    providers: [
        ...chamadoProviders,
        ChamadoService,
        ...voluntarioProviders,
        VoluntarioService,
        ...usuarioProviders,
        UsuarioService,

    ],
})

export class ChamadoModule {}