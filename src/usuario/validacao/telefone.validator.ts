import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { UsuarioService } from "../usuario.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class telefoneUnicoValidator implements ValidatorConstraintInterface {
    constructor(private Usuarios: UsuarioService) {}

    // Função de validação que verifica se o telefone é único
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const validarTelefone = await this.Usuarios.validaTelefone(value);
        return validarTelefone;
    }    
}

// Export do decorator para uso
export const TelefoneUnico = (opcoesValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor, 
            propertyName: propriedade,
            options: opcoesValidacao,
            constraints: [],
            validator: telefoneUnicoValidator
        });
    }
}
