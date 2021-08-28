/** @jsxImportSource theme-ui */
import { FC } from 'react'
import { Theme, ThemeProvider } from 'theme-ui'
import baseTheme from '@theme-ui/preset-base'
import Weather from '@pages/Weather'
import { WeatherProvider } from '@hooks/useWeather'
import { ErrorProvider } from '@hooks/useErrors'

const theme: Theme = {
  ...baseTheme,
  breakpoints: ['50rem', '60rem'],
  colors: {
    ...baseTheme?.colors,
    error: '#b80000',
  },
}

const App: FC = () => (
  <ThemeProvider theme={theme}>
    <ErrorProvider>
      <WeatherProvider>
        <Weather />
      </WeatherProvider>
    </ErrorProvider>
  </ThemeProvider>
)

export default App
