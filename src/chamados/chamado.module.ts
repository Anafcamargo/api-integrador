

import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { voluntarioProviders } from "src/voluntario/voluntario.providers";
import { VoluntarioService } from "src/voluntario/voluntario.service";
import { usuarioProviders } from "src/usuario/usuario.providers";
import { UsuarioService } from "src/usuario/usuario.service";
import { chamadosController } from "./chamado.controller";
import { chamadossProviders } from "./chamado.providers";
import { chamadosService } from "./chamado.service";
 
@Module({
    imports: [DatabaseModule],
    controllers: [chamadosController],
    providers: [
        ...chamadossProviders,
        chamadosService,
        ...voluntarioProviders,
        VoluntarioService,
        ...usuarioProviders,
        UsuarioService,
    ],
    exports: [chamadosService], 
})
export class chamadosModule {}
