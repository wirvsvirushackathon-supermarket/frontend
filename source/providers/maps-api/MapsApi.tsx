import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
  useEffect
} from 'react'
import { Loader } from '@googlemaps/loader'
import env from '../../env'

const MapsApiContext = createContext({
  placesService: {} as any
})

export const MapsApiProvider: FunctionComponent = props => {
  const [services, setServices] = useState<any>(null)
  useEffect(() => {
    if (services === null) {
      const loader = new Loader({
        apiKey: env.googleAPiKEy,
        version: 'weekly',
        libraries: ['places']
      })
      loader
        .load()
        .then(() => {
          const mapDummyDiv = document.createElement('div')
          const ID = 'MapsApiID'
          mapDummyDiv.id = ID
          document.body.appendChild(mapDummyDiv)
          // eslint-disable-next-line no-undef
          const map = new google.maps.Map(document.getElementById(ID))
          setServices({
            // eslint-disable-next-line no-undef
            placesService: new google.maps.places.PlacesService(map)
          })
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.log(e)
        })
    }
  }, [services])
  return (
    <MapsApiContext.Provider
      value={{ ...services }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMapsApi = () => useContext(MapsApiContext)
