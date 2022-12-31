import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';
import { ICommentary } from '../../../../domain/common/commentary/commentary.interface';

@Schema({
    toJSON: {
        virtuals: true,
        transform: function(doc: any, ret: any){
            delete ret.__v;
            return ret;
        },
    },
    timestamps: true
})
export class CommentarySpec extends Document implements ICommentary {

    @Prop({
        type: SchemaMongoose.Types.ObjectId,
        required: true,
        trim: true,
    })
    authorId: SchemaMongoose.Types.ObjectId;

    @Prop({
        type: SchemaMongoose.Types.ObjectId,
        required: true,
        trim: true,
    })
    projectId: SchemaMongoose.Types.ObjectId;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    commentary: string;

}

export const CommentarySchema = SchemaFactory.createForClass(CommentarySpec);