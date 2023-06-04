import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { Database } from '@/types/supabase'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
	const res = NextResponse.next()
	const supabase = createMiddlewareClient<Database>({ req, res })
	await supabase.auth.getSession()
	return res
}

// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

// import { NextResponse } from "next/server"

// import type { NextRequest } from "next/server"

// export async function middleware(req: NextRequest) {
// 	const res = NextResponse.next()

// 	const { pathname } = req.nextUrl

// 	const supabase = createMiddlewareClient({ req, res })

// 	const { data: { session } } = await supabase.auth.getSession()

// 	if (!session && pathname === '/dashboard') {
// 		const redirectUrl = req.nextUrl.clone()
// 		redirectUrl.pathname = '/'

// 		return NextResponse.redirect(redirectUrl)
// 	} else if (session && pathname === '/') {
// 		const redirectUrl = req.nextUrl.clone()
// 		redirectUrl.pathname = '/dashboard'

// 		return NextResponse.redirect(redirectUrl)
// 	}

// 	return NextResponse.next()
// }

// export const config = {
// 	matchers: ['/dashboard', '/']
// }
