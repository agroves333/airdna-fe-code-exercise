import React, { FC } from 'react'
import { Box, BoxProps, Flex, Image, Text } from 'theme-ui'
import moment from 'moment-timezone'
import { useWeather, ForecastItem, TempUnit } from '@hooks/useWeather'

const CurrentWeather: FC<BoxProps> = ({ ...props }) => {
  const { weather, tempUnit, setTempUnit, convert } = useWeather()
  const current: ForecastItem = weather?.forecast?.[0] || null

  const handleTempUnitClick = (tempUnit: TempUnit) => {
    setTempUnit(tempUnit)
  }

  return (
    weather && (
      <Flex
        sx={{
          flexDirection: ['column', 'row'],
          justifyContent: 'space-between',
        }}
        {...props}
      >
        <Flex
          mb={[3, null]}
          sx={{
            alignItems: 'center',
          }}
        >
          <Image
            mb={[0, 2]}
            mr={2}
            sx={{
              height: '4rem',
            }}
            src={`https://www.metaweather.com/static/img/weather/${current?.icon}.svg`}
            alt=""
          />
          <Flex sx={{ alignItems: 'flex-start' }}>
            <Text sx={{ fontSize: 7, lineHeight: 1 }}>
              {convert(current?.temp)}
            </Text>
            <Box
              sx={{ fontSize: 3, cursor: 'pointer', alignSelf: 'flex-start' }}
            >
              <Text
                sx={{ fontWeight: tempUnit === TempUnit.F ? 'bold' : 'body' }}
                onClick={() => handleTempUnitClick(TempUnit.F)}
              >
                °F
              </Text>{' '}
              |{' '}
              <Text
                sx={{ fontWeight: tempUnit === TempUnit.C ? 'bold' : 'body' }}
                onClick={() => handleTempUnitClick(TempUnit.C)}
              >
                °C
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: ['left', 'right'],
          }}
        >
          <Text sx={{ fontSize: 4 }}>{weather?.cityState}</Text>
          <Text sx={{ fontSize: 2 }} color="gray">
            {weather?.timezone &&
              moment(Date()).tz(weather.timezone).format('dddd LT')}
          </Text>
          <Text sx={{ fontSize: 2 }} color="gray">
            {current?.weatherState}
          </Text>
        </Flex>
      </Flex>
    )
  )
}

export default CurrentWeather
