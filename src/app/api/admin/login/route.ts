import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    // In a real application, you would validate credentials against a database
    // For now, we'll use environment variables
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Set authentication cookie
      const response = NextResponse.redirect(new URL('/admin', request.url));
      response.cookies.set('auth_token', process.env.ADMIN_TOKEN || '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }

    // If credentials are invalid, redirect back to login with error
    return NextResponse.redirect(
      new URL('/admin/login?error=invalid_credentials', request.url)
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.redirect(
      new URL('/admin/login?error=server_error', request.url)
    );
  }
} 