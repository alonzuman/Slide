import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import StackRoot from './navigation/StackRoot'
import EngineProvider from './scenes/Stream/StreamProvider'
import store from './store'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Provider store={store}>
          <StackRoot />
        </Provider>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
