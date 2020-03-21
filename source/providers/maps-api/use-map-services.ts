import { useState, useEffect } from 'react'
import { Loader } from '@googlemaps/loader'
import env from '../../env'
import { useAppState } from '../app-state'

export type GoogleMapsServices = {
  mapService?: google.maps.Map
  placesService?: google.maps.places.PlacesService
}
export const useMapServices = (): GoogleMapsServices => {
  const { state } = useAppState()
  const { lat, lon } = state.userLocation!
  const [services, setServices] = useState<any>(null)
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
      zoom: 15
    }
    const loader = new Loader({
      apiKey: env.googleAPiKEy,
      version: 'weekly',
      libraries: ['places']
    })
    loader
      .load()
      .then(() => {
        const map = new google.maps.Map(
          document.getElementById(divId)!,
          mapOptions
        )
        const mapDiv = document.getElementById(divId)!
        // very dirty
        setTimeout(() => {
          mapDiv.style.position = 'fixed'
          mapDiv.style.top = '0'
          mapDiv.style.left = '0'
          mapDiv.style.bottom = '0'
          mapDiv.style.right = '0'
        }, 500)
        setServices({
          placesService: new google.maps.places.PlacesService(map),
          mapService: map as google.maps.Map,
          mapElement: document.getElementById(divId)
        })
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.log(e)
      })
  }, [])
  useEffect(() => {
    if (services && services.mapService && lat !== 0 && lon !== 0) {
      services.mapService.panTo({ lat, lng: lon })
    }
  }, [lat, lon, services])
  return services
}
