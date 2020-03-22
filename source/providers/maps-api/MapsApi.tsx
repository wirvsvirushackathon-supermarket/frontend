import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState
} from 'react'
import { useCreateMapServices } from './use-create-map-services'
import { useMapSearchShow } from './use-map-search-show'
import { useClearMarkers } from './use-map-clear-markers'

export type GoogleMapsServices = {
  mapService?: google.maps.Map
  placesService?: google.maps.places.PlacesService
}
const MapsApiContext = createContext({
  services: {} as GoogleMapsServices,
  mapState: {} as GoogleMapsState,
  setMapState: (_state: GoogleMapsState) => {},
  helpers: {} as GoogleMapsHelpers
})

export type GoogleMapsState = {
  displayedMarkers: google.maps.Marker[]
}

export type GoogleMapsHelpers = {
  searchAndAddMarkers: (
    request: google.maps.places.PlaceSearchRequest,
    onMarkerClick: (result: google.maps.places.PlaceResult) => any
  ) => any
  clearMarkers: () => void
}
const defaultOpts: google.maps.MapOptions = {
  zoom: 12,
  center: {
    lat: 52.52,
    lng: 13.4
  },
  disableDefaultUI: true
}

export const MapsApiProvider: FunctionComponent = props => {
  const [mapState, setMapState] = useState<GoogleMapsState>({
    displayedMarkers: []
  })
  const services = useCreateMapServices(defaultOpts)
  const searchAndAddMarkers = useMapSearchShow({
    services,
    mapState,
    setMapState
  })
  const clearMarkers = useClearMarkers({ mapState, setMapState, services })
  return (
    <>
      <MapsApiContext.Provider
        value={{
          services,
          mapState,
          setMapState,
          helpers: {
            searchAndAddMarkers,
            clearMarkers
          }
        }}
        {...props}
      />
    </>
  )
}

export const useMap = () => useContext(MapsApiContext)
