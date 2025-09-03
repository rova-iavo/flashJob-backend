import { Controller, Get, Post, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { LoginDto } from './login.dto'; // adapte le chemin si besoin
import { AuthService } from '../auth/auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiBody({ type: CreateUserDto })
  @Post('signin')
  async signin(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signin(createUserDto);
  }

  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Body() loginUserDto: LoginDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post('logout')
  async logout() {
    return this.usersService.logout();
  }

  @Get()
  async findAll(@Headers('authorization') authHeader: string) {
    if (!authHeader) throw new UnauthorizedException('Token required');
    const token = authHeader.replace('Bearer ', '');
    this.authService.verifyToken(token);
    return this.usersService.findAll();
  }
}