import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthRefreshTokenService } from './authRefreshToken.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken as RefreshTokenEntity } from './db/refreshToken.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '300s' },
    }),
    TypeOrmModule.forFeature([RefreshTokenEntity]),
  ],
  providers: [
    AuthService,
    AuthRefreshTokenService,
    LocalStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [AuthService, AuthRefreshTokenService],
})
export class AuthModule {}
