import { useState } from 'react'

import './App.css'
import Header from './components/Header/Header'
import LowerHeader from './components/Header/LowerHeader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
<Header/>
<LowerHeader/>
      </div>
   
    </>
  )
}

export default App
