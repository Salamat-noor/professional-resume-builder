import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Check user session for every request first
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims

  // Define public routes that don't require authentication
  const publicRoutes = ['/', '/pricing', '/auth', 'onboarding']
  const isPublicRoute = publicRoutes.some(route =>
    request.nextUrl.pathname === route ||
    request.nextUrl.pathname.startsWith('/auth/') ||
    request.nextUrl.pathname.startsWith('/api/auth/')
  )

  // Handle authentication redirects based on session status
  if (!user && !isPublicRoute) {
    // Redirect unauthenticated users to login page for protected routes
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    // Redirect authenticated users away from auth pages
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    url.searchParams.delete('redirect')
    return NextResponse.redirect(url)
  }

  // For all requests (authenticated or not), pass the request next with updated session
  return supabaseResponse
}
