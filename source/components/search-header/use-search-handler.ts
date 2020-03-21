import { useState } from 'react'
import { useMapsApi, useAppState } from '../../providers'

export const useSearchHandler = (): ((e: KeyboardEvent) => void) => {
  const { placesService, mapService } = useMapsApi()
  const { state } = useAppState()
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  return (e): void => {
    const { value } = e.target as HTMLInputElement
    const request = {
      name: value,
      fields: ['name', 'geometry'],
      location: {
        lat: state.userLocation.lat,
        lng: state.userLocation.lon
      },
      type: 'grocery_or_supermarket',
      radius: 1000
    }
    // remove old if any
    if (markers.length) {
      for (let i = 0; i < markers.length; i += 1) {
        markers[i].setMap(null)
      }
      setMarkers([])
    }
    if (
      placesService &&
      typeof placesService.nearbySearch === 'function' &&
      value.length >= 2
    ) {
      placesService.nearbySearch(request, (results, status) => {
        if (status === 'OK' && results.length) {
          const newMarkers = []
          for (let i = 0; i < results.length; i += 1) {
            if (
              results[i].geometry?.location.lat &&
              results[i].geometry?.location.lat
            ) {
              const marker = new google.maps.Marker({
                position: {
                  lat: results[i].geometry?.location.lat()!,
                  lng: results[i].geometry?.location.lng()!
                }
                // map: mapService,
              })
              marker.setMap(mapService)
              newMarkers.push(marker)
            }
          }
          setMarkers([...newMarkers])
        }
      })
    }
  }
}
