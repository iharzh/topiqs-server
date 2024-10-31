import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../users/interfaces/user.interface';
import { SkipJwtAuth } from './utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipJwtAuth()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Request() req: { user: User }) {
    console.log({ user: req.user });
    return this.authService.login(req.user);
  }
}
