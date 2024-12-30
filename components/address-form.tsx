'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Home, Briefcase, Users, MapPin } from 'lucide-react'
import { useLocation } from '@/context/location-context'
import { Location } from '@/types/location'

export function AddressForm() {
  const { currentLocation, addSavedLocation } = useLocation()
  const [details, setDetails] = useState({
    houseNumber: '',
    apartment: '',
  })

  const handleSave = (type: Location['type']) => {
    if (!currentLocation) return

    const newLocation: Location = {
      ...currentLocation,
      id: Date.now().toString(),
      type,
      details,
    }

    addSavedLocation(newLocation)
  }

  return (
    <div className="p-6 border rounded-lg space-y-6">
      <div className="flex items-start gap-3">
        <MapPin className="w-6 h-6 text-red-600 mt-1" />
        <div>
          <h3 className="font-semibold">{currentLocation?.name}</h3>
          <p className="text-sm text-muted-foreground">{currentLocation?.address}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="houseNumber">House / Flat / Block No.</Label>
          <Input
            id="houseNumber"
            value={details.houseNumber}
            onChange={(e) => setDetails(prev => ({ ...prev, houseNumber: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="apartment">Apartment / Road / Area</Label>
          <Input
            id="apartment"
            value={details.apartment}
            onChange={(e) => setDetails(prev => ({ ...prev, apartment: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label>Save as</Label>
        <div className="grid grid-cols-4 gap-4 mt-2">
          <Button
            variant="outline"
            className="flex flex-col gap-2 h-auto p-4"
            onClick={() => handleSave('home')}
          >
            <Home className="w-6 h-6" />
            <span>Home</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col gap-2 h-auto p-4"
            onClick={() => handleSave('office')}
          >
            <Briefcase className="w-6 h-6" />
            <span>Office</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col gap-2 h-auto p-4"
            onClick={() => handleSave('friends')}
          >
            <Users className="w-6 h-6" />
            <span>Friends</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col gap-2 h-auto p-4"
            onClick={() => handleSave('other')}
          >
            <MapPin className="w-6 h-6" />
            <span>Other</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

