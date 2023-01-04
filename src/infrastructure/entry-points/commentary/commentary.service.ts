import { Injectable } from '@nestjs/common';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { CommentaryDBRepository } from '../../driven-adapters/mongo-adapter/commentary/commentary.repository';
import { QueryParamsDto } from '../common/dto/query-params.dto';

@Injectable()
export class CommentaryService {

  constructor(
    private readonly commentaryRepository: CommentaryDBRepository,
  ){}

  create(createCommentaryDto: CreateCommentaryDto) {
    return this.commentaryRepository.create(createCommentaryDto);
  }

  findAllByProject(projectId: string, params: QueryParamsDto) {
    return this.commentaryRepository.findAllByProject(projectId, params);
  }

  findOne(id: number) {
    return `This action returns a #${id} commentary`;
  }

  update(id: number, updateCommentaryDto: UpdateCommentaryDto) {
    return `This action updates a #${id} commentary`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentary`;
  }
}
