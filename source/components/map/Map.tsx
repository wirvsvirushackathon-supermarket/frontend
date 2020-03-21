import React, { FunctionComponent } from 'react'
import GoogleMapReact from 'google-map-react'
import { useAppState } from '../../providers'

export const Map: FunctionComponent = () => {
  const { state } = useAppState()
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyCsqZRajAsJUsoiW15aSyzT0fDcAsldc2w'
        }}
        defaultCenter={{
          lat: state.userLocation.lat,
          lng: state.userLocation.lon
        }}
        defaultZoom={11}
      />
    </div>
  )
}
