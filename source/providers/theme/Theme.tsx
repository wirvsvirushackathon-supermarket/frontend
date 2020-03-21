import React, {
  createContext,
  useState,
  FunctionComponent,
  useContext
} from 'react'
import {
  createMuiTheme,
  Theme,
  ThemeProvider as MaterialThemeProvider
} from '@material-ui/core'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})
const lightTheme = createMuiTheme({
  palette: {
    type: 'light'
  }
})

const ThemeContext = createContext({
  setTheme: (_theme: Theme) => {},
  themes: { darkTheme, lightTheme }
})

export const ThemeProvider: FunctionComponent = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(darkTheme)
  return (
    <ThemeContext.Provider
      value={{ themes: { darkTheme, lightTheme }, setTheme }}
    >
      <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
