import { nanoid } from 'nanoid';
import { UserEntity } from 'src/user/entities/user.entity';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from 'src/common/jwt/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../../user/services/user.service';
import { EmailVerificationEntity } from '../entities/email-verification.entity';
import { Repository } from 'typeorm';
import { LoginResponse, SignupRequest } from '../dto';
import { create } from 'domain';
export class AuthService {
  constructor(
    @InjectRepository(EmailVerificationEntity)
    private readonly emailVerificationRepository: Repository<EmailVerificationEntity>,
    private readonly userService: UserService,
  ) {}
  async signupAndLogin(
    signupRequest: SignupRequest,
    ip: string,
    deviceId: string,
  ): Promise<LoginResponse> {
    const createdUser = await this.signupAndLogin(signupRequest, ip);
    return this.getLoginResponse(createdUser, deviceId, ip);
  }
  async signup(signupRequest: SignupRequest, ip: string): Promise<UserEntity> {
    const createdUser = await this.userService.createUser(signupRequest);
    const token = nanoid();
    const emailVerification = new EmailVerificationEntity();
    emailVerification.token = token;
    emailVerification.userId = createdUser.id;
    try {
    } catch (err) {}
    try {
      return createdUser;
    } catch (err) {
      Logger.error(err);
    }
  }
  async validateUser(payload: JwtPayload): Promise<UserEntity> {
    const userEntity = await this.userService.getUserEntityById(payload.id);
    if (
      userEntity &&
      userEntity.id === payload.id &&
      userEntity.email === payload.email &&
      userEntity.username === payload.username
    ) {
      return userEntity;
    }
    throw new UnauthorizedException();
  }
  async getLoginResponse(
    userEntity: UserEntity,
    deviceId: string,
    ip?: string,
  ): Promise<LoginResponse> {
    const payload: JwtPayload = {
      id: userEntity.id,
      username: userEntity.username,
      email: userEntity.email,
    };
    const refreshToken = await this.generateRefreshToken(
      userEntity.id,
      deviceId,
    );
    const accessToken = await this.jwtService.signAsync(payload);
    return new LoginResponse(accessToken, refreshToken);
  }
}
