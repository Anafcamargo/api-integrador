import { VoluntarioService } from './voluntario.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { criaVoluntarioDTO } from "./dto/criaVoluntario.dto";
import {VOLUNTARIO} from "./voluntario.entity";
import {  ApiTags } from "@nestjs/swagger"; 
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';


@ApiTags('voluntario')
@Controller('/voluntarios')
export class voluntarioController{
    
    constructor(private readonly VoluntarioService : VoluntarioService){
 
    } 

    @Get("listar")
    async listar (): Promise<VOLUNTARIO[]>{
        return this.VoluntarioService.listar();
    }

    @Post("")
    async criaVoluntario(@Body() dados: criaVoluntarioDTO): Promise<RetornoCadastroDTO>{
        return this.VoluntarioService.inserir(dados)
    }

    @Put (":id")
    async alterarVoluntario(@Body() dados: criaVoluntarioDTO, @Param("id") id: string): Promise<RetornoCadastroDTO>{
        return this.VoluntarioService.alterar(id,dados)
    }

    @Get("ID-:id")
    async listarID(@Param("id") id:string): Promise<VOLUNTARIO>{
        return this.VoluntarioService.localizarID(id);
    }

    @Delete("remove-:id")
    async removeVoluntario(@Param("id") id: string): Promise<RetornoObjDTO>{
        return this.VoluntarioService.remover(id);
    }

    // @Post()
    // @ApiCreatedResponse({ description:'Retorna que houve sucesso na inclusão'})
    // @ApiResponse({status: 500, description:'Retorna que houve erro na inclusão.'})
    // @ApiResponse({status: 400, description:'Retorna que há algum dado inválido na requisição.'})
    // async criavoluntario(@Body() dadosvoluntario: criavoluntarioDTO): Promise <RetornovoluntarioDTO>{        
       
    //     var novovoluntario = new voluntarioEntity(uuid(), dadosvoluntario.nome, dadosvoluntario.cpf, dadosvoluntario.idade, 
    //     dadosvoluntario.email, dadosvoluntario.senha, dadosvoluntario.telefone, dadosvoluntario.endereco, 
    //     dadosvoluntario.numero_casa, dadosvoluntario.bairro)
                                        
        
        
    //         this.voluntarios.Adicionarvoluntario(novovoluntario);
    //         var retorno = new RetornovoluntarioDTO("criado",novovoluntario);
        
    //     return retorno
    // }

 
    // @Post('/login')
    // @ApiResponse({status: 201, description:'Retorna que houve sucesso na consulta'})    
    // @ApiResponse({status: 400, description:'Retorna que há algum dado inválido na requisição.'})
    // async fazerLogin(@Body() dadosLogin: loginvoluntarioDTO){
        
    //     var retornoLogin = this.voluntarios.Login(dadosLogin.email,dadosLogin.senha)
    //     var retorno = new RetornovoluntarioDTO(retornoLogin.status?'Login efetuado':'Dados invalidos',retornoLogin.voluntario);
                
    //     return retorno;       
    // }

    // @Put('/:id')
    // @ApiResponse({status: 200, description:'Retorna que houve sucesso na alteração'})
    // @ApiResponse({status: 500, description:'Retorna que houve erro na alteração.'})
    // @ApiResponse({status: 400, description:'Retorna que há algum dado inválido na requisição.'})
    // async alteravoluntario(@Body() dadosNovos: alteravoluntarioDTO,@Param('id') id: string){
       
    //     var retornoAlteracao = this.voluntarios.alteravoluntario(id,dadosNovos)
        
    //     var retorno = new RetornovoluntarioDTO('Alteração Efetuada',retornoAlteracao);        
    //     return retorno;       
        
    // }

    // @Delete('/:id')
    // @ApiResponse({status: 200, description:'Retorna que houve sucesso na exclusão'})
    // @ApiResponse({status: 500, description:'Retorna que houve erro na exclusão.'})
    // async removevoluntario(@Param('id') id: string){
        
    //     var retornoExclusao = await this.voluntarios.removevoluntario(id)
     
    //     var retorno = new RetornovoluntarioDTO('Exclusão Efetuada',retornoExclusao);        
    //     return retorno;       
        
    // }

    // @Get('/:ID')
    // @ApiResponse({status: 200, description:'Retorna que houve sucesso na consulta'})
    // @ApiResponse({status: 500, description:'Retorna que houve erro na consulta.'})
    // async retornaVoluntarioId(@Param('ID') ID:string){
        
    //     var voluntariosListados = this.voluntarios.pesquisaId(ID);
    //     const ListaRetorno = new ListavoluntarioDTO(voluntariosListados.id,
    //         voluntariosListados.nome, voluntariosListados.cpf, voluntariosListados.idade, voluntariosListados.email,
    //     voluntariosListados.senha, voluntariosListados.telefone, voluntariosListados.endereco, voluntariosListados.numero_casa, voluntariosListados.bairro)

    //     return {
    //             Voluntario: ListaRetorno
    //         };
    // }

   

    // @Get()
    // @ApiResponse({status: 200, description:'Retorna que houve sucesso na consulta'})
    // async retornavoluntario(): Promise <ListagemVoluntariosDTO>{
        
    //     var voluntariosListados = this.voluntarios.voluntarios;
    //     const ListaRetorno = voluntariosListados.map(
    //         voluntario => new ListavoluntarioDTO(
    //             voluntario.id, voluntario.nome, voluntario.cpf, voluntario.idade, voluntario.email, voluntario.senha,
    //             voluntario.telefone, voluntario.endereco, voluntario.numero_casa, voluntario.bairro
    //         )
    //     );

    //     const retorno = new ListagemVoluntariosDTO (ListaRetorno);

    //     return retorno
    // }
}