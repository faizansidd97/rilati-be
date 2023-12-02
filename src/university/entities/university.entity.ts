import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UniversityCategory } from "./university-category.entity";

@Entity()
export class University {

    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => UniversityCategory, (universityCategory) => universityCategory.uni_id)
    category: UniversityCategory;

    @Column({ type: "varchar", length: 256, nullable: true })
    uni_number: string;

    @Column({ type: "varchar", length: 256, nullable: true })
    name: string;

    @Column({ type: "varchar", length: 256, nullable: true })
    state: string;

    @Column({ type: "varchar", length: 256, nullable: true })
    link: string;

    @Column({ type: "varchar", length: 256, nullable: true })
    address: string;

    @Column({ type: "varchar", length: 256, nullable: true })
    email: string;

    @Column({ type: "varchar", length: 256, nullable: true })
    phone: string;
   
    @Column({ type: "varchar", length: 256, nullable: true })
    rto_number: string;
    
    @Column({ type: "varchar", length: 256, nullable: true })
    teqsa: string;
    
    @Column({ type: "varchar", length: 256, nullable: true })
    cricos: string;

    @Column({ type: "longtext", nullable: true })
    image: string;

    @CreateDateColumn({ type: "timestamp", nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updated_at: Date;

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deleted_at: Date;

}
