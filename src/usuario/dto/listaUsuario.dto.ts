
export class ListaUsuarioDTO{

    constructor(
            readonly id: string, 
            readonly nome:string,
            readonly telefone: string
    ){}
}

export class ListagemUsuariosDTO{
    constructor(
        readonly usuario: ListaUsuarioDTO[],
    ){}
}