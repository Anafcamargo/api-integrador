/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { voluntariosArmazenados } from "../voluntario.dm";

@Injectable()
@ValidatorConstraint({async:true})
export class emailUnicoValidator implements ValidatorConstraintInterface{
    constructor(private Voluntarios : voluntariosArmazenados){

    }
    
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const validarEmail =  this.Voluntarios.validaEmail(value);
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