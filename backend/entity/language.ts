import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name!: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  code!: string;
}
export default Language;