import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';
import { IUser } from '../../../../domain/common/user/user.interface';
import { Role } from '../../../../domain/common/user/user-role.enum';

@Schema({
    toJSON: {
        virtuals: true,
        transform: function( doc: any, ret: any ) {
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
    timestamps: true,
})

export class UserSpec extends Document implements IUser {

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    name: string;

   @Prop({
        type: String,
        required: true,
        trim: true,
    })
   lastName: string;
   
   @Prop({
        type: Number,
        required: false,
        trim: true,
    })
   phone?: string; //TODO: Check it

   @Prop({
        type: String,
        required: true,
        trim: true,
        unique: true
    })
   email: string;

   @Prop({
        type: String,
        required: true,
        trim: true,
    })
   password: string;

   @Prop({
        type: String,
        required: true,
        trim: true,
        enum: {
            values: ['USER', 'ADMIN', 'EMPLOYEE'],
            default: 'USER',
        },
    })
   role: Role;

   @Prop({
        type: String,
        trim: true,
        required: false,
        default: '' //TODO: Change it and search an image
   })
   profilePicture?: string;

   @Prop({
        type: SchemaMongoose.Types.ObjectId
   })
   businessId: SchemaMongoose.Types.ObjectId;

}

export const UserSchema = SchemaFactory.createForClass(UserSpec);