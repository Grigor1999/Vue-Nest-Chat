
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { getConnection } from "typeorm";
import { EntityManager } from "typeorm";
import { Room } from './room.entity';

@Injectable()
export class MessageService {
  constructor(
    private entityManager: EntityManager,
    @InjectRepository(Room) private room: Repository<Room>,
    @InjectRepository(Message) private message: Repository<Message>
  ) { }

  async findAll(): Promise<Room[]> {
    return this.room.find();
  }
  async getMessages(id): Promise<Message[]> {
    // return this.message.find({ relations: ["user"] })
    return this.message.find({
      where: [
        { roomId: id },
      ],
      relations: ["user"]
    });
  }
  async saveMessage(mess:Message) {
    const result = await this.message.save(mess);
    return result;
}
}
