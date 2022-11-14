import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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
            const createdUser = await new this.userModel(payload).save();

            if( !createdUser ){
                throw new Error('Error creating an User - Repository (USER MODULE)');
            }

            return createdUser;
        } catch (error) {
            console.log('Down Service in Create method on Repository - ADAPTER');
            throw new Error(error);
        }
   }

    /**
     * Find a User
     * @param id
     * @return user found - The user found
    */
   async findById (id: string): Promise<User> {
        try {
            const user = await this.userModel.findOne({id}).populate('businessId');

            if ( !user ) {
                throw new Error('Not found user by id - Repository (USER MODULE)');
            }

            return user;
        } catch (error) {
            console.log('Down Service in FindById method on Repository - ADAPTER');
            throw new Error(error);
        }
   }

   /**
     * Find a User
     * @param name
     * @return user by name found - The user found
    */
    async findByName (name: string): Promise<User> {
        try {
            const user = await this.userModel.findOne({name}).populate('businessId');

            if ( !user ) {
                throw new Error('Not found user by name - Repository (USER MODULE)');
            }

            return user;
        } catch (error) {
            console.log('Down Service in FindByName method on Repository - ADAPTER');
            throw new Error(error);
        }
   }

   /**
     * Find a User
     * @return users found - The users found
    */
    async findAll (): Promise<User[]> {
        try {
            const user = await this.userModel.find().populate('businessId');

            if ( !user ) {
                throw new Error('Not found users - Repository (USER MODULE)');
            }

            return user;
        } catch (error) {
            console.log('Down Service in FINDALL method on Repository - ADAPTER');
            throw new Error(error);
        }
   }

   /**
     * Update a User's role
     * @params id, role
     * @return user's role update - The user's role update
    */
    async updateRole (id: string, role: string): Promise<User> {
        try {
            const user = await this.userModel.findOneAndUpdate({id, role});

            if ( !user ) {
                throw new Error('Not found user - Repository (USER MODULE)');
            }

            return user;
        } catch (error) {
            console.log('Down Service in UPDATEROLE method on Repository - ADAPTER');
            throw new Error(error);
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
                throw new Error('Not found user - Repository (USER MODULE)');
            }

            return;
        } catch (error) {
            console.log('Down Service in DELETE method on Repository - ADAPTER');
            throw new Error(error);
        }
   }

}