import { useAppState } from '../app-state'
import { useMap } from '.'

export const useMarkerClickHandler = () => {
  const { services } = useMap()
  const { state, setAppState } = useAppState()
  return ({
    placeId,
    lat,
    lon
  }: {
    placeId: string
    lat: number
    lon: number
  }): void => {
    if (!services.placesService || !services.mapService) return
    services.placesService.getDetails(
      {
        placeId,
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
    services.mapService.setCenter({
      lat,
      lng: lon
    })
  }
}
