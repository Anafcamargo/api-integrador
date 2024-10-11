
import { Inject, Injectable } from "@nestjs/common";
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
        let chamado = new chamados();
        chamado.ID = uuid();
        chamado.TELEFONE = dados.TELEFONE;
        chamado.DESCRICAO = dados.DESCRICAO;
        chamado.CATEGORIA = dados.CATEGORIA;
        chamado.IDUSUARIO = dados.IDUSUARIO;
        chamado.IDVOLUNTARIO = dados.IDVOLUNTARIO;

        try {
            await this.chamadosRepository.save(chamado);
            return { id: chamados.id, message: "chamados cadastrado!" };
        } catch (error) {
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
        const chamados = await this.localizarID(id);

        if (!chamados) {
            return { return: null, message: "chamados não encontrado." };
        }

        try {
            await this.chamadosRepository.remove(chamados);
            return { return: chamados, message: "chamados excluído!" };
        } catch (error) {
            return { return: chamados, message: "Houve um erro ao excluir: " + error.message };
        }
    }

    // O método de alteração pode ser reativado se necessário.
}

