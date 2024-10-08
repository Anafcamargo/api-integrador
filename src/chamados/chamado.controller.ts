import { ChamadoService } from './chamado.service';
import { DateOptions } from './../../node_modules/@sinclair/typebox/typebox.d';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CHAMADO } from './chamado.entity';
import { CriaChamadoDTO } from './dto/criaChamados.dto';

@Controller("/chamado")
export class ChamadoController{
    constructor(private readonly ChamadoService: ChamadoService){

    }

    @Get("listar")
    async listar (): Promise<CHAMADO[]>{
        return this.ChamadoService.listar();
    }

    @Post("")
    async criaChamado(@Body() dados: CriaChamadoDTO): Promise<RetornoCadastroDTO>{
        return this.ChamadoService.inserir(dados)
    }

    // @Put (":id")
    // async alterarChamado(@Body() dados: AlteraChamadoDTO, @Param("id") id: string): Promise<RetornoCadastroDTO>{
    //     return this.ChamadoService.alterar(id,dados)
    // }

    @Get("ID-:id")
    async listarID(@Param("id") id:string): Promise<CHAMADO>{
        return this.ChamadoService.localizarID(id);
    }

    @Delete("remove-:id")
    async removeChamado(@Param("id") id: string): Promise<RetornoObjDTO>{
        return this.ChamadoService.remover(id);
    }
}