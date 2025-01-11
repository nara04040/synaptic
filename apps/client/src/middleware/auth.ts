import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getTokens, isTokenValid } from '@/utils/auth'

// 보호된 경로 목록
const PROTECTED_PATHS = [
  '/dashboard',
  '/roadmap',
  '/learning',
  '/review',
]

// 인증이 필요하지 않은 경로 목록
const PUBLIC_PATHS = [
  '/login',
  '/register',
  '/forgot-password',
  '/',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 공개 경로는 통과
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // 보호된 경로 체크
  if (PROTECTED_PATHS.some(path => pathname.startsWith(path))) {
    const tokens = getTokens()
    
    // 토큰이 없거나 유효하지 않은 경우
    if (!tokens || !isTokenValid(tokens)) {
      const url = new URL('/login', request.url)
      url.searchParams.set('from', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 