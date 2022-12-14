import { ServiceUnavailableException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { BusinessSpec } from './business.schema';
import { Business } from '../../../entry-points/business/entities/business.entity';
import { BusinessDto } from '../../../../domain/common/business/business.dto';
import { IBusinessDBRepository } from '../../../entry-points/business/business.repository.types';


export class BusinessDBRepository implements IBusinessDBRepository {

    constructor(
        @InjectModel('Business') private businessModel: Model<BusinessSpec>,
    ){}

    /**
     * Create a new Business
     * @param payload
     * @return businessCreated - The created business
    */
   async create (payload: BusinessDto): Promise<Business> {
        try {
            const createdBusiness = await this.businessModel.create(payload);

            if( !createdBusiness ){
                throw new BadRequestException('Error creating an Business - Repository');
            }

            return createdBusiness;
        } catch (error) {
            console.log('Down Service in Create method on Repository - ADAPTER');
            throw new ServiceUnavailableException(`Down Service in create method - business: ${error.message}`)
        }
   }

    /**
     * Find a Business
     * @param id
     * @return business found - The found business
    */
   async findById (_id: Schema.Types.ObjectId): Promise<Business> {
        try {
            const business = await this.businessModel.findById(_id);

            if ( !business ) {
                throw new NotFoundException('No se encontro ninguna empresa por ese ID.');
            }

            return business;
        } catch (error) {
            throw new NotFoundException('No se encontro ninguna empresa por ese ID.')
        }
   }

   /**
     * Find a Business
     * @param businessName
     * @return business found - The found business
    */
    async findByName (businessName: string): Promise<Business> {
        try {
            const business = await this.businessModel.findOne({businessName});

            if ( !business ) {
                throw new NotFoundException('Not found business by id - Repository');
            }

            return business;
        } catch (error) {
            console.log('Down Service in Find method on Repository - ADAPTER');
            throw new ServiceUnavailableException(`Down Service in find by name method - business: ${error.message}`)
        }
   }

   /**
     * Find All Business
     * @return business found - The found business
    */
    async findAll (): Promise<Business[]> {
        try {
            const business = await this.businessModel.find();

            if ( !business ) {
                throw new NotFoundException('Not found business by id - Repository');
            }

            return business;
        } catch (error) {
            console.log('Down Service in Find method on Repository - ADAPTER');
            throw new ServiceUnavailableException(`Down Service in find all method - business: ${error.message}`)
        }
   }

   /**
     * Update name of Business
     * @return business updated
    */
   async update (businessId: string, businessName: string): Promise<Business> {
        try {
            const business = await this.businessModel.findByIdAndUpdate(businessId, { businessName }, {new: true});

            if ( !business ) {
                throw new NotFoundException('Not found business by id - Update Repository');
            }

            return business;
        } catch (error) {
            console.log('Down Service in Find method on Repository - ADAPTER');
            throw new ServiceUnavailableException(`Down Service in find all method - business: ${error.message}`)
        }
    }

}