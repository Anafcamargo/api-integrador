
import { v4 as uuid} from 'uuid';
import { Column, Entity, OneToMany, PrimaryColumn, BeforeInsert } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { chamados } from 'src/chamados/chamado.entity';

@Entity()
export class VOLUNTARIO {
    @PrimaryColumn({ type: 'uuid' })
    @ApiProperty({ description: 'Unique identifier for the user' })
    ID: string;

    @Column({ length: 255 })
    @ApiProperty({ description: 'Name of the user' })
    NOME: string;

    @Column({ length: 255 })
    CPF: string;

    @Column()
    NASCIMENTO: Date;

    @Column({ length: 55 })
    EMAIL: string;

    @Column({ length: 55 })
    SENHA: string;

    @Column({ length: 20 })
    TELEFONE: string;

    @Column({ length: 55 })
    ENDERECO: string;

    @Column({ length: 55 }) 
    NUMEROCASA: string;

    @Column({ length: 55 })
    BAIRRO: string;

    @Column({ length: 55 })
    CIDADE: string;

    @OneToMany(() => chamados, chamados => chamados.voluntario)
    chamados: chamados[];

    @BeforeInsert()
    generateUUID() {
        this.ID = uuid();
    }

    // Consider implementing email validation
    validateEmail(value: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    }
}




    
