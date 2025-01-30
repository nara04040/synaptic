import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth.guard';
import { AuthenticatedRequest } from 'src/types/request.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async getCurrentUser(@Request() req: AuthenticatedRequest) {
    console.log('User from request:', req.user);
    console.log('User ID:', req.user.id);
    return this.usersService.getCurrentUser(req.user.id);
  }

  @Get(':id')
  async getPublicUser(@Param('id') id: string) {
    return this.usersService.getPublicUser(id);
  }

  @UseGuards(AuthGuard)
  @Put('me')
  async updateUser(@Request() req: AuthenticatedRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(req.user.id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('me/maps')
  async getUserMaps(@Request() req: AuthenticatedRequest) {
    return this.usersService.getUserMaps(req.user.id);
  }

  @Get(':id/public-maps')
  async getPublicMaps(@Param('id') id: string) {
    return this.usersService.getUserMaps(id, true);
  }

  @UseGuards(AuthGuard)
  @Delete('me')
  async deleteUser(@Request() req: AuthenticatedRequest) {
    await this.usersService.deleteUser(req.user.id);
    return { message: 'User deleted successfully' };
  }
}