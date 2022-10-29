import Home from './Home'
import React from 'react'
import Cuisine from './Cuisine'
import Searched from './Searched'
import Recipe from './Recipe'
import {Route, Routes, useLocation} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

const Pages = () => {
  const loaction = useLocation();
  return (
    <AnimatePresence mode='wait'>
      <Routes loaction={loaction} key={loaction.pathname}>
        <Route path='/recipeciousss' element={<Home/>} />
        <Route path='/cuisine/:type' element={<Cuisine />} />
        <Route path='/searched/:search' element={<Searched />} />
        <Route path='/recipe/:name' element={<Recipe/>}/>
      </Routes>
    </AnimatePresence>
  )
}

export default Pages