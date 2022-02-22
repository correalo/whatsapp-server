import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessageParams } from 'src/entities/Message';
import { ValidatorError } from 'src/exceptions/validator.error';
import { CsvLineDTO } from 'src/services/message.service';
import validator from 'validator';

@Injectable()
export class MessageValidatorService {
  public validate(cvsLinesDto: CsvLineDTO[], params: MessageParams[]): void {
    const errors: ValidatorError[] = [];
    cvsLinesDto.forEach((csvLine) => {
      return params.forEach((param) => {
        try {
          this.isValidated(param.type, csvLine[param.key]);
        } catch (error) {
          errors.push(error);
        }
      });
    });
    if (errors.length)
      throw new HttpException(
        {
          errors: errors.map((error) => error.message),
        },
        HttpStatus.BAD_GATEWAY,
      );
  }

  private isValidated(type: MessageParams['type'], value?: string): void {
    switch (type) {
      case 'string': {
        if (validator.isEmpty(value) || !validator.isAlpha(value, 'pt-BR')) {
          throw new ValidatorError(
            `Valor inválido: ${value}. Campo não pode ser vazio e deve conter apenas caracteres alpha numéricos`,
          );
        }
        break;
      }
      case 'date': {
        if (
          validator.isEmpty(value) ||
          !validator.isDate(value, { format: 'dd/MM/yyyy', strictMode: true })
        ) {
          throw new ValidatorError(
            `Valor inválido: ${value}. Campo não pode ser vazio e deve ser uma data com o formato 'dd/MM/yyyy'`,
          );
        }
        break;
      }
      case 'datetime': {
        if (
          validator.isEmpty(value) ||
          !validator.isDate(value, { format: 'HH:MM', strictMode: true })
        ) {
          throw new ValidatorError(
            `Valor inválido: ${value}. Campo não pode ser vazio e deve ser um horário com o formato 'HH:MM'`,
          );
        }
        break;
      }
      default: {
        throw new Error(`Tipo desconhecido: ${type}`);
      }
    }
  }
}
