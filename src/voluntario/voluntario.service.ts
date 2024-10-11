import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import {v4 as uuid} from "uuid";
import {RetornoCadastroDTO, RetornoObjDTO} from "src/dto/retorno.dto";
import { VOLUNTARIO } from "./voluntario.entity";
import { criaVoluntarioDTO } from "./dto/criaVoluntario.dto";
import { alteraVoluntarioDTO } from "./dto/alteravoluntario.dto";




@Injectable ()
export class VoluntarioService {
    constructor(
        @Inject("VOLUNTARIO_REPOSITORY")
        private voluntarioRepository: Repository<VOLUNTARIO>,
    ){}

    async listar (): Promise <VOLUNTARIO[]> {
        return this.voluntarioRepository.find();
    }

    async inserir (dados: criaVoluntarioDTO) : Promise<RetornoCadastroDTO>{
        let voluntario = new VOLUNTARIO();
        voluntario.ID = uuid();
        voluntario.NOME = dados.NOME;
        voluntario.TELEFONE = dados.TELEFONE;
        voluntario.SENHA = dados.SENHA;
        voluntario.CPF = dados.CPF;
        voluntario.NASCIMENTO = dados.NASCIMENTO;
        voluntario.EMAIL = dados.EMAIL;
        voluntario.ENDERECO = dados.ENDERECO;
        voluntario.BAIRRO = dados.BAIRRO;
        voluntario.NUMERO_CASA = dados.NUMERO_CASA;
        voluntario.CIDADE = dados.CIDADE;

        return this.voluntarioRepository.save(voluntario)
        .then((result) => {
            return <RetornoCadastroDTO>{
                id: voluntario.ID,
                message: "Voluntario cadastrado!"
            };
        })
        .catch((error) => {
            return <RetornoCadastroDTO>{
            id: "",
            message: "Houve um erro ao cadastrar." + error.message
        };
        })
    }

    localizarID(ID: string) : Promise<VOLUNTARIO> {
        return this.voluntarioRepository.findOne({
            where: {
                ID,
            },
        });
    }

    localizarNome(NOME: string) : Promise<VOLUNTARIO> {
        return this.voluntarioRepository.findOne({
            where: {
                NOME,
            },
        });
    }

    async remover (id: string) : Promise <RetornoObjDTO>{
        const voluntario = await this.localizarID(id);

        return this.voluntarioRepository.remove(voluntario)
        .then((result) => {
            return <RetornoObjDTO>{
                return: voluntario,
                message: "Voluntario excluido!"
            };
        })

        .catch((error) => {
            return <RetornoObjDTO>{
                return: voluntario,
                message: " Houve um erro ao excluir." + error.message
            };
        });
    }

    async alterar (id: string, dados: alteraVoluntarioDTO) : Promise <RetornoCadastroDTO>{
        const voluntario = await this.localizarID(id);

        Object.entries(dados).forEach(
            ([chave, valor]) => {
                if (chave === "id"){
                    return;
                }
                voluntario[chave] = valor;
            }
        )

        return this.voluntarioRepository.save(voluntario)
        .then((result) => {
            return <RetornoCadastroDTO>{
                id: voluntario.ID,
                message: "Voluntario alterado!"
            };
        })

        .catch((error) => {
            return <RetornoCadastroDTO>{
                id: "",
                message: " Houve um erro ao alterar." + error.message
            };
        });
    }

    

}