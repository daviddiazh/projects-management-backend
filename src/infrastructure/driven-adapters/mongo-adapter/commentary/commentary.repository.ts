import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentaryDto } from 'src/infrastructure/entry-points/commentary/dto/create-commentary.dto';
import { UpdateCommentaryDto } from 'src/infrastructure/entry-points/commentary/dto/update-commentary.dto';
import { Commentary } from 'src/infrastructure/entry-points/commentary/entities/commentary.entity';
import { QueryParamsDto } from 'src/infrastructure/entry-points/common/dto/query-params.dto';
import { ICommentaryDBRepository } from '../../../entry-points/commentary/commentary.repository.types';
import { CommentarySpec } from './commentary.schema';

export class CommentaryDBRepository implements ICommentaryDBRepository  {

    constructor(
        @InjectModel('Commentary') private commentaryModel: Model<CommentarySpec>,
    ){}

    /**
     * Create a new Commentary
     * @param payload
     * @return a Promise of Commentary
    */
    create(payload: CreateCommentaryDto): Promise<Commentary> {
        throw new Error('Method not implemented.');
    }

    /**
     * Find All Commentaries
     * @return a Promise of Commentaries
    */
    findAll(params: QueryParamsDto): Promise<Commentary> {
        throw new Error('Method not implemented.');
    }

    /**
     * Update Commentary
     * @param payload
     * @return a Commentary of Project
    */
    update(payload: UpdateCommentaryDto): Promise<Commentary> {
        throw new Error('Method not implemented.');
    }

    /**
     * Remove Commentary
     * @param projectId
     * @return a Promise of Commentary
    */
    remove(commentaryId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

}