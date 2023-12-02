import { RoleType } from "src/utilities/constant";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity()
export class Roles {
  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  slug: string;

  @Column({ type: "enum", enum: RoleType, default: RoleType.USER })
  type: RoleType;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date;
}
