import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class InspirationalPerson {

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 256, nullable: true })
    name: string;
    
    @Column({ type: "varchar", length: 500, nullable: true })
    inspirational_id: string;    
    
    @Column({ type: "longtext", nullable: true })
    description: string;

    @Column({ type: "longtext", nullable: true })
    occupation: string;
    
    @Column({ type: "longtext", nullable: true })
    education: string;
 
    @Column({ type: "longtext", nullable: true })
    career_path: string;

    @Column({ type: "varchar", length: 256, nullable: true })
    image: string;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date;

    
}
