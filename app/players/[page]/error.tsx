'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-darkest-bg text-white p-6 grid place-items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h1>
        <p className="text-gray-400 mb-6">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
