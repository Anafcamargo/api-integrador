import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { VOLUNTARIO } from "./voluntario.entity";
import { CriaVoluntarioDTO } from "./dto/criaVoluntario.dto";
import { alteraVoluntarioDTO } from "./dto/alteravoluntario.dto";

@Injectable()
export class VoluntarioService {
    constructor(
        @Inject("VOLUNTARIO_REPOSITORY")
        private voluntarioRepository: Repository<VOLUNTARIO>,
    ) {}

    // async validaEmail(email: string): Promise<boolean> {
    //             try {
    //                 // Tente encontrar um usuário com o email fornecido
    //                 const user = await this.voluntarioRepository.findOne({ where: { email } });
    //                 // Retorna false se o email já existe, true caso contrário
    //                 return !user; // Se não encontrar, retorna true
    //             }
    //              catch (error) {
    //                 // console.error('Erro ao validar email:', error);
    //                 // throw new Error('Erro ao verificar o email.');
    //             }
    //         }

    async listar(): Promise<VOLUNTARIO[]> {
        return this.voluntarioRepository.find();
    }

    async inserir(dados: CriaVoluntarioDTO): Promise<RetornoCadastroDTO> {
        const voluntario = this.voluntarioRepository.create({
            ID: uuid(),
            ...dados,
        });

        try {
            await this.voluntarioRepository.save(voluntario);
            return { id: voluntario.ID, message: "Voluntário cadastrado!" };
        } catch (error) {
            return { id: "", message: "Houve um erro ao cadastrar: " + error.message };
        }
    }

    async localizarID(ID: string): Promise<VOLUNTARIO> {
        const voluntario = await this.voluntarioRepository.findOne({ where: { ID } });
        if (!voluntario) {
            throw new Error("Voluntário não encontrado");
        }
        return voluntario;
    } 

    async localizarNome(NOME: string): Promise<VOLUNTARIO> {
        return this.voluntarioRepository.findOne({ where: { NOME } });
    }

    async remover(id: string): Promise<RetornoObjDTO> {
        const voluntario = await this.localizarID(id);
        try {
            await this.voluntarioRepository.remove(voluntario);
            return { return: voluntario, message: "Voluntário excluído!" };
        } catch (error) {
            return { return: voluntario, message: "Houve um erro ao excluir: " + error.message };
        }
    }

    async alterar(id: string, dados: alteraVoluntarioDTO): Promise<RetornoCadastroDTO> {
        const voluntario = await this.localizarID(id);
        Object.assign(voluntario, dados); // Use Object.assign para simplificar

        try {
            await this.voluntarioRepository.save(voluntario);
            return { id: voluntario.ID, message: "Voluntário alterado!" };
        } catch (error) {
            return { id: "", message: "Houve um erro ao alterar: " + error.message };
        }
    }
}


