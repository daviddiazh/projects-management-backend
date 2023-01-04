import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { QueryParamsDto } from '../common/dto/query-params.dto';

@Controller('commentary')
export class CommentaryController {

  constructor(
    private readonly commentaryService: CommentaryService
  ){}

  @Post('create')
  create(@Body() createCommentaryDto: CreateCommentaryDto) {
    return this.commentaryService.create(createCommentaryDto);
  }

  @Get('findAllByProject/:projectId')
  findAllByProject(@Param('projectId') projectId: string, @Query() params: QueryParamsDto) {
    return this.commentaryService.findAllByProject(projectId, params);
  }

  @Patch('update/:commentaryId')
  update(@Param('commentaryId') commentaryId: string, @Body() updateCommentaryDto: UpdateCommentaryDto) {
    return this.commentaryService.update(commentaryId, updateCommentaryDto);
  }

  @Delete('remove/:commentaryId')
  remove(@Param('commentaryId') commentaryId: string) {
    return this.commentaryService.remove(commentaryId);
  }

}
