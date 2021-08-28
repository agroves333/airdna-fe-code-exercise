import { FC } from 'react'
import { Flex, Spinner } from 'theme-ui'

const Loader: FC = () => {
  return (
    <Flex
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        bg: 'rgba(255,255,255,0.7)',
      }}
    >
      <Spinner />
    </Flex>
  )
}

export default Loader
