import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  UseInterceptors,
  ValidationPipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDTO } from '../../models/users/register-user.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { TransformInterceptor } from '../../common/transformer/interceptors/transform.interceptor';
import { ShowUserDTO } from '../../models/users/show-user.dto';
import { ShowTranslatedArticleDTO } from '../../models/articles/show-translated-article.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserReq } from '../../common/decorators/user.decorator';
import { User } from '../../database/entities/user.entity';
import { ShowLanguagesDTO } from '../../models/languages/show-language.dto';
import { ChangeLanguagesDTO } from '../../models/languages/change-language.dto';

@Controller('users')
@ApiUseTags('Register')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowUserDTO))
  public async getAllUsers(): Promise<ShowUserDTO[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowUserDTO))
  public async getUserDetails(@Param('id') id: number): Promise<ShowUserDTO> {
    return await this.usersService.getUserDetails(id);
  }

  @Get(':id/articles')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowTranslatedArticleDTO))
  public async getUsersArticles(
    @Param('id', ParseIntPipe) id: number,
    @Query('language') language: string,
  ): Promise<ShowTranslatedArticleDTO[]> {
    return await this.usersService.getUsersArticles(id, language);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(new TransformInterceptor(ShowUserDTO))
  public async createUser(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    user: RegisterUserDTO,
  ): Promise<ShowUserDTO> {
    return await this.usersService.createUser(user);
  }

  @Patch(':id/password')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowUserDTO))
  public async changePassword(
    @Param('id') id: number,
    @Body() password,
  ): Promise<ShowUserDTO> {
    return this.usersService.changePassword(id, password);
  }

  @Patch(':id/language')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowLanguagesDTO))
  public async changeLanguage(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: ChangeLanguagesDTO,
  ): Promise<ShowLanguagesDTO> {
    return await this.usersService.changeLanguage(id, body);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowUserDTO))
  public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: ShowUserDTO,
    @UserReq() userLogged: User,
  ): Promise<ShowUserDTO> {
    return await this.usersService.updateUser(id, body, userLogged);
  }

  @Delete(':id')
  @UseInterceptors(new TransformInterceptor(ShowUserDTO))
  @UseGuards(AuthGuard('jwt'))
  public async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ShowUserDTO> {
    return await this.usersService.deleteUser(id);
  }
}
