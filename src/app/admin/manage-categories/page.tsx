import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import CategoryManager from '@/components/admin/CategoryManager';

export default async function ManageCategories() {
  // Server-side authentication check
  if (!(await isAuthenticated())) {
    redirect('/admin/login');
  }

  return <CategoryManager />;
} 