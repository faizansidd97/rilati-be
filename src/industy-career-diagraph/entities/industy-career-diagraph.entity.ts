import { Category } from "src/categories/entities/category.entity";
import { FavoriteSubject } from "src/favorite-subjects/entities/favorite-subject.entity";
import { Industry } from "src/industries/entities/industry.entity";
import { IntrestedIndustry } from "src/intrested-industries/entities/intrested-industry.entity";
import { Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class IndustyCareerDiagraph {
    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Industry, (industry) => industry.id)
    @JoinColumn({
      name: "industry_id",
    })
    industry_id: Industry | string |  any;

    @ManyToOne(() => Category, (category) => category.id)
    @JoinColumn({
      name: "career_category_id",
    })
    career_category_id: Category | string | any;
   
    @CreateDateColumn({ type: "timestamp", nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updated_at: Date;

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deleted_at: Date;
}
