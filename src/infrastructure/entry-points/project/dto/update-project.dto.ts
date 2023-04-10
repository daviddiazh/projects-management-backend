import { IsString, IsOptional, IsIn, IsArray } from 'class-validator';
import { Status } from 'src/domain/common/project/status.enum';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  authorId: string;
  @IsOptional()
  // @IsString()
  @IsArray()
  responsiblesId: string[];
  @IsOptional()
  @IsString()
  businessId: string;
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsString()
  @IsIn([Status.PENDING, Status.IN_PROGRESS, Status.DONE])
  status: Status;
  @IsOptional()
  @IsString()
  acceptanceCriteria?: string;
}
