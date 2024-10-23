import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { VOLUNTARIO } from "./voluntario.entity";
import { CriaVoluntarioDTO } from "./dto/criaVoluntario.dto";
import { alteraVoluntarioDTO } from "./dto/alteravoluntario.dto";
import { LoginVoluntarioDTO } from "./dto/loginvoluntario.dto";

import * as jwt from 'jsonwebtoken';
import { RegisterVoluntarioDTO } from "./dto/RegisterVoluntario.DTO";


@Injectable()
export class VoluntarioService {
    constructor(
        @Inject('VOLUNTARIO_REPOSITORY')
        private voluntarioRepository: Repository<VOLUNTARIO>,
    ) {}

    // Função para validar se o e-mail já está em uso
    async validaEmail(EMAIL: string): Promise<boolean> {
        try {
            const user = await this.voluntarioRepository.findOne({ where: { EMAIL } });
            return !user; // Retorna true se o e-mail ainda não existir
        } catch (error) {
            throw new Error('Erro ao verificar o e-mail.');
        }
    }

    // Função para encontrar voluntário pelo e-mail
    async encontrarVoluntarioPorEmail(email: string): Promise<VOLUNTARIO | null> {
        const voluntario = await this.voluntarioRepository.findOne({ where: { EMAIL: email } });
        if (!voluntario) {
            console.log('Voluntário não encontrado:', email);
        }
        return voluntario;
    }



    // Função para fazer login
    async login(dados: LoginVoluntarioDTO): Promise<VOLUNTARIO | null> {
        console.log('Método de login chamado');
        const { EMAIL, SENHA } = dados;
        
        console.log('Tentando logar com:', EMAIL);
        
        // Usar a função validarVoluntario para verificar as credenciais
        const voluntario = await this.validarVoluntario(EMAIL, SENHA);
      
        
        if (!voluntario) {
            console.log('Credenciais inválidas - voluntário');
            throw new UnauthorizedException('Credenciais inválidas - voluntário');
        }
    
        console.log('Login bem-sucedido:', voluntario);
        return voluntario;
    }

    // Função para gerar token JWT
    gerarToken(voluntario: VOLUNTARIO): string {
        const payload = { id: voluntario.ID, email: voluntario.EMAIL };
        return jwt.sign(payload, 'seu_segredo', { expiresIn: '1h' }); // Substituir 'seu_segredo' por uma chave secreta real
    }

    
        async register(dados: RegisterVoluntarioDTO): Promise<VOLUNTARIO> {
        const { EMAIL, SENHA } = dados;
    
        // Gerar hash da senha com bcrypt
        const hashedPassword = SENHA;  // Certifique-se de que o salt está correto e consistente
        
    
        const voluntario = this.voluntarioRepository.create({ EMAIL, SENHA: hashedPassword });
        return await this.voluntarioRepository.save(voluntario);
    }


    async validarVoluntario(EMAIL: string, SENHA: string): Promise<VOLUNTARIO | null> {
        const voluntario = await this.voluntarioRepository.findOne({ where: { EMAIL } });
        const trimmedSenha = SENHA;
    
        if (voluntario) {
            // Log para verificar as senhas
            console.log('Email:', EMAIL);
            console.log('Senha fornecida:', trimmedSenha);
            console.log('Senha armazenada:', voluntario.SENHA); // A senha armazenada no banco de dados
    
            // Validação da senha usando a função login da entidade VOLUNTARIO
            const logado = voluntario.login(trimmedSenha);
            console.log('Senha fornecida é válida:', logado);
    
            if (logado) {
                // Retorne o voluntário se a senha estiver correta
                return voluntario;
            } else {
                // Retorne null se a senha estiver incorreta
                console.log('Senha inválida para o voluntário:', EMAIL);
                return null;
            }
        } else {
            // Se o voluntário não for encontrado, retorne null
            console.log('Voluntário não encontrado:', EMAIL);
            return null;
        }
    }
    




    // Função para validar voluntário com e-mail e senha
//   async validarVoluntario(EMAIL: string, SENHA: string): Promise<VOLUNTARIO | null> {
//     const voluntario = await this.voluntarioRepository.findOne({ where: { EMAIL } });
//     const trimmedSenha = SENHA.trim()
//     if (voluntario) {
//         // Log para verificar as senhas
//         console.log('Email:', EMAIL);
//         console.log('Senha fornecida:', trimmedSenha);
//         console.log('Senha armazenada:', voluntario.SENHA); // A senha armazenada no banco de dados
//         console.log('Encoding da senha fornecida:', Buffer.from(SENHA, 'utf-8'));
//         console.log('Encoding do hash armazenado:', Buffer.from(voluntario.SENHA, 'utf-8'));
//         const senhaFornecida = 'senha123'; // Senha para testar
//         console.log('Tamanho da senha fornecida:', SENHA.length);
//         console.log('Tamanho do hash armazenado:', voluntario.SENHA.length);

//     let logado = voluntario.login(trimmedSenha);

//     // Testar a comparação entre a senha fornecida e o hash armazenado
//     bcrypt.compare(senhaFornecida, hashArmazenado)
//     .then(result => {
//         console.log('Resultado da comparação da senha com hash armazenado:', result); // Deve ser true
//     })
//     .catch(err => {
//         console.error('Erro na comparação de senha:', err);
//     });

//         const isPasswordValid = await bcrypt.compare(trimmedSenha, voluntario.SENHA);
//         console.log('Resultado da comparação da senha:', isPasswordValid);

//         await this.validarSenhaParaTeste(trimmedSenha, voluntario.SENHA);
        
//         if (isPasswordValid) {
//             return voluntario; // Retorna o voluntário se a senha for válida
//         }
//     }
    

//     // const senhaFornecida = 'senha123'; // A senha que você está testando

//     // // Gerar um novo hash da senha
//     // bcrypt.hash(senhaFornecida, 10)
//     // .then(hash => {
//     //     console.log('Novo hash gerado:', hash);
        
//     //     // Comparar a senha fornecida com o novo hash
//     //     return bcrypt.compare(senhaFornecida, hash);
//     // })
//     // .then(result => {
//     //     console.log('Resultado da comparação de senha com novo hash:', result); // Deve ser true
//     // })
//     // .catch(err => {
//     //     console.error('Erro:', err);
//     // });


//     return null; // Retorna null se o voluntário não for encontrado ou a senha não for válida
// }

    // Função para listar todos os voluntários
    async listar(): Promise<VOLUNTARIO[]> {
        return this.voluntarioRepository.find();
    }

    // Função para inserir novo voluntário
    async inserir(dados: CriaVoluntarioDTO): Promise<RetornoCadastroDTO> {
        let voluntario = new VOLUNTARIO();
        voluntario.ID = uuid();
        voluntario.NOME = dados.NOME;
        voluntario.CPF = dados.CPF;
        voluntario.NASCIMENTO = dados.NASCIMENTO;
        voluntario.EMAIL = dados.EMAIL;

        // Gerar hash da senha
        voluntario.trocaSenha(dados.SENHA);
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

 

    // Função para localizar voluntário por ID
    async localizarID(ID: string): Promise<VOLUNTARIO> {
        const voluntario = await this.voluntarioRepository.findOne({ where: { ID } });
        if (!voluntario) {
            throw new Error("Voluntário não encontrado");
        }
        return voluntario;
    }

    // Função para localizar voluntário por nome
    async localizarNome(NOME: string): Promise<VOLUNTARIO> {
        return this.voluntarioRepository.findOne({ where: { NOME } });
    }

    // Função para remover voluntário
    async remover(id: string): Promise<RetornoObjDTO> {
        const voluntario = await this.localizarID(id);
        try {
            await this.voluntarioRepository.remove(voluntario);
            return { return: voluntario, message: "Voluntário excluído!" };
        } catch (error) {
            return { return: voluntario, message: "Houve um erro ao excluir: " + error.message };
        }
    }

    // Função para alterar dados do voluntário
    async alterar(id: string, dados: alteraVoluntarioDTO): Promise<RetornoCadastroDTO> {
        const voluntario = await this.localizarID(id);
        Object.assign(voluntario, dados); // Atualiza os dados

        if (dados.SENHA){
            voluntario.trocaSenha(dados.SENHA)
        }

        try {
            await this.voluntarioRepository.save(voluntario);
            return { id: voluntario.ID, message: "Voluntário alterado!" };
        } catch (error) {
            return { id: "", message: "Houve um erro ao alterar: " + error.message };
        }
    }
}


