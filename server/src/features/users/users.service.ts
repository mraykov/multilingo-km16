import { Injectable } from '@nestjs/common';
import { User } from '../../database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LingosSystemError } from '../../common/exceptions/lingo-system.error';
import * as bcrypt from 'bcrypt';
import { RoleTypes } from '../../common/enums/role.enum';
import { RegisterUserDTO } from '../../models/users/register-user.dto';
import { Role } from '../../database/entities/role.entity';
import { ShowUserDTO } from '../../models/users/show-user.dto';
import { ArticlesService } from '../articles/articles.service';
import { ShowLanguagesDTO } from '../../models/languages/show-language.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenUserDTO } from '../../models/users/token-user.dto';
import { ChangeLanguagesDTO } from '../../models/languages/change-language.dto';
import { SupportedLanguagesEnum } from '../../common/enums/supported-languages.enum';
import { ArticleVersion } from '../../database/entities/article-version.entity';
import { Article } from '../../database/entities/article.entity';
import { LoginUserDTO } from '../../models/users/login-user.dto';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
    @InjectRepository(ArticleVersion) private readonly articleVersionRepository: Repository<ArticleVersion>,
    @InjectRepository(Article) private  readonly articleRepository: Repository<Article>,
    private readonly articlesService: ArticlesService,
    private readonly jwtService: JwtService,
  ) {}

  public async getUsersArticles(id: number, language: string) {
    return await this.articlesService.getUsersArticles(id, language);
  }

  public async getUserDetails(id: number): Promise<ShowUserDTO> {
    const found = await this.usersRepository.findOne({
      where: { id, deleted: false },
    });
    if (!found) {
      throw new LingosSystemError(`Such user does not exist!`, 400);
    }
    return found;
  }

  public async getAllUsers(): Promise<ShowUserDTO[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  public async createUser(user: RegisterUserDTO): Promise<ShowUserDTO> {
    const foundUser: User = await this.usersRepository.findOne({
      username: user.username,
    });
    if (foundUser) {
      throw new LingosSystemError(
        'User with such username already exist!',
        400,
      );
    }
    const role = await this.rolesRepository.findOne({
      roleName: RoleTypes.Contributor,
    });
    user.password = await bcrypt.hash(user.password, 10);
    const createUser = this.usersRepository.create(user);
    createUser.role = role;
    return await this.usersRepository.save(createUser);
  }

  public async changePassword(id: number, password): Promise<ShowUserDTO> {
    const user = await this.usersRepository.findOne({ where: { id } });
    const comparePass = await bcrypt.compare(
      password.oldPassword,
      user.password,
    );
    if (!comparePass) {
      throw new LingosSystemError('Your old password is incorrect', 400);
    } else {
      user.password = await bcrypt.hash(password.newPassword, 10);
      await this.usersRepository.save(user);
      return user;
    }
  }

  public async updateUser(
    id: number,
    body: ShowUserDTO,
    userLogged: User,
  ): Promise<ShowUserDTO> {
    if (userLogged.role.roleName !== 'Admin') {
      throw new LingosSystemError(
        'You are not authorized to perform this action',
        400,
      );
    }
    const role = await this.rolesRepository.findOne({
      where: { roleName: body.role.roleName },
    });
    const found = await this.usersRepository.findOne({ where: { id } });
    found.role = role;
    const saved = await this.usersRepository.save(found);
    return saved;
  }

  public async changeLanguage(
    id: number,
    body: ChangeLanguagesDTO,
  ): Promise<ShowLanguagesDTO> {
    body.language = SupportedLanguagesEnum[body.language];

    const foundUser = await this.usersRepository.findOne({ where: { id } });
    foundUser.preferredLanguage = await Promise.resolve(body);
    await this.usersRepository.save(foundUser);

    const payload: TokenUserDTO = {
      id: foundUser.id,
      username: foundUser.username,
      role: foundUser.role.roleName,
      preferredLanguage: foundUser.preferredLanguage.language,
    };

    const token = await this.jwtService.signAsync(payload);
    return { ...body, token };
  }

  public async deleteUser(id: number): Promise<ShowUserDTO> {
    const found = await this.usersRepository.findOne({ where: { id } });
    if (!found) {
      throw new LingosSystemError('Such user does not exists', 400);
    }
    found.deleted = true;

    const articlesVersion = await this.articleVersionRepository.find({where: {author: found.id}});
    const mainArticles = await this.articleRepository.find({where: {author: found.id }});
    await this.articleVersionRepository.remove(articlesVersion);
    await this.articleRepository.remove(mainArticles);
    return await this.usersRepository.save(found);
  }

  public async findUserByUsername(usernameSearch: string) {
    const foundUser: User = await this.usersRepository.findOne({
      username: usernameSearch,
    });
    if (!foundUser) {
      throw new LingosSystemError(
        'User with such username does not exist!',
        400,
      );
    }
    return foundUser;
  }

  public async findUser(user: LoginUserDTO) {
    const foundUser: User = await this.usersRepository.findOne({where: {username: user.username},
      relations: ['preferredLanguage'],
    });
    if (!foundUser || foundUser.deleted) {
      throw new LingosSystemError('The user does not exist!', 400);
    }
    if (!foundUser.preferredLanguage) {
      (foundUser.preferredLanguage as any) = {
        language: null,
      };
    }
    return foundUser;
  }

  public async validateUserPassword(passwordToCheck: string, user: User) {
    if (!(await bcrypt.compare(passwordToCheck, user.password))) {
      throw new LingosSystemError('User\'s password does not match!', 400);
    }

    return true;
  }
}
