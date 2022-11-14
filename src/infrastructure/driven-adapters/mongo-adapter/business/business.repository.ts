import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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
            const createdBusiness = await new this.businessModel(payload).save();

            if( !createdBusiness ){
                throw new Error('Error creating an Business - Repository');
            }

            return createdBusiness;
        } catch (error) {
            console.log('Down Service in Create method on Repository - ADAPTER');
            throw new Error(error);
        }
   }

    /**
     * Find a Business
     * @param id
     * @return business found - The found business
    */
   async findById (id: string): Promise<Business> {
        try {
            const business = await this.businessModel.findById(id);

            if ( !business ) {
                throw new Error('Not found business by id - Repository');
            }

            return business;
        } catch (error) {
            console.log('Down Service in Find method on Repository - ADAPTER');
            throw new Error(error);
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
                throw new Error('Not found business by id - Repository');
            }

            return business;
        } catch (error) {
            console.log('Down Service in Find method on Repository - ADAPTER');
            throw new Error(error);
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
                throw new Error('Not found business by id - Repository');
            }

            return business;
        } catch (error) {
            console.log('Down Service in Find method on Repository - ADAPTER');
            throw new Error(error);
        }
   }

}