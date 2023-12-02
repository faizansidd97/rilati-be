import { SubjectCareerDiagraph } from "src/subject-career-diagraph/entities/subject-career-diagraph.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity()
export class Subject {

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => SubjectCareerDiagraph, (subject) => subject.subject_id)
  subjectDiagraph: SubjectCareerDiagraph;

  @Column({ type: "varchar", length: 256, nullable: true })
  name: string;
 
  @Column({ type: "varchar", length: 256, nullable: true })
  code: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

}