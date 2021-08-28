import React, { FC } from 'react'
import { Grid, Box, BoxProps } from 'theme-ui'
import { ForecastItem, useWeather } from '@hooks/useWeather'
import ForecastCard from '@components/ForecastCard'

const Forecast: FC<BoxProps> = ({ ...props }) => {
  const { weather } = useWeather()

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Grid
        gap={2}
        sx={{
          gridAutoFlow: ['row', 'column'],
        }}
        {...props}
      >
        {weather?.forecast?.map(
          (item: ForecastItem) =>
            item && <ForecastCard key={item?.id} {...item} />
        )}
      </Grid>
    </Box>
  )
}

export default Forecast
