import React from 'react'
import Header from '../../core/Header'
import ExplorePeople from './ExplorePeople'
import ExploreSearchBar from './ExploreSearchBar'

export default function Explore() {
  return (
    <>
      <Header title='Explore' />
      <ExploreSearchBar />
      <ExplorePeople />
    </>
  )
}
