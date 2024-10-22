
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import * as bcrypt from 'bcrypt';
// import { LoginVoluntarioDTO } from 'src/voluntario/dto/loginVoluntario.dto';
// import { VOLUNTARIO } from 'src/voluntario/voluntario.entity';
// import { UnauthorizedException } from '@nestjs/common';
// import jwt from 'jsonwebtoken';
// import { JwtService } from '@nestjs/jwt';
// import { VoluntarioService } from 'src/voluntario/voluntario.service';

// @Injectable()
// export class AuthVoluntarioService {
  
//     constructor(
//         @InjectRepository(VOLUNTARIO)
//         private voluntarioRepository: Repository<VOLUNTARIO>,
//         private readonly jwtService: JwtService,
//         private readonly voluntarioService: VoluntarioService, 
//     ) {}

//     async login(EMAIL: string, SENHA: string): Promise<{ token: string; voluntario: VOLUNTARIO }> {
//         const voluntario = await this.voluntarioService.validarVoluntario(EMAIL, SENHA);
//         // const { EMAIL, SENHA } = dados;

//         // 1. Encontrar o voluntário pelo telefone
//         // const voluntario = await this.voluntarioRepository.findOne({ where: { EMAIL: EMAIL.toLowerCase() }  });
//         if (!voluntario) {
//             throw new UnauthorizedException('Credenciais inválidas');
//         }

//         // 2. Comparar a senha informada com a senha armazenada
//         const isPasswordValid = await bcrypt.compare(SENHA, voluntario.SENHA); 
//             if (!isPasswordValid) {
  
  
//             throw new UnauthorizedException('Credenciais inválidas');
//             }

            
            

//             const token = this.gerarToken(voluntario); 

//          return {
//             token,  // JWT token gerado
//             voluntario,
//           };
//         }


        
    

//         public gerarToken(voluntario: any) {
//             const payload = { email: voluntario.email, sub: voluntario.id };  // Payload do JWT
//             return this.jwtService.sign(payload);  // Gera o token com o serviço de JWT
//         }
// }



import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { VOLUNTARIO } from 'src/voluntario/voluntario.entity';
import { JwtService } from '@nestjs/jwt';
import { VoluntarioService } from 'src/voluntario/voluntario.service';
import { LoginVoluntarioDTO } from 'src/voluntario/dto/loginvoluntario.dto';

@Injectable()
export class AuthVoluntarioService {
    constructor(
        @InjectRepository(VOLUNTARIO)
        private voluntarioRepository: Repository<VOLUNTARIO>,
        private readonly jwtService: JwtService,
        private readonly voluntarioService: VoluntarioService,
    ) {}

    async generateHash(password: string): Promise<string> {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        console.log('Hash gerada:', hash); // Log para ver a hash
        return hash;
    }

    async verifyPassword(passwordToTest: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(passwordToTest, hashedPassword);
    }

    async login(dados: LoginVoluntarioDTO): Promise<{ token: string; voluntario: VOLUNTARIO }> {
        const { EMAIL, SENHA } = dados;
    
        const voluntario = await this.voluntarioRepository.findOne({ where: { EMAIL } });
        if (!voluntario) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
        
        console.log('Voluntário encontrado:', voluntario);
console.log('Senha informada:', SENHA);
console.log('Senha hashada no banco:', voluntario.SENHA);


        const isPasswordValid = await bcrypt.compare(SENHA, voluntario.SENHA);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas');
        }
    
        const token = this.gerarToken(voluntario);
        return { token, voluntario };
    }
    
    private gerarToken(voluntario: VOLUNTARIO): string {
        const payload = { email: voluntario.EMAIL, sub: voluntario.ID };  // Payload do JWT
        return this.jwtService.sign(payload);  // Gera o token com o serviço de JWT
    }
}
