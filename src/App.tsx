import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import StackRoot from './navigation/StackRoot'
import { QueryClient, QueryClientProvider } from 'react-query'
import ThemeProvider from './providers/ThemeProvider'
import { Provider } from 'react-redux'
import store from './store'

const queryClient = new QueryClient()

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SafeAreaProvider>
            <StackRoot />
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}
