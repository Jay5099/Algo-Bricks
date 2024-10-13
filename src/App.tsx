import './App.css'

import { Routes , Route } from 'react-router-dom'
import Home from './components/Home'
import Sort from './components/sort/Sort'
import RecursiveSort from './components/RecursiveSort/RecursiveSort'
import BinarySearch from './components/BinarySearch/BinarySearch'

function App() {

  return (
    <div>
        <Routes>
          <Route path='/sort' element={<Sort />}/>
          <Route path='/recursivesort' element={<RecursiveSort />}/>
          <Route path='/binarysearch' element={<BinarySearch />}/>
          {/* <Route path='/pathfinder'  element={<Pathfinder />}/> */}
          {/* <Route path='/prime' element={<Seive />}/> */}
          {/* <Route path='/nqueen' element={<Queen />}/> */}
          {/* <Route path='/convexhull' element={<ConvexHull />}/> */}
          {/* <Route path='/turing' element={<TuringMachine />}/> */}
          {/* <Route path='/15puzzle' element={<Puzzle />}/> */}
          {/* <Route path='/graph' element={<Graph/>}/> */}
          <Route path='/' element={<Home/>} />
        </Routes>
    </div>
  )
}

export default App
