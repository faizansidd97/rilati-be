import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CareerCategory } from "./career-category.entity";
import { CareerEduCategory } from "src/career-edu-category/entities/career-edu-category.entity";
import { University } from "src/university/entities/university.entity";
import { UniversityCategory } from "src/university/entities/university-category.entity";
import { CareerLike } from "src/career-likes/entities/career-like.entity";

@Entity()
export class Career {
  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CareerCategory, (career) => career.career_id)
  category: CareerCategory;
  @ManyToOne(() => CareerCategory, (career) => career.category_id)
  careerBycategory: CareerCategory;

  @OneToMany(() => CareerEduCategory, (career) => career.career_id)
  educationCategory: CareerEduCategory | any;

  @OneToMany(() => CareerLike, (career) => career.career_id)
  careerLike: CareerLike | any;

  @ManyToMany((type) => UniversityCategory)
  @JoinTable()
  universities: UniversityCategory[];

  @Column({ type: "varchar", length: 256, nullable: true })
  title: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  career_number: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  average_salary: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  average_salary_aud: string;

  @Column({ type: "longtext", nullable: true })
  job_description: string;

  @Column({ type: "longtext", nullable: true })
  youtube: string;

  @Column({ type: "longtext", nullable: true })
  career_category: string;

  @Column({ type: "longtext", nullable: true })
  student_intrest: string;

  @Column({ type: "longtext", nullable: true })
  skills_transferable: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  years_needed: string;

  @Column({ type: "longtext", nullable: true })
  description_study: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  admission_rank: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  average_gpa: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  internship_needed: string;

  @Column({ type: "integer", nullable: true })
  cost_course: number;

  @Column({ type: "varchar", length: 256, nullable: true })
  precision_work: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  job_satisfaction: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  job_stress: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  work_hours: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  work_life_balance: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  scope_of_skill: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  autonomy: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  repetitive_tedious: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  physical_stress: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  mental_stress: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  team_reliance: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  status_in_company: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  risk_to_health: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  risk_to_life: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  people_interaction: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  job_help_people: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  job_help_environment: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  potential: string;

  @Column({ type: "longtext", nullable: true })
  study_for_australia: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  fastest_growing: string;

  @Column({ type: "longtext", nullable: true })
  tags: string;

  @Column({ type: "longtext", nullable: true })
  image: string;

  @Column({ type: "integer", nullable: true, default: 0 })
  view_count: number;

  @Column({ type: "integer", nullable: true, default: 0 })
  share_count: number;

  @Column({ type: "integer", nullable: true, default: 0 })
  like_count: number;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleted_at: Date;
}
