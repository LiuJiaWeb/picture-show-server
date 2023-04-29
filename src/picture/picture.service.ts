import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TablePicture } from 'src/tableEntity/table_picture.entity';

/**
 * @description: 判断是否为JSON
 * @param {string} str
 */
const isJSON = (str: string) => {
  if (!str) return false;
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str);
      if (typeof obj === 'object' && obj) return true;
      return false;
    } catch (e) {
      return false;
    }
  }
};

const dataHandle = (o_data: object, method: string) => {};

@Injectable()
export class PictureService {
  constructor(@InjectRepository(TablePicture) private readonly table_picture: Repository<TablePicture>) {}

  /**
   * @description: 新增图集
   */
  async addPic(req: any) {
    let data: object = new TablePicture();
    data = { ...data, ...req };

    Object.keys(data).forEach((key) => {
      data[key] = data?.[key] ?? '';
      if (typeof data[key] === 'object') {
        data[key] = JSON.stringify(data[key]);
      }
    });

    // await this.sleep(3000);
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
    };

    Object.keys(data).forEach((key) => {
      data[key] = data?.[key] ?? '';
      if (typeof data[key] === 'object') {
        data[key] = JSON.stringify(data[key]);
      }
    });

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
    let result = await this.table_picture.find();
    // console.log(result);

    result.forEach((it) => {
      Object.keys(it).forEach((key) => {
        const flag = isJSON(it?.[key] || '');
        flag && (it[key] = JSON.parse(it[key]));
      });
    });

    // result = { ...(result?.[0] || {}) };
    // Object.keys(result).forEach((key) => {
    //   const flag = isJSON(result?.[key] || '');
    //   flag && (result[key] = JSON.parse(result[key]));
    // });

    // console.log(result)

    const res = {
      code: 200,
      data: result || [],
      msg: 'ok',
    };
    return res;
  }

  /**
   * @description: 获取图集详情
   */
  async getPicDetail(id: number) {
    let result: object = await this.table_picture.find({
      where: { pic_id: +id || 0 },
    });

    result = { ...(result?.[0] || {}) };

    Object.keys(result).forEach((key) => {
      const flag = isJSON(result?.[key] || '');
      flag && (result[key] = JSON.parse(result[key]));
    });

    return {
      code: 200,
      data: result,
      msg: 'ok',
    };
  }

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
