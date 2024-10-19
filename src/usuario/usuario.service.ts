import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import {v4 as uuid} from "uuid";
import {RetornoCadastroDTO, RetornoObjDTO} from "src/dto/retorno.dto";
import { USUARIO } from "./usuario.entity";
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { AlteraUsuarioDTO} from "./dto/alteraUsuario.dto";



@Injectable ()
export class UsuarioService {
    encontrarPorNome: any;
    jwtService: any;
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

    async login(TELEFONE: string, SENHA: string): Promise<USUARIO | null> {
        const usuario = await this.localizarTelefone(TELEFONE);
        
        if (usuario && usuario.SENHA === SENHA) {
            return usuario; // Retorna o usuário se a senha estiver correta
        }
        
        return null; // Retorna null se as credenciais forem inválidas
    }

    async localizarTelefone(telefone: string) {
        return await this.usuarioRepository.findOne({
            where: {
                TELEFONE: telefone,
            },
        });
    }

    async validaTelefone(telefoneNovo: string) {
        const possivelUsuario = await this.localizarTelefone(telefoneNovo);
    
        return (possivelUsuario == null);
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