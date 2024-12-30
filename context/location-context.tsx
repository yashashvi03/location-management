'use client'

import { createContext, useContext, useState } from 'react'
import { Location, LocationContextType } from '@/types/location'

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null)
  const [savedLocations, setSavedLocations] = useState<Location[]>([])
  const [recentSearches, setRecentSearches] = useState<Location[]>([])

  const addSavedLocation = (location: Location) => {
    setSavedLocations(prev => [...prev, location])
  }

  const removeSavedLocation = (id: string) => {
    setSavedLocations(prev => prev.filter(loc => loc.id !== id))
  }

  const addRecentSearch = (location: Location) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(loc => loc.id !== location.id)
      return [location, ...filtered].slice(0, 5)
    })
  }

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        savedLocations,
        recentSearches,
        setCurrentLocation,
        addSavedLocation,
        removeSavedLocation,
        addRecentSearch,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export const useLocation = () => {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
}

