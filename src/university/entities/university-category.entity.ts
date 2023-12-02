import { Roles } from "src/roles/entities/roles.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { University } from "./university.entity";
import { Category } from "src/categories/entities/category.entity";

@Entity()
export class UniversityCategory {

    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => University, (uni) => uni.id)
    @JoinColumn({
      name: "uni_id",
    })
    uni_id: University | any;

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
