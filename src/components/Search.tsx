import React, { ChangeEventHandler, FC, KeyboardEventHandler } from 'react'
import { Box, BoxProps, Input } from 'theme-ui'
import { FaSearch } from 'react-icons/fa'
import { ThemeUIStyleObject } from '@theme-ui/css'

interface Props extends BoxProps {
  handleKeydown: KeyboardEventHandler<HTMLInputElement>
  handleChange: ChangeEventHandler<HTMLInputElement>
  searchTerm: string
  sx?: ThemeUIStyleObject
}

const Search: FC<Props> = ({
  handleKeydown,
  handleChange,
  searchTerm,
  sx,
  ...props
}: Props) => {
  return (
    <Box
      m="auto"
      sx={{
        position: 'relative',
        ...sx,
      }}
      {...props}
    >
      <Input
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeydown}
        placeholder="Enter city"
      />
      <Box
        sx={{
          position: 'absolute',
          right: '1rem',
          top: '0.625rem',
        }}
        color="primary"
      >
        <FaSearch />
      </Box>
    </Box>
  )
}

export default Search
