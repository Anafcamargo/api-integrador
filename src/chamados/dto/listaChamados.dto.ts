export class ListachamadosDTO {
    constructor(
        readonly ID: string,
        readonly NOME:string,
        readonly TELEFONE: string,
        readonly DESCRICAO: string,
        readonly CATEGORIA: string
    ) {}
}

// Exemplo de uso
const chamados = new ListachamadosDTO("1","nome", "123456789", "Descrição do chamados", "Categoria 1");
console.log(chamados);
