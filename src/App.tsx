import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import StackRoot from './navigation/StackRoot'
import { QueryClient, QueryClientProvider } from 'react-query'
import ThemeProvider from './providers/ThemeProvider'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SafeAreaProvider>
          <StackRoot />
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
