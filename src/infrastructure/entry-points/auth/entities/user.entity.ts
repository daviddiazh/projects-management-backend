import { Schema } from 'mongoose';
import { IUser } from '../../../../domain/common/user/user.interface';
import { Role } from 'src/domain/common/user/user-role.enum';

export class User implements IUser{
    name: string;
    lastName: string;
    phone?: string;
    email: string;
    password: string;
    role: Role;
    businessId: Schema.Types.ObjectId;
    // businessName: string
}
