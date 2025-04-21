import { Controller, Get, UseGuards } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Role } from '../auth/roles.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('test')
export class TestController {
  constructor(private connection: Connection) {}

  @Get('db')
  async testDb() {
    const result = await this.connection.query('SELECT 1+1 AS result');
    return { database: 'working', queryResult: result };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('admin-only')
  @Roles(Role.SUPER_ADMIN)
  adminOnly() {
    return { message: 'This route is for super admins only' };
  }
}
