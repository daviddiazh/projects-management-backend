import { IsString, IsNotEmpty, } from 'class-validator';
import { IBusiness } from './business.interface';

export class BusinessDto implements IBusiness {

    @IsString()
    @IsNotEmpty()
    businessName: string;

}