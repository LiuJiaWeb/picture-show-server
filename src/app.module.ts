import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PictureModule } from './picture/picture.module';

const ApiModule = [PictureModule];

const OrmConfig: object = {
  type: 'mongodb', // 数据库类型
  url: 'mongodb://localhost:27017/', // 数据库的连接地址host
  database: 'picture_show_database', // 连接的数据库名称
  retryDelay: 500, // 重试连接数据库间隔
  retryAttempts: 10, // 充实次数
  synchronize: true, // 是否将实体同步到数据库
  autoLoadEntities: true, // 自动加载实体配置，forFeature()注册的每个实体都自己动加载
  cache: {
    duration: 3 * 1000, // 缓存时间
  },
};

@Module({
  imports: [...ApiModule, TypeOrmModule.forRoot(OrmConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
