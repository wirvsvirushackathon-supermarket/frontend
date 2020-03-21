import { useState, useEffect } from 'react'
import { useMapsApi, useAppState } from '../../providers'

export const useSearchHandler = (): ((e: KeyboardEvent) => void) => {
  const { placesService, mapService } = useMapsApi()
  const { state, setAppState } = useAppState()
  const [value, setValue] = useState<string>('')
  const [debouncer, setDebouncer] = useState<any>(null)

  useEffect(() => {
    if (!mapService) return
    const request = {
      name: value,
      location: {
        lat: mapService.getCenter().lat(),
        lng: mapService.getCenter().lng()
      },
      type: state.placeApiSearchType,
      // radius: 50,
      rankBy: 1
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
          const bounds = new google.maps.LatLngBounds()
          for (let i = 0; i < results.length; i += 1) {
            if (
              results[i].geometry?.location.lat &&
              results[i].geometry?.location.lat
            ) {
              const lat = results[i].geometry?.location.lat()!
              const lon = results[i].geometry?.location.lng()!
              const pos = {
                lat,
                lng: lon
              }
              if (i <= 10) bounds.extend(pos)
              const marker = new google.maps.Marker({
                position: pos
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
              mapService.fitBounds(bounds)
              mapService.panToBounds(bounds)
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
