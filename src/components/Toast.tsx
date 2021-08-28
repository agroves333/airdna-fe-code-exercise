import { FC } from 'react'
import { Grid, Alert, Close, Text } from 'theme-ui'
import { useErrors } from '@hooks/useErrors'

const Toast: FC = () => {
  const { errors, setErrors } = useErrors()

  const handleCloseClick = (i: number) => {
    setErrors((errors) => errors.filter((error, j) => i !== j))
  }

  return (
    <Grid
      gap={1}
      sx={{
        position: 'fixed',
        bottom: '0.5rem',
        right: '0.5rem',
        gridAutoRows: 'auto',
      }}
    >
      {errors.map((error, i) => (
        <Alert key={`error-${i}`} bg="error">
          <Text>{error}</Text>
          <Close onClick={() => handleCloseClick(i)} ml="auto" mr={-2} />
        </Alert>
      ))}
    </Grid>
  )
}

export default Toast
