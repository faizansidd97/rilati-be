import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from "typeorm";

import { Roles } from "src/roles/entities/roles.entity";
import { UserDetail } from "../../user-details/entities/user-detail.entity";
import { FavoriteSubject } from "src/favorite-subjects/entities/favorite-subject.entity";
import { IntrestedIndustry } from "src/intrested-industries/entities/intrested-industry.entity";

@Entity()
export class User {
  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserDetail, (detail) => detail.user_id)
  detail: UserDetail;

  @OneToMany(() => FavoriteSubject, (subject) => subject.user_id)
  subject: FavoriteSubject;

  @OneToMany(() => IntrestedIndustry, (industry) => industry.user_id)
  industry: IntrestedIndustry;

  @ManyToOne(() => Roles, (Role) => Role.id)
  @JoinColumn({
    name: "role_id",
  })
  role_id: Roles | any;

  @Column({ type: "varchar", length: 100, default: 1 })
  status: number;

  @Column({ type: "varchar", length: 100, unique: false, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  name: string;
  
  @Column({ type: "varchar", length: 100, nullable: true })
  first_name: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  last_name: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  password: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  register_hash: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  remember_token: string;

  @Column({ type: "varchar", length: 100, default: 1 })
  notification: number;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date;
}
