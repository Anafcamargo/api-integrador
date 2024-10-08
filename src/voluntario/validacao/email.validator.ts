import { VoluntarioService } from './../voluntario.service';

import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";



@Injectable()
@ValidatorConstraint({async:true})
export class emailUnicoValidator implements ValidatorConstraintInterface{
    Voluntarios: any;
    constructor(private readonly VoluntarioService : VoluntarioService){

    }
    
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const validarEmail =  await this.Voluntarios.validaEmail(value);
        return validarEmail;
    }    
}

export const EmailUnico = (opcoesValidacao: ValidationOptions) => {
    return (objeto : Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesValidacao,
            constraints: [],
            validator: emailUnicoValidator
        })
    }
}