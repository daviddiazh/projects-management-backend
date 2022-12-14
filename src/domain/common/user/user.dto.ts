import { IsString, IsMongoId, IsEmail, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { Schema } from 'mongoose';
import { IUser } from './user.interface';
import { Role } from './user-role.enum';

export class UserDto implements IUser {

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsNumber()
    @IsOptional()
    phone?: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    role: Role;

    @IsString()
    @IsOptional()
    profilePicture?: string;

    @IsMongoId()
    businessId: Schema.Types.ObjectId

}