import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LingosSystemError } from '../common/exceptions/lingo-system.error';
import { UsersService } from '../features/users/users.service';
import { User } from '../database/entities/user.entity';
import { TokenUserDTO } from '../models/users/token-user.dto';
import { LoginUserDTO } from '../models/users/login-user.dto';

@Injectable()
export class AuthService {
  private readonly blacklist: string[] = [];

  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  public async login(user: LoginUserDTO): Promise<any> {
    const foundUser: User = await this.usersService.findUser(user);

    if (!foundUser) {
      throw new LingosSystemError(
        'User with such username/email does not exist!',
        400,
      );
    }

    const validPassword = await this.usersService.validateUserPassword(
      user.password,
      foundUser,
    );
    if (!validPassword) {
      throw new LingosSystemError('Invalid password!', 400);
    }

    const payload: TokenUserDTO = {
      id: foundUser.id,
      username: foundUser.username,
      role: foundUser.role.roleName,
      preferredLanguage: foundUser.preferredLanguage.language,
    };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  public blacklistToken(token: string): void {
    this.blacklist.push(token);
  }

  public isTokenBlacklisted(token: string): boolean {
    return this.blacklist.includes(token);
  }
}
