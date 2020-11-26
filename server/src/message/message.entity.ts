import { Entity, PrimaryGeneratedColumn, Column, Unique,BeforeInsert, ManyToOne } from "typeorm";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import * as bcrypt from 'bcrypt';
import { Room } from "./room.entity";
import { User } from "src/users/user.entity";

@Entity({ name: 'message' })

export class Message {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  roomId!:number

  @Column()
  userId!: number;

  @Column()
  message!: string
 
  @ManyToOne(() => Room, room => room.message)
    room:Room;
  @ManyToOne(() => User, user => user.message)
    user:User;
}