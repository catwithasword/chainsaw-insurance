export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">How Annuities Work</h2>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">Simple steps to secure your retirement income</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-accent">1</span>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">Choose Your Plan</h3>
            <p className="text-primary/70">
              Select the annuity type that matches your retirement goals and risk tolerance.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-accent">2</span>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">Make Contributions</h3>
            <p className="text-primary/70">
              Fund your annuity with a lump sum or regular payments during the accumulation phase.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-accent">3</span>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">Watch It Grow</h3>
            <p className="text-primary/70">
              Your money grows tax-deferred with guaranteed minimum returns and potential upside.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-accent">4</span>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">Receive Income</h3>
            <p className="text-primary/70">
              Start receiving guaranteed monthly payments when you're ready to retire.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
