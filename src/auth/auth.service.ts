import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // Temporary hardcoded users - replace with database later
    const users = [
      {
        userId: 1,
        email: 'admin@example.com',
        password: 'admin123',
        roles: [Role.SUPER_ADMIN],
      },
      {
        userId: 2,
        email: 'owner@example.com',
        password: 'owner123',
        roles: [Role.HOTEL_OWNER],
      },
    ];

    const user = users.find((u) => u.email === email && u.password === pass);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.userId,
      roles: user.roles || [Role.CUSTOMER],
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
