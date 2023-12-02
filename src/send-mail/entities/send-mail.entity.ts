import { Career } from "src/career/entities/career.entity";
import { Category } from "src/categories/entities/category.entity";
import { Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity } from "typeorm";

export const FlagEnum = {
    UNIVERSITY: 'UNIVERSITY',
    CAREER: 'CAREER',
    SUGGESTION: 'SUGGESTION',
    OTHER: 'OTHER',
  } as const;

@Entity()
export class SendMail {

    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar",length: 256, nullable: true })
    email: string;

    @Column({ type: "longtext", nullable: true })
    description: string;

    @Column({ type: 'enum', enum: FlagEnum, nullable: true })
    flag: typeof FlagEnum[keyof typeof FlagEnum];
   
    @CreateDateColumn({ type: "timestamp", nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updated_at: Date;

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deleted_at: Date;
}
