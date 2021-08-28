import React, {
  ReactNode,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'
import Toast from '@components/Toast'

interface ErrorContextInterface {
  errors: string[]
  setErrors: Dispatch<SetStateAction<string[]>>
}

const ErrorContext = React.createContext<ErrorContextInterface | null>(null)

const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<string[]>([])

  return (
    <ErrorContext.Provider
      value={{
        errors,
        setErrors,
      }}
    >
      {children}
      <Toast />
    </ErrorContext.Provider>
  )
}

const useErrors = () => {
  const context = useContext(ErrorContext) as ErrorContextInterface
  if (context === undefined) {
    throw new Error('useError can only be used inside ErrorProvider')
  }
  return context
}

export { ErrorProvider, useErrors }
