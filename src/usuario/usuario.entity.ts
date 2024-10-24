
import { ApiProperty } from "@nestjs/swagger";
import { chamados } from "src/chamados/chamado.entity";
import { v4 as uuid} from 'uuid';

import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
@Entity()
export class USUARIO {
    static findOne(arg0: { TELEFONE: string; }) {
        throw new Error('Method not implemented.');
    }
   
    @PrimaryGeneratedColumn('uuid') // Automatically generates a UUID
    @ApiProperty({ description: 'Unique identifier for the user' })
    ID: string;

    @Column({ length: 255 })
    @ApiProperty({ description: 'Name of the user' })
    NOME: string; 

    @Column({ length: 20 })
    @ApiProperty({ description: 'User\'s phone number' })
    TELEFONE: string;

    @Column({ length: 55 })
    @ApiProperty({ description: 'User\'s password' })
    SENHA: string;

    // IDUSUARIO: string;

    trocaSenha(senha){
        const saltOrRounds = 10;
        this.SENHA = bcrypt.hashSync(senha,saltOrRounds)
        return 0
    }
 
    login(senha){
        return bcrypt.compareSync(senha,this.SENHA);
    }


    // @OneToMany(() => chamados, chamados => chamados.usuario)
    // @ApiProperty({ type: () => chamados, isArray: true })
    // chamados: chamados[];

    @BeforeInsert()
    generateUUID() {
        this.ID = uuid();
    }
    
}



