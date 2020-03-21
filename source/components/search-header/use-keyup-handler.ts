import { useState, useEffect } from 'react'
import { useMapsApi, useAppState, useMapSearchShow } from '../../providers'

export const useKeyupHandler = (): ((val: string) => void) => {
  const { placesService, mapService } = useMapsApi()
  const { state } = useAppState()
  const [value, setValue] = useState<string>('')
  const [debouncer, setDebouncer] = useState<any>(null)
  const search = useMapSearchShow({ placesService, mapService })
  useEffect(() => {
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
