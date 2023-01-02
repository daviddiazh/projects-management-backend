import { Schema } from 'mongoose';
import { ICommentary } from "../commentary/commentary.interface";
import { Status } from "./status.enum";

export interface IProject {
    businessId: Schema.Types.ObjectId;
    authorId: Schema.Types.ObjectId;
    responsiblesId: Schema.Types.ObjectId[]; //TODO: Check it
    title: string;
    description: string;
    acceptanceCriteria?: string;
    status: Status;
    commentaries?: ICommentary[];
}