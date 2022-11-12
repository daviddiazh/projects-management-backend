import { UserDto } from '../../../domain/common/user/user.dto';
import { User } from './entities/user.entity';

export abstract class IUserDBRepository {
    abstract create(payload: UserDto): Promise<User>;
    abstract findById(id: string): Promise<User>
}