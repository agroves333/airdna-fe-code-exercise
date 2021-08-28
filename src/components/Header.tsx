import React, { FC } from 'react'
import { Flex, Text } from 'theme-ui'

const Header: FC = () => {
  return (
    <Flex
      p={3}
      sx={{
        height: '5rem',
        alignItems: 'center',
        bg: 'primary',
      }}
    >
      <Text color="white" sx={{ fontSize: 3 }}>
        Weather
      </Text>
    </Flex>
  )
}

export default Header
