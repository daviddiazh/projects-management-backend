import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { Status } from 'src/domain/common/project/status.enum';

export class PatchStatusDto {
  @IsNotEmpty()
  @IsString()
  @IsIn([Status.PENDING, Status.IN_PROGRESS, Status.DONE])
  newStatus: string;
}
