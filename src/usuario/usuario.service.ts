import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import {v4 as uuid} from "uuid";
import {RetornoCadastroDTO, RetornoObjDTO} from "src/dto/retorno.dto";
import { USUARIO } from "./usuario.entity";
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { AlteraUsuarioDTO} from "./dto/alteraUsuario.dto";
import { sign } from "jsonwebtoken";
import * as bcrypt from 'bcrypt';
import { LoginUsuarioDTO } from "./dto/loginUsuario.dto";
import { RegisterUsuarioDTO } from "./dto/registerUsuario.dto";
import * as jwt from 'jsonwebtoken';

@Injectable ()


export class UsuarioService {
    constructor(
        @Inject("USUARIO_REPOSITORY")
        private usuarioRepository: Repository<USUARIO>,
    ){}

    async encontrarPorTelefone(telefone: string): Promise<USUARIO | null> {
        return await this.usuarioRepository.findOne({ where: { TELEFONE: telefone } });
    }



    async login(dados: LoginUsuarioDTO): Promise<USUARIO | null> {
        console.log('Método de login chamado');
        const { TELEFONE, SENHA } = dados;
        
        console.log('Tentando logar com:', TELEFONE);
        
        // Usar a função validarVoluntario para verificar as credenciais
        const usuario = await this.validarUsuario(TELEFONE, SENHA);
      
        
        if (!usuario) {
            console.log('Credenciais inválidas - usuários');
            throw new UnauthorizedException('Credenciais inválidas - usuários');
        }
    
        console.log('Login bem-sucedido:', usuario);
        return usuario;
    }

     // Método para gerar o token
     gerarToken(usuario: USUARIO): string {
        const payload = { id: usuario.ID, telefone: usuario.TELEFONE };
        return jwt.sign(payload, 'seu_segredo', { expiresIn: '1h' }); // Substituir 'seu_segredo' por uma chave secreta real
    }

    async register(dados: RegisterUsuarioDTO): Promise<USUARIO> {
        const { TELEFONE, SENHA } = dados;
    
        // Gerar hash da senha com bcrypt
        const hashedPassword = SENHA;  // Certifique-se de que o salt está correto e consistente
        
    
        const usuario = this.usuarioRepository.create({ TELEFONE, SENHA: hashedPassword });
        return await this.usuarioRepository.save(usuario);
    }


    async validarUsuario(TELEFONE: string, SENHA: string): Promise<USUARIO | null> {
        const usuario = await this.usuarioRepository.findOne({ where: { TELEFONE } });
        const trimmedSenha = SENHA;
    
        if (usuario) {
            // Log para verificar as senhas
            console.log('Telefone:', TELEFONE);
            // console.log('Senha fornecida:', trimmedSenha);
            console.log('Senha armazenada:', usuario.SENHA); // A senha armazenada no banco de dados
    
            // Validação da senha usando a função login da entidade VOLUNTARIO
            const logado = usuario.login(trimmedSenha);
            console.log('Senha fornecida é válida:', logado);
    
            if (logado) {
                // Retorne o voluntário se a senha estiver correta
                return usuario;
            } else {
                // Retorne null se a senha estiver incorreta
                console.log('Senha inválida para o usuário:', TELEFONE);
                return null;
            }
        } else {
            // Se o voluntário não for encontrado, retorne null
            console.log('Usuário não encontrado:', TELEFONE);
            return null;
        }
    }

    async listar (): Promise <USUARIO[]> {
        return this.usuarioRepository.find();
    }


    async inserir (dados: CriaUsuarioDTO) : Promise<RetornoCadastroDTO>{
        let usuario = new USUARIO();
        usuario.ID = uuid();
        usuario.NOME = dados.NOME;
        usuario.TELEFONE = dados.TELEFONE;
        usuario.trocaSenha(dados.SENHA)

        try {
            await this.usuarioRepository.save(usuario);
            return { id: usuario.ID, message: "Usuário cadastrado!" };
        } catch (error) {
            return { id: "", message: "Houve um erro ao cadastrar: " + error.message };
        }
    }


    // async localizarTelefone(telefone: string) {
    //     return await this.usuarioRepository.findOne({
    //         where: {
    //             TELEFONE: telefone,
    //         },
    //     });
    // }

    async validaTelefone(telefoneNovo: string) {
        const possivelUsuario = await this.encontrarPorTelefone(telefoneNovo);
    
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