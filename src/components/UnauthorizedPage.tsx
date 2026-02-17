export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-900">
      <div className="w-full max-w-sm px-6">
        <div className="rounded-xl border border-gray-200 p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gray-300">
            {/* simple lock icon */}
            <div className="relative h-5 w-5">
              <div className="absolute left-1/2 top-0 h-2.5 w-3 -translate-x-1/2 rounded-t-full border-2 border-gray-700 border-b-0" />
              <div className="absolute bottom-0 left-1/2 h-3 w-5 -translate-x-1/2 rounded border-2 border-gray-700" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold">Access Denied</h1>
          <p className="mt-2 text-sm text-gray-600">
            You are not authorized to view this page
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <a
              href="/"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
            >
              Home
            </a>
            <button
              onClick={() => window.history.back()}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
            >
              Back
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-500">403 Unauthorized</p>
        </div>
      </div>
    </div>
  );
}
