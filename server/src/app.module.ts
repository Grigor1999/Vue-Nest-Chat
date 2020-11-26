import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import { MessageModule } from './message/message.module';
import { MessageGateway } from './message/message.gateway';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(), 
    UsersModule,
    MailerModule.forRoot({
      transport: {
        host: "smtp.mailtrap.io",
        port: 25,
        // ignoreTLS: true,
        // secure: false,
        auth: {

          user: process.env.MAILDEV_INCOMING_USER,
          pass: process.env.MAILDEV_INCOMING_PASS,
        },
      },
      defaults: {
        from:'"nest-modules" <modules@nestjs.com>',
      },
      // template: {
      //   dir: __dirname + '/templates',
      //   adapter: new HandlebarsAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
    AuthModule,
    MessageModule,
  ],
  providers: [AppService, MessageGateway],
  controllers: [MessageController],
})
export class AppModule {}
