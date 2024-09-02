
import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { alteraUsuarioDTO } from "./dto/alteraUsuario.dto";


@Injectable()
export class UsuariosArmazenados{
    [x: string]: any;
    
    #usuarios: UsuarioEntity[] = [];  
  

   
    AdicionarUsuario(usuario: UsuarioEntity){
        this.#usuarios.push(usuario);
    }

    
    async removeUsuario(id:string){
        
        const usuario = this.pesquisaId(id);

        this.#usuarios = this.#usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        )

        return usuario
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


   
    Login(nome:string ,telefone:string){
       
        const possivelUsuario = this.pesquisaTelefone(telefone)
       
        if (possivelUsuario){
            return {
                usuario: possivelUsuario.telefone == telefone?possivelUsuario:null,
                status: possivelUsuario.telefone == telefone
            };
        }else{
            return {
                usuario: null,
                status: false
            };
        }
    }

    
    
    get Usuarios(){        
        return this.#usuarios;
    }
}