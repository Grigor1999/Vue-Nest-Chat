import { Controller, Post, Body, Get, Put, Delete, Param, Req, Res, HttpStatus } from '@nestjs/common';
import { json, Request, Response } from 'express';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { validate } from 'class-validator';
import { create } from 'domain';
import { MailerService } from '@nestjs-modules/mailer';

let crypto = require('crypto');
@Controller('users')
export class UsersController {

    constructor(private service: UsersService,private readonly mailerService: MailerService) { 

    }

    // @Get(':id')
    // get(@Param() params) {
    //     return this.service.getUser(params.id);
    // }

    // @Post()
    // create(@Body() user: User) {
    //     return this.service.createUser(user);
    // }
    @Post('/registration')
    async register(@Req() request: Request, @Res() res: Response) {
        const { fullname, email, password } = request.body.user;
        const post = new User({ fullname, email, password });
        // res.status(HttpStatus.OK).json(user);

        const user: any = await this.service.getUserByEmail(post.email)
        validate(post, { validationError: { target: false } }).then((errors: any) => {
            // errors is an array of validation errors
            if (request.body.user.password != request.body.user.confirm_pass) {
                errors.push({constraints: { pass: "Password and confirm password does not match" }})
            }
            if (user.length > 0) {
                errors.push({constraints:{ email: 'email already exists' }})
            }
            if (errors.length > 0) {
                res.send(errors)
            }
            else {
                let saveUserPromise = new Promise((resolve, reject) => {
                    let result: any = this.service.createUser(post)
                      resolve(result); 
                  });
                  saveUserPromise.then((success) => {
                      let hashId: any = crypto.createHash('md5').update(success['id'].toString()).digest("hex");
                    //   console.log(hashId);
                      this
      .mailerService
      .sendMail({
        to: 'test@nestjs.com', 
        from: 'noreply@nestjs.com', 
        subject: 'Testing Nest MailerModule ✔',
        text: `<a href='${process.env.BASE_URL+'/activate/'+ hashId}'>activate account </a>`, 
        html: `<a href='${process.env.BASE_URL+'/activate/'+ hashId}'>activate account </a>`,  
      })
      .then(() => {
      })
      .catch((x) => {
        console.log(x)

      });

                  });

                res.send('success')
            }
        });
    }
    
    @Put('/activateUser')
    activateUser(@Req() request: Request){
        return this.service.activateUser(request.body.id)
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
}