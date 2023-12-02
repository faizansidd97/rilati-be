import { Roles } from "src/roles/entities/roles.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "src/categories/entities/category.entity";
import { Career } from "./career.entity";

@Entity('career_category')
export class CareerCategory {

    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Career, (career) => career.id)
    @JoinColumn({
      name: "career_id",
    })
    career_id: Career | any;

    @ManyToOne(() => Category, (category) => category.id)
    @JoinColumn({
      name: "category_id",
    })
    category_id: Category | any;

    @CreateDateColumn({ type: "timestamp", nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updated_at: Date;

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deleted_at: Date;

}
