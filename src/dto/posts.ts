import { IsNotEmpty, IsOptional } from 'class-validator';

export class PostCreateOneDto {
  @IsNotEmpty()
  description: string;

  @IsOptional()
  photo: string;
}

export class PostPatchOneDto {
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  photo: string;
}
