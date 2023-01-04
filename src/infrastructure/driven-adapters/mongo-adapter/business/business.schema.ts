import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';
import { IBusiness } from '../../../../domain/common/business/business.interface';

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

export class BusinessSpec extends Document implements IBusiness {

   @Prop({
        type: String,
        require: true,
        trim: true,
        unique: true
    })
    businessName: string;

}

export const BusinessSchema = SchemaFactory.createForClass(BusinessSpec);