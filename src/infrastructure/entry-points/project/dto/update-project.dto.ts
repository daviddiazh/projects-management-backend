import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { Schema } from 'mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {

    @IsNotEmpty()
    @IsMongoId()
    projectId: Schema.Types.ObjectId;
    
}
