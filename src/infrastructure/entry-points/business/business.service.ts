import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { IBusinessDBRepository } from './business.repository.types';
import { BusinessDBRepository } from '../../driven-adapters/mongo-adapter/business/business.repository';

@Injectable()
export class BusinessService implements IBusinessDBRepository {

  constructor(
    private readonly businessRepository: BusinessDBRepository
  ){}

  create(createBusinessDto: CreateBusinessDto) {
    return this.businessRepository.create(createBusinessDto);
  }

  findById(businessId: string) {
    return this.businessRepository.findById(businessId);
  }

  findByName(businessName: string) {
    return this.businessRepository.findByName(businessName);
  }

  findAll() {
    return this.businessRepository.findAll();
  }

}
