import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { IBusinessDBRepository } from './business.repository.types';

@Controller('business')
export class BusinessController implements IBusinessDBRepository {
  constructor(private readonly businessService: BusinessService) {}

  @Post('/create-business')
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.create(createBusinessDto);
  }

  @Get('/findById-business/:businessId')
  findById(@Param('businessId') businessId: string) {
    return this.businessService.findById(businessId);
  }

  @Get('/findByName-business/:businessName') //TODO: Check it
  findByName(@Param('businessName') businessName: string) {
    return this.businessService.findByName(businessName);
  }

  @Get('/findAll-business')
  findAll() {
    return this.businessService.findAll();
  }

}
