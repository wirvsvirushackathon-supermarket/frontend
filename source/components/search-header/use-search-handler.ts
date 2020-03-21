import { useState, useEffect } from 'react'
import { useMapsApi, useAppState } from '../../providers'

export const useSearchHandler = (): ((e: KeyboardEvent) => void) => {
  const { placesService, mapService } = useMapsApi()
  const { state, setAppState } = useAppState()
  const [value, setValue] = useState<string>('')
  const [debouncer, setDebouncer] = useState<any>(null)

  useEffect(() => {
    if (!mapService) return
    const { lat, lng } = mapService.getCenter()
    const request = {
      name: value,
      location: {
        lat: lat(),
        lng: lng()
      },
      type: state.placeApiSearchType,
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
              marker.addListener('click', () => {
                placesService.getDetails(
                  {
                    placeId: results[i].place_id!,
                    fields: ['address_component', 'opening_hours', 'geometry']
                  },
                  place => {
                    setAppState({
                      ...state,
                      currentPlaceApiResult: {
                        ...results[i],
                        ...(place || {})
                      }
                    })
                  }
                )
                mapService.setZoom(15)
                mapService.setCenter({
                  lat: results[i].geometry?.location.lat()!,
                  lng: results[i].geometry?.location.lng()!
                })
              })
              marker.setMap(mapService)
              newMarkers.push(marker)
            }
          }
        }
      })
    }
    // eslint-disable-next-line consistent-return
    return () => {
      if (newMarkers.length) {
        for (let i = 0; i < newMarkers.length; i += 1) {
          newMarkers[i].setMap(null)
        }
      }
    }
  }, [value, mapService])
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
