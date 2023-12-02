
import { CareerCategory } from "src/career/entities/career-category.entity";
import { IndustyCareerDiagraph } from "src/industy-career-diagraph/entities/industy-career-diagraph.entity";
import { SubjectCareerDiagraph } from "src/subject-career-diagraph/entities/subject-career-diagraph.entity";
import { CategoryType } from "src/utilities/constant";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {

    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 256, nullable: true })
    name: string;

    @OneToMany(() => CareerCategory, (categry) => categry.category_id)
    relatedCareer: CareerCategory;
    
    // @OneToMany(() => SubjectCareerDiagraph, (subject) => subject.career_category_id)
    // subjectDiagraph: SubjectCareerDiagraph;

    // @OneToMany(() => IndustyCareerDiagraph, (industry) => industry.career_category_id)
    // industryDiagraph: IndustyCareerDiagraph;

    @Column({ type: "enum", enum: CategoryType, default: CategoryType.CAREER })
    type: CategoryType;

    @CreateDateColumn({ type: "timestamp", nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updated_at: Date;

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deleted_at: Date;

}
