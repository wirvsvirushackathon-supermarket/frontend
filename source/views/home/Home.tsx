import React, { FunctionComponent } from 'react'
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
  Ticket
} from '../../components'
import { MapsApiProvider } from '../../providers'

export const Home: FunctionComponent = () => {
  const location = useLocation()
  const conf = [
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
  return (
    <div>
      <MapsApiProvider>
        <SideDrawer PrimaryMenu={MainMenu} />
        <SearchHeader />
        {conf.map(({ path, title, component }) => (
          <Overlay
            key={path}
            show={location.pathname === path}
            headerTitle={title}
          >
            {component}
          </Overlay>
        ))}
      </MapsApiProvider>
      <Card />
    </div>
  )
}
