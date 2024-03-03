import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FooterComponent from './components/FooterComponent.jsx'
import HeaderComponent from './components/HeaderComponent.jsx'
import HomePage from './components/HomePage.jsx'
import ListImageComponent from './components/ListImageComponent.jsx'
import NoteList from './components/NoteList.js'
import UserManagementComponent from './components/UserManagementComponent.jsx'
function App () {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/images' element={<ListImageComponent />}></Route>
          <Route path='/notes' element={<NoteList />}></Route>
          <Route path='/users' element={<UserManagementComponent />}></Route>
          {/* <Route path='/stock' element={< StockAPI/>}></Route> */}
          {/* <Route path="/users" element={<ListUserComponents/>}></Route> */}
        </Routes>
      </BrowserRouter>

      <FooterComponent />
    </>
  )
}
export default App
