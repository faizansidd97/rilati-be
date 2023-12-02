
import { IndustyCareerDiagraph } from "src/industy-career-diagraph/entities/industy-career-diagraph.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity()
export class Industry {

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => IndustyCareerDiagraph, (industry) => industry.industry_id)
  industryDiagraph: IndustyCareerDiagraph;

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