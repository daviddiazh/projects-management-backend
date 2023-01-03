import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';
import { ICommentary } from 'src/domain/common/commentary/commentary.interface';
import { Status } from 'src/domain/common/project/status.enum';
import { IProject } from '../../../../domain/common/project/project.interface';

@Schema({
    toJSON: {
        virtuals: true,
        transform: function( doc: any, ret: any ) {
            // delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
    timestamps: true,
})
export class ProjectSpec extends Document implements IProject {

    @Prop({
        type: SchemaMongoose.Types.ObjectId,
        required: true,
        trim: true
    })
    businessId: SchemaMongoose.Types.ObjectId;

    @Prop({
        type: SchemaMongoose.Types.ObjectId,
        required: true,
        trim: true,
    })
    authorId: SchemaMongoose.Types.ObjectId;

    @Prop({
        type: Array<SchemaMongoose.Types.ObjectId>,
        required: true,
        trim: true,
    })
    responsiblesId: SchemaMongoose.Types.ObjectId[];

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    title: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    description: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    acceptanceCriteria: string;

    @Prop({
        type: String,
        required: false,
        trim: true,
        enum: {
            values: [ Status.PENDING, Status.IN_PROGRESS, Status.DONE ]
        },
        default: Status.PENDING
    })
    status: Status;

    @Prop({
        type: Array<ICommentary>, //TODO: Check it
        required: false,
    })
    commentaries: ICommentary[];

}

export const ProjectSchema = SchemaFactory.createForClass(ProjectSpec);