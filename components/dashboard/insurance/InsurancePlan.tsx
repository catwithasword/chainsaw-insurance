import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, Zap, Heart, CheckCircle, FileText, Download, ZoomIn, ZoomOut } from "lucide-react"
import { useState } from "react"

interface InsurancePlanProps {
  onContractSigned?: (planName: string) => void
}

export default function InsurancePlan({ onContractSigned }: InsurancePlanProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [pdfZoom, setPdfZoom] = useState(100)

  const handleSignContract = (planName: string) => {
    setSelectedPlan(planName)
    setAcceptedTerms(false)
    setPdfZoom(100)
  }

  const handleContractSubmit = () => {
    if (acceptedTerms) {
      setAcceptedTerms(false)
      // Call the callback to notify parent component
      if (onContractSigned) {
        onContractSigned(selectedPlan)
      }
    }
  }

  const handleZoomIn = () => {
    setPdfZoom(prev => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setPdfZoom(prev => Math.max(prev - 25, 75))
  }

  const handleDownloadPdf = () => {
    // PDF download functionality would be implemented here
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="border-neutral-gray hover:shadow-lg transition-all hover:border-accent/50 group">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
            <Star className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="text-primary">Plan A</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-primary/70 text-center mb-4">(Standard)</p>
          <ul className="text-sm text-primary/70 space-y-2">
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span>Insurance premium payment period: 40-59 years old</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span>Payout age: 60 years old</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span>% Annual Payout: 7%</span>
            </li>
          </ul>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="w-full mt-6" 
                onClick={() => handleSignContract("Plan A")}
              >
                Sign Contract
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Blockchain Annuity Insurance Contract - {selectedPlan}
                </DialogTitle>
              </DialogHeader>
              
              {/* PDF Viewer Controls */}
              <div className="flex items-center justify-between border-b pb-2 mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">{pdfZoom}%</span>
                  <Button variant="outline" size="sm" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={handleDownloadPdf}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>

              <div className="space-y-4">
                {/* PDF Document Container */}
                <div 
                  className="border rounded-lg bg-white shadow-inner overflow-y-auto max-h-96"
                  style={{ fontSize: `${pdfZoom}%` }}
                >
                  <div className="p-6 space-y-4" style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'top left' }}>
                    {/* PDF Header */}
                    <div className="text-center border-b pb-4">
                      <h1 className="text-xl font-bold">BLOCKCHAIN ANNUITY INSURANCE CONTRACT</h1>
                      <p className="text-sm text-gray-600 mt-2">Smart Contract Protocol: ChainSaw Insurance v2.1</p>
                      <p className="text-xs text-gray-500">Contract Address: 0x1a2b3c4d5e6f7890abcdef1234567890abcdef12</p>
                    </div>

                    {/* Contract Content */}
                    <div className="text-xs space-y-3">
                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE I - BLOCKCHAIN INFRASTRUCTURE</h3>
                        <p><strong>1.1 Smart Contract Deployment:</strong> This insurance policy is governed by immutable smart contracts deployed on the Ethereum blockchain, ensuring transparent and automated execution of all terms.</p>
                        <p><strong>1.2 Decentralized Storage:</strong> All policy data is stored using IPFS (InterPlanetary File System) with cryptographic hashing for tamper-proof record keeping.</p>
                        <p><strong>1.3 Oracle Integration:</strong> Real-time data feeds from Chainlink oracles provide accurate age verification and payout triggers.</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE II - COVERAGE AND BENEFITS</h3>
                        <p><strong>2.1 Annuity Structure:</strong> This blockchain-based annuity provides guaranteed returns through algorithmic portfolio management and DeFi yield farming strategies.</p>
                        <p><strong>2.2 Premium Payments:</strong> All premiums are processed through cryptocurrency transactions with automatic staking in high-yield protocols.</p>
                        <p><strong>2.3 Payout Mechanism:</strong> Benefits are automatically distributed via smart contract execution upon reaching predetermined age thresholds.</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE III - TOKENIZATION</h3>
                        <p><strong>3.1 Policy NFTs:</strong> Each insurance policy is represented as a unique NFT (Non-Fungible Token) providing proof of ownership and transferability.</p>
                        <p><strong>3.2 Yield Tokens:</strong> Earned yields are distributed as CSI (ChainSaw Insurance) governance tokens, providing voting rights in protocol decisions.</p>
                        <p><strong>3.3 Liquidity Provision:</strong> Policyholders can stake their policy NFTs in liquidity pools for additional rewards.</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE IV - SMART CONTRACT TERMS</h3>
                        <p><strong>4.1 Immutable Execution:</strong> Contract terms cannot be altered once deployed, ensuring policyholder protection.</p>
                        <p><strong>4.2 Automated Claims:</strong> Claims processing is fully automated through oracle-verified events and smart contract logic.</p>
                        <p><strong>4.3 Multi-Signature Security:</strong> Critical functions require multi-signature approval from elected governance token holders.</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE V - RISK MANAGEMENT</h3>
                        <p><strong>5.1 Diversified Protocols:</strong> Funds are distributed across multiple DeFi protocols to minimize smart contract risks.</p>
                        <p><strong>5.2 Insurance Pool:</strong> A portion of premiums funds a community insurance pool protecting against protocol failures.</p>
                        <p><strong>5.3 Emergency Procedures:</strong> Failsafe mechanisms allow for fund recovery in case of critical smart contract vulnerabilities.</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE VI - GOVERNANCE</h3>
                        <p><strong>6.1 DAO Structure:</strong> The protocol is governed by a Decentralized Autonomous Organization (DAO) of token holders.</p>
                        <p><strong>6.2 Proposal System:</strong> Policy changes require community voting with minimum quorum requirements.</p>
                        <p><strong>6.3 Treasury Management:</strong> Community treasury funds protocol development and security audits.</p>
                      </div>
                    </div>

                    {/* Signature Section */}
                    <div className="border-t pt-4 mt-6">
                      <div className="grid grid-cols-2 gap-8 text-xs">
                        <div>
                          <p className="font-semibold">POLICYHOLDER DIGITAL SIGNATURE</p>
                          <div className="border-t mt-2 pt-2">
                            <p>Wallet Address: ________________</p>
                            <p>Date: ________________</p>
                            <p>Block Height: ________________</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">CHAINSAW INSURANCE PROTOCOL</p>
                          <div className="border-t mt-2 pt-2">
                            <p>Smart Contract: 0x1a2b3c4d...</p>
                            <p>Protocol Version: v2.1</p>
                            <p>Deployment Block: 18,500,000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  />
                  <label htmlFor="terms" className="text-sm">
                    I have read and agree to the blockchain annuity insurance contract terms and conditions
                  </label>
                </div>
                
                {/* Sign Button */}
                <Button 
                  className="w-full" 
                  disabled={!acceptedTerms}
                  onClick={handleContractSubmit}
                >
                  Accept
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card className="border-neutral-gray hover:shadow-lg transition-all hover:border-accent/50 group">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
            <Zap className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="text-primary">Plan B</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-primary/70 text-center mb-4">(Flex+)</p>
          <ul className="text-sm text-primary/70 space-y-2">
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span>Insurance premium payment period: 35-60 years old</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span>Payout age: 60 years old</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span>% Annual Payout: depend</span>
            </li>
          </ul>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="w-full mt-6" 
                onClick={() => handleSignContract("Plan B")}
              >
                Sign Contract
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Blockchain Annuity Insurance Contract - {selectedPlan}
                </DialogTitle>
              </DialogHeader>
              
              {/* PDF Viewer Controls */}
              <div className="flex items-center justify-between border-b pb-2 mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">{pdfZoom}%</span>
                  <Button variant="outline" size="sm" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={handleDownloadPdf}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>

              <div className="space-y-4">
                {/* PDF Document Container */}
                <div 
                  className="border rounded-lg bg-white shadow-inner overflow-y-auto max-h-96"
                  style={{ fontSize: `${pdfZoom}%` }}
                >
                  <div className="p-6 space-y-4" style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'top left' }}>
                    {/* PDF Header */}
                    <div className="text-center border-b pb-4">
                      <h1 className="text-xl font-bold">BLOCKCHAIN ANNUITY INSURANCE CONTRACT</h1>
                      <p className="text-sm text-gray-600 mt-2">Smart Contract Protocol: ChainSaw Insurance v2.1</p>
                      <p className="text-xs text-gray-500">Contract Address: 0x1a2b3c4d5e6f7890abcdef1234567890abcdef12</p>
                    </div>

                    {/* Contract Content */}
                    <div className="text-xs space-y-3">
                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE I - BLOCKCHAIN INFRASTRUCTURE</h3>
                        <p><strong>1.1 Smart Contract Deployment:</strong> This insurance policy is governed by immutable smart contracts deployed on the Ethereum blockchain, ensuring transparent and automated execution of all terms.</p>
                        <p><strong>1.2 Decentralized Storage:</strong> All policy data is stored using IPFS (InterPlanetary File System) with cryptographic hashing for tamper-proof record keeping.</p>
                        <p><strong>1.3 Oracle Integration:</strong> Real-time data feeds from Chainlink oracles provide accurate age verification and payout triggers.</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE II - COVERAGE AND BENEFITS</h3>
                        <p><strong>2.1 Annuity Structure:</strong> This blockchain-based annuity provides guaranteed returns through algorithmic portfolio management and DeFi yield farming strategies.</p>
                        <p><strong>2.2 Premium Payments:</strong> All premiums are processed through cryptocurrency transactions with automatic staking in high-yield protocols.</p>
                        <p><strong>2.3 Payout Mechanism:</strong> Benefits are automatically distributed via smart contract execution upon reaching predetermined age thresholds.</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE III - TOKENIZATION</h3>
                        <p><strong>3.1 Policy NFTs:</strong> Each insurance policy is represented as a unique NFT (Non-Fungible Token) providing proof of ownership and transferability.</p>
                        <p><strong>3.2 Yield Tokens:</strong> Earned yields are distributed as CSI (ChainSaw Insurance) governance tokens, providing voting rights in protocol decisions.</p>
                        <p><strong>3.3 Liquidity Provision:</strong> Policyholders can stake their policy NFTs in liquidity pools for additional rewards.</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE IV - SMART CONTRACT TERMS</h3>
                        <p><strong>4.1 Immutable Execution:</strong> Contract terms cannot be altered once deployed, ensuring policyholder protection.</p>
                        <p><strong>4.2 Automated Claims:</strong> Claims processing is fully automated through oracle-verified events and smart contract logic.</p>
                        <p><strong>4.3 Multi-Signature Security:</strong> Critical functions require multi-signature approval from elected governance token holders.</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE V - RISK MANAGEMENT</h3>
                        <p><strong>5.1 Diversified Protocols:</strong> Funds are distributed across multiple DeFi protocols to minimize smart contract risks.</p>
                        <p><strong>5.2 Insurance Pool:</strong> A portion of premiums funds a community insurance pool protecting against protocol failures.</p>
                        <p><strong>5.3 Emergency Procedures:</strong> Failsafe mechanisms allow for fund recovery in case of critical smart contract vulnerabilities.</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE VI - GOVERNANCE</h3>
                        <p><strong>6.1 DAO Structure:</strong> The protocol is governed by a Decentralized Autonomous Organization (DAO) of token holders.</p>
                        <p><strong>6.2 Proposal System:</strong> Policy changes require community voting with minimum quorum requirements.</p>
                        <p><strong>6.3 Treasury Management:</strong> Community treasury funds protocol development and security audits.</p>
                      </div>
                    </div>

                    {/* Signature Section */}
                    <div className="border-t pt-4 mt-6">
                      <div className="grid grid-cols-2 gap-8 text-xs">
                        <div>
                          <p className="font-semibold">POLICYHOLDER DIGITAL SIGNATURE</p>
                          <div className="border-t mt-2 pt-2">
                            <p>Wallet Address: ________________</p>
                            <p>Date: ________________</p>
                            <p>Block Height: ________________</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">CHAINSAW INSURANCE PROTOCOL</p>
                          <div className="border-t mt-2 pt-2">
                            <p>Smart Contract: 0x1a2b3c4d...</p>
                            <p>Protocol Version: v2.1</p>
                            <p>Deployment Block: 18,500,000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  />
                  <label htmlFor="terms" className="text-sm">
                    I have read and agree to the blockchain annuity insurance contract terms and conditions
                  </label>
                </div>
                
                {/* Sign Button */}
                <Button 
                  className="w-full" 
                  disabled={!acceptedTerms}
                  onClick={handleContractSubmit}
                >
                  Accept
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card className="border-neutral-gray hover:shadow-lg transition-all hover:border-accent/50 group">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
            <Heart className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="text-primary">Plan C</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-primary/70 text-center mb-4">(Longlife)</p>
          <ul className="text-sm text-primary/70 space-y-2">
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span>Insurance premium payment period: 40-55 years old</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span>Payout age: 56 years old</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span>% Annual Payout: 6.5%</span>
            </li>
          </ul>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="w-full mt-6" 
                onClick={() => handleSignContract("Plan C")}
              >
                Sign Contract
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Blockchain Annuity Insurance Contract - {selectedPlan}
                </DialogTitle>
              </DialogHeader>
              
              {/* PDF Viewer Controls */}
              <div className="flex items-center justify-between border-b pb-2 mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">{pdfZoom}%</span>
                  <Button variant="outline" size="sm" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={handleDownloadPdf}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>

              <div className="space-y-4">
                {/* PDF Document Container */}
                <div 
                  className="border rounded-lg bg-white shadow-inner overflow-y-auto max-h-96"
                  style={{ fontSize: `${pdfZoom}%` }}
                >
                  <div className="p-6 space-y-4" style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'top left' }}>
                    {/* PDF Header */}
                    <div className="text-center border-b pb-4">
                      <h1 className="text-xl font-bold">BLOCKCHAIN ANNUITY INSURANCE CONTRACT</h1>
                      <p className="text-sm text-gray-600 mt-2">Smart Contract Protocol: ChainSaw Insurance v2.1</p>
                      <p className="text-xs text-gray-500">Contract Address: 0x1a2b3c4d5e6f7890abcdef1234567890abcdef12</p>
                    </div>

                    {/* Contract Content */}
                    <div className="text-xs space-y-3">
                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE I - BLOCKCHAIN INFRASTRUCTURE</h3>
                        <p><strong>1.1 Smart Contract Deployment:</strong> This insurance policy is governed by immutable smart contracts deployed on the Ethereum blockchain, ensuring transparent and automated execution of all terms.</p>
                        <p><strong>1.2 Decentralized Storage:</strong> All policy data is stored using IPFS (InterPlanetary File System) with cryptographic hashing for tamper-proof record keeping.</p>
                        <p><strong>1.3 Oracle Integration:</strong> Real-time data feeds from Chainlink oracles provide accurate age verification and payout triggers.</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE II - COVERAGE AND BENEFITS</h3>
                        <p><strong>2.1 Annuity Structure:</strong> This blockchain-based annuity provides guaranteed returns through algorithmic portfolio management and DeFi yield farming strategies.</p>
                        <p><strong>2.2 Premium Payments:</strong> All premiums are processed through cryptocurrency transactions with automatic staking in high-yield protocols.</p>
                        <p><strong>2.3 Payout Mechanism:</strong> Benefits are automatically distributed via smart contract execution upon reaching predetermined age thresholds.</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE III - TOKENIZATION</h3>
                        <p><strong>3.1 Policy NFTs:</strong> Each insurance policy is represented as a unique NFT (Non-Fungible Token) providing proof of ownership and transferability.</p>
                        <p><strong>3.2 Yield Tokens:</strong> Earned yields are distributed as CSI (ChainSaw Insurance) governance tokens, providing voting rights in protocol decisions.</p>
                        <p><strong>3.3 Liquidity Provision:</strong> Policyholders can stake their policy NFTs in liquidity pools for additional rewards.</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE IV - SMART CONTRACT TERMS</h3>
                        <p><strong>4.1 Immutable Execution:</strong> Contract terms cannot be altered once deployed, ensuring policyholder protection.</p>
                        <p><strong>4.2 Automated Claims:</strong> Claims processing is fully automated through oracle-verified events and smart contract logic.</p>
                        <p><strong>4.3 Multi-Signature Security:</strong> Critical functions require multi-signature approval from elected governance token holders.</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE V - RISK MANAGEMENT</h3>
                        <p><strong>5.1 Diversified Protocols:</strong> Funds are distributed across multiple DeFi protocols to minimize smart contract risks.</p>
                        <p><strong>5.2 Insurance Pool:</strong> A portion of premiums funds a community insurance pool protecting against protocol failures.</p>
                        <p><strong>5.3 Emergency Procedures:</strong> Failsafe mechanisms allow for fund recovery in case of critical smart contract vulnerabilities.</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-2">ARTICLE VI - GOVERNANCE</h3>
                        <p><strong>6.1 DAO Structure:</strong> The protocol is governed by a Decentralized Autonomous Organization (DAO) of token holders.</p>
                        <p><strong>6.2 Proposal System:</strong> Policy changes require community voting with minimum quorum requirements.</p>
                        <p><strong>6.3 Treasury Management:</strong> Community treasury funds protocol development and security audits.</p>
                      </div>
                    </div>

                    {/* Signature Section */}
                    <div className="border-t pt-4 mt-6">
                      <div className="grid grid-cols-2 gap-8 text-xs">
                        <div>
                          <p className="font-semibold">POLICYHOLDER DIGITAL SIGNATURE</p>
                          <div className="border-t mt-2 pt-2">
                            <p>Wallet Address: ________________</p>
                            <p>Date: ________________</p>
                            <p>Block Height: ________________</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">CHAINSAW INSURANCE PROTOCOL</p>
                          <div className="border-t mt-2 pt-2">
                            <p>Smart Contract: 0x1a2b3c4d...</p>
                            <p>Protocol Version: v2.1</p>
                            <p>Deployment Block: 18,500,000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  />
                  <label htmlFor="terms" className="text-sm">
                    I have read and agree to the blockchain annuity insurance contract terms and conditions
                  </label>
                </div>
                
                {/* Sign Button */}
                <Button 
                  className="w-full" 
                  disabled={!acceptedTerms}
                  onClick={handleContractSubmit}
                >
                  Accept
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}
