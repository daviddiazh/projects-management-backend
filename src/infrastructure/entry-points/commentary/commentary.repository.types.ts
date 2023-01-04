import { Commentary } from './entities/commentary.entity';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { QueryParamsDto } from '../common/dto/query-params.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';


export abstract class ICommentaryDBRepository {
    abstract create(payload: CreateCommentaryDto): Promise<Commentary>;
    abstract findAll(params: QueryParamsDto): Promise<Commentary>;
    abstract update(payload: UpdateCommentaryDto): Promise<Commentary>;
    abstract remove(commentaryId: string): Promise<void>;
}
