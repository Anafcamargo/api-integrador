import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class USUARIO {
    @PrimaryColumn ()
    ID: string;

    @Column ({length:255})
    NOME: string;

    @Column({length:20})
    TELEFONE: string;

    @Column({length:55})
    SENHA: string;

}
