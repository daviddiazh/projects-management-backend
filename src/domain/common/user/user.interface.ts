import { Schema } from 'mongoose';
import { Role } from './user-role.enum';

export interface IUser {
    _id?: Schema.Types.ObjectId;
    fullName: string;
    phone?: number;
    email: string;
    password?: string;
    role: Role;
    profilePicture?: string;
    businessId: Schema.Types.ObjectId
}