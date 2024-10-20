// import { VoluntarioService } from './../voluntario.service';

// import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
// import { Injectable } from "@nestjs/common";
// import { Any } from 'typeorm';



// @Injectable()
// @ValidatorConstraint({async:true})
// export class emailUnicoValidator implements ValidatorConstraintInterface{
//     Voluntarios: any;
//     constructor(private readonly VoluntarioService : VoluntarioService){

//     }
    
//     async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
//         const validarEmail =  await this.Voluntarios.validaEmail(value);
//         return validarEmail;
//     }    
// }

// export const EmailUnico = (opcoesValidacao: ValidationOptions) => {
//     return (objeto : Object, propriedade: string) => {
//         registerDecorator({
//             target: objeto.constructor,
//             propertyName: propriedade,
//             options: opcoesValidacao,
//             constraints: [],
//             validator: emailUnicoValidator
//         })
//     }
// }











import { VoluntarioService } from './../voluntario.service';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class validarEmail implements ValidatorConstraintInterface {
    constructor(private readonly voluntarioService: VoluntarioService) {}

    async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
        // Await the asynchronous validation
        const isValidEmail = await this.voluntarioService.validaEmail(value);
        return isValidEmail;
    }    
}

export const EmailUnico = (validationOptions?: ValidationOptions) => {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: validarEmail,
        });
    }
}
