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
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UserLoginDto } from '../users/dto/user-login.dto';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authRefreshTokenService: AuthRefreshTokenService,
  ) {}

  @SkipJwtAuth()
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: UserLoginDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Request() req: { user: User }) {
    return this.authService.login(req.user);
  }

  // @Throttle({
  //   short: { limit: 1, ttl: 1000 },
  //   long: { limit: 2, ttl: 60000 },
  // })
  @ApiBearerAuth()
  @SkipJwtAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Request() req: { user: User }) {
    console.log('refresh-token user', req.user);

    if (!req.user) {
      throw new UnauthorizedException();
    }

    return await this.authRefreshTokenService.generateRefreshToken(req.user.id);
  }
}
