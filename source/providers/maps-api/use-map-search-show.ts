import { useAppState } from '../app-state'
import { useMarkerClickHandler } from './use-marker-click-handler'
import { GoogleMapsServices } from './use-map-services'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMapSearchShow = ({
  placesService,
  mapService
}: GoogleMapsServices) => {
  const onMarkerClick = useMarkerClickHandler()
  const { state, setAppState } = useAppState()
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return (request: google.maps.places.PlaceSearchRequest) => {
    if (!placesService || !mapService) return
    for (let i = 0; i < state.visibleMarkers.length; i += 1) {
      state.visibleMarkers[i].setMap(null)
    }
    const newMarkers: google.maps.Marker[] = []
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
            })
            marker.addListener(
              'click',
              onMarkerClick.bind(null, {
                placeId: results[i].place_id!,
                lat,
                lon
              })
            )
            marker.setMap(mapService)
            mapService.fitBounds(bounds)
            mapService.panToBounds(bounds)
            newMarkers.push(marker)
          }
        }
      }
      setAppState({ ...state, visibleMarkers: [...newMarkers] })
    })
  }
}
