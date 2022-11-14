import { Business } from './entities/business.entity';
import { CreateBusinessDto } from './dto/create-business.dto';

export abstract class IBusinessDBRepository {
    abstract create(payload: CreateBusinessDto): Promise<Business>;
    abstract findById(businessId: string): Promise<Business>;
    abstract findByName(businessName: string): Promise<Business>;
    abstract findAll(): Promise<Business[]>;
}