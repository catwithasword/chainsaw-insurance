import { Button } from "@/components/ui/button"
import { CheckCircle, X } from "lucide-react"

export default function Comparison() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">How PensionDAO Compares</h2>
          <p className="text-xl text-primary/70">See why PensionDAO is the superior choice for your retirement</p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header Row */}
            <div className="grid grid-cols-3 bg-primary text-white rounded-t-lg">
              <div className="p-6 font-semibold text-lg text-center">Criteria</div>
              <div className="p-6 font-semibold text-lg text-center border-l border-white/20">PensionDAO</div>
              <div className="p-6 font-semibold text-lg text-center border-l border-white/20">
                Traditional Annuities
              </div>
            </div>

            {/* Returns Row */}
            <div className="grid grid-cols-3 border-l-4 border-accent bg-neutral-light">
              <div className="p-6 bg-accent/10 border-r border-neutral-gray flex items-center justify-center">
                <h3 className="font-semibold text-primary text-lg">Yield</h3>
              </div>
              <div className="p-6 text-center border-r border-neutral-gray bg-white">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                </div>
                <p className="text-primary">X-XX%~</p>                
              </div>
              <div className="p-6 text-center border-r border-neutral-gray bg-white">
                <div className="flex items-center justify-center mb-2">
                  <X className="h-5 w-5 text-red-500 mr-2" />
                </div>
                <p className="text-primary">2-3%~~</p>
              </div>
            </div>

            {/* Transparency Row */}
            <div className="grid grid-cols-3 border-l-4 border-accent">
              <div className="p-6 bg-accent/10 border-r border-neutral-gray flex items-center justify-center">
                <h3 className="font-semibold text-primary text-lg">Transparency</h3>
              </div>
              <div className="p-6 text-center border-r border-neutral-gray bg-white">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                </div>
                <p className="text-primary">You can see where your money goes 100% transparent</p>
              </div>
              <div className="p-6 text-center border-r border-neutral-gray bg-white">
                <div className="flex items-center justify-center mb-2">
                  <X className="h-5 w-5 text-red-500 mr-2" />
                </div>
                <p className="text-primary">You trust without seeing where your money being invested</p>
              </div>
            </div>

            {/* Fees Row */}
            <div className="grid grid-cols-3 border-l-4 border-accent bg-neutral-light">
              <div className="p-6 bg-accent/10 border-r border-neutral-gray flex items-center justify-center">
                <h3 className="font-semibold text-primary text-lg">Control</h3>
              </div>
              <div className="p-6 text-center border-r border-neutral-gray bg-white">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                </div>
                <p className="text-primary">You vote on how funds are managed</p>
              </div>
              <div className="p-6 text-center border-r border-neutral-gray bg-white">
                <div className="flex items-center justify-center mb-2">
                  <X className="h-5 w-5 text-red-500 mr-2" />
                </div>
                <p className="text-primary">No control — the company manages everything</p>
              </div>
            </div>

            {/* Flexibility Row */}
            <div className="grid grid-cols-3 border-l-4 border-accent rounded-b-lg">
              <div className="p-6 bg-accent/10 border-r border-neutral-gray rounded-bl-lg flex items-center justify-center">
                <h3 className="font-semibold text-primary text-lg">Fee</h3>
              </div>
              <div className="p-6 text-center border-r border-neutral-gray bg-white">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-5 w-5 text-accent mr-2" />
                </div>
                <p className="text-primary">Low — minimal protocol fees, no middlemen</p>
              </div>
              <div className="p-6 text-center border-r border-neutral-gray bg-white rounded-br-lg">
                <div className="flex items-center justify-center mb-2">
                  <X className="h-5 w-5 text-red-500 mr-2" />
                </div>
                <p className="text-primary">High — includes commissions, agents, admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
