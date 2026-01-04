import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;
  const token = request.cookies.get('AdminToken')?.value;
  const secretKey = searchParams.get('key');
  
  const VALID_ENTRY_KEY = process.env.ADMIN_ENTRY_KEY;
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  
  const isMaintenancePage = pathname === '/maintenance';
  const isAdminPath = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin') && !pathname.includes('/login') && !pathname.includes('/logout');

  if (isMaintenanceMode && !isAdminPath && !isAdminApi && !isMaintenancePage) {
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }

  if (isAdminPath || isAdminApi) {
    if (pathname === '/admin' && secretKey === VALID_ENTRY_KEY) {
      return NextResponse.next();
    }

    if (!token) {
      if (isAdminApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.rewrite(new URL('/404', request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      if (payload.pk && payload.role === 'admin') {
        return NextResponse.next();
      }
    } catch (err) {
      const response = isAdminApi
        ? NextResponse.json({ error: "Invalid Session" }, { status: 401 })
        : NextResponse.rewrite(new URL('/404', request.url));
      
      response.cookies.delete('AdminToken');
      return response;
    }

    return NextResponse.rewrite(new URL('/404', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};