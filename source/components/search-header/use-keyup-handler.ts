import { useState, useEffect } from 'react'
import { useMap, useAppState } from '../../providers'
import { useSearchResultClick } from './use-search-result-click'

export const useKeyupHandler = (): ((val: string) => void) => {
  const { services, helpers } = useMap()
  const { state } = useAppState()
  const [value, setValue] = useState<string>('')
  const onClick = useSearchResultClick()
  const [debouncer, setDebouncer] = useState<any>(null)
  useEffect(() => {
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
      console.log('rere')

      helpers.clearMarkers()
    }
  }, [value])
  return (val: string): void => {
    clearTimeout(debouncer)
    setDebouncer(
      setTimeout(() => {
        setValue(val)
      }, 200)
    )
  }
}
