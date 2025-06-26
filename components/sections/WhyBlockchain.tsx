import { Card, CardContent } from "@/components/ui/card"
import { Coins, FileText, Heart } from "lucide-react"

export default function WhyBlockchain() {
  return (
    <section id="benefits" className="py-20 bg-neutral-light">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">Why On Blockchain?</h2>
          <p className="text-xl text-primary/70">ประกันบำนาญ ลดหย่อนภาษี</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* First Row - 3 cards */}
          <Card className="border-neutral-gray bg-white hover:shadow-lg transition-shadow text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="relative">
                  <Coins className="h-8 w-8 text-accent" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">฿</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-primary/70 text-sm leading-relaxed">เริ่มรับเงินบำนาญตั้งแต่</p>
                <p className="text-primary/70 text-sm leading-relaxed">วันครบรอบปีกรมธรรมก็อายุ</p>
                <p className="text-accent font-bold text-lg">ครบ 60 ปีไปจนถึงอายุครบ 85 ปี</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-neutral-gray bg-white hover:shadow-lg transition-shadow text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="relative">
                  <div className="w-8 h-6 bg-accent rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">฿</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">฿</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-primary/70 text-sm">
                  รับเงินบำนาญ <span className="text-accent font-bold text-lg">ปีละ 12%</span>
                </p>
                <p className="text-xs text-primary/70 align-top">(2)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-neutral-gray bg-white hover:shadow-lg transition-shadow text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-10 bg-accent rounded-full relative">
                  <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full"></div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-white rounded-sm"></div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-primary/70 text-sm leading-relaxed">กรณีเสียชีวิตก่อนรับเงินบำนาญ</p>
                <p className="text-accent font-bold text-lg">รับความคุ้มครอง 105%</p>
                <p className="text-primary/70 text-sm">ของเบี้ยฯที่ชำระ</p>
                <p className="text-xs text-primary/70 align-top">(3)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Second Row - 2 cards */}
          <Card className="border-neutral-gray bg-white hover:shadow-lg transition-shadow text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-accent" />
              </div>
              <div className="space-y-2">
                <p className="text-primary/70 text-lg font-medium">สามารถลดหย่อนภาษีได้</p>
                <p className="text-xs text-primary/70 align-top">(4)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-neutral-gray bg-white hover:shadow-lg transition-shadow text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <div className="space-y-2">
                <p className="text-primary/70 text-lg font-medium leading-relaxed">สมัครง่าย ไม่ต้องตรวจ</p>
                <p className="text-primary/70 text-lg font-medium">ไม่ต้องตอบคำถามสุขภาพ</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
