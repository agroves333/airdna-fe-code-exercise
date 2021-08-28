import { FC } from 'react'
import { Flex, Text } from 'theme-ui'

const NoResults: FC = () => {
  return (
    <Flex
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Text sx={{ fontSize: 4 }}>
        No Results Found. Please try a different location
      </Text>
    </Flex>
  )
}

export default NoResults
