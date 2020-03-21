import { useState, useEffect } from 'react'
import { useMapsApi, useAppState } from '../../providers'

export const useSearchHandler = (): ((e: KeyboardEvent) => void) => {
  const { placesService, mapService } = useMapsApi()
  const { state } = useAppState()
  const [value, setValue] = useState<string>('')
  const [debouncer, setDebouncer] = useState<any>(null)
  useEffect(() => {
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
    const newMarkers: google.maps.Marker[] = []
    if (
      placesService &&
      typeof placesService.nearbySearch === 'function' &&
      value.length >= 2
    ) {
      placesService.nearbySearch(request, (results, status) => {
        if (status === 'OK' && results.length) {
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
        }
      })
    }
    return () => {
      if (newMarkers.length) {
        for (let i = 0; i < newMarkers.length; i += 1) {
          newMarkers[i].setMap(null)
        }
      }
    }
  }, [value])
  return (e): void => {
    e.persist()
    clearTimeout(debouncer)
    setDebouncer(
      setTimeout(() => {
        setValue((e.target as HTMLInputElement).value || '')
      }, 200)
    )
  }
}
