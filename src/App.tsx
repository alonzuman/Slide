import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import StackRoot from './navigation/StackRoot'
import store from './store'
import { QueryClient, QueryClientProvider } from 'react-query'
import ThemeProvider from './providers/ThemeProvider'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SafeAreaProvider>
          <Provider store={store}>
            <StackRoot />
          </Provider>
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
