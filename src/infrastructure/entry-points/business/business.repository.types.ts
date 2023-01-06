import { Business } from './entities/business.entity';
import { CreateBusinessDto } from './dto/create-business.dto';
import { Schema } from 'mongoose';

export abstract class IBusinessDBRepository {
    abstract create(payload: CreateBusinessDto): Promise<Business>;
    abstract findById(id: Schema.Types.ObjectId): Promise<Business>;
    abstract findByName(businessName: string): Promise<Business>;
    abstract findAll(): Promise<Business[]>;
    abstract update(businessId: string, businessName: string): Promise<Business>;
}