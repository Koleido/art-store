// middleware.ts

import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Lấy token (session) từ cookie của request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = req.nextUrl

  // Các route cần bảo vệ
  const protectedRoutes = ["/cart", "/checkout"]

  // Nếu url bắt đầu với một trong các protectedRoutes và user chưa login (không có token)
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    // Chuyển hướng về trang đăng nhập, kèm callbackUrl để redirect về sau khi login
    const signInUrl = new URL("/auth/signin", req.nextUrl.origin)
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Ngược lại, cho qua bình thường
  return NextResponse.next()
}

// Áp middleware cho các route cart và checkout
export const config = {
  matcher: ["/cart/:path*", "/checkout/:path*"],
}
