import { Schema } from 'mongoose';
import { IBusiness } from '../../../../domain/common/business/business.interface';

export class Business implements IBusiness {
    businessName: string;
    businessId: Schema.Types.ObjectId;
}
