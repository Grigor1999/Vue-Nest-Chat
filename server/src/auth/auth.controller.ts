// import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Post, Body, Get, Put, Delete, Param, Req, Res, HttpStatus,UseGuards } from '@nestjs/common';
import { json,  Response ,Request} from 'express';
import { AuthService } from './auth.service';

import { validate } from 'class-validator';
import { create } from 'domain';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtAuthGuard } from './jwt-auth.guard';
@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ){

  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() request: Request,) {
    return this.authService.login(request.user);
    // const { email, password } = request.body.user;
    // return request;
  }
  @UseGuards(JwtAuthGuard)
  @Post('check-token')
  check(@Req() request: Request,) {
    return request.user;
  }

}