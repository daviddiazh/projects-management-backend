import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';

@Controller('commentary')
export class CommentaryController {
  constructor(private readonly commentaryService: CommentaryService) {}

  @Post()
  create(@Body() createCommentaryDto: CreateCommentaryDto) {
    return this.commentaryService.create(createCommentaryDto);
  }

  @Get()
  findAll() {
    return this.commentaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentaryDto: UpdateCommentaryDto) {
    return this.commentaryService.update(+id, updateCommentaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentaryService.remove(+id);
  }
}
