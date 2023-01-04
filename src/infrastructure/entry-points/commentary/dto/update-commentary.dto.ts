import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';
import { CreateCommentaryDto } from './create-commentary.dto';

export class UpdateCommentaryDto extends PartialType(CreateCommentaryDto) {

    // @IsNotEmpty()
    // @IsMongoId()
    // commentaryId: Schema.Types.ObjectId;

}
