import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';
import { TablePicture } from 'src/tableEntity/table_picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TablePicture])],
  controllers: [PictureController],
  providers: [PictureService],
})
export class PictureModule {}
