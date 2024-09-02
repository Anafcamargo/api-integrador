
export class voluntarioEntity{
    id: string;
    nome: string;
    cpf: string;
    idade: number;
    email: string;
    senha: string;
    telefone: string;
    endereco: string;
    numero_casa: string;
    bairro: string;
    value:number;
   
    constructor (id: string, nome: string, cpf: string, idade:number, email:string, senha:string, telefone: string, endereco: string, numero_casa: string, bairro:string ){

        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.idade = idade;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.endereco = endereco;
        this.numero_casa = numero_casa;
        this.bairro = bairro;
       
    }
}