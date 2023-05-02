import { Controller, Get, Post, Request, Query, Body } from '@nestjs/common';
import { PictureService } from './picture.service';

@Controller('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Post('add-pic')
  addPic(@Body() body): any {
    return this.pictureService.addPic(body);
  }

  @Post('del-pic')
  delPic(@Body() body): any {
    return this.pictureService.delPic(body);
  }

  @Post('edit-pic')
  editPic(@Body() body): any {
    return this.pictureService.editPic(body);
  }

  @Get('pic-list')
  getPicList(): any {
    return this.pictureService.getPicList();
  }

  @Get('pic-detail')
  getPicDetail(@Query() query): any {
    return this.pictureService.getPicDetail(query);
  }
}
