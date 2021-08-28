import React, {
  ReactNode,
  useState,
  useContext,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react'
import { toFahrenheit } from '@utils/conversions'
import { useErrors } from '@hooks/useErrors'

export type WeatherType = {
  forecast: ForecastItem[]
  lat: number
  lng: number
  cityState: string
  timezone: string
} | null

export type ForecastItem = {
  id: number
  date: string
  icon: string
  high: number
  low: number
  temp: number
  windDirection: number
  windSpeed: number
  weatherState: string
  pressure: number
  humidity: number
  visibility: number
} | null

interface ForecastResponseItem {
  id: number
  applicable_date: string
  weather_state_abbr: string
  weather_state_name: string
  min_temp: number
  max_temp: number
  the_temp: number
  wind_direction: number
  wind_speed: number
  air_pressure: number
  humidity: number
  visibility: number
}

interface WeatherContextInterface {
  weather: WeatherType
  setWeather: Dispatch<SetStateAction<WeatherType>>
  setSearchTerm: Dispatch<SetStateAction<string>>
  searchForecast: () => void
  searchTerm: string
  tempUnit: TempUnit
  setTempUnit: Dispatch<SetStateAction<TempUnit>>
  convert: (temp: number | undefined) => number
  loading: boolean
}

export enum TempUnit {
  F,
  C,
}

const WeatherContext = React.createContext<WeatherContextInterface | null>(null)

const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [weather, setWeather] = useState<WeatherType>(null)
  const [tempUnit, setTempUnit] = useState<TempUnit>(TempUnit.F)
  const [loading, setLoading] = useState(false)
  const { setErrors } = useErrors()

  const searchForecast = useCallback(async () => {
    setLoading(true)

    try {
      const locationResponse = await fetch(
        `/api/location/search/?query=${searchTerm}`
      )
      const locations = await locationResponse?.json()

      const forecastResponse = await fetch(
        `/api/location/${locations[0]?.woeid}/`
      )

      const forecast = await forecastResponse?.json()

      const [lat, lng] = forecast?.latt_long?.split(',')

      setWeather({
        forecast: forecast?.consolidated_weather?.map(
          (item: ForecastResponseItem) => ({
            id: item?.id,
            date: item?.applicable_date,
            icon: item?.weather_state_abbr,
            high: item?.max_temp,
            low: item?.min_temp,
            temp: item?.the_temp,
            windDirection: item?.wind_direction,
            windSpeed: item?.wind_speed,
            weatherState: item?.weather_state_name,
            pressure: item?.air_pressure,
            humidity: item?.humidity,
            visibility: item?.visibility,
          })
        ),
        cityState: `${forecast?.title}, ${forecast?.parent?.title}`,
        timezone: forecast?.timezone,
        lat,
        lng,
      })
      setLoading(false)
    } catch (err: any) {
      setWeather(null)
      setLoading(false)
      setErrors((errors) => [err?.message, ...errors])
    }
  }, [setWeather, searchTerm])

  const convert = (temp: number | undefined): number =>
    temp && tempUnit === TempUnit.F
      ? toFahrenheit(temp)
      : Math.round(Number(temp))

  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,
        searchTerm,
        setSearchTerm,
        searchForecast,
        tempUnit,
        setTempUnit,
        convert,
        loading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

const useWeather = () => {
  const context = useContext(WeatherContext) as WeatherContextInterface
  if (context === undefined) {
    throw new Error('useWeather can only be used inside WeatherProvider')
  }
  return context
}

export { WeatherProvider, useWeather }
