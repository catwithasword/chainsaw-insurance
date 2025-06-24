import { Shield, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contact" className="bg-accent-dark text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold">Chainsaw</span>
            </div>
            <p className="opacity-80 mb-4">
              Securing retirements for over 50 years with guaranteed annuity solutions and expert financial guidance.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-accent-foreground font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-accent-foreground font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-accent-foreground font-bold">in</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Contact</h3>
            <div className="space-y-3 opacity-80">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span>1-800-CHAINSAW</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span>annuities@chainsaw.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Bangkok, Thailand</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-primary/20 mt-12 pt-8 text-center opacity-60">
          <p>&copy; 2025 Chainsaw Annuity Insurance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
