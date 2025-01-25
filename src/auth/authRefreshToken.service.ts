import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/interfaces/user.interface';
import { RefreshToken as RefreshTokenEntity } from './db/refreshToken.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthRefreshTokenService {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private authRefreshTokenRepository: Repository<RefreshTokenEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateRefreshToken(
    authUserId: string,
    currentRefreshToken?: string,
    currentRefreshTokenExpiresAt?: Date,
  ) {
    const newRefreshToken = this.jwtService.sign(
      { sub: authUserId },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '30d' },
    );

    if (currentRefreshToken && currentRefreshTokenExpiresAt) {
      if (
        await this.isRefreshTokenBlackListed(currentRefreshToken, authUserId)
      ) {
        throw new UnauthorizedException('Invalid refresh token.');
      }

      await this.authRefreshTokenRepository.insert({
        refreshToken: currentRefreshToken,
        expiresAt: currentRefreshTokenExpiresAt,
        userId: authUserId,
      });
    }

    return newRefreshToken;
  }

  private isRefreshTokenBlackListed(refreshToken: string, userId: string) {
    return this.authRefreshTokenRepository.existsBy({ refreshToken, userId });
  }

  async generateTokenPair(
    user: User,
    currentRefreshToken?: string,
    currentRefreshTokenExpiresAt?: Date,
  ) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
      }),
      refresh_token: await this.generateRefreshToken(
        user.id,
        currentRefreshToken,
        currentRefreshTokenExpiresAt,
      ),
    };
  }

  // @Cron(CronExpression.EVERY_DAY_AT_6AM)
  // async clearExpiredRefreshTokens() {
  //   await this.authRefreshTokenRepository.delete({
  //     expiresAt: LessThanOrEqual(new Date()),
  //   });
  // }
}
