import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { CriachamadosDTO } from "./dto/criachamados.dto";
import { chamados } from "./chamado.entity";

@Injectable()
export class chamadosService {
    constructor(
        @Inject("chamados_REPOSITORY")
        private chamadosRepository: Repository<chamados>, 
    ) {}

    async listar(): Promise<chamados[]> {
        console.log('Listando todos os chamados');
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

        console.log('Tentando inserir chamado com os dados:', {
            ID: chamado.ID,
            NOME: chamado.NOME,
            TELEFONE: chamado.TELEFONE,
            DESCRICAO: chamado.DESCRICAO,
            CATEGORIA: chamado.CATEGORIA,
            IDUSUARIO: chamado.IDUSUARIO,
        });

        try {
            await this.chamadosRepository.save(chamado);
            console.log('Chamado cadastrado com sucesso:', chamado);
            return { id: chamado.ID, message: "Chamado cadastrado!" };
        } catch (error) {
            console.error("Erro ao cadastrar chamado:", error);
            return { id: "", message: "Houve um erro ao cadastrar: " + error.message };
        }
    }
    
    async localizarID(ID: string): Promise<chamados> {
        console.log(`Buscando chamado pelo ID: ${ID}`);
        const chamado = await this.chamadosRepository.findOne({ where: { ID } });
        if (!chamado) {
            console.log(`Chamado com ID ${ID} não encontrado.`);
        } else {
            console.log(`Chamado encontrado:`, chamado);
        }
        return chamado;
    }

    async localizarCategoria(CATEGORIA: string): Promise<chamados> {
        console.log(`Buscando chamado pela categoria: ${CATEGORIA}`);
        const chamado = await this.chamadosRepository.findOne({ where: { CATEGORIA } });
        if (!chamado) {
            console.log(`Chamado com categoria ${CATEGORIA} não encontrado.`);
        } else {
            console.log(`Chamado encontrado:`, chamado);
        }
        return chamado;
    }

    async remover(id: string): Promise<RetornoObjDTO> {
        console.log(`Tentando remover chamado com ID: ${id}`);
        const chamado = await this.localizarID(id);
    
        if (!chamado) {
            console.log(`Chamado com ID ${id} não encontrado para exclusão.`);
            throw new NotFoundException("Chamado não encontrado.");
        }
    
        try {
            await this.chamadosRepository.remove(chamado);
            console.log(`Chamado com ID ${id} excluído com sucesso.`);
            return { return: chamado, message: "Chamado excluído!" };
        } catch (error) {
            console.error(`Erro ao excluir o chamado com ID ${id}:`, error);
            throw new InternalServerErrorException("Houve um erro ao excluir: " + error.message);
        }
    }
}
