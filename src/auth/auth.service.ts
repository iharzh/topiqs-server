import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/interfaces/user.interface';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);

    console.log({ user });

    if (!user) {
      return null;
    }

    const isCorrectPassword = await compare(pass, user.password);

    if (isCorrectPassword) {
      const { password: _, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
