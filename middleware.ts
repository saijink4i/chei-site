import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'


export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = languages.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect to stored language if visiting root
    if (pathname === '/') {
        const cookieStore = request.cookies
        const lng = cookieStore.get(cookieName)?.value

        if (lng && languages.includes(lng)) {
            return NextResponse.redirect(new URL(`/${lng}`, request.url))
        }
    }

    // Redirect only if path is missing locale AND not root
    if (pathnameIsMissingLocale && pathname !== '/') {
        const locale = fallbackLng
        return NextResponse.redirect(
            new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
        )
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|allergy).*)'],
}
