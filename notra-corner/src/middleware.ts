import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value

  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/task-bar', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/task-bar/:path*'],
}
