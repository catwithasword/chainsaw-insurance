import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contact" className="bg-accent-dark text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Company Branding - Left Side */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold">PensionDAO</span>
            </div>
            <p className="opacity-80 mb-6 text-sm leading-relaxed">
              Securing retirements for over 50 years with guaranteed annuity solutions and expert financial guidance for
              thousands of clients worldwide.
            </p>
            <div className="flex space-x-4 mb-6">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors cursor-pointer">
                <Facebook className="h-5 w-5 text-accent-foreground" />
              </div>
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors cursor-pointer">
                <Twitter className="h-5 w-5 text-accent-foreground" />
              </div>
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors cursor-pointer">
                <Linkedin className="h-5 w-5 text-accent-foreground" />
              </div>
            </div>
          </div>

          {/* Far Right - Contact Column */}
          <div className="lg:col-start-5 flex-shrink-0">
            <h3 className="text-lg font-semibold mb-4 text-accent">Contact</h3>
            <div className="space-y-3 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span>1-800-PensionDAO</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span>annuities@PensionDAO.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                <span>Bangkok, Thailand</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-accent/20 mt-12 pt-8 text-center">
          <p className="text-sm opacity-60">
            © 2025 PensionDAO Annuities. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
