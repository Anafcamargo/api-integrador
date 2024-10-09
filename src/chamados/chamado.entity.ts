
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";


@Entity()
export class CHAMADO {
    @PrimaryColumn ()
    ID: string;

    @Column ({length:55})
    TELEFONE: string;

    @Column ({length:355})
    DESCRICAO:string;

    @Column ({length:155})
    TIPO:string;

    // @OneToMany(() => CHAMADO, chamado => chamado.)
    // chamados: CHAMADO[]
}