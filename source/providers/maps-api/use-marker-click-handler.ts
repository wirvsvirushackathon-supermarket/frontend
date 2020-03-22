import { useAppState } from '../app-state'
import { useMapsApi } from './MapsApi'

export const useMarkerClickHandler = () => {
  const { placesService, mapService } = useMapsApi()
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
    if (!placesService || !mapService) return
    placesService.getDetails(
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
    mapService.setZoom(15)
    mapService.setCenter({
      lat,
      lng: lon
    })
  }
}
