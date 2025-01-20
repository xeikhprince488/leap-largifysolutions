'use client'

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    schoolName: 'THE SCHOLARS EDUCATIONAL COMPLEX',
    address: 'BUREWALA',
    watermark: true,
    dualLanguage: true,
    defaultMarks: 1
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Settings saved successfully')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input
                    id="schoolName"
                    value={settings.schoolName}
                    onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">School Address</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultMarks">Default Marks per Question</Label>
                  <Input
                    id="defaultMarks"
                    type="number"
                    min={1}
                    value={settings.defaultMarks}
                    onChange={(e) => setSettings({ ...settings, defaultMarks: parseInt(e.target.value) || 1 })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="watermark">Show Watermark</Label>
                    <p className="text-sm text-muted-foreground">
                      Display school logo watermark on generated papers
                    </p>
                  </div>
                  <Switch
                    id="watermark"
                    checked={settings.watermark}
                    onCheckedChange={(checked) => setSettings({ ...settings, watermark: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dualLanguage">Dual Language</Label>
                    <p className="text-sm text-muted-foreground">
                      Show questions in both English and Urdu
                    </p>
                  </div>
                  <Switch
                    id="dualLanguage"
                    checked={settings.dualLanguage}
                    onCheckedChange={(checked) => setSettings({ ...settings, dualLanguage: checked })}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Settings'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

