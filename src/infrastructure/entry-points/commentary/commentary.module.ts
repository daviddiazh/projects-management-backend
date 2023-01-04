import { Module } from '@nestjs/common';
import { CommentaryService } from './commentary.service';
import { CommentaryController } from './commentary.controller';

@Module({
  controllers: [CommentaryController],
  providers: [CommentaryService]
})
export class CommentaryModule {}
