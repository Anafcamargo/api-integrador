
export class ListavoluntarioDTO{

    constructor(
            readonly id: string, 
            readonly nome: string,
            readonly cpf: string,
            readonly idade: number,
            readonly email: string,
            readonly senha: string,
            readonly telefone: string,
            readonly endereco: string,
            readonly numero_casa: string,
            readonly bairro: string
           
            
    ){}
} 
export class ListagemVoluntariosDTO{
    constructor(
        readonly usuario: ListavoluntarioDTO[],
    ){}
}