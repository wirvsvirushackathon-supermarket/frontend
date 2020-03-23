import { useMap, useAppState } from '../../providers'

export const useSearchResultClick = () => {
  const { services } = useMap()
  const { state, setAppState } = useAppState()
  return (result: google.maps.places.PlaceResult): void => {
    if (!services.placesService || !services.mapService) return
    services.placesService.getDetails(
      {
        placeId: result.place_id!,
        fields: [
          'address_component',
          'opening_hours',
          'geometry',
          'name',
          'photos',
          'place_id',
          'url',
          'adr_address'
        ]
      },
      place => {
        setAppState({
          ...state,
          currentPlaceApiResult: {
            ...(place || {})
          }
        })
      }
    )
    services.mapService.setZoom(15)
    const center = {
      lat: result.geometry?.location.lat(),
      lng: result.geometry?.location.lng()
    }
    if (center.lat && center.lng) {
      services.mapService.setCenter(center)
    }
  }
}
