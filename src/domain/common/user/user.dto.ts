import { Schema } from 'mongoose';
import { IUser } from './user.interface';
import { Role } from './user-role.enum';

export class UserDto implements IUser {
    name: string;
    lastName: string;
    phone?: string;
    email: string;
    password: string;
    role: Role;
    businessId: Schema.Types.ObjectId
}