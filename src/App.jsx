import React from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { myRouter } from './routes/router'

function App() {

  return (
    <div className='wrapper'>
     <RouterProvider router={myRouter} />
    </div>
  )
}

export default App
