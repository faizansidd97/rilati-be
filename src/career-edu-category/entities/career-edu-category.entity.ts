import { Career } from "src/career/entities/career.entity";
import { Category } from "src/categories/entities/category.entity";
import { University } from "src/university/entities/university.entity";
import { Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, ManyToMany } from "typeorm";

@Entity()
export class CareerEduCategory {
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
