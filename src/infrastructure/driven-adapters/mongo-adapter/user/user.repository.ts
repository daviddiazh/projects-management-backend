import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserSpec } from './user.schema';
import { User } from '../../../entry-points/user/entities/user.entity';
import { UserDto } from '../../../../domain/common/user/user.dto';
import { IUserDBRepository } from '../../../entry-points/user/user.repository.types';


export class UserDBRepository implements IUserDBRepository {

    constructor(
        @InjectModel('User') private userModel: Model<UserSpec>,
    ){}

    /**
     * Create a new User
     * @param payload
     * @return userCreated - The created user
    */
   async create (payload: UserDto): Promise<User> {
        try {
            const createdUser = await new this.userModel(payload).save();

            if( !createdUser ){
                throw new Error('Error creating an User - Repository');
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
     * @return user found - The found user
    */
   async findById (id: string): Promise<User> {
        try {
            const user = await this.userModel.findById(id);

            if ( !user ) {
                throw new Error('Not found user by id - Repository');
            }

            return user;
        } catch (error) {
            console.log('Down Service in Find method on Repository - ADAPTER');
            throw new Error(error);
        }
   }

}