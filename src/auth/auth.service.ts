import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/interfaces/user.interface';
import { compare } from 'bcrypt';
import { AuthRefreshTokenService } from './authRefreshToken.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private authRefreshTokenService: AuthRefreshTokenService,
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
    return this.authRefreshTokenService.generateTokenPair(user);
  }
}
