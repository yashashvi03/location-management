'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Home, Briefcase, Users, MapPin, Search, Trash2 } from 'lucide-react'
import { useLocation } from '@/context/location-context'

export function AddressManagement() {
  const { savedLocations, recentSearches, removeSavedLocation } = useLocation()

  const getIcon = (type: string | undefined) => {
    switch (type) {
      case 'home':
        return <Home className="w-5 h-5" />
      case 'office':
        return <Briefcase className="w-5 h-5" />
      case 'friends':
        return <Users className="w-5 h-5" />
      default:
        return <MapPin className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search your area/pincode/apartment"
          className="pl-10"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-red-600" />
          <span>Current location</span>
        </div>
        <Button variant="outline" size="sm">
          Enable
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Saved Location</h3>
        <div className="space-y-4">
          {savedLocations.map((location) => (
            <div
              key={location.id}
              className="flex items-start justify-between border-b pb-4"
            >
              <div className="flex items-start gap-3">
                {getIcon(location.type)}
                <div>
                  <h4 className="font-medium capitalize">{location.type || 'Other'}</h4>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSavedLocation(location.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Recent Searches</h3>
        <div className="space-y-4">
          {recentSearches.map((location) => (
            <div
              key={location.id}
              className="flex items-start gap-3 border-b pb-4"
            >
              <MapPin className="w-5 h-5 text-red-600" />
              <div>
                <h4 className="font-medium">{location.name}</h4>
                <p className="text-sm text-muted-foreground">{location.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

