// import { Inject, Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
// import { Repository } from "typeorm";
// import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
// import { VOLUNTARIO } from "./voluntario.entity";
// import { CriaVoluntarioDTO } from "./dto/criaVoluntario.dto";
// import { alteraVoluntarioDTO } from "./dto/alteravoluntario.dto";

// @Injectable()
// export class VoluntarioService {
//     constructor(
//         @Inject("VOLUNTARIO_REPOSITORY")
//         private voluntarioRepository: Repository<VOLUNTARIO>,
//     ) {}

//     async validaEmail(EMAIL: string): Promise<boolean> {
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!regex.test(EMAIL)) {
//             throw new BadRequestException("Email inválido");
//         }
//         const user = await this.voluntarioRepository.findOne({ where: { EMAIL } });
//         return !user; // Se não encontrar, retorna true
//     }

//     async listar(): Promise<VOLUNTARIO[]> {
//         return this.voluntarioRepository.find();
//     }

//     async inserir(dados: CriaVoluntarioDTO): Promise<RetornoCadastroDTO> {
//         const voluntario = this.voluntarioRepository.create(dados); // Automatically set properties from DTO

//         try {
//             await this.voluntarioRepository.save(voluntario);
//             return { id: voluntario.ID, message: "Voluntário cadastrado!" };
//         } catch (error) {
//             throw new BadRequestException("Houve um erro ao cadastrar: " + error.message);
//         }
//     }

//     async localizarID(ID: string): Promise<VOLUNTARIO> {
//         const voluntario = await this.voluntarioRepository.findOne({ where: { ID } });
//         if (!voluntario) {
//             throw new NotFoundException("Voluntário não encontrado");
//         }
//         return voluntario;
//     } 

//     async remover(id: string): Promise<RetornoObjDTO> {
//         const voluntario = await this.localizarID(id);
//         try {
//             await this.voluntarioRepository.remove(voluntario);
//             return { return: voluntario, message: "Voluntário excluído!" };
//         } catch (error) {
//             throw new BadRequestException("Houve um erro ao excluir: " + error.message);
//         }
//     }

//     async alterar(id: string, dados: alteraVoluntarioDTO): Promise<RetornoCadastroDTO> {
//         const voluntario = await this.localizarID(id);
//         Object.assign(voluntario, dados); // Use Object.assign para simplificar

//         try {
//             await this.voluntarioRepository.save(voluntario);
//             return { id: voluntario.ID, message: "Voluntário alterado!" };
//         } catch (error) {
//             throw new BadRequestException("Houve um erro ao alterar: " + error.message);
//         }
//     }
// }


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

    async validaEmail(EMAIL: string): Promise<boolean> {
                try {
                    // Tente encontrar um usuário com o email fornecido
                    const user = await this.voluntarioRepository.findOne({ where: { EMAIL } });
                    // Retorna false se o email já existe, true caso contrário
                    return !user; // Se não encontrar, retorna true
                }
                 catch (error) {
                    // console.error('Erro ao validar email:', error);
                    // throw new Error('Erro ao verificar o email.');
                }
            }

    async listar(): Promise<VOLUNTARIO[]> {
        return this.voluntarioRepository.find();
    }

    async inserir(dados: CriaVoluntarioDTO): Promise<RetornoCadastroDTO> {
        let voluntario = new VOLUNTARIO();
        voluntario.ID = uuid();
        voluntario.NOME = dados.NOME;
        voluntario.CPF = dados.CPF;
        voluntario.NASCIMENTO = dados.NASCIMENTO;
        voluntario.EMAIL = dados.EMAIL;
        voluntario.SENHA = dados.SENHA;
        voluntario.TELEFONE = dados.TELEFONE;
        voluntario.ENDERECO = dados.ENDERECO;
        voluntario.NUMEROCASA = dados.NUMEROCASA;
        voluntario.BAIRRO = dados.BAIRRO;
        voluntario.CIDADE = dados.CIDADE;
       

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


