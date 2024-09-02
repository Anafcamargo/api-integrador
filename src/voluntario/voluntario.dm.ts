/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { voluntarioEntity } from "./voluntario.entity";
import { alteravoluntarioDTO } from "./dto/alteravoluntario.dto";

@Injectable()
export class voluntariosArmazenados{
    #voluntarios: voluntarioEntity[] = [];  

    Adicionarvoluntario(voluntario: voluntarioEntity){
        this.#voluntarios.push(voluntario);
    }


    async removevoluntario(id:string){
       
        const voluntario = this.pesquisaId(id);

        this.#voluntarios = this.#voluntarios.filter(
            voluntarioSalvo => voluntarioSalvo.id !== id
        )

        return voluntario
    }

    pesquisaEmail(email:string){

       
        const possivelvoluntario = this.#voluntarios.find(
            voluntario => voluntario.email == email
        )
        return possivelvoluntario;
    }    
  

    pesquisaId (id:string){
        const possivelvoluntario = this.#voluntarios.find(
           voluntarioSalvo => voluntarioSalvo.id === id
        );

        if(!possivelvoluntario){
            throw new Error(' não encontrado');
        }

        return possivelvoluntario
    }

    alteravoluntario(id:string,dadosNovos: alteravoluntarioDTO){
       
        const voluntario = this.pesquisaId(id);

        Object.entries(dadosNovos).forEach(
            ([chave,valor]) => {
               
                if(chave === 'id'){
                    return
                }

                 
                voluntario[chave] = valor;
            }
        )

        return voluntario;
        
    }

    validaEmail(emailNovo: string){
        const possivelvoluntario = this.pesquisaEmail(emailNovo)
        
        return (possivelvoluntario === undefined)
    }

    Login(email:string ,senha:string){
       
        const possivelvoluntario = this.pesquisaEmail(email)
       
        if (possivelvoluntario){
            return {
                voluntario: possivelvoluntario.senha == senha?possivelvoluntario:null,
                status: possivelvoluntario.senha == senha
            };
        }else{
            return {
                voluntario: null,
                status: false
            };
        }
    }

    get voluntarios(){        
        return this.#voluntarios;
    }
}