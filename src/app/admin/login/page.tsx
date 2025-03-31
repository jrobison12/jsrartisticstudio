import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Admin Login | Jeanette S. Robison',
  description: 'Admin login page',
};

export default function AdminLogin() {
  // If already authenticated, redirect to admin dashboard
  const cookieStore = cookies();
  const authToken = cookieStore.get('auth_token');
  if (authToken?.value === process.env.ADMIN_TOKEN) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-[#f4f1ea] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-serif text-[#2c392c]">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-[#2c392c]/80">
            Please enter your credentials to access the admin dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" action="/api/admin/login" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#d4a373] focus:border-[#d4a373] focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#d4a373] focus:border-[#d4a373] focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#d4a373] hover:bg-[#e6c29b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d4a373]"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 