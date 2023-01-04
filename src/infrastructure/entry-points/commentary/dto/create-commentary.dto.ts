import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Schema } from 'mongoose';
import { ICommentary } from '../../../../domain/common/commentary/commentary.interface';

export class CreateCommentaryDto implements ICommentary {

    @IsNotEmpty()
    @IsMongoId()
    authorId: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsMongoId()
    projectId: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    commentary: string;

}
