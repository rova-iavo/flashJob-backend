import { Controller, Get, Post, Body, Req, UnauthorizedException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { LoginDto } from './login.dto';
import { AuthService } from '../auth/auth.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import express from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiBody({ type: CreateUserDto })
  @ApiConsumes('multipart/form-data')
  @Post('signin')
  @UseInterceptors(FileInterceptor('avatar'))
  async signin(@Body() createUserDto: CreateUserDto, @UploadedFile() avatar: Express.Multer.File) {
    if (avatar) {
      // Convert buffer to base64 string
      createUserDto.avatar = avatar.buffer.toString('base64');
    }
    return await this.usersService.signin(createUserDto);
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

