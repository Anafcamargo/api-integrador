
import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { CriachamadosDTO } from "./dto/criachamados.dto";
import {  chamados } from "./chamado.entity";



@Injectable ()
export class chamadosService {
    constructor(
        @Inject("chamados_REPOSITORY")
        private chamadosRepository: Repository<chamados>, 
    ) {}

    async listar(): Promise<chamados[]> {
        return this.chamadosRepository.find();
    }

    async inserir(dados: CriachamadosDTO): Promise<RetornoCadastroDTO> {
        const chamado = new chamados();
        chamado.ID = uuid();
        chamado.NOME = dados.NOME;
        chamado.TELEFONE = dados.TELEFONE;
        chamado.DESCRICAO = dados.DESCRICAO;
        chamado.CATEGORIA = dados.CATEGORIA;
        chamado.IDUSUARIO = dados.IDUSUARIO;
        
    
        try {
            await this.chamadosRepository.save(chamado);
            return { id: chamado.ID, message: "Chamado cadastrado!" };
        } catch (error) {
            console.error("Erro ao cadastrar chamado:", error); // Log para depuração
            return { id: "", message: "Houve um erro ao cadastrar: " + error.message };
        }
    }
    
    async localizarID(ID: string): Promise<chamados> {
        return this.chamadosRepository.findOne({ where: { ID } });
    }

    async localizarCategoria(CATEGORIA: string): Promise<chamados> {
        return this.chamadosRepository.findOne({ where: { CATEGORIA } });
    }

    async remover(id: string): Promise<RetornoObjDTO> {
        const chamado = await this.localizarID(id);
    
        if (!chamado) {
            throw new NotFoundException("Chamado não encontrado."); // Usando exceção do NestJS
        }
    
        try {
            await this.chamadosRepository.remove(chamado);
            return { return: chamado, message: "Chamado excluído!" };
        } catch (error) {
            throw new InternalServerErrorException("Houve um erro ao excluir: " + error.message); // Exceção apropriada
        }
    }

    // O método de alteração pode ser reativado se necessário.
}

