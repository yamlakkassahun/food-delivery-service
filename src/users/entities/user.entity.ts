import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 70, nullable: false })
  name: string;

  @Column({ name: 'email', unique: true, length: 70, nullable: false })
  email: string;

  @Column({ name: 'phoneNumber', unique: true, length: 70, nullable: false })
  phoneNumber: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'role', nullable: true })
  role: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
