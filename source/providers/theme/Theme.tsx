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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: (_theme: Theme) => {},
  themes: { darkTheme, lightTheme }
})

export const ThemeProvider: FunctionComponent = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme)
  return (
    <ThemeContext.Provider
      value={{ themes: { darkTheme, lightTheme }, setTheme }}
    >
      <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useTheme = () => useContext(ThemeContext)
