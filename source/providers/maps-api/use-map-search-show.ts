import { useClearMarkers } from './use-map-clear-markers'
import { GoogleMapsState, GoogleMapsServices } from '.'

export const useMapSearchShow = ({
  mapState,
  setMapState,
  services
}: {
  services: GoogleMapsServices
  mapState: GoogleMapsState
  setMapState: (_state: GoogleMapsState) => void
}) => {
  const clearMarkers = useClearMarkers({ mapState, services })
  return (
    request: google.maps.places.PlaceSearchRequest,
    onMarkerClick: (result: google.maps.places.PlaceResult) => any
  ) => {
    clearMarkers()
    if (!services.placesService) return
    const newMarkers: google.maps.Marker[] = []
    services.placesService.nearbySearch(request, (results, status) => {
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
            marker.addListener('click', onMarkerClick.bind(null, results[i]))
            if (services.mapService) {
              marker.setMap(services.mapService)
              services.mapService.fitBounds(bounds)
              services.mapService.panToBounds(bounds)
              newMarkers.push(marker)
            }
          }
        }
      }
      setMapState({
        ...mapState,
        displayedMarkers: [...mapState.displayedMarkers, ...newMarkers]
      })
    })
  }
}
