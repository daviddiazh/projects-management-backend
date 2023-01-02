import { Schema } from 'mongoose';
import { IsArray, IsMongoId, IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';
import { IProject } from '../../../../domain/common/project/project.interface';
import { Status } from '../../../../domain/common/project/status.enum';

export class CreateProjectDto implements IProject {

    @IsNotEmpty()
    @IsMongoId()  
    businessId: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsMongoId()
    authorId: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsArray()
    @IsMongoId()
    responsiblesId: Schema.Types.ObjectId[]; //TODO: Check it

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    acceptanceCriteria?: string;

    @IsOptional()
    @IsIn([Status.PENDING, Status.IN_PROGRESS, Status.DONE])
    @IsString()
    status: Status;

}
