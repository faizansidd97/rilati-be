import { Career } from "src/career/entities/career.entity";
import { User } from "src/users/entities/user.entity";
import { CategoryType } from "src/utilities/constant";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CareerLike {
    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({
        name: 'user_id',
    })
    user_id: User | number;
    
    @ManyToOne(() => Career, (career) => career.id)
    @JoinColumn({
        name: 'career_id',
    })
    career_id: Career | number;

    @CreateDateColumn({ type: "timestamp", nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", nullable: true })
    updated_at: Date;

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deleted_at: Date;

}
