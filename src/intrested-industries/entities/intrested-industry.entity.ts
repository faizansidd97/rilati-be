import { Industry } from "src/industries/entities/industry.entity";
import { Subject } from "src/subjects/entities/subject.entity";
import { StartWorkingEnum, TasteEnum } from "src/users/auth/auth-role.enum";
import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class IntrestedIndustry {

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'user_id',
  })
  user_id: User | number | any;
  
  @ManyToOne(() => Industry, (industry) => industry.id)
  @JoinColumn({
    name: 'industry_id',
  })
  industry_id: Industry | number | any;

  @Column({
    type: "enum",
    enum: TasteEnum,
    default: TasteEnum.PREFERRED,
  })
  type: TasteEnum;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

}