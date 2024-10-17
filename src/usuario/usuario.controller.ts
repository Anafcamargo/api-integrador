import { UsuarioService } from './usuario.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException } from "@nestjs/common";
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { USUARIO } from "./usuario.entity";
import { v4 as uuid } from 'uuid';
import { RetornoUsuarioDTO } from "./dto/retornoUsuario.dto";
import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";
import { LoginUsuarioDTO } from "./dto/loginUsuario.dto";
import { AlteraUsuarioDTO } from "./dto/alteraUsuario.dto";
import { ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';

@ApiTags('usuarios')
@Controller('/usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Get("listar")
    @ApiResponse({ status: 200, description: 'Lista todos os usuários' })
    async listar(): Promise<USUARIO[]> {
        return this.usuarioService.listar();
    }

    @Post("cadastro")
    @ApiCreatedResponse({ description: 'Usuário criado com sucesso' })
    async criaUsuario(@Body() dados: CriaUsuarioDTO): Promise<RetornoCadastroDTO> {
        return this.usuarioService.inserir(dados);
    }

    @Put(":id")
    @ApiResponse({ status: 200, description: 'Usuário alterado com sucesso' })
    async alterarUsuario(@Body() dados: AlteraUsuarioDTO, @Param("id") id: string): Promise<RetornoCadastroDTO> {
        return this.usuarioService.alterar(id, dados);
    }

    @Get("ID-:id")
    @ApiResponse({ status: 200, description: 'Retorna o usuário pelo ID' })
    async listarID(@Param("id") id: string): Promise<USUARIO> {
        return this.usuarioService.localizarID(id);
    }

    @Delete("remove-:id")
    @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
    async removeUsuario(@Param("id") id: string): Promise<RetornoObjDTO> {
        return this.usuarioService.remover(id);
    }

    @Post("login")
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    async loginUsuario(@Body() dados: LoginUsuarioDTO): Promise<{ token: string }> {
        const usuario = await this.usuarioService.login(dados.NOME, dados.SENHA);
        
        if (!usuario) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
        
        // Aqui você pode usar um serviço de autenticação para gerar um token
        const token = this.usuarioService.gerarToken(usuario.ID);
        return { token };
    }

    // Add other methods as needed
}
