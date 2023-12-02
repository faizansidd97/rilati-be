import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Roles } from 'src/roles/entities/roles.entity';
import { User } from 'src/users/entities/user.entity';
import { UserGuardianEnum } from "src/users/dto/update-user.dto";
import { EducationStageEnum, MyAtarEnum, PersonaTraitEnum, SkillsConfident, StartWorkingEnum } from "src/users/auth/auth-role.enum";

@Entity()
export class  UserDetail {

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'user_id',
  })
  user_id: User | number

  @Column({ type: "varchar", length: 256, nullable: true })
  avatar: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  phone: string;

  @Column({ type: "varchar", length: 1000, nullable: true })
  address: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  city: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  state: string;

  @Column({ type: "varchar", length: 256, nullable: true })
  country: string;

  @Column({
    type: "enum",
    enum: EducationStageEnum,
    default: EducationStageEnum.HIGH_SCHOOL,
  })
  education_stage: EducationStageEnum;
 
  // @Column({
  //   type: "enum",
  //   enum: SkillsConfident,
  //   default: SkillsConfident.COMMUNICATION,
  // })
  // confident_skills: SkillsConfident;
  
  @Column({ type: 'longtext', default: null }) 
  confident_skills: string;
  
  @Column({
    type: "enum",
    enum: PersonaTraitEnum,
    default: PersonaTraitEnum.INTROVERT,
  })
  personal_trait: PersonaTraitEnum;
  
  @Column({
    type: "enum",
    enum: MyAtarEnum,
    default: MyAtarEnum.BETWEEN_0_10,
  })
  my_atar: MyAtarEnum;
  
  @Column({
    type: "enum",
    enum: StartWorkingEnum,
    default: StartWorkingEnum.YES,
  })
  start_working: StartWorkingEnum;
  
  // @Column({ type: "varchar", length: 256, nullable: true })
  // favorite_subject: string;
  
  // @Column({ type: "varchar", length: 256, nullable: true })
  // least_favorite_subject: string;
  
  // @Column({ type: "varchar", length: 256, nullable: true })
  // industries_interest: string;
  
  // @Column({ type: "varchar", length: 256, nullable: true })
  // least_industries_interest: string;
  
  @Column({ type: 'boolean', default: false }) 
  newsletter: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;
  
}
