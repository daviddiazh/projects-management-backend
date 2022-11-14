import { IsString, IsNotEmpty } from 'class-validator';
import { IBusiness } from './business.interface';
import { Schema } from 'mongoose';

export class BusinessDto implements IBusiness {
    @IsString()
    @IsNotEmpty()
    businessName: string;

    @IsString()
    @IsNotEmpty()
    businessId: Schema.Types.ObjectId;
}