import { Schema } from 'mongoose';

export interface ICommentary {
    authorId: Schema.Types.ObjectId;
    projectId: Schema.Types.ObjectId;
    commentary: string;
}