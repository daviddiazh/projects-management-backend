import { Schema } from 'mongoose';
import { IUser } from '../../../../domain/common/user/user.interface';
import { ICommentary } from '../../../../domain/common/commentary/commentary.interface';

export class Commentary implements ICommentary {
    authorId: Schema.Types.ObjectId;
    projectId: Schema.Types.ObjectId;
    user?: IUser; //TODO: Make it
    commentary: string;
}
