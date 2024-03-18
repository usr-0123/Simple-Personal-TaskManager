import './App.scss'

import New from './pages/New';
import Home from './pages/Tasks';

import {Routes ,Route} from 'react-router-dom'

import Sidebar from './components/home/sidebar';

import { FaSearch } from "react-icons/fa";

function App() {

  return (
    <>
      <div className="navbar">
        <span>Tasks Manager</span>
        <div className="search">
          <FaSearch />
            <input className='input' type="text" placeholder='search'/>
        </div>
      </div>
      <div className="body">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="container">
          <Routes>
            <Route path='/' element = {<Home />}></Route>
            <Route path='/new' element = {<New />}></Route>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App