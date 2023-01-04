import { Injectable } from '@nestjs/common';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { CommentaryDBRepository } from '../../driven-adapters/mongo-adapter/commentary/commentary.repository';
import { QueryParamsDto } from '../common/dto/query-params.dto';
import { ICommentaryDBRepository } from './commentary.repository.types';

@Injectable()
export class CommentaryService implements ICommentaryDBRepository {

  constructor(
    private readonly commentaryRepository: CommentaryDBRepository,
  ){}

  create(createCommentaryDto: CreateCommentaryDto) {
    return this.commentaryRepository.create(createCommentaryDto);
  }

  findAllByProject(projectId: string, params: QueryParamsDto) {
    return this.commentaryRepository.findAllByProject(projectId, params);
  }

  update(commentaryId: string, updateCommentaryDto: UpdateCommentaryDto) {
    return this.commentaryRepository.update(commentaryId, updateCommentaryDto);
  }

  remove(commentaryId: string) {
    return this.commentaryRepository.remove(commentaryId);
  }
}
