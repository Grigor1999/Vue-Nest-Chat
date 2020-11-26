import { Entity, PrimaryGeneratedColumn, Column, Unique,BeforeInsert, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import * as bcrypt from 'bcrypt';
import { Message } from "./message.entity";
@Entity({ name: 'room' })

export class Room {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string
  
  @OneToMany(type => Message, message => message.room)
  message: Message[];
}