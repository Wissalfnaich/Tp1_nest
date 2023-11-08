// custom-validation.ts
import {
    IsString,
    MinLength,
    MaxLength,
    IsNotEmpty,
    IsOptional,
  } from 'class-validator';
  
  export class CustomTodoValidation {
    @IsString({ message: 'La description doit être une chaîne de caractères.' })
    @MinLength(10, { message: 'La description doit contenir au moins 10 caractères.' })
    @IsNotEmpty({ message: 'La description est obligatoire.' })
    description: string;
  
    @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
    @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères.' })
    @MaxLength(10, { message: 'Le nom ne peut pas dépasser 10 caractères.' })
    @IsNotEmpty({ message: 'Le nom est obligatoire.' })
    name: string;
  }
  