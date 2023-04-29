import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class TablePicture {
  @PrimaryGeneratedColumn({ comment: '图片ID(主键)', unsigned: true })
  pic_id: number;

  @Column({ comment: '用户ID', unsigned: true, default: 0 })
  user_id: number;

  @Column({ comment: '图集标题', default: '' })
  title: string;

  @Column({ comment: '图集描述', length: 500, default: '' })
  desc: string;

  @Column({ comment: '图集列表', type: 'text' })
  imgs: string;

  @Column({ comment: '图集封面', default: '' })
  thumb: string;

  @Column({ comment: '权重值(值越大则越优先展示)', unsigned: true, default: 0 })
  sort: number;

  @CreateDateColumn({ comment: '创建时间', type: 'timestamp' })
  create_time: Date;

  // @Column({ comment: '创建时间', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  // create_time: string;
}
