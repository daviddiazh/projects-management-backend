import { Schema } from "mongoose";
import { Role } from './user-role.enum';

export interface IUser {
    name: string;
    lastName: string;
    phone?: string;
    email: string;
    password: string;
    role: Role;
    profilePicture?: string;
    businessId: Schema.Types.ObjectId
}