import React, {
  createContext,
  useState,
  FunctionComponent,
  useContext
} from 'react'

const defaultState = {
  sidebarVisible: false,
  userLocation: {
    lat: 0,
    lon: 0
  }
}

type AppState = typeof defaultState

const AppStateContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAppState: (_State: AppState) => {},
  state: defaultState
})

export const AppStateProvider: FunctionComponent = props => {
  const [state, setAppState] = useState<AppState>(defaultState)

  // DIRTY should be put somewhere else
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      setAppState({
        ...state,
        userLocation: {
          lat: coords.latitude,
          lon: coords.longitude
        }
      })
    },
    () => {}
  )
  return (
    <AppStateContext.Provider
      value={{
        state,
        setAppState
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppState = () => useContext(AppStateContext)
