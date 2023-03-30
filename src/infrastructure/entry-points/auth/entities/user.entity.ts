import { Schema } from 'mongoose';
import { IUser } from '../../../../domain/common/user/user.interface';
import { Role } from 'src/domain/common/user/user-role.enum';

export class User implements IUser {
  _id?: Schema.Types.ObjectId;
  fullName: string;
  phone?: number;
  email: string;
  password?: string;
  role: Role;
  businessId: Schema.Types.ObjectId;
}
