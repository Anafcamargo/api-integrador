
import { VOLUNTARIO } from "src/voluntario/voluntario.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";


@Entity()
export class CHAMADO {
    @PrimaryColumn ()
    ID: string;

    @Column ({length:55})
    TELEFONE: string;

    @Column ({length:355})
    DESCRICAO:string;

    @Column ({length:155})
    CATEGORIA:string;
    
   

    @OneToOne(() => VOLUNTARIO, voluntario => voluntario.chamado)
    voluntarios: VOLUNTARIO[]
    usuario: any;
    voluntario: any;
}