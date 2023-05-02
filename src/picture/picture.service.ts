import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TablePicture } from 'src/tableEntity/table_picture.entity';
import { curTime, dataHandle } from 'src/utils/utils';

@Injectable()
export class PictureService {
  constructor(@InjectRepository(TablePicture) private readonly table_picture: Repository<TablePicture>) {}

  /**
   * @description: 新增图集
   */
  async addPic(req: any) {
    let data: object = new TablePicture();
    data = { ...data, ...req, create_time: curTime() };
    data = dataHandle(data, 'set');
    await this.table_picture.save(data);
    return {
      code: 200,
      data: {},
      msg: '新增成功',
    };
  }

  /**
   * @description: 删除图集
   * @param {any} req
   */
  async delPic(req: any) {
    const { id: pic_id } = req || {};
    await this.table_picture.delete(+pic_id);
    return {
      code: 200,
      data: {},
      msg: 'delete success',
    };
  }

  /**
   * @description: 修改编辑图集
   * @param {any} req
   */
  async editPic(req: any) {
    const { id: pic_id, title, desc, imgs, thumb, sort } = req || {};

    let data: object = new TablePicture();
    data = {
      ...data,
      title: title || '',
      desc: desc || '',
      imgs: imgs || [],
      thumb: thumb || '',
      sort: +sort || 0,
      update_time: curTime(),
    };

    data = dataHandle(data, 'set');

    await this.table_picture.update(+pic_id, data);

    return {
      code: 200,
      data: {},
      msg: 'edit success',
    };
  }

  /**
   * @description: 获取图集列表
   */
  async getPicList() {
    let result = await this.table_picture.find({ where: { is_display: 1 } });
    result = dataHandle(result);
    return { code: 200, data: result || [], msg: 'ok' };
  }

  /**
   * @description: 获取图集详情
   */
  async getPicDetail(id: number) {
    let result: object = await this.table_picture.find({ where: { pic_id: +id || 0, is_display: 1 } });
    result = { ...(result?.[0] || {}) };
    result = dataHandle(result);
    return { code: 200, data: result || {}, msg: 'ok' };
  }
}
