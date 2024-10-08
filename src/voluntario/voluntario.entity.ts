
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class VOLUNTARIO {
    validaEmail(value: any) {
        throw new Error("Method not implemented.");
    }
    @PrimaryColumn ()
    ID: string;

    @Column ({length:255})
    NOME: string;

    @Column ({length:255})
    CPF: string;

    @Column({length:6})
    NASCIMENTO: Number;

    @Column({length:55})
    EMAIL: string;

    @Column({length:55})
    SENHA: string;

    @Column({length:20})
    TELEFONE: string;

    @Column({length:55})
    ENDERECO: string;

    
    @Column({length:55})
    NUMERO_CASA: string;

    
    @Column({length:55})
    BAIRRO: string;

    @Column({length:55})
    CIDADE: string;

}





    
