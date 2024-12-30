import { LocationProvider } from '@/context/location-context'
import { LocationPermissionModal } from '@/components/location-permission-modal'
import { LocationMap } from '@/components/location-map'
import { AddressForm } from '@/components/address-form'
import { AddressManagement } from '@/components/address-management'

export default function Home() {
  return (
    <LocationProvider>
      <main className="container mx-auto p-4 space-y-6">
        <LocationPermissionModal />
        <LocationMap />
        <AddressForm />
        <AddressManagement />
      </main>
    </LocationProvider>
  )
}

