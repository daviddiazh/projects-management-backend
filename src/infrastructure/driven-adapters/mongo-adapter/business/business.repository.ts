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
                throw new BadRequestException('Error al crear el negocio.');
            }

            return createdBusiness;
        } catch (error) {
            // console.log('Down Service in Create method on Repository - ADAPTER');
            throw new BadRequestException('Error al crear el negocio.')
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
                throw new NotFoundException('No se encontró ningún negocio por ese ID, por favor comuníquese con el administrador.');
            }

            return business;
        } catch (error) {
            throw new NotFoundException('No se encontró ningún negocio por ese ID, por favor comuníquese con el administrador.')
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
                throw new NotFoundException('No se encontró ningún negocio con ese nombre.');
            }

            return business;
        } catch (error) {
            // console.log('Down Service in Find method on Repository - ADAPTER');
            throw new ServiceUnavailableException('No se encontró ningún negocio con ese nombre.')
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
                throw new NotFoundException('No se encontraron negocios.');
            }

            return business;
        } catch (error) {
            // console.log('Down Service in Find method on Repository - ADAPTER');
            throw new ServiceUnavailableException('No se encontraron negocios.')
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
                throw new NotFoundException('No se encontró ningún negocio por ese ID para actualizar.');
            }

            return business;
        } catch (error) {
            // console.log('Down Service in Find method on Repository - ADAPTER');
            throw new ServiceUnavailableException('No se encontró ningún negocio por ese ID para actualizar.')
        }
    }

}