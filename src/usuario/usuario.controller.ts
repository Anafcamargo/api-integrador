import { UsuarioService } from './usuario.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { criaUsuarioDTO } from "./dto/criaUsuario.dto";
import { USUARIO } from "./usuario.entity";
import {v4  as uuid} from 'uuid'
import { RetornoUsuarioDTO } from "./dto/retornoUsuario.dto";
import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";
import { loginUsuarioDTO } from "./dto/loginUsuario.dto";
import { alteraUsuarioDTO } from "./dto/alteraUsuario.dto";
import { ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { promises } from "dns";
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';

@ApiTags('usuario')
@Controller('/usuarios')
export class UsuarioController{

    constructor(private readonly UsuarioService : UsuarioService){

    }

    @Get("listar")
    async listar (): Promise<USUARIO[]>{
        return this.UsuarioService.listar();
    }

    @Post("")
    async criaUsuario(@Body() dados: criaUsuarioDTO): Promise<RetornoCadastroDTO>{
        return this.UsuarioService.inserir(dados)
    }

    @Put (":id")
    async alterarUsuario(@Body() dados: alteraUsuarioDTO, @Param("id") id: string): Promise<RetornoCadastroDTO>{
        return this.UsuarioService.alterar(id,dados)
    }

    @Get("ID-:id")
    async listarID(@Param("id") id:string): Promise<USUARIO>{
        return this.UsuarioService.localizarID(id);
    }

    @Delete("remove-:id")
    async removeUsuario(@Param("id") id: string): Promise<RetornoObjDTO>{
        return this.UsuarioService.remover(id);
    }
    


    // @Post()
    // @ApiCreatedResponse({ description:'Retorna que houve sucesso na inclusão'})
    // @ApiResponse({status: 500, description:'Retorna que houve erro na inclusão.'})
    // @ApiResponse({status: 400, description:'Retorna que há algum dado inválido na requisição.'})
    // async criaUsuario(@Body() dadosUsuario: criaUsuarioDTO): Promise <RetornoUsuarioDTO>{       
 
    //     var novoUsuario = new UsuarioEntity(uuid(), dadosUsuario.nome, dadosUsuario.telefone  )
        
    //     this.Usuarios.AdicionarUsuario(novoUsuario);

    //     var retorno = new RetornoUsuarioDTO('Usuario criado',novoUsuario);        
    //     return retorno        
    // }

    // @Post('/login')
    // @ApiResponse({status: 201, description:'Retorna que houve sucesso na consulta'})    
    // @ApiResponse({status: 400, description:'Retorna que há algum dado inválido na requisição.'})
    // async fazerLogin(@Body() dadosLogin: loginUsuarioDTO){
     
    //     var retornoLogin = this.Usuarios.Login(dadosLogin.nome,dadosLogin.telefone)

    //     var retorno = new RetornoUsuarioDTO(retornoLogin.status?'Login efetuado, sucesso':'Dados invalidos!',retornoLogin.usuario);        

    //     return retorno;       
        
    // }

    // @Put('/:id')
    // @ApiResponse({status: 200, description:'Retorna que houve sucesso na alteração'})
    // @ApiResponse({status: 500, description:'Retorna que houve erro na alteração.'})
    // @ApiResponse({status: 400, description:'Retorna que há algum dado inválido na requisição.'})
    // async alteraUsuario(@Body() dadosNovos: alteraUsuarioDTO,@Param('id') id: string){
    //     var retornoAlteracao = this.Usuarios.alteraUsuario(id,dadosNovos)
        
    //     var retorno = new RetornoUsuarioDTO('Alteração Efetuada',retornoAlteracao);        
    //     return retorno;       
        
    // }

    // @Delete('/:id')
    // @ApiResponse({status: 200, description:'Retorna que houve sucesso na exclusão'})
    // @ApiResponse({status: 500, description:'Retorna que houve erro na exclusão.'})
    // async removeUsuario(@Param('id') id: string){
    //     var retornoExclusao = await this.Usuarios.removeUsuario(id)
    
    //     var retorno = new RetornoUsuarioDTO('Exclusão Efetuada',retornoExclusao);        
    //     return retorno;       
        
    // }

    // @Get('/:ID')
    // @ApiResponse({status: 200, description:'Retorna que houve sucesso na consulta'})
    // @ApiResponse({status: 500, description:'Retorna que houve erro na consulta.'})
    // async retornaUsuarioId(@Param('ID') ID:string){
    //     var usuariosListados = this.Usuarios.pesquisaId(ID);
    //     const ListaRetorno = new ListaUsuarioDTO(usuariosListados.id,
    //                                             usuariosListados.nome,
    //                                             usuariosListados.telefone)

    //     return {
    //             Usuario: ListaRetorno
    //         };
    // }

    // @Get()
    // @ApiResponse({status: 200, description:'Retorna que houve sucesso na consulta'})
    // async retornaUsuario(): Promise <ListagemUsuariosDTO>{
    //     var usuariosListados = this.Usuarios.Usuarios;
    //     const ListaRetorno = usuariosListados.map(
    //         usuario => new ListaUsuarioDTO(
    //             usuario.id,
    //             usuario.nome,
    //             usuario.telefone
    //         )
    //     );

    //     const retorno = new ListagemUsuariosDTO(ListaRetorno);


    //     return retorno
    // }
}