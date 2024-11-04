import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../users/interfaces/user.interface';
import { SkipJwtAuth } from './utils';
import { AuthRefreshTokenService } from './authRefreshToken.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authRefreshTokenService: AuthRefreshTokenService,
  ) {}

  @SkipJwtAuth()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Request() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @SkipJwtAuth()
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  refreshToken(@Request() req: { user: User }) {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    return this.authRefreshTokenService.generateRefreshToken(req.user.id);
  }
}
