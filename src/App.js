import './App.css'
import React from 'react'
import { useUrlSearchParams } from 'use-url-search-params'

import Planner from './Planner'
import Visualizer from './Visualizer'

function App() {
  const [params] = useUrlSearchParams({ tracklist: undefined })
  return !params.tracklist ? <Planner /> : <Visualizer tracklist={params.tracklist}/>
}

export default App
