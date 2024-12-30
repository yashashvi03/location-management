'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useLocation } from '@/context/location-context'
import { Location } from '@/types/location'
import { MapPin } from 'lucide-react'

declare global {
  interface Window {
    google: any;
  }
}

export function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [marker, setMarker] = useState<any>(null)
  const { currentLocation, setCurrentLocation } = useLocation()

  useEffect(() => {
    if (!mapRef.current) return

    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: currentLocation?.coordinates || { lat: 19.0760, lng: 72.8777 },
        zoom: 15,
      })

      const marker = new window.google.maps.Marker({
        map,
        draggable: true,
        position: currentLocation?.coordinates || { lat: 19.0760, lng: 72.8777 },
      })

      setMap(map)
      setMarker(marker)

      marker.addListener('dragend', async () => {
        const position = marker.getPosition()
        const geocoder = new window.google.maps.Geocoder()
        
        const result = await geocoder.geocode({
          location: { lat: position.lat(), lng: position.lng() }
        })

        if (result.results[0]) {
          const newLocation: Location = {
            id: Date.now().toString(),
            name: result.results[0].formatted_address,
            address: result.results[0].formatted_address,
            coordinates: {
              lat: position.lat(),
              lng: position.lng(),
            },
          }
          setCurrentLocation(newLocation)
        }
      })
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.onload = initMap
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        map?.setCenter(pos)
        marker?.setPosition(pos)
      })
    }
  }

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <Button
          onClick={handleLocateMe}
          className="bg-white text-black hover:bg-gray-100"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Locate Me
        </Button>
      </div>
    </div>
  )
}

