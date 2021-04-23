import React, { createContext, useState } from 'react'
import { useQuery } from 'react-query'
import API from '../API/API'

export const ExploreContext = createContext()

export default function ExploreProvider({ children }: { children?: any }) {
  const [keyword, setKeyword] = useState('')
  const { data, isLoading, refetch } = useQuery(['explore', keyword], API.Explore.getSearchResults)

  return (
    <ExploreContext.Provider value={{ data, isLoading, keyword, setKeyword, refetch }}>
      {children}
    </ExploreContext.Provider>
  )
}
