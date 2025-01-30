// src/modules/auth/auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      // JWT 토큰으로 직접 사용자 검증
      const { data: { user }, error } = await this.supabaseService.getClient().auth.getUser(token);
      
      if (error) {
        console.error('Auth error:', error);
        throw new UnauthorizedException('Invalid token');
      }

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // 요청 객체에 사용자 정보 추가
      request.user = user;
      return true;
    } catch (error) {
      console.error('Auth error:', error);
      throw new UnauthorizedException('Authentication failed');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}