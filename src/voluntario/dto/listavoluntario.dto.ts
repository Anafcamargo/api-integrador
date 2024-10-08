
export class ListaVoluntarioDTO{

    constructor(
            readonly ID: string, 
            readonly NOME: string,
            readonly CPF: string,
            readonly NASCIMENTO: number,
            readonly EMAIL: string,
            readonly SENHA: string,
            readonly TELEFONE: string, 
            readonly ENDERECO: string,
            readonly CIDADE: string,
            readonly NUMERO_CASA: string,
            readonly BAIRRO: string
           
            
    ){}
} 
