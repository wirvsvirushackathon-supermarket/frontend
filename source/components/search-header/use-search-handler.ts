import { useState } from 'react'
import { useMapsApi, useAppState } from '../../providers'

export const useSearchHandler = () => {
  const { placesService, mapService } = useMapsApi()
  const { state } = useAppState()
  const [markers, setMarkers] = useState<gogole.maps.Marker[]>([])
  return e => {
    const request = {
      name: e.target.value,
      fields: ['name', 'geometry'],
      location: {
        lat: state.userLocation.lat,
        lng: state.userLocation.lon
      },
      type: ['grocery_or_supermarket', 'supermarket'],
      radius: '10000'
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
      e.target.value.length >= 2
    ) {
      // eslint-disable-next-line func-names
      placesService.nearbySearch(request, function(results, status) {
        if (status === 'OK' && results.length) {
          const newMarkers = []
          for (let i = 0; i < results.length; i += 1) {
            if (
              results[i].geometry?.location.lat &&
              results[i].geometry?.location.lat
            ) {
              const marker = new google.maps.Marker({
                position: {
                  lat: results[i].geometry?.location.lat(),
                  lng: results[i].geometry?.location.lng()
                },
                // map: mapService,
                title: 'Hello World!'
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
