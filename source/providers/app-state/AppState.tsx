import React, {
  createContext,
  useState,
  FunctionComponent,
  useContext
} from 'react'

const LOCAL_STORAGE_KEY = 'APP_STATE'

const defaultState = {
  sidebarVisible: false,
  userLocation: {
    lat: 52.5192,
    lon: 13.4061
  },
  placeApiSearchType: 'grocery_or_supermarket',
  currentPlaceApiResult: undefined,
  visibleMarkers: []
}

type AppState = {
  sidebarVisible: boolean
  userLocation?: {
    lat: number
    lon: number
  }
  placeApiSearchType: string
  currentPlaceApiResult?: google.maps.places.PlaceResult
  visibleMarkers: google.maps.Marker[]
}

const localStorageState = (): any => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (typeof data === 'string') {
    return JSON.parse(data)
  }
  return data
}

const defaultStoredState = localStorageState() as typeof defaultState

const AppStateContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAppState: (_State: AppState) => {},
  state: (defaultStoredState || defaultState) as AppState
})

export const AppStateProvider: FunctionComponent = props => {
  const [state, setAppState] = useState<AppState>(defaultState)

  const persistentSetter = (newState: AppState): void => {
    const { visibleMarkers: _s, ...rest } = newState
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rest))
    setAppState({ ...newState })
  }

  // useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      persistentSetter({
        ...state,
        userLocation: {
          lat: coords.latitude,
          lon: coords.longitude
        }
      })
    },
    () => {}
  )
  // }, [])

  return (
    <AppStateContext.Provider
      value={{
        state,
        setAppState: persistentSetter
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppState = () => useContext(AppStateContext)
