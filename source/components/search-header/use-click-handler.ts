import { useMapsApi, useAppState, useMapSearchShow } from '../../providers'

export const useClickHandler = (): ((val: string) => void) => {
  const { placesService, mapService } = useMapsApi()
  const { state } = useAppState()
  const search = useMapSearchShow({ placesService, mapService })
  return (value: string): void => {
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
    if (value.length >= 2) {
      search(request)
    }
  }
}
