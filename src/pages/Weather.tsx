import React, { FC, useCallback, useState } from 'react'
import { Container, Box } from 'theme-ui'
import { useWeather } from '@hooks/useWeather'
import Forecast from '@components/Forecast'
import Header from '@components/Header'
import Search from '@components/Search'
import CurrentWeather from '@components/CurrentWeather'
import NoResults from '@components/NoResults'
import Loader from '@components/Loader'

const Weather: FC = () => {
  const [hasSearched, setHasSearched] = useState<boolean>(false)

  const { searchTerm, setSearchTerm, searchForecast, weather, loading } =
    useWeather()

  const handleKeydown = useCallback(
    async (e) => {
      if (e.code === 'Enter') {
        await searchForecast()
        setHasSearched(true)
      }
    },
    [searchForecast]
  )

  const handleChange = useCallback(
    (e) => {
      setSearchTerm(e.target.value)
    },
    [setSearchTerm]
  )

  return (
    <Container>
      <Header />
      <Box m={4}>
        <Search
          mt={4}
          handleChange={handleChange}
          handleKeydown={handleKeydown}
          searchTerm={searchTerm}
        />

        {weather && (
          <>
            <CurrentWeather mt={4} />
            <Forecast my={4} />
          </>
        )}
        {hasSearched && !weather && <NoResults />}
      </Box>
      {loading && <Loader />}
    </Container>
  )
}

export default Weather
