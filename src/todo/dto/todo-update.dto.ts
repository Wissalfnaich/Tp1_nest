// todo-update.dto.ts
import { IsOptional, IsString, MinLength, MaxLength, IsEnum, IsDate } from 'class-validator';
import { StatusEnum } from '../status.enum';

export class TodoUpdateDto {
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères.' })
  @MaxLength(10, { message: 'Le nom ne peut pas dépasser 10 caractères.' })
  @IsOptional()
  name: string;

  @IsString({ message: 'La description doit être une chaîne de caractères.' })
  @MinLength(10, { message: 'La description doit contenir au moins 10 caractères.' })
  @IsOptional()
  description: string;

  @IsEnum(StatusEnum, { message: 'Statut invalide.' })
  @IsOptional()
  status: StatusEnum;
 
}
