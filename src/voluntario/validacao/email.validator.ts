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
