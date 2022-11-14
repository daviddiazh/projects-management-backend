import { Schema } from 'mongoose';
import { IBusiness } from '../../../../domain/common/business/business.interface';

export class Business implements IBusiness {
    // businessId: Schema.Types.ObjectId;
    businessName: string;
}
