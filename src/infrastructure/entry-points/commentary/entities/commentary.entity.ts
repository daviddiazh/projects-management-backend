import { Schema } from 'mongoose';
import { ICommentary } from '../../../../domain/common/commentary/commentary.interface';

export class Commentary implements ICommentary {
    authorId: Schema.Types.ObjectId;
    projectId: Schema.Types.ObjectId;
    commentary: string;
}
