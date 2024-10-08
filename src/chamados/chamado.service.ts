import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import {v4 as uuid} from "uuid";
import {RetornoCadastroDTO, RetornoObjDTO} from "src/dto/retorno.dto";
import { CHAMADO } from "./chamado.entity";
import { CriaChamadoDTO } from "./dto/criaChamados.dto";




@Injectable ()
export class ChamadoService {
    constructor(
        @Inject("CHAMADO_REPOSITORY")
        private chamadoRepository: Repository<CHAMADO>,
    ){}

    async listar (): Promise <CHAMADO[]> {
        return this.chamadoRepository.find();
    }

    async inserir (dados: CriaChamadoDTO) : Promise<RetornoCadastroDTO>{
        let chamado = new CHAMADO();
        chamado.ID = uuid();
        chamado.TELEFONE = dados.TELEFONE;
        chamado.DESCRICAO = dados.DESCRICAO;
        chamado.TIPO = dados.TIPO;


        return this.chamadoRepository.save(chamado)
        .then((result) => {
            return <RetornoCadastroDTO>{
                id: chamado.ID,
                message: "chamado cadastrado!"
            };
        })
        .catch((error) => {
            return <RetornoCadastroDTO>{
            id: "",
            message: "Houve um erro ao cadastrar." + error.message
        };
        })
    }

    localizarID(ID: string) : Promise<CHAMADO> {
        return this.chamadoRepository.findOne({
            where: {
                ID,
            },
        });
    }

    // localizarNome(NOME: string) : Promise<CHAMADO> {
    //     return this.chamadoRepository.findOne({
    //         where: {
    //             NOME,
    //         },
    //     });
    // }

    async remover (id: string) : Promise <RetornoObjDTO>{
        const chamado = await this.localizarID(id);

        return this.chamadoRepository.remove(chamado)
        .then((result) => {
            return <RetornoObjDTO>{
                return: chamado,
                message: "chamado excluido!"
            };
        })

        .catch((error) => {
            return <RetornoObjDTO>{
                return: chamado,
                message: " Houve um erro ao excluir." + error.message
            };
        });
    }

    // async alterar (id: string, dados: AlteraChamadoDTO) : Promise <RetornoCadastroDTO>{
    //     const chamado = await this.localizarID(id);

    //     Object.entries(dados).forEach(
    //         ([chave, valor]) => {
    //             if (chave === "id"){
    //                 return;
    //             }
    //             chamado[chave] = valor;
    //         }
    //     )

    //     return this.chamadoRepository.save(chamado)
    //     .then((result) => {
    //         return <RetornoCadastroDTO>{
    //             id: chamado.ID,
    //             message: "Chamado alterado!"
    //         };
    //     })

    //     .catch((error) => {
    //         return <RetornoCadastroDTO>{
    //             id: "",
    //             message: " Houve um erro ao alterar." + error.message
    //         };
    //     });
    // }

    

}