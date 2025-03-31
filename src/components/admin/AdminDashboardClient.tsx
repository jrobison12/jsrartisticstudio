'use client';

import { useState } from 'react';
import ImageUploadForm from '@/components/ImageUploadForm';
import Link from 'next/link';

export default function AdminDashboardClient() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');

  const handleUploadSuccess = (path: string) => {
    setUploadSuccess(`Image uploaded successfully to ${path}`);
    setShowUploadForm(false);
    // Clear success message after 3 seconds
    setTimeout(() => setUploadSuccess(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif text-[#2c392c] mb-4">Admin Dashboard</h1>
          <p className="text-lg text-[#2c392c]/80">
            Manage your website content and settings
          </p>
        </div>

        {uploadSuccess && (
          <div className="mb-8 p-4 bg-green-100 text-green-700 rounded-md text-center">
            {uploadSuccess}
          </div>
        )}

        {/* Content Management Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Gallery Management */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-serif text-[#2c392c] mb-4">Gallery Management</h2>
            <div className="space-y-4">
              <button
                onClick={() => setShowUploadForm(!showUploadForm)}
                className="w-full px-4 py-2 bg-[#d4a373] text-white rounded-md hover:bg-[#e6c29b] transition-colors"
              >
                {showUploadForm ? 'Cancel Upload' : 'Add New Image'}
              </button>
              
              {showUploadForm && (
                <div className="mt-4">
                  <ImageUploadForm onSuccess={handleUploadSuccess} />
                </div>
              )}

              <Link 
                href="/admin/manage-categories"
                className="block w-full px-4 py-2 bg-[#d4a373] text-white rounded-md hover:bg-[#e6c29b] transition-colors text-center"
              >
                Manage Categories
              </Link>
            </div>
          </div>

          {/* Content Management */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-serif text-[#2c392c] mb-4">Content Management</h2>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-[#d4a373] text-white rounded-md hover:bg-[#e6c29b] transition-colors">
                Edit About Page
              </button>
              <button className="w-full px-4 py-2 bg-[#d4a373] text-white rounded-md hover:bg-[#e6c29b] transition-colors">
                Manage Contact Info
              </button>
              <button className="w-full px-4 py-2 bg-[#d4a373] text-white rounded-md hover:bg-[#e6c29b] transition-colors">
                Update Announcements
              </button>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
            <h2 className="text-2xl font-serif text-[#2c392c] mb-4">Analytics</h2>
            <div className="space-y-4">
              <Link 
                href="/admin/analytics"
                className="block w-full px-4 py-2 bg-[#d4a373] text-white rounded-md hover:bg-[#e6c29b] transition-colors text-center"
              >
                View Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 