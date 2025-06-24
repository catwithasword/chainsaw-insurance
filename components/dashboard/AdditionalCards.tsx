import { Card, CardContent } from "@/components/ui/card"

export default function AdditionalCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card className="bg-white rounded-lg shadow-md">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-800">Total Contributions</h3>
              <p className="text-2xl font-bold text-primary">₿180,000</p>
            </div>
            <div className="text-accent">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-lg shadow-md">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-800">Monthly Growth</h3>
              <p className="text-2xl font-bold text-accent">+2.82%</p>
            </div>
            <div className="text-accent">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
