import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'src/application/config';
import { UserSchema } from './user/user.schema';
import { UserDBRepository } from './user/user.repository';
import { BusinessSchema } from './business/business.schema';
import { BusinessDBRepository } from './business/business.repository';
import { ProjectSchema } from './project/project.schema';
import { ProjectDBRepository } from './project/project.repository';
import { CommentarySchema } from './commentary/commentary.schema';
import { CommentaryDBRepository } from './commentary/commentary.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { url } = configService.mongo;

        return { uri: url }
      },
      inject: [config.KEY]
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      },
      {
        name: 'Business',
        schema: BusinessSchema
      },
      {
        name: 'Project',
        schema: ProjectSchema
      },
      {
        name: 'Commentary',
        schema: CommentarySchema
      }
    ])
  ],
  providers: [ UserDBRepository, BusinessDBRepository, ProjectDBRepository, CommentaryDBRepository ],
  exports: [ MongooseModule, UserDBRepository, BusinessDBRepository, ProjectDBRepository, CommentaryDBRepository ]
})
export class DatabaseModule {}
