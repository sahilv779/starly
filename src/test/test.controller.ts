import { Controller, Get } from '@nestjs/common';
import { Connection } from 'typeorm';

@Controller('test')
export class TestController {
  constructor(private connection: Connection) {}

  @Get('db')
  async testDb() {
    const result = await this.connection.query('SELECT 1+1 AS result');
    return { database: 'working', queryResult: result };
  }
}
