import { UsuarioService } from './usuario.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Res, UnauthorizedException } from "@nestjs/common";
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { USUARIO } from "./usuario.entity";
import { LoginUsuarioDTO } from "./dto/loginUsuario.dto";
import { AlteraUsuarioDTO } from "./dto/alteraUsuario.dto";
import { ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto'; 
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';



@ApiTags('usuarios')
@Controller('/usuarios')
export class UsuarioController {
    constructor(
        private readonly usuarioService: UsuarioService, // Injete o UsuarioService
        private readonly authService: AuthService, // Injete o AuthService
    ) {}

    @Get("listar")
    @ApiResponse({ status: 200, description: 'Lista todos os usuários' })
    async listar(): Promise<USUARIO[]> {
        return this.usuarioService.listar();
    }

    @Post("cadastro")
    async criaUsuario(@Body() dados: CriaUsuarioDTO, @Res() res: Response) {
        const usuarioCriado = await this.usuarioService.inserir(dados);
        return res.status(201).json(usuarioCriado);
        
        // Retorna um objeto com a mensagem e, se necessário, o ID do usuário
        // return { id: usuarioCriado.id, message: "Usuário criado com sucesso! Faça login para continuar." };
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

   
    @Post('login')
    async login(@Body() loginDto: LoginUsuarioDTO) {
        return await this.usuarioService.login(loginDto); // Passa o DTO completo
    }

    
}
