import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class chamados {
    @PrimaryGeneratedColumn('uuid') 
    ID: string;

    @Column({ length: 55 })
    NOME: string;

    @Column({ length: 55 })
    TELEFONE: string;

    @Column({ length: 355 })
    DESCRICAO: string;

    @Column({ length: 155 })
    CATEGORIA: string;

    @Column({ length: 155 })
    IDUSUARIO: string;

   
}
