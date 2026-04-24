export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="h-9 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-4 w-80 bg-gray-200 rounded animate-pulse mt-2"></div>
          </div>
          <div className="h-11 w-36 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-7 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="h-6 w-28 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}