import React, { createContext, FunctionComponent, useContext } from 'react'
import { useMapServices, GoogleMapsServices } from './use-map-services'

const MapsApiContext = createContext({
  placesService: {} as any
})

export const MapsApiProvider: FunctionComponent = props => {
  const services = useMapServices()
  return (
    <>
      <MapsApiContext.Provider
        value={{ ...services }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMapsApi = () => useContext(MapsApiContext) as GoogleMapsServices
