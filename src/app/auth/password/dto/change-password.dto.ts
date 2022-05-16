import { Field, InputType } from '@nestjs/graphql';
import { Length, Matches } from 'class-validator';
import { characterLimitMessage, characterValidationMessage } from '../../dto';
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '../../../../core/environment';

@InputType()
export class ChangePasswordDto {
  @Field()
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {
    message: characterLimitMessage,
  })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s)/, {
    message: characterValidationMessage,
  })
  oldPassword: string;

  @Field()
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {
    message: characterLimitMessage,
  })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s)/, {
    message: characterValidationMessage,
  })
  newPassword: string;
}
