
import { VOLUNTARIO } from "src/voluntario/voluntario.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class chamados {
    @PrimaryGeneratedColumn('uuid') 
    ID: string;

    @Column({ length: 55 })
    TELEFONE: string;

    @Column({ length: 355 })
    DESCRICAO: string;

    @Column({ length: 155 })
    CATEGORIA: string;

    @Column({ length: 155 })
    IDUSUARIO: string;

    @Column({ length: 155 })
    IDVOLUNTARIO: string;


    @ManyToOne(() => VOLUNTARIO, voluntario => voluntario.chamados)
    voluntario: VOLUNTARIO; // Relaciona um único voluntário ao chamados
    usuario: any;
    static id: string;
}
