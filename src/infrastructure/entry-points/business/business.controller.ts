import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { IBusinessDBRepository } from './business.repository.types';
import { Business } from './entities/business.entity';
import { Schema } from 'mongoose';

@Controller('/business')
export class BusinessController implements IBusinessDBRepository {
  constructor(private readonly businessService: BusinessService) {}

  @Post('/create')
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.create(createBusinessDto);
  }

  @Get('/findById/:_id')
  findById(@Param('_id') _id: Schema.Types.ObjectId) {
    return this.businessService.findById(_id);
  }

  @Get('/findByName/:businessName') //TODO: Check it
  findByName(@Param('businessName') businessName: string) {
    return this.businessService.findByName(businessName);
  }

  @Get('/findAll')
  findAll() {
    return this.businessService.findAll();
  }

  @Put('/update')
  update(@Body() payload): Promise<Business> {
    const { businessId, businessName } = payload;
    return this.businessService.update(businessId, businessName);
  }
}
