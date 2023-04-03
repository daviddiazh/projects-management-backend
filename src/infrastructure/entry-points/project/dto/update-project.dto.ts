import { IsString, IsOptional, IsIn } from 'class-validator';
import { Status } from 'src/domain/common/project/status.enum';

export class UpdateProjectDto {
  // authorId: Schema.Types.ObjectId;
  // responsiblesId: Schema.Types.ObjectId[];
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
