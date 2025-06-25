import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Language } from './language';

@Entity()
export class Font {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  filePath!: string;

  @Column({ type: 'int', nullable: true, default: 16 })
  fontSize!: number;

  @ManyToMany(() => Language)
  @JoinTable()
  languages!: Language[];

  @CreateDateColumn()
  createdAt!: Date;
}

export default Font; 