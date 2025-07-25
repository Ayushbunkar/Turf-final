"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Gift, Copy } from "lucide-react"

const ReferralPanel = ({ showReferral, referralCode, setReferralCode }) => {
  if (!showReferral) return null

  return (
    <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-xl">
      <div className="text-center">
        <Gift className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Refer Friends & Earn Rewards!</h3>
        <p className="text-green-600 mb-4">Get ₹100 for every friend who books through your referral</p>
        <div className="flex gap-4 max-w-md mx-auto">
          <Input
            placeholder="Enter referral code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            className="rounded-xl"
          />
          <Button className="rounded-xl bg-green-600 hover:bg-green-700">Apply Code</Button>
        </div>
        <div className="mt-4 p-3 bg-white rounded-xl">
          <p className="text-sm text-gray-600">
            Your referral code: <span className="font-mono font-bold text-green-600">JOHN2024</span>
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 rounded-full bg-transparent"
            onClick={() => navigator.clipboard.writeText("JOHN2024")}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Code
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ReferralPanel
