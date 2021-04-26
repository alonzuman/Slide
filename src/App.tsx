import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import StackRoot from './navigation/StackRoot'
import { QueryClient, QueryClientProvider } from 'react-query'
import ThemeProvider from './providers/ThemeProvider'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient()

export default function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SafeAreaProvider>
            <StackRoot />
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}
