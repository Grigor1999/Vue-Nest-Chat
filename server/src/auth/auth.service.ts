import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
      ) {}

    async validateUser(email: string, pass: string): Promise<any> {
      const user = await this.usersService.getUserByEmail(email);
      // console.log(process.env.secretKey)
      if (user.length && await bcrypt.compare(pass, user[0].password) && user[0].isActive==true) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
    async login(user: any) {
      const payload = { username: user[0].email, sub: user[0].id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
}
