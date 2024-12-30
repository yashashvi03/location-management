'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MapPin, Search } from 'lucide-react'
import { useLocation } from '@/context/location-context'

export function LocationPermissionModal() {
  const [isOpen, setIsOpen] = useState(true)
  const { setCurrentLocation } = useLocation()

  const handleEnableLocation = async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      setCurrentLocation({
        id: 'current',
        name: 'Current Location',
        address: 'Loading address...',
        coordinates: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      })
      
      setIsOpen(false)
    } catch (error) {
      console.error('Error getting location:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-xl font-semibold text-center">Location Permission</DialogTitle>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <MapPin className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold">Location permission is off</h2>
          <p className="text-center text-muted-foreground">
            We need your location to find the nearest store & provide you a seamless delivery experience
          </p>
          <div className="flex flex-col w-full gap-3">
            <Button 
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={handleEnableLocation}
            >
              Enable Location
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              <Search className="w-4 h-4 mr-2" />
              Search your Location Manually
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}




// 'use client'

// import { useState } from 'react'
// import { Dialog, DialogContent } from '@/components/ui/dialog'
// import { Button } from '@/components/ui/button'
// import { MapPin, Search } from 'lucide-react'
// import { useLocation } from '@/context/location-context'

// export function LocationPermissionModal() {
//   const [isOpen, setIsOpen] = useState(true)
//   const { setCurrentLocation } = useLocation()

//   const handleEnableLocation = async () => {
//     try {
//       const position = await new Promise<GeolocationPosition>((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject)
//       })

//       setCurrentLocation({
//         id: 'current',
//         name: 'Current Location',
//         address: 'Loading address...',
//         coordinates: {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         },
//       })
      
//       setIsOpen(false)
//     } catch (error) {
//       console.error('Error getting location:', error)
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogContent className="sm:max-w-[425px]">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
//             <MapPin className="w-8 h-8 text-red-600" />
//           </div>
//           <h2 className="text-xl font-semibold">Location permission is off</h2>
//           <p className="text-center text-muted-foreground">
//             We need your location to find the nearest store & provide you a seamless delivery experience
//           </p>
//           <div className="flex flex-col w-full gap-3">
//             <Button 
//               className="w-full bg-red-600 hover:bg-red-700"
//               onClick={handleEnableLocation}
//             >
//               Enable Location
//             </Button>
//             <Button 
//               variant="outline" 
//               className="w-full"
//               onClick={() => setIsOpen(false)}
//             >
//               <Search className="w-4 h-4 mr-2" />
//               Search your Location Manually
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }




// 'use client'

// import { useState } from 'react'
// import { Dialog } from '@/components/ui/dialog'
// import { Button } from '@/components/ui/button'
// import { MapPin, Search } from 'lucide-react'
// import { useLocation } from '@/context/location-context'

// export function LocationPermissionModal() {
//   const [isOpen, setIsOpen] = useState(true)
//   const { setCurrentLocation } = useLocation()

//   const handleEnableLocation = async () => {
//     try {
//       const position = await new Promise<GeolocationPosition>((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject)
//       })

//       setCurrentLocation({
//         id: 'current',
//         name: 'Current Location',
//         address: 'Loading address...',
//         coordinates: {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         },
//       })
      
//       setIsOpen(false)
//     } catch (error) {
//       console.error('Error getting location:', error)
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//       <div className="fixed inset-0 flex items-center justify-center">
//         <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
//           <div className="flex flex-col items-center gap-4">
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
//               <MapPin className="w-8 h-8 text-red-600" />
//             </div>
//             <h2 className="text-xl font-semibold">Location permission is off</h2>
//             <p className="text-center text-muted-foreground">
//               We need your location to find the nearest store & provide you a seamless delivery experience
//             </p>
//             <div className="flex flex-col w-full gap-3">
//               <Button 
//                 className="w-full bg-red-600 hover:bg-red-700"
//                 onClick={handleEnableLocation}
//               >
//                 Enable Location
//               </Button>
//               <Button 
//                 variant="outline" 
//                 className="w-full"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <Search className="w-4 h-4 mr-2" />
//                 Search your Location Manually
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Dialog>
//   )
// }

