// import { v4 as uuid } from 'uuid';
// import { Column, Entity, OneToMany, PrimaryColumn, BeforeInsert } from "typeorm";
// import { ApiProperty } from '@nestjs/swagger';
// import { Chamado } from 'src/chamados/chamado.entity'; // Ensure the correct casing for imports

// @Entity()
// export class VOLUNTARIO {
//     @PrimaryColumn({ type: 'uuid' })
//     @ApiProperty({ description: 'Unique identifier for the user' })
//     ID: string;

//     @Column({ length: 255 })
//     @ApiProperty({ description: 'Name of the user' })
//     NOME: string;

//     @Column({ length: 255 })
//     CPF: string;

//     @Column({ type: 'date', nullable: true }) // Change type to 'date' if that's intended
//     NASCIMENTO: Date;

//     @Column({ length: 55 })
//     EMAIL: string;

//     @Column({ length: 55 })
//     SENHA: string;

//     @Column({ length: 20 })
//     TELEFONE: string;

//     @Column({ length: 55 })
//     ENDERECO: string;

//     @Column({ length: 55 }) 
//     NUMEROCASA: string;

//     @Column({ length: 55 })
//     BAIRRO: string;

//     @Column({ length: 55 })
//     CIDADE: string;

//     @OneToMany(() => Chamado, chamado => chamado.voluntario) // Make sure the relation is defined correctly
//     chamados: Chamado[];

//     @BeforeInsert()
//     generateUUID() {
//         this.ID = uuid();
//     }

//     validateEmail(value: string): boolean {
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return regex.test(value);
//     }
// }


import { v4 as uuid} from 'uuid';
import { Column, Entity, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { chamados } from 'src/chamados/chamado.entity';
import * as bcrypt from 'bcrypt';

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
    NASCIMENTO: number;

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

    IDVOLUNTARIO: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.SENHA) {
            const salt = await bcrypt.genSalt(10);
            this.SENHA = await bcrypt.hash(this.SENHA, salt);
        }
    }

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




    
