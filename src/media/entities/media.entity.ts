import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity } from 'typeorm';

@Entity()
export class Media {

    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 256, nullable: true })
    file_name: string;

    @Column({ type: "varchar", length: 1000, nullable: true })
    file_url: string;
  
    @CreateDateColumn({ type: "timestamp", nullable: true })
    created_at: Date;
  
    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updated_at: Date;
  
    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deleted_at: Date;
}
