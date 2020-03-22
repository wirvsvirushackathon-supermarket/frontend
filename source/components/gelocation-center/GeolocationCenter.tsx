import React, { FC } from 'react'
import { Button } from '@material-ui/core'
import CenterIcon from '@material-ui/icons/CenterFocusWeak'
import { useMap } from '../../providers'

export const GeolocationCenter: FC = () => {
  const { services } = useMap()
  const onClick = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
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
      <CenterIcon />
    </Button>
  )
}
