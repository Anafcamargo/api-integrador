import { VoluntarioService } from './voluntario.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CriaVoluntarioDTO } from "./dto/criaVoluntario.dto";
import {VOLUNTARIO} from "./voluntario.entity";
import {  ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger"; 
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';


@ApiTags('voluntario')
@Controller('/voluntarios')
export class voluntarioController{
    
    constructor(private readonly VoluntarioService : VoluntarioService){} 

    @Get("listar")
    @ApiResponse({ status: 200, description: 'Lista todos os usuários' })
    async listar(): Promise<VOLUNTARIO[]>{
        return this.VoluntarioService.listar();
    }

    @Post("cadastro")
    @ApiCreatedResponse({ description: 'Usuário criado com sucesso' })
    async criaVoluntario(@Body() dados: CriaVoluntarioDTO): Promise<RetornoCadastroDTO> {
        return this.VoluntarioService.inserir(dados);
    }

    @Put (":id")
    @ApiResponse({ status: 200, description: 'Usuário alterado com sucesso' })
    async alterarVoluntario(@Body() dados: CriaVoluntarioDTO, @Param("id") id: string): Promise<RetornoCadastroDTO> {
        return this.VoluntarioService.alterar(id,dados);
    }

    @Get("ID-:id")
    @ApiResponse({ status: 200, description: 'Retorna o usuário pelo ID' })
    async listarID(@Param("id") id:string): Promise<VOLUNTARIO> {
        return this.VoluntarioService.localizarID(id);
    }

    @Delete("remove-:id")
    @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
    async removeVoluntario(@Param("id") id: string): Promise<RetornoObjDTO> {
        return this.VoluntarioService.remover(id);
    }

}