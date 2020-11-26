import { Entity, PrimaryGeneratedColumn, Column, Unique,BeforeInsert, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import * as bcrypt from 'bcrypt';
import { Message } from "src/message/message.entity";

@Entity({ name: 'user' })
@Unique(['email'])
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Length(2, 30, { message: 'The name must be at least 2 but not longer than 30 characters' })
  @IsNotEmpty({ message: 'The name is required' })
  fullname!: string;

  
  @Column()
  @Length(6, 30, { message: 'The password must be at least 6 but not longer than 30 characters' })
  @IsNotEmpty({ message: 'The password is required' })
  password!: string;

  @Column({ name: 'email',unique: true })
//   @UniqueOnDatabase(Customer)
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  email!: string;

  @Column() 
  isActive:boolean;

  @OneToMany(type => Message, message => message.user)
  message: Message[];

  @BeforeInsert()
   async hashPassword() {

      this.password = await bcrypt.hash(this.password, Number(process.env.HASH_SALT));
   }
  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }

}