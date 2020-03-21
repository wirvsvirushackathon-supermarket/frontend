import React, { FunctionComponent } from 'react'
import GoogleMapReact from 'google-map-react'

export const Map: FunctionComponent = () => (
  <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyB8B04MTIk7abJDVESr6SUF6f3Hgt1DPAY' }}
      defaultCenter={{
        lat: 59.95,
        lng: 30.33
      }}
      defaultZoom={11}
    />
  </div>
)
