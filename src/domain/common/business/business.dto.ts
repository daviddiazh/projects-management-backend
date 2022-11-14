import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { IBusiness } from './business.interface';
import { Schema } from 'mongoose';

export class BusinessDto implements IBusiness {
    // @IsMongoId()
    // businessId: Schema.Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    businessName: string;
}