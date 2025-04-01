'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
          <p className="text-gray-600 mb-8">
            We apologize for the inconvenience. Please try again later.
          </p>
          <button
            onClick={reset}
            className="bg-[#2c392c] text-white px-6 py-2 rounded-md hover:bg-[#2c392c]/90 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
} 