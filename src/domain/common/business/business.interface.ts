import { Schema } from 'mongoose';

export interface IBusiness {
    businessName: string;
    businessId: Schema.Types.ObjectId;
}