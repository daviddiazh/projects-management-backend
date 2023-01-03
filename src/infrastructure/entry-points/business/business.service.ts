import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { IBusinessDBRepository } from './business.repository.types';
import { BusinessDBRepository } from '../../driven-adapters/mongo-adapter/business/business.repository';
import { Business } from './entities/business.entity';

@Injectable()
export class BusinessService implements IBusinessDBRepository {

  constructor(
    private readonly businessRepository: BusinessDBRepository
  ){}

  create(createBusinessDto: CreateBusinessDto) {
    return this.businessRepository.create(createBusinessDto);
  }

  findById(id: string) {
    return this.businessRepository.findById(id);
  }

  findByName(businessName: string) {
    return this.businessRepository.findByName(businessName);
  }

  findAll() {
    return this.businessRepository.findAll();
  }

  update(businessId: string, businessName: string): Promise<Business> {
    return this.businessRepository.update(businessId, businessName)
  }

}
