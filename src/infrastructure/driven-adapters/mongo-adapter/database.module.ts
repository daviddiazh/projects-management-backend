import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'src/application/config';
import { UserSchema } from './user/user.schema';
import { UserDBRepository } from './user/user.repository';
import { BusinessSchema } from './business/business.schema';
import { BusinessDBRepository } from './business/business.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { url } = configService.mongo;
        return { url }
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
    ])
  ],
  providers: [UserDBRepository, BusinessDBRepository],
  exports: [MongooseModule, UserDBRepository, BusinessDBRepository, ]
})
export class DatabaseModule {}
