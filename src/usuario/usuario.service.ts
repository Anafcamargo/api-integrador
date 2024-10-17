import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import {v4 as uuid} from "uuid";
import {RetornoCadastroDTO, RetornoObjDTO} from "src/dto/retorno.dto";
import { USUARIO } from "./usuario.entity";
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { AlteraUsuarioDTO} from "./dto/alteraUsuario.dto";



@Injectable ()
export class UsuarioService {
    constructor(
        @Inject("USUARIO_REPOSITORY")
        private usuarioRepository: Repository<USUARIO>,
    ){}

    async listar (): Promise <USUARIO[]> {
        return this.usuarioRepository.find();
    }

    async inserir (dados: CriaUsuarioDTO) : Promise<RetornoCadastroDTO>{
        let usuario = new USUARIO();
        usuario.ID = uuid();
        usuario.NOME = dados.NOME;
        usuario.TELEFONE = dados.TELEFONE;
        usuario.SENHA = dados.SENHA;

        return this.usuarioRepository.save(usuario)
        .then((result) => {
            return <RetornoCadastroDTO>{
                id: usuario.ID,
                message: "Usuário cadastrado!"
            };
        })
        .catch((error) => {
            return <RetornoCadastroDTO>{
            id: "",
            message: "Houve um erro ao cadastrar." + error.message
        };
        })
    }

    localizarID(ID: string) : Promise<USUARIO> {
        return this.usuarioRepository.findOne({
            where: {
                ID,
            },
        });
    }

    localizarNome(NOME: string) : Promise<USUARIO> {
        return this.usuarioRepository.findOne({
            where: {
                NOME,
            },
        });
    }

    async remover (id: string) : Promise <RetornoObjDTO>{
        const usuario = await this.localizarID(id);

        return this.usuarioRepository.remove(usuario)
        .then((result) => {
            return <RetornoObjDTO>{
                return: usuario,
                message: "Usuário excluido!"
            };
        })

        .catch((error) => {
            return <RetornoObjDTO>{
                return: usuario,
                message: " Houve um erro ao excluir." + error.message
            };
        });
    }

    async alterar(ID: string, dados: AlteraUsuarioDTO): Promise<RetornoCadastroDTO> {
        try {
            const usuario = await this.localizarID(ID);
           
            const updatedUsuario = { ...usuario, ...dados };
            delete updatedUsuario.ID; 
    
            const result = await this.usuarioRepository.save(updatedUsuario);
    
            return {
                id: result.ID,
                message: "Usuário alterado!"
            } as RetornoCadastroDTO;
    
        } catch (error) {
            return {
                id: "",
                message: "Houve um erro ao alterar: " + error.message
            } as RetornoCadastroDTO;
        }
    }
    

   

}