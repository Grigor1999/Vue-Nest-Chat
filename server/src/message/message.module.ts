import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { MessageController } from './message.controller';
import { Message } from './message.entity';
import { MessageService } from './message.service';
import { Room } from './room.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([Message,Room]),
            
    ],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [MessageService],
  
})
export class MessageModule {}
