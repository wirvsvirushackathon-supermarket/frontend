import React, { FunctionComponent, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  SideDrawer,
  SearchHeader,
  Card,
  Overlay,
  About,
  RegistrationForm,
  LoginForm,
  MainMenu,
  Ticket,
  GeolocationButton
} from '../../components'
import { MapsApiProvider } from '../../providers'
import { useHomeStyles } from './use-home-styles'

const homeOverlayConfig = [
  {
    path: '/overlay/info',
    title: 'So funktioniert es',
    component: <About />
  },
  {
    path: '/overlay/register',
    title: 'Filiale anmelden',
    component: <RegistrationForm />
  },
  {
    path: '/overlay/login',
    title: 'Login Filialbesitzer',
    component: <LoginForm />
  },
  {
    path: '/overlay/ticket',
    title: 'Deine Reservierung',
    component: <Ticket />
  }
]

export const Home: FunctionComponent = () => {
  const location = useLocation()
  const classes = useHomeStyles()
  const [showGeoButton, setShowGeoButton] = useState(false)
  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then(geoState => {
      const showButton = geoState.state !== 'granted'
      setShowGeoButton(showButton)
      const onChange: PermissionStatus['onchange'] = ({ target }) => {
        // @ts-ignore
        const showButtonOnChange = target.state !== 'granted'
        setShowGeoButton(showButtonOnChange)
      }
      // eslint-disable-next-line no-param-reassign
      geoState.onchange = onChange
    })
  }, [])
  return (
    <div>
      <MapsApiProvider>
        <SideDrawer PrimaryMenu={MainMenu} />
        <SearchHeader />
        {homeOverlayConfig.map(({ path, title, component }) => (
          <Overlay
            key={path}
            show={location.pathname === path}
            headerTitle={title}
          >
            {component}
          </Overlay>
        ))}
        <div className={classes.geoButton}>
          {showGeoButton && <GeolocationButton />}
        </div>
      </MapsApiProvider>
      <Card />
    </div>
  )
}
