import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { Database } from '@/types/supabase'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
	const res = NextResponse.next()

	const { pathname } = req.nextUrl

	const supabase = createMiddlewareClient<Database>({ req, res })

	const {
		data: { session }
	} = await supabase.auth.getSession()

	if (
		(session && pathname === '/') ||
		(session && pathname === '/login') ||
		(session && pathname === '/register')
	) {
		const redirectUrl = req.nextUrl.clone()
		redirectUrl.pathname = '/dashboard'

		return NextResponse.redirect(redirectUrl)
	}

	if (!session && pathname.includes('/dashboard')) {
		const redirectUrl = req.nextUrl.clone()
		redirectUrl.pathname = '/'

		return NextResponse.redirect(redirectUrl)
	}

	return NextResponse.next()
}

export const config = {
	matchers: ['/', '/login', '/register', '/dashboard']
}
