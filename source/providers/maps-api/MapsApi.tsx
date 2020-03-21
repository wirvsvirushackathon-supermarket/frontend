import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
  useEffect,
  createRef,
  Fragment
} from 'react'
import { Loader } from '@googlemaps/loader'
import env from '../../env'

const MapsApiContext = createContext({
  placesService: {} as any
})

export const MapsApiProvider: FunctionComponent<{
  lat: number
  lon: number
}> = ({ lat = 0, lon = 0, ...rest }) => {
  const [services, setServices] = useState<any>(null)
  const mapRef = createRef()
  useEffect(() => {
    const divId = 'map'
    const mapDummyDiv = document.createElement('div')
    mapDummyDiv.id = divId
    document.body.appendChild(mapDummyDiv)
    const mapOptions = {
      center: {
        lat,
        lng: lon
      },
      zoom: 4
    }
    const loader = new Loader({
      apiKey: env.googleAPiKEy,
      version: 'weekly',
      libraries: ['places']
    })
    loader
      .load()
      .then(() => {
        // eslint-disable-next-line no-undef
        const map = new google.maps.Map(
          document.getElementById(divId),
          mapOptions
        )
        const mapDiv = document.getElementById(divId)
        // very dirty
        setTimeout(() => {
          mapDiv.style.position = 'fixed'
          mapDiv.style.top = '0'
          mapDiv.style.left = '0'
          mapDiv.style.bottom = '0'
          mapDiv.style.right = '0'
        }, 500)
        setServices({
          // eslint-disable-next-line no-undef
          placesService: new google.maps.places.PlacesService(map),
          mapElement: mapRef
        })
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e)
      })
  }, [lat])

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%'
          }}
          ref={mapRef}
        />
      </div>
      <MapsApiContext.Provider
        value={{ ...services }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMapsApi = () => useContext(MapsApiContext)
