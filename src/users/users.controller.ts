import { Controller, Get, Post, Body, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { LoginDto } from './login.dto';
import { AuthService } from '../auth/auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import express from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiBody({ type: CreateUserDto })
  @Post('signin')
  signin(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signin(createUserDto);
  }

  @ApiBody({ type: LoginDto })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }
  
  @ApiBearerAuth()
  @Post('logout')
  async logout(@Req() req: express.Request) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Token required');
    const token = authHeader.replace('Bearer ', '');
    console.log(token);

    return await this.usersService.logout(token);
  }

  @ApiBearerAuth()
  @Get()
  findAll() {
    // Le guard vérifie le token automatiquement
    return this.usersService.findAll();
  }
}