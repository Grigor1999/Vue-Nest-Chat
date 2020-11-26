import { Controller, Post, Body, Get, Put, Delete, Param, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { json, Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {

    constructor(private service: MessageService){}

    @UseGuards(JwtAuthGuard)
    @Post('/getRoomList')
    async getRoomList(@Res() res: Response){
      res.send(await this.service.findAll())
    }
    @Post('/getMessageList')
    async getMessageList(@Res() res: Response,@Req() req:Request){
      res.send(await this.service.getMessages(req.body.room_id))
    }
}
