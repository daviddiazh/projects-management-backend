import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsNotEmpty()
  @IsString()
  newStatus: string;
}
