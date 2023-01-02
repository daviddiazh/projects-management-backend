import { Business } from './entities/business.entity';
import { CreateBusinessDto } from './dto/create-business.dto';

export abstract class IBusinessDBRepository {
    abstract create(payload: CreateBusinessDto): Promise<Business>;
    abstract findById(id: string): Promise<Business>;
    abstract findByName(businessName: string): Promise<Business>;
    abstract findAll(): Promise<Business[]>;
    abstract update(businessId: string, businessName: string): Promise<Business>;
}