import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 보호된 라우트 패턴
const protectedRoutes = ['/dashboard', '/roadmap', '/notes', '/review']
// 인증 라우트 패턴
const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  // 임시로 모든 라우트 접근 허용
  return NextResponse.next()

  // 원래 인증 로직 (주석 처리)
  /*
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-storage')?.value

  // 토큰이 있는 경우 (로그인 상태)
  if (token) {
    // 이미 로그인한 사용자가 인증 페이지 접근 시 대시보드로 리다이렉트
    if (authRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  // 토큰이 없는 경우 (비로그인 상태)
  else {
    // 보호된 라우트 접근 시 로그인 페이지로 리다이렉트
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
  */
}

export const config = {
  matcher: [...protectedRoutes, ...authRoutes]
} 