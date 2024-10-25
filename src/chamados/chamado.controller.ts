import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CriachamadosDTO } from './dto/criachamados.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { chamados } from './chamado.entity';
import { chamadosService } from './chamado.service';
import { USUARIO } from 'src/usuario/usuario.entity';
import { User } from 'src/decorator/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsuarioService } from 'src/usuario/usuario.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('chamados')
@Controller("/chamados")
export class chamadosController {
    usuarioServie: any;
    constructor(private readonly chamadosService: chamadosService,
        private readonly usuarioService: UsuarioService
    ) { console.log('UsuarioService:', usuarioService);}
    

    @Get("listar")
    @ApiResponse({ status: 200, description: 'Lista todos os chamados.' })
    async listar(): Promise<chamados[]> {
        return this.chamadosService.listar();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('cadastro')
    async criarChamado(@User() user, @Body() dados: CriachamadosDTO) {
      dados.IDUSUARIO = user.userId; // Usa o decorator para obter o ID do usuário
      return this.chamadosService.inserir(dados);
    }

    @UseGuards(JwtAuthGuard)
    @Get("usuario/:id") 
    @ApiResponse({ status: 200, description: 'Retorna o usuário correspondente ao ID.' })
    async listarUsuario(@Param("id") id: string): Promise<USUARIO> {
        return this.usuarioService.localizarID(id); // Implementação para encontrar o usuário
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
