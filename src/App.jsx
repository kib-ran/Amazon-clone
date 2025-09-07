import { useState } from 'react'

import './App.css'
import Header from './components/Header/Header'
import LowerHeader from './components/Header/LowerHeader'
import Carousel from './components/Carousel/Carousel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Header />

        <LowerHeader />
        <Carousel />
      </div>
    </>
  );
}

export default App
