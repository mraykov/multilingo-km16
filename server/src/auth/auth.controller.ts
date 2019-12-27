import { Controller, Post, Body, UseGuards, Delete, UsePipes, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Token } from '../common/decorators/token.decorator';
import { ApiUseTags } from '@nestjs/swagger';
import { LoginUserDTO } from '../models/users/login-user.dto';

@Controller('session')
@ApiUseTags('Auth Controller')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async loginUser(@Body(new ValidationPipe({ transform: true, whitelist: true })) user: LoginUserDTO) {
    return await this.authService.login(user);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  public async logoutUser(@Token() token: string) {
    this.authService.blacklistToken(token);

    return {
      msg: 'Successful logout!',
    };
  }
}
