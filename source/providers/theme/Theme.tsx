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
    type: 'dark',
    primary: {
      main: '#6200EE'
    },
    secondary: {
      main: '#c49bfc'
    }
  }
})
const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#6200EE'
    },
    secondary: {
      main: '#c49bfc'
    }
  }
})

const ThemeContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: (_theme: Theme) => {},
  currentTheme: lightTheme,
  themes: { darkTheme, lightTheme }
})

export const ThemeProvider: FunctionComponent = ({ children }) => {
  const defaultTheme =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? darkTheme
      : lightTheme

  const [theme, setTheme] = useState<Theme>(defaultTheme)
  return (
    <ThemeContext.Provider
      value={{
        themes: { darkTheme, lightTheme },
        setTheme,
        currentTheme: theme
      }}
    >
      <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useTheme = () => useContext(ThemeContext)
