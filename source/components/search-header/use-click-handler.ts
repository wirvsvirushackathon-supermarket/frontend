import { useMap, useAppState } from '../../providers'
import { useSearchResultClick } from './use-search-result-click'

export const useClickHandler = (): ((val: string) => void) => {
  const { services, helpers } = useMap()
  const { state } = useAppState()
  const onClick = useSearchResultClick()

  return (value: string): void => {
    if (!services.mapService) return
    const request = {
      name: value,
      location: {
        lat: services.mapService.getCenter().lat(),
        lng: services.mapService.getCenter().lng()
      },
      type: state.placeApiSearchType,
      rankBy: 1
    }
    if (value.length >= 2) {
      helpers.searchAndAddMarkers(request, onClick)
    } else {
      console.log('eeee')

      helpers.clearMarkers()
    }
  }
}
