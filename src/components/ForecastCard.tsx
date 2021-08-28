import React, { FC } from 'react'
import moment from 'moment'
import { Box, Flex, Image, Text } from 'theme-ui'
import { FaArrowUp, FaWind } from 'react-icons/fa'
import { ForecastItem, useWeather } from '@hooks/useWeather'

const ForecastCard: FC<ForecastItem> = ({
  id,
  date,
  icon,
  high,
  low,
  windDirection,
  windSpeed,
  humidity,
  visibility,
  pressure,
}) => {
  const { convert } = useWeather()

  return (
    <Flex
      key={id}
      sx={{
        flexDirection: ['row', 'column'],
        flexWrap: ['wrap', null],
        alignItems: ['center', null],
        justifyContent: ['space-between', 'center'],
        bg: 'muted',
        borderRadius: '0.25rem',
        width: '100%',
      }}
      p={3}
    >
      <Flex
        sx={{
          flexDirection: ['row', 'column'],
          flexWrap: 'wrap',
          justifyContent: ['space-between', null],
          alignItems: 'center',
        }}
      >
        <Text
          mr={[4, 0]}
          mb={[0, 2]}
          sx={{ fontSize: [2, 3], textAlign: 'center' }}
        >
          {moment(date).format('ddd')}
        </Text>
        <Image
          mb={[0, 2]}
          sx={{
            maxWidth: '3em',
          }}
          src={`https://www.metaweather.com/static/img/weather/${icon}.svg`}
          alt=""
        />
        <Flex mb={[0, 2]}>
          <Text
            mr={1}
            sx={{
              fontSize: 3,
            }}
          >
            {convert(high)}°
          </Text>
          /
          <Text
            ml={1}
            color="gray"
            sx={{
              fontSize: 3,
            }}
          >
            {convert(low)}°
          </Text>
        </Flex>

        <Flex mt={[2, null]} sx={{ alignItems: 'center' }}>
          <Box
            mr={2}
            sx={{
              width: '1rem',
              height: '1rem',
            }}
          >
            <FaWind />
          </Box>
          <Box
            mr={2}
            sx={{
              transform: `rotate(${windDirection}deg)`,
              width: '1rem',
              height: '1rem',
            }}
          >
            <FaArrowUp />
          </Box>
          <Text sx={{ fontSize: 1 }}>{Math.round(windSpeed || 0)}mph</Text>
        </Flex>
      </Flex>

      <Flex
        mt={[3, null]}
        sx={{
          width: '100%',
          flexDirection: ['row', 'column'],
          justifyContent: ['space-between', null],
          textAlign: 'center',
        }}
      >
        <Box sx={{ fontSize: 1 }}>
          <Text sx={{ fontWeight: 'bold', display: 'block' }}>Humidity</Text>
          <Text>{humidity}%</Text>
        </Box>

        <Box sx={{ fontSize: 1 }}>
          <Text sx={{ fontWeight: 'bold', display: 'block' }}>Visibility</Text>
          <Text>{Math.round(Number(visibility) * 10) / 10} mi.</Text>
        </Box>

        <Box sx={{ fontSize: 1 }}>
          <Text sx={{ fontWeight: 'bold', display: 'block' }}>Pressure</Text>
          <Text>{pressure} mb</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default ForecastCard
