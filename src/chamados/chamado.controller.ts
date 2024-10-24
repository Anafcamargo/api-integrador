
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CriachamadosDTO } from './dto/criachamados.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { chamados } from './chamado.entity';
import { chamadosService } from './chamado.service';
import { USUARIO } from 'src/usuario/usuario.entity';

@ApiTags('chamados')
@Controller("/chamados")
export class chamadosController {
    usuarioServie: any;
    constructor(private readonly chamadosService: chamadosService) {}

    @Get("listar")
    @ApiResponse({ status: 200, description: 'Lista todos os chamados.' })
    async listar(): Promise<chamados[]> {
        return this.chamadosService.listar();
    }

    @Post("cadastro")
    @ApiResponse({ status: 201, description: 'Chamado cadastrado com sucesso.' })
    async criachamados(@Body() dados: CriachamadosDTO): Promise<RetornoCadastroDTO> {
        // Implementação para salvar o chamado
        return this.chamadosService.inserir(dados);
    }


    @Get("usuario/:id")
    @ApiResponse({ status: 200, description: 'Retorna o usuário correspondente ao ID.' })
    async listarUsuario(@Param("id") id: string): Promise<USUARIO> {
        return this.usuarioServie.localizarID(id); // Implementação para encontrar o usuário
    }

    @Delete("remove-:id")
    @ApiResponse({ status: 200, description: 'chamados excluído com sucesso.' })
    async removechamados(@Param("id") id: string): Promise<RetornoObjDTO> {
        return this.chamadosService.remover(id);
    }

    // @Put(":id")
    // async alterarchamados(@Body() dados: AlterachamadosDTO, @Param("id") id: string): Promise<RetornoCadastroDTO> {
    //     return this.chamadosService.alterar(id, dados);
    // }
}
