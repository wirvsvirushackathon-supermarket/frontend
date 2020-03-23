import { useState, useEffect } from 'react'
import { Loader } from '@googlemaps/loader'
import env from '../../env'
import { GoogleMapsServices } from '.'

export const useCreateMapServices = (
  opt: google.maps.MapOptions
): GoogleMapsServices => {
  const [services, setServices] = useState<GoogleMapsServices>({})
  useEffect(() => {
    const divId = 'map'
    const mapDummyDiv = document.createElement('div')
    mapDummyDiv.id = divId
    document.body.appendChild(mapDummyDiv)
    const loader = new Loader({
      apiKey: env.googleAPiKEy,
      version: 'weekly',
      libraries: ['places']
    })
    loader
      .load()
      .then(() => {
        const map = new google.maps.Map(document.getElementById(divId)!, opt)
        const mapDiv = document.getElementById(divId)!
        setTimeout(() => {
          mapDiv.style.position = 'fixed'
          mapDiv.style.top = '0'
          mapDiv.style.left = '0'
          mapDiv.style.bottom = '0'
          mapDiv.style.right = '0'
          mapDiv.style.zIndex = '-1'
        }, 500)
        setServices({
          placesService: new google.maps.places.PlacesService(map),
          mapService: map as google.maps.Map
        })
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e)
      })
  }, [])
  return services
}
