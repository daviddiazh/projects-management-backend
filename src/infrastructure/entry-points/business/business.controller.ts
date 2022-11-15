import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { IBusinessDBRepository } from './business.repository.types';

@Controller('/business')
export class BusinessController implements IBusinessDBRepository {
  constructor(private readonly businessService: BusinessService) {}

  @Post('/create')
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.create(createBusinessDto);
  }

  @Post('/findById')
  findById(@Body() id: string) {
    return this.businessService.findById(id);
  }

  @Get('/findByName/:businessName') //TODO: Check it
  findByName(@Param('businessName') businessName: string) {
    return this.businessService.findByName(businessName);
  }

  @Get('/findAll')
  findAll() {
    return this.businessService.findAll();
  }

}
