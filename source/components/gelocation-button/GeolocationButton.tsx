import React, { FC } from 'react'
import { Button } from '@material-ui/core'
import { useAppState, useMap } from '../../providers'

export const GeolocationButton: FC = () => {
  const { services } = useMap()
  const { state, setAppState } = useAppState()
  const onClick = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setAppState({
          ...state,
          userLocation: {
            lat: coords.latitude,
            lon: coords.longitude
          }
        })
        if (services.mapService) {
          services.mapService.setCenter({
            lat: coords.latitude,
            lng: coords.longitude
          })
        }
      },
      () => {}
    )
  }
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Geolokalisierung aktivieren
    </Button>
  )
}
