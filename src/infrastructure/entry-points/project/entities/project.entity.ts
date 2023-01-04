import { Schema } from 'mongoose';
import { ICommentary } from 'src/domain/common/commentary/commentary.interface';
import { Status } from 'src/domain/common/project/status.enum';
import { IProject } from '../../../../domain/common/project/project.interface';


export class Project implements IProject{
    businessId: Schema.Types.ObjectId;
    authorId: Schema.Types.ObjectId;
    responsiblesId: Schema.Types.ObjectId[];
    title: string;
    description: string;
    acceptanceCriteria?: string;
    status: Status;
    commentaries?: ICommentary[];
}
