import { useState, useEffect } from 'react'
import { useMap, useAppState } from '../../providers'
import { useSearchResultClick } from './use-search-result-click'

export const useKeyupHandler = (): ((val: string) => void) => {
  const { services, helpers } = useMap()
  const { state } = useAppState()
  const [value, setValue] = useState<string>('')
  const onClick = useSearchResultClick()
  const [debouncer, setDebouncer] = useState<any>(null)
  const [skip, setSkip] = useState(false)
  useEffect(() => {
    if (!services.mapService || skip) return
    const request = {
      name: value,
      location: {
        lat: services.mapService.getCenter().lat(),
        lng: services.mapService.getCenter().lng()
      },
      type: state.placeApiSearchType,
      rankBy: 1
    }
    helpers.searchAndAddMarkers(request, onClick)
  }, [value])
  return (val: string): void => {
    clearTimeout(debouncer)
    setSkip(true)
    if (val.length <= 2) {
      helpers.clearMarkers()
      return
    }
    setDebouncer(
      setTimeout(() => {
        setSkip(false)
        setValue(val)
      }, 200)
    )
  }
}
