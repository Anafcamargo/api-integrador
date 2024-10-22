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

    @Post('register')
    async register(@Body() dados: RegisterVoluntarioDTO) {
        return await this.VoluntarioService.register(dados);
    }

    @Get('voluntario/me')
    // @UseGuards(AuthGuard()) // Protege a rota
    async getVoluntario(@Request() req): Promise<VOLUNTARIO> {
    return req.user; // Retorna o voluntário autenticado
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