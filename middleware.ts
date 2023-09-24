import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protectedRoutes, authRoutes } from "@/router/routes";

export function middleware(request: NextRequest) {
    const accesstoken = request.cookies.get("accesstoken")?.value

    if (request.nextUrl.pathname == '/') {
        const response = NextResponse.redirect(new URL("/login", request.url))
        return response
    }

    if (protectedRoutes.includes(request.nextUrl.pathname) && (!accesstoken)) {
        request.cookies.delete("accesstoken")
        const response = NextResponse.redirect(new URL("/login", request.url))
        response.cookies.delete("accesstoken")
        return response
    }

    if (authRoutes.includes(request.nextUrl.pathname) && (accesstoken)) {
        return NextResponse.redirect(new URL("/courses", request.url))
    }
}