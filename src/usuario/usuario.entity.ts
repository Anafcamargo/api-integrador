/* eslint-disable prettier/prettier */
//classe de usuário, utilizado para manter padrão dos usuários armazenados
export class UsuarioEntity{
    id: string;
    nome: string;
    idade: number;
    cidade: string;
    email: string;
    telefone: string;
    senha: string; 
    
    constructor(id: string,nome: string,idade: number,cidade: string,email: string,
                    telefone: string,senha: string){
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.cidade = cidade;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
    }
}