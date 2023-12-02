import { Career } from "src/career/entities/career.entity";
import { Category } from "src/categories/entities/category.entity";
import { FavoriteSubject } from "src/favorite-subjects/entities/favorite-subject.entity";
import { Subject } from "src/subjects/entities/subject.entity";
import { Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class SubjectCareerDiagraph {

    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Subject, (subject) => subject.id)
    @JoinColumn({
      name: "subject_id",
    })
    subject_id: Subject | any;

    @ManyToOne(() => Category, (category) => category.id)
    @JoinColumn({
      name: "career_category_id",
    })
    career_category_id: Category | any;
   
    @CreateDateColumn({ type: "timestamp", nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updated_at: Date;

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deleted_at: Date;
}
