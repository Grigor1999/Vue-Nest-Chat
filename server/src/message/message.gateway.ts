import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Logger } from '@nestjs/common';
  import { Socket, Server } from 'socket.io';
  import { MessageService } from './message.service'
import { Message } from './message.entity';
  @WebSocketGateway()
  export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(private service: MessageService){}


    @WebSocketServer() 
    server: Server;
  
    private logger: Logger = new Logger('MessageGateway');
    
    @SubscribeMessage('msgToServer')
    async handleMessage(client: Socket, payload: any) {
      let message = await this.service.saveMessage(payload)
      this.server.to('room'+payload.roomId).emit(`msgToClient`, message);
    }
  
    afterInit(server: Server) {
      this.logger.log('Init');
    }
  
    handleDisconnect(client: Socket) {
      console.log(client.id)
      this.logger.log(`Client disconnected: ${client.id}`);
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`Client connected: ${client.id}`);
    }
    @SubscribeMessage('joinRoom')
    handleRoomJoin(client: Socket, room: string ) {
      client.join(room);
      client.emit('joinedRoom', {id:client.id,name:room});
    }
    @SubscribeMessage('leaveRoom')
    handleRoomLeave(client: Socket, room: any ) {
      if(room && client.adapter.rooms[room['name']]){
        delete client.adapter.rooms[room['name']].sockets[room['id']];
      }
      client.emit('leftRoom', room);
    }
  }