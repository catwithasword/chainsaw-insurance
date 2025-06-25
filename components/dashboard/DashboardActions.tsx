export default function DashboardActions() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-accent-dark transition-colors">
          View Details
        </button>
        <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          Transaction History
        </button>
      </div>
    </div>
  )
}
