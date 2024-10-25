import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards, Request } from "@nestjs/common";
import { CriaVoluntarioDTO } from "./dto/criaVoluntario.dto";
import {VOLUNTARIO} from "./voluntario.entity";
import {  ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger"; 
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { LoginVoluntarioDTO } from './dto/loginvoluntario.dto';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
import { VoluntarioService } from "./voluntario.service";
import { RegisterVoluntarioDTO } from "./dto/RegisterVoluntario.DTO";
import { AuthVoluntarioService } from "src/auth-voluntario/authservicev";
import { alteraVoluntarioDTO } from "./dto/alteravoluntario.dto";

@ApiTags('voluntario')
@Controller('/voluntarios')
export class voluntarioController{
    
    constructor(@Inject('VOLUNTARIO_REPOSITORY')
    private readonly voluntarioRepository: Repository<VOLUNTARIO>,
    private readonly VoluntarioService : VoluntarioService,
    private readonly authVoluntarioService: AuthVoluntarioService){} 

    @Get("listar")
    @ApiResponse({ status: 200, description: 'Lista todos os usuários' })
    async listar(): Promise<VOLUNTARIO[]>{
        return this.VoluntarioService.listar();
    }

    @Post('cadastro')
    async cadastrar(@Body() dados: CriaVoluntarioDTO, @Res() res: Response) {
        const resultado = await this.VoluntarioService.inserir(dados);
        return res.status(201).json(resultado);
    }


    @Post('login')
    async login(@Body() loginDto: LoginVoluntarioDTO) {
        return await this.VoluntarioService.login(loginDto); // Passa o DTO completo
    }


    @Get("/:id") 
    @ApiResponse({ status: 200, description: 'Retorna o usuário correspondente ao ID.' })
    async listarvoluntario(@Param("id") id: string): Promise<VOLUNTARIO> {
        return this.VoluntarioService.localizarID(id); // Implementação para encontrar o usuário
    }

    @Get('voluntario/me')
    async getVoluntario(@Request() req): Promise<VOLUNTARIO> {
        console.log(req.user); // Adicione esta linha para debugar
    return req.user; // Retorna o voluntário autenticado 
    }

    @Put (":id")
    @ApiResponse({ status: 200, description: 'voluntário alterado com sucesso' })
    async alterarVoluntario(@Body() dados: alteraVoluntarioDTO, @Param("id") id: string): Promise<RetornoCadastroDTO> {
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