/* eslint-disable prettier/prettier */
//data module do modulo de usuário, responsável por guardar os dados de usuários e manipular os dados armazenados
import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { alteraUsuarioDTO } from "./dto/alteraUsuario.dto";

//Decorator responsável por informar que essa classe pode ser injetada em outras classes, podendo assim ser administrada pelo modulo
@Injectable()
export class UsuariosArmazenados{
    //Criação de vetor para armazenar os usuários (apenas em memoria, quando reiniciar a API perde tudo)
    #usuarios: UsuarioEntity[] = [];  
  

    //funçaço responsável por guardar o usuário no vetor
    AdicionarUsuario(usuario: UsuarioEntity){
        this.#usuarios.push(usuario);
    }

    //função responsável por remover o usuário
    async removeUsuario(id:string){
        //pesquisa usuário pelo id passado para retornar ele 
        const usuario = this.pesquisaId(id);

        //filtra removendo o usário informado
        this.#usuarios = this.#usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        )

        return usuario
    }


 
    pesquisaEmail(email:string){

       
        const possivelUsuario = this.#usuarios.find(
            usuario => usuario.email == email
        )
        return possivelUsuario;
    }    

    pesquisaId(id:string){
        const possivelUsuario = this.#usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        );

        if(!possivelUsuario){
            throw new Error('Usuario não encontrado');
        }

        return possivelUsuario
    }

   
    alteraUsuario(id:string,dadosNovos: alteraUsuarioDTO){
        
        const usuario = this.pesquisaId(id);

        Object.entries(dadosNovos).forEach(
            ([chave,valor]) => {
              
                if(chave === 'id'){
                    return
                }

                usuario[chave] = valor;
            }
        )

        return usuario;
        
    }

 
    validaEmail(emailNovo: string){
        const possivelUsuario = this.pesquisaEmail(emailNovo)
        
        return (possivelUsuario === undefined)
    }

   
    Login(email:string ,senha:string){
       
        const possivelUsuario = this.pesquisaEmail(email)
       
        if (possivelUsuario){
            return {
                usuario: possivelUsuario.senha == senha?possivelUsuario:null,
                status: possivelUsuario.senha == senha
            };
        }else{
            return {
                usuario: null,
                status: false
            };
        }
    }

    
    //função para retornar todos os usuarios
    get Usuarios(){        
        return this.#usuarios;
    }
}