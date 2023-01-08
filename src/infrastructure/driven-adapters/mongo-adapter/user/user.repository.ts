import { BadRequestException, NotFoundException, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSpec } from './user.schema';
import { User } from '../../../entry-points/auth/entities/user.entity';
import { UserDto } from '../../../../domain/common/user/user.dto';
import { IUserDBRepository } from '../../../entry-points/auth/user.repository.types';


export class UserDBRepository implements IUserDBRepository {

    constructor(
        @InjectModel('User') private userModel: Model<UserSpec>,
    ){}

    /**
     * Create a new User
     * @param payload
     * @return userCreated - The user created
    */
   async create (payload: UserDto): Promise<User> {
        try {
            let {email, ...userData} = payload;
            email = email.toLowerCase().trim();
            const newPayload = {email, ...userData}
            const createdUser: any = await (await new this.userModel(newPayload).save()).populate('businessId');
            
            if( !createdUser ){
                throw new BadRequestException('Registro incorrecto, por favor comuniquese con el administrador.');
            }

            let newObjectUser = createdUser;
            newObjectUser = newObjectUser.toObject();
            delete newObjectUser.password;
            delete newObjectUser.__v;
            delete newObjectUser.updatedAt;

            const { businessId } = newObjectUser;

            newObjectUser.business = {
                businessName: businessId.businessName,
                businessId: businessId._id,
                createdAt: businessId.createdAt
            };
            delete newObjectUser.businessId;

            return newObjectUser;
        } catch (error) {
            // console.log(error)
            throw new UnauthorizedException('Registro incorrecto, por favor comuniquese con el administrador.');
        }
    }

    /**
     * Find a User
     * @body id
     * @return user found - The user found
    */
   async findById (id: string): Promise<any> {
        try {
            const user: any = await this.userModel.findById({_id: id}).populate('businessId');

            if ( !user ) {
                throw new NotFoundException('No se encontro ningún usuario por ese ID.');
            }

            let newObjectUser = user;
            newObjectUser = newObjectUser.toObject();
            delete newObjectUser.password;
            delete newObjectUser.__v;
            delete newObjectUser.updatedAt;

            const { businessId } = newObjectUser;

            newObjectUser.business = {
                businessName: businessId.businessName,
                businessId: businessId._id,
                createdAt: businessId.createdAt
            };
            delete newObjectUser.businessId;

            return newObjectUser;
        } catch (error) {
            throw new NotFoundException('No se encontro ningún usuario por ese ID.');
        }
    }

   /**
     * Find a User
     * @body name, lastName
     * @return user by name found - The user found
    */
    async findByName (name: string, lastName: string): Promise<User[]> {
        try {
            const users: any = await this.userModel.find({name, lastName}).populate('businessId');

            if ( !users ) {
                throw new NotFoundException('No se encontro ningún usuario por ese nombre.');
            }

            let newObjectUsers = users;
            const returnUsers = newObjectUsers.map(user => {
                const { _doc: { password, ...userData } } = user;

                delete userData.__v;
                delete userData.updatedAt;

                const { businessId } = userData;

                userData.business = {
                    businessName: businessId.businessName,
                    businessId: businessId._id,
                    createdAt: businessId.createdAt
                };
                delete userData.businessId;
                
                return userData
            });

            return returnUsers;
        } catch (error) {
            throw new NotFoundException('No se encontro ningún usuario por ese nombre.');
        }
    }

   /**
     * Find a User
     * @body email
     * @return user by email found - The user found
    */
    async findByEmail (email: string): Promise<User> {
        try {
            email = email.toLowerCase().trim();
            const user: any = await this.userModel.findOne({email}).populate('businessId');

            if ( !user ) {
                throw new NotFoundException('No se encontro ningún usuario por ese correo electrónico.');
            }

            let newObjectUser = user;
            newObjectUser = newObjectUser.toObject();
            // delete newObjectUser.password;
            delete newObjectUser.__v;
            delete newObjectUser.updatedAt;

            const { businessId } = newObjectUser;

            newObjectUser.business = {
                businessName: businessId.businessName,
                businessId: businessId._id,
                createdAt: businessId.createdAt
            };
            delete newObjectUser.businessId;

            return newObjectUser;
        } catch (error) {
            throw new NotFoundException('No se encontro ningún usuario por ese correo electrónico.');
        }
    }

   /**
     * Find a User
     * @return users found - The users found
    */
    async findAll (): Promise<User[]> {
        try {
            const users: any = await this.userModel.find().populate('businessId');

            if ( !users ) {
                throw new Error('Not found users - Repository (USER MODULE)');
            }

            let newObjectUsers = users;
            const returnUsers = newObjectUsers.map(user => {
                const { _doc: { password, ...userData } } = user;
                
                return userData
            });

            return returnUsers;
        } catch (error) {
            console.log('Down Service in FINDALL method on Repository - ADAPTER');
            throw new ServiceUnavailableException(`Down Service in findAll method: ${error.message}`);
        }
    }

   /**
     * Update a User's role
     * @params id, role
     * @return user's role update - The user's role update
    */
    async updateRole (id: string, role: string): Promise<User> {
        try {
            const user: any = await this.userModel.findByIdAndUpdate({_id: id, role}).populate('businessId');

            if ( !user ) {
                throw new NotFoundException('No se encontro ningún usuario por ese ID.');
            }

            let newObjectUser = user;
            newObjectUser = newObjectUser.toObject();
            delete newObjectUser.password;

            const { businessId } = newObjectUser;

            newObjectUser.business = {
                businessName: businessId.businessName,
                businessId: businessId._id,
                createdAt: businessId.createdAt
            };
            delete newObjectUser.businessId;
            delete newObjectUser.__v;
            delete newObjectUser.updatedAt;
            
            return newObjectUser;
        } catch (error) {
            throw new NotFoundException('No se encontro ningún usuario por ese ID.');
        }
    }

   /**
     * Delete a User
     * @params id
     * @return delete user - The user deleted
    */
    async delete (id: string): Promise<void> {
        try {
            const user = await this.userModel.findByIdAndDelete(id);

            if ( !user ) {
                throw new NotFoundException('No se encontro ningún usuario por ese ID.');
            }

            return;
        } catch (error) {
            throw new NotFoundException('No se encontro ningún usuario por ese ID.');
        }
    }

}